// Dados dos protótipos jogáveis de /prototipos/[slug]. Tudo é demonstração:
// marcas, preços e clientes são fictícios e nada é gravado em banco.

export type Item = { id: string; nome: string; desc: string; preco: number; meta?: string };

export type Registro = {
  id: string;
  cliente: string;
  item: string;
  detalhe: string;
  valor: number;
  /** posição em `etapas` */
  etapa: number;
  quando: string;
};

export type Prototipo = {
  slug: string;
  marca: string;
  segmento: string;
  tagline: string;
  /** cor de destaque da marca fictícia */
  cor: string;
  tema: "escuro" | "claro";
  /** agenda: escolhe item (e opcionalmente profissional e horário); loja: carrinho */
  modo: "agenda" | "loja";
  heroTitulo: string;
  heroTexto: string;
  itensTitulo: string;
  itens: Item[];
  acao: string;
  equipeRotulo?: string;
  equipe?: string[];
  horarios?: string[];
  etapas: string[];
  /** campos extras do formulário (ex.: veículo e sintomas na oficina) */
  campos?: { id: string; rotulo: string; placeholder: string }[];
  politica?: string;
  local: { endereco: string; horario: string };
  /** nome do que o sistema lista, no plural (ex.: "Agendamentos") */
  registros: string;
  sistemaDica: string;
  modulos: string[];
  seed: Registro[];
};

const r = (id: string, cliente: string, item: string, detalhe: string, valor: number, etapa: number, quando: string): Registro => ({
  id, cliente, item, detalhe, valor, etapa, quando,
});

export const prototipos: Prototipo[] = [
  {
    slug: "barbearias",
    marca: "Barba Real",
    segmento: "Barbearia",
    tagline: "Corte, barba e o bom e velho respeito.",
    cor: "#d4a24c",
    tema: "escuro",
    modo: "agenda",
    heroTitulo: "Sua cadeira já está reservada.",
    heroTexto: "Escolha o serviço, o barbeiro e o horário. Sem ligar, sem esperar resposta no WhatsApp.",
    itensTitulo: "Serviços",
    itens: [
      { id: "corte", nome: "Corte clássico", desc: "Tesoura e máquina, acabamento na navalha.", preco: 55, meta: "40 min" },
      { id: "barba", nome: "Barba completa", desc: "Toalha quente, óleo e navalha.", preco: 40, meta: "30 min" },
      { id: "combo", nome: "Corte e barba", desc: "O pacote mais pedido da casa.", preco: 85, meta: "1 h" },
      { id: "pig", nome: "Pigmentação", desc: "Disfarça falhas e realça o desenho.", preco: 70, meta: "45 min" },
    ],
    acao: "Agendar horário",
    equipeRotulo: "Barbeiro",
    equipe: ["Qualquer disponível", "Rafael", "Diego", "Marcos"],
    horarios: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    local: { endereco: "Rua das Palmeiras, 120, Centro, Curitiba", horario: "Seg a sáb, 9h às 19h" },
    politica: "Cancelamento gratuito até 2 horas antes do horário.",
    etapas: ["Confirmado", "Em atendimento", "Concluído"],
    registros: "Agendamentos",
    sistemaDica: "Avance o status conforme o cliente é atendido. Comissão e faturamento atualizam sozinhos.",
    modulos: ["Agenda por barbeiro", "Comissões", "Lembretes por WhatsApp", "Fidelidade e assinaturas", "Estoque de produtos"],
    seed: [
      r("s1", "Carlos Menezes", "Corte e barba", "Rafael, 09:00", 85, 2, "Hoje"),
      r("s2", "Bruno Tavares", "Corte clássico", "Diego, 10:00", 55, 1, "Hoje"),
      r("s3", "Felipe Duarte", "Barba completa", "Marcos, 11:00", 40, 0, "Hoje"),
    ],
  },
  {
    slug: "academias",
    marca: "Pulso Fitness",
    segmento: "Academia",
    tagline: "Treine perto, treine sempre.",
    cor: "#b6f03c",
    tema: "escuro",
    modo: "agenda",
    heroTitulo: "Matrícula em um minuto.",
    heroTexto: "Escolha o plano, informe seus dados e comece a treinar. Sem papel e sem fila na recepção.",
    itensTitulo: "Planos",
    itens: [
      { id: "mensal", nome: "Mensal", desc: "Musculação e aulas coletivas, sem fidelidade.", preco: 129, meta: "por mês" },
      { id: "trimestral", nome: "Trimestral", desc: "Tudo do mensal com desconto e avaliação física.", preco: 109, meta: "por mês" },
      { id: "anual", nome: "Anual", desc: "O melhor preço, com acesso a todas as unidades.", preco: 89, meta: "por mês" },
      { id: "personal", nome: "Plano com personal", desc: "Acompanhamento individual duas vezes por semana.", preco: 249, meta: "por mês" },
    ],
    acao: "Quero me matricular",
    local: { endereco: "Av. Brasil, 800, Batel, Curitiba", horario: "Seg a sex, 5h às 23h. Sáb e dom, 8h às 14h" },
    etapas: ["Matrícula nova", "Pagamento confirmado", "Ativa"],
    registros: "Matrículas",
    sistemaDica: "Confirme o pagamento e ative a matrícula. A receita recorrente aparece no topo.",
    modulos: ["Planos e contratos", "Cobrança recorrente", "Catraca e controle de acesso", "Área do aluno", "Rede de unidades"],
    seed: [
      r("s1", "Juliana Prado", "Anual", "Matrícula online", 89, 2, "Hoje"),
      r("s2", "Rodrigo Alves", "Mensal", "Matrícula online", 129, 1, "Hoje"),
      r("s3", "Patrícia Lima", "Plano com personal", "Matrícula online", 249, 0, "Ontem"),
    ],
  },
  {
    slug: "bijuterias",
    marca: "Lume Acessórios",
    segmento: "Bijuterias",
    tagline: "Pequenos brilhos para o seu dia.",
    cor: "#c2796b",
    tema: "claro",
    modo: "loja",
    heroTitulo: "Peças que contam quem você é.",
    heroTexto: "Banhadas, delicadas e feitas em pequenos lotes. Monte sua sacola e finalize pelo celular.",
    itensTitulo: "Novidades",
    itens: [
      { id: "brinco", nome: "Brinco Gota", desc: "Banho de ouro 18k, hipoalergênico.", preco: 59 },
      { id: "colar", nome: "Colar Ponto de Luz", desc: "Corrente fina com zircônia.", preco: 79 },
      { id: "pulseira", nome: "Pulseira Riviera", desc: "Ajustável, com fecho de segurança.", preco: 69 },
      { id: "anel", nome: "Anel Solitário", desc: "Ajustável, banho de ródio.", preco: 49 },
      { id: "kit", nome: "Kit Presente", desc: "Brinco, colar e embalagem de presente.", preco: 119 },
      { id: "choker", nome: "Choker Pérola", desc: "Pérolas cultivadas e fecho banhado.", preco: 89 },
    ],
    acao: "Finalizar pedido",
    local: { endereco: "Loja virtual com envio para todo o Brasil", horario: "Atendimento de seg a sex, 9h às 18h" },
    etapas: ["Pedido novo", "Em separação", "Enviado"],
    registros: "Pedidos",
    sistemaDica: "Separe e envie os pedidos. O estoque e o faturamento acompanham cada mudança.",
    modulos: ["Catálogo e estoque", "Pedidos e frete", "Cupons e campanhas", "Clientes e recompra", "Relatórios de vendas"],
    seed: [
      r("s1", "Mariana Costa", "Kit Presente", "1 item", 119, 2, "Ontem"),
      r("s2", "Aline Souza", "Brinco Gota, Colar Ponto de Luz", "2 itens", 138, 1, "Hoje"),
      r("s3", "Camila Rocha", "Choker Pérola", "1 item", 89, 0, "Hoje"),
    ],
  },
  {
    slug: "alimentacao",
    marca: "Doce Encomenda",
    segmento: "Alimentação",
    tagline: "Confeitaria artesanal, do forno à sua mesa.",
    cor: "#f0823c",
    tema: "escuro",
    modo: "loja",
    heroTitulo: "Faça seu pedido sem complicação.",
    heroTexto: "Escolha do cardápio, informe seus dados e acompanhe o preparo. Retirada ou entrega.",
    itensTitulo: "Cardápio",
    itens: [
      { id: "bolo", nome: "Bolo de cenoura", desc: "Cobertura de chocolate, serve 8 fatias.", preco: 68 },
      { id: "brig", nome: "Caixa de brigadeiros", desc: "12 unidades em sabores variados.", preco: 42 },
      { id: "torta", nome: "Torta de limão", desc: "Massa crocante e merengue maçaricado.", preco: 75 },
      { id: "cookie", nome: "Cookies recheados", desc: "6 unidades com recheio de Nutella.", preco: 36 },
      { id: "pave", nome: "Pavê de morango", desc: "Pote de 500 ml, feito no dia.", preco: 29 },
      { id: "salg", nome: "Cento de salgados", desc: "Coxinha, risole e quibe, fritos na hora.", preco: 95 },
    ],
    acao: "Fazer pedido",
    local: { endereco: "Rua das Flores, 45, Água Verde, Curitiba", horario: "Seg a sáb, 8h às 18h. Encomendas com 24 h de antecedência" },
    etapas: ["Novo", "Em preparo", "Pronto", "Entregue"],
    registros: "Pedidos",
    sistemaDica: "A cozinha avança o pedido até a entrega. Ingredientes e caixa se ajustam junto.",
    modulos: ["Agenda de produção", "Fichas técnicas", "Estoque de ingredientes", "WhatsApp automático", "Fidelidade e promoções"],
    seed: [
      r("s1", "Fernanda Silva", "Bolo de cenoura", "1 item", 68, 3, "Ontem"),
      r("s2", "Ricardo Gomes", "Cento de salgados", "1 item", 95, 2, "Hoje"),
      r("s3", "Beatriz Nunes", "Caixa de brigadeiros, Pavê de morango", "2 itens", 71, 1, "Hoje"),
    ],
  },
  {
    slug: "moda",
    marca: "Atelier Norte",
    segmento: "Moda",
    tagline: "Roupa feita para durar mais que a estação.",
    cor: "#111111",
    tema: "claro",
    modo: "loja",
    heroTitulo: "Coleção Outono.",
    heroTexto: "Cortes limpos, tecidos nobres e uma paleta que combina com tudo. Frete grátis acima de R$ 300.",
    itensTitulo: "Coleção",
    itens: [
      { id: "camisa", nome: "Camisa de linho", desc: "Corte reto, cor areia.", preco: 289 },
      { id: "calca", nome: "Calça alfaiataria", desc: "Cintura alta, tecido com elastano.", preco: 349 },
      { id: "vestido", nome: "Vestido midi", desc: "Viscose fluida, manga curta.", preco: 329 },
      { id: "tenis", nome: "Tênis minimal", desc: "Couro legítimo, solado de borracha.", preco: 399 },
      { id: "jaqueta", nome: "Jaqueta utilitária", desc: "Algodão pesado, quatro bolsos.", preco: 459 },
      { id: "camiseta", nome: "Camiseta essencial", desc: "Algodão pima, caimento perfeito.", preco: 119 },
    ],
    acao: "Finalizar compra",
    local: { endereco: "Alameda Júlia da Costa, 300, Curitiba", horario: "Seg a sáb, 10h às 20h" },
    etapas: ["Pagamento aprovado", "Em separação", "Despachado"],
    registros: "Pedidos",
    sistemaDica: "Despache os pedidos aprovados. Variações de tamanho e cor ficam no estoque.",
    modulos: ["Catálogo com tamanhos e cores", "Estoque por variação", "Pagamentos e logística", "CRM e retenção", "Provador virtual opcional"],
    seed: [
      r("s1", "Isabela Martins", "Vestido midi, Camiseta essencial", "2 itens", 448, 2, "Ontem"),
      r("s2", "Gustavo Reis", "Jaqueta utilitária", "1 item", 459, 1, "Hoje"),
      r("s3", "Larissa Pinto", "Calça alfaiataria", "1 item", 349, 0, "Hoje"),
    ],
  },
  {
    slug: "oficinas",
    marca: "Auto Center Prime",
    segmento: "Oficina mecânica",
    tagline: "Seu carro em boas mãos, do orçamento à entrega.",
    cor: "#3b82f6",
    tema: "escuro",
    modo: "agenda",
    heroTitulo: "Agende e acompanhe o serviço.",
    heroTexto: "Escolha o serviço e o horário. Você aprova o orçamento e vê o andamento pelo celular.",
    itensTitulo: "Serviços",
    itens: [
      { id: "revisao", nome: "Revisão completa", desc: "Óleo, filtros, freios e checklist de 30 itens.", preco: 390, meta: "3 h" },
      { id: "oleo", nome: "Troca de óleo e filtro", desc: "Óleo sintético e filtro novo.", preco: 220, meta: "40 min" },
      { id: "freio", nome: "Freios", desc: "Pastilhas, discos e fluido.", preco: 480, meta: "2 h" },
      { id: "alinh", nome: "Alinhamento e balanceamento", desc: "Equipamento a laser.", preco: 140, meta: "1 h" },
      { id: "diag", nome: "Diagnóstico eletrônico", desc: "Leitura de falhas e relatório.", preco: 120, meta: "1 h" },
    ],
    acao: "Agendar serviço",
    equipeRotulo: "Mecânico",
    equipe: ["Qualquer disponível", "Anderson", "Paulo", "Wesley"],
    horarios: ["08:00", "09:30", "11:00", "13:30", "15:00", "16:30"],
    local: { endereco: "Rua Industrial, 900, Cidade Industrial, Curitiba", horario: "Seg a sex, 8h às 18h. Sáb, 8h às 12h" },
    politica: "Reagendamento sem custo até 4 horas antes.",
    campos: [
      { id: "veiculo", rotulo: "Veículo e placa", placeholder: "Ex.: Gol 2019, ABC1D23" },
      { id: "sintomas", rotulo: "O que está acontecendo?", placeholder: "Ex.: barulho ao frear" },
    ],
    etapas: ["Solicitado", "Aguardando aprovação", "Em serviço", "Pronto para retirar"],
    registros: "Ordens de serviço",
    sistemaDica: "Cada agendamento vira uma ordem de serviço. Avance até a entrega ao cliente.",
    modulos: ["Ordens de serviço", "Orçamento com aprovação digital", "Histórico do veículo", "Estoque e compras", "Garantias e retrabalho"],
    seed: [
      r("s1", "Sérgio Nogueira", "Freios", "Anderson, 08:00", 480, 3, "Ontem"),
      r("s2", "Tatiane Moura", "Revisão completa", "Paulo, 09:30", 390, 2, "Hoje"),
      r("s3", "Henrique Dias", "Diagnóstico eletrônico", "Wesley, 11:00", 120, 0, "Hoje"),
    ],
  },
];

export function getPrototipo(slug: string) {
  return prototipos.find((p) => p.slug === slug);
}
