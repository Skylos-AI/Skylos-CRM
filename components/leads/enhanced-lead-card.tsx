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
  StarOff,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Globe,
  Youtube
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

  // Subtle stage color accents
  const stageAccents = {
    incoming: "border-l-2 border-l-blue-200 dark:border-l-blue-800",
    decision: "border-l-2 border-l-yellow-200 dark:border-l-yellow-800", 
    negotiation: "border-l-2 border-l-orange-200 dark:border-l-orange-800",
    final: "border-l-2 border-l-green-200 dark:border-l-green-800"
  }

  return (
    <TooltipProvider>
      <Card
        ref={setNodeRef}
        className={cn(
          "group cursor-pointer transition-all duration-300 ease-out",
          // Enhanced professional border system with light theme support
          "bg-white dark:bg-slate-800 border border-light-border-subtle/60 dark:border-slate-700/40 rounded-xl",
          "shadow-light-card dark:shadow-card",
          "hover:border-light-border-default/80 dark:hover:border-slate-600/60",
          "hover:shadow-light-card-hover dark:hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.02]",
          // Subtle stage accent with enhanced styling
          stageAccents[lead.stage],
          // Dragging state with enhanced animations
          isDragging && "opacity-60 rotate-3 shadow-2xl scale-110 z-50 transition-all duration-200"
        )}
        style={{
          ...style,
          boxShadow: isDragging 
            ? '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(148, 163, 184, 0.1)'
            : undefined // Let CSS classes handle the normal shadow
        }}
        onClick={() => onClick?.(lead)}
      >
        <CardContent className={cn("p-4", compact && "p-3")}>
          {/* Header Section - Drag Handle, Avatar, Priority */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              {/* Drag Handle */}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
                {...attributes}
                {...listeners}
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical className="h-3 w-3 text-light-text-muted dark:text-slate-400" />
              </Button>
              
              {/* Avatar */}
              <Avatar className="h-9 w-9 shrink-0 shadow-sm">
                <AvatarFallback className="text-xs font-semibold bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-800">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              {/* Priority Dot */}
              {(lead.priority === 'urgent' || lead.priority === 'high') && (
                <div className={cn(
                  "w-2.5 h-2.5 rounded-full shrink-0 shadow-sm",
                  lead.priority === 'urgent' ? "bg-red-500" : "bg-orange-500"
                )} />
              )}
            </div>
            
            {/* Actions */}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Name and Company */}
          <div className="mb-3 space-y-1">
            <h3 className="font-semibold text-sm leading-tight text-light-text-primary dark:text-slate-50 truncate">
              {lead.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Building2 className="h-3 w-3 text-light-text-muted dark:text-slate-400" />
              <p className="text-xs text-light-text-muted dark:text-slate-400 truncate">
                {lead.company}
              </p>
            </div>
          </div>

          {/* Deal Amount */}
          <div className="flex items-center space-x-1 mb-3 p-2 bg-green-50 dark:bg-green-950/20 rounded-md">
            <DollarSign className="h-3 w-3 text-green-600 dark:text-green-400" />
            <span className="text-sm font-bold text-green-700 dark:text-green-400">
              {lead.currency} {lead.dealAmount.toLocaleString()}
            </span>
          </div>

          {/* Source and Priority */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {/* Platform Source Icon */}
              <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-slate-700/50 rounded-md">
                {lead.source === 'facebook' && <Facebook className="h-3 w-3 text-blue-600" />}
                {lead.source === 'instagram' && <Instagram className="h-3 w-3 text-pink-600" />}
                {lead.source === 'linkedin' && <Linkedin className="h-3 w-3 text-blue-700" />}
                {lead.source === 'twitter' && <Twitter className="h-3 w-3 text-blue-400" />}
                {lead.source === 'youtube' && <Youtube className="h-3 w-3 text-red-600" />}
                {(!lead.source || lead.source === 'website') && <Globe className="h-3 w-3 text-gray-600" />}
                <span className="text-xs text-light-text-tertiary dark:text-slate-400 capitalize">
                  {lead.source || 'website'}
                </span>
              </div>
              <PriorityIndicator 
                priority={lead.priority}
                size="sm"
                variant="badge"
              />
            </div>
            <div className="flex items-center space-x-2 text-xs text-light-text-muted dark:text-slate-400">
              <Mail className="h-3 w-3" />
              <Phone className="h-3 w-3" />
            </div>
          </div>

          {/* Follow-up Info */}
          {lead.nextFollowUp && (
            <div className={cn(
              "flex items-center space-x-2 p-2 rounded-md mb-3",
              isOverdue 
                ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400" 
                : "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400"
            )}>
              <Calendar className="h-3 w-3" />
              <span className="text-xs font-medium">
                {isOverdue ? 'Overdue: ' : 'Follow-up: '}
                {new Date(lead.nextFollowUp).toLocaleDateString()}
              </span>
            </div>
          )}

          {/* Follow-up Button - Always visible */}
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs h-8 font-medium"
            onClick={(e) => {
              e.stopPropagation()
              onFollowUpClick?.(lead)
            }}
          >
            <MessageSquare className="h-3 w-3 mr-2" />
            Follow-up
          </Button>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}