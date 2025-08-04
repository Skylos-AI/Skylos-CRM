"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, priorityVariants } from "@/lib/design-system"
import { 
  Clock, 
  AlertTriangle, 
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  MoreHorizontal,
  CalendarDays,
  User
} from "lucide-react"
import { Lead } from "@/lib/types/lead"

interface EnhancedFollowUpsProps {
  followUps: Lead[]
  className?: string
  showViewAll?: boolean
  onViewAll?: () => void
  onFollowUpClick?: (lead: Lead) => void
}

export function EnhancedFollowUps({ 
  followUps, 
  className, 
  showViewAll = true,
  onViewAll,
  onFollowUpClick 
}: EnhancedFollowUpsProps) {
  const isOverdue = (date: string) => {
    return new Date(date) < new Date()
  }

  const getTimeUntilFollowUp = (date: string) => {
    const followUpDate = new Date(date)
    const now = new Date()
    const diffInHours = Math.floor((followUpDate.getTime() - now.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 0) {
      const overdueDays = Math.floor(Math.abs(diffInHours) / 24)
      return overdueDays === 0 ? 'Overdue today' : `${overdueDays}d overdue`
    }
    
    if (diffInHours < 24) {
      return diffInHours === 0 ? 'Due now' : `${diffInHours}h remaining`
    }
    
    const daysUntil = Math.floor(diffInHours / 24)
    return `${daysUntil}d remaining`
  }

  const getPriorityColor = (priority: Lead['priority'], overdue: boolean) => {
    if (overdue) return 'text-red-600 dark:text-red-400'
    
    switch (priority) {
      case 'urgent':
        return 'text-red-600 dark:text-red-400'
      case 'high':
        return 'text-amber-600 dark:text-amber-400'
      case 'medium':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-slate-600 dark:text-slate-400'
    }
  }

  const getFollowUpActions = (lead: Lead) => {
    return [
      {
        icon: Phone,
        label: 'Call',
        action: () => console.log('Call', lead.name)
      },
      {
        icon: Mail,
        label: 'Email',
        action: () => console.log('Email', lead.name)
      },
      {
        icon: Calendar,
        label: 'Schedule',
        action: () => console.log('Schedule', lead.name)
      }
    ]
  }

  // Sort follow-ups by urgency (overdue first, then by date)
  const sortedFollowUps = [...followUps].sort((a, b) => {
    const aOverdue = isOverdue(a.nextFollowUp!)
    const bOverdue = isOverdue(b.nextFollowUp!)
    
    if (aOverdue && !bOverdue) return -1
    if (!aOverdue && bOverdue) return 1
    
    return new Date(a.nextFollowUp!).getTime() - new Date(b.nextFollowUp!).getTime()
  })

  return (
    <Card className={cn(
      "h-full bg-white dark:bg-slate-800 border border-light-border-subtle/60 dark:border-slate-700/40 rounded-xl",
      "shadow-light-card dark:shadow-card",
      "hover:border-light-border-default/80 dark:hover:border-slate-600/60",
      "hover:shadow-light-card-hover dark:hover:shadow-card-hover",
      "transition-all duration-200 ease-in-out",
      className
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground dark:text-dark-text-primary">
              Upcoming Follow-ups
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground dark:text-dark-text-tertiary">
              Don't miss these important follow-ups
            </CardDescription>
          </div>
          {showViewAll && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onViewAll}
              className="text-xs"
            >
              View All
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {sortedFollowUps.length > 0 ? (
          <div className="space-y-3">
            {sortedFollowUps.map((lead) => {
              const overdue = isOverdue(lead.nextFollowUp!)
              const timeInfo = getTimeUntilFollowUp(lead.nextFollowUp!)
              const actions = getFollowUpActions(lead)
              
              return (
                <div
                  key={lead.id}
                  className={cn(
                    "relative flex items-center space-x-4 p-3 rounded-lg transition-all duration-200",
                    "cursor-pointer group border",
                    overdue ? [
                      "border-red-200 dark:border-red-500/20 bg-red-50/50 dark:bg-red-500/5",
                      "hover:bg-red-50 dark:hover:bg-red-500/10"
                    ] : [
                      "border-border dark:border-dark-border-default",
                      "hover:bg-muted/30 dark:hover:bg-dark-bg-tertiary/20",
                      "hover:border-muted-foreground/20 dark:hover:border-dark-border-emphasis"
                    ]
                  )}
                  onClick={() => onFollowUpClick?.(lead)}
                >
                  {/* Priority Indicator */}
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-1 rounded-l-lg",
                    overdue ? "bg-red-500 dark:bg-red-400" : 
                    lead.priority === 'urgent' ? "bg-red-500 dark:bg-red-400" :
                    lead.priority === 'high' ? "bg-amber-500 dark:bg-amber-400" :
                    lead.priority === 'medium' ? "bg-blue-500 dark:bg-blue-400" : "bg-slate-300 dark:bg-slate-600"
                  )} />
                  
                  {/* Avatar */}
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="text-sm font-medium">
                      {lead.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Lead Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground dark:text-dark-text-primary truncate">
                        {lead.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {overdue && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <Badge 
                          className={cn(
                            priorityVariants({ priority: lead.priority, size: 'sm' }),
                            overdue && "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                          )}
                        >
                          {overdue ? 'Overdue' : lead.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground dark:text-dark-text-tertiary truncate">
                          {lead.company}
                        </p>
                        <div className="flex items-center space-x-2 text-xs">
                          <CalendarDays className="h-3 w-3 text-muted-foreground dark:text-dark-text-muted" />
                          <span className={cn(
                            "font-medium",
                            getPriorityColor(lead.priority, overdue)
                          )}>
                            {new Date(lead.nextFollowUp!).toLocaleDateString()}
                          </span>
                          <span className="text-muted-foreground dark:text-dark-text-muted">•</span>
                          <span className={cn(
                            "font-medium",
                            overdue ? "text-red-600 dark:text-red-400" : "text-muted-foreground dark:text-dark-text-tertiary"
                          )}>
                            {timeInfo}
                          </span>
                        </div>
                      </div>
                      
                      {/* Deal Amount */}
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground dark:text-dark-text-primary">
                          ${lead.dealAmount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground dark:text-dark-text-tertiary capitalize">
                          {lead.stage.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {actions.map((action, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          action.action()
                        }}
                        title={action.label}
                      >
                        <action.icon className="h-3 w-3" />
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 bg-muted/50 dark:bg-dark-bg-tertiary/50 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-muted-foreground dark:text-dark-text-muted" />
            </div>
            <h3 className="text-sm font-medium text-foreground dark:text-dark-text-primary mb-1">
              No upcoming follow-ups
            </h3>
            <p className="text-xs text-muted-foreground dark:text-dark-text-tertiary mb-4">
              You're all caught up! Schedule follow-ups to stay connected with your leads.
            </p>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Follow-up
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Helper function to get overdue follow-ups count
export function getOverdueCount(followUps: Lead[]): number {
  return followUps.filter(lead => 
    lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date()
  ).length
}

// Helper function to get follow-ups due today
export function getTodayFollowUps(followUps: Lead[]): Lead[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  return followUps.filter(lead => {
    if (!lead.nextFollowUp) return false
    const followUpDate = new Date(lead.nextFollowUp)
    return followUpDate >= today && followUpDate < tomorrow
  })
}