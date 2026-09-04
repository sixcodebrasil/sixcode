import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioProject, portfolioProjects } from "@/lib/portfolio";

export function generateStaticParams() {
  return portfolioProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.description };
}

export default async function PortfolioProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute left-1/2 top-[-18rem] -z-0 h-[42rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.16),transparent)] blur-3xl" aria-hidden="true" />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-8"><Link href="/#cases" className="font-display text-lg font-semibold tracking-tight text-white">SixCode<span className="text-accent-2">.</span></Link><Link href="/#cases" className="text-sm font-medium text-muted transition-colors hover:text-white">← Voltar ao portfólio</Link></header>
      <article className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-8 sm:pt-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">Case {project.number} · {project.category}</p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl">{project.name}</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{project.description}</p></div><div className="border-l border-white/10 pl-6 sm:pl-8"><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-2">Entrega</p><div className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-muted">{tag}</span>)}</div><a href={project.liveUrl} target="_blank" rel="noreferrer noopener" className="mt-7 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">Acessar projeto ao vivo ↗</a></div></div>
        <div className="relative mt-16 aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.36)]"><Image src={project.imageSrc} alt={`Prévia do projeto ${project.name}`} fill priority sizes="(min-width: 1024px) 1152px, 100vw" className="object-cover object-top" /></div>
        {project.links && <section className="mt-14 border-t border-white/10 pt-7"><p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Ambientes do projeto</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{project.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer noopener" className="rounded-xl border border-white/10 px-5 py-4 text-sm font-medium text-white transition-colors hover:border-accent/60 hover:bg-white/[0.03]">{link.label} <span className="text-accent-2">↗</span></a>)}</div></section>}
      </article>
    </main>
  );
}
