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
import { StatCard } from "@/components/stat-card"
import { Plus, Users, Calendar, DollarSign } from "lucide-react"
import {
  funcionarios,
  registrosDiarias,
  culturas,
  formatarMoeda,
  formatarData,
} from "@/lib/mock-data"

export default function MaoDeObraPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogDiariaOpen, setDialogDiariaOpen] = useState(false)

  const totalGasto = registrosDiarias.reduce((acc, r) => acc + r.valorDiaria, 0)
  const totalDiarias = registrosDiarias.length

  // Total por funcionário
  const gastosPorFuncionario: Record<string, { nome: string; total: number; diarias: number }> = {}
  registrosDiarias.forEach((r) => {
    if (!gastosPorFuncionario[r.funcionarioId]) {
      gastosPorFuncionario[r.funcionarioId] = {
        nome: r.funcionarioNome,
        total: 0,
        diarias: 0,
      }
    }
    gastosPorFuncionario[r.funcionarioId].total += r.valorDiaria
    gastosPorFuncionario[r.funcionarioId].diarias += 1
  })

  // Total por cultura
  const gastosPorCultura: Record<string, number> = {}
  registrosDiarias.forEach((r) => {
    gastosPorCultura[r.cultura] = (gastosPorCultura[r.cultura] || 0) + r.valorDiaria
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
                  Mão de Obra
                </h1>
                <p className="text-muted-foreground">
                  Controle de funcionários e diárias
                </p>
              </div>
              <div className="flex gap-3">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Funcionário
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Novo Funcionário</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" placeholder="Nome do funcionário" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="servico">Tipo de Serviço</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="colheita">Colheita</SelectItem>
                            <SelectItem value="plantio">Plantio</SelectItem>
                            <SelectItem value="manutencao">Manutenção</SelectItem>
                            <SelectItem value="irrigacao">Irrigação</SelectItem>
                            <SelectItem value="geral">Serviços Gerais</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="diaria">Valor da Diária (R$)</Label>
                        <Input
                          id="diaria"
                          type="number"
                          placeholder="0,00"
                          step="0.01"
                        />
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
                <Dialog open={dialogDiariaOpen} onOpenChange={setDialogDiariaOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Registrar Diária
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrar Diária</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="funcionario">Funcionário</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {funcionarios.map((f) => (
                              <SelectItem key={f.id} value={f.id}>
                                {f.nome} - {formatarMoeda(f.valorDiaria)}/dia
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="data">Data</Label>
                          <Input type="date" id="data" />
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
                        <Input id="obs" placeholder="Atividade realizada" />
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setDialogDiariaOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setDialogDiariaOpen(false)}
                        >
                          Registrar
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Cards de resumo */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Gasto"
                value={formatarMoeda(totalGasto)}
                description="em mão de obra"
                icon={<DollarSign className="h-4 w-4" />}
              />
              <StatCard
                title="Total de Diárias"
                value={totalDiarias.toString()}
                description="registradas"
                icon={<Calendar className="h-4 w-4" />}
              />
              <StatCard
                title="Funcionários"
                value={funcionarios.length.toString()}
                description="cadastrados"
                icon={<Users className="h-4 w-4" />}
              />
              <StatCard
                title="Média por Diária"
                value={formatarMoeda(totalGasto / totalDiarias)}
                description="valor médio"
                icon={<DollarSign className="h-4 w-4" />}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Funcionários cadastrados */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Funcionários Cadastrados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Serviço</TableHead>
                          <TableHead className="text-right">Diária</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {funcionarios.map((f) => (
                          <TableRow key={f.id}>
                            <TableCell className="font-medium">{f.nome}</TableCell>
                            <TableCell>{f.tipoServico}</TableCell>
                            <TableCell className="text-right">
                              {formatarMoeda(f.valorDiaria)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Gastos por funcionário */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Gastos por Funcionário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.values(gastosPorFuncionario)
                      .sort((a, b) => b.total - a.total)
                      .map((f) => (
                        <div
                          key={f.nome}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{f.nome}</p>
                            <p className="text-sm text-muted-foreground">
                              {f.diarias} diárias
                            </p>
                          </div>
                          <span className="font-semibold">
                            {formatarMoeda(f.total)}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gastos por cultura */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Gastos por Cultura</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {Object.entries(gastosPorCultura).map(([culturaId, valor]) => {
                    const cultura = culturas.find((c) => c.id === culturaId)
                    return (
                      <div
                        key={culturaId}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-2">
                          {cultura && (
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: cultura.cor }}
                            />
                          )}
                          <span className="text-sm font-medium">
                            {cultura?.nome || "Geral"}
                          </span>
                        </div>
                        <span className="font-semibold">
                          {formatarMoeda(valor)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Tabela de diárias */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Registro de Diárias ({registrosDiarias.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Funcionário</TableHead>
                        <TableHead>Cultura</TableHead>
                        <TableHead>Observações</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrosDiarias
                        .sort(
                          (a, b) =>
                            new Date(b.data).getTime() - new Date(a.data).getTime()
                        )
                        .map((r) => {
                          const cultura = culturas.find(
                            (c) => c.id === r.cultura
                          )
                          return (
                            <TableRow key={r.id}>
                              <TableCell className="whitespace-nowrap">
                                {formatarData(r.data)}
                              </TableCell>
                              <TableCell className="font-medium">
                                {r.funcionarioNome}
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
                              <TableCell className="max-w-[200px] truncate text-muted-foreground">
                                {r.observacoes || "-"}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {formatarMoeda(r.valorDiaria)}
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
