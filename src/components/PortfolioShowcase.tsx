"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { portfolioProjects } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const TEMPO_IMAGEM = 5200;

/** Vitrine do portfólio: lista de projetos de um lado e a gravação real da tela do outro. */
export function PortfolioShowcase() {
  const reduzir = useReducedMotion();
  const [ativo, setAtivo] = useState(0);
  const [visivel, setVisivel] = useState(false);
  const [pausado, setPausado] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const projeto = portfolioProjects[ativo];
  const total = portfolioProjects.length;

  const proximo = () => setAtivo((a) => (a + 1) % total);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // vídeo toca só quando a vitrine está na tela
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (visivel && !pausado && !reduzir) v.play().catch(() => {});
    else v.pause();
  }, [visivel, pausado, reduzir, ativo]);

  // projetos sem vídeo avançam por tempo; os com vídeo avançam quando ele termina
  useEffect(() => {
    if (projeto.video || !visivel || pausado || reduzir) return;
    const id = setTimeout(proximo, TEMPO_IMAGEM);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ativo, visivel, pausado, reduzir, projeto.video]);

  return (
    <div
      ref={raiz}
      className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-10"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {/* lista de projetos */}
      <ol className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0" aria-label="Projetos">
        {portfolioProjects.map((p, i) => {
          const on = i === ativo;
          return (
            <li key={p.slug} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => setAtivo(i)}
                aria-current={on}
                className={cn(
                  "group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors",
                  on ? "border-accent/50 bg-white/[0.06]" : "border-transparent hover:bg-white/[0.04]",
                )}
              >
                <span className={cn("font-mono text-xs tabular-nums", on ? "text-accent-2" : "text-muted-2")}>{p.number}</span>
                <span className="min-w-0">
                  <span className={cn("font-display block truncate text-base font-semibold", on ? "text-white" : "text-muted group-hover:text-white")}>{p.name}</span>
                  <span className="hidden truncate text-xs text-muted-2 sm:block">{p.category}</span>
                </span>
                {on && !p.video && !reduzir && (
                  <motion.span
                    key={`${ativo}-${pausado}`}
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: pausado ? 0 : 1 }}
                    transition={{ duration: pausado ? 0 : TEMPO_IMAGEM / 1000, ease: "linear" }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {/* gravação da tela */}
      <div className="min-w-0">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b12] shadow-[0_40px_90px_-30px_rgba(139,92,246,0.35)]">
          <div className="relative aspect-[16/10] bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={projeto.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease }}
              >
                {projeto.video ? (
                  <video
                    ref={video}
                    src={projeto.videoInicio ? `${projeto.video}#t=${projeto.videoInicio}` : projeto.video}
                    poster={projeto.imageSrc}
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    onEnded={proximo}
                    className="h-full w-full object-cover object-top"
                    aria-label={`Gravação da tela do projeto ${projeto.name}`}
                  />
                ) : (
                  <Image src={projeto.imageSrc} alt={`Prévia do projeto ${projeto.name}`} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover object-top" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={projeto.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">{projeto.category}</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{projeto.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {projeto.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/portfolio/${projeto.slug}`} className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30">
                Ver case
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
