"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn, priorityVariants } from "@/lib/design-system"
import { Lead } from "@/lib/types/lead"
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Minus,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  TrendingUp,
  Flame,
  Zap,
  Circle
} from "lucide-react"

interface PriorityIndicatorProps {
  priority: Lead['priority']
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  showText?: boolean
  variant?: 'badge' | 'dot' | 'full'
  className?: string
}

interface StatusIndicatorProps {
  stage: Lead['stage']
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  showText?: boolean
  variant?: 'badge' | 'dot' | 'full'
  className?: string
}

interface FollowUpIndicatorProps {
  followUpDate?: Date | string
  isOverdue?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'badge' | 'inline' | 'full'
  className?: string
}

// Priority configuration with icons and accessibility
const PRIORITY_CONFIG = {
  low: {
    icon: Minus,
    label: 'Low Priority',
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    borderColor: 'border-gray-300 dark:border-gray-600',
    description: 'Low priority - can be addressed when time permits'
  },
  medium: {
    icon: Info,
    label: 'Medium Priority',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    borderColor: 'border-blue-300 dark:border-blue-600',
    description: 'Medium priority - should be addressed in normal workflow'
  },
  high: {
    icon: AlertTriangle,
    label: 'High Priority',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    borderColor: 'border-orange-300 dark:border-orange-600',
    description: 'High priority - requires prompt attention'
  },
  urgent: {
    icon: Flame,
    label: 'Urgent Priority',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    borderColor: 'border-red-300 dark:border-red-600',
    description: 'Urgent priority - requires immediate attention'
  }
}

// Stage configuration with icons and accessibility
const STAGE_CONFIG = {
  incoming: {
    icon: TrendingUp,
    label: 'Incoming Lead',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    borderColor: 'border-blue-300 dark:border-blue-600',
    description: 'New lead in the pipeline'
  },
  decision: {
    icon: Clock,
    label: 'Decision Making',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    borderColor: 'border-yellow-300 dark:border-yellow-600',
    description: 'Lead is in decision-making process'
  },
  negotiation: {
    icon: Zap,
    label: 'Negotiation',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    borderColor: 'border-orange-300 dark:border-orange-600',
    description: 'Lead is in negotiation phase'
  },
  final: {
    icon: CheckCircle,
    label: 'Final Decision',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    borderColor: 'border-green-300 dark:border-green-600',
    description: 'Lead is in final decision phase'
  }
}

export function PriorityIndicator({ 
  priority, 
  size = 'md', 
  showIcon = true, 
  showText = true,
  variant = 'badge',
  className 
}: PriorityIndicatorProps) {
  const config = PRIORITY_CONFIG[priority]
  const IconComponent = config.icon

  if (variant === 'dot') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "rounded-full shrink-0",
              size === 'sm' && "w-2 h-2",
              size === 'md' && "w-3 h-3",
              size === 'lg' && "w-4 h-4",
              config.color.replace('text-', 'bg-'),
              className
            )} />
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center space-x-2">
              <IconComponent className="h-4 w-4" />
              <div>
                <p className="font-medium">{config.label}</p>
                <p className="text-xs text-muted-foreground">{config.description}</p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (variant === 'full') {
    return (
      <div className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-md border",
        config.bgColor,
        config.borderColor,
        className
      )}>
        {showIcon && <IconComponent className={cn("shrink-0", config.color, 
          size === 'sm' && "h-3 w-3",
          size === 'md' && "h-4 w-4", 
          size === 'lg' && "h-5 w-5"
        )} />}
        {showText && (
          <span className={cn(
            "font-medium capitalize",
            config.color,
            size === 'sm' && "text-xs",
            size === 'md' && "text-sm",
            size === 'lg' && "text-base"
          )}>
            {priority}
          </span>
        )}
      </div>
    )
  }

  // Default badge variant
  return (
    <Badge 
      className={cn(
        priorityVariants({ priority, size: size === 'lg' ? 'md' : 'sm' }),
        "inline-flex items-center space-x-1",
        className
      )}
    >
      {showIcon && <IconComponent className="h-3 w-3" />}
      {showText && <span className="capitalize">{priority}</span>}
    </Badge>
  )
}

export function StatusIndicator({ 
  stage, 
  size = 'md', 
  showIcon = true, 
  showText = true,
  variant = 'badge',
  className 
}: StatusIndicatorProps) {
  const config = STAGE_CONFIG[stage]
  const IconComponent = config.icon

  if (variant === 'dot') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "rounded-full shrink-0",
              size === 'sm' && "w-2 h-2",
              size === 'md' && "w-3 h-3",
              size === 'lg' && "w-4 h-4",
              config.color.replace('text-', 'bg-'),
              className
            )} />
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center space-x-2">
              <IconComponent className="h-4 w-4" />
              <div>
                <p className="font-medium">{config.label}</p>
                <p className="text-xs text-muted-foreground">{config.description}</p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (variant === 'full') {
    return (
      <div className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-md border",
        config.bgColor,
        config.borderColor,
        className
      )}>
        {showIcon && <IconComponent className={cn("shrink-0", config.color,
          size === 'sm' && "h-3 w-3",
          size === 'md' && "h-4 w-4",
          size === 'lg' && "h-5 w-5"
        )} />}
        {showText && (
          <span className={cn(
            "font-medium capitalize",
            config.color,
            size === 'sm' && "text-xs",
            size === 'md' && "text-sm", 
            size === 'lg' && "text-base"
          )}>
            {stage.replace('_', ' ')}
          </span>
        )}
      </div>
    )
  }

  // Default badge variant
  return (
    <Badge 
      className={cn(
        "inline-flex items-center space-x-1",
        config.bgColor,
        config.color,
        "border",
        config.borderColor,
        size === 'sm' && "text-xs px-2 py-0",
        size === 'md' && "text-sm px-2 py-1",
        size === 'lg' && "text-base px-3 py-1",
        className
      )}
    >
      {showIcon && <IconComponent className="h-3 w-3" />}
      {showText && <span className="capitalize">{stage.replace('_', ' ')}</span>}
    </Badge>
  )
}

export function FollowUpIndicator({ 
  followUpDate, 
  isOverdue, 
  size = 'md',
  variant = 'badge',
  className 
}: FollowUpIndicatorProps) {
  if (!followUpDate) return null

  const date = new Date(followUpDate)
  const now = new Date()
  const diffInHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60))
  
  const overdue = isOverdue || diffInHours < 0
  const urgent = !overdue && diffInHours < 24
  
  const getTimeText = () => {
    if (overdue) {
      const overdueDays = Math.floor(Math.abs(diffInHours) / 24)
      return overdueDays === 0 ? 'Overdue today' : `${overdueDays}d overdue`
    }
    
    if (diffInHours < 24) {
      return diffInHours === 0 ? 'Due now' : `${diffInHours}h left`
    }
    
    const daysUntil = Math.floor(diffInHours / 24)
    return `${daysUntil}d left`
  }

  const getIcon = () => {
    if (overdue) return AlertCircle
    if (urgent) return Clock
    return Calendar
  }

  const getColors = () => {
    if (overdue) return {
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      borderColor: 'border-red-300 dark:border-red-600'
    }
    if (urgent) return {
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      borderColor: 'border-orange-300 dark:border-orange-600'
    }
    return {
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      borderColor: 'border-border'
    }
  }

  const IconComponent = getIcon()
  const colors = getColors()
  const timeText = getTimeText()

  if (variant === 'inline') {
    return (
      <div className={cn(
        "flex items-center space-x-1",
        size === 'sm' && "text-xs",
        size === 'md' && "text-sm",
        size === 'lg' && "text-base",
        colors.color,
        className
      )}>
        <IconComponent className={cn(
          size === 'sm' && "h-3 w-3",
          size === 'md' && "h-4 w-4",
          size === 'lg' && "h-5 w-5"
        )} />
        <span>{date.toLocaleDateString()}</span>
        <span>•</span>
        <span className="font-medium">{timeText}</span>
      </div>
    )
  }

  if (variant === 'full') {
    return (
      <div className={cn(
        "flex items-center justify-between p-3 rounded-md border",
        colors.bgColor,
        colors.borderColor,
        className
      )}>
        <div className="flex items-center space-x-2">
          <IconComponent className={cn("shrink-0", colors.color,
            size === 'sm' && "h-3 w-3",
            size === 'md' && "h-4 w-4",
            size === 'lg' && "h-5 w-5"
          )} />
          <span className={cn(
            "font-medium",
            colors.color,
            size === 'sm' && "text-xs",
            size === 'md' && "text-sm",
            size === 'lg' && "text-base"
          )}>
            {date.toLocaleDateString()}
          </span>
        </div>
        <Badge 
          variant={overdue ? 'destructive' : urgent ? 'secondary' : 'outline'}
          className="text-xs"
        >
          {timeText}
        </Badge>
      </div>
    )
  }

  // Default badge variant
  return (
    <Badge 
      variant={overdue ? 'destructive' : urgent ? 'secondary' : 'outline'}
      className={cn(
        "inline-flex items-center space-x-1",
        size === 'sm' && "text-xs px-2 py-0",
        size === 'md' && "text-sm px-2 py-1",
        size === 'lg' && "text-base px-3 py-1",
        className
      )}
    >
      <IconComponent className="h-3 w-3" />
      <span>{timeText}</span>
    </Badge>
  )
}

// Composite component that combines priority and status
interface LeadIndicatorsProps {
  lead: Lead
  showPriority?: boolean
  showStatus?: boolean
  showFollowUp?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'compact' | 'full'
  className?: string
}

export function LeadIndicators({
  lead,
  showPriority = true,
  showStatus = true,
  showFollowUp = true,
  size = 'md',
  variant = 'compact',
  className
}: LeadIndicatorsProps) {
  const isOverdue = lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date()

  if (variant === 'full') {
    return (
      <div className={cn("space-y-3", className)}>
        {showPriority && (
          <PriorityIndicator 
            priority={lead.priority} 
            size={size} 
            variant="full"
          />
        )}
        {showStatus && (
          <StatusIndicator 
            stage={lead.stage} 
            size={size} 
            variant="full"
          />
        )}
        {showFollowUp && lead.nextFollowUp && (
          <FollowUpIndicator 
            followUpDate={lead.nextFollowUp}
            isOverdue={isOverdue}
            size={size}
            variant="full"
          />
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center space-x-2 flex-wrap", className)}>
      {showPriority && (
        <PriorityIndicator 
          priority={lead.priority} 
          size={size} 
          variant="badge"
        />
      )}
      {showStatus && (
        <StatusIndicator 
          stage={lead.stage} 
          size={size} 
          variant="badge"
        />
      )}
      {showFollowUp && lead.nextFollowUp && (
        <FollowUpIndicator 
          followUpDate={lead.nextFollowUp}
          isOverdue={isOverdue}
          size={size}
          variant="badge"
        />
      )}
    </div>
  )
}