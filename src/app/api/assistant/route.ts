import { ASSISTANT_SYSTEM_PROMPT } from "@/lib/assistant-context";

export const dynamic = "force-dynamic";

// Ponte temporária: o domínio sixcode.com.br roda num projeto Vercel que não
// é o nosso (time do Renan), então a GROQ_API_KEY de lá ainda não está
// configurada (19/09/2026). Enquanto isso, o widget do site real chama esta
// API aqui (que já tem a chave configurada com segurança nas env vars deste
// projeto) via URL absoluta — por isso o CORS liberado só pra esse domínio.
// Reverter assim que a env var for configurada do lado do Renan: tirar esse
// header e voltar o fetch do Assistant.tsx pra usar o path relativo.
const ALLOWED_ORIGIN = "https://www.sixcode.com.br";

function withCors(response: Response, origin: string | null) {
  if (origin === ALLOWED_ORIGIN || origin === "https://sixcode.com.br") {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Vary", "Origin");
  }
  return response;
}

export async function OPTIONS(request: Request) {
  const response = new Response(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return withCors(response, request.headers.get("origin"));
}

type ChatMessage = { role: "user" | "assistant"; content: string };

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
// llama-3.3-70b-versatile foi descontinuado pela Groq (404 model_not_found,
// achado em produção em 19/09/2026) — trocado pro gpt-oss-120b, que é modelo
// de raciocínio (retorna um campo "reasoning" além de "content", já ignorado
// aqui). Conferir a lista atual em GET /openai/v1/models antes de trocar de
// novo, os modelos da Groq mudam sem aviso.
const GROQ_MODEL = "openai/gpt-oss-120b";

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
  const origin = request.headers.get("origin");
  const json = (data: unknown, init?: ResponseInit) =>
    withCors(Response.json(data, init), origin);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return json(
      { error: "Assistente indisponível no momento. Chama a gente no WhatsApp!" },
      { status: 503 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";
  if (isRateLimited(ip)) {
    return json(
      { error: "Calma aí! Manda sua próxima pergunta em um minutinho." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Requisição inválida." }, { status: 400 });
  }

  const messages = sanitizeHistory(
    body && typeof body === "object" ? (body as { messages?: unknown }).messages : null,
  );
  if (!messages) {
    return json({ error: "Manda uma pergunta pra eu poder ajudar." }, { status: 400 });
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
        reasoning_effort: "low",
        messages: [{ role: "system", content: ASSISTANT_SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!groqResponse.ok) {
      const detail = await groqResponse.text().catch(() => "");
      console.error("Groq respondeu com erro:", groqResponse.status, detail);
      return json(
        { error: "Não consegui responder agora. Tenta de novo em instantes." },
        { status: 502 },
      );
    }

    const data = (await groqResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return json(
        { error: "Não consegui responder agora. Tenta de novo em instantes." },
        { status: 502 },
      );
    }

    return json({ reply });
  } catch (error) {
    console.error("Falha ao chamar a Groq:", error);
    return json(
      { error: "Não consegui responder agora. Tenta de novo em instantes." },
      { status: 502 },
    );
  }
}
