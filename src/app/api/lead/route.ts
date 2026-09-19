import { Pool } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// Lead capturado antes de liberar o chat de IA (nome + WhatsApp), gravado na
// mesma base Neon do CRM, mesma ponte já usada por /api/track e /api/assistant.
const ALLOWED_ORIGINS = new Set([
  "https://www.sixcode.com.br",
  "https://sixcode.com.br",
]);

function withCors(response: Response, origin: string | null) {
  if (origin && ALLOWED_ORIGINS.has(origin)) {
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

let pool: Pool | null = null;
function getPool(): Pool | null {
  if (pool) return pool;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  pool = new Pool({ connectionString: url });
  return pool;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const json = (data: unknown, init?: ResponseInit) =>
    withCors(Response.json(data, init), origin);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }

  const { name, whatsapp, sessionId } = (body ?? {}) as {
    name?: string;
    whatsapp?: string;
    sessionId?: string;
  };

  const cleanName = (name ?? "").trim().slice(0, 150);
  const cleanWhatsapp = (whatsapp ?? "").replace(/[^\d+]/g, "").slice(0, 30);

  if (!cleanName || cleanWhatsapp.length < 10) {
    return json(
      { ok: false, error: "Nome e WhatsApp válidos são obrigatórios." },
      { status: 400 },
    );
  }

  const db = getPool();
  if (!db)
    return json(
      { ok: false, error: "Indisponível no momento." },
      { status: 503 },
    );

  try {
    await db.query(
      "INSERT INTO site_leads (name, whatsapp, session_id) VALUES ($1, $2, $3)",
      [cleanName, cleanWhatsapp, (sessionId ?? "").slice(0, 100) || null],
    );
  } catch (error) {
    console.error("Falha ao gravar lead do chat:", error);
    return json(
      { ok: false, error: "Não consegui salvar agora." },
      { status: 500 },
    );
  }

  return json({ ok: true });
}
