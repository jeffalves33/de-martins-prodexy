"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  description?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  icon?: React.ReactNode
  className?: string
}

export function StatCard({
  title,
  value,
  description,
  trend,
  trendValue,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-start justify-between pb-2 gap-2">
        <CardTitle className="text-sm font-medium text-muted-foreground leading-tight">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground shrink-0">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold truncate">{value}</div>
        {(description || trendValue) && (
          <div className="flex items-center gap-1 mt-1">
            {trend && (
              <>
                {trend === "up" && (
                  <TrendingUp className="h-4 w-4 text-primary" />
                )}
                {trend === "down" && (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                {trend === "neutral" && (
                  <Minus className="h-4 w-4 text-muted-foreground" />
                )}
              </>
            )}
            <span
              className={cn(
                "text-xs",
                trend === "up" && "text-primary",
                trend === "down" && "text-destructive",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {trendValue}
            </span>
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
