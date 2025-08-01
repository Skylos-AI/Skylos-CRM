import { Lead, LeadFilters } from '../types/lead'
import { mockLeads } from '../mock-data'

export class LeadsService {
  private static leads: Lead[] = [...mockLeads]

  static async getLeads(filters?: LeadFilters): Promise<Lead[]> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Simulate occasional network errors for demo
      if (Math.random() < 0.05) { // 5% chance of error
        throw new Error('Network error: Failed to fetch leads')
      }
      
      let filteredLeads = [...this.leads]

      if (filters) {
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase()
          filteredLeads = filteredLeads.filter(lead =>
            lead.name.toLowerCase().includes(searchTerm) ||
            lead.company.toLowerCase().includes(searchTerm) ||
            lead.email.toLowerCase().includes(searchTerm)
          )
        }

        if (filters.tags && filters.tags.length > 0) {
          filteredLeads = filteredLeads.filter(lead =>
            filters.tags!.some(tag => lead.tags.includes(tag))
          )
        }

        if (filters.priority && filters.priority.length > 0) {
          filteredLeads = filteredLeads.filter(lead =>
            filters.priority!.includes(lead.priority)
          )
        }

        if (filters.stage && filters.stage.length > 0) {
          filteredLeads = filteredLeads.filter(lead =>
            filters.stage!.includes(lead.stage)
          )
        }
      }

      return filteredLeads
    } catch (error) {
      console.error('LeadsService.getLeads error:', error)
      throw error
    }
  }

  static async getLead(id: string): Promise<Lead | null> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      if (Math.random() < 0.03) { // 3% chance of error
        throw new Error('Failed to fetch lead details')
      }
      
      return this.leads.find(lead => lead.id === id) || null
    } catch (error) {
      console.error('LeadsService.getLead error:', error)
      throw error
    }
  }

  static async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      if (Math.random() < 0.02) { // 2% chance of error
        throw new Error('Failed to update lead')
      }
      
      const leadIndex = this.leads.findIndex(lead => lead.id === id)
      if (leadIndex === -1) {
        throw new Error('Lead not found')
      }

      const updatedLead = {
        ...this.leads[leadIndex],
        ...updates,
        updatedAt: new Date()
      }

      this.leads[leadIndex] = updatedLead
      return updatedLead
    } catch (error) {
      console.error('LeadsService.updateLead error:', error)
      throw error
    }
  }

  static async moveLead(id: string, newStage: Lead['stage']): Promise<Lead> {
    return this.updateLead(id, { stage: newStage })
  }

  static async createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.leads.push(newLead)
    return newLead
  }

  static async deleteLead(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const leadIndex = this.leads.findIndex(lead => lead.id === id)
    if (leadIndex === -1) {
      throw new Error('Lead not found')
    }

    this.leads.splice(leadIndex, 1)
  }
}