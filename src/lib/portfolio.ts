export type PortfolioProject = {
  slug: string;
  number: string;
  category: string;
  name: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  imageSrc: string;
  /** gravação real da tela, tocada na vitrine */
  video?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  { slug: "marti-moreira", number: "01", category: "Marca pessoal e loja", name: "Marti Moreira", description: "Site para uma mentora comportamental: apresentação da abordagem, pilares, depoimentos, agenda de eventos com contagem regressiva, comunidade no WhatsApp e loja de produtos digitais.", tags: ["Website", "Loja", "Marca pessoal"], liveUrl: "https://martimoreira.com.br", imageSrc: "/cases/real/marti-moreira-topo.jpg", video: "/cases/real/marti-moreira.webm" },
  { slug: "sixcode-mobil", number: "02", category: "Sistema de gestão", name: "SixCode Mobil", description: "Gestão de aluguéis, IPTU, contratos e manutenção com fluxo de caixa por proprietário, tour guiado e suporte dentro do próprio sistema. Acesso de demonstração na tela de entrada.", tags: ["SaaS", "Gestão de imóveis", "Fluxo de caixa"], liveUrl: "https://sixcodemobil.vercel.app", imageSrc: "/cases/real/sixcode-mobil-topo.jpg", video: "/cases/real/sixcode-mobil.webm" },
  { slug: "artemagran", number: "03", category: "Website institucional", name: "Artemagran", description: "Presença digital para uma marmoraria que atende construtoras, com carrossel de obras, catálogo de materiais, orçamento por carrinho enviado ao WhatsApp e mapa da loja.", tags: ["Website", "Catálogo", "Orçamento no WhatsApp"], liveUrl: "https://artemagran.vercel.app", imageSrc: "/cases/real/artemagran-topo.jpg", video: "/cases/real/artemagran.webm" },
  { slug: "sgs-parts", number: "04", category: "E-commerce", name: "SGS Parts", description: "Loja virtual para peças e acessórios, com navegação por categorias, promoções, busca de produtos e comunicação orientada à confiança e à agilidade de compra.", tags: ["E-commerce", "Catálogo", "Performance"], liveUrl: "https://sgsparts.com.br", imageSrc: "/cases/real/sgs-parts-topo.jpg", video: "/cases/real/sgs-parts.webm" },
  { slug: "sgs-catalogo", number: "05", category: "Catálogo digital", name: "SGS Catálogo", description: "Ambiente dedicado à consulta de peças e ferramentas para refrigeração e climatização, estruturado para apoiar cotação e descoberta de produtos.", tags: ["Catálogo B2B", "Cotação"], liveUrl: "https://catalogo.sgsparts.com.br", imageSrc: "/cases/real/sgs-catalogo-topo.jpg", video: "/cases/real/sgs-catalogo.webm" },
  { slug: "polar-api", number: "06", category: "Integração", name: "Polar API", description: "Camada de integração apresentada como case técnico, conectando aplicações e serviços por meio de uma interface programável.", tags: ["API", "Integração", "Back-end"], liveUrl: "https://polar-api-murex.vercel.app", imageSrc: "/cases/portfolio/case-07.png" },
  { slug: "guarda-roupa-ia", number: "07", category: "Produto com IA", name: "Guarda-Roupa IA", description: "Protótipo mobile para organização de peças, recomendação de looks e descoberta de combinações personalizadas com apoio de inteligência artificial.", tags: ["IA", "Produto mobile", "UX/UI"], imageSrc: "/cases/portfolio/case-03.png" },
  { slug: "clinica-paula", number: "08", category: "SaaS vertical", name: "Clínica Paula", description: "Plataforma de gestão clínica que reúne pacientes, agenda, prontuários, profissionais, consultas e procedimentos em uma experiência centralizada.", tags: ["SaaS", "Gestão", "Saúde"], imageSrc: "/cases/portfolio/case-04.png" },
  { slug: "contratosgov", number: "09", category: "Ecossistema de operações", name: "ContratosGOV", description: "Um conjunto de ambientes internos e protótipos conectados para apoiar fluxos, materiais e rotinas do time.", tags: ["Operações", "Protótipos", "Integrações"], imageSrc: "/cases/portfolio/case-06.png" },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
