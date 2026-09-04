"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Project = {
  number: string;
  category: string;
  name: string;
  description: string;
  tags: string[];
  href: string;
  imageSrc: string;
  links?: Array<{ label: string; href: string }>;
};

const projects: Project[] = [
  {
    number: "01",
    category: "Produto com IA",
    name: "Guarda-Roupa IA",
    description: "Protótipo mobile para organização de peças, recomendação de looks e descoberta de combinações personalizadas com apoio de inteligência artificial.",
    tags: ["IA", "Produto mobile", "UX/UI"],
    href: "https://prototipo-guardaroupa-ia.vercel.app",
    imageSrc: "/cases/portfolio/case-03.png",
  },
  {
    number: "02",
    category: "SaaS vertical",
    name: "Clínica Paula",
    description: "Plataforma de gestão clínica que reúne pacientes, agenda, prontuários, profissionais, consultas e procedimentos em uma experiência centralizada.",
    tags: ["SaaS", "Gestão", "Saúde"],
    href: "https://clinica-terapia.vercel.app",
    imageSrc: "/cases/portfolio/case-04.png",
  },
  {
    number: "03",
    category: "Website institucional",
    name: "Artemagran",
    description: "Presença digital premium para uma marmoraria de alto padrão, com narrativa institucional, catálogo de materiais e portfólio de obras realizadas.",
    tags: ["Website", "Catálogo", "Conversão"],
    href: "https://artemagran.vercel.app",
    imageSrc: "/cases/portfolio/case-05.png",
  },
  {
    number: "04",
    category: "Ecossistema de operações",
    name: "ContratosGOV",
    description: "Um conjunto de ambientes internos e protótipos conectados para apoiar fluxos, materiais e rotinas do time.",
    tags: ["Operações", "Protótipos", "Integrações"],
    href: "https://contratosgov-hub.vercel.app",
    imageSrc: "/cases/portfolio/case-06.png",
    links: [
      { label: "Central ContratosGOV", href: "https://contratosgov-hub.vercel.app" },
      { label: "Protótipo HCPA", href: "https://hcpa-prototipogov.vercel.app" },
      { label: "Oficialização de demanda", href: "https://oficializacao-demanda.vercel.app" },
      { label: "Faturamento v2", href: "https://contratosgov-faturamento-v2.vercel.app" },
    ],
  },
  {
    number: "05",
    category: "Integração",
    name: "Polar API",
    description: "Camada de integração apresentada como case técnico, conectando aplicações e serviços por meio de uma interface programável.",
    tags: ["API", "Integração", "Back-end"],
    href: "https://polar-api-murex.vercel.app",
    imageSrc: "/cases/portfolio/case-07.png",
  },
  {
    number: "06",
    category: "E-commerce",
    name: "SGS Parts",
    description: "Loja virtual para peças e acessórios, com navegação por categorias, promoções, busca de produtos e comunicação orientada à confiança e à agilidade de compra.",
    tags: ["E-commerce", "Catálogo", "Performance"],
    href: "https://sgsparts.com.br",
    imageSrc: "/cases/portfolio/case-08.png",
  },
  {
    number: "07",
    category: "Catálogo digital",
    name: "SGS Catálogo",
    description: "Ambiente dedicado à consulta de peças e ferramentas para refrigeração e climatização, estruturado para apoiar cotação e descoberta de produtos.",
    tags: ["Catálogo B2B", "Cotação"],
    href: "https://catalogo.sgsparts.com.br",
    imageSrc: "/cases/portfolio/case-09.png",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Cases() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <section id="cases" className="cv-auto relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-[-14rem] top-40 -z-10 h-[32rem] w-[32rem] rounded-full border border-accent/15" aria-hidden />

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 border-t border-border pt-7 md:grid-cols-[.8fr_1.2fr] md:gap-16">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease }}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-2">Portfólio</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease, delay: 0.05 }}>
            <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"><span className="text-gradient">Projetos digitais</span><br /><span className="text-gradient-accent">feitos para funcionar.</span></h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">Conheça algumas soluções que ajudamos a transformar em produtos, operações e experiências digitais mais claras.</p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article key={project.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.55, ease, delay: Math.min(index * 0.04, 0.2) }} className="group cursor-pointer overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-[0_24px_60px_rgba(0,0,0,0.24)]" onClick={() => setSelectedProject(project)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedProject(project); } }} role="button" tabIndex={0} aria-label={`Ver detalhes do projeto ${project.name}`}>
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-black"><Image src={project.imageSrc} alt={`Prévia do projeto ${project.name}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" /><span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur">{project.number}</span><span className="absolute bottom-5 right-5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">Ver case</span></div>
              <div className="p-6 sm:p-7"><p className="text-xs font-medium uppercase tracking-[0.15em] text-accent-2">{project.category}</p><div className="mt-3 flex flex-wrap items-baseline justify-between gap-3"><h3 className="font-display text-2xl font-semibold text-foreground">{project.name}</h3><a href={project.href} target="_blank" rel="noreferrer noopener" onClick={(event) => event.stopPropagation()} className="text-sm font-medium text-foreground underline decoration-accent underline-offset-4 transition-colors hover:text-accent-2">Acessar ↗</a></div><p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p><div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.12em] text-muted-2">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{project.links && <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-accent-2">{project.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer noopener" onClick={(event) => event.stopPropagation()} className="underline decoration-accent/60 underline-offset-4 hover:text-white">{link.label} ↗</a>)}</div>}</div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="case-modal-title">
            <button type="button" className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-sm" aria-label="Fechar detalhes do projeto" onClick={() => setSelectedProject(null)} />
            <motion.div className="relative max-h-[90svh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0d0d13] shadow-[0_32px_100px_rgba(0,0,0,0.65)]" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.28, ease }}>
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8"><p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Case {selectedProject.number}</p><button type="button" onClick={() => setSelectedProject(null)} className="text-sm font-medium text-muted transition-colors hover:text-white">Fechar ×</button></div>
              <div className="grid lg:grid-cols-[1.15fr_.85fr]">
                <div className="relative min-h-72 border-b border-white/10 bg-black lg:min-h-full lg:border-b-0 lg:border-r"><Image src={selectedProject.imageSrc} alt={`Prévia ampliada do projeto ${selectedProject.name}`} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-top" /></div>
                <div className="p-6 sm:p-8 lg:p-10"><p className="text-xs font-medium uppercase tracking-[0.15em] text-accent-2">{selectedProject.category}</p><h3 id="case-modal-title" className="mt-4 font-display text-4xl font-semibold leading-tight text-white">{selectedProject.name}</h3><p className="mt-5 text-base leading-relaxed text-muted">{selectedProject.description}</p><div className="mt-7 border-t border-white/10 pt-5"><p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-2">Escopo</p><div className="mt-3 flex flex-wrap gap-2">{selectedProject.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-muted">{tag}</span>)}</div></div>{selectedProject.links && <div className="mt-7 border-t border-white/10 pt-5"><p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-2">Ambientes do projeto</p><div className="mt-3 grid gap-2">{selectedProject.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer noopener" className="text-sm font-medium text-accent-2 transition-colors hover:text-white">{link.label} ↗</a>)}</div></div>}<a href={selectedProject.href} target="_blank" rel="noreferrer noopener" className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">Acessar projeto ao vivo ↗</a></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
