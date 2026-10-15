"use client";

import { useEffect, useRef } from "react";
import "./SixCodeMascot.css";

const SEEN_KEY = "sixcode-mascot-seen";
const ENTER_MS = 2500;

// O que o robô fala ao chegar em cada seção do site
const SECTION_LINES: Record<string, string> = {
  servicos: "Aqui estão os nossos serviços. Veja o que combina com você.",
  processo: "Do primeiro contato à entrega, você acompanha tudo de perto.",
  cases: "Estes são projetos que já colocamos no ar.",
  sobre: "Somos um time pequeno, direto e que entrega.",
  faq: "Ficou com dúvida? Aqui tem as respostas mais comuns.",
  contato: "Bora conversar? Conte o seu projeto para a gente.",
};

const FLY_LINES = ["Descendo com a mochila a jato!", "Segura que lá vou eu!"];
const CLIMB_LINES = ["Subindo pela corda!", "Voltando para o topo!"];

// Fagulhas do pouso: direção e atraso fixos (nada aleatório, evita diferença de hidratação)
const SPARKS = [
  { dx: -78, dy: -70, d: 0 },
  { dx: -46, dy: -98, d: 40 },
  { dx: -14, dy: -112, d: 10 },
  { dx: 20, dy: -104, d: 60 },
  { dx: 52, dy: -92, d: 20 },
  { dx: 84, dy: -62, d: 50 },
  { dx: -92, dy: -30, d: 30 },
  { dx: 96, dy: -24, d: 70 },
  { dx: -30, dy: -60, d: 90 },
  { dx: 40, dy: -56, d: 80 },
];

/**
 * Mascote da SixCode em CSS puro: sem biblioteca 3D, sem vídeo, sem WebGL.
 * Chega por balão uma vez por sessão, acena no pouso e depois acompanha a
 * rolagem. Tudo por transform/opacity (GPU) e sem re-render do React.
 */
export default function SixCodeMascot() {
  const ref = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const bubble = bubbleRef.current;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let lastSpeak = 0;
    let flyIdx = 0;
    let climbIdx = 0;
    let lastFly = 0;
    let lastClimb = 0;

    // Mostra um balão de fala por alguns segundos (sem re-render do React).
    const speak = (text: string, force = false) => {
      if (!bubble) return false;
      const now = Date.now();
      if (!force && now - lastSpeak < 7000) return false;
      if (node.dataset.state === "enter") return false;
      lastSpeak = now;
      bubble.textContent = text;
      bubble.classList.add("show");
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => bubble.classList.remove("show"), 4200);
      return true;
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let lookFrame = 0;
    let stopTimer: ReturnType<typeof setTimeout> | undefined;
    let lastY = window.scrollY;
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
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (!reduced) {
        // Descendo a página: voa com a mochila a jato. Subindo: escala uma corda.
        if (dy > 2) {
          if (!node.classList.contains("is-flying") && Date.now() - lastFly > 30000) {
            if (speak(FLY_LINES[flyIdx++ % FLY_LINES.length])) lastFly = Date.now();
          }
          node.classList.add("is-flying");
          node.classList.remove("is-climbing");
        } else if (dy < -2) {
          if (!node.classList.contains("is-climbing") && Date.now() - lastClimb > 30000) {
            if (speak(CLIMB_LINES[climbIdx++ % CLIMB_LINES.length])) lastClimb = Date.now();
          }
          node.classList.add("is-climbing");
          node.classList.remove("is-flying");
        }
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => {
          node.classList.remove("is-flying");
          node.classList.remove("is-climbing");
        }, 220);
      }
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Olhos e cabeça seguem o mouse (só em telas com mouse).
    let mx = 0;
    let my = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (lookFrame) return;
      lookFrame = requestAnimationFrame(() => {
        lookFrame = 0;
        const r = node.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.3;
        const lx = Math.max(-1, Math.min(1, (mx - cx) / (window.innerWidth * 0.5)));
        const ly = Math.max(-1, Math.min(1, (my - cy) / (window.innerHeight * 0.5)));
        node.style.setProperty("--lx", lx.toFixed(2));
        node.style.setProperty("--ly", ly.toFixed(2));
      });
    };

    update();

    // Cena de chegada: uma vez por sessão e nunca com movimento reduzido.
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen || reduced) {
      node.dataset.state = "idle";
    } else {
      const y = (14 * window.innerHeight) / 100;
      node.style.setProperty("--drop-from", `${-(y + 340)}px`);
      timers.push(
        setTimeout(() => {
          node.dataset.state = "enter";
          timers.push(
            setTimeout(() => {
              node.dataset.state = "land";
              speak("Oi! Bem-vindo à SixCode.", true);
              timers.push(
                setTimeout(() => {
                  node.dataset.state = "idle";
                  try {
                    sessionStorage.setItem(SEEN_KEY, "1");
                  } catch {}
                }, 2800),
              );
            }, ENTER_MS),
          );
        }, 500),
      );
    }

    // Fala ao chegar em cada seção (uma vez por seção)
    const spoken = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || spoken.has(id)) continue;
          if (speak(SECTION_LINES[id])) spoken.add(id);
        }
      },
      { threshold: 0.45 },
    );
    Object.keys(SECTION_LINES).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    if (!reduced) window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(lookFrame);
      clearTimeout(stopTimer);
      timers.forEach(clearTimeout);
      clearTimeout(hideTimer);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="sixcode-mascot" aria-hidden="true">
      <div ref={bubbleRef} className="mascot-bubble" />
      <div className="mascot-drop">
        <div className="mascot-sway">
          <div className="mascot-balloon">
            <span className="balloon-shine" />
            <span className="balloon-knot" />
          </div>
          <div className="mascot-rope left" />
          <div className="mascot-rope right" />

          <div className="mascot-climb-rope" />

          <div className="mascot-aura" />
          <div className="mascot-shadow" />

          <div className="mascot-confetti">
            {SPARKS.map((s, i) => (
              <span
                key={i}
                style={
                  {
                    "--dx": `${s.dx}px`,
                    "--dy": `${s.dy}px`,
                    "--d": `${s.d}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          <div className="mascot-robot">
            <div className="robot-jet left">
              <i />
            </div>
            <div className="robot-jet right">
              <i />
            </div>
            <div className="robot-antenna" />

            <div className="robot-head">
              <div className="robot-ear left" />
              <div className="robot-ear right" />
              <div className="robot-visor">
                <div className="robot-eyes">
                  <span />
                  <span />
                </div>
                <div className="robot-smile" />
              </div>
            </div>

            <div className="robot-neck" />

            <div className="robot-body">
              <div className="robot-chest">
                <span>S</span>
              </div>
              <div className="robot-belt" />
            </div>

            <div className="robot-arm left">
              <div className="robot-shoulder" />
              <div className="robot-upperarm" />
              <div className="robot-elbow">
                <div className="robot-forearm" />
                <div className="robot-hand" />
              </div>
            </div>

            <div className="robot-arm right">
              <div className="robot-shoulder" />
              <div className="robot-upperarm" />
              <div className="robot-elbow">
                <div className="robot-forearm" />
                <div className="robot-hand" />
              </div>
            </div>

            <div className="robot-leg left">
              <div className="robot-thigh" />
              <div className="robot-knee">
                <div className="robot-shin" />
                <div className="robot-foot" />
              </div>
            </div>

            <div className="robot-leg right">
              <div className="robot-thigh" />
              <div className="robot-knee">
                <div className="robot-shin" />
                <div className="robot-foot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
