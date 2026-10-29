export type Solucao = {
  slug: string;
  numero: string;
  segmento: string;
  nome: string;
  resumo: string;
  /** o que o cliente final vê */
  site: string[];
  /** o que a equipe usa no dia a dia */
  sistema: string[];
  destaques: string[];
  /** nome do modelo demonstrativo (ex.: Six Fuel) */
  marca: string;
  /** quantas telas o modelo tem para navegar, entre site e sistema */
  telas: number;
  /** clone do modelo servido em public/prototipos/<slug> */
  prototipo: string;
};

export const solucoes: Solucao[] = [
  {
    slug: "postos",
    numero: "01",
    segmento: "Postos de combustíveis",
    nome: "Gestão e automação para postos",
    resumo:
      "Pista, caixa, conveniência, tanques e financeiro em um só sistema, rápido no balcão e claro para quem administra.",
    site: ["Preços e serviços do posto", "Programa de pontos e cashback", "Localização e contato"],
    sistema: [
      "Painel de controle da pista",
      "Frente de caixa com PIX, cartões e convênios",
      "Loja de conveniência",
      "Estoque de tanques e conciliação",
      "Fechamento de caixa e de turno",
      "Painel gerencial para múltiplas unidades",
    ],
    destaques: ["Sem venda duplicada", "Histórico de cada ajuste", "Funciona com falha de internet"],
    marca: "Six Fuel",
    telas: 11,
    prototipo: "/prototipos/postos",
  },
  {
    slug: "academias",
    numero: "02",
    segmento: "Academias",
    nome: "Plataforma digital para academias",
    resumo:
      "Do site que vende planos à área do aluno e ao painel da rede, com matrícula online e cobrança recorrente.",
    site: ["Planos e matrícula online", "Unidades, modalidades e aulas", "Loja e serviços adicionais"],
    sistema: [
      "Gestão de unidades, planos e contratos",
      "Leads e CRM básico",
      "Área do aluno",
      "Pagamentos e faturamento",
      "Produtos, estoque e pedidos",
      "Notificações e painel administrativo",
    ],
    destaques: ["Matrícula sem papel", "Rede própria ou franquia", "Conteúdo fácil de atualizar"],
    marca: "Six Gym",
    telas: 21,
    prototipo: "/prototipos/academias",
  },
  {
    slug: "barbearias",
    numero: "03",
    segmento: "Barbearias",
    nome: "Plataforma integrada para barbearias",
    resumo:
      "Site próprio, agendamento em tempo real e gestão completa, com lembretes que reduzem faltas.",
    site: ["Site com a identidade da barbearia", "Agendamento online", "Área do cliente"],
    sistema: [
      "Agenda por barbeiro e unidade",
      "CRM com histórico de clientes",
      "Comissões e financeiro",
      "Lembretes e lista de espera",
      "Fidelidade, cupons e assinaturas",
      "Loja de produtos e estoque",
    ],
    destaques: ["Sem agenda duplicada", "Menos faltas", "Pronto para várias unidades"],
    marca: "Six Barber",
    telas: 18,
    prototipo: "/prototipos/barbearias",
  },
  {
    slug: "bijuterias",
    numero: "04",
    segmento: "Bijuterias e acessórios",
    nome: "E-commerce para marcas de bijuterias",
    resumo:
      "Loja virtual elegante para pequenas marcas, simples de administrar e pensada para vender pelo celular.",
    site: ["Vitrine com coleções e variações", "Carrinho e checkout", "Cupons e listas de desejo"],
    sistema: [
      "Catálogo e estoque",
      "Pedidos, pagamentos e frete",
      "Clientes e campanhas consentidas",
      "Relatórios de vendas",
      "Painel simples para a empreendedora",
    ],
    destaques: ["Rápido no celular", "Sem exigir conhecimento técnico", "Recompra e fidelização"],
    marca: "Six Bijoux",
    telas: 31,
    prototipo: "/prototipos/bijuterias",
  },
  {
    slug: "alimentacao",
    numero: "05",
    segmento: "Alimentação",
    nome: "Plataforma SaaS para negócios de alimentação",
    resumo:
      "Loja online própria, pedidos, produção e entrega conectados, para confeitarias, restaurantes e cozinhas de encomenda.",
    site: ["Cardápio e loja online por empresa", "Agendamento de encomendas", "Retirada e entrega"],
    sistema: [
      "Pedidos e agenda de produção",
      "Cozinha e fichas técnicas",
      "Estoque de ingredientes",
      "WhatsApp, e-mail e notificações",
      "Pagamentos e caixa",
      "CRM, fidelidade e promoções",
    ],
    destaques: ["Multiempresa", "Planos comerciais", "IA para apoiar o atendimento"],
    marca: "Six Food",
    telas: 9,
    prototipo: "/prototipos/alimentacao",
  },
  {
    slug: "moda",
    numero: "06",
    segmento: "Moda",
    nome: "E-commerce de moda",
    resumo:
      "Experiência editorial inspirada nas grandes marcas, adaptada para lojas pequenas e médias de roupas, calçados e acessórios.",
    site: ["Vitrine editorial", "Grade de tamanhos e cores", "Checkout e acompanhamento do pedido"],
    sistema: [
      "Catálogo com variantes",
      "Estoque e pedidos",
      "Pagamentos, logística e notificações",
      "Marketing, CRM e retenção",
      "Redes sociais e canais externos",
      "Relatórios e indicadores",
    ],
    destaques: ["SEO e desempenho", "LGPD", "Provador virtual opcional"],
    marca: "Six Wear",
    telas: 27,
    prototipo: "/prototipos/moda",
  },
  {
    slug: "oficinas",
    numero: "07",
    segmento: "Oficinas mecânicas",
    nome: "Gestão para oficinas mecânicas",
    resumo:
      "Site que capta agendamentos, portal do cliente e sistema interno com ordens de serviço, orçamento e estoque.",
    site: ["Site comercial e agendamento", "Portal do cliente", "Aprovação digital de orçamento"],
    sistema: [
      "Clientes e veículos",
      "Ordens de serviço",
      "Orçamentos e aprovação",
      "Estoque, compras e fornecedores",
      "Financeiro e custos",
      "Interface do mecânico e garantias",
    ],
    destaques: ["Cliente acompanha o serviço", "Histórico do veículo", "Retrabalho sob controle"],
    marca: "Six Motors",
    telas: 12,
    prototipo: "/prototipos/oficinas",
  },
];

export function getSolucao(slug: string) {
  return solucoes.find((s) => s.slug === slug);
}
