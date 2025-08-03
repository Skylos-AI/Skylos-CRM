import { Lead } from './types/lead'
import { Company } from './types/company'
import { Contact } from './types/contact'
import { Agent, CallSession, CustomAgentRequest } from './types/agent'

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

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Alex SDR Pro',
    type: 'sdr',
    description: 'Advanced Sales Development Representative specializing in lead qualification and initial outreach',
    capabilities: [
      'Lead qualification',
      'Cold outreach',
      'Email campaigns',
      'Social media prospecting',
      'Meeting scheduling',
      'CRM data entry'
    ],
    status: 'active',
    avatar: '/avatars/alex-sdr.jpg',
    performance: {
      leadsGenerated: 156,
      responseTime: 2.3,
      satisfactionScore: 4.7
    },
    configuration: {
      workingHours: {
        start: '09:00',
        end: '17:00',
        timezone: 'America/New_York'
      },
      channels: ['email', 'linkedin', 'phone'],
      behavior: {
        tone: 'professional',
        responseStyle: 'concise',
        escalationRules: [
          'Escalate to human after 3 failed contact attempts',
          'Escalate high-value leads (>$50k) immediately',
          'Escalate angry or frustrated prospects'
        ]
      }
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-24'),
    lastActiveAt: new Date('2024-01-24T14:30:00')
  },
  {
    id: '2',
    name: 'Emma Support',
    type: 'customer-service',
    description: 'Customer service specialist focused on support ticket resolution and customer satisfaction',
    capabilities: [
      'Ticket resolution',
      'Product troubleshooting',
      'Billing inquiries',
      'Feature explanations',
      'Escalation management',
      'Customer onboarding'
    ],
    status: 'active',
    avatar: '/avatars/emma-support.jpg',
    performance: {
      ticketsResolved: 342,
      responseTime: 1.8,
      satisfactionScore: 4.9
    },
    configuration: {
      workingHours: {
        start: '08:00',
        end: '20:00',
        timezone: 'America/New_York'
      },
      channels: ['chat', 'email', 'phone'],
      behavior: {
        tone: 'friendly',
        responseStyle: 'detailed',
        escalationRules: [
          'Escalate technical issues beyond basic troubleshooting',
          'Escalate billing disputes over $500',
          'Escalate after 2 unsuccessful resolution attempts'
        ]
      }
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-24'),
    lastActiveAt: new Date('2024-01-24T15:45:00')
  },
  {
    id: '3',
    name: 'Marcus Enterprise',
    type: 'custom',
    description: 'Custom enterprise sales agent specialized in complex B2B deals and relationship management',
    capabilities: [
      'Enterprise deal management',
      'Stakeholder mapping',
      'Proposal generation',
      'Contract negotiation support',
      'Account planning',
      'Competitive analysis'
    ],
    status: 'training',
    avatar: '/avatars/marcus-enterprise.jpg',
    performance: {
      leadsGenerated: 23,
      responseTime: 3.1,
      satisfactionScore: 4.5
    },
    configuration: {
      workingHours: {
        start: '09:00',
        end: '18:00',
        timezone: 'America/New_York'
      },
      channels: ['email', 'phone', 'video-call'],
      behavior: {
        tone: 'professional',
        responseStyle: 'detailed',
        escalationRules: [
          'Escalate deals over $100k to senior sales team',
          'Escalate legal questions immediately',
          'Escalate procurement process questions'
        ]
      }
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-24'),
    lastActiveAt: new Date('2024-01-24T11:20:00')
  },
  {
    id: '4',
    name: 'Luna Analytics',
    type: 'custom',
    description: 'Data analytics specialist agent for reporting and business intelligence support',
    capabilities: [
      'Data analysis',
      'Report generation',
      'Dashboard creation',
      'Trend identification',
      'Performance metrics',
      'Business insights'
    ],
    status: 'inactive',
    avatar: '/avatars/luna-analytics.jpg',
    performance: {
      responseTime: 4.2,
      satisfactionScore: 4.3
    },
    configuration: {
      workingHours: {
        start: '10:00',
        end: '16:00',
        timezone: 'America/New_York'
      },
      channels: ['email', 'dashboard'],
      behavior: {
        tone: 'professional',
        responseStyle: 'detailed',
        escalationRules: [
          'Escalate complex statistical questions',
          'Escalate data privacy concerns',
          'Escalate integration technical issues'
        ]
      }
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  }
]

export const mockCallSessions: CallSession[] = [
  {
    id: '1',
    userId: 'user-1',
    startTime: new Date('2024-01-24T14:30:00'),
    endTime: new Date('2024-01-24T14:45:00'),
    duration: 15,
    status: 'ended',
    transcript: [
      {
        timestamp: new Date('2024-01-24T14:30:05'),
        speaker: 'user',
        text: 'Hi, I need help with setting up a new lead in the system.'
      },
      {
        timestamp: new Date('2024-01-24T14:30:10'),
        speaker: 'assistant',
        text: 'I\'d be happy to help you set up a new lead. Let me guide you through the process step by step.'
      },
      {
        timestamp: new Date('2024-01-24T14:30:15'),
        speaker: 'user',
        text: 'Great, the company is called TechFlow Solutions and they\'re interested in our enterprise package.'
      },
      {
        timestamp: new Date('2024-01-24T14:30:20'),
        speaker: 'assistant',
        text: 'Perfect. I\'ll help you create that lead. What\'s the contact person\'s name and email address?'
      }
    ],
    summary: 'User needed assistance creating a new lead for TechFlow Solutions interested in enterprise package.',
    actionItems: [
      'Create lead for TechFlow Solutions',
      'Set up follow-up meeting',
      'Send enterprise package information'
    ],
    quality: {
      audioQuality: 'excellent',
      connectionStability: 98
    }
  },
  {
    id: '2',
    userId: 'user-2',
    startTime: new Date('2024-01-24T15:00:00'),
    status: 'active',
    transcript: [
      {
        timestamp: new Date('2024-01-24T15:00:05'),
        speaker: 'user',
        text: 'I\'m having trouble with the kanban board not updating properly.'
      },
      {
        timestamp: new Date('2024-01-24T15:00:10'),
        speaker: 'assistant',
        text: 'I understand you\'re experiencing issues with the kanban board updates. Let me help you troubleshoot this.'
      }
    ],
    quality: {
      audioQuality: 'good',
      connectionStability: 95
    }
  }
]

export const mockCustomAgentRequests: CustomAgentRequest[] = [
  {
    id: '1',
    userId: 'user-1',
    title: 'Real Estate Lead Qualifier',
    description: 'Need an agent specialized in real estate lead qualification and property matching',
    requirements: [
      'Property database integration',
      'Lead scoring based on budget and preferences',
      'Automated property recommendations',
      'Market analysis capabilities'
    ],
    businessUseCase: 'Our real estate team needs an AI agent that can qualify incoming leads, match them with suitable properties, and provide market insights to improve conversion rates.',
    expectedCapabilities: [
      'Property matching algorithm',
      'Budget qualification',
      'Market trend analysis',
      'Automated follow-up sequences'
    ],
    integrationNeeds: [
      'MLS database connection',
      'CRM integration',
      'Email marketing platform',
      'Calendar scheduling system'
    ],
    status: 'in-review',
    priority: 'high',
    estimatedDelivery: new Date('2024-02-15'),
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-23')
  },
  {
    id: '2',
    userId: 'user-3',
    title: 'E-commerce Support Specialist',
    description: 'Customer service agent for e-commerce platform with order management capabilities',
    requirements: [
      'Order tracking and updates',
      'Return and refund processing',
      'Product recommendations',
      'Inventory status checking'
    ],
    businessUseCase: 'Handle customer inquiries for our e-commerce platform, including order status, returns, and product questions.',
    expectedCapabilities: [
      'Order management system integration',
      'Automated return processing',
      'Product catalog knowledge',
      'Shipping carrier integration'
    ],
    integrationNeeds: [
      'Shopify/WooCommerce integration',
      'Shipping carrier APIs',
      'Payment processor connection',
      'Inventory management system'
    ],
    status: 'approved',
    priority: 'medium',
    estimatedDelivery: new Date('2024-02-28'),
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-24')
  },
  {
    id: '3',
    userId: 'user-2',
    title: 'Healthcare Appointment Scheduler',
    description: 'Specialized agent for healthcare appointment scheduling and patient communication',
    requirements: [
      'HIPAA compliance',
      'Multi-provider scheduling',
      'Insurance verification',
      'Appointment reminders'
    ],
    businessUseCase: 'Automate appointment scheduling for our medical practice while maintaining HIPAA compliance.',
    expectedCapabilities: [
      'Calendar management',
      'Insurance verification',
      'Patient communication',
      'Medical terminology understanding'
    ],
    integrationNeeds: [
      'EMR system integration',
      'Insurance verification APIs',
      'SMS/Email platforms',
      'Calendar systems'
    ],
    status: 'pending',
    priority: 'urgent',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  }
]