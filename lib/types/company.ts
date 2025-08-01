import { Contact } from './contact'
import { Lead } from './lead'

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Company {
  id: string
  name: string
  industry: string
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
  website?: string
  address?: Address
  contacts: Contact[]
  deals: Lead[]
  createdAt: Date
  updatedAt: Date
}