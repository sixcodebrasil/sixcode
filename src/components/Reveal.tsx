"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Entrada suave: sobe e aparece quando entra na tela. Respeita "reduzir movimento". */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** anima ao carregar, sem esperar rolar (topo da página) */
  immediate?: boolean;
}) {
  const reduzir = useReducedMotion();
  if (reduzir) return <div className={className}>{children}</div>;

  const alvo = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: alvo }
        : { whileInView: alvo, viewport: { once: true, margin: "-80px" } })}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
