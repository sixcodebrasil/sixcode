"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";

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
  const [shouldLoad, setShouldLoad] = useState(false);

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
          <Spline scene={scene} className={className} />
        </Suspense>
      )}
    </div>
  );
}
