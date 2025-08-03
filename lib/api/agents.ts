import { Agent, CallSession, CustomAgentRequest } from '../types/agent'
import { mockAgents, mockCallSessions, mockCustomAgentRequests } from '../mock-data'

export class AgentsService {
  // Agent Management
  static async getAgents(): Promise<Agent[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockAgents
  }

  static async getAgent(id: string): Promise<Agent | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockAgents.find(agent => agent.id === id) || null
  }

  static async updateAgent(id: string, updates: Partial<Agent>): Promise<Agent> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const agentIndex = mockAgents.findIndex(agent => agent.id === id)
    if (agentIndex === -1) {
      throw new Error('Agent not found')
    }
    
    const updatedAgent = {
      ...mockAgents[agentIndex],
      ...updates,
      updatedAt: new Date()
    }
    
    mockAgents[agentIndex] = updatedAgent
    return updatedAgent
  }

  static async toggleAgentStatus(id: string): Promise<Agent> {
    const agent = await this.getAgent(id)
    if (!agent) {
      throw new Error('Agent not found')
    }
    
    const newStatus = agent.status === 'active' ? 'inactive' : 'active'
    return this.updateAgent(id, { status: newStatus })
  }

  static async bulkUpdateAgents(agentIds: string[], updates: Partial<Agent>): Promise<Agent[]> {
    await new Promise(resolve => setTimeout(resolve, 600))
    const updatedAgents: Agent[] = []
    
    for (const id of agentIds) {
      try {
        const updatedAgent = await this.updateAgent(id, updates)
        updatedAgents.push(updatedAgent)
      } catch (error) {
        console.error(`Failed to update agent ${id}:`, error)
      }
    }
    
    return updatedAgents
  }

  // Call Session Management
  static async getCallSessions(userId?: string): Promise<CallSession[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    if (userId) {
      return mockCallSessions.filter(session => session.userId === userId)
    }
    return mockCallSessions
  }

  static async startCallSession(userId: string): Promise<CallSession> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const newSession: CallSession = {
      id: `call-${Date.now()}`,
      userId,
      startTime: new Date(),
      status: 'connecting',
      transcript: [],
      quality: {
        audioQuality: 'good',
        connectionStability: 95
      }
    }
    
    mockCallSessions.push(newSession)
    
    // Simulate connection establishment
    setTimeout(() => {
      newSession.status = 'active'
    }, 2000)
    
    return newSession
  }

  static async endCallSession(sessionId: string, summary?: string, actionItems?: string[]): Promise<CallSession> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const sessionIndex = mockCallSessions.findIndex(session => session.id === sessionId)
    if (sessionIndex === -1) {
      throw new Error('Call session not found')
    }
    
    const session = mockCallSessions[sessionIndex]
    const endTime = new Date()
    const duration = Math.round((endTime.getTime() - session.startTime.getTime()) / 1000 / 60) // minutes
    
    const updatedSession = {
      ...session,
      endTime,
      duration,
      status: 'ended' as const,
      summary,
      actionItems
    }
    
    mockCallSessions[sessionIndex] = updatedSession
    return updatedSession
  }

  static async addTranscriptEntry(sessionId: string, speaker: 'user' | 'assistant', text: string): Promise<void> {
    const session = mockCallSessions.find(s => s.id === sessionId)
    if (!session) {
      throw new Error('Call session not found')
    }
    
    session.transcript.push({
      timestamp: new Date(),
      speaker,
      text
    })
  }

  // Custom Agent Requests
  static async getCustomAgentRequests(userId?: string): Promise<CustomAgentRequest[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    if (userId) {
      return mockCustomAgentRequests.filter(request => request.userId === userId)
    }
    return mockCustomAgentRequests
  }

  static async createCustomAgentRequest(request: Omit<CustomAgentRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<CustomAgentRequest> {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newRequest: CustomAgentRequest = {
      ...request,
      id: `request-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    mockCustomAgentRequests.push(newRequest)
    return newRequest
  }

  static async updateCustomAgentRequest(id: string, updates: Partial<CustomAgentRequest>): Promise<CustomAgentRequest> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const requestIndex = mockCustomAgentRequests.findIndex(request => request.id === id)
    if (requestIndex === -1) {
      throw new Error('Custom agent request not found')
    }
    
    const updatedRequest = {
      ...mockCustomAgentRequests[requestIndex],
      ...updates,
      updatedAt: new Date()
    }
    
    mockCustomAgentRequests[requestIndex] = updatedRequest
    return updatedRequest
  }

  // Agent Performance Analytics
  static async getAgentPerformanceMetrics(agentId: string, timeRange: '7d' | '30d' | '90d' = '30d'): Promise<{
    totalInteractions: number
    averageResponseTime: number
    satisfactionScore: number
    successRate: number
    trendsData: Array<{ date: string; value: number }>
  }> {
    await new Promise(resolve => setTimeout(resolve, 600))
    const agent = await this.getAgent(agentId)
    if (!agent) {
      throw new Error('Agent not found')
    }
    
    // Mock performance data
    const baseMetrics = {
      totalInteractions: agent.performance.leadsGenerated || agent.performance.ticketsResolved || 0,
      averageResponseTime: agent.performance.responseTime || 0,
      satisfactionScore: agent.performance.satisfactionScore || 0,
      successRate: Math.random() * 20 + 80, // 80-100%
      trendsData: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: Math.random() * 50 + 50
      }))
    }
    
    return baseMetrics
  }
}