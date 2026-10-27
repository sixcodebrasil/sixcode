import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrototipoDemo } from "@/components/PrototipoDemo";
import { getPrototipo, prototipos } from "@/lib/prototipos";

export function generateStaticParams() {
  return prototipos.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/prototipos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPrototipo(slug);
  if (!p) return {};
  return {
    title: `Protótipo: ${p.marca}`,
    description: `Protótipo de demonstração SixCode para ${p.segmento.toLowerCase()}.`,
    robots: { index: false, follow: false },
  };
}

export default async function PrototipoPage({ params }: PageProps<"/prototipos/[slug]">) {
  const { slug } = await params;
  const p = getPrototipo(slug);
  if (!p) notFound();
  return <PrototipoDemo p={p} />;
}
