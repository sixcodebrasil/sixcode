import { Pool } from "@neondatabase/serverless";
import { CONSENT_TEXT, CONSENT_VERSION } from "@/lib/prototipo-consent";

export const dynamic = "force-dynamic";

// Pedido de acesso a um protótipo (/solucoes): nome, e-mail e telefone, só com
// aceite de LGPD. Grava na mesma base Neon do CRM, lida pela aba "Site".
const ALLOWED_ORIGINS = new Set([
  "https://www.sixcode.com.br",
  "https://sixcode.com.br",
]);
if (process.env.NODE_ENV !== "production") {
  ALLOWED_ORIGINS.add("http://localhost:3000");
}

const SEGMENTS = new Set([
  "postos",
  "academias",
  "barbearias",
  "bijuterias",
  "alimentacao",
  "moda",
  "oficinas",
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

let tabelaPronta = false;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  const { name, email, phone, segment, consent, sessionId } =
    (body ?? {}) as Record<string, unknown>;

  const cleanName = String(name ?? "").trim().slice(0, 150);
  const cleanEmail = String(email ?? "").trim().toLowerCase().slice(0, 200);
  const cleanPhone = String(phone ?? "").replace(/[^\d+]/g, "").slice(0, 30);
  const cleanSegment = String(segment ?? "");

  if (consent !== true) {
    return json(
      { ok: false, error: "É preciso aceitar o uso dos dados para continuar." },
      { status: 400 },
    );
  }
  if (!cleanName || !EMAIL_RE.test(cleanEmail) || cleanPhone.length < 10) {
    return json(
      { ok: false, error: "Informe nome, e-mail e telefone válidos." },
      { status: 400 },
    );
  }
  if (!SEGMENTS.has(cleanSegment)) {
    return json({ ok: false, error: "Protótipo inválido." }, { status: 400 });
  }

  const db = getPool();
  if (!db)
    return json(
      { ok: false, error: "Indisponível no momento." },
      { status: 503 },
    );

  try {
    if (!tabelaPronta) {
      await db.query(`CREATE TABLE IF NOT EXISTS site_prototype_leads (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        email text NOT NULL,
        phone text NOT NULL,
        segment text NOT NULL,
        consent boolean NOT NULL DEFAULT true,
        consent_text text,
        session_id text,
        created_at timestamptz NOT NULL DEFAULT now()
      )`);
      tabelaPronta = true;
    }
    await db.query(
      "INSERT INTO site_prototype_leads (name, email, phone, segment, consent, consent_text, session_id) VALUES ($1, $2, $3, $4, true, $5, $6)",
      [
        cleanName,
        cleanEmail,
        cleanPhone,
        cleanSegment,
        `${CONSENT_VERSION}: ${CONSENT_TEXT}`,
        String(sessionId ?? "").slice(0, 100) || null,
      ],
    );
  } catch (error) {
    console.error("Falha ao gravar pedido de protótipo:", error);
    return json(
      { ok: false, error: "Não consegui salvar agora." },
      { status: 500 },
    );
  }

  return json({ ok: true });
}
