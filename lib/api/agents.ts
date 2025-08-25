import { Agent, CallSession, CustomAgentRequest } from '../types/agent'
import { mockAgents, mockCallSessions, mockCustomAgentRequests } from '../mock-data'

// Types for Agent Demo functionality
export interface DemoAgent {
  id: string
  name: string
  description: string
  role: string
  voice_name: string
  language_code: string
  objectives: DemoObjective[]
}

export interface DemoObjective {
  id: string
  label: string
  description: string
}

export interface ObjectiveStatus {
  [objectiveId: string]: 'pending' | 'in_progress' | 'completed'
}

export interface AnalysisResult {
  message: string
  analysis: string
}

// Python API configuration
const PYTHON_API_BASE = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:8080'

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

  // === DEMO AGENT FUNCTIONALITY ===
  
  /**
   * Get available demo agents from Python API
   */
  static async getDemoAgents(): Promise<DemoAgent[]> {
    try {
      const response = await fetch(`${PYTHON_API_BASE}/api/agents`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data.agents || []
    } catch (error) {
      console.error('Error fetching demo agents:', error)
      // Return mock data as fallback
      return this.getMockDemoAgents()
    }
  }

  /**
   * Check if API key is configured on Python backend
   */
  static async checkDemoApiKeyStatus(): Promise<{ configured: boolean }> {
    try {
      const response = await fetch(`${PYTHON_API_BASE}/api/api_key_status`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error checking API key status:', error)
      return { configured: false }
    }
  }

  /**
   * Get objectives progress for an agent in real-time
   */
  static async getObjectivesProgress(agentId: string): Promise<{ statuses: ObjectiveStatus }> {
    try {
      const response = await fetch(`${PYTHON_API_BASE}/api/objectives_progress/${agentId}`)
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait before trying again.')
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching objectives progress:', error)
      throw error
    }
  }

  /**
   * Trigger conversation analysis for an agent
   */
  static async analyseConversation(agentId: string): Promise<AnalysisResult> {
    try {
      const response = await fetch(`${PYTHON_API_BASE}/api/analyse/${agentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error analysing conversation:', error)
      throw error
    }
  }

  /**
   * Create WebSocket URL for agent conversation
   */
  static createDemoWebSocketUrl(options: {
    userId: string | number
    agentId: string
    isAudio: boolean
    voiceName?: string
    languageCode?: string
  }): string {
    const wsBase = PYTHON_API_BASE.replace('http://', 'ws://').replace('https://', 'wss://')
    const params = new URLSearchParams({
      is_audio: options.isAudio.toString(),
      agent_id: options.agentId
    })

    if (options.voiceName) {
      params.append('voice_name', options.voiceName)
    }

    if (options.languageCode) {
      params.append('language_code', options.languageCode)
    }

    return `${wsBase}/ws/${options.userId}?${params.toString()}`
  }

  /**
   * Health check for Python API
   */
  static async healthCheckDemoApi(): Promise<boolean> {
    try {
      const response = await fetch(`${PYTHON_API_BASE}/api/agents`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })
      return response.ok
    } catch (error) {
      console.error('Python API health check failed:', error)
      return false
    }
  }

  /**
   * Mock demo agents data for development/fallback
   */
  private static getMockDemoAgents(): DemoAgent[] {
    return [
      {
        id: 'sdr',
        name: 'Agente SDR',
        description: 'Especialista en desarrollo de ventas que califica leads y identifica oportunidades de negocio.',
        role: 'Sales Development Representative',
        voice_name: 'Aoede',
        language_code: 'es-ES',
        objectives: [
          {
            id: '1',
            label: 'Identificar empresa',
            description: 'Obtener información sobre la empresa del prospecto y su industria'
          },
          {
            id: '2',
            label: 'Calificar necesidad',
            description: 'Entender problemas específicos y necesidades del cliente'
          },
          {
            id: '3',
            label: 'Evaluar presupuesto',
            description: 'Determinar capacidad de inversión y rango presupuestario'
          },
          {
            id: '4',
            label: 'Timeline decisión',
            description: 'Establecer cronograma y proceso de toma de decisiones'
          }
        ]
      },
      {
        id: 'cs',
        name: 'Agente de Soporte',
        description: 'Especialista en atención al cliente que resuelve problemas técnicos y brinda asistencia.',
        role: 'Customer Service Representative',
        voice_name: 'Echo',
        language_code: 'es-ES',
        objectives: [
          {
            id: '1',
            label: 'Identificar problema',
            description: 'Comprender completamente la situación y el problema del cliente'
          },
          {
            id: '2',
            label: 'Diagnosticar causa',
            description: 'Determinar la causa raíz del problema reportado'
          },
          {
            id: '3',
            label: 'Proponer solución',
            description: 'Ofrecer alternativas de resolución claras y factibles'
          },
          {
            id: '4',
            label: 'Confirmar resolución',
            description: 'Verificar que el problema se resolvió satisfactoriamente'
          }
        ]
      }
    ]
  }
}