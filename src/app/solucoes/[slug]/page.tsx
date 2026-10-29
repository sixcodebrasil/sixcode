import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SolucaoCard } from "@/components/SolucaoCard";
import { getSolucao, solucoes } from "@/lib/solucoes";

export function generateStaticParams() {
  return solucoes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/solucoes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolucao(slug);
  if (!s) return {};
  return { title: `${s.segmento} · Soluções`, description: s.resumo };
}

export default async function SolucaoPage({ params }: PageProps<"/solucoes/[slug]">) {
  const { slug } = await params;
  const s = getSolucao(slug);
  if (!s) notFound();
  const outras = solucoes.filter((o) => o.slug !== s.slug);

  return (
    <>
      <Navbar base="/" />
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div
          className="pointer-events-none absolute left-1/2 top-[-20rem] -z-0 h-[44rem] w-[76rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.15),transparent)] blur-3xl"
          aria-hidden="true"
        />

        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
          <Reveal immediate>
            <Link href="/solucoes" className="text-sm font-medium text-muted transition-colors hover:text-white">
              ← Todas as soluções
            </Link>
          </Reveal>
          <Reveal immediate delay={0.1}>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl">
              {s.segmento}
              <span className="text-gradient-accent">.</span>
            </h1>
          </Reveal>

          <Reveal immediate delay={0.2} className="mt-10">
            <SolucaoCard s={s} detalhe />
          </Reveal>

          <div className="mt-20">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">Outros segmentos</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {outras.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/solucoes/${o.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
                  >
                    <span className="relative block aspect-[16/9] overflow-hidden bg-black">
                      <Image
                        src={`/solucoes/${o.slug}-site.webp`}
                        alt={`Site do modelo ${o.marca}`}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="flex items-center justify-between gap-3 p-4">
                      <span>
                        <span className="block text-[11px] uppercase tracking-[0.15em] text-accent-2">{o.marca}</span>
                        <span className="mt-1 block font-medium text-white">{o.segmento}</span>
                      </span>
                      <span className="text-sm text-accent-2" aria-hidden="true">↗</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer base="/" />
    </>
  );
}
