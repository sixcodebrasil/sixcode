"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Code2, Rocket, Users } from "lucide-react";

const highlights = [
  { icon: Users, label: "Squad enxuto e sênior" },
  { icon: Code2, label: "Comunicação direta, sem intermediário" },
  { icon: Rocket, label: "Entrega ágil, do início ao ar" },
];

const principles = [
  ["Entender antes de construir", "Começamos pelas pessoas, pelo processo e pela meta. A tecnologia entra para resolver uma necessidade real, não para complicar o que já existe."],
  ["Trabalhar perto de quem decide", "Falamos com clareza, validamos as prioridades e mantemos o projeto visível. Você acompanha cada escolha importante sem precisar traduzir o seu negócio para uma agência."],
  ["Criar para evoluir", "Entregamos uma base confiável para o lançamento de hoje e para as melhorias que o seu negócio vai pedir amanhã."],
];

const ease = [0.22, 1, 0.36, 1] as const;

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-32 -z-10 h-56 w-2 bg-accent" aria-hidden />
      <div className="pointer-events-none absolute left-[-9rem] top-10 -z-10 h-[30rem] w-[30rem] rounded-full border border-accent/15" aria-hidden />

      <div className="mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease }} className="flex items-center gap-4">
          <span className="h-px w-10 bg-accent" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">Sobre a SixCode</p>
        </motion.div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65, ease }} className="lg:col-span-7">
            <h2 className="font-display max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl"><span className="text-gradient">Um time técnico</span><br /><span className="text-gradient-accent">que entende de negócio.</span></h2>
            <div className="mt-12 max-w-2xl border-l border-accent pl-6"><p className="text-lg leading-relaxed text-muted sm:text-xl">A SixCode atua ao lado de empresas que precisam de tecnologia mais útil, mais clara e preparada para o próximo passo. Juntamos estratégia, design e desenvolvimento em uma única conversa.</p></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-accent-2/10 blur-3xl" aria-hidden />
              <div className="relative flex items-center gap-3">
                <Image
                  src="/sixcode-mark.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 opacity-90"
                />
                <span className="h-px flex-1 bg-border" aria-hidden />
              </div>
              <ul className="relative mt-5 space-y-2.5">
                {highlights.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 rounded-xl bg-white/[0.02] px-3 py-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-2">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-sm text-muted">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted-2">A tecnologia não precisa ocupar o centro da conversa. O centro é o que sua empresa precisa realizar com ela.</p>
          </motion.div>
        </div>

        <div className="mt-16 grid border-y border-border md:grid-cols-3">
          {principles.map(([title, description], index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, ease, delay: index * 0.08 }} className="relative py-8 md:min-h-[250px] md:px-8 md:first:pl-0 md:not(:last-child):border-r md:border-border">
              <span className="font-display text-sm font-medium text-accent-2">0{index + 1}</span>
              <h3 className="font-display mt-8 text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{description}</p>
            </motion.article>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease, delay: 0.2 }} className="mt-10 max-w-4xl font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">Da primeira conversa à evolução do produto, a prioridade é fazer a tecnologia trabalhar a favor do seu negócio.</motion.p>
      </div>
    </section>
  );
}
