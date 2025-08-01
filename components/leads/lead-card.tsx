"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Lead } from "@/lib/types/lead"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Calendar,
  DollarSign,
  GripVertical,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LeadCardProps {
  lead: Lead
  onClick?: (lead: Lead) => void
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800 border-gray-200",
  medium: "bg-blue-100 text-blue-800 border-blue-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  urgent: "bg-red-100 text-red-800 border-red-200"
}

const stageColors = {
  incoming: "border-l-blue-500",
  decision: "border-l-yellow-500",
  negotiation: "border-l-orange-500",
  final: "border-l-green-500"
}

export function LeadCard({ lead, onClick }: LeadCardProps) {
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

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-l-4",
        stageColors[lead.stage],
        isDragging && "opacity-50 rotate-3 shadow-xl scale-105"
      )}
      onClick={() => onClick?.(lead)}
    >
      <CardContent className="p-4">
        {/* Drag Handle */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-3 w-3 text-muted-foreground" />
            </Button>
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>

        {/* Lead Name and Company */}
        <div className="mb-3">
          <h3 className="font-medium text-sm leading-tight mb-1">
            {lead.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {lead.company}
          </p>
        </div>

        {/* Deal Amount */}
        <div className="flex items-center space-x-1 mb-3">
          <DollarSign className="h-3 w-3 text-green-600" />
          <span className="text-sm font-medium text-green-600">
            {lead.currency} {lead.dealAmount.toLocaleString()}
          </span>
        </div>

        {/* Contact Info */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-1">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground truncate max-w-[100px]">
              {lead.email}
            </span>
          </div>
          {lead.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {lead.phone.slice(-4)}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge 
            variant="outline" 
            className={cn("text-xs px-2 py-0", priorityColors[lead.priority])}
          >
            {lead.priority}
          </Badge>
          {lead.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
              {tag}
            </Badge>
          ))}
          {lead.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs px-2 py-0">
              +{lead.tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Follow-up Date */}
        {lead.nextFollowUp && (
          <div className={cn(
            "flex items-center space-x-1 text-xs",
            isOverdue ? "text-red-600" : "text-muted-foreground"
          )}>
            {isOverdue && <AlertCircle className="h-3 w-3" />}
            <Calendar className="h-3 w-3" />
            <span>
              Follow-up: {new Date(lead.nextFollowUp).toLocaleDateString()}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}