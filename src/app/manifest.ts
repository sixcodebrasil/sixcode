import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SixCode — Tecnologia sob medida para o seu negócio",
    short_name: "SixCode",
    description:
      "Menos trabalho manual, mais resultado. Sites, sistemas e automações com IA.",
    start_url: "/",
    display: "standalone",
    background_color: "#050507",
    theme_color: "#050507",
    lang: "pt-BR",
    orientation: "portrait",
    categories: ["business", "productivity", "developer"],
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
