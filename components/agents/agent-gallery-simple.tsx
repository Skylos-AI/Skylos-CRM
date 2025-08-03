"use client"

import { Agent } from "@/lib/types/agent"
import { AgentCard } from "./agent-card"

interface AgentGalleryProps {
  agents: Agent[]
  onAgentUpdate: (agent: Agent) => void
}

export function AgentGallery({ agents, onAgentUpdate }: AgentGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Showing {agents.length} agents
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onUpdate={onAgentUpdate}
          />
        ))}
      </div>
    </div>
  )
}