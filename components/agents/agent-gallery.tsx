"use client"

import { useState } from "react"
import { Agent } from "@/lib/types/agent"
import { AgentCard } from "./agent-card"
import { AgentConfigDialog } from "./agent-config-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageTransition, FadeInUp, StaggerContainer, StaggerItem } from "@/components/shared/page-transition"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Play, 
  Pause, 
  Settings,
  Grid,
  List
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AgentGalleryProps {
  agents: Agent[]
  onAgentUpdate: (agent: Agent) => void
}

type ViewMode = 'grid' | 'list'
type FilterType = 'all' | 'active' | 'inactive' | 'sdr' | 'customer-service' | 'custom'

export function AgentGallery({ agents, onAgentUpdate }: AgentGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])

  // Filter and search agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.capabilities.some(cap => cap.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'active' && agent.status === 'active') ||
                         (filterType === 'inactive' && agent.status !== 'active') ||
                         agent.type === filterType
    
    return matchesSearch && matchesFilter
  })

  const handleConfigureAgent = (agent: Agent) => {
    setSelectedAgent(agent)
    setShowConfigDialog(true)
  }

  const handleBulkAction = async (action: 'activate' | 'deactivate' | 'configure') => {
    try {
      setLoading(true)
      
      if (action === 'activate' || action === 'deactivate') {
        const newStatus = action === 'activate' ? 'active' : 'inactive'
        
        // Update each selected agent
        for (const agentId of selectedAgents) {
          const agent = agents.find(a => a.id === agentId)
          if (agent) {
            const updatedAgent = await AgentsService.updateAgent(agentId, { status: newStatus })
            onAgentUpdate(updatedAgent)
          }
        }
        
        // Show success message
        const actionText = action === 'activate' ? 'activated' : 'deactivated'
        console.log(`Successfully ${actionText} ${selectedAgents.length} agents`)
      } else if (action === 'configure') {
        // For bulk configuration, we could open a bulk config dialog
        console.log('Bulk configuration for agents:', selectedAgents)
      }
      
      setSelectedAgents([])
    } catch (error) {
      console.error(`Failed to ${action} agents:`, error)
    } finally {
      setLoading(false)
    }
  }

  const getFilterCount = (filter: FilterType) => {
    switch (filter) {
      case 'all':
        return agents.length
      case 'active':
        return agents.filter(a => a.status === 'active').length
      case 'inactive':
        return agents.filter(a => a.status !== 'active').length
      case 'sdr':
        return agents.filter(a => a.type === 'sdr').length
      case 'customer-service':
        return agents.filter(a => a.type === 'customer-service').length
      case 'custom':
        return agents.filter(a => a.type === 'custom').length
      default:
        return 0
    }
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <FadeInUp>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={(value: FilterType) => setFilterType(value)}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                All Agents ({getFilterCount('all')})
              </SelectItem>
              <SelectItem value="active">
                Active ({getFilterCount('active')})
              </SelectItem>
              <SelectItem value="inactive">
                Inactive ({getFilterCount('inactive')})
              </SelectItem>
              <SelectItem value="sdr">
                SDR ({getFilterCount('sdr')})
              </SelectItem>
              <SelectItem value="customer-service">
                Customer Service ({getFilterCount('customer-service')})
              </SelectItem>
              <SelectItem value="custom">
                Custom ({getFilterCount('custom')})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Bulk Actions */}
          {selectedAgents.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  Actions ({selectedAgents.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleBulkAction('activate')}>
                  <Play className="mr-2 h-4 w-4" />
                  Activate Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction('deactivate')}>
                  <Pause className="mr-2 h-4 w-4" />
                  Deactivate Selected
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Bulk Configure
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
          </div>
        </FadeInUp>

        {/* Filter Tags */}
        {(searchQuery || filterType !== 'all') && (
          <FadeInUp delay={0.1}>
            <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Filters:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchQuery}"
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {filterType !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Type: {filterType}
              <button
                onClick={() => setFilterType('all')}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
            </div>
          </FadeInUp>
        )}

        {/* Results Count */}
        <FadeInUp delay={0.2}>
          <div className="text-sm text-muted-foreground">
            Showing {filteredAgents.length} of {agents.length} agents
          </div>
        </FadeInUp>

        {/* Agent Grid/List */}
        {filteredAgents.length === 0 ? (
          <FadeInUp delay={0.3}>
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                {searchQuery || filterType !== 'all' 
                  ? "No agents match your current filters" 
                  : "No agents available"
                }
              </div>
              {(searchQuery || filterType !== 'all') && (
                <Button 
                  variant="outline" 
                  className="mt-4 transition-all duration-200 hover:scale-105"
                  onClick={() => {
                    setSearchQuery("")
                    setFilterType('all')
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </FadeInUp>
        ) : (
          <StaggerContainer 
            className={cn(
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            )}
          >
            {filteredAgents.map((agent) => (
              <StaggerItem key={agent.id}>
                <AgentCard
                  agent={agent}
                  onUpdate={onAgentUpdate}
                  onConfigure={handleConfigureAgent}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

      {/* Configuration Dialog */}
      {showConfigDialog && selectedAgent && (
        <AgentConfigDialog
          agent={selectedAgent}
          onSave={(updatedAgent) => {
            onAgentUpdate(updatedAgent)
            setShowConfigDialog(false)
            setSelectedAgent(null)
          }}
          onClose={() => {
            setShowConfigDialog(false)
            setSelectedAgent(null)
          }}
        />
      )}
      </div>
    </PageTransition>
  )
}