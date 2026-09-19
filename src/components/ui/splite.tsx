"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * Lazy + viewport-gated Spline loader.
 *
 * Strategy:
 *  1. Renders only a lightweight placeholder on first paint (no WebGL/wasm).
 *  2. Uses IntersectionObserver to wait until the host element is near the viewport.
 *  3. Defers the actual import to an idle callback, so it never competes with
 *     critical above-the-fold work (LCP/INP).
 *  4. Respects prefers-reduced-motion — keeps the placeholder forever.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Depois de carregada, a cena WebGL fica renderizando continuamente por
  // padrão — inclusive rolada pra fora da tela — e é isso que deixa o resto
  // do site travado, principalmente no celular. Pausa (app.stop()) quando
  // sai da viewport ou a aba perde o foco, retoma (app.play()) quando volta.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const app = appRef.current;
          if (!app) continue;
          if (entry.isIntersecting && document.visibilityState === "visible") {
            app.play();
          } else {
            app.stop();
          }
        }
      },
      { threshold: 0 },
    );
    io.observe(node);

    const onVisibility = () => {
      const app = appRef.current;
      if (!app) return;
      if (document.visibilityState === "visible") {
        const rect = node.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) app.play();
      } else {
        app.stop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const node = ref.current;
    if (!node) return;

    type IdleScheduler = (cb: () => void) => unknown;
    const ric = (
      window as unknown as { requestIdleCallback?: IdleScheduler }
    ).requestIdleCallback;
    const schedule: IdleScheduler =
      ric ?? ((cb) => window.setTimeout(cb, 200));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            schedule(() => setShouldLoad(true));
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "150px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative h-full w-full ${className ?? ""}`}
      aria-hidden={!shouldLoad}
    >
      {!shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="spline-loader" aria-label="Carregando cena 3D" />
        </div>
      )}
      {shouldLoad && (
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="spline-loader" />
            </div>
          }
        >
          <Spline
            scene={scene}
            className={className}
            renderOnDemand
            onLoad={(app) => {
              appRef.current = app;
              const rect = ref.current?.getBoundingClientRect();
              const visible = rect && rect.bottom > 0 && rect.top < window.innerHeight;
              if (!visible) app.stop();
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
