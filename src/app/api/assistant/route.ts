import { ASSISTANT_SYSTEM_PROMPT } from "@/lib/assistant-context";

export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant"; content: string };

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 8; // últimas trocas enviadas pro modelo, controla custo/tokens
const MAX_TOKENS = 400;

// Rate limit best-effort em memória da instância (zera em cold start, não é
// distribuído) — mesmo padrão já usado no middleware do contratosgov-hub.
// Suficiente pra segurar abuso básico num site institucional, não é defesa
// contra ataque coordenado.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function sanitizeHistory(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null;
  const messages = input
    .filter(
      (item): item is ChatMessage =>
        !!item &&
        typeof item === "object" &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim().length > 0,
    )
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }));
  if (messages.length === 0) return null;
  return messages.slice(-MAX_HISTORY);
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Assistente indisponível no momento. Chama a gente no WhatsApp!" },
      { status: 503 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Calma aí! Manda sua próxima pergunta em um minutinho." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const messages = sanitizeHistory(
    body && typeof body === "object" ? (body as { messages?: unknown }).messages : null,
  );
  if (!messages) {
    return Response.json({ error: "Manda uma pergunta pra eu poder ajudar." }, { status: 400 });
  }

  try {
    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.4,
        max_tokens: MAX_TOKENS,
        messages: [{ role: "system", content: ASSISTANT_SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!groqResponse.ok) {
      const detail = await groqResponse.text().catch(() => "");
      console.error("Groq respondeu com erro:", groqResponse.status, detail);
      return Response.json(
        { error: "Não consegui responder agora. Tenta de novo em instantes." },
        { status: 502 },
      );
    }

    const data = (await groqResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return Response.json(
        { error: "Não consegui responder agora. Tenta de novo em instantes." },
        { status: 502 },
      );
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Falha ao chamar a Groq:", error);
    return Response.json(
      { error: "Não consegui responder agora. Tenta de novo em instantes." },
      { status: 502 },
    );
  }
}
