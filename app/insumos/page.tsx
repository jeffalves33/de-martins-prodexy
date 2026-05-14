"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { Plus, Package, Beaker, Leaf as LeafIcon, DollarSign } from "lucide-react"
import { insumos, culturas, formatarMoeda, formatarData } from "@/lib/mock-data"

const tiposInsumo = [
  { value: "adubo", label: "Adubo", cor: "#22c55e" },
  { value: "defensivo", label: "Defensivo", cor: "#ef4444" },
  { value: "fertilizante", label: "Fertilizante", cor: "#3b82f6" },
  { value: "material", label: "Material", cor: "#8b5cf6" },
  { value: "outro", label: "Outro", cor: "#6b7280" },
]

export default function InsumosPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const totalGasto = insumos.reduce((acc, i) => acc + i.valorTotal, 0)

  // Gastos por tipo
  const gastosPorTipo: Record<string, number> = {}
  insumos.forEach((i) => {
    gastosPorTipo[i.tipo] = (gastosPorTipo[i.tipo] || 0) + i.valorTotal
  })

  // Gastos por cultura
  const gastosPorCultura: Record<string, number> = {}
  insumos.forEach((i) => {
    gastosPorCultura[i.cultura] = (gastosPorCultura[i.cultura] || 0) + i.valorTotal
  })

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
                  Insumos e Defensivos
                </h1>
                <p className="text-muted-foreground">
                  Controle de compras agrícolas
                </p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Compra
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Registrar Compra de Insumo</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="produto">Produto</Label>
                      <Input id="produto" placeholder="Ex: Adubo NPK 10-10-10" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tipo">Tipo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposInsumo.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="data">Data</Label>
                        <Input type="date" id="data" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantidade">Quantidade</Label>
                        <Input id="quantidade" type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unidade">Unidade</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kg</SelectItem>
                            <SelectItem value="litros">Litros</SelectItem>
                            <SelectItem value="unidade">Unidade</SelectItem>
                            <SelectItem value="metros">Metros</SelectItem>
                            <SelectItem value="saco">Saco</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="valor">Valor Total (R$)</Label>
                        <Input
                          id="valor"
                          type="number"
                          placeholder="0,00"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fornecedor">Fornecedor</Label>
                        <Input id="fornecedor" placeholder="Nome do fornecedor" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cultura">Cultura</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {culturas.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.nome}
                              </SelectItem>
                            ))}
                            <SelectItem value="geral">Geral</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="obs">Observações</Label>
                      <Input id="obs" placeholder="Observações sobre a compra" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="button" onClick={() => setDialogOpen(false)}>
                        Salvar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Cards de resumo */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total em Insumos"
                value={formatarMoeda(totalGasto)}
                description="investido"
                icon={<DollarSign className="h-4 w-4" />}
              />
              <StatCard
                title="Compras Registradas"
                value={insumos.length.toString()}
                description="itens"
                icon={<Package className="h-4 w-4" />}
              />
              <StatCard
                title="Gastos com Adubo"
                value={formatarMoeda(gastosPorTipo["adubo"] || 0)}
                icon={<LeafIcon className="h-4 w-4" />}
              />
              <StatCard
                title="Gastos com Defensivos"
                value={formatarMoeda(gastosPorTipo["defensivo"] || 0)}
                icon={<Beaker className="h-4 w-4" />}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Gastos por tipo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Gastos por Tipo de Insumo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tiposInsumo.map((tipo) => {
                      const valor = gastosPorTipo[tipo.value] || 0
                      const percentual = totalGasto > 0 ? (valor / totalGasto) * 100 : 0
                      return (
                        <div key={tipo.value} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: tipo.cor }}
                              />
                              <span className="text-sm font-medium">{tipo.label}</span>
                            </div>
                            <span className="text-sm font-semibold">
                              {formatarMoeda(valor)}
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${percentual}%`,
                                backgroundColor: tipo.cor,
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Gastos por cultura */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Gastos por Cultura</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(gastosPorCultura)
                      .sort(([, a], [, b]) => b - a)
                      .map(([culturaId, valor]) => {
                        const cultura = culturas.find((c) => c.id === culturaId)
                        return (
                          <div
                            key={culturaId}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {cultura ? (
                                <>
                                  <div
                                    className="h-3 w-3 rounded-full"
                                    style={{ backgroundColor: cultura.cor }}
                                  />
                                  <span className="text-sm font-medium">
                                    {cultura.nome}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                                  <span className="text-sm font-medium">Geral</span>
                                </>
                              )}
                            </div>
                            <span className="text-sm font-semibold">
                              {formatarMoeda(valor)}
                            </span>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabela de compras */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Registro de Compras ({insumos.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Produto</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Cultura</TableHead>
                        <TableHead>Fornecedor</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {insumos
                        .sort(
                          (a, b) =>
                            new Date(b.data).getTime() - new Date(a.data).getTime()
                        )
                        .map((insumo) => {
                          const cultura = culturas.find(
                            (c) => c.id === insumo.cultura
                          )
                          const tipoInfo = tiposInsumo.find(
                            (t) => t.value === insumo.tipo
                          )
                          return (
                            <TableRow key={insumo.id}>
                              <TableCell className="whitespace-nowrap">
                                {formatarData(insumo.data)}
                              </TableCell>
                              <TableCell className="max-w-[150px] truncate font-medium">
                                {insumo.nome}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  style={{
                                    borderColor: tipoInfo?.cor,
                                    color: tipoInfo?.cor,
                                  }}
                                >
                                  {tipoInfo?.label}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {insumo.quantidade} {insumo.unidade}
                              </TableCell>
                              <TableCell>
                                {cultura ? (
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="h-2 w-2 rounded-full"
                                      style={{ backgroundColor: cultura.cor }}
                                    />
                                    {cultura.nome}
                                  </div>
                                ) : (
                                  "Geral"
                                )}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {insumo.fornecedor}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {formatarMoeda(insumo.valorTotal)}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
