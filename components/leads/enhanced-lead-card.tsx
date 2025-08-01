"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Lead } from "@/lib/types/lead"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn, priorityVariants, stageVariants } from "@/lib/design-system"
import { PriorityIndicator, StatusIndicator, FollowUpIndicator } from "./priority-status-indicators"
import { EnhancedTagSystem } from "./enhanced-tag-system"
import { 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Calendar,
  DollarSign,
  GripVertical,
  AlertCircle,
  Clock,
  User,
  Building2,
  Tag,
  MessageSquare,
  ExternalLink,
  Star,
  StarOff
} from "lucide-react"

interface EnhancedLeadCardProps {
  lead: Lead
  onClick?: (lead: Lead) => void
  onFollowUpClick?: (lead: Lead) => void
  onStarToggle?: (lead: Lead) => void
  showAssignee?: boolean
  showSource?: boolean
  compact?: boolean
}

export function EnhancedLeadCard({ 
  lead, 
  onClick, 
  onFollowUpClick,
  onStarToggle,
  showAssignee = true,
  showSource = true,
  compact = false
}: EnhancedLeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isOverdue = lead.nextFollowUp && new Date(lead.nextFollowUp) < new Date()
  const initials = lead.name.split(' ').map(n => n[0]).join('').toUpperCase()
  const isStarred = false // This would come from user preferences/state

  const getTimeUntilFollowUp = () => {
    if (!lead.nextFollowUp) return null
    
    const followUpDate = new Date(lead.nextFollowUp)
    const now = new Date()
    const diffInHours = Math.floor((followUpDate.getTime() - now.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 0) {
      const overdueDays = Math.floor(Math.abs(diffInHours) / 24)
      return { text: overdueDays === 0 ? 'Due today' : `${overdueDays}d overdue`, isOverdue: true }
    }
    
    if (diffInHours < 24) {
      return { text: diffInHours === 0 ? 'Due now' : `${diffInHours}h left`, isOverdue: false }
    }
    
    const daysUntil = Math.floor(diffInHours / 24)
    return { text: `${daysUntil}d left`, isOverdue: false }
  }

  const followUpInfo = getTimeUntilFollowUp()

  const getLastContactInfo = () => {
    if (!lead.lastContactDate) return null
    
    const lastContact = new Date(lead.lastContactDate)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays}d ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`
    return `${Math.floor(diffInDays / 30)}m ago`
  }

  const lastContactInfo = getLastContactInfo()

  return (
    <TooltipProvider>
      <Card
        ref={setNodeRef}
        style={style}
        className={cn(
          "group cursor-pointer transition-all duration-200 border-l-4",
          "hover:shadow-lg hover:scale-[1.01] hover:border-muted-foreground/20",
          // Stage-based left border colors
          lead.stage === 'incoming' && "border-l-blue-500 dark:border-l-blue-400",
          lead.stage === 'decision' && "border-l-yellow-500 dark:border-l-yellow-400",
          lead.stage === 'negotiation' && "border-l-orange-500 dark:border-l-orange-400",
          lead.stage === 'final' && "border-l-green-500 dark:border-l-green-400",
          // Dragging state
          isDragging && "opacity-50 rotate-2 shadow-xl scale-105 z-50"
        )}
        onClick={() => onClick?.(lead)}
      >
        <CardContent className={cn("p-4", compact && "p-3")}>
          {/* Header Section - Drag Handle, Avatar, Priority */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              {/* Drag Handle */}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
                {...attributes}
                {...listeners}
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical className="h-3 w-3 text-muted-foreground" />
              </Button>
              
              {/* Avatar */}
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              {/* Priority Dot */}
              {(lead.priority === 'urgent' || lead.priority === 'high') && (
                <div className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  lead.priority === 'urgent' ? "bg-red-500" : "bg-orange-500"
                )} />
              )}
            </div>
            
            {/* Actions */}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>

          {/* Name and Company */}
          <div className="mb-3">
            <h3 className="font-semibold text-sm leading-tight mb-1 text-foreground truncate">
              {lead.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {lead.company}
            </p>
          </div>

          {/* Deal Amount */}
          <div className="flex items-center space-x-1 mb-3">
            <DollarSign className="h-3 w-3 text-green-600 dark:text-green-400" />
            <span className="text-sm font-bold text-green-600 dark:text-green-400">
              {lead.currency} {lead.dealAmount.toLocaleString()}
            </span>
          </div>

          {/* Priority and Stage */}
          <div className="flex items-center justify-between mb-3">
            <PriorityIndicator 
              priority={lead.priority}
              size="sm"
              variant="badge"
            />
            <StatusIndicator 
              stage={lead.stage}
              size="sm"
              variant="badge"
            />
          </div>

          {/* Overdue message (text only, no red styling) */}
          {lead.nextFollowUp && isOverdue && (
            <div className="text-xs text-muted-foreground">
              Follow-up overdue: {new Date(lead.nextFollowUp).toLocaleDateString()}
            </div>
          )}

          {/* Follow-up Button */}
          {lead.nextFollowUp && (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2 text-xs h-7"
              onClick={(e) => {
                e.stopPropagation()
                onFollowUpClick?.(lead)
              }}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              Follow-up
            </Button>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}