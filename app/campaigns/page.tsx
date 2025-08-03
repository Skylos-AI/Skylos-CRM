import { CrmLayout } from "@/components/layout/crm-layout"
import { Button } from "@/components/ui/button"
import { Plus, Megaphone } from "lucide-react"

export default function CampaignsPage() {
  return (
    <CrmLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Campaigns</h1>
            <p className="text-muted-foreground">
              Create and manage your marketing campaigns with rich media content.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
        
        {/* Placeholder content */}
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Megaphone className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Campaign Management Coming Soon</h2>
          <p className="text-muted-foreground max-w-md">
            We're building powerful campaign management tools with media library support, 
            audience segmentation, and automation workflows.
          </p>
        </div>
      </div>
    </CrmLayout>
  )
}