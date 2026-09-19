import { Pool } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// Analytics próprio (sem cookie de terceiro, sem serviço externo): grava
// direto na mesma base Neon do CRM, numa tabela separada (site_pageviews).
// A tela /analytics do CRM (só admin/gestor) lê daqui. CORS liberado só pro
// domínio real do site, mesma ponte já usada pelo assistente de IA.
const ALLOWED_ORIGINS = new Set(["https://www.sixcode.com.br", "https://sixcode.com.br"]);

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

function detectDevice(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return "mobile";
  if (/tablet|ipad/i.test(userAgent)) return "tablet";
  return "desktop";
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
  // Analytics nunca pode quebrar a experiência do site — qualquer falha
  // aqui responde 200 silenciosamente em vez de propagar erro.
  const respond = (ok: boolean) => withCors(Response.json({ ok }), origin);

  const db = getPool();
  if (!db) return respond(false);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return respond(false);
  }

  const { path, referrer, sessionId } = (body ?? {}) as {
    path?: string;
    referrer?: string | null;
    sessionId?: string;
  };
  if (!path || typeof path !== "string") return respond(false);

  const userAgent = request.headers.get("user-agent") ?? "";
  const device = detectDevice(userAgent);

  try {
    await db.query(
      "INSERT INTO site_pageviews (path, referrer, device, session_id) VALUES ($1, $2, $3, $4)",
      [
        path.slice(0, 500),
        (referrer ?? "").slice(0, 500) || null,
        device,
        (sessionId ?? "").slice(0, 100) || null,
      ],
    );
  } catch (error) {
    console.error("Falha ao gravar pageview:", error);
    return respond(false);
  }

  return respond(true);
}
