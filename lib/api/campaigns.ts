import { Campaign, DiffusionList, ListCriteria, FollowUpMessage, MessageContent } from '@/lib/types/campaign'
import { Lead } from '@/lib/types/lead'

export class CampaignService {
  private static baseUrl = '/api/campaigns'

  // Campaign Management
  static async getCampaigns(): Promise<Campaign[]> {
    const response = await fetch(this.baseUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch campaigns')
    }
    return response.json()
  }

  static async getCampaign(id: string): Promise<Campaign> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch campaign')
    }
    return response.json()
  }

  static async createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<Campaign> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campaign),
    })

    if (!response.ok) {
      throw new Error('Failed to create campaign')
    }

    return response.json()
  }

  static async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error('Failed to update campaign')
    }

    return response.json()
  }

  static async deleteCampaign(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete campaign')
    }
  }

  static async launchCampaign(id: string): Promise<Campaign> {
    const response = await fetch(`${this.baseUrl}/${id}/launch`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to launch campaign')
    }

    return response.json()
  }

  static async pauseCampaign(id: string): Promise<Campaign> {
    const response = await fetch(`${this.baseUrl}/${id}/pause`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to pause campaign')
    }

    return response.json()
  }

  // Diffusion List Management
  static async getDiffusionLists(): Promise<DiffusionList[]> {
    const response = await fetch(`${this.baseUrl}/lists`)
    if (!response.ok) {
      throw new Error('Failed to fetch diffusion lists')
    }
    return response.json()
  }

  static async getDiffusionList(id: string): Promise<DiffusionList> {
    const response = await fetch(`${this.baseUrl}/lists/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch diffusion list')
    }
    return response.json()
  }

  static async createDiffusionList(list: Omit<DiffusionList, 'id' | 'createdAt' | 'updatedAt'>): Promise<DiffusionList> {
    const response = await fetch(`${this.baseUrl}/lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list),
    })

    if (!response.ok) {
      throw new Error('Failed to create diffusion list')
    }

    return response.json()
  }

  static async updateDiffusionList(id: string, updates: Partial<DiffusionList>): Promise<DiffusionList> {
    const response = await fetch(`${this.baseUrl}/lists/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error('Failed to update diffusion list')
    }

    return response.json()
  }

  static async deleteDiffusionList(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/lists/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete diffusion list')
    }
  }

  static async previewDiffusionList(criteria: ListCriteria): Promise<Lead[]> {
    const response = await fetch(`${this.baseUrl}/lists/preview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(criteria),
    })

    if (!response.ok) {
      throw new Error('Failed to preview diffusion list')
    }

    return response.json()
  }

  static async refreshDiffusionList(id: string): Promise<DiffusionList> {
    const response = await fetch(`${this.baseUrl}/lists/${id}/refresh`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to refresh diffusion list')
    }

    return response.json()
  }

  static async exportDiffusionList(id: string, format: 'csv' | 'excel'): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/lists/${id}/export?format=${format}`)
    
    if (!response.ok) {
      throw new Error('Failed to export diffusion list')
    }

    return response.blob()
  }

  // Follow-up Messages
  static async getFollowUpMessages(leadId?: string): Promise<FollowUpMessage[]> {
    const params = leadId ? `?leadId=${leadId}` : ''
    const response = await fetch(`${this.baseUrl}/follow-ups${params}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch follow-up messages')
    }

    return response.json()
  }

  static async createFollowUpMessage(message: Omit<FollowUpMessage, 'id' | 'createdAt'>): Promise<FollowUpMessage> {
    const response = await fetch(`${this.baseUrl}/follow-ups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    if (!response.ok) {
      throw new Error('Failed to create follow-up message')
    }

    return response.json()
  }

  static async updateFollowUpMessage(id: string, updates: Partial<FollowUpMessage>): Promise<FollowUpMessage> {
    const response = await fetch(`${this.baseUrl}/follow-ups/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error('Failed to update follow-up message')
    }

    return response.json()
  }

  static async deleteFollowUpMessage(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/follow-ups/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete follow-up message')
    }
  }

  static async sendFollowUpMessage(id: string): Promise<FollowUpMessage> {
    const response = await fetch(`${this.baseUrl}/follow-ups/${id}/send`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to send follow-up message')
    }

    return response.json()
  }

  // Analytics
  static async getCampaignAnalytics(campaignId: string, dateRange?: { start: Date; end: Date }) {
    const params = new URLSearchParams()
    if (dateRange) {
      params.append('startDate', dateRange.start.toISOString())
      params.append('endDate', dateRange.end.toISOString())
    }

    const response = await fetch(`${this.baseUrl}/${campaignId}/analytics?${params}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch campaign analytics')
    }

    return response.json()
  }

  static async getAllCampaignsAnalytics(dateRange?: { start: Date; end: Date }) {
    const params = new URLSearchParams()
    if (dateRange) {
      params.append('startDate', dateRange.start.toISOString())
      params.append('endDate', dateRange.end.toISOString())
    }

    const response = await fetch(`${this.baseUrl}/analytics?${params}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch campaigns analytics')
    }

    return response.json()
  }
}