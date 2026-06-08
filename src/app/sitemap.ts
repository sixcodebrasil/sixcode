import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixcode.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const sections = [
    "",
    "#servicos",
    "#processo",
    "#cases",
    "#sobre",
    "#contato",
  ];

  return sections.map((hash, idx) => ({
    url: `${SITE_URL}/${hash}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: idx === 0 ? 1 : 0.8,
  }));
}
