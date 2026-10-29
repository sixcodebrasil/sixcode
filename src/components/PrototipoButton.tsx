"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { CONSENT_TEXT } from "@/lib/prototipo-consent";
import { getSessionId } from "@/lib/session-id";

// Em produção o sixcode.com.br usa a ponte do projeto próprio, onde o banco
// está configurado (mesma situação do chat, ver Assistant.tsx).
const API_URL =
  process.env.NODE_ENV === "development"
    ? "/api/prototipo-lead"
    : "https://sixcode-site.vercel.app/api/prototipo-lead";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  slug: string;
  nome: string;
  prototipo?: string;
  className?: string;
  children?: React.ReactNode;
};

export function PrototipoButton({ slug, nome, prototipo, className, children }: Props) {
  const [aberto, setAberto] = useState(false);
  const [feito, setFeito] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [aceite, setAceite] = useState(false);
  const primeiro = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!aberto) return;
    primeiro.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("keydown", onKey);
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = antes;
    };
  }, [aberto]);

  function abrir() {
    setErro(null);
    setFeito(false);
    setAberto(true);
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (enviando) return;
    if (form.name.trim().length < 2) return setErro("Informe seu nome.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) return setErro("Confira o e-mail.");
    if (form.phone.replace(/\D/g, "").length < 10) return setErro("Confira o telefone com DDD.");
    if (!aceite) return setErro("Marque o aceite para continuar.");

    setErro(null);
    setEnviando(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          segment: slug,
          consent: true,
          sessionId: getSessionId(),
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      // Sem banco no ambiente local o pedido não é gravado, mas a demonstração segue.
      // Em produção qualquer falha avisa a pessoa, para o lead não se perder em silêncio.
      const semBancoLocal = process.env.NODE_ENV === "development" && res.status === 503;
      if (!res.ok && !semBancoLocal) {
        setErro(data?.error ?? "Não consegui enviar agora. Tente de novo.");
        return;
      }
    } catch {
      setErro("Sem conexão no momento. Tente de novo.");
      return;
    } finally {
      setEnviando(false);
    }

    setFeito(true);
    if (prototipo) window.open(prototipo, "_blank", "noopener,noreferrer");
  }

  const campo =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-muted-2 outline-none transition-colors focus:border-accent/60";

  return (
    <>
      <button
        type="button"
        onClick={abrir}
        className={
          className ??
          "inline-flex items-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30"
        }
      >
        {children ?? "Ver protótipo"}
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/80 p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => e.target === e.currentTarget && setAberto(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`proto-${slug}`}
              className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-surface p-6 shadow-[0_40px_90px_-30px_rgba(139,92,246,0.45)] sm:max-w-md sm:rounded-3xl sm:p-8"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease }}
            >
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setAberto(false)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {feito ? (
                <div className="py-4 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-2">
                    <Check className="h-6 w-6" />
                  </span>
                  <h3 id={`proto-${slug}`} className="mt-5 font-display text-2xl font-semibold text-white">
                    Recebemos seus dados
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {prototipo
                      ? "O protótipo abriu em uma nova aba. Se o navegador bloqueou, use o botão abaixo."
                      : "Este protótipo está em preparo. Nossa equipe envia o acesso por e-mail ou WhatsApp em breve."}
                  </p>
                  {prototipo && (
                    <a
                      href={prototipo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black"
                    >
                      Abrir protótipo
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={enviar} noValidate>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Protótipo</p>
                  <h3 id={`proto-${slug}`} className="mt-2 font-display text-2xl font-semibold leading-tight text-white">
                    {nome}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Deixe seus dados para ver o protótipo. É rápido.
                  </p>

                  <div className="mt-6 space-y-3">
                    <input
                      ref={primeiro}
                      className={campo}
                      placeholder="Seu nome"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      className={campo}
                      type="email"
                      placeholder="Seu e-mail"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                      className={campo}
                      type="tel"
                      inputMode="tel"
                      placeholder="Telefone com DDD"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted">
                    <input
                      type="checkbox"
                      checked={aceite}
                      onChange={(e) => setAceite(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#8b5cf6]"
                    />
                    <span>{CONSENT_TEXT}</span>
                  </label>

                  {erro && (
                    <p role="alert" className="mt-4 text-sm text-red-400">
                      {erro}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={enviando}
                    className="mt-6 w-full rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.01] disabled:opacity-60"
                  >
                    {enviando ? "Enviando..." : "Ver protótipo"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
