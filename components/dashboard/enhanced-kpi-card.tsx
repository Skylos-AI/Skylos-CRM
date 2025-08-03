"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { FadeIn } from "@/components/shared/fade-in"
import { cn, cardVariants, badgeVariants } from "@/lib/design-system"
import { TrendingUp, TrendingDown, Minus, MoreHorizontal } from "lucide-react"

interface TrendData {
  value: number
  direction: 'up' | 'down' | 'neutral'
  period: string
  isPositive?: boolean
}

interface KPIAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline'
}

interface EnhancedKPICardProps {
  title: string
  value: number | string
  icon: ReactNode
  trend?: TrendData
  subtitle?: string
  priority: 'primary' | 'secondary'
  prefix?: string
  suffix?: string
  decimals?: number
  delay?: number
  actions?: KPIAction[]
  className?: string
}

export function EnhancedKPICard({
  title,
  value,
  icon,
  trend,
  subtitle,
  priority = 'secondary',
  prefix = '',
  suffix = '',
  decimals = 0,
  delay = 0,
  actions,
  className
}: EnhancedKPICardProps) {
  const isPrimary = priority === 'primary'
  const numericValue = typeof value === 'number' ? value : 0
  
  const getTrendIcon = () => {
    switch (trend?.direction) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />
      case 'down':
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground'
    
    if (trend.isPositive !== undefined) {
      return trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
    }
    
    switch (trend.direction) {
      case 'up':
        return 'text-green-600 dark:text-green-400'
      case 'down':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <FadeIn delay={delay}>
      <Card 
        className={cn(
          // Enhanced professional border system
          'bg-slate-800 border border-slate-700/40 rounded-xl shadow-card',
          'hover:border-slate-600/60 hover:shadow-card-hover hover:-translate-y-0.5',
          'transition-all duration-200 ease-in-out',
          // Primary cards have subtle accent styling
          isPrimary && [
            'border-primary-500/30 bg-gradient-to-br from-slate-800 to-slate-800/80',
            'shadow-glow-soft hover:shadow-glow-emphasis',
            'hover:border-primary-400/50'
          ],
          // Secondary cards have standard professional styling
          !isPrimary && [
            'shadow-glow-soft hover:shadow-glow',
          ],
          // Ensure consistent height across all cards
          'h-[160px] flex flex-col',
          'group',
          className
        )}
        style={{
          boxShadow: isPrimary 
            ? '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(59, 130, 246, 0.05)'
            : '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(148, 163, 184, 0.05)'
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "flex items-center justify-center rounded-md transition-colors duration-200",
              "h-8 w-8", // Consistent size for all cards
              isPrimary ? [
                "bg-primary-100 text-primary-600",
                "dark:bg-primary-900/50 dark:text-primary-400",
                "group-hover:bg-primary-200 dark:group-hover:bg-primary-900/70"
              ] : [
                "bg-muted text-muted-foreground",
                "group-hover:bg-muted/80"
              ]
            )}>
              {icon}
            </div>
            <h3 className={cn(
              "font-medium tracking-tight text-sm",
              isPrimary ? "font-semibold text-foreground" : "text-muted-foreground"
            )}>
              {title}
            </h3>
          </div>

        </CardHeader>
        
        <CardContent className="pt-0 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Main Value */}
            <div className="text-2xl font-bold tabular-nums text-foreground">
              {typeof value === 'number' ? (
                <AnimatedCounter 
                  value={numericValue}
                  prefix={prefix}
                  suffix={suffix}
                  decimals={decimals}
                  delay={delay}
                  duration={1000}
                />
              ) : (
                <span>{prefix}{value}{suffix}</span>
              )}
            </div>

            {/* Trend and Subtitle */}
            <div className="flex items-center justify-between">
              {trend && (
                <div className={cn(
                  "flex items-center space-x-1 text-xs font-medium",
                  getTrendColor()
                )}>
                  {getTrendIcon()}
                  <span>
                    {trend.direction === 'up' && '+'}
                    {trend.direction === 'down' && '-'}
                    <AnimatedCounter 
                      value={Math.abs(trend.value)}
                      delay={delay + 200}
                      duration={800}
                    />
                    <span className="ml-1 text-muted-foreground">{trend.period}</span>
                  </span>
                </div>
              )}
              
              {subtitle && (
                <div className="flex items-center text-xs text-muted-foreground">
                  {subtitle}
                </div>
              )}
            </div>
          </div>


        </CardContent>
      </Card>
    </FadeIn>
  )
}

// Specialized KPI card variants for common use cases
export function PrimaryKPICard(props: Omit<EnhancedKPICardProps, 'priority'>) {
  return <EnhancedKPICard {...props} priority="primary" />
}

export function SecondaryKPICard(props: Omit<EnhancedKPICardProps, 'priority'>) {
  return <EnhancedKPICard {...props} priority="secondary" />
}

// Trend indicator component for standalone use
interface TrendIndicatorProps {
  trend: TrendData
  className?: string
}

export function TrendIndicator({ trend, className }: TrendIndicatorProps) {
  const getTrendIcon = () => {
    switch (trend.direction) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />
      case 'down':
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    if (trend.isPositive !== undefined) {
      return trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
    }
    
    switch (trend.direction) {
      case 'up':
        return 'text-green-600 dark:text-green-400'
      case 'down':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className={cn(
      "inline-flex items-center space-x-1 text-xs font-medium",
      getTrendColor(),
      className
    )}>
      {getTrendIcon()}
      <span>
        {trend.direction === 'up' && '+'}
        {trend.direction === 'down' && '-'}
        {Math.abs(trend.value)}
        <span className="ml-1 text-muted-foreground">{trend.period}</span>
      </span>
    </div>
  )
}