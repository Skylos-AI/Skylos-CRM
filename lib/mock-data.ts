import { Lead } from './types/lead'
import { Company } from './types/company'
import { Contact } from './types/contact'

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Enterprise Software Deal',
    company: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1-555-0123',
    dealAmount: 75000,
    currency: 'USD',
    stage: 'incoming',
    tags: ['enterprise', 'software', 'urgent'],
    priority: 'high',
    assignedTo: 'john-doe',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    lastContactDate: new Date('2024-01-18'),
    nextFollowUp: new Date('2024-02-01'),
    notes: 'Initial contact made, very interested in our enterprise solution.',
    source: 'website'
  },
  {
    id: '2',
    name: 'Marketing Automation Platform',
    company: 'TechStart Inc',
    email: 'hello@techstart.com',
    phone: '+1-555-0124',
    dealAmount: 25000,
    currency: 'USD',
    stage: 'decision',
    tags: ['marketing', 'automation'],
    priority: 'medium',
    assignedTo: 'jane-smith',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-22'),
    lastContactDate: new Date('2024-01-20'),
    nextFollowUp: new Date('2024-01-25'),
    notes: 'Demo completed, waiting for decision from their team.',
    source: 'referral'
  },
  {
    id: '3',
    name: 'CRM Integration Project',
    company: 'Global Solutions Ltd',
    email: 'projects@globalsolutions.com',
    phone: '+1-555-0125',
    dealAmount: 45000,
    currency: 'USD',
    stage: 'negotiation',
    tags: ['integration', 'crm'],
    priority: 'high',
    assignedTo: 'mike-johnson',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-23'),
    lastContactDate: new Date('2024-01-22'),
    nextFollowUp: new Date('2024-01-26'),
    notes: 'In final negotiations, discussing pricing and timeline.',
    source: 'cold_outreach'
  },
  {
    id: '4',
    name: 'Small Business Package',
    company: 'Local Retail Co',
    email: 'owner@localretail.com',
    dealAmount: 8000,
    currency: 'USD',
    stage: 'final',
    tags: ['small-business', 'retail'],
    priority: 'low',
    assignedTo: 'sarah-wilson',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-24'),
    lastContactDate: new Date('2024-01-23'),
    notes: 'Contract signed, implementation starting next week.',
    source: 'social_media'
  }
]

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    industry: 'Technology',
    size: 'large',
    website: 'https://acme.com',
    address: {
      street: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    },
    contacts: [],
    deals: [],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'TechStart Inc',
    industry: 'Startup',
    size: 'small',
    website: 'https://techstart.com',
    contacts: [],
    deals: [],
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2024-01-10')
  }
]

export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@acme.com',
    phone: '+1-555-0123',
    position: 'CTO',
    companyId: '1',
    avatar: '/avatars/john-smith.jpg',
    socialProfiles: [
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/johnsmith'
      }
    ],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@techstart.com',
    phone: '+1-555-0124',
    position: 'CEO',
    companyId: '2',
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2024-01-10')
  }
]