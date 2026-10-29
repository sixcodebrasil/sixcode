import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SolucaoCard } from "@/components/SolucaoCard";
import { solucoes } from "@/lib/solucoes";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Modelos de sites e sistemas da SixCode para postos, academias, barbearias, lojas, alimentação e oficinas, prontos para adaptar ao seu negócio.",
};

export default function SolucoesPage() {
  return (
    <>
      <Navbar base="/" />
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div
          className="pointer-events-none absolute left-1/2 top-[-20rem] -z-0 h-[44rem] w-[76rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.15),transparent)] blur-3xl"
          aria-hidden="true"
        />

        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
          <Reveal immediate><p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">Soluções SixCode</p></Reveal>
          <div className="mt-5 grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1fr_.72fr] lg:items-end">
            <Reveal immediate delay={0.1}><h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl">
              Site e sistema
              <br />
              <span className="text-gradient-accent">para o seu setor.</span>
            </h1></Reveal>
            <Reveal immediate delay={0.25}><p className="max-w-xl text-lg leading-relaxed text-muted">
              Modelos completos, com o site que atrai clientes e o sistema que organiza a operação. Navegue em cada um
              como se fosse o seu: depois adaptamos à identidade e às regras do seu negócio.
            </p></Reveal>
          </div>

          <Reveal immediate delay={0.4} className="mt-10"><ul className="flex flex-wrap gap-2" aria-label="Segmentos">
            {solucoes.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/solucoes/${s.slug}`}
                  className="inline-flex rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-white"
                >
                  {s.segmento}
                </Link>
              </li>
            ))}
          </ul></Reveal>

          <div className="mt-12 space-y-8">
            {solucoes.map((s) => (
              <Reveal key={s.slug}>
                <SolucaoCard s={s} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12"><div className="rounded-3xl border border-accent/30 bg-accent-soft p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Seu setor não está na lista?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Construímos sob medida. Conte como funciona o seu negócio e desenhamos a solução.
            </p>
            <a
              href={whatsappUrl("Olá! Meu segmento não está nas soluções do site e gostaria de conversar sobre um projeto sob medida.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black"
            >
              Falar com a SixCode
            </a>
          </div></Reveal>
        </section>
      </main>
      <Footer base="/" />
    </>
  );
}
