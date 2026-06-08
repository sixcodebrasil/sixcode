"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const techs = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "AWS",
  "Vercel",
  "Tailwind CSS",
  "Python",
  "Docker",
  "OpenAI",
  "n8n",
  "GraphQL",
  "Stripe",
];

export function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setPlaying(entry.isIntersecting);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-6xl px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-6 text-center text-xs uppercase tracking-[0.22em] text-muted-2"
        >
          Stack que dominamos
        </motion.p>
        <div ref={ref} className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
            aria-hidden
          />
          <div
            className="flex w-max animate-marquee gap-3"
            style={{ animationPlayState: playing ? "running" : "paused" }}
          >
            {[...techs, ...techs].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="whitespace-nowrap rounded-full border border-border bg-white/[0.03] px-4 py-2 text-sm text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
