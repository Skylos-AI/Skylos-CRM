"use client"

import { useState, useEffect } from "react"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Lead, KanbanColumn, LeadFilters } from "@/lib/types/lead"
import { LeadsService } from "@/lib/api/leads"
import { KanbanColumnComponent } from "./kanban-column"
import { EnhancedLeadCard } from "./enhanced-lead-card"
import { EnhancedLeadDetailsDialog } from "./enhanced-lead-details-dialog"
import { EnhancedFollowUpDialog } from "@/components/follow-up/enhanced-follow-up-dialog"
import { LeadFiltersComponent } from "./lead-filters"
import { KanbanSkeleton } from "@/components/shared/loading-skeleton"
import { useErrorHandler } from "@/hooks/use-error-handler"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

const COLUMNS: Omit<KanbanColumn, 'leads'>[] = [
  {
    id: 'incoming',
    title: 'Incoming Leads',
    color: 'bg-blue-100 border-blue-200'
  },
  {
    id: 'decision',
    title: 'Decision Making',
    color: 'bg-yellow-100 border-yellow-200'
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    color: 'bg-orange-100 border-orange-200'
  },
  {
    id: 'final',
    title: 'Final Decision',
    color: 'bg-green-100 border-green-200'
  }
]

interface KanbanBoardProps {
  showFilters?: boolean
}

export function KanbanBoard({ showFilters = true }: KanbanBoardProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>([])
  const [allLeads, setAllLeads] = useState<Lead[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeLead, setActiveLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogDefaultTab, setDialogDefaultTab] = useState('details')
  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false)
  const [followUpLead, setFollowUpLead] = useState<Lead | null>(null)
  const [filters, setFilters] = useState<LeadFilters>({})
  const [error, setError] = useState<string | null>(null)
  const { handleError, handleSuccess } = useErrorHandler()

  useEffect(() => {
    loadLeads()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, allLeads])

  const loadLeads = async () => {
    try {
      setError(null)
      const leads = await LeadsService.getLeads()
      setAllLeads(leads)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load leads'
      setError(errorMessage)
      handleError(error as Error, { showToast: false })
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = async () => {
    try {
      setError(null)
      const filteredLeads = await LeadsService.getLeads(filters)
      const columnsWithLeads = COLUMNS.map(column => ({
        ...column,
        leads: filteredLeads.filter(lead => lead.stage === column.id)
      }))
      setColumns(columnsWithLeads)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to apply filters'
      setError(errorMessage)
      handleError(error as Error)
    }
  }

  const handleFiltersChange = (newFilters: LeadFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({})
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
    
    // Find the active lead
    const lead = columns
      .flatMap(column => column.leads)
      .find(lead => lead.id === active.id)
    setActiveLead(lead || null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) {
      setActiveId(null)
      setActiveLead(null)
      return
    }

    const leadId = active.id as string
    const newStage = over.id as Lead['stage']

    // Find current lead and column
    const currentColumn = columns.find(column => 
      column.leads.some(lead => lead.id === leadId)
    )
    
    if (!currentColumn || currentColumn.id === newStage) {
      setActiveId(null)
      setActiveLead(null)
      return
    }

    try {
      // Update lead stage via API
      await LeadsService.moveLead(leadId, newStage)
      
      // Update local state
      setColumns(prevColumns => {
        const newColumns = prevColumns.map(column => ({
          ...column,
          leads: column.leads.filter(lead => lead.id !== leadId)
        }))

        const targetColumnIndex = newColumns.findIndex(col => col.id === newStage)
        const leadToMove = currentColumn.leads.find(lead => lead.id === leadId)
        
        if (leadToMove && targetColumnIndex !== -1) {
          newColumns[targetColumnIndex].leads.push({
            ...leadToMove,
            stage: newStage
          })
        }

        return newColumns
      })
      
      handleSuccess(`Lead moved to ${newStage} stage`)
    } catch (error) {
      handleError(error as Error)
      // Revert the drag operation by reloading data
      applyFilters()
    }

    setActiveId(null)
    setActiveLead(null)
  }

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setDialogOpen(true)
  }

  const handleFollowUpClick = (lead: Lead) => {
    setFollowUpLead(lead)
    setFollowUpDialogOpen(true)
  }

  const handleLeadSave = async (updatedLead: Lead) => {
    try {
      await LeadsService.updateLead(updatedLead.id, updatedLead)
      
      // Update local state
      setColumns(prevColumns => 
        prevColumns.map(column => ({
          ...column,
          leads: column.leads.map(lead => 
            lead.id === updatedLead.id ? updatedLead : lead
          )
        }))
      )
      
      setSelectedLead(updatedLead)
      handleSuccess('Lead updated successfully')
    } catch (error) {
      handleError(error as Error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {showFilters && (
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <div className="h-10 bg-muted animate-pulse rounded-md" />
            </div>
            <div className="h-10 w-24 bg-muted animate-pulse rounded-md" />
          </div>
        )}
        <KanbanSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLoading(true)
                loadLeads()
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showFilters && (
        <LeadFiltersComponent
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />
      )}
      
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4">
          {columns.map((column) => (
            <KanbanColumnComponent
              key={column.id}
              column={column}
              onLeadClick={handleLeadClick}
              onFollowUpClick={handleFollowUpClick}
            />
          ))}
        </div>
      
      <DragOverlay>
        {activeLead ? (
          <div className="rotate-3 opacity-90 transform scale-105 transition-all duration-200 ease-out shadow-2xl">
            <EnhancedLeadCard 
              lead={activeLead} 
              compact={true}
              showAssignee={false}
              showSource={false}
            />
          </div>
        ) : null}
      </DragOverlay>
      
      <EnhancedLeadDetailsDialog
        lead={selectedLead}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleLeadSave}
      />
      
      <EnhancedFollowUpDialog
        lead={followUpLead}
        open={followUpDialogOpen}
        onOpenChange={setFollowUpDialogOpen}
        onFollowUpCreated={(followUp) => {
          console.log('Follow-up created:', followUp)
          // Refresh leads or update UI as needed
        }}
      />
      </DndContext>
    </div>
  )
}