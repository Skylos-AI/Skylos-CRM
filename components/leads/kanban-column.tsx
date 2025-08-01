"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanColumn, Lead } from "@/lib/types/lead"
import { EnhancedLeadCard } from "./enhanced-lead-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface KanbanColumnProps {
  column: KanbanColumn
  onLeadClick?: (lead: Lead) => void
  onFollowUpClick?: (lead: Lead) => void
}

export function KanbanColumnComponent({ column, onLeadClick, onFollowUpClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  return (
    <div className="flex-shrink-0 w-80">
      <Card className={cn(
        "h-full transition-colors",
        isOver && "ring-2 ring-primary ring-offset-2"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              {column.title}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {column.leads.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div
            ref={setNodeRef}
            className="min-h-[400px] space-y-3"
          >
            <SortableContext
              items={column.leads.map(lead => lead.id)}
              strategy={verticalListSortingStrategy}
            >
              {column.leads.map((lead) => (
                <EnhancedLeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onClick={onLeadClick}
                  onFollowUpClick={onFollowUpClick}
                  compact={true}
                  showAssignee={false}
                  showSource={false}
                />
              ))}
            </SortableContext>
            
            {column.leads.length === 0 && (
              <div className="flex h-32 items-center justify-center text-center">
                <div className="text-muted-foreground">
                  <p className="text-sm">No leads in this stage</p>
                  <p className="text-xs">Drag leads here to move them</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}