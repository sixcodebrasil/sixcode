"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";

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

      {/* Spline 3D robot — anchored right, mouse interactive across its area */}
      <div className="absolute right-0 top-0 z-[1] h-full w-full md:w-[68%] lg:w-[62%]">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="h-full w-full"
        />
      </div>

      {/* Left fade — keeps text readable; pointer-events:none so mouse reaches Spline */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-full bg-gradient-to-r from-black via-black/80 to-transparent md:w-3/4 md:via-black/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-t from-black to-transparent"
        aria-hidden
      />

      {/* Text overlay — container pointer-events:none so mouse passes through */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-6 sm:px-10 md:px-12">
        <div className="max-w-xl pt-24 md:pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
              Tecnologia sob medida
            </span>
            <br />
            <span className="text-gradient-accent">que move negócios.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
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
            className="pointer-events-auto mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contato"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white shadow-accent transition-transform duration-200 hover:scale-[1.02]"
            >
              Começar um projeto
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-neutral-100 backdrop-blur transition-colors hover:bg-white/[0.08]"
            >
              Conhecer serviços
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
