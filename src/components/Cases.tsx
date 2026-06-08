"use client";

import { motion } from "motion/react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

const ease = [0.22, 1, 0.36, 1] as const;

const projects: CardStackItem[] = [
  {
    id: "sgs-parts",
    title: "SGS Parts — Loja que vende todos os dias",
    description:
      "E-commerce completo com catálogo, carrinho e pagamento online. Substituiu o orçamento manual no WhatsApp e triplicou os pedidos em 60 dias.",
    imageSrc: "/cases/sgs-parts.svg",
    href: "#contato",
    tag: "E-commerce · SGS Parts",
    ctaLabel: "Falar sobre esse case",
  },
  {
    id: "polar-parts",
    title: "Polar Parts — Estoque sincronizado em 1 clique",
    description:
      "Sistema que importa, formata e publica o estoque inteiro no Mercado Livre em segundos. Horas de trabalho manual viraram um botão.",
    imageSrc: "/cases/polar-parts.svg",
    href: "#contato",
    tag: "Automação · Polar Parts",
    ctaLabel: "Falar sobre esse case",
  },
];

export function Cases() {
  return (
    <section
      id="cases"
      className="cv-auto relative overflow-hidden py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.12),transparent)] blur-3xl"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease }}
            className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted"
          >
            Casos de uso
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            <span className="text-gradient">
              Negócios que funcionam de verdade
            </span>
            <br />
            <span className="text-gradient-accent">depois da SixCode.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className="mt-4 text-base text-muted sm:text-lg"
          >
            Menos trabalho manual, mais resultado. Veja como ajudamos empresas
            reais a vender e operar sem fricção.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="mt-12 sm:mt-16"
        >
          <CardStack
            items={projects}
            initialIndex={0}
            cardWidth={520}
            cardHeight={320}
            overlap={0.5}
            spreadDeg={28}
            tiltXDeg={8}
            autoAdvance
            intervalMs={4200}
            pauseOnHover
            loop
            showDots
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="mt-10 text-center text-xs uppercase tracking-[0.22em] text-muted-2"
        >
          Arraste, clique ou use as setas ← →
        </motion.p>
      </div>
    </section>
  );
}
