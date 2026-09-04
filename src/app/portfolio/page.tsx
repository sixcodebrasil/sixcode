import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portfolioProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Conheça os produtos, sistemas, sites e experiências digitais desenvolvidos pela SixCode.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute left-1/2 top-[-20rem] -z-0 h-[44rem] w-[76rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.15),transparent)] blur-3xl" aria-hidden="true" />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-8"><Link href="/" className="font-display text-lg font-semibold tracking-tight text-white">SixCode<span className="text-accent-2">.</span></Link><Link href="/#cases" className="text-sm font-medium text-muted transition-colors hover:text-white">← Voltar ao início</Link></header>
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-8 sm:pt-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">Portfólio SixCode</p>
        <div className="mt-5 grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1fr_.72fr] lg:items-end"><h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl">Projetos que<br /><span className="text-gradient-accent">ganham vida.</span></h1><p className="max-w-xl text-lg leading-relaxed text-muted">Produtos digitais, plataformas e experiências construídos para ajudar negócios a operar melhor, vender mais e se posicionar com clareza.</p></div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {portfolioProjects.map((project) => <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_26px_60px_rgba(0,0,0,0.28)]"><div className="relative aspect-[16/10] overflow-hidden bg-black"><Image src={project.imageSrc} alt={`Prévia do projeto ${project.name}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" /><span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur">{project.number}</span></div><div className="p-6 sm:p-7"><p className="text-xs font-medium uppercase tracking-[0.15em] text-accent-2">{project.category}</p><div className="mt-3 flex items-baseline justify-between gap-4"><h2 className="font-display text-2xl font-semibold text-white">{project.name}</h2><span className="text-sm font-medium text-accent-2">Ver case ↗</span></div><p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p><div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.12em] text-muted-2">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></Link>)}
        </div>
      </section>
    </main>
  );
}
