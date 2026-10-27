import type { Metadata } from "next";
import Link from "next/link";
import { PrototipoButton } from "@/components/PrototipoButton";
import { Reveal } from "@/components/Reveal";
import { solucoes } from "@/lib/solucoes";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Soluções",
  description:
    "Modelos de sites e sistemas da SixCode para postos, academias, barbearias, lojas, alimentação e oficinas, prontos para adaptar ao seu negócio.",
};

export default function SolucoesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div
        className="pointer-events-none absolute left-1/2 top-[-20rem] -z-0 h-[44rem] w-[76rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.15),transparent)] blur-3xl"
        aria-hidden="true"
      />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-8">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-white">
          SixCode<span className="text-accent-2">.</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-muted transition-colors hover:text-white">
          ← Voltar ao início
        </Link>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-8 sm:pt-20">
        <Reveal immediate><p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">Soluções SixCode</p></Reveal>
        <div className="mt-5 grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <Reveal immediate delay={0.1}><h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl">
            Site e sistema
            <br />
            <span className="text-gradient-accent">para o seu setor.</span>
          </h1></Reveal>
          <Reveal immediate delay={0.25}><p className="max-w-xl text-lg leading-relaxed text-muted">
            Modelos completos, com o site que atrai clientes e o sistema que organiza a operação. Cada um é adaptado à
            identidade e às regras do seu negócio.
          </p></Reveal>
        </div>

        <Reveal immediate delay={0.4} className="mt-10"><ul className="flex flex-wrap gap-2" aria-label="Segmentos">
          {solucoes.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-white"
              >
                {s.segmento}
              </a>
            </li>
          ))}
        </ul></Reveal>

        <div className="mt-12 space-y-6">
          {solucoes.map((s) => (
            <Reveal key={s.slug}>
            <article
              id={s.slug}
              className="scroll-mt-24 rounded-3xl border border-white/10 bg-surface p-6 sm:p-9"
            >
              <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
                <div>
                  <p className="font-mono text-xs tabular-nums text-accent-2">{s.numero}</p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-accent-2">{s.segmento}</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-white">{s.nome}</h2>
                  <p className="mt-4 text-base leading-relaxed text-muted">{s.resumo}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.destaques.map((d) => (
                      <span key={d} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted">
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-3">
                  <PrototipoButton slug={s.slug} nome={s.nome} prototipo={s.prototipo} />
                  <a
                    href={whatsappUrl(`Olá! Tenho interesse na solução "${s.nome}" da SixCode e gostaria de conversar.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.02]"
                  >
                    Quero essa solução
                  </a>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-2">Site público</h3>
                    <ul className="mt-3 space-y-2.5 text-sm text-muted">
                      {s.site.map((i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-2">Sistema interno</h3>
                    <ul className="mt-3 space-y-2.5 text-sm text-muted">
                      {s.sistema.map((i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
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
  );
}
