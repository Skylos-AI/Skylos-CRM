"use client"

import { useState } from "react"
import { Agent } from "@/lib/types/agent"
import { AgentsService } from "@/lib/api/agents"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Bot, 
  MoreHorizontal, 
  Settings, 
  Play, 
  Pause, 
  BarChart3,
  Clock,
  Star,
  Users,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AgentCardProps {
  agent: Agent
  onUpdate: (agent: Agent) => void
  onConfigure?: (agent: Agent) => void
}

export function AgentCard({ agent, onUpdate, onConfigure }: AgentCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleStatus = async () => {
    try {
      setIsLoading(true)
      const updatedAgent = await AgentsService.toggleAgentStatus(agent.id)
      onUpdate(updatedAgent)
    } catch (error) {
      console.error('Failed to toggle agent status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'inactive':
        return 'bg-gray-500'
      case 'training':
        return 'bg-yellow-500'
      case 'maintenance':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusBadgeVariant = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'inactive':
        return 'secondary'
      case 'training':
        return 'outline'
      case 'maintenance':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getAgentTypeIcon = (type: Agent['type']) => {
    switch (type) {
      case 'sdr':
        return <Users className="h-4 w-4" />
      case 'customer-service':
        return <MessageSquare className="h-4 w-4" />
      case 'custom':
        return <Bot className="h-4 w-4" />
      default:
        return <Bot className="h-4 w-4" />
    }
  }

  const getAgentTypeName = (type: Agent['type']) => {
    switch (type) {
      case 'sdr':
        return 'SDR Agent'
      case 'customer-service':
        return 'Customer Service'
      case 'custom':
        return 'Custom Agent'
      default:
        return 'AI Agent'
    }
  }

  return (
    <Card className={cn(
      "relative transition-all duration-200 hover:shadow-md",
      agent.status === 'active' && "ring-2 ring-green-500/20"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback className="bg-primary/10">
                  {getAgentTypeIcon(agent.type)}
                </AvatarFallback>
              </Avatar>
              <div className={cn(
                "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background",
                getStatusColor(agent.status)
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{agent.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {getAgentTypeName(agent.type)}
                </Badge>
                <Badge variant={getStatusBadgeVariant(agent.status)} className="text-xs">
                  {agent.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onConfigure?.(agent)}>
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleStatus} disabled={isLoading}>
                {agent.status === 'active' ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground">
          {agent.description}
        </p>
        
        {/* Capabilities */}
        <div>
          <h4 className="text-sm font-medium mb-2">Key Capabilities</h4>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.slice(0, 3).map((capability, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {capability}
              </Badge>
            ))}
            {agent.capabilities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{agent.capabilities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          {agent.performance.leadsGenerated !== undefined && (
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">
                {agent.performance.leadsGenerated}
              </div>
              <div className="text-xs text-muted-foreground">Leads Generated</div>
            </div>
          )}
          
          {agent.performance.ticketsResolved !== undefined && (
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">
                {agent.performance.ticketsResolved}
              </div>
              <div className="text-xs text-muted-foreground">Tickets Resolved</div>
            </div>
          )}
          
          {agent.performance.responseTime && (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {agent.performance.responseTime}s
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
            </div>
          )}
          
          {agent.performance.satisfactionScore && (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">
                  {agent.performance.satisfactionScore}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </div>
          )}
        </div>
        
        {/* Working Hours */}
        <div className="text-xs text-muted-foreground">
          Active: {agent.configuration.workingHours.start} - {agent.configuration.workingHours.end} {agent.configuration.workingHours.timezone}
        </div>
        
        {/* Last Active */}
        {agent.lastActiveAt && (
          <div className="text-xs text-muted-foreground">
            Last active: {agent.lastActiveAt.toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}