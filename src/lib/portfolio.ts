export type PortfolioProject = {
  slug: string;
  number: string;
  category: string;
  name: string;
  description: string;
  tags: string[];
  liveUrl: string;
  imageSrc: string;
  links?: Array<{ label: string; href: string }>;
};

export const portfolioProjects: PortfolioProject[] = [
  { slug: "guarda-roupa-ia", number: "01", category: "Produto com IA", name: "Guarda-Roupa IA", description: "Protótipo mobile para organização de peças, recomendação de looks e descoberta de combinações personalizadas com apoio de inteligência artificial.", tags: ["IA", "Produto mobile", "UX/UI"], liveUrl: "https://prototipo-guardaroupa-ia.vercel.app", imageSrc: "/cases/portfolio/case-03.png" },
  { slug: "clinica-paula", number: "02", category: "SaaS vertical", name: "Clínica Paula", description: "Plataforma de gestão clínica que reúne pacientes, agenda, prontuários, profissionais, consultas e procedimentos em uma experiência centralizada.", tags: ["SaaS", "Gestão", "Saúde"], liveUrl: "https://clinica-terapia.vercel.app", imageSrc: "/cases/portfolio/case-04.png" },
  { slug: "artemagran", number: "03", category: "Website institucional", name: "Artemagran", description: "Presença digital premium para uma marmoraria de alto padrão, com narrativa institucional, catálogo de materiais e portfólio de obras realizadas.", tags: ["Website", "Catálogo", "Conversão"], liveUrl: "https://artemagran.vercel.app", imageSrc: "/cases/portfolio/case-05.png" },
  { slug: "contratosgov", number: "04", category: "Ecossistema de operações", name: "ContratosGOV", description: "Um conjunto de ambientes internos e protótipos conectados para apoiar fluxos, materiais e rotinas do time.", tags: ["Operações", "Protótipos", "Integrações"], liveUrl: "https://contratosgov-hub.vercel.app", imageSrc: "/cases/portfolio/case-06.png", links: [{ label: "Central ContratosGOV", href: "https://contratosgov-hub.vercel.app" }, { label: "Protótipo HCPA", href: "https://hcpa-prototipogov.vercel.app" }, { label: "Oficialização de demanda", href: "https://oficializacao-demanda.vercel.app" }, { label: "Faturamento v2", href: "https://contratosgov-faturamento-v2.vercel.app" }] },
  { slug: "polar-api", number: "05", category: "Integração", name: "Polar API", description: "Camada de integração apresentada como case técnico, conectando aplicações e serviços por meio de uma interface programável.", tags: ["API", "Integração", "Back-end"], liveUrl: "https://polar-api-murex.vercel.app", imageSrc: "/cases/portfolio/case-07.png" },
  { slug: "sgs-parts", number: "06", category: "E-commerce", name: "SGS Parts", description: "Loja virtual para peças e acessórios, com navegação por categorias, promoções, busca de produtos e comunicação orientada à confiança e à agilidade de compra.", tags: ["E-commerce", "Catálogo", "Performance"], liveUrl: "https://sgsparts.com.br", imageSrc: "/cases/portfolio/case-08.png" },
  { slug: "sgs-catalogo", number: "07", category: "Catálogo digital", name: "SGS Catálogo", description: "Ambiente dedicado à consulta de peças e ferramentas para refrigeração e climatização, estruturado para apoiar cotação e descoberta de produtos.", tags: ["Catálogo B2B", "Cotação"], liveUrl: "https://catalogo.sgsparts.com.br", imageSrc: "/cases/portfolio/case-09.png" },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
