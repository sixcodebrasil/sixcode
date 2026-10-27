"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { Logo } from "@/components/Logo";
import type { Prototipo, Registro } from "@/lib/prototipos";

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const TEMAS = {
  escuro: { bg: "#0d0d10", card: "#16161b", fg: "#f4f4f5", muted: "#a1a1aa", line: "rgba(255,255,255,0.1)" },
  claro: { bg: "#faf7f4", card: "#ffffff", fg: "#1a1a1a", muted: "#6b6b6b", line: "rgba(0,0,0,0.1)" },
} as const;

/** texto legível sobre a cor de destaque */
function textoSobre(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.6 ? "#111111" : "#ffffff";
}


const QUALQUER = "Qualquer disponível";

export function PrototipoDemo({ p }: { p: Prototipo }) {
  const t = TEMAS[p.tema];
  const sobre = textoSobre(p.cor);
  const contador = useRef(100);
  const [aba, setAba] = useState<"site" | "sistema">("site");
  const [registros, setRegistros] = useState<Registro[]>(p.seed);
  const [nome, setNome] = useState("");
  const [itemId, setItemId] = useState<string | null>(null);
  const [equipe, setEquipe] = useState<string | null>(null);
  const [horario, setHorario] = useState<string | null>(null);
  const [extras, setExtras] = useState<Record<string, string>>({});
  const [carrinho, setCarrinho] = useState<Record<string, number>>({});
  const [erro, setErro] = useState<string | null>(null);
  const [feito, setFeito] = useState<string | null>(null);

  const ultima = p.etapas.length - 1;
  const itens = useMemo(() => Object.fromEntries(p.itens.map((i) => [i.id, i])), [p.itens]);

  const ocupados = new Set(registros.map((r) => r.detalhe));
  const reais = (p.equipe ?? []).filter((e) => e !== QUALQUER);
  const livreComQualquer = (h: string) => reais.find((e) => !ocupados.has(`${e}, ${h}`));
  const indisponivel = (h: string) =>
    !!equipe && (equipe === QUALQUER ? !livreComQualquer(h) : ocupados.has(`${equipe}, ${h}`));
  const escolhido = itemId ? itens[itemId] : null;
  const linhasCarrinho = Object.entries(carrinho).filter(([, q]) => q > 0);
  const totalCarrinho = linhasCarrinho.reduce((s, [id, q]) => s + itens[id].preco * q, 0);
  const qtdCarrinho = linhasCarrinho.reduce((s, [, q]) => s + q, 0);

  function ajustar(id: string, delta: number) {
    setFeito(null);
    setCarrinho((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) }));
  }

  function registrar(item: string, detalhe: string, valor: number) {
    contador.current += 1;
    const novoId = `n${contador.current}`;
    setRegistros((rs) => [
      { id: novoId, cliente: nome.trim(), item, detalhe, valor, etapa: 0, quando: "Agora" },
      ...rs,
    ]);
    setFeito(`${nome.trim().split(" ")[0]}, recebemos o seu pedido.`);
    setNome("");
    setItemId(null);
    setEquipe(null);
    setHorario(null);
    setExtras({});
    setCarrinho({});
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (nome.trim().length < 2) return setErro("Informe o seu nome.");

    if (p.modo === "loja") {
      if (qtdCarrinho === 0) return setErro("Adicione ao menos um item.");
      const nomes = linhasCarrinho.map(([id]) => itens[id].nome).join(", ");
      return registrar(nomes, `${qtdCarrinho} ${qtdCarrinho === 1 ? "item" : "itens"}`, totalCarrinho);
    }

    if (!itemId) return setErro(`Escolha ${p.itensTitulo === "Planos" ? "um plano" : "um serviço"}.`);
    if (p.equipe && !equipe) return setErro(`Escolha o ${p.equipeRotulo?.toLowerCase()}.`);
    if (p.horarios && !horario) return setErro("Escolha um horário.");
    for (const c of p.campos ?? []) {
      if (!extras[c.id]?.trim()) return setErro(`Preencha: ${c.rotulo.toLowerCase()}.`);
    }
    const item = itens[itemId];
    const quem = equipe === QUALQUER && horario ? livreComQualquer(horario) : equipe;
    if (!quem && p.equipe) return setErro("Esse horário acabou de ficar ocupado. Escolha outro.");
    const detalhe = p.equipe && p.horarios ? `${quem}, ${horario}` : "Matrícula online";
    const veiculo = extras.veiculo ? ` · ${extras.veiculo}` : "";
    registrar(`${item.nome}${veiculo}`, detalhe, item.preco);
  }

  const kpis = [
    { rotulo: "Faturamento", valor: brl(registros.reduce((s, r) => s + r.valor, 0)) },
    { rotulo: p.registros, valor: String(registros.length) },
    { rotulo: "Em andamento", valor: String(registros.filter((r) => r.etapa < ultima).length) },
    { rotulo: "Ticket médio", valor: brl(registros.reduce((s, r) => s + r.valor, 0) / Math.max(1, registros.length)) },
  ];

  const botao: React.CSSProperties = { background: p.cor, color: sobre };
  const campo: React.CSSProperties = { background: t.card, color: t.fg, borderColor: t.line };

  return (
    <div
      className="min-h-screen"
      style={{ background: t.bg, color: t.fg, fontFamily: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* aviso de demonstração */}
      <div className="px-4 py-2 text-center text-xs" style={{ background: "#0b0b12", color: "#c4b5fd" }}>
        Protótipo de demonstração da SixCode. Marca, preços e clientes são fictícios.{" "}
        <Link href="/solucoes" className="underline underline-offset-2">
          Voltar às soluções
        </Link>
      </div>

      {/* topo da marca fictícia */}
      <header className="sticky top-0 z-30 border-b" style={{ background: t.bg, borderColor: t.line }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="font-display text-lg font-semibold leading-none">{p.marca}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.16em]" style={{ color: t.muted }}>
              {p.segmento}
            </p>
          </div>
          <div className="flex rounded-full border p-1 text-sm" style={{ borderColor: t.line }} role="tablist">
            {(["site", "sistema"] as const).map((a) => (
              <button
                key={a}
                type="button"
                role="tab"
                aria-selected={aba === a}
                onClick={() => setAba(a)}
                className="rounded-full px-4 py-1.5 font-medium transition-colors"
                style={aba === a ? botao : { color: t.muted }}
              >
                {a === "site" ? "Site do cliente" : "Sistema interno"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16">
        {aba === "site" ? (
          <>
            <section className="py-12 sm:py-16">
              <p className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: p.tema === "escuro" ? p.cor : t.muted }}>
                {p.tagline}
              </p>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                {p.heroTitulo}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: t.muted }}>
                {p.heroTexto}
              </p>
            </section>

            <form onSubmit={enviar} noValidate>
              <h2 className="font-display text-2xl font-semibold">{p.itensTitulo}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {p.itens.map((i) => {
                  const sel = p.modo === "agenda" && itemId === i.id;
                  const qtd = carrinho[i.id] ?? 0;
                  return (
                    <li
                      key={i.id}
                      className="rounded-2xl border p-5 transition-colors"
                      style={{ background: t.card, borderColor: sel || qtd > 0 ? p.cor : t.line }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-medium">{i.nome}</h3>
                          <p className="mt-1 text-sm leading-relaxed" style={{ color: t.muted }}>
                            {i.desc}
                          </p>
                        </div>
                        <p className="shrink-0 text-right font-display font-semibold">
                          {brl(i.preco)}
                          {i.meta && (
                            <span className="block text-xs font-normal" style={{ color: t.muted }}>
                              {i.meta}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="mt-4">
                        {p.modo === "agenda" ? (
                          <button
                            type="button"
                            onClick={() => {
                              setFeito(null);
                              setItemId(sel ? null : i.id);
                            }}
                            className="rounded-lg border px-4 py-2 text-sm font-medium"
                            style={sel ? { ...botao, borderColor: p.cor } : { borderColor: t.line }}
                          >
                            {sel ? "Selecionado" : "Selecionar"}
                          </button>
                        ) : qtd === 0 ? (
                          <button type="button" onClick={() => ajustar(i.id, 1)} className="rounded-lg border px-4 py-2 text-sm font-medium" style={{ borderColor: t.line }}>
                            Adicionar
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-3 rounded-lg border px-2 py-1" style={{ borderColor: p.cor }}>
                            <button type="button" aria-label="Diminuir" onClick={() => ajustar(i.id, -1)} className="p-1.5">
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-4 text-center text-sm font-medium">{qtd}</span>
                            <button type="button" aria-label="Aumentar" onClick={() => ajustar(i.id, 1)} className="p-1.5">
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {p.modo === "agenda" && p.equipe && p.horarios && (
                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h2 className="font-display text-xl font-semibold">{p.equipeRotulo}</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.equipe.map((e) => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => setEquipe(e)}
                          className="rounded-full border px-4 py-2 text-sm"
                          style={equipe === e ? { ...botao, borderColor: p.cor } : { borderColor: t.line }}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold">Horário de hoje</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.horarios.map((h) => {
                        const ocupado = indisponivel(h);
                        return (
                          <button
                            key={h}
                            type="button"
                            disabled={ocupado}
                            onClick={() => setHorario(h)}
                            className="rounded-full border px-4 py-2 text-sm disabled:line-through disabled:opacity-35"
                            style={horario === h ? { ...botao, borderColor: p.cor } : { borderColor: t.line }}
                          >
                            {h}
                          </button>
                        );
                      })}
                    </div>
                    {equipe && <p className="mt-2 text-xs" style={{ color: t.muted }}>Horários riscados já estão ocupados.</p>}
                  </div>
                </div>
              )}

              <div className="mt-10 rounded-2xl border p-5 sm:p-6" style={{ background: t.card, borderColor: t.line }}>
                {p.modo === "loja" && (
                  <p className="mb-4 flex items-baseline justify-between text-sm" style={{ color: t.muted }}>
                    <span>
                      Sacola: {qtdCarrinho} {qtdCarrinho === 1 ? "item" : "itens"}
                    </span>
                    <span className="font-display text-xl font-semibold" style={{ color: t.fg }}>
                      {brl(totalCarrinho)}
                    </span>
                  </p>
                )}
                {p.modo === "agenda" && (escolhido || equipe || horario) && (
                  <div className="mb-5 rounded-xl border p-4 text-sm" style={{ borderColor: t.line }}>
                    <p className="text-xs font-medium uppercase tracking-[0.16em]" style={{ color: t.muted }}>
                      Resumo
                    </p>
                    <p className="mt-2">
                      {escolhido ? `${escolhido.nome}, ${brl(escolhido.preco)}${escolhido.meta ? ` (${escolhido.meta})` : ""}` : "Escolha uma opção"}
                    </p>
                    {p.equipe && (
                      <p style={{ color: t.muted }}>
                        {equipe ?? "Profissional a escolher"}, {horario ? `hoje às ${horario}` : "horário a escolher"}
                      </p>
                    )}
                    {p.politica && (
                      <p className="mt-2 text-xs" style={{ color: t.muted }}>
                        {p.politica}
                      </p>
                    )}
                  </div>
                )}
                {(p.campos ?? []).map((c) => (
                  <div key={c.id} className="mb-4">
                    <label className="block text-sm font-medium" htmlFor={`campo-${c.id}`}>
                      {c.rotulo}
                    </label>
                    <input
                      id={`campo-${c.id}`}
                      value={extras[c.id] ?? ""}
                      onChange={(e) => setExtras({ ...extras, [c.id]: e.target.value })}
                      placeholder={c.placeholder}
                      className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
                      style={campo}
                    />
                  </div>
                ))}
                <label className="block text-sm font-medium" htmlFor="nome-cliente">
                  Seu nome
                </label>
                <input
                  id="nome-cliente"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como devemos chamar você?"
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={campo}
                />
                {erro && (
                  <p role="alert" className="mt-3 text-sm text-red-500">
                    {erro}
                  </p>
                )}
                <button type="submit" className="mt-5 w-full rounded-xl px-5 py-3 text-sm font-semibold sm:w-auto" style={botao}>
                  {p.acao}
                </button>

                {feito && (
                  <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: p.cor }}>
                    <Check className="h-4 w-4" style={{ color: p.tema === "escuro" ? p.cor : t.fg }} />
                    <span>{feito}</span>
                    <button type="button" onClick={() => setAba("sistema")} className="font-medium underline underline-offset-2">
                      Ver no sistema interno
                    </button>
                  </div>
                )}
              </div>
            </form>

            <section className="mt-12 grid gap-4 border-t pt-8 text-sm sm:grid-cols-2" style={{ borderColor: t.line }}>
              <div>
                <h2 className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: t.muted }}>
                  Onde estamos
                </h2>
                <p className="mt-2">{p.local.endereco}</p>
              </div>
              <div>
                <h2 className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: t.muted }}>
                  Horário
                </h2>
                <p className="mt-2">{p.local.horario}</p>
              </div>
            </section>
          </>
        ) : (
          <section className="py-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: t.muted }}>
              Painel da {p.segmento.toLowerCase()}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{p.registros}</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: t.muted }}>
              {p.sistemaDica}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {kpis.map((k) => (
                <div key={k.rotulo} className="rounded-2xl border p-4" style={{ background: t.card, borderColor: t.line }}>
                  <dt className="text-xs" style={{ color: t.muted }}>
                    {k.rotulo}
                  </dt>
                  <dd className="mt-2 font-display text-xl font-semibold sm:text-2xl">{k.valor}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 space-y-3">
              {registros.map((r) => {
                const fim = r.etapa >= ultima;
                return (
                  <li
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-4"
                    style={{ background: t.card, borderColor: r.quando === "Agora" ? p.cor : t.line }}
                  >
                    <div className="min-w-0">
                      <p className="font-medium">
                        {r.cliente}
                        {r.quando === "Agora" && (
                          <span className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase" style={botao}>
                            novo
                          </span>
                        )}
                      </p>
                      <p className="mt-1 truncate text-sm" style={{ color: t.muted }}>
                        {r.item} · {r.detalhe} · {r.quando}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-display font-semibold">{brl(r.valor)}</p>
                      <span className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: t.line }}>
                        {p.etapas[r.etapa]}
                      </span>
                      <button
                        type="button"
                        disabled={fim}
                        onClick={() => setRegistros((rs) => rs.map((x) => (x.id === r.id ? { ...x, etapa: x.etapa + 1 } : x)))}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium disabled:opacity-30"
                        style={botao}
                      >
                        {fim ? "Finalizado" : `Avançar para ${p.etapas[r.etapa + 1].toLowerCase()}`}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10">
              <h2 className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: t.muted }}>
                Módulos do sistema completo
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.modulos.map((m) => (
                  <span key={m} className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: t.line, color: t.muted }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t py-6" style={{ borderColor: t.line }}>
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 px-4 text-xs" style={{ color: t.muted }}>
          <span>Desenvolvido por</span>
          <span className="inline-flex rounded-md px-2 py-1" style={{ background: "#0b0b12" }}>
            <Logo height={22} />
          </span>
        </div>
      </footer>
    </div>
  );
}
