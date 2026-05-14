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
import { Plus, Search, Filter } from "lucide-react"
import {
  lancamentos,
  culturas,
  categoriasDespesa,
  formatarMoeda,
  formatarData,
} from "@/lib/mock-data"

export default function LancamentosPage() {
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroCultura, setFiltroCultura] = useState("todas")
  const [busca, setBusca] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const lancamentosFiltrados = lancamentos.filter((l) => {
    const matchTipo = filtroTipo === "todos" || l.tipo === filtroTipo
    const matchCultura = filtroCultura === "todas" || l.cultura === filtroCultura
    const matchBusca =
      busca === "" ||
      l.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      l.categoria.toLowerCase().includes(busca.toLowerCase())
    return matchTipo && matchCultura && matchBusca
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
                  Lançamentos
                </h1>
                <p className="text-muted-foreground">
                  Gerencie suas receitas e despesas
                </p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Lançamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Novo Lançamento</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tipo">Tipo</Label>
                        <Select defaultValue="despesa">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="receita">Receita</SelectItem>
                            <SelectItem value="despesa">Despesa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="data">Data</Label>
                        <Input type="date" id="data" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Input id="descricao" placeholder="Ex: Venda de coco verde" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="valor">Valor (R$)</Label>
                        <Input
                          id="valor"
                          type="number"
                          placeholder="0,00"
                          step="0.01"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="categoria">Categoria</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="venda">Venda</SelectItem>
                            {categoriasDespesa.map((cat) => (
                              <SelectItem key={cat} value={cat.toLowerCase()}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                            <SelectItem value="geral">Geral da Fazenda</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pagamento">Forma de Pagamento</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pix">PIX</SelectItem>
                            <SelectItem value="dinheiro">Dinheiro</SelectItem>
                            <SelectItem value="boleto">Boleto</SelectItem>
                            <SelectItem value="cartao">Cartão</SelectItem>
                            <SelectItem value="transferencia">
                              Transferência
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantidade">Quantidade</Label>
                        <Input
                          id="quantidade"
                          type="number"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unidade">Unidade</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unidade">Unidade</SelectItem>
                            <SelectItem value="kg">Kg</SelectItem>
                            <SelectItem value="saca">Saca</SelectItem>
                            <SelectItem value="caixa">Caixa</SelectItem>
                            <SelectItem value="litro">Litro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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

            {/* Filtros */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar lançamentos..."
                      className="pl-9"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                      <SelectTrigger className="w-[140px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="receita">Receitas</SelectItem>
                        <SelectItem value="despesa">Despesas</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={filtroCultura}
                      onValueChange={setFiltroCultura}
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas culturas</SelectItem>
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
              </CardContent>
            </Card>

            {/* Tabela */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {lancamentosFiltrados.length} lançamentos encontrados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Cultura</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead>Pagamento</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lancamentosFiltrados.map((lancamento) => {
                        const cultura = culturas.find(
                          (c) => c.id === lancamento.cultura
                        )
                        return (
                          <TableRow key={lancamento.id}>
                            <TableCell className="whitespace-nowrap">
                              {formatarData(lancamento.data)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  lancamento.tipo === "receita"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  lancamento.tipo === "receita"
                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                    : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                                }
                              >
                                {lancamento.tipo === "receita"
                                  ? "Receita"
                                  : "Despesa"}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {lancamento.descricao}
                            </TableCell>
                            <TableCell>{lancamento.categoria}</TableCell>
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
                            <TableCell
                              className={`text-right font-medium ${
                                lancamento.tipo === "receita"
                                  ? "text-primary"
                                  : "text-destructive"
                              }`}
                            >
                              {lancamento.tipo === "receita" ? "+" : "-"}
                              {formatarMoeda(lancamento.valor)}
                            </TableCell>
                            <TableCell>{lancamento.formaPagamento}</TableCell>
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
