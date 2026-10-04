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

  // O 3D só vale a pena em tela grande com mouse e aparelho com folga. No
  // celular ele pesava ~2 MB e travava a thread principal por segundos (nota 35
  // no Lighthouse mobile), e o robô nem aparece lá por causa do degradê escuro.
  // Nos aparelhos que passam, a cena só entra depois que a página terminou de
  // carregar e ficou ociosa, pra nunca competir com o primeiro desenho.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const bigScreen = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };
    const slowNet =
      nav.connection?.saveData === true ||
      ["slow-2g", "2g", "3g"].includes(nav.connection?.effectiveType ?? "");
    const weakDevice =
      (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    if (!bigScreen || slowNet || weakDevice) return;

    type IdleScheduler = (cb: () => void, opts?: { timeout: number }) => unknown;
    const ric = (
      window as unknown as { requestIdleCallback?: IdleScheduler }
    ).requestIdleCallback;
    const schedule: IdleScheduler =
      ric ?? ((cb) => window.setTimeout(cb, 1200));

    // Espera a primeira interação (mouse, rolagem, toque, tecla) ou 3,5 s,
    // o que vier primeiro. Assim a inicialização do WebGL (~800 ms de thread
    // travada) nunca cai durante o carregamento nem no primeiro clique.
    let timer: number | undefined;
    let started = false;
    const events = ["pointermove", "scroll", "touchstart", "keydown"] as const;
    const go = () => {
      if (started) return;
      started = true;
      events.forEach((e) => window.removeEventListener(e, go));
      schedule(() => setShouldLoad(true), { timeout: 2000 });
    };
    const arm = () => {
      events.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }));
      timer = window.setTimeout(go, 3500);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      window.removeEventListener("load", arm);
      events.forEach((e) => window.removeEventListener(e, go));
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative h-full w-full ${className ?? ""}`}
      aria-hidden={!shouldLoad}
    >
      {!shouldLoad && (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_45%,rgba(139,92,246,0.22),transparent_55%)]"
          aria-hidden
        />
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
