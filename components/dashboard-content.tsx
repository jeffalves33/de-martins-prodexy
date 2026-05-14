"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import { FiltroCultura, FiltroPeriodo } from "@/components/filtros"
import {
  calcularReceitaTotal,
  calcularDespesaTotal,
  calcularReceitaPorCultura,
  calcularDespesaPorCultura,
  calcularLucroPorCultura,
  calcularMargemPorCultura,
  calcularLucroPorHectare,
  calcularCustoPorHectare,
  obterDadosMensais,
  obterDespesasPorCategoria,
  formatarMoeda,
  formatarPorcentagem,
  culturas,
  type Cultura,
} from "@/lib/mock-data"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Leaf,
  BarChart3,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const CORES = ["#22c55e", "#a16207", "#78350f", "#dc2626", "#6366f1"]

export function DashboardContent() {
  const [filtroCultura, setFiltroCultura] = useState("todas")
  const [filtroPeriodo, setFiltroPeriodo] = useState("ano")

  const receitaTotal = calcularReceitaTotal()
  const despesaTotal = calcularDespesaTotal()
  const lucroTotal = receitaTotal - despesaTotal
  const margemTotal = receitaTotal > 0 ? (lucroTotal / receitaTotal) * 100 : 0

  const totalHectares = culturas.reduce((acc, c) => acc + c.areaHectares, 0)
  const custoPorHectareGeral = despesaTotal / totalHectares

  // Encontrar cultura mais rentável
  const culturaMaisRentavel = culturas.reduce(
    (melhor, cultura) => {
      const margem = calcularMargemPorCultura(cultura.id)
      return margem > melhor.margem ? { nome: cultura.nome, margem } : melhor
    },
    { nome: "", margem: -Infinity }
  )

  const dadosMensais = obterDadosMensais()
  const despesasPorCategoria = obterDespesasPorCategoria()

  // Dados para tabela de culturas
  const dadosCulturas = culturas.map((cultura) => ({
    id: cultura.id,
    nome: cultura.nome,
    cor: cultura.cor,
    receita: calcularReceitaPorCultura(cultura.id),
    despesa: calcularDespesaPorCultura(cultura.id),
    lucro: calcularLucroPorCultura(cultura.id),
    margem: calcularMargemPorCultura(cultura.id),
    areaHectares: cultura.areaHectares,
    lucroPorHectare: calcularLucroPorHectare(cultura.id),
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral da sua propriedade rural
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <FiltroPeriodo value={filtroPeriodo} onChange={setFiltroPeriodo} />
          <FiltroCultura value={filtroCultura} onChange={setFiltroCultura} />
        </div>
      </div>

      {/* Cards principais */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Receita Total"
          value={formatarMoeda(receitaTotal)}
          trend="up"
          trendValue="+12%"
          description="vs. mês anterior"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          title="Despesas Totais"
          value={formatarMoeda(despesaTotal)}
          trend="down"
          trendValue="+5%"
          description="vs. mês anterior"
          icon={<TrendingDown className="h-4 w-4" />}
        />
        <StatCard
          title="Lucro Estimado"
          value={formatarMoeda(lucroTotal)}
          trend="up"
          trendValue="+18%"
          description="vs. mês anterior"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="Margem de Lucro"
          value={formatarPorcentagem(margemTotal)}
          trend="up"
          trendValue="+3%"
          description="vs. mês anterior"
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <StatCard
          title="Custo por Hectare"
          value={formatarMoeda(custoPorHectareGeral)}
          trend="neutral"
          trendValue=""
          description={`${totalHectares} ha total`}
          icon={<Leaf className="h-4 w-4" />}
        />
        <StatCard
          title="Mais Rentável"
          value={culturaMaisRentavel.nome}
          description={`${formatarPorcentagem(culturaMaisRentavel.margem)} margem`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gráfico de Receitas x Despesas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Receitas x Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosMensais}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
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
                  <Legend />
                  <Bar
                    dataKey="receitas"
                    name="Receitas"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="despesas"
                    name="Despesas"
                    fill="hsl(var(--chart-4))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Despesas por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Despesas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={despesasPorCategoria}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {despesasPorCategoria.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CORES[index % CORES.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatarMoeda(value)}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Resultados por Cultura */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resultado por Cultura</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cultura</TableHead>
                  <TableHead className="text-right">Receita</TableHead>
                  <TableHead className="text-right">Despesa</TableHead>
                  <TableHead className="text-right">Lucro</TableHead>
                  <TableHead className="text-right">Margem</TableHead>
                  <TableHead className="text-right">Área (ha)</TableHead>
                  <TableHead className="text-right">Lucro/ha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dadosCulturas.map((cultura) => (
                  <TableRow key={cultura.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: cultura.cor }}
                        />
                        <span className="font-medium">{cultura.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatarMoeda(cultura.receita)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatarMoeda(cultura.despesa)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span
                        className={
                          cultura.lucro >= 0 ? "text-primary" : "text-destructive"
                        }
                      >
                        {formatarMoeda(cultura.lucro)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatarPorcentagem(cultura.margem)}
                    </TableCell>
                    <TableCell className="text-right">
                      {cultura.areaHectares}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatarMoeda(cultura.lucroPorHectare)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
