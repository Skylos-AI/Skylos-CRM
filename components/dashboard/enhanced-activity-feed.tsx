"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/design-system"
import { 
  CheckCircle, 
  AlertTriangle, 
  UserPlus, 
  DollarSign, 
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  MoreHorizontal
} from "lucide-react"

interface ActivityItem {
  id: string
  type: 'lead_created' | 'deal_closed' | 'follow_up_due' | 'stage_changed' | 'call_made' | 'email_sent' | 'meeting_scheduled'
  title: string
  description: string
  time: string
  priority: 'high' | 'medium' | 'low'
  actor?: {
    name: string
    avatar?: string
  }
  metadata?: {
    amount?: number
    stage?: string
    company?: string
  }
}

interface EnhancedActivityFeedProps {
  activities: ActivityItem[]
  className?: string
  showViewAll?: boolean
  onViewAll?: () => void
}

const ACTIVITY_CONFIG = {
  lead_created: {
    icon: UserPlus,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    borderColor: 'border-blue-200 dark:border-blue-500/20',
    label: 'New Lead'
  },
  deal_closed: {
    icon: CheckCircle,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
    borderColor: 'border-emerald-200 dark:border-emerald-500/20',
    label: 'Deal Closed'
  },
  follow_up_due: {
    icon: AlertTriangle,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-500/10',
    borderColor: 'border-amber-200 dark:border-amber-500/20',
    label: 'Follow-up Due'
  },
  stage_changed: {
    icon: TrendingUp,
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-50 dark:bg-violet-500/10',
    borderColor: 'border-violet-200 dark:border-violet-500/20',
    label: 'Stage Updated'
  },
  call_made: {
    icon: Phone,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-500/10',
    borderColor: 'border-indigo-200 dark:border-indigo-500/20',
    label: 'Call Made'
  },
  email_sent: {
    icon: Mail,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-50 dark:bg-cyan-500/10',
    borderColor: 'border-cyan-200 dark:border-cyan-500/20',
    label: 'Email Sent'
  },
  meeting_scheduled: {
    icon: Calendar,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-500/10',
    borderColor: 'border-green-200 dark:border-green-500/20',
    label: 'Meeting Scheduled'
  }
}

export function EnhancedActivityFeed({ 
  activities, 
  className, 
  showViewAll = true,
  onViewAll 
}: EnhancedActivityFeedProps) {
  const getActivityConfig = (type: ActivityItem['type']) => {
    return ACTIVITY_CONFIG[type] || ACTIVITY_CONFIG.lead_created
  }

  const getPriorityIndicator = (priority: ActivityItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500 dark:border-l-red-400'
      case 'medium':
        return 'border-l-4 border-l-amber-500 dark:border-l-amber-400'
      default:
        return 'border-l-4 border-l-slate-300 dark:border-l-slate-600'
    }
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

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
              Recent Activity
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground dark:text-dark-text-tertiary">
              Latest updates from your CRM
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
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const config = getActivityConfig(activity.type)
              const IconComponent = config.icon
              
              return (
                <div
                  key={activity.id}
                  className={cn(
                    "relative flex items-start space-x-4 p-3 rounded-lg transition-all duration-200",
                    "hover:bg-muted/30 dark:hover:bg-dark-bg-tertiary/20 cursor-pointer group",
                    getPriorityIndicator(activity.priority)
                  )}
                >
                  {/* Timeline connector */}
                  {index < activities.length - 1 && (
                    <div className="absolute left-8 top-12 w-px h-8 bg-border dark:bg-dark-border-subtle" />
                  )}
                  
                  {/* Activity Icon */}
                  <div className={cn(
                    "flex items-center justify-center rounded-lg p-2 shrink-0 border",
                    config.bgColor,
                    config.borderColor,
                    "ring-2 ring-background dark:ring-dark-bg-primary"
                  )}>
                    <IconComponent className={cn("h-4 w-4", config.color)} />
                  </div>
                  
                  {/* Activity Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-foreground dark:text-dark-text-primary truncate">
                          {activity.title}
                        </p>
                        <Badge 
                          variant="secondary" 
                          className="text-xs px-2 py-0 bg-muted/50 dark:bg-dark-bg-tertiary/50 text-muted-foreground dark:text-dark-text-tertiary"
                        >
                          {config.label}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground dark:text-dark-text-muted whitespace-nowrap">
                          {formatTime(activity.time)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground dark:text-dark-text-tertiary">
                      {activity.description}
                    </p>
                    
                    {/* Metadata */}
                    {activity.metadata && (
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground dark:text-dark-text-tertiary pt-1">
                        {activity.metadata.amount && (
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span>${activity.metadata.amount.toLocaleString()}</span>
                          </div>
                        )}
                        {activity.metadata.stage && (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{activity.metadata.stage}</span>
                          </div>
                        )}
                        {activity.metadata.company && (
                          <span>• {activity.metadata.company}</span>
                        )}
                      </div>
                    )}
                    
                    {/* Actor */}
                    {activity.actor && (
                      <div className="flex items-center space-x-2 pt-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">
                            {activity.actor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground dark:text-dark-text-tertiary">
                          by {activity.actor.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 bg-muted/50 dark:bg-dark-bg-tertiary/50 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-muted-foreground dark:text-dark-text-muted" />
            </div>
            <h3 className="text-sm font-medium text-foreground dark:text-dark-text-primary mb-1">
              No recent activity
            </h3>
            <p className="text-xs text-muted-foreground dark:text-dark-text-tertiary">
              Activity will appear here as you work with leads and deals
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Helper function to convert existing activity data to enhanced format
export function transformActivityData(activities: any[]): ActivityItem[] {
  return activities.map((activity, index) => ({
    id: activity.id,
    type: activity.type === 'success' ? 'deal_closed' : 
          activity.type === 'warning' ? 'follow_up_due' : 'lead_created',
    title: activity.title,
    description: activity.description,
    time: activity.time,
    priority: activity.type === 'warning' ? 'high' : 'medium',
    metadata: {
      company: activity.title.split(' - ')[1]
    }
  }))
}