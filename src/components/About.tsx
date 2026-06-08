"use client";

import { motion } from "motion/react";
import { ShieldCheck, Zap, Heart, Gauge } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const values = [
  {
    icon: ShieldCheck,
    title: "Engenharia confiável",
    description:
      "Código revisado, testado e documentado. Nada de gambiarras para entregar mais rápido.",
  },
  {
    icon: Zap,
    title: "Velocidade real",
    description:
      "MVPs em semanas. Roadmaps em sprints curtos. Time enxuto e síncrono com o seu.",
  },
  {
    icon: Gauge,
    title: "Performance obsessiva",
    description:
      "Métricas de Core Web Vitals, custo de cloud e UX como cidadãos de primeira classe.",
  },
  {
    icon: Heart,
    title: "Parceria de longo prazo",
    description:
      "A gente fica. Suporte, evolução e roadmap junto do seu time depois do lançamento.",
  },
];

export function About() {
  return (
    <section id="sobre" className="cv-auto relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease }}
              className="flex w-fit items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted"
            >
              Sobre a SixCode
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.05 }}
              className="font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              <span className="text-gradient">Uma startup de tecnologia</span>
              <br />
              <span className="text-gradient-accent">pensada como produto.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.12 }}
              className="mt-5 text-base leading-relaxed text-muted sm:text-lg"
            >
              Nascemos para ser o time técnico que sua empresa não precisou contratar.
              Trabalhamos lado a lado com fundadores, PMs e líderes de tecnologia
              para tirar ideias do papel — e mantê-las crescendo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                "Software sob medida",
                "Web & Mobile",
                "Cloud-native",
                "IA & Automação",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full glass px-3.5 py-1.5 text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="md:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.li
                    key={v.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease, delay: 0.05 * i }}
                    className="rounded-3xl glass p-6"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-white/[0.04]">
                      <Icon className="h-4.5 w-4.5 text-accent-2" aria-hidden />
                    </span>
                    <h3 className="font-display mt-5 text-lg font-semibold">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {v.description}
                    </p>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
