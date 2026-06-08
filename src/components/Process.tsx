"use client";

import { motion } from "motion/react";
import { Search, PencilRuler, Hammer, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type Step = {
  n: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Descoberta",
    description:
      "Entendemos o problema, o público e o objetivo de negócio. Definimos escopo, métricas e prioridades.",
    icon: Search,
  },
  {
    n: "02",
    title: "Design & Arquitetura",
    description:
      "Wireframes, UI premium e desenho da arquitetura técnica. Tudo validado antes de uma linha de código.",
    icon: PencilRuler,
  },
  {
    n: "03",
    title: "Construção",
    description:
      "Sprints curtos com entregas semanais, code review, testes automatizados e deploys contínuos.",
    icon: Hammer,
  },
  {
    n: "04",
    title: "Lançamento & Evolução",
    description:
      "Go-live monitorado, observabilidade, suporte e iteração contínua baseada em dados reais.",
    icon: Rocket,
  },
];

export function Process() {
  return (
    <section id="processo" className="cv-auto relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease }}
            className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted"
          >
            Processo
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            <span className="text-gradient">Do briefing ao deploy,</span>
            <br />
            <span className="text-gradient-accent">sem surpresas.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className="mt-4 text-base text-muted sm:text-lg"
          >
            Um processo enxuto, transparente e focado em resultado em cada etapa.
          </motion.p>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease, delay: 0.06 * i }}
                className="relative flex flex-col rounded-3xl glass p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-muted-2">
                    {step.n}
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-white/[0.04]">
                    <Icon className="h-4.5 w-4.5 text-accent-2" aria-hidden />
                  </span>
                </div>
                <h3 className="font-display mt-6 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <span
                    className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-border-strong lg:block"
                    aria-hidden
                  />
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
