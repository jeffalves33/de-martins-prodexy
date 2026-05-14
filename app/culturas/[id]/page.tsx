"use client"

import { use } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Package,
  Users,
  BarChart,
  Leaf,
} from "lucide-react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { StatCard } from "@/components/stat-card"
import {
  culturas,
  lancamentos,
  registrosDiarias,
  calcularReceitaPorCultura,
  calcularDespesaPorCultura,
  calcularLucroPorCultura,
  calcularMargemPorCultura,
  calcularLucroPorHectare,
  calcularCustoPorHectare,
  formatarMoeda,
  formatarPorcentagem,
  formatarData,
  type Cultura as CulturaType,
} from "@/lib/mock-data"

export default function CulturaDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const culturaId = id as CulturaType
  const cultura = culturas.find((c) => c.id === culturaId)

  if (!cultura) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-64">
          <div className="container mx-auto p-6 pt-16 lg:pt-6">
            <p>Cultura não encontrada</p>
          </div>
        </main>
      </div>
    )
  }

  const receita = calcularReceitaPorCultura(culturaId)
  const despesa = calcularDespesaPorCultura(culturaId)
  const lucro = calcularLucroPorCultura(culturaId)
  const margem = calcularMargemPorCultura(culturaId)
  const lucroPorHectare = calcularLucroPorHectare(culturaId)
  const custoPorHectare = calcularCustoPorHectare(culturaId)

  const receitasCultura = lancamentos.filter(
    (l) => l.tipo === "receita" && l.cultura === culturaId
  )
  const despesasCultura = lancamentos.filter(
    (l) => l.tipo === "despesa" && l.cultura === culturaId
  )
  const diariasCultura = registrosDiarias.filter(
    (r) => r.cultura === culturaId
  )

  const quantidadeVendida = receitasCultura.reduce(
    (acc, l) => acc + (l.quantidade || 0),
    0
  )
  const ticketMedio = quantidadeVendida > 0 ? receita / quantidadeVendida : 0

  // Dados para gráfico mensal
  const dadosMensais = [
    { mes: "Jan", receita: 0, despesa: 0 },
    { mes: "Fev", receita: 0, despesa: 0 },
  ]

  receitasCultura.forEach((l) => {
    const mes = new Date(l.data).getMonth()
    if (mes === 0) dadosMensais[0].receita += l.valor
    if (mes === 1) dadosMensais[1].receita += l.valor
  })

  despesasCultura.forEach((l) => {
    const mes = new Date(l.data).getMonth()
    if (mes === 0) dadosMensais[0].despesa += l.valor
    if (mes === 1) dadosMensais[1].despesa += l.valor
  })

  diariasCultura.forEach((r) => {
    const mes = new Date(r.data).getMonth()
    if (mes === 0) dadosMensais[0].despesa += r.valorDiaria
    if (mes === 1) dadosMensais[1].despesa += r.valorDiaria
  })

  // Custos por categoria
  const custosPorCategoria: Record<string, number> = {}
  despesasCultura.forEach((l) => {
    custosPorCategoria[l.categoria] =
      (custosPorCategoria[l.categoria] || 0) + l.valor
  })
  const totalDiarias = diariasCultura.reduce(
    (acc, r) => acc + r.valorDiaria,
    0
  )
  if (totalDiarias > 0) {
    custosPorCategoria["Mão de obra"] =
      (custosPorCategoria["Mão de obra"] || 0) + totalDiarias
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="container mx-auto p-6 pt-16 lg:pt-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Link href="/culturas">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${cultura.cor}20` }}
                  >
                    <Leaf
                      className="h-6 w-6"
                      style={{ color: cultura.cor }}
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {cultura.nome}
                    </h1>
                    <p className="text-muted-foreground">
                      {cultura.areaHectares} hectares • Unidade:{" "}
                      {cultura.unidadeVenda}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards de métricas */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Receita"
                value={formatarMoeda(receita)}
                trend="up"
                trendValue="+15%"
                description="vs. mês anterior"
                icon={<DollarSign className="h-4 w-4" />}
              />
              <StatCard
                title="Despesas"
                value={formatarMoeda(despesa)}
                trend="down"
                trendValue="+8%"
                description="vs. mês anterior"
                icon={<Package className="h-4 w-4" />}
              />
              <StatCard
                title="Lucro"
                value={formatarMoeda(lucro)}
                trend={lucro >= 0 ? "up" : "down"}
                trendValue={lucro >= 0 ? "+20%" : "-5%"}
                description="vs. mês anterior"
                icon={<TrendingUp className="h-4 w-4" />}
              />
              <StatCard
                title="Margem"
                value={formatarPorcentagem(margem)}
                description="de lucro"
                icon={<BarChart className="h-4 w-4" />}
              />
            </div>

            {/* Segunda linha de métricas */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Custo por Hectare"
                value={formatarMoeda(custoPorHectare)}
                icon={<Leaf className="h-4 w-4" />}
              />
              <StatCard
                title="Lucro por Hectare"
                value={formatarMoeda(lucroPorHectare)}
                icon={<TrendingUp className="h-4 w-4" />}
              />
              <StatCard
                title="Quantidade Vendida"
                value={`${quantidadeVendida} ${cultura.unidadeVenda}s`}
                icon={<Package className="h-4 w-4" />}
              />
              <StatCard
                title="Preço Médio"
                value={formatarMoeda(ticketMedio)}
                description={`por ${cultura.unidadeVenda}`}
                icon={<DollarSign className="h-4 w-4" />}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Gráfico de evolução */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Evolução Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={dadosMensais}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-muted"
                        />
                        <XAxis dataKey="mes" className="text-xs" />
                        <YAxis
                          className="text-xs"
                          tickFormatter={(value) =>
                            `R$ ${(value / 1000).toFixed(0)}k`
                          }
                        />
                        <Tooltip
                          formatter={(value: number) => formatarMoeda(value)}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar
                          dataKey="receita"
                          name="Receita"
                          fill={cultura.cor}
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="despesa"
                          name="Despesa"
                          fill="hsl(var(--chart-4))"
                          radius={[4, 4, 0, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Principais custos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Principais Custos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(custosPorCategoria)
                      .sort(([, a], [, b]) => b - a)
                      .map(([categoria, valor]) => (
                        <div
                          key={categoria}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-sm">{categoria}</span>
                          </div>
                          <span className="text-sm font-medium">
                            {formatarMoeda(valor)}
                          </span>
                        </div>
                      ))}
                    {Object.keys(custosPorCategoria).length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Nenhum custo registrado
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabelas de receitas e despesas */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Receitas */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Receitas ({receitasCultura.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {receitasCultura.slice(0, 5).map((l) => (
                          <TableRow key={l.id}>
                            <TableCell className="whitespace-nowrap">
                              {formatarData(l.data)}
                            </TableCell>
                            <TableCell className="max-w-[150px] truncate">
                              {l.descricao}
                            </TableCell>
                            <TableCell className="text-right font-medium text-primary">
                              {formatarMoeda(l.valor)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Despesas */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Despesas ({despesasCultura.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {despesasCultura.slice(0, 5).map((l) => (
                          <TableRow key={l.id}>
                            <TableCell className="whitespace-nowrap">
                              {formatarData(l.data)}
                            </TableCell>
                            <TableCell className="max-w-[150px] truncate">
                              {l.descricao}
                            </TableCell>
                            <TableCell className="text-right font-medium text-destructive">
                              {formatarMoeda(l.valor)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
