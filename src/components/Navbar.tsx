"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { solucoes } from "@/lib/solucoes";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Cases", href: "#cases" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Sobre", href: "#sobre" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [solMobile, setSolMobile] = useState(false);
  const solRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!solOpen) return;
    const fora = (e: MouseEvent) => {
      if (solRef.current && !solRef.current.contains(e.target as Node)) setSolOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSolOpen(false);
    document.addEventListener("mousedown", fora);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", fora);
      document.removeEventListener("keydown", esc);
    };
  }, [solOpen]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "rounded-2xl border border-border-strong bg-surface px-4 py-2.5 shadow-soft"
              : "px-1 py-1"
          }`}
        >
          <a href="#topo" aria-label="SixCode — Início" className="rounded-lg">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l, i) => (
              <Fragment key={l.href}>
                <li>
                  <a
                    href={l.href}
                    className="rounded-lg px-3 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
                {i === 0 && (
                  <li
                    ref={solRef}
                    className="relative"
                    onMouseEnter={() => setSolOpen(true)}
                    onMouseLeave={() => setSolOpen(false)}
                  >
                    <button
                      type="button"
                      aria-expanded={solOpen}
                      aria-haspopup="true"
                      onClick={() => setSolOpen((v) => !v)}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors hover:text-white ${
                        solOpen ? "text-white" : "text-neutral-300"
                      }`}
                    >
                      Soluções
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${solOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {solOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full z-50 w-[30rem] -translate-x-1/2 pt-3"
                        >
                          <div className="rounded-2xl border border-border-strong bg-surface p-3 shadow-soft">
                            <p className="px-3 pb-2 pt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
                              Soluções por segmento
                            </p>
                            <ul className="grid grid-cols-2 gap-x-2">
                              {solucoes.map((sol) => (
                                <li key={sol.slug}>
                                  <a
                                    href={`/solucoes#${sol.slug}`}
                                    onClick={() => setSolOpen(false)}
                                    className="block rounded-lg px-3 py-2.5 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                                  >
                                    {sol.segmento}
                                  </a>
                                </li>
                              ))}
                            </ul>
                            <a
                              href="/solucoes"
                              onClick={() => setSolOpen(false)}
                              className="mt-2 flex items-center justify-between rounded-lg border-t border-white/10 px-3 pb-1 pt-3 text-sm font-medium text-accent-2 hover:text-white"
                            >
                              Ver todas as soluções
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="#contato"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.02]"
            >
              Fale conosco
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 overflow-hidden rounded-2xl border border-border-strong bg-surface p-2 shadow-soft md:hidden"
            >
              <ul className="flex flex-col">
                {links.map((l, i) => (
                  <Fragment key={l.href}>
                    <li>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
                      >
                        {l.label}
                        <ArrowUpRight className="h-4 w-4 opacity-50" />
                      </a>
                    </li>
                    {i === 0 && (
                      <li>
                        <button
                          type="button"
                          aria-expanded={solMobile}
                          onClick={() => setSolMobile((v) => !v)}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
                        >
                          Soluções
                          <ChevronDown className={`h-4 w-4 opacity-60 transition-transform ${solMobile ? "rotate-180" : ""}`} />
                        </button>
                        {solMobile && (
                          <ul className="mb-1 ml-3 border-l border-white/10 pl-2">
                            {solucoes.map((sol) => (
                              <li key={sol.slug}>
                                <a
                                  href={`/solucoes#${sol.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="block rounded-lg px-3 py-2.5 text-sm text-muted hover:text-white"
                                >
                                  {sol.segmento}
                                </a>
                              </li>
                            ))}
                            <li>
                              <a href="/solucoes" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-accent-2">
                                Ver todas as soluções
                              </a>
                            </li>
                          </ul>
                        )}
                      </li>
                    )}
                  </Fragment>
                ))}
                <li className="p-2">
                  <a
                    href="#contato"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black"
                  >
                    Fale conosco
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
