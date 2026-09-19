import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/lib/portfolio";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixcode.com.br";

// Âncoras (#servicos, #processo etc.) não são páginas separadas pro Google,
// são fragmentos da própria home — listar elas no sitemap não ajuda em nada
// e pode confundir o crawler. O sitemap deve ter só URLs que resolvem página
// própria: a home e cada case do portfólio.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...portfolioProjects.map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
