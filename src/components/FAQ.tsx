"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Quanto custa um projeto com a SixCode?",
    answer:
      "Depende do escopo, das funcionalidades e do prazo desejado — cada projeto é orçado individualmente, sem pacote genérico. Na reunião de descoberta entendemos sua necessidade e enviamos uma proposta com valor e prazo antes de qualquer compromisso.",
  },
  {
    question: "Quanto tempo leva para o projeto ficar pronto?",
    answer:
      "Varia com a complexidade: uma landing page costuma ser mais rápida que um sistema completo. Definimos o prazo junto com você logo na proposta, com etapas claras do início à entrega, e trabalhamos em ciclos curtos para você acompanhar o progresso.",
  },
  {
    question: "Vocês só desenvolvem, ou também cuidam do design?",
    answer:
      "Cuidamos das duas coisas. Engenharia, design e estratégia ficam no mesmo time, então não é preciso contratar uma agência à parte para o visual e outra para o código.",
  },
  {
    question: "Podem assumir um projeto que já existe?",
    answer:
      "Sim. Entramos em projetos em andamento para corrigir problemas, adicionar funcionalidades ou evoluir uma base já existente — começamos entendendo o que já foi feito antes de propor qualquer mudança.",
  },
  {
    question: "Depois que o projeto vai ao ar, o suporte acaba?",
    answer:
      "Não. Acompanhamos a solução depois do lançamento e seguimos evoluindo conforme ela passa a fazer parte da sua operação — ajustes, melhorias e novas etapas conforme o negócio pede.",
  },
  {
    question: "Fazem só sites e sistemas, ou também automações?",
    answer:
      "Também automações com IA — desde atendimento e fluxos internos até integrações entre sistemas. Se o objetivo é tirar trabalho manual e repetitivo da operação, é algo que fazemos.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 bottom-0 -z-10 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.1),transparent)]" aria-hidden />

      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-accent" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">
            Perguntas frequentes
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
          className="font-display mt-5 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        >
          <span className="text-gradient">Antes de começar,</span>{" "}
          <span className="text-gradient-accent">tira suas dúvidas.</span>
        </motion.h2>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: index * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-medium text-foreground sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-accent-2 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
