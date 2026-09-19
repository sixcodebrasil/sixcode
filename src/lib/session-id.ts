// Um id por sessão de navegador, sem cookie e sem dado pessoal. Usado tanto
// pelo beacon de analytics (site_pageviews) quanto pelo lead do chat
// (site_leads), pra dar pra cruzar "essa pessoa visitou X páginas" no CRM.
const SESSION_KEY = "sc_session_id";

export function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "sem-sessao";
  }
}
