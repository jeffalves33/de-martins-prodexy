"use client"

import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Leaf, TrendingUp, DollarSign, BarChart } from "lucide-react"
import {
  culturas,
  calcularReceitaPorCultura,
  calcularDespesaPorCultura,
  calcularLucroPorCultura,
  calcularMargemPorCultura,
  calcularLucroPorHectare,
  formatarMoeda,
  formatarPorcentagem,
} from "@/lib/mock-data"

export default function CulturasPage() {
  const dadosCulturas = culturas.map((cultura) => ({
    ...cultura,
    receita: calcularReceitaPorCultura(cultura.id),
    despesa: calcularDespesaPorCultura(cultura.id),
    lucro: calcularLucroPorCultura(cultura.id),
    margem: calcularMargemPorCultura(cultura.id),
    lucroPorHectare: calcularLucroPorHectare(cultura.id),
  }))

  const maxReceita = Math.max(...dadosCulturas.map((c) => c.receita))

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="container mx-auto p-6 pt-16 lg:pt-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Culturas</h1>
                <p className="text-muted-foreground">
                  Acompanhe o desempenho de cada cultura
                </p>
              </div>
              <Button variant="outline">
                <Leaf className="mr-2 h-4 w-4" />
                Nova Cultura
              </Button>
            </div>

            {/* Grid de Culturas */}
            <div className="grid gap-6 md:grid-cols-2">
              {dadosCulturas.map((cultura) => (
                <Card key={cultura.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${cultura.cor}20` }}
                        >
                          <Leaf
                            className="h-5 w-5"
                            style={{ color: cultura.cor }}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{cultura.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {cultura.areaHectares} hectares • {cultura.unidadeVenda}
                          </p>
                        </div>
                      </div>
                      <Link href={`/culturas/${cultura.id}`}>
                        <Button variant="ghost" size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Barra de progresso da receita */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Receita</span>
                        <span className="font-medium">
                          {formatarMoeda(cultura.receita)}
                        </span>
                      </div>
                      <Progress
                        value={(cultura.receita / maxReceita) * 100}
                        className="h-2"
                        style={
                          {
                            "--progress-background": cultura.cor,
                          } as React.CSSProperties
                        }
                      />
                    </div>

                    {/* Métricas */}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-3 w-3" />
                          <span className="text-xs">Lucro</span>
                        </div>
                        <p
                          className={`text-sm font-semibold ${
                            cultura.lucro >= 0
                              ? "text-primary"
                              : "text-destructive"
                          }`}
                        >
                          {formatarMoeda(cultura.lucro)}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <TrendingUp className="h-3 w-3" />
                          <span className="text-xs">Margem</span>
                        </div>
                        <p className="text-sm font-semibold">
                          {formatarPorcentagem(cultura.margem)}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <BarChart className="h-3 w-3" />
                          <span className="text-xs">Lucro/ha</span>
                        </div>
                        <p className="text-sm font-semibold">
                          {formatarMoeda(cultura.lucroPorHectare)}
                        </p>
                      </div>
                    </div>

                    {/* Despesas */}
                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="text-sm text-muted-foreground">
                        Despesas totais
                      </span>
                      <span className="text-sm font-medium text-destructive">
                        {formatarMoeda(cultura.despesa)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resumo Comparativo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Comparativo de Rentabilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dadosCulturas
                    .sort((a, b) => b.margem - a.margem)
                    .map((cultura, index) => (
                      <div
                        key={cultura.id}
                        className="flex items-center gap-4"
                      >
                        <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                          {index + 1}º
                        </span>
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: cultura.cor }}
                        />
                        <span className="min-w-[100px] text-sm font-medium">
                          {cultura.nome}
                        </span>
                        <div className="flex-1">
                          <Progress
                            value={Math.max(0, cultura.margem)}
                            className="h-2"
                          />
                        </div>
                        <span className="min-w-[60px] text-right text-sm font-semibold">
                          {formatarPorcentagem(cultura.margem)}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
