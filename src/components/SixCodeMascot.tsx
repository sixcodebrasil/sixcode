"use client";

import { useEffect, useRef } from "react";
import "./SixCodeMascot.css";

const SEEN_KEY = "sixcode-mascot-seen";
const ENTER_MS = 2500;

/**
 * Mascote da SixCode em CSS puro: sem biblioteca 3D, sem vídeo, sem WebGL.
 * A posição vertical acompanha a rolagem e o robô só "anda" enquanto a página
 * está sendo rolada. Tudo é feito por transform (GPU) e sem re-render do React.
 */
export default function SixCodeMascot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let stopTimer: ReturnType<typeof setTimeout> | undefined;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;

      // Percorre a lateral entre 14% e 60% da altura da tela, longe do botão do chat.
      const y = (14 + progress * 46) * (window.innerHeight / 100);
      node.style.transform = `translate3d(0, ${y}px, 0) scale(var(--mascot-scale, 1))`;
    };

    const onScroll = () => {
      node.classList.add("is-walking");
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => node.classList.remove("is-walking"), 160);
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();

    // Cena de chegada: uma vez por sessão e nunca com movimento reduzido.
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced) {
      node.dataset.state = "idle";
    } else {
      const y = (14 * window.innerHeight) / 100;
      node.style.setProperty("--drop-from", `${-(y + 320)}px`);
      timers.push(
        setTimeout(() => {
          node.dataset.state = "enter";
          timers.push(
            setTimeout(() => {
              node.dataset.state = "land";
              timers.push(
                setTimeout(() => {
                  node.dataset.state = "idle";
                  try {
                    sessionStorage.setItem(SEEN_KEY, "1");
                  } catch {}
                }, 2600),
              );
            }, ENTER_MS),
          );
        }, 500),
      );
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(stopTimer);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="sixcode-mascot" aria-hidden="true">
      <div className="mascot-drop">
      <div className="mascot-sway">
      <div className="mascot-balloon">
        <span className="balloon-knot" />
      </div>
      <div className="mascot-rope left" />
      <div className="mascot-rope right" />

      <div className="mascot-shadow" />

      <div className="mascot-robot">
        <div className="robot-antenna" />

        <div className="robot-head">
          <div className="robot-ear left" />
          <div className="robot-ear right" />

          <div className="robot-eyes">
            <span />
            <span />
          </div>

          <div className="robot-mouth" />
        </div>

        <div className="robot-neck" />

        <div className="robot-body">
          <div className="robot-chest">
            <span>S</span>
          </div>
        </div>

        <div className="robot-arm left">
          <div className="robot-shoulder" />
          <div className="robot-forearm" />
          <div className="robot-hand" />
        </div>

        <div className="robot-arm right">
          <div className="robot-shoulder" />
          <div className="robot-forearm" />
          <div className="robot-hand" />
        </div>

        <div className="robot-leg left">
          <div className="robot-foot" />
        </div>

        <div className="robot-leg right">
          <div className="robot-foot" />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
