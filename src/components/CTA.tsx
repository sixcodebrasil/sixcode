"use client";

import { motion } from "motion/react";

const steps = [
  ["01", "Reunião de descoberta", "Agendamos uma conversa com o analista de projetos para entender sua empresa, o desafio e o resultado que você espera alcançar."],
  ["02", "Proposta com protótipo", "Com esse contexto, montamos a proposta e apresentamos um protótipo para você visualizar a solução antes de seguir."],
  ["03", "Início e prazo definido", "Após a aprovação, iniciamos o projeto e alinhamos o menor prazo viável para a entrega, com etapas claras do começo ao fim."],
];

const ease = [0.22, 1, 0.36, 1] as const;

export function CTA() {
  return (
    <section id="contato" className="cv-auto relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full border border-accent/20" aria-hidden />
      <div className="pointer-events-none absolute -right-4 top-32 h-40 w-40 rounded-full border border-accent/20" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-accent-2" />
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease }} className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">Vamos conversar</motion.p>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease }} className="lg:col-span-5">
            <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"><span className="text-gradient">Uma conversa clara</span><br /><span className="text-gradient-accent">para começar bem.</span></h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-300 sm:text-lg">Sem proposta genérica e sem escopo no escuro. A gente entende primeiro, mostra o caminho e só então coloca o projeto em movimento.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <a href="https://wa.me/5541999327660" target="_blank" rel="noreferrer noopener" className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-accent transition-transform duration-200 hover:scale-[1.02]">Agendar uma reunião</a>
              <a href="mailto:sixcodebrasil@gmail.com" className="inline-flex min-w-[220px] flex-col items-start rounded-lg border border-white/20 px-5 py-3 text-left transition-colors hover:bg-white/[0.06]"><span className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">Prefere por e-mail?</span><span className="mt-1 text-sm font-medium text-white">sixcodebrasil@gmail.com</span></a>
            </div>
          </motion.div>

          <ol className="relative border-l border-white/15 pl-8 lg:col-span-7">
            {steps.map(([number, title, description], index) => (
              <motion.li key={number} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, ease, delay: index * 0.08 }} className="relative border-b border-white/15 pb-8 pt-1 last:border-b-0 last:pb-0">
                <span className="absolute -left-[37px] top-3 h-2.5 w-2.5 rounded-full bg-accent-2 shadow-[0_0_20px_rgba(139,92,246,.9)]" aria-hidden />
                <span className="font-display text-sm font-medium text-accent-2">{number}</span>
                <h3 className="font-display mt-3 text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">{description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
