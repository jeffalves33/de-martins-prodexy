"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { culturas } from "@/lib/mock-data"

interface FiltroCulturaProps {
  value: string
  onChange: (value: string) => void
}

export function FiltroCultura({ value, onChange }: FiltroCulturaProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Todas as culturas" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todas">Todas as culturas</SelectItem>
        {culturas.map((cultura) => (
          <SelectItem key={cultura.id} value={cultura.id}>
            {cultura.nome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface FiltroPeriodoProps {
  value: string
  onChange: (value: string) => void
}

export function FiltroPeriodo({ value, onChange }: FiltroPeriodoProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione o período" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="mes-atual">Mês atual</SelectItem>
        <SelectItem value="30-dias">Últimos 30 dias</SelectItem>
        <SelectItem value="trimestre">Este trimestre</SelectItem>
        <SelectItem value="ano">Este ano</SelectItem>
      </SelectContent>
    </Select>
  )
}
