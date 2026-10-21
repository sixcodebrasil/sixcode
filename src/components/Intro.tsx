"use client";

import { useEffect, useState } from "react";

const CHAVE = "sixcode-intro";
const LETRAS = ["S", "I", "X", "C", "O", "D", "E"];
const DURACAO = 3300;
const SAIDA = 1800;

/** Abertura: o nome aparece letra por letra, uma linha cresce e a legenda surge. Depois as duas metades da tela se abrem e revelam o site; o robô cai de balão logo em seguida. */
export function Intro() {
  const [saindo, setSaindo] = useState(false);
  const [fim, setFim] = useState(false);

  useEffect(() => {
    try {
      // já vista nesta sessão: o script do <head> esconde o quadro antes mesmo de pintar
      if (sessionStorage.getItem(CHAVE)) return;
      sessionStorage.setItem(CHAVE, "1");
    } catch {
      /* sem sessionStorage a abertura roda toda vez, sem problema */
    }
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const t1 = setTimeout(() => {
      setSaindo(true);
      window.dispatchEvent(new Event("sixcode:intro-aberta"));
    }, DURACAO);
    const t2 = setTimeout(() => {
      setFim(true);
      html.style.overflow = "";
      html.setAttribute("data-intro", "visto");
    }, DURACAO + SAIDA);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      html.style.overflow = "";
    };
  }, []);

  if (fim) return null;

  return (
    <div data-intro-overlay data-saindo={saindo} className="intro" role="presentation" aria-hidden="true">
      <div className="intro-painel intro-painel-esq" />
      <div className="intro-painel intro-painel-dir" />
      <div className="intro-glow" />
      <div className="intro-corpo">
        <h1 className="intro-nome" aria-label="SixCode">
          {LETRAS.map((l, i) => (
            <span key={i} className={i > 2 ? "intro-letra intro-acento" : "intro-letra"} style={{ animationDelay: `${0.25 + i * 0.16}s` }}>
              {l}
            </span>
          ))}
        </h1>
        <span className="intro-linha" />
        <span className="intro-legenda">Tecnologia sob medida</span>
      </div>
    </div>
  );
}
