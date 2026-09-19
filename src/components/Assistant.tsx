"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { getSessionId } from "@/lib/session-id";

type Message = { role: "user" | "assistant"; content: string; cta?: boolean };

function greetingFor(name: string): Message {
  const firstName = name.trim().split(/\s+/)[0] || "";
  return {
    role: "assistant",
    content: `Oi${firstName ? `, ${firstName}` : ""}! Eu sou o assistente da SixCode. Fazemos softwares sob medida, sites, apps e automações com IA. Pode perguntar sobre nossos serviços, o processo de trabalho ou os projetos do portfólio.`,
  };
}

const MAX_INPUT_LENGTH = 500;
const LEAD_STORAGE_KEY = "sc_lead_name";

// Ponte temporária (19/09/2026): sixcode.com.br roda num projeto Vercel que
// não é o nosso, e a GROQ_API_KEY de lá ainda não foi configurada. Enquanto
// isso, chama a API de um projeto próprio que já tem a chave configurada com
// segurança (CORS liberado só pra esse domínio, ver route.ts). Reverter pra
// "/api/assistant" assim que a env var for configurada do lado de produção.
const ASSISTANT_API_URL = "https://sixcode-site.vercel.app/api/assistant";
const LEAD_API_URL = "https://sixcode-site.vercel.app/api/lead";
const WHATSAPP_URL = "https://wa.me/5541999327660";
const EMAIL_URL = "mailto:sixcodebrasil@gmail.com";
const ease = [0.22, 1, 0.36, 1] as const;

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [leadName, setLeadName] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadNameInput, setLeadNameInput] = useState("");
  const [leadWhatsappInput, setLeadWhatsappInput] = useState("");
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadSaving, setLeadSaving] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(LEAD_STORAGE_KEY);
      if (stored) {
        setLeadName(stored);
        setMessages([greetingFor(stored)]);
      }
    } catch {
      // sessionStorage indisponível (modo privado) — só pede o lead de novo
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function submitLead() {
    const name = leadNameInput.trim();
    const whatsapp = leadWhatsappInput.trim();
    const digits = whatsapp.replace(/\D/g, "");

    if (!name) {
      setLeadError("Escreve seu nome pra gente saber com quem tá falando.");
      return;
    }
    if (digits.length < 10) {
      setLeadError("Confere o WhatsApp, parece que faltou número.");
      return;
    }

    setLeadError(null);
    setLeadSaving(true);
    try {
      await fetch(LEAD_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, sessionId: getSessionId() }),
      });
    } catch {
      // Mesmo se falhar o registro, não trava o visitante pra conversar
    } finally {
      setLeadSaving(false);
    }

    try {
      sessionStorage.setItem(LEAD_STORAGE_KEY, name);
    } catch {
      // segue sem persistir
    }
    setLeadName(name);
    setMessages([greetingFor(name)]);
  }

  async function sendMessage() {
    const content = input.trim();
    if (!content || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(ASSISTANT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as {
        reply?: string;
        error?: string;
        cta?: boolean;
      };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ??
            data.error ??
            "Não consegui responder agora, tenta de novo.",
          cta: Boolean(data.reply && data.cta),
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Deu ruim pra conectar. Tenta de novo em instantes.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Fechar assistente" : "Abrir assistente da SixCode"}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease, delay: 0.6 }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-accent transition-transform duration-200 hover:scale-105 sm:bottom-8 sm:right-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease }}
            role="dialog"
            aria-label="Assistente da SixCode"
            className="fixed bottom-24 right-4 left-4 z-50 flex h-[min(600px,70vh)] flex-col overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-soft sm:bottom-28 sm:left-auto sm:right-8 sm:h-[560px] sm:w-[380px]"
          >
            <header className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-2">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display truncate text-sm font-semibold text-foreground">
                  Assistente SixCode
                </p>
                <p className="truncate text-xs text-muted">
                  Pergunte sobre nossos trabalhos
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                title="Falar com a gente no WhatsApp"
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#25D366] px-3 text-xs font-medium text-black transition-transform duration-150 hover:scale-105"
              >
                <Phone className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </header>

            {leadName === null ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void submitLead();
                }}
                className="flex flex-1 flex-col justify-center gap-4 px-5 py-4"
              >
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">
                    Antes de começar, como podemos te chamar?
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Assim, se a conversa render um orçamento, já temos seu
                    contato pra continuar.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="assistant-lead-name" className="sr-only">
                      Seu nome
                    </label>
                    <input
                      id="assistant-lead-name"
                      type="text"
                      value={leadNameInput}
                      onChange={(event) =>
                        setLeadNameInput(event.target.value.slice(0, 150))
                      }
                      placeholder="Seu nome"
                      autoComplete="name"
                      disabled={leadSaving}
                      className="h-11 w-full rounded-xl border border-border bg-white/[0.03] px-3.5 text-base text-foreground placeholder:text-muted-2 focus:border-accent-2 focus:outline-none disabled:opacity-60 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="assistant-lead-whatsapp"
                      className="sr-only"
                    >
                      Seu WhatsApp
                    </label>
                    <input
                      id="assistant-lead-whatsapp"
                      type="tel"
                      inputMode="tel"
                      value={leadWhatsappInput}
                      onChange={(event) =>
                        setLeadWhatsappInput(event.target.value.slice(0, 20))
                      }
                      placeholder="Seu WhatsApp, com DDD"
                      autoComplete="tel"
                      disabled={leadSaving}
                      className="h-11 w-full rounded-xl border border-border bg-white/[0.03] px-3.5 text-base text-foreground placeholder:text-muted-2 focus:border-accent-2 focus:outline-none disabled:opacity-60 sm:text-sm"
                    />
                  </div>
                </div>
                {leadError ? (
                  <p className="text-xs text-red-400">{leadError}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={leadSaving}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-accent text-sm font-medium text-white transition-transform duration-150 hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60"
                >
                  {leadSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Começar conversa
                </button>
                <p className="text-center text-[11px] text-muted-2">
                  Prefere direto?{" "}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent-2 underline underline-offset-2"
                  >
                    Fala com a gente no WhatsApp
                  </a>
                </p>
              </form>
            ) : (
              <>
                <div
                  ref={scrollRef}
                  className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex flex-col gap-2 ${message.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <p
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                          message.role === "user"
                            ? "rounded-br-sm bg-accent text-white"
                            : "rounded-bl-sm border border-border bg-white/[0.03] text-foreground"
                        }`}
                      >
                        {message.content}
                      </p>
                      {message.cta ? (
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-10 items-center gap-1.5 rounded-xl bg-[#25D366] px-3.5 text-xs font-medium text-black transition-transform duration-150 hover:scale-105"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            Falar no WhatsApp
                          </a>
                          <a
                            href={EMAIL_URL}
                            className="flex h-10 items-center gap-1.5 rounded-xl border border-border bg-white/[0.03] px-3.5 text-xs font-medium text-foreground transition-colors hover:bg-white/[0.07]"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            Enviar e-mail
                          </a>
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {loading ? (
                    <div className="flex justify-start">
                      <span className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-white/[0.03] px-3.5 py-2.5 text-sm text-muted">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        digitando…
                      </span>
                    </div>
                  ) : null}
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void sendMessage();
                  }}
                  className="flex items-center gap-2 border-t border-border p-3"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value.slice(0, MAX_INPUT_LENGTH))
                    }
                    placeholder="Escreva sua pergunta…"
                    aria-label="Sua pergunta pro assistente"
                    disabled={loading}
                    className="h-11 flex-1 min-w-0 rounded-xl border border-border bg-white/[0.03] px-3.5 text-base text-foreground placeholder:text-muted-2 focus:border-accent-2 focus:outline-none disabled:opacity-60 sm:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading || input.trim().length === 0}
                    aria-label="Enviar pergunta"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-transform duration-150 hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
