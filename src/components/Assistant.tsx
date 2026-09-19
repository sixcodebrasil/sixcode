"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Oi! Eu sou o assistente da SixCode. Pode perguntar sobre nossos serviços, o processo de trabalho ou os projetos do portfólio.",
};

const MAX_INPUT_LENGTH = 500;
const ease = [0.22, 1, 0.36, 1] as const;

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const content = input.trim();
    if (!content || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply ?? data.error ?? "Não consegui responder agora, tenta de novo.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "Deu ruim pra conectar. Tenta de novo em instantes." },
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
            className="glass-strong shadow-soft fixed bottom-24 right-4 left-4 z-50 flex h-[min(600px,70vh)] flex-col overflow-hidden rounded-2xl sm:bottom-28 sm:left-auto sm:right-8 sm:h-[560px] sm:w-[380px]"
          >
            <header className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-2">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="font-display truncate text-sm font-semibold text-foreground">
                  Assistente SixCode
                </p>
                <p className="truncate text-xs text-muted">Pergunte sobre nossos trabalhos</p>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
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
                onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT_LENGTH))}
                placeholder="Escreva sua pergunta…"
                aria-label="Sua pergunta pro assistente"
                disabled={loading}
                className="h-11 flex-1 min-w-0 rounded-xl border border-border bg-white/[0.03] px-3.5 text-sm text-foreground placeholder:text-muted-2 focus:border-accent-2 focus:outline-none disabled:opacity-60"
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
