export interface Agent {
  id: string
  name: string
  type: 'sdr' | 'customer-service' | 'custom'
  description: string
  capabilities: string[]
  status: 'active' | 'inactive' | 'training' | 'maintenance'
  avatar?: string
  performance: {
    leadsGenerated?: number
    ticketsResolved?: number
    responseTime?: number
    satisfactionScore?: number
  }
  configuration: {
    workingHours: {
      start: string
      end: string
      timezone: string
    }
    channels: string[]
    behavior: {
      tone: 'professional' | 'friendly' | 'casual'
      responseStyle: 'concise' | 'detailed'
      escalationRules: string[]
    }
  }
  createdAt: Date
  updatedAt: Date
  lastActiveAt?: Date
}

export interface CallSession {
  id: string
  userId: string
  startTime: Date
  endTime?: Date
  duration?: number
  status: 'connecting' | 'active' | 'ended' | 'failed'
  transcript: {
    timestamp: Date
    speaker: 'user' | 'assistant'
    text: string
  }[]
  summary?: string
  actionItems?: string[]
  quality: {
    audioQuality: 'excellent' | 'good' | 'fair' | 'poor'
    connectionStability: number
  }
}

export interface CustomAgentRequest {
  id: string
  userId: string
  title: string
  description: string
  requirements: string[]
  businessUseCase: string
  expectedCapabilities: string[]
  integrationNeeds: string[]
  status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'in-development'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  estimatedDelivery?: Date
  createdAt: Date
  updatedAt: Date
}