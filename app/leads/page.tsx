import { CrmLayout } from "@/components/layout/crm-layout"
import { KanbanBoard } from "@/components/leads/kanban-board"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function LeadsPage() {
  return (
    <CrmLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Leads</h1>
            <p className="text-muted-foreground">
              Manage your sales pipeline with the kanban board.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
        
        <KanbanBoard />
      </div>
    </CrmLayout>
  )
}