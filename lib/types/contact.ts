export interface SocialProfile {
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram'
  url: string
}

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  position?: string
  companyId: string
  avatar?: string
  socialProfiles?: SocialProfile[]
  createdAt: Date
  updatedAt: Date
}