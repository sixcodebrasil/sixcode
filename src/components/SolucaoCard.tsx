import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MonitorSmartphone, Play } from "lucide-react";
import { PrototipoButton } from "@/components/PrototipoButton";
import type { Solucao } from "@/lib/solucoes";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = {
  s: Solucao;
  /** na página do segmento o título não vira link e a imagem carrega com prioridade */
  detalhe?: boolean;
};

export function SolucaoCard({ s, detalhe = false }: Props) {
  const titulo = (
    <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">{s.nome}</h2>
  );

  return (
    <article
      id={s.slug}
      className="group/card relative scroll-mt-24 overflow-hidden rounded-3xl border border-white/10 bg-surface transition-colors duration-300 hover:border-accent/40"
    >
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.22),transparent)]"
        aria-hidden="true"
      />

      <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tabular-nums text-accent-2">{s.numero}</span>
            <span className="h-px w-8 bg-accent/40" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-accent-2">{s.segmento}</span>
          </div>
          {detalhe ? (
            titulo
          ) : (
            <Link href={`/solucoes/${s.slug}`} className="block transition-colors hover:text-accent-2">
              {titulo}
            </Link>
          )}
          <p className="mt-4 text-base leading-relaxed text-muted">{s.resumo}</p>

          <dl className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-black/30">
            <div className="px-3 py-3 sm:px-4">
              <dt className="text-[10px] uppercase tracking-[0.12em] text-muted-2 sm:text-[11px]">Telas</dt>
              <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-white">{s.telas}</dd>
            </div>
            <div className="px-3 py-3 sm:px-4">
              <dt className="text-[10px] uppercase tracking-[0.12em] text-muted-2 sm:text-[11px]">Entrega</dt>
              <dd className="mt-1 text-xs font-medium leading-snug text-white sm:text-sm">Site + sistema</dd>
            </div>
            <div className="px-3 py-3 sm:px-4">
              <dt className="text-[10px] uppercase tracking-[0.12em] text-muted-2 sm:text-[11px]">Modelo</dt>
              <dd className="mt-1 text-xs font-medium leading-snug text-white sm:text-sm">{s.marca}</dd>
            </div>
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2">
            {s.destaques.map((d) => (
              <li
                key={d}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs text-white"
              >
                <Check className="h-3.5 w-3.5 text-accent-2" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrototipoButton
              slug={s.slug}
              nome={s.nome}
              prototipo={s.prototipo}
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_-12px_rgba(139,92,246,0.8)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Ver o {s.marca} funcionando
            </PrototipoButton>
            <a
              href={whatsappUrl(`Olá! Tenho interesse na solução "${s.nome}" da SixCode e gostaria de conversar.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/35"
            >
              Quero essa solução
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <PrototipoButton
          slug={s.slug}
          nome={s.nome}
          prototipo={s.prototipo}
          className="relative block w-full pb-10 text-left sm:pb-14"
        >
          <span className="sr-only">Abrir o modelo {s.marca}</span>
          <span className="block overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover/card:-translate-y-1">
            <span className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </span>
              <span className="ml-2 truncate rounded-md bg-black/50 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                sixcode.com.br/prototipos/{s.slug}
              </span>
            </span>
            <span className="relative block aspect-[16/10]">
              <Image
                src={`/solucoes/${s.slug}-site.webp`}
                alt={`Site do modelo ${s.marca}`}
                fill
                priority={detalhe}
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover object-top"
              />
            </span>
          </span>

          <span className="absolute bottom-0 right-3 block w-[46%] overflow-hidden rounded-xl border border-white/20 bg-black shadow-[0_24px_60px_-10px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover/card:-translate-y-2 sm:right-6">
            <span className="relative block aspect-[16/10]">
              <Image
                src={`/solucoes/${s.slug}-painel.webp`}
                alt={`Sistema interno do modelo ${s.marca}`}
                fill
                sizes="(min-width: 1024px) 300px, 46vw"
                className="object-cover object-top"
              />
            </span>
          </span>

          <span className="absolute bottom-3 left-0 hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-3 py-1.5 text-[11px] font-medium text-white sm:bottom-5">
            <MonitorSmartphone className="h-3.5 w-3.5 text-accent-2" aria-hidden="true" />
            Site do cliente + sistema da equipe
          </span>
        </PrototipoButton>
      </div>

      <div className="relative grid gap-6 border-t border-white/10 px-6 py-6 sm:grid-cols-2 sm:px-9">
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-2">Site público</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            {s.site.map((i) => (
              <li key={i} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-2">Sistema interno</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
            {s.sistema.map((i) => (
              <li key={i} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
