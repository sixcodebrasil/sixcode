"use client";

import { CTAWithTextMarquee } from "@/components/ui/cta-with-text-marquee";

const marqueeItems = [
  "Software sob medida",
  "Websites & Landing Pages",
  "Apps Mobile",
  "Automações com IA",
  "Consultoria Tech",
  "Design System",
  "Cloud & DevOps",
  "Performance & SEO",
];

export function Services() {
  return (
    <CTAWithTextMarquee
      id="servicos"
      kicker="Serviços"
      title={
        <>
          <span className="text-gradient">
            Tudo que seu produto precisa,
          </span>{" "}
          <span className="text-gradient-accent">sob um único time.</span>
        </>
      }
      description="Engenharia, design e estratégia juntos — sem agências intermediárias, sem desculpas técnicas. Da ideia ao deploy, da primeira tela ao roadmap dos próximos 12 meses."
      primaryCta={{ label: "Começar projeto", href: "#contato" }}
      secondaryCta={{ label: "Ver cases", href: "#cases" }}
      marqueeItems={marqueeItems}
      marqueeSpeed={22}
    />
  );
}
