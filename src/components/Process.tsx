"use client";

import { motion } from "motion/react";

const steps = [
  ["01", "Imersão", "Entendemos o cenário, o público e o que precisa mudar no negócio antes de definir qualquer tela ou tecnologia."],
  ["02", "Direção", "Organizamos prioridades, experiência e arquitetura em um plano claro para o projeto começar com segurança."],
  ["03", "Construção", "Trabalhamos em ciclos curtos, com entregas visíveis e espaço para ajustar o que realmente importa."],
  ["04", "Evolução", "Lançamos, acompanhamos e melhoramos a solução conforme ela passa a fazer parte da sua operação."],
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Process() {
  return (
    <section id="processo" className="cv-auto relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-[-12rem] top-24 -z-10 h-[34rem] w-[34rem] rounded-full border border-accent/20" aria-hidden />
      <div className="pointer-events-none absolute right-[-5rem] top-40 -z-10 h-[22rem] w-[22rem] rounded-full border border-accent/15" aria-hidden />

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease }} className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">Nosso processo</p>
            <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl"><span className="text-gradient">Do primeiro contexto</span><br /><span className="text-gradient-accent">ao produto em movimento.</span></h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">Um caminho objetivo para tirar o projeto do papel, com conversa franca e entregas que você consegue acompanhar.</p>
            <div className="mt-10 hidden h-px w-24 bg-accent lg:block" />
          </motion.div>

          <ol className="relative border-l border-border lg:col-span-8">
            {steps.map(([number, title, description], index) => (
              <motion.li key={number} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, ease, delay: index * 0.07 }} className="relative grid gap-5 border-b border-border py-8 pl-8 sm:grid-cols-[84px_1fr] sm:gap-7 sm:py-10">
                <span className="absolute -left-[5px] top-11 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_20px_rgba(139,92,246,.8)]" aria-hidden />
                <span className="font-display text-4xl font-medium leading-none text-accent-2/80">{number}</span>
                <div><h3 className="font-display text-2xl font-semibold text-foreground">{title}</h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{description}</p></div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10 border-l-2 border-accent pl-5 text-sm text-muted-2">Projeto bem conduzido não depende de adivinhação. Depende de processo.</motion.p>
      </div>
    </section>
  );
}
