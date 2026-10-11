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

// ---------------------------------------------------------------------------
// Trava de escopo (pedido do João Pedro, 11/10/2026): o chat do site só fala dos
// serviços da SixCode e NUNCA gera código. O prompt já proíbe, mas prompt sozinho
// pode ser driblado, então há duas travas determinísticas, fora do modelo:
//   1) pedidoForaDoEscopo(): recusa ANTES de chamar a IA (também economiza tokens)
//      quando a mensagem pede código/script/SQL ou tenta manipular as instruções;
//   2) respostaTemCodigo(): se mesmo assim a IA devolver código, a resposta é
//      descartada e trocada pela recusa.
// Perguntas legítimas como "vocês fazem sites em React?" NÃO são bloqueadas: o
// bloqueio exige um verbo de pedir/escrever junto de "código/script/função/query...".
const RECUSA =
  "Eu só consigo ajudar com os serviços e trabalhos da SixCode, como sites, sistemas, apps e automações. Para outros assuntos, fala com o nosso time!";

// Remove só as marcas combinantes dos acentos (U+0300 a U+036F). NÃO usar \p{Diacritic}: essa
// classe inclui o acento grave (`) e apagaria as crases triplas que denunciam bloco de código.
const normalizar = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const PEDE_CODIGO =
  /(escrev|escreva|cri[ae]|criar|faca|fazer|gere|gerar|monte|montar|programe|codifique|implemente|desenvolva|me de|me passe|me mande|me mostre|mostre|corrija|conserte|explique|traduza|converta|otimize|refatore|debug)[^.?!\n]{0,60}(codigo|script|funcao|algoritmo|query|snippet|regex|expressao regular|comando|shell|bash|powershell|sql)/;
const BLOCO_DE_CODIGO = /```|<\/?(script|html|div|body|style)\b|\bselect\b[^.\n]{0,60}\bfrom\b|\bdrop\s+table\b/;
const MANIPULACAO =
  /(ignore|ignorar|esqueca|esquecer|desconsidere|desconsiderar|desobedeca)[^.?!\n]{0,50}(instrucoes|regras|prompt|anteriores|acima)|system prompt|prompt do sistema|(suas|tuas|sua) (instrucoes|regras) (internas|originais|secretas)|(revele|mostre|repita|resuma|vaze)[^.?!\n]{0,30}(prompt|instrucoes)|modo (desenvolvedor|dev|deus)|developer mode|jailbreak|\bdan\b|finja (que )?(voce )?(e|eh|ser)|aja como (se )?(voce )?(fosse|um|uma)|voce agora (e|eh|sera)|api key|chave da api/;

function pedidoForaDoEscopo(messages: ChatMessage[]): boolean {
  // Só olha o que o visitante escreveu; o histórico "assistant" vem do navegador e não é confiável.
  return messages
    .filter((m) => m.role === "user")
    .some((m) => {
      const t = normalizar(m.content);
      return PEDE_CODIGO.test(t) || BLOCO_DE_CODIGO.test(t) || MANIPULACAO.test(t);
    });
}

function respostaTemCodigo(reply: string): boolean {
  return (
    /```/.test(reply) ||
    /^\s*(import\s|from\s+\S+\s+import\s|def\s|function\s|const\s|let\s|var\s|class\s|#include|public\s+(static|class)|SELECT\s|INSERT\s+INTO|<\?php|<\/?(html|script|div)\b)/m.test(reply) ||
    (reply.match(/[{};]\s*$/gm) ?? []).length >= 3
  );
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

  // Trava 1: recusa antes de gastar chamada à IA.
  if (pedidoForaDoEscopo(messages)) {
    return json({ reply: RECUSA, cta: true });
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
    const rawReply = data.choices?.[0]?.message?.content?.trim();
    if (!rawReply) {
      return json(
        { error: "Não consegui responder agora. Tenta de novo em instantes." },
        { status: 502 },
      );
    }

    const cta = /\[\[CONTATO\]\]\s*$/.test(rawReply);
    const reply = rawReply.replace(/\[\[CONTATO\]\]\s*$/, "").trim();

    // Trava 2: se a IA devolveu código mesmo assim, descarta a resposta.
    if (respostaTemCodigo(reply)) {
      return json({ reply: RECUSA, cta: true });
    }

    return json({ reply, cta });
  } catch (error) {
    console.error("Falha ao chamar a Groq:", error);
    return json(
      { error: "Não consegui responder agora. Tenta de novo em instantes." },
      { status: 502 },
    );
  }
}
