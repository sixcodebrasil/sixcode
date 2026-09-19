"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getSessionId } from "@/lib/session-id";

// Ponte temporária (mesmo motivo do assistente): sixcode.com.br roda num
// projeto Vercel que não é o nosso, sem acesso ao banco. Enquanto isso,
// manda o page view pra API deste projeto (que já tem DATABASE_URL
// configurada). Reverter pra "/api/track" quando isso for resolvido.
const TRACK_URL = "https://sixcode-site.vercel.app/api/track";

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || null,
      sessionId: getSessionId(),
    });
    fetch(TRACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
