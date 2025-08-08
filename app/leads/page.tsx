import { CrmLayout } from "@/components/layout/crm-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { KanbanBoard } from "@/components/leads/kanban-board"
import { Button } from "@/components/ui/button"
import { PageTransition, FadeInUp, SlideInLeft } from "@/components/shared/page-transition"
import { Plus } from "lucide-react"

export default function LeadsPage() {
  return (
    <ProtectedRoute>
      <CrmLayout>
      <PageTransition>
        <div className="space-y-6">
          <FadeInUp>
            <div className="flex items-center justify-between">
              <SlideInLeft>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-light-text-primary dark:text-slate-50">Leads</h1>
                  <p className="text-light-text-tertiary dark:text-slate-400">
                    Manage your sales pipeline with the kanban board.
                  </p>
                </div>
              </SlideInLeft>
              <FadeInUp delay={0.2}>
                <Button className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lead
                </Button>
              </FadeInUp>
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <KanbanBoard />
          </FadeInUp>
        </div>
      </PageTransition>
    </CrmLayout>
    </ProtectedRoute>
  )
}