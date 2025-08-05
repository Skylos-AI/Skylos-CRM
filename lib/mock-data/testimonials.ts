export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  metrics?: {
    improvement: string
    timeframe: string
    category: string
  }
  featured?: boolean
}

export interface CaseStudy {
  id: string
  company: string
  industry: string
  logo: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    improvement: string
  }[]
  testimonial: Testimonial
  featured?: boolean
}

export interface SuccessMetric {
  id: string
  label: string
  value: string
  description: string
  icon: string
  trend: 'up' | 'down' | 'stable'
  category: 'efficiency' | 'cost' | 'satisfaction' | 'growth'
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'TechFlow Solutions',
    avatar: '/testimonials/sarah-chen.jpg',
    content: 'The conversational AI agent transformed our customer support. We went from 4-hour response times to instant, intelligent responses that actually solve problems. Our customer satisfaction scores jumped 40% in just 3 months.',
    rating: 5,
    metrics: {
      improvement: '40% increase in customer satisfaction',
      timeframe: '3 months',
      category: 'Customer Support'
    },
    featured: true
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'CEO',
    company: 'GrowthLab Inc',
    avatar: '/testimonials/marcus-rodriguez.jpg',
    content: 'What impressed me most was how quickly we saw ROI. The agent handles 80% of our lead qualification automatically, freeing up our sales team to focus on closing deals. Revenue per rep increased by 60%.',
    rating: 5,
    metrics: {
      improvement: '60% increase in revenue per rep',
      timeframe: '2 months',
      category: 'Sales'
    },
    featured: true
  },
  {
    id: '3',
    name: 'Jennifer Walsh',
    role: 'Head of Customer Success',
    company: 'CloudScale Systems',
    avatar: '/testimonials/jennifer-walsh.jpg',
    content: 'The implementation was seamless. In just 2 weeks, we had a fully customized agent that understood our complex product suite. It now handles technical inquiries that used to require our senior engineers.',
    rating: 5,
    metrics: {
      improvement: '70% reduction in engineering support tickets',
      timeframe: '2 weeks implementation',
      category: 'Technical Support'
    }
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Operations Director',
    company: 'RetailMax',
    avatar: '/testimonials/david-kim.jpg',
    content: 'The cost savings are incredible. We eliminated the need for a night shift support team while actually improving response quality. The agent never sleeps and never has a bad day.',
    rating: 5,
    metrics: {
      improvement: '$180K annual savings',
      timeframe: '6 months',
      category: 'Operations'
    }
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Customer Experience Manager',
    company: 'ServicePro',
    avatar: '/testimonials/lisa-thompson.jpg',
    content: 'Our customers love the instant, accurate responses. The agent understands context and can handle complex multi-step processes. It feels like talking to our best human agent, but available 24/7.',
    rating: 5,
    metrics: {
      improvement: '95% customer satisfaction rate',
      timeframe: '4 months',
      category: 'Customer Experience'
    }
  },
  {
    id: '6',
    name: 'Robert Chang',
    role: 'CTO',
    company: 'InnovateTech',
    avatar: '/testimonials/robert-chang.jpg',
    content: 'The technical integration was flawless. The agent connects with all our systems and maintains perfect data consistency. Our developers were amazed at how well it understood our API documentation.',
    rating: 5,
    metrics: {
      improvement: '99.9% system uptime',
      timeframe: '1 month',
      category: 'Technical Integration'
    }
  }
]

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    company: 'TechFlow Solutions',
    industry: 'Software Development',
    logo: '/case-studies/techflow-logo.svg',
    challenge: 'Customer support team overwhelmed with 500+ daily tickets, 4-hour average response time, declining satisfaction scores',
    solution: 'Deployed conversational AI agent trained on product documentation, integrated with ticketing system and knowledge base',
    results: [
      {
        metric: 'Response Time',
        value: '< 30 seconds',
        improvement: '87% faster'
      },
      {
        metric: 'Resolution Rate',
        value: '85%',
        improvement: 'First contact'
      },
      {
        metric: 'Customer Satisfaction',
        value: '4.8/5',
        improvement: '+40%'
      },
      {
        metric: 'Support Costs',
        value: '$120K saved',
        improvement: 'Annually'
      }
    ],
    testimonial: testimonials[0],
    featured: true
  },
  {
    id: '2',
    company: 'GrowthLab Inc',
    industry: 'Marketing Agency',
    logo: '/case-studies/growthlab-logo.svg',
    challenge: 'Sales team spending 60% of time on lead qualification, missing opportunities due to slow response times',
    solution: 'Implemented AI agent for lead qualification, appointment scheduling, and initial needs assessment',
    results: [
      {
        metric: 'Lead Response Time',
        value: '< 2 minutes',
        improvement: '95% faster'
      },
      {
        metric: 'Qualified Leads',
        value: '3x increase',
        improvement: 'Monthly'
      },
      {
        metric: 'Revenue per Rep',
        value: '+60%',
        improvement: 'Quarterly'
      },
      {
        metric: 'Conversion Rate',
        value: '28%',
        improvement: '+12%'
      }
    ],
    testimonial: testimonials[1],
    featured: true
  },
  {
    id: '3',
    company: 'CloudScale Systems',
    industry: 'Cloud Infrastructure',
    logo: '/case-studies/cloudscale-logo.svg',
    challenge: 'Complex technical support requiring senior engineers, high escalation rates, knowledge silos',
    solution: 'Built specialized technical AI agent with deep product knowledge and troubleshooting capabilities',
    results: [
      {
        metric: 'Escalation Rate',
        value: '15%',
        improvement: '-70%'
      },
      {
        metric: 'Resolution Time',
        value: '12 minutes',
        improvement: 'Average'
      },
      {
        metric: 'Engineer Productivity',
        value: '+45%',
        improvement: 'Focus on complex issues'
      },
      {
        metric: 'Knowledge Retention',
        value: '100%',
        improvement: 'No knowledge loss'
      }
    ],
    testimonial: testimonials[2]
  }
]

export const successMetrics: SuccessMetric[] = [
  {
    id: '1',
    label: 'Average Response Time',
    value: '< 30 seconds',
    description: 'From hours to seconds across all implementations',
    icon: 'clock',
    trend: 'up',
    category: 'efficiency'
  },
  {
    id: '2',
    label: 'Cost Reduction',
    value: '65%',
    description: 'Average operational cost savings',
    icon: 'trending-down',
    trend: 'up',
    category: 'cost'
  },
  {
    id: '3',
    label: 'Customer Satisfaction',
    value: '4.7/5',
    description: 'Average rating across all deployments',
    icon: 'star',
    trend: 'up',
    category: 'satisfaction'
  },
  {
    id: '4',
    label: 'Revenue Impact',
    value: '+42%',
    description: 'Average revenue increase per sales rep',
    icon: 'trending-up',
    trend: 'up',
    category: 'growth'
  },
  {
    id: '5',
    label: 'Implementation Time',
    value: '2 weeks',
    description: 'Average time from start to full deployment',
    icon: 'zap',
    trend: 'up',
    category: 'efficiency'
  },
  {
    id: '6',
    label: 'Client Retention',
    value: '98%',
    description: 'Clients who continue after first year',
    icon: 'users',
    trend: 'up',
    category: 'satisfaction'
  }
]

export const industryAdoption = [
  {
    industry: 'Technology',
    adoptionRate: 78,
    companies: 1200,
    avgROI: '340%'
  },
  {
    industry: 'Healthcare',
    adoptionRate: 65,
    companies: 890,
    avgROI: '280%'
  },
  {
    industry: 'Financial Services',
    adoptionRate: 72,
    companies: 650,
    avgROI: '420%'
  },
  {
    industry: 'Retail',
    adoptionRate: 58,
    companies: 1500,
    avgROI: '250%'
  },
  {
    industry: 'Manufacturing',
    adoptionRate: 45,
    companies: 780,
    avgROI: '310%'
  }
]