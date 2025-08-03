import { Campaign, DiffusionList, FollowUpMessage, CampaignAnalytics } from '@/lib/types/campaign'
import { MediaAsset } from '@/lib/types/media'

export const mockMediaAssets: MediaAsset[] = [
  {
    id: 'media-1',
    name: 'product-demo-video.mp4',
    type: 'video',
    url: '/media/product-demo-video.mp4',
    thumbnailUrl: '/media/thumbnails/product-demo-video.jpg',
    fileSize: 15728640, // 15MB
    mimeType: 'video/mp4',
    dimensions: { width: 1920, height: 1080 },
    duration: 120, // 2 minutes
    metadata: {
      codec: 'h264',
      bitrate: '1000kbps'
    },
    tags: ['product', 'demo', 'onboarding'],
    createdBy: 'user-1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'media-2',
    name: 'company-logo.png',
    type: 'image',
    url: '/media/company-logo.png',
    thumbnailUrl: '/media/thumbnails/company-logo.png',
    fileSize: 524288, // 512KB
    mimeType: 'image/png',
    dimensions: { width: 500, height: 200 },
    metadata: {
      hasTransparency: true
    },
    tags: ['logo', 'branding'],
    createdBy: 'user-1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'media-3',
    name: 'pricing-guide.pdf',
    type: 'document',
    url: '/media/pricing-guide.pdf',
    thumbnailUrl: '/media/thumbnails/pricing-guide.jpg',
    fileSize: 2097152, // 2MB
    mimeType: 'application/pdf',
    metadata: {
      pages: 8,
      author: 'Marketing Team'
    },
    tags: ['pricing', 'sales', 'guide'],
    createdBy: 'user-2',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  }
]

export const mockDiffusionLists: DiffusionList[] = [
  {
    id: 'list-1',
    name: 'High-Value Prospects',
    description: 'Leads with deal amounts over $10,000',
    type: 'dynamic',
    criteria: {
      filters: [
        {
          id: 'filter-1',
          field: 'dealAmount',
          operator: 'greater_than',
          value: 10000,
          logic: 'and'
        },
        {
          id: 'filter-2',
          field: 'stage',
          operator: 'in',
          value: ['incoming', 'decision'],
          logic: 'and'
        }
      ],
      sorting: [
        {
          field: 'dealAmount',
          direction: 'desc'
        }
      ]
    },
    leads: [],
    statistics: {
      totalLeads: 45,
      activeLeads: 38,
      engagementRate: 0.72,
      conversionRate: 0.28,
      averageDealValue: 15750,
      lastCampaignDate: new Date('2024-01-20')
    },
    createdBy: 'user-1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20'),
    lastRefreshed: new Date('2024-01-20')
  },
  {
    id: 'list-2',
    name: 'Social Media Leads',
    description: 'Leads from social media platforms',
    type: 'dynamic',
    criteria: {
      filters: [
        {
          id: 'filter-3',
          field: 'source',
          operator: 'in',
          value: ['facebook', 'instagram', 'linkedin', 'twitter'],
          logic: 'and'
        }
      ],
      sorting: [
        {
          field: 'createdAt',
          direction: 'desc'
        }
      ]
    },
    leads: [],
    statistics: {
      totalLeads: 128,
      activeLeads: 95,
      engagementRate: 0.65,
      conversionRate: 0.18,
      averageDealValue: 8500,
      lastCampaignDate: new Date('2024-01-18')
    },
    createdBy: 'user-2',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-18'),
    lastRefreshed: new Date('2024-01-18')
  },
  {
    id: 'list-3',
    name: 'VIP Customers',
    description: 'Manually selected VIP customers for exclusive campaigns',
    type: 'static',
    criteria: {
      filters: [],
      sorting: []
    },
    leads: ['lead-1', 'lead-3', 'lead-7', 'lead-12'],
    statistics: {
      totalLeads: 4,
      activeLeads: 4,
      engagementRate: 0.95,
      conversionRate: 0.75,
      averageDealValue: 25000,
      lastCampaignDate: new Date('2024-01-15')
    },
    createdBy: 'user-1',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15')
  }
]

export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'Q1 Product Launch',
    description: 'Multi-channel campaign for new product launch',
    type: 'multi-channel',
    status: 'active',
    objectives: [
      {
        id: 'obj-1',
        name: 'Lead Generation',
        description: 'Generate new qualified leads',
        targetValue: 500,
        currentValue: 342,
        unit: 'leads'
      },
      {
        id: 'obj-2',
        name: 'Revenue Target',
        description: 'Generate revenue from campaign',
        targetValue: 100000,
        currentValue: 67500,
        unit: 'USD'
      }
    ],
    targetMetrics: {
      expectedReach: 2500,
      targetOpenRate: 0.25,
      targetClickRate: 0.05,
      targetConversionRate: 0.02,
      budgetLimit: 15000
    },
    diffusionLists: ['list-1', 'list-2'],
    content: {
      templates: [
        {
          id: 'template-1',
          name: 'Product Launch Email',
          type: 'email',
          subject: 'Introducing Our Revolutionary New Product!',
          body: 'Dear {{lead.name}}, we\'re excited to introduce our latest innovation...',
          mediaAttachments: ['media-1', 'media-2'],
          personalizations: ['pers-1'],
          formatting: {
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            textColor: '#333333'
          },
          createdAt: new Date('2024-01-12'),
          updatedAt: new Date('2024-01-15')
        }
      ],
      mediaAssets: mockMediaAssets,
      personalizations: [
        {
          id: 'pers-1',
          token: '{{lead.name}}',
          fieldPath: 'lead.name',
          fallbackValue: 'Valued Customer',
          formatting: 'capitalize'
        }
      ]
    },
    schedule: {
      type: 'scheduled',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-28'),
      timezone: 'America/New_York',
      frequency: 'weekly',
      daysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
      timeOfDay: '10:00'
    },
    analytics: {
      sent: 1850,
      delivered: 1798,
      opened: 449,
      clicked: 89,
      converted: 37,
      bounced: 52,
      unsubscribed: 8,
      openRate: 0.25,
      clickRate: 0.05,
      conversionRate: 0.02,
      roi: 4.5,
      cost: 8500,
      revenue: 38250
    },
    createdBy: 'user-1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'campaign-2',
    name: 'Holiday Promotion',
    description: 'Special holiday discount campaign',
    type: 'email',
    status: 'completed',
    objectives: [
      {
        id: 'obj-3',
        name: 'Sales Boost',
        description: 'Increase sales during holiday season',
        targetValue: 50000,
        currentValue: 62000,
        unit: 'USD'
      }
    ],
    targetMetrics: {
      expectedReach: 1200,
      targetOpenRate: 0.30,
      targetClickRate: 0.08,
      targetConversionRate: 0.05,
      budgetLimit: 5000
    },
    diffusionLists: ['list-3'],
    content: {
      templates: [
        {
          id: 'template-2',
          name: 'Holiday Discount Email',
          type: 'email',
          subject: '🎄 Special Holiday Offer Just for You!',
          body: 'Happy Holidays {{lead.name}}! Enjoy 25% off all products...',
          mediaAttachments: ['media-2'],
          personalizations: ['pers-1'],
          formatting: {
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            textColor: '#2c5530'
          },
          createdAt: new Date('2023-12-01'),
          updatedAt: new Date('2023-12-01')
        }
      ],
      mediaAssets: [mockMediaAssets[1]],
      personalizations: [
        {
          id: 'pers-1',
          token: '{{lead.name}}',
          fieldPath: 'lead.name',
          fallbackValue: 'Valued Customer',
          formatting: 'capitalize'
        }
      ]
    },
    schedule: {
      type: 'scheduled',
      startDate: new Date('2023-12-15'),
      endDate: new Date('2023-12-31'),
      timezone: 'America/New_York',
      frequency: 'daily',
      timeOfDay: '09:00'
    },
    analytics: {
      sent: 1200,
      delivered: 1176,
      opened: 353,
      clicked: 94,
      converted: 59,
      bounced: 24,
      unsubscribed: 3,
      openRate: 0.30,
      clickRate: 0.08,
      conversionRate: 0.05,
      roi: 12.4,
      cost: 3200,
      revenue: 39680
    },
    createdBy: 'user-2',
    createdAt: new Date('2023-11-28'),
    updatedAt: new Date('2024-01-05')
  }
]

export const mockFollowUpMessages: FollowUpMessage[] = [
  {
    id: 'followup-1',
    leadId: 'lead-1',
    campaignId: 'campaign-1',
    type: 'email',
    content: {
      subject: 'Follow-up: Product Demo Invitation',
      body: 'Hi {{lead.name}}, I wanted to follow up on our product launch announcement...',
      mediaAttachments: [mockMediaAssets[0]],
      personalizations: [
        {
          id: 'pers-1',
          token: '{{lead.name}}',
          fieldPath: 'lead.name',
          fallbackValue: 'there',
          formatting: 'capitalize'
        }
      ],
      formatting: {
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        textColor: '#333333'
      }
    },
    scheduledDate: new Date('2024-02-05T10:00:00Z'),
    status: 'scheduled',
    createdBy: 'user-1',
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'followup-2',
    leadId: 'lead-2',
    type: 'sms',
    content: {
      body: 'Hi {{lead.name}}, quick reminder about our special offer ending soon!',
      mediaAttachments: [],
      personalizations: [
        {
          id: 'pers-1',
          token: '{{lead.name}}',
          fieldPath: 'lead.name',
          fallbackValue: 'there',
          formatting: 'capitalize'
        }
      ],
      formatting: {}
    },
    scheduledDate: new Date('2024-01-25T14:00:00Z'),
    status: 'sent',
    createdBy: 'user-2',
    createdAt: new Date('2024-01-22'),
    sentAt: new Date('2024-01-25T14:00:00Z'),
    deliveredAt: new Date('2024-01-25T14:01:00Z')
  }
]