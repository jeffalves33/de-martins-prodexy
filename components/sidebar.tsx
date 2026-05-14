"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Receipt,
  Leaf,
  Users,
  Package,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lancamentos", label: "Lançamentos", icon: Receipt },
  { href: "/culturas", label: "Culturas", icon: Leaf },
  { href: "/mao-de-obra", label: "Mão de Obra", icon: Users },
  { href: "/insumos", label: "Insumos", icon: Package },
  { href: "/relatorios", label: "Relatórios", icon: FileText },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-sidebar text-sidebar-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <Leaf className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">AgroGestão</h1>
              <p className="text-xs text-sidebar-foreground/70">Fazenda do João</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground font-semibold">
                J
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">João</p>
                <p className="text-xs text-sidebar-foreground/70">Administrador</p>
              </div>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
