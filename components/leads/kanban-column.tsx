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

const stageColors = {
  incoming: {
    header: "bg-blue-500 dark:bg-blue-600",
    text: "text-white",
    accent: "border-blue-200 dark:border-blue-800"
  },
  decision: {
    header: "bg-yellow-500 dark:bg-yellow-600", 
    text: "text-white",
    accent: "border-yellow-200 dark:border-yellow-800"
  },
  negotiation: {
    header: "bg-orange-500 dark:bg-orange-600",
    text: "text-white", 
    accent: "border-orange-200 dark:border-orange-800"
  },
  final: {
    header: "bg-green-500 dark:bg-green-600",
    text: "text-white",
    accent: "border-green-200 dark:border-green-800"
  }
}

export function KanbanColumnComponent({ column, onLeadClick, onFollowUpClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  const stageColor = stageColors[column.id as keyof typeof stageColors]

  return (
    <div className="flex-shrink-0 w-80">
      <Card className={cn(
        "h-full transition-all duration-300 ease-in-out",
        "bg-white dark:bg-slate-800 border border-light-border-subtle/60 dark:border-slate-700/40",
        "shadow-light-card dark:shadow-card rounded-xl",
        isOver && "ring-2 ring-primary ring-offset-2 scale-[1.02] shadow-xl transform"
      )}>
        <CardHeader className={cn(
          "pb-4 pt-4 rounded-t-lg shadow-sm",
          stageColor?.header,
          stageColor?.text
        )}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold tracking-tight">
                {column.title}
              </CardTitle>
              <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30 font-semibold">
                {column.leads.length}
              </Badge>
            </div>
            
            {/* Column metrics */}
            <div className="flex items-center justify-between text-xs opacity-90">
              <span className="font-medium">
                Total Value: ${column.leads.reduce((sum, lead) => sum + lead.dealAmount, 0).toLocaleString()}
              </span>
              <span className="font-medium">
                Avg: ${column.leads.length > 0 ? Math.round(column.leads.reduce((sum, lead) => sum + lead.dealAmount, 0) / column.leads.length).toLocaleString() : '0'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-4 bg-gray-25 dark:bg-slate-800/50 rounded-b-xl">
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
              <div className="flex h-40 items-center justify-center text-center">
                <div className="text-light-text-muted dark:text-slate-400 space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 dark:bg-slate-700/50 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-dashed border-light-border-default/40 dark:border-slate-600/40" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-light-text-secondary dark:text-slate-300">No leads in this stage</p>
                    <p className="text-xs text-light-text-muted dark:text-slate-400">Drag leads here to move them</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}