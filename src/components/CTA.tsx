"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function CTA() {
  return (
    <section id="contato" className="cv-auto relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="relative isolate overflow-hidden rounded-[2rem] glass-strong p-8 sm:p-14"
        >
          <div
            className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.25),transparent)] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 dot-bg opacity-40"
            aria-hidden
          />

          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
              Vamos conversar
            </span>
            <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-gradient">Tem uma ideia?</span>{" "}
              <span className="text-gradient-accent">A gente constrói.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
              Conte pra gente o que você precisa — em até 24h respondemos com
              um primeiro plano de ataque, sem compromisso.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:contato@sixcode.dev"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-accent transition-transform duration-200 hover:scale-[1.02] sm:w-auto"
              >
                <Mail className="h-4 w-4" />
                contato@sixcode.dev
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06] sm:w-auto"
              >
                Conversar pelo WhatsApp
              </a>
            </div>

            <p className="mt-6 text-xs text-muted-2">
              Atendimento de segunda a sexta, das 9h às 19h — suporte 24/7 para clientes ativos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
