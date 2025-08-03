"use client"

import { useState, useEffect } from "react"
import { CrmLayout } from "@/components/layout/crm-layout"
import { AgentsService } from "@/lib/api/agents"
import { Agent, CustomAgentRequest } from "@/lib/types/agent"
import { AgentGallery } from "@/components/agents/agent-gallery-simple"
import { CustomAgentBuilder } from "@/components/agents/custom-agent-builder"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { ErrorBoundary } from "@/components/shared/error-boundary"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Bot, Clock, CheckCircle } from "lucide-react"

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [customRequests, setCustomRequests] = useState<CustomAgentRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCustomBuilder, setShowCustomBuilder] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [agentsData, requestsData] = await Promise.all([
        AgentsService.getAgents(),
        AgentsService.getCustomAgentRequests()
      ])
      setAgents(agentsData)
      setCustomRequests(requestsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load agents data')
    } finally {
      setLoading(false)
    }
  }

  const handleAgentUpdate = (updatedAgent: Agent) => {
    setAgents(prev => prev.map(agent => 
      agent.id === updatedAgent.id ? updatedAgent : agent
    ))
  }

  const handleCustomRequestSubmit = (request: CustomAgentRequest) => {
    setCustomRequests(prev => [request, ...prev])
    setShowCustomBuilder(false)
  }

  if (loading) {
    return (
      <CrmLayout>
        <div className="container mx-auto p-6">
          <LoadingSkeleton />
        </div>
      </CrmLayout>
    )
  }

  if (error) {
    return (
      <CrmLayout>
        <div className="container mx-auto p-6">
          <ErrorBoundary error={error} />
        </div>
      </CrmLayout>
    )
  }

  const activeAgents = agents.filter(agent => agent.status === 'active')
  const inactiveAgents = agents.filter(agent => agent.status !== 'active')

  return (
    <CrmLayout>
      <ErrorBoundary>
        <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
            <p className="text-muted-foreground">
              Manage your AI agents and automate customer interactions
            </p>
          </div>
          <Button onClick={() => setShowCustomBuilder(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Request Custom Agent
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAgents.length}</div>
              <p className="text-xs text-muted-foreground">
                Currently running
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {agents.reduce((sum, agent) => 
                  sum + (agent.performance.leadsGenerated || 0) + (agent.performance.ticketsResolved || 0), 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(agents.reduce((sum, agent) => sum + (agent.performance.responseTime || 0), 0) / agents.length).toFixed(1)}s
              </div>
              <p className="text-xs text-muted-foreground">
                Across all agents
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custom Requests</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                Pending & approved
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="gallery" className="space-y-4">
          <TabsList>
            <TabsTrigger value="gallery">Agent Gallery</TabsTrigger>
            <TabsTrigger value="requests">
              Custom Requests
              {customRequests.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {customRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="space-y-4">
            <AgentGallery 
              agents={agents} 
              onAgentUpdate={handleAgentUpdate}
            />
          </TabsContent>
          
          <TabsContent value="requests" className="space-y-4">
            <div className="grid gap-4">
              {customRequests.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>No Custom Requests</CardTitle>
                    <CardDescription>
                      You haven't submitted any custom agent requests yet.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => setShowCustomBuilder(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Request
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                customRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{request.title}</CardTitle>
                        <Badge variant={
                          request.status === 'approved' ? 'default' :
                          request.status === 'in-review' ? 'secondary' :
                          request.status === 'rejected' ? 'destructive' :
                          'outline'
                        }>
                          {request.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <CardDescription>{request.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium">Business Use Case</h4>
                          <p className="text-sm text-muted-foreground">{request.businessUseCase}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Priority</h4>
                          <Badge variant={
                            request.priority === 'urgent' ? 'destructive' :
                            request.priority === 'high' ? 'default' :
                            'secondary'
                          }>
                            {request.priority}
                          </Badge>
                        </div>
                        {request.estimatedDelivery && (
                          <div>
                            <h4 className="text-sm font-medium">Estimated Delivery</h4>
                            <p className="text-sm text-muted-foreground">
                              {request.estimatedDelivery.toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Custom Agent Builder Modal */}
        {showCustomBuilder && (
          <CustomAgentBuilder
            onSubmit={handleCustomRequestSubmit}
            onClose={() => setShowCustomBuilder(false)}
          />
        )}
        </div>
      </ErrorBoundary>
    </CrmLayout>
  )
}