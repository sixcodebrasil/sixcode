"use client";

import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, ChevronDown } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-black"
    >
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="#a78bfa"
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_82%_20%,rgba(139,92,246,0.18),transparent_42%),linear-gradient(115deg,rgba(0,0,0,0)_55%,rgba(139,92,246,0.07)_100%)]"
        aria-hidden
      />

      {/* Left fade — mantém o texto legível */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-full bg-gradient-to-r from-black via-black/80 to-transparent md:w-3/4 md:via-black/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-t from-black to-transparent"
        aria-hidden
      />

      {/* Texto sobre o fundo */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-6 sm:px-10 md:px-12">
        <div className="max-w-xl pt-24 md:pt-20">
          {/* Título e parágrafo já vêm visíveis no HTML (initial={false}): são o
              maior elemento da tela, e esperar o JS + animação atrasava o LCP em
              mais de 1 s. A animação de entrada fica só nos botões e no selo. */}
          <motion.h1
            initial={false}
            className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
              Tecnologia sob medida
            </span>
            <br />
            <span className="text-gradient-accent">que move negócios.</span>
          </motion.h1>

          <motion.p
            initial={false}
            className="mt-6 max-w-lg text-base text-neutral-300 sm:text-lg"
          >
            Somos a <span className="text-white">SixCode</span> - startup de
            tecnologia especializada em desenvolvimento de softwares, websites
            de alta performance, consultoria tech e automações inteligentes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="pointer-events-auto mt-10 flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center"
          >
            <a
              href="#contato"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-b from-[#a78bfa] to-[#7c4dff] py-4 pl-7 pr-4 text-base font-semibold text-white shadow-[0_14px_44px_-10px_rgba(139,92,246,0.85),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-8px_rgba(139,92,246,0.95),inset_0_1px_0_rgba(255,255,255,0.45)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 blur-md transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100"
              />
              <span className="relative">Começar um projeto</span>
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white/20 ring-1 ring-white/30 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="#servicos"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.05] px-7 py-4 text-base font-medium text-neutral-100 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-2/50 hover:bg-white/[0.09]"
            >
              Conhecer serviços
              <ChevronDown className="h-4 w-4 text-accent-2 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.75 }}
            className="pointer-events-auto mt-8 flex max-w-md items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15 ring-1 ring-accent/30">
              <BadgeCheck className="h-[18px] w-[18px] text-accent-2" />
            </span>
            <p className="text-sm leading-relaxed text-neutral-400">
              <span className="block font-medium text-neutral-100">
                Valores e prazo de entrega entre os melhores do mercado.
              </span>
              Um consultor entra em contato para marcar uma reunião e entender
              seu negócio.
            </p>
          </motion.div>
        </div>

        {/* Conversa de exemplo: ocupa o lado direito (só telas largas, decorativa) */}
        <div
          aria-hidden
          className="ml-auto mr-36 hidden w-[340px] shrink-0 xl:block"
        >
          <div className="animate-fade-in-up relative rounded-[28px] border border-white/10 bg-white/[0.04] p-2 shadow-[0_30px_80px_-20px_rgba(139,92,246,0.45)] backdrop-blur">
            <div className="rounded-[22px] bg-[#0b0a12]/90">
              <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-accent/20 ring-1 ring-accent/40">
                  <span className="font-display text-sm font-semibold text-accent-2">S</span>
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-neutral-100">SixCode Assistente</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    online agora
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 px-4 py-4 text-[13px] leading-snug">
                <p
                  className="animate-fade-in-up ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-accent/90 px-3.5 py-2 text-white"
                  style={{ animationDelay: "0.9s" }}
                >
                  Quero parar de responder cliente na mão
                </p>
                <p
                  className="animate-fade-in-up w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.07] px-3.5 py-2 text-neutral-200"
                  style={{ animationDelay: "1.6s" }}
                >
                  Fechado! Eu automatizo seu atendimento com IA. Qual é o seu negócio?
                </p>
                <p
                  className="animate-fade-in-up ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-accent/90 px-3.5 py-2 text-white"
                  style={{ animationDelay: "2.4s" }}
                >
                  Loja de peças, uns 200 pedidos por dia
                </p>
                <div
                  className="animate-fade-in-up rounded-2xl border border-accent/30 bg-accent/10 px-3.5 py-3"
                  style={{ animationDelay: "3.2s" }}
                >
                  <p className="mb-2 flex items-center gap-1.5 font-medium text-accent-2">
                    <BadgeCheck className="h-4 w-4" />
                    Seu plano ficou pronto
                  </p>
                  <ul className="space-y-1 text-neutral-300">
                    <li>Atendimento 24h no WhatsApp</li>
                    <li>Pedidos direto no seu sistema</li>
                    <li>Painel com relatórios em tempo real</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
