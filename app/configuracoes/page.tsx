"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { User, Building, Bell, Shield, Palette } from "lucide-react"

export default function ConfiguracoesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="container mx-auto p-6 pt-16 lg:pt-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Configurações
              </h1>
              <p className="text-muted-foreground">
                Gerencie as configurações do sistema
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Perfil do Usuário */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Perfil do Usuário
                  </CardTitle>
                  <CardDescription>
                    Informações pessoais do administrador
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input id="nome" defaultValue="João" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="joao@fazenda.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      type="tel"
                      defaultValue="(11) 99999-9999"
                    />
                  </div>
                  <Button className="w-full">Salvar Alterações</Button>
                </CardContent>
              </Card>

              {/* Dados da Propriedade */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Dados da Propriedade
                  </CardTitle>
                  <CardDescription>
                    Informações sobre a fazenda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomePropriedade">Nome da Propriedade</Label>
                    <Input id="nomePropriedade" defaultValue="Fazenda do João" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      defaultValue="Zona Rural, Município - UF"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="areaTotal">Área Total (ha)</Label>
                      <Input id="areaTotal" type="number" defaultValue="18" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cad">CAD/CAR</Label>
                      <Input id="cad" defaultValue="XX-XXXX-XXXX" />
                    </div>
                  </div>
                  <Button className="w-full">Salvar Alterações</Button>
                </CardContent>
              </Card>

              {/* Notificações */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notificações
                  </CardTitle>
                  <CardDescription>
                    Configure como deseja receber alertas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertas de despesas altas</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba notificações quando despesas ultrapassarem limites
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Resumo semanal</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba um resumo semanal por email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Relatório mensal</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba o balancete mensal automaticamente
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Segurança */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Segurança
                  </CardTitle>
                  <CardDescription>
                    Configurações de acesso e senha
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="senhaAtual">Senha Atual</Label>
                    <Input id="senhaAtual" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="novaSenha">Nova Senha</Label>
                    <Input id="novaSenha" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                    <Input id="confirmarSenha" type="password" />
                  </div>
                  <Button className="w-full">Alterar Senha</Button>
                </CardContent>
              </Card>
            </div>

            {/* Aparência */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Aparência
                </CardTitle>
                <CardDescription>
                  Personalize a aparência do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo escuro</Label>
                    <p className="text-sm text-muted-foreground">
                      Alterne entre tema claro e escuro
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </main>
    </div>
  )
}
