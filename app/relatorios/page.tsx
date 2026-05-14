"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, Printer, FileText, BarChart3, TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  culturas,
  calcularReceitaTotal,
  calcularDespesaTotal,
  calcularReceitaPorCultura,
  calcularDespesaPorCultura,
  calcularLucroPorCultura,
  calcularMargemPorCultura,
  calcularLucroPorHectare,
  obterDespesasPorCategoria,
  formatarMoeda,
  formatarPorcentagem,
} from "@/lib/mock-data"
import { useState } from "react"

export default function RelatoriosPage() {
  const [tipoRelatorio, setTipoRelatorio] = useState("balancete")

  const receitaTotal = calcularReceitaTotal()
  const despesaTotal = calcularDespesaTotal()
  const lucroTotal = receitaTotal - despesaTotal
  const margemTotal = receitaTotal > 0 ? (lucroTotal / receitaTotal) * 100 : 0

  const dadosCulturas = culturas.map((cultura) => ({
    nome: cultura.nome,
    cor: cultura.cor,
    receita: calcularReceitaPorCultura(cultura.id),
    despesa: calcularDespesaPorCultura(cultura.id),
    lucro: calcularLucroPorCultura(cultura.id),
    margem: calcularMargemPorCultura(cultura.id),
    areaHectares: cultura.areaHectares,
    lucroPorHectare: calcularLucroPorHectare(cultura.id),
  }))

  const despesasPorCategoria = obterDespesasPorCategoria()

  const dadosComparativo = culturas.map((c) => ({
    nome: c.nome,
    receita: calcularReceitaPorCultura(c.id),
    despesa: calcularDespesaPorCultura(c.id),
    lucro: calcularLucroPorCultura(c.id),
  }))

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="container mx-auto p-6 pt-16 lg:pt-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Relatórios
                </h1>
                <p className="text-muted-foreground">
                  Visualize e exporte seus dados financeiros
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
              </div>
            </div>

            {/* Seletor de relatório */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Tipo de Relatório:</span>
                  </div>
                  <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balancete">Balancete Mensal</SelectItem>
                      <SelectItem value="cultura">Resultado por Cultura</SelectItem>
                      <SelectItem value="categoria">Custos por Categoria</SelectItem>
                      <SelectItem value="hectare">Lucro por Hectare</SelectItem>
                      <SelectItem value="comparativo">Comparativo de Culturas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Balancete Mensal */}
            {tipoRelatorio === "balancete" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Balancete Geral
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-lg border bg-primary/5 p-4">
                        <p className="text-sm text-muted-foreground">Receita Total</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatarMoeda(receitaTotal)}
                        </p>
                      </div>
                      <div className="rounded-lg border bg-destructive/5 p-4">
                        <p className="text-sm text-muted-foreground">Despesa Total</p>
                        <p className="text-2xl font-bold text-destructive">
                          {formatarMoeda(despesaTotal)}
                        </p>
                      </div>
                      <div className="rounded-lg border bg-accent/10 p-4">
                        <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                        <p
                          className={`text-2xl font-bold ${
                            lucroTotal >= 0 ? "text-primary" : "text-destructive"
                          }`}
                        >
                          {formatarMoeda(lucroTotal)}
                        </p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">Margem de Lucro</p>
                        <p className="text-2xl font-bold">
                          {formatarPorcentagem(margemTotal)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Resumo por Cultura</CardTitle>
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
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dadosCulturas.map((cultura) => (
                            <TableRow key={cultura.nome}>
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
                              <TableCell
                                className={`text-right font-medium ${
                                  cultura.lucro >= 0
                                    ? "text-primary"
                                    : "text-destructive"
                                }`}
                              >
                                {formatarMoeda(cultura.lucro)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatarPorcentagem(cultura.margem)}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-muted/50 font-semibold">
                            <TableCell>Total</TableCell>
                            <TableCell className="text-right">
                              {formatarMoeda(receitaTotal)}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatarMoeda(despesaTotal)}
                            </TableCell>
                            <TableCell
                              className={`text-right ${
                                lucroTotal >= 0
                                  ? "text-primary"
                                  : "text-destructive"
                              }`}
                            >
                              {formatarMoeda(lucroTotal)}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatarPorcentagem(margemTotal)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Resultado por Cultura */}
            {tipoRelatorio === "cultura" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Resultado Detalhado por Cultura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cultura</TableHead>
                          <TableHead className="text-right">Área (ha)</TableHead>
                          <TableHead className="text-right">Receita</TableHead>
                          <TableHead className="text-right">Despesa</TableHead>
                          <TableHead className="text-right">Lucro</TableHead>
                          <TableHead className="text-right">Margem</TableHead>
                          <TableHead className="text-right">Lucro/ha</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dadosCulturas
                          .sort((a, b) => b.lucro - a.lucro)
                          .map((cultura) => (
                            <TableRow key={cultura.nome}>
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
                                {cultura.areaHectares}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatarMoeda(cultura.receita)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatarMoeda(cultura.despesa)}
                              </TableCell>
                              <TableCell
                                className={`text-right font-medium ${
                                  cultura.lucro >= 0
                                    ? "text-primary"
                                    : "text-destructive"
                                }`}
                              >
                                {formatarMoeda(cultura.lucro)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatarPorcentagem(cultura.margem)}
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
            )}

            {/* Custos por Categoria */}
            {tipoRelatorio === "categoria" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Despesas por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Categoria</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                          <TableHead className="text-right">% do Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {despesasPorCategoria
                          .sort((a, b) => b.value - a.value)
                          .map((cat) => (
                            <TableRow key={cat.name}>
                              <TableCell className="font-medium">{cat.name}</TableCell>
                              <TableCell className="text-right">
                                {formatarMoeda(cat.value)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatarPorcentagem((cat.value / despesaTotal) * 100)}
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow className="bg-muted/50 font-semibold">
                          <TableCell>Total</TableCell>
                          <TableCell className="text-right">
                            {formatarMoeda(despesaTotal)}
                          </TableCell>
                          <TableCell className="text-right">100%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lucro por Hectare */}
            {tipoRelatorio === "hectare" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Análise por Hectare</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cultura</TableHead>
                          <TableHead className="text-right">Área (ha)</TableHead>
                          <TableHead className="text-right">Receita/ha</TableHead>
                          <TableHead className="text-right">Custo/ha</TableHead>
                          <TableHead className="text-right">Lucro/ha</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dadosCulturas
                          .sort((a, b) => b.lucroPorHectare - a.lucroPorHectare)
                          .map((cultura) => (
                            <TableRow key={cultura.nome}>
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
                                {cultura.areaHectares}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatarMoeda(cultura.receita / cultura.areaHectares)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatarMoeda(cultura.despesa / cultura.areaHectares)}
                              </TableCell>
                              <TableCell
                                className={`text-right font-medium ${
                                  cultura.lucroPorHectare >= 0
                                    ? "text-primary"
                                    : "text-destructive"
                                }`}
                              >
                                {formatarMoeda(cultura.lucroPorHectare)}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comparativo */}
            {tipoRelatorio === "comparativo" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Comparativo entre Culturas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dadosComparativo}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="nome" className="text-xs" />
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
                          dataKey="receita"
                          name="Receita"
                          fill="hsl(var(--chart-1))"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="despesa"
                          name="Despesa"
                          fill="hsl(var(--chart-4))"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="lucro"
                          name="Lucro"
                          fill="hsl(var(--chart-5))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
