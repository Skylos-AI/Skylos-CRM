export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone?: string
  dealAmount: number
  currency: string
  stage: 'incoming' | 'decision' | 'negotiation' | 'final'
  tags: string[]
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string
  createdAt: Date
  updatedAt: Date
  lastContactDate?: Date
  nextFollowUp?: Date
  notes?: string
  source: string
}

export interface KanbanColumn {
  id: string
  title: string
  leads: Lead[]
  color: string
}

export interface LeadFilters {
  search?: string
  tags?: string[]
  priority?: Lead['priority'][]
  stage?: Lead['stage'][]
  assignedTo?: string[]
}