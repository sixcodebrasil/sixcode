"use client";

import { motion } from "motion/react";
import { Wallet, Zap } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const highlights = [
  {
    icon: Wallet,
    title: "Melhor custo-benefício do mercado",
    description:
      "Preço justo pra pequenas e médias empresas, sem pacote genérico nem custo escondido. Você recebe uma proposta com valor fechado antes de qualquer compromisso.",
  },
  {
    icon: Zap,
    title: "Prazo de entrega rápido",
    description:
      "SLA enxuto do início ao lançamento, com etapas visíveis pra você acompanhar. Sem fila de espera de agência grande nem prazo que estica sem explicação.",
  },
];

export function Value() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(ellipse_at_20%_20%,rgba(139,92,246,0.16),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-accent" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">
            Por que a SixCode
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
          className="font-display mt-8 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
        >
          <span className="text-gradient">Preço justo.</span>
          <br />
          <span className="text-gradient-accent">Prazo que cabe no seu negócio.</span>
        </motion.h2>

        <div className="mt-16 grid gap-8 border-y border-border py-10 sm:grid-cols-2">
          {highlights.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-2">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
