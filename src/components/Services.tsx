import {
  Bot,
  Cloud,
  Code2,
  Compass,
  Gauge,
  Globe,
  LayoutGrid,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const services: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Code2,
    title: "Software sob medida",
    text: "Sistemas e painéis feitos para a rotina da sua empresa.",
  },
  {
    icon: Globe,
    title: "Websites e landing pages",
    text: "Sites rápidos, pensados para transformar visita em contato.",
  },
  {
    icon: Smartphone,
    title: "Apps mobile",
    text: "Aplicativos para iPhone e Android com a sua marca.",
  },
  {
    icon: Bot,
    title: "Automações com IA",
    text: "Atendimento e tarefas repetitivas funcionando sozinhos.",
  },
  {
    icon: Compass,
    title: "Consultoria tech",
    text: "Direção técnica para decidir o que construir primeiro.",
  },
  {
    icon: LayoutGrid,
    title: "Design system",
    text: "Telas consistentes, do primeiro botão ao último relatório.",
  },
  {
    icon: Cloud,
    title: "Cloud e DevOps",
    text: "Publicação, monitoramento e infraestrutura sem dor de cabeça.",
  },
  {
    icon: Gauge,
    title: "Performance e SEO",
    text: "Velocidade e presença para ser encontrado no Google.",
  },
];

export function Services() {
  return (
    <section
      id="servicos"
      className="relative w-full overflow-hidden px-6 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-xl space-y-7 animate-fade-in-up">
            <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
              Serviços
            </div>
            <h2 className="font-display text-4xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="text-gradient">
                Tudo que seu produto precisa,
              </span>{" "}
              <span className="text-gradient-accent">sob um único time.</span>
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Engenharia, design e estratégia no mesmo time. Da ideia à
              publicação, da primeira tela ao planejamento dos próximos 12
              meses.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contato"
                className="group relative overflow-hidden rounded-xl bg-accent px-6 py-3 text-sm font-medium uppercase tracking-wider text-white shadow-accent transition-all duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">Começar projeto</span>
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  aria-hidden
                />
              </a>
              <a
                href="#cases"
                className="rounded-xl border border-border-strong bg-white/[0.04] px-6 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.08]"
              >
                Ver cases
              </a>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:pr-8">
            {services.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="animate-fade-in-up group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-2/40 hover:bg-white/[0.06]"
                style={{ animationDelay: `${120 + i * 60}ms` }}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-2 ring-1 ring-accent/30 transition-colors duration-300 group-hover:bg-accent/25">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
