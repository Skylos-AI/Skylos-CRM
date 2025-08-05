import { ComparisonFeature, Competitor, CostComparison, SecurityFeature, ToolIntegration } from '@/lib/types/competitive-matrix'

export const competitors: Competitor[] = [
  {
    id: 'chatgpt-enterprise',
    name: 'ChatGPT Enterprise',
    color: '#10a37f'
  },
  {
    id: 'microsoft-copilot',
    name: 'Microsoft Copilot',
    color: '#0078d4'
  },
  {
    id: 'google-bard',
    name: 'Google Bard',
    color: '#4285f4'
  },
  {
    id: 'anthropic-claude',
    name: 'Anthropic Claude',
    color: '#d97706'
  }
]

export const comparisonFeatures: ComparisonFeature[] = [
  // Cost & Pricing
  {
    id: 'setup-cost',
    name: 'Setup Cost',
    description: 'Initial implementation and configuration fees',
    ourSolution: '$2,500 - $5,000',
    competitors: {
      'chatgpt-enterprise': '$25,000+',
      'microsoft-copilot': '$15,000+',
      'google-bard': '$20,000+',
      'anthropic-claude': '$18,000+'
    },
    isHighlight: true,
    category: 'cost'
  },
  {
    id: 'monthly-maintenance',
    name: 'Monthly Maintenance',
    description: 'Ongoing support, updates, and optimization costs',
    ourSolution: '$500 - $1,200/month',
    competitors: {
      'chatgpt-enterprise': '$3,000+/month',
      'microsoft-copilot': '$2,500+/month',
      'google-bard': '$2,800+/month',
      'anthropic-claude': '$2,200+/month'
    },
    isHighlight: true,
    category: 'cost'
  },
  {
    id: 'scaling-costs',
    name: 'Scaling Costs',
    description: 'Additional costs when expanding to more users or features',
    ourSolution: 'Linear scaling',
    competitors: {
      'chatgpt-enterprise': 'Exponential scaling',
      'microsoft-copilot': 'Tier-based scaling',
      'google-bard': 'Usage-based scaling',
      'anthropic-claude': 'Volume-based scaling'
    },
    isHighlight: false,
    category: 'cost'
  },

  // Security Features
  {
    id: 'data-privacy',
    name: 'Data Privacy',
    description: 'How customer data is handled and protected',
    ourSolution: 'On-premise deployment available',
    competitors: {
      'chatgpt-enterprise': 'Cloud-only with encryption',
      'microsoft-copilot': 'Microsoft cloud integration',
      'google-bard': 'Google cloud infrastructure',
      'anthropic-claude': 'Cloud-based with privacy controls'
    },
    isHighlight: true,
    category: 'security'
  },
  {
    id: 'compliance',
    name: 'Compliance Standards',
    description: 'Industry compliance certifications and standards',
    ourSolution: 'GDPR, HIPAA, SOC2, ISO 27001',
    competitors: {
      'chatgpt-enterprise': 'SOC2, limited HIPAA',
      'microsoft-copilot': 'Microsoft compliance suite',
      'google-bard': 'Google Cloud compliance',
      'anthropic-claude': 'SOC2, working on others'
    },
    isHighlight: true,
    category: 'security'
  },
  {
    id: 'audit-trail',
    name: 'Audit Trail',
    description: 'Comprehensive logging and audit capabilities',
    ourSolution: true,
    competitors: {
      'chatgpt-enterprise': true,
      'microsoft-copilot': 'Limited',
      'google-bard': 'Basic logging',
      'anthropic-claude': true
    },
    isHighlight: false,
    category: 'security'
  },

  // Features
  {
    id: 'customization',
    name: 'Full Customization',
    description: 'Ability to fully customize AI behavior and responses',
    ourSolution: true,
    competitors: {
      'chatgpt-enterprise': 'Limited customization',
      'microsoft-copilot': 'Template-based',
      'google-bard': 'Basic customization',
      'anthropic-claude': 'Moderate customization'
    },
    isHighlight: true,
    category: 'features'
  },
  {
    id: 'multi-language',
    name: 'Multi-language Support',
    description: 'Native support for multiple languages',
    ourSolution: '50+ languages',
    competitors: {
      'chatgpt-enterprise': '95+ languages',
      'microsoft-copilot': '100+ languages',
      'google-bard': '40+ languages',
      'anthropic-claude': '95+ languages'
    },
    isHighlight: false,
    category: 'features'
  },
  {
    id: 'industry-specific',
    name: 'Industry-Specific Training',
    description: 'Pre-trained models for specific industries',
    ourSolution: true,
    competitors: {
      'chatgpt-enterprise': false,
      'microsoft-copilot': 'Limited',
      'google-bard': false,
      'anthropic-claude': 'Limited'
    },
    isHighlight: true,
    category: 'features'
  },

  // Support
  {
    id: 'implementation-time',
    name: 'Implementation Time',
    description: 'Time from contract to fully functional system',
    ourSolution: '1-2 weeks',
    competitors: {
      'chatgpt-enterprise': '8-12 weeks',
      'microsoft-copilot': '6-10 weeks',
      'google-bard': '10-16 weeks',
      'anthropic-claude': '8-14 weeks'
    },
    isHighlight: true,
    category: 'support'
  },
  {
    id: 'dedicated-support',
    name: 'Dedicated Support Team',
    description: 'Access to dedicated technical support specialists',
    ourSolution: true,
    competitors: {
      'chatgpt-enterprise': 'Enterprise tier only',
      'microsoft-copilot': 'Premium plans',
      'google-bard': 'Limited availability',
      'anthropic-claude': 'Enterprise tier only'
    },
    isHighlight: true,
    category: 'support'
  },
  {
    id: 'sla-guarantee',
    name: 'SLA Guarantee',
    description: 'Service level agreement with uptime guarantees',
    ourSolution: '99.9% uptime SLA',
    competitors: {
      'chatgpt-enterprise': '99.5% uptime',
      'microsoft-copilot': '99.9% uptime',
      'google-bard': '99.5% uptime',
      'anthropic-claude': '99.5% uptime'
    },
    isHighlight: false,
    category: 'support'
  },

  // Integration
  {
    id: 'api-integrations',
    name: 'API Integrations',
    description: 'Number of pre-built API integrations available',
    ourSolution: '200+ integrations',
    competitors: {
      'chatgpt-enterprise': '50+ integrations',
      'microsoft-copilot': '100+ integrations',
      'google-bard': '30+ integrations',
      'anthropic-claude': '40+ integrations'
    },
    isHighlight: true,
    category: 'integration'
  },
  {
    id: 'crm-integration',
    name: 'CRM Integration',
    description: 'Native integration with popular CRM systems',
    ourSolution: true,
    competitors: {
      'chatgpt-enterprise': 'Limited',
      'microsoft-copilot': true,
      'google-bard': false,
      'anthropic-claude': 'Limited'
    },
    isHighlight: true,
    category: 'integration'
  },
  {
    id: 'webhook-support',
    name: 'Webhook Support',
    description: 'Real-time webhook notifications and triggers',
    ourSolution: true,
    competitors: {
      'chatgpt-enterprise': true,
      'microsoft-copilot': 'Limited',
      'google-bard': false,
      'anthropic-claude': true
    },
    isHighlight: false,
    category: 'integration'
  }
]

export const costComparison: CostComparison = {
  setup: {
    'our-solution': 3750,
    'chatgpt-enterprise': 25000,
    'microsoft-copilot': 15000,
    'google-bard': 20000,
    'anthropic-claude': 18000
  },
  monthly: {
    'our-solution': 850,
    'chatgpt-enterprise': 3000,
    'microsoft-copilot': 2500,
    'google-bard': 2800,
    'anthropic-claude': 2200
  },
  maintenance: {
    'our-solution': 850,
    'chatgpt-enterprise': 3000,
    'microsoft-copilot': 2500,
    'google-bard': 2800,
    'anthropic-claude': 2200
  },
  scaling: {
    'our-solution': 'Linear - predictable costs',
    'chatgpt-enterprise': 'Exponential - costs increase rapidly',
    'microsoft-copilot': 'Tier-based - sudden cost jumps',
    'google-bard': 'Usage-based - unpredictable',
    'anthropic-claude': 'Volume-based - complex pricing'
  }
}

export const securityFeatures: SecurityFeature[] = [
  {
    name: 'Data Encryption',
    description: 'End-to-end encryption for all data transmission and storage',
    compliance: ['AES-256', 'TLS 1.3'],
    ourImplementation: 'Military-grade encryption with customer-controlled keys',
    competitorSupport: {
      'chatgpt-enterprise': true,
      'microsoft-copilot': true,
      'google-bard': true,
      'anthropic-claude': true
    }
  },
  {
    name: 'On-Premise Deployment',
    description: 'Ability to deploy the solution on customer premises',
    compliance: ['Data Sovereignty', 'Air-gapped Networks'],
    ourImplementation: 'Full on-premise deployment with local data processing',
    competitorSupport: {
      'chatgpt-enterprise': false,
      'microsoft-copilot': false,
      'google-bard': false,
      'anthropic-claude': false
    }
  },
  {
    name: 'HIPAA Compliance',
    description: 'Healthcare data protection compliance',
    compliance: ['HIPAA', 'HITECH'],
    ourImplementation: 'Full HIPAA compliance with BAA available',
    competitorSupport: {
      'chatgpt-enterprise': false,
      'microsoft-copilot': true,
      'google-bard': false,
      'anthropic-claude': false
    }
  }
]

export const toolIntegrations: ToolIntegration[] = [
  {
    category: 'CRM Systems',
    tools: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho', 'Microsoft Dynamics'],
    ourSupport: 15,
    competitorSupport: {
      'chatgpt-enterprise': 5,
      'microsoft-copilot': 12,
      'google-bard': 3,
      'anthropic-claude': 4
    }
  },
  {
    category: 'Communication',
    tools: ['Slack', 'Microsoft Teams', 'Discord', 'Telegram', 'WhatsApp'],
    ourSupport: 25,
    competitorSupport: {
      'chatgpt-enterprise': 8,
      'microsoft-copilot': 15,
      'google-bard': 5,
      'anthropic-claude': 6
    }
  },
  {
    category: 'E-commerce',
    tools: ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Stripe'],
    ourSupport: 20,
    competitorSupport: {
      'chatgpt-enterprise': 3,
      'microsoft-copilot': 8,
      'google-bard': 2,
      'anthropic-claude': 3
    }
  },
  {
    category: 'Analytics',
    tools: ['Google Analytics', 'Mixpanel', 'Amplitude', 'Segment', 'Hotjar'],
    ourSupport: 12,
    competitorSupport: {
      'chatgpt-enterprise': 4,
      'microsoft-copilot': 8,
      'google-bard': 6,
      'anthropic-claude': 3
    }
  }
]

export const highlightedFeatures = [
  'setup-cost',
  'monthly-maintenance',
  'data-privacy',
  'compliance',
  'customization',
  'industry-specific',
  'implementation-time',
  'dedicated-support',
  'api-integrations',
  'crm-integration'
]