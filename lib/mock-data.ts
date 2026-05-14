// Dados mock para o sistema de gestão rural

export type Cultura = "coco-verde" | "coco-seco" | "cafe" | "pimenta" | "geral"

export interface CulturaInfo {
  id: Cultura
  nome: string
  areaHectares: number
  unidadeVenda: string
  cor: string
}

export interface Lancamento {
  id: string
  data: string
  tipo: "receita" | "despesa"
  descricao: string
  categoria: string
  cultura: Cultura
  valor: number
  quantidade?: number
  unidade?: string
  formaPagamento?: string
  clienteFornecedor?: string
  observacoes?: string
}

export interface Funcionario {
  id: string
  nome: string
  tipoServico: string
  valorDiaria: number
}

export interface RegistroDiaria {
  id: string
  funcionarioId: string
  funcionarioNome: string
  data: string
  cultura: Cultura
  valorDiaria: number
  observacoes?: string
}

export interface Insumo {
  id: string
  nome: string
  tipo: "adubo" | "defensivo" | "fertilizante" | "material" | "outro"
  fornecedor: string
  data: string
  quantidade: number
  unidade: string
  valorTotal: number
  cultura: Cultura
  observacoes?: string
}

export const culturas: CulturaInfo[] = [
  { id: "coco-verde", nome: "Coco Verde", areaHectares: 8, unidadeVenda: "unidade", cor: "#22c55e" },
  { id: "coco-seco", nome: "Coco Seco", areaHectares: 3, unidadeVenda: "unidade", cor: "#a16207" },
  { id: "cafe", nome: "Café", areaHectares: 5, unidadeVenda: "saca", cor: "#78350f" },
  { id: "pimenta", nome: "Pimenta", areaHectares: 2, unidadeVenda: "kg", cor: "#dc2626" },
]

export const categoriasDespesa = [
  "Mão de obra",
  "Insumos",
  "Defensivos",
  "Adubo",
  "Manutenção",
  "Transporte",
  "Combustível",
  "Materiais",
  "Despesas gerais",
]

export const lancamentos: Lancamento[] = [
  // Receitas - Coco Verde
  { id: "1", data: "2024-01-15", tipo: "receita", descricao: "Venda de coco verde - Mercado Central", categoria: "Venda", cultura: "coco-verde", valor: 4500, quantidade: 1500, unidade: "unidade", formaPagamento: "PIX", clienteFornecedor: "Mercado Central" },
  { id: "2", data: "2024-01-22", tipo: "receita", descricao: "Venda de coco verde - Feira Livre", categoria: "Venda", cultura: "coco-verde", valor: 3200, quantidade: 1000, unidade: "unidade", formaPagamento: "Dinheiro", clienteFornecedor: "Feira Livre Municipal" },
  { id: "3", data: "2024-02-05", tipo: "receita", descricao: "Venda de coco verde - Restaurante Praia", categoria: "Venda", cultura: "coco-verde", valor: 5800, quantidade: 1800, unidade: "unidade", formaPagamento: "Transferência", clienteFornecedor: "Restaurante Praia Azul" },
  { id: "4", data: "2024-02-18", tipo: "receita", descricao: "Venda de coco verde - Distribuidora", categoria: "Venda", cultura: "coco-verde", valor: 5000, quantidade: 1600, unidade: "unidade", formaPagamento: "Boleto", clienteFornecedor: "Distribuidora Norte" },
  
  // Receitas - Coco Seco
  { id: "5", data: "2024-01-20", tipo: "receita", descricao: "Venda de coco seco - Indústria", categoria: "Venda", cultura: "coco-seco", valor: 3100, quantidade: 800, unidade: "unidade", formaPagamento: "Boleto", clienteFornecedor: "Indústria de Coco Ltda" },
  { id: "6", data: "2024-02-12", tipo: "receita", descricao: "Venda de coco seco - Atacado", categoria: "Venda", cultura: "coco-seco", valor: 3100, quantidade: 750, unidade: "unidade", formaPagamento: "PIX", clienteFornecedor: "Atacado Rural" },
  
  // Receitas - Café
  { id: "7", data: "2024-01-25", tipo: "receita", descricao: "Venda de café - Cooperativa", categoria: "Venda", cultura: "cafe", valor: 6500, quantidade: 12, unidade: "saca", formaPagamento: "Transferência", clienteFornecedor: "Cooperativa dos Cafeicultores" },
  { id: "8", data: "2024-02-20", tipo: "receita", descricao: "Venda de café especial", categoria: "Venda", cultura: "cafe", valor: 5500, quantidade: 8, unidade: "saca", formaPagamento: "PIX", clienteFornecedor: "Torrefação Premium" },
  
  // Receitas - Pimenta
  { id: "9", data: "2024-01-18", tipo: "receita", descricao: "Venda de pimenta - Feira", categoria: "Venda", cultura: "pimenta", valor: 3800, quantidade: 150, unidade: "kg", formaPagamento: "Dinheiro", clienteFornecedor: "Feira Regional" },
  { id: "10", data: "2024-02-08", tipo: "receita", descricao: "Venda de pimenta em conserva", categoria: "Venda", cultura: "pimenta", valor: 4000, quantidade: 200, unidade: "kg", formaPagamento: "PIX", clienteFornecedor: "Distribuidora de Condimentos" },
  
  // Despesas - Coco Verde
  { id: "11", data: "2024-01-10", tipo: "despesa", descricao: "Adubo NPK para coqueiral", categoria: "Adubo", cultura: "coco-verde", valor: 3200, formaPagamento: "Boleto", clienteFornecedor: "Agro Insumos" },
  { id: "12", data: "2024-01-28", tipo: "despesa", descricao: "Defensivo para pragas", categoria: "Defensivos", cultura: "coco-verde", valor: 1200, formaPagamento: "PIX", clienteFornecedor: "Casa do Agricultor" },
  { id: "13", data: "2024-02-15", tipo: "despesa", descricao: "Material de irrigação", categoria: "Materiais", cultura: "coco-verde", valor: 2100, formaPagamento: "Cartão", clienteFornecedor: "Irrigação Sul" },
  
  // Despesas - Coco Seco
  { id: "14", data: "2024-01-12", tipo: "despesa", descricao: "Fertilizante orgânico", categoria: "Adubo", cultura: "coco-seco", valor: 1100, formaPagamento: "Dinheiro", clienteFornecedor: "Orgânicos Brasil" },
  { id: "15", data: "2024-02-10", tipo: "despesa", descricao: "Transporte de coco seco", categoria: "Transporte", cultura: "coco-seco", valor: 450, formaPagamento: "Dinheiro", clienteFornecedor: "Transportadora Rural" },
  
  // Despesas - Café
  { id: "16", data: "2024-01-08", tipo: "despesa", descricao: "Adubo especial para café", categoria: "Adubo", cultura: "cafe", valor: 2800, formaPagamento: "Boleto", clienteFornecedor: "Café Insumos" },
  { id: "17", data: "2024-02-05", tipo: "despesa", descricao: "Defensivo fungicida", categoria: "Defensivos", cultura: "cafe", valor: 950, formaPagamento: "PIX", clienteFornecedor: "Agroquímica Central" },
  
  // Despesas - Pimenta
  { id: "18", data: "2024-01-15", tipo: "despesa", descricao: "Adubo para pimenteira", categoria: "Adubo", cultura: "pimenta", valor: 800, formaPagamento: "Dinheiro", clienteFornecedor: "Agro Insumos" },
  { id: "19", data: "2024-02-12", tipo: "despesa", descricao: "Embalagens para conserva", categoria: "Materiais", cultura: "pimenta", valor: 650, formaPagamento: "PIX", clienteFornecedor: "Embalagens Express" },
  
  // Despesas Gerais
  { id: "20", data: "2024-01-05", tipo: "despesa", descricao: "Combustível - veículos da fazenda", categoria: "Combustível", cultura: "geral", valor: 1200, formaPagamento: "Cartão", clienteFornecedor: "Posto Rural" },
  { id: "21", data: "2024-01-20", tipo: "despesa", descricao: "Manutenção de trator", categoria: "Manutenção", cultura: "geral", valor: 1800, formaPagamento: "Boleto", clienteFornecedor: "Mecânica Agrícola" },
  { id: "22", data: "2024-02-01", tipo: "despesa", descricao: "Combustível mensal", categoria: "Combustível", cultura: "geral", valor: 1100, formaPagamento: "Cartão", clienteFornecedor: "Posto Rural" },
  { id: "23", data: "2024-02-18", tipo: "despesa", descricao: "Ferramentas diversas", categoria: "Materiais", cultura: "geral", valor: 750, formaPagamento: "Dinheiro", clienteFornecedor: "Ferragens Central" },
]

export const funcionarios: Funcionario[] = [
  { id: "1", nome: "José da Silva", tipoServico: "Colheita", valorDiaria: 120 },
  { id: "2", nome: "Maria Santos", tipoServico: "Plantio", valorDiaria: 100 },
  { id: "3", nome: "Pedro Oliveira", tipoServico: "Manutenção", valorDiaria: 150 },
  { id: "4", nome: "Ana Costa", tipoServico: "Colheita", valorDiaria: 110 },
  { id: "5", nome: "Carlos Ferreira", tipoServico: "Irrigação", valorDiaria: 130 },
]

export const registrosDiarias: RegistroDiaria[] = [
  { id: "1", funcionarioId: "1", funcionarioNome: "José da Silva", data: "2024-01-15", cultura: "coco-verde", valorDiaria: 120, observacoes: "Colheita de coco verde" },
  { id: "2", funcionarioId: "1", funcionarioNome: "José da Silva", data: "2024-01-16", cultura: "coco-verde", valorDiaria: 120 },
  { id: "3", funcionarioId: "2", funcionarioNome: "Maria Santos", data: "2024-01-17", cultura: "cafe", valorDiaria: 100, observacoes: "Plantio de mudas novas" },
  { id: "4", funcionarioId: "3", funcionarioNome: "Pedro Oliveira", data: "2024-01-18", cultura: "geral", valorDiaria: 150, observacoes: "Manutenção de cercas" },
  { id: "5", funcionarioId: "4", funcionarioNome: "Ana Costa", data: "2024-01-19", cultura: "pimenta", valorDiaria: 110, observacoes: "Colheita de pimenta" },
  { id: "6", funcionarioId: "5", funcionarioNome: "Carlos Ferreira", data: "2024-01-20", cultura: "coco-verde", valorDiaria: 130, observacoes: "Verificação do sistema de irrigação" },
  { id: "7", funcionarioId: "1", funcionarioNome: "José da Silva", data: "2024-01-22", cultura: "coco-seco", valorDiaria: 120 },
  { id: "8", funcionarioId: "2", funcionarioNome: "Maria Santos", data: "2024-01-23", cultura: "cafe", valorDiaria: 100 },
  { id: "9", funcionarioId: "4", funcionarioNome: "Ana Costa", data: "2024-01-25", cultura: "coco-verde", valorDiaria: 110 },
  { id: "10", funcionarioId: "3", funcionarioNome: "Pedro Oliveira", data: "2024-01-26", cultura: "geral", valorDiaria: 150, observacoes: "Reparo de equipamentos" },
  { id: "11", funcionarioId: "1", funcionarioNome: "José da Silva", data: "2024-02-05", cultura: "coco-verde", valorDiaria: 120 },
  { id: "12", funcionarioId: "2", funcionarioNome: "Maria Santos", data: "2024-02-06", cultura: "pimenta", valorDiaria: 100 },
  { id: "13", funcionarioId: "5", funcionarioNome: "Carlos Ferreira", data: "2024-02-07", cultura: "cafe", valorDiaria: 130 },
  { id: "14", funcionarioId: "4", funcionarioNome: "Ana Costa", data: "2024-02-10", cultura: "coco-verde", valorDiaria: 110 },
  { id: "15", funcionarioId: "1", funcionarioNome: "José da Silva", data: "2024-02-12", cultura: "coco-seco", valorDiaria: 120 },
  { id: "16", funcionarioId: "3", funcionarioNome: "Pedro Oliveira", data: "2024-02-15", cultura: "geral", valorDiaria: 150 },
  { id: "17", funcionarioId: "2", funcionarioNome: "Maria Santos", data: "2024-02-18", cultura: "cafe", valorDiaria: 100 },
  { id: "18", funcionarioId: "4", funcionarioNome: "Ana Costa", data: "2024-02-20", cultura: "pimenta", valorDiaria: 110 },
]

export const insumos: Insumo[] = [
  { id: "1", nome: "Adubo NPK 10-10-10", tipo: "adubo", fornecedor: "Agro Insumos", data: "2024-01-10", quantidade: 500, unidade: "kg", valorTotal: 3200, cultura: "coco-verde", observacoes: "Para coqueiral principal" },
  { id: "2", nome: "Defensivo Abamectina", tipo: "defensivo", fornecedor: "Casa do Agricultor", data: "2024-01-28", quantidade: 10, unidade: "litros", valorTotal: 1200, cultura: "coco-verde" },
  { id: "3", nome: "Fertilizante orgânico", tipo: "fertilizante", fornecedor: "Orgânicos Brasil", data: "2024-01-12", quantidade: 300, unidade: "kg", valorTotal: 1100, cultura: "coco-seco" },
  { id: "4", nome: "Adubo Yara Mila", tipo: "adubo", fornecedor: "Café Insumos", data: "2024-01-08", quantidade: 400, unidade: "kg", valorTotal: 2800, cultura: "cafe", observacoes: "Aplicação em janeiro" },
  { id: "5", nome: "Fungicida Cuprozeb", tipo: "defensivo", fornecedor: "Agroquímica Central", data: "2024-02-05", quantidade: 5, unidade: "kg", valorTotal: 950, cultura: "cafe" },
  { id: "6", nome: "Adubo orgânico", tipo: "adubo", fornecedor: "Agro Insumos", data: "2024-01-15", quantidade: 200, unidade: "kg", valorTotal: 800, cultura: "pimenta" },
  { id: "7", nome: "Mangueira de irrigação", tipo: "material", fornecedor: "Irrigação Sul", data: "2024-02-15", quantidade: 100, unidade: "metros", valorTotal: 2100, cultura: "coco-verde" },
  { id: "8", nome: "Arame farpado", tipo: "material", fornecedor: "Ferragens Central", data: "2024-02-18", quantidade: 500, unidade: "metros", valorTotal: 750, cultura: "geral" },
]

// Funções auxiliares para cálculos
export function calcularReceitaPorCultura(cultura: Cultura): number {
  return lancamentos
    .filter(l => l.tipo === "receita" && l.cultura === cultura)
    .reduce((acc, l) => acc + l.valor, 0)
}

export function calcularDespesaPorCultura(cultura: Cultura): number {
  const despesasLancamentos = lancamentos
    .filter(l => l.tipo === "despesa" && l.cultura === cultura)
    .reduce((acc, l) => acc + l.valor, 0)
  
  const despesasMaoDeObra = registrosDiarias
    .filter(r => r.cultura === cultura)
    .reduce((acc, r) => acc + r.valorDiaria, 0)
  
  return despesasLancamentos + despesasMaoDeObra
}

export function calcularReceitaTotal(): number {
  return lancamentos
    .filter(l => l.tipo === "receita")
    .reduce((acc, l) => acc + l.valor, 0)
}

export function calcularDespesaTotal(): number {
  const despesasLancamentos = lancamentos
    .filter(l => l.tipo === "despesa")
    .reduce((acc, l) => acc + l.valor, 0)
  
  const despesasMaoDeObra = registrosDiarias
    .reduce((acc, r) => acc + r.valorDiaria, 0)
  
  return despesasLancamentos + despesasMaoDeObra
}

export function calcularLucroPorCultura(cultura: Cultura): number {
  const receita = calcularReceitaPorCultura(cultura)
  const despesa = calcularDespesaPorCultura(cultura)
  // Adiciona proporção das despesas gerais
  const despesaGeral = calcularDespesaPorCultura("geral")
  const totalHectares = culturas.reduce((acc, c) => acc + c.areaHectares, 0)
  const culturaInfo = culturas.find(c => c.id === cultura)
  const proporcaoDespesaGeral = culturaInfo ? (despesaGeral * culturaInfo.areaHectares) / totalHectares : 0
  
  return receita - despesa - proporcaoDespesaGeral
}

export function calcularMargemPorCultura(cultura: Cultura): number {
  const receita = calcularReceitaPorCultura(cultura)
  const lucro = calcularLucroPorCultura(cultura)
  return receita > 0 ? (lucro / receita) * 100 : 0
}

export function calcularLucroPorHectare(cultura: Cultura): number {
  const lucro = calcularLucroPorCultura(cultura)
  const culturaInfo = culturas.find(c => c.id === cultura)
  return culturaInfo && culturaInfo.areaHectares > 0 ? lucro / culturaInfo.areaHectares : 0
}

export function calcularCustoPorHectare(cultura: Cultura): number {
  const despesa = calcularDespesaPorCultura(cultura)
  const culturaInfo = culturas.find(c => c.id === cultura)
  return culturaInfo && culturaInfo.areaHectares > 0 ? despesa / culturaInfo.areaHectares : 0
}

export function obterDadosMensais() {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"]
  return meses.map((mes, index) => {
    const mesNum = index + 1
    const receitas = lancamentos
      .filter(l => l.tipo === "receita" && new Date(l.data).getMonth() + 1 === mesNum)
      .reduce((acc, l) => acc + l.valor, 0)
    const despesas = lancamentos
      .filter(l => l.tipo === "despesa" && new Date(l.data).getMonth() + 1 === mesNum)
      .reduce((acc, l) => acc + l.valor, 0)
    const maoDeObra = registrosDiarias
      .filter(r => new Date(r.data).getMonth() + 1 === mesNum)
      .reduce((acc, r) => acc + r.valorDiaria, 0)
    
    return {
      mes,
      receitas: mesNum <= 2 ? receitas : receitas * (0.8 + Math.random() * 0.4),
      despesas: mesNum <= 2 ? despesas + maoDeObra : (despesas + maoDeObra) * (0.8 + Math.random() * 0.4),
    }
  })
}

export function obterDespesasPorCategoria() {
  const categorias: Record<string, number> = {}
  
  lancamentos
    .filter(l => l.tipo === "despesa")
    .forEach(l => {
      categorias[l.categoria] = (categorias[l.categoria] || 0) + l.valor
    })
  
  // Adiciona mão de obra
  const totalMaoDeObra = registrosDiarias.reduce((acc, r) => acc + r.valorDiaria, 0)
  categorias["Mão de obra"] = totalMaoDeObra
  
  return Object.entries(categorias).map(([name, value]) => ({ name, value }))
}

export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}

export function formatarData(data: string): string {
  return new Date(data).toLocaleDateString('pt-BR')
}

export function formatarPorcentagem(valor: number): string {
  return `${valor.toFixed(1)}%`
}
