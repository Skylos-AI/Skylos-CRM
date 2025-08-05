"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollTriggeredSection } from '@/components/animations/scroll-triggered-section'
import { 
  Headphones, 
  TrendingUp, 
  Settings, 
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3,
  Zap,
  Building2
} from 'lucide-react'

interface DetailedExample {
  id: string
  category: 'customer-service' | 'sales' | 'operations'
  title: string
  icon: any
  businessContext: string
  specificPainPoints: {
    problem: string
    impact: string
    frequency: string
    cost: string
  }[]
  agentSolution: {
    approach: string
    capabilities: string[]
    implementation: string[]
    timeline: string
  }
  realWorldExample: {
    company: string
    industry: string
    situation: string
    deployment: string
    results: {
      metric: string
      before: string
      after: string
      improvement: string
      businessValue: string
    }[]
    testimonial: {
      quote: string
      author: string
      role: string
    }
  }
  discoveryProcess: {
    step: string
    activities: string[]
    outcome: string
  }[]
}

const detailedExamples: DetailedExample[] = [
  {
    id: 'customer-service-transformation',
    category: 'customer-service',
    title: 'Customer Service Transformation',
    icon: Headphones,
    businessContext: 'Customer service teams are overwhelmed with repetitive inquiries, long response times, and inconsistent service quality. These issues directly impact customer satisfaction, retention, and brand reputation while increasing operational costs.',
    specificPainPoints: [
      {
        problem: 'Average response time of 8+ hours during peak periods',
        impact: 'Customer frustration leading to 15% churn rate',
        frequency: '200+ tickets daily with 70% being repetitive',
        cost: '$150,000 annual revenue loss from churned customers'
      },
      {
        problem: 'Inconsistent service quality across different agents',
        impact: 'Customer complaints about varying response quality',
        frequency: '40% of customers report inconsistent experiences',
        cost: '$50,000 annual cost for additional training and quality control'
      },
      {
        problem: 'Limited after-hours support coverage',
        impact: 'Lost opportunities from international customers',
        frequency: '35% of inquiries occur outside business hours',
        cost: '$200,000 potential revenue loss from global markets'
      }
    ],
    agentSolution: {
      approach: 'Deploy conversational AI agents that provide instant, contextual responses with full customer history integration. Agents handle tier-1 support while seamlessly escalating complex issues to human agents.',
      capabilities: [
        'Instant response to customer inquiries (<30 seconds)',
        '24/7 availability across all time zones',
        'Multi-language support with cultural awareness',
        'Complete customer history and context understanding',
        'Intelligent escalation based on complexity and sentiment',
        'Real-time integration with CRM and support systems',
        'Automated ticket creation and routing',
        'Sentiment analysis and mood detection'
      ],
      implementation: [
        'Analyze existing support ticket patterns and categories',
        'Integrate with current helpdesk and CRM systems',
        'Train AI agents on company-specific knowledge base',
        'Set up escalation workflows and human handoff protocols',
        'Implement multi-channel support (chat, email, phone)',
        'Create performance monitoring and analytics dashboard',
        'Train support team on AI collaboration workflows',
        'Establish continuous improvement feedback loops'
      ],
      timeline: '2-3 days for basic deployment, 1 week for full optimization'
    },
    realWorldExample: {
      company: 'TechCorp Solutions',
      industry: 'B2B SaaS Platform',
      situation: 'Growing SaaS company with 50,000+ users experiencing support scalability issues. Support team of 8 agents was overwhelmed with 200+ daily tickets, causing response delays and customer dissatisfaction.',
      deployment: 'Implemented conversational AI agents integrated with Zendesk and Salesforce. Agents handle common inquiries about account management, billing, feature usage, and technical troubleshooting while escalating complex issues to human specialists.',
      results: [
        {
          metric: 'Average Response Time',
          before: '8.5 hours',
          after: '30 seconds',
          improvement: '99.9% faster',
          businessValue: 'Eliminated customer wait time frustration'
        },
        {
          metric: 'Customer Satisfaction Score',
          before: '3.2/5',
          after: '4.8/5',
          improvement: '+50% increase',
          businessValue: 'Improved brand reputation and loyalty'
        },
        {
          metric: 'Ticket Resolution Rate',
          before: '60% first contact',
          after: '85% automated',
          improvement: '+42% efficiency',
          businessValue: 'Support team focuses on complex issues'
        },
        {
          metric: 'Customer Churn Rate',
          before: '15% quarterly',
          after: '9% quarterly',
          improvement: '40% reduction',
          businessValue: '$180,000 annual revenue retention'
        },
        {
          metric: 'Support Costs',
          before: '$25,000/month',
          after: '$15,000/month',
          improvement: '40% reduction',
          businessValue: '$120,000 annual cost savings'
        }
      ],
      testimonial: {
        quote: "The AI agents have completely transformed our customer support. Our customers get instant help, our team focuses on meaningful work, and our satisfaction scores have never been higher. It's been a game-changer for our business.",
        author: "Sarah Johnson",
        role: "Head of Customer Success"
      }
    },
    discoveryProcess: [
      {
        step: 'Pain Point Analysis',
        activities: [
          'Interview support team leads and agents',
          'Analyze support ticket patterns and categories',
          'Review customer satisfaction surveys and feedback',
          'Assess current response times and resolution rates',
          'Identify peak volume periods and bottlenecks'
        ],
        outcome: 'Comprehensive understanding of support challenges and impact on business'
      },
      {
        step: 'Solution Mapping',
        activities: [
          'Map pain points to AI agent capabilities',
          'Design escalation workflows and handoff protocols',
          'Plan integration with existing systems (Zendesk, Salesforce)',
          'Define success metrics and KPIs',
          'Create implementation timeline and milestones'
        ],
        outcome: 'Detailed solution architecture tailored to specific support needs'
      },
      {
        step: 'Agent Customization',
        activities: [
          'Train agents on company knowledge base and policies',
          'Configure multi-channel support capabilities',
          'Set up customer context and history integration',
          'Implement sentiment analysis and escalation triggers',
          'Create performance monitoring and analytics'
        ],
        outcome: 'Fully customized AI agents ready for deployment'
      }
    ]
  },
  {
    id: 'sales-acceleration',
    category: 'sales',
    title: 'Sales Process Acceleration',
    icon: TrendingUp,
    businessContext: 'Sales teams struggle with lead qualification bottlenecks, inconsistent follow-up processes, and manual tasks that prevent focus on high-value activities. This results in longer sales cycles, lower conversion rates, and missed revenue opportunities.',
    specificPainPoints: [
      {
        problem: 'Lead qualification taking 2-3 calls per prospect',
        impact: 'Sales reps spending 40% of time on unqualified leads',
        frequency: '150+ leads monthly with 60% being unqualified',
        cost: '$300,000 annual opportunity cost from inefficient qualification'
      },
      {
        problem: 'Inconsistent follow-up processes across sales team',
        impact: '80% of leads go cold due to delayed or missed follow-ups',
        frequency: 'Only 20% of leads receive proper nurturing sequence',
        cost: '$500,000 annual revenue loss from poor follow-up'
      },
      {
        problem: 'Manual demo scheduling and preparation',
        impact: '30% no-show rate and inconsistent demo quality',
        frequency: '5-8 email exchanges per demo scheduled',
        cost: '$100,000 annual cost in wasted demo preparation time'
      }
    ],
    agentSolution: {
      approach: 'Deploy AI agents that handle lead qualification, automated follow-up sequences, and demo scheduling. Agents use proven frameworks (BANT, MEDDIC) to qualify prospects and maintain consistent nurturing until leads are sales-ready.',
      capabilities: [
        'Intelligent lead scoring and qualification using proven frameworks',
        'Automated follow-up sequences with personalized messaging',
        'Demo scheduling with calendar integration and preparation',
        'CRM integration for complete lead tracking and management',
        'Behavioral analysis and buying signal detection',
        'Personalized content delivery based on prospect profile',
        'Real-time lead routing to appropriate sales reps',
        'Performance analytics and conversion optimization'
      ],
      implementation: [
        'Analyze current lead qualification and sales processes',
        'Integrate with CRM systems (Salesforce, HubSpot, Pipedrive)',
        'Set up lead scoring models and qualification frameworks',
        'Create automated nurturing sequences and content library',
        'Implement demo scheduling and calendar integrations',
        'Configure behavioral tracking and buying signal detection',
        'Train sales team on AI collaboration and handoff processes',
        'Establish performance monitoring and optimization workflows'
      ],
      timeline: '3-5 days for deployment, 1-2 weeks for full optimization'
    },
    realWorldExample: {
      company: 'GrowthTech Solutions',
      industry: 'B2B Marketing Technology',
      situation: 'Fast-growing martech company with 6-person sales team struggling to handle 150+ monthly leads. Qualification process was inconsistent, follow-up was manual, and demo scheduling created friction.',
      deployment: 'Implemented AI agents for lead qualification using BANT framework, automated nurturing sequences, and streamlined demo scheduling. Full integration with Salesforce and marketing automation platform.',
      results: [
        {
          metric: 'Lead Qualification Time',
          before: '45 minutes per lead',
          after: '5 minutes per lead',
          improvement: '89% faster',
          businessValue: 'Sales reps focus on qualified prospects only'
        },
        {
          metric: 'Lead Conversion Rate',
          before: '12% lead to opportunity',
          after: '28% lead to opportunity',
          improvement: '+133% increase',
          businessValue: 'More qualified opportunities in pipeline'
        },
        {
          metric: 'Follow-up Consistency',
          before: '20% of leads',
          after: '100% of leads',
          improvement: '5x improvement',
          businessValue: 'No leads fall through cracks'
        },
        {
          metric: 'Demo Show-up Rate',
          before: '70%',
          after: '85%',
          improvement: '+21% increase',
          businessValue: 'More productive demo time'
        },
        {
          metric: 'Sales Cycle Length',
          before: '45 days average',
          after: '32 days average',
          improvement: '29% shorter',
          businessValue: 'Faster revenue recognition'
        }
      ],
      testimonial: {
        quote: "Our AI agents have transformed our sales process. We're qualifying better leads, following up consistently, and closing deals faster. Our team can finally focus on what they do best - building relationships and closing deals.",
        author: "Mike Rodriguez",
        role: "VP of Sales"
      }
    },
    discoveryProcess: [
      {
        step: 'Sales Process Analysis',
        activities: [
          'Map current lead qualification and sales workflows',
          'Analyze conversion rates at each stage of the funnel',
          'Review CRM data and lead scoring effectiveness',
          'Interview sales team about pain points and bottlenecks',
          'Assess follow-up processes and demo scheduling efficiency'
        ],
        outcome: 'Clear understanding of sales process inefficiencies and opportunities'
      },
      {
        step: 'Solution Architecture',
        activities: [
          'Design lead qualification framework and scoring model',
          'Create automated nurturing sequences and content strategy',
          'Plan CRM integration and data synchronization',
          'Define handoff protocols between AI and human sales reps',
          'Establish success metrics and performance tracking'
        ],
        outcome: 'Comprehensive sales automation solution tailored to business needs'
      },
      {
        step: 'Agent Development',
        activities: [
          'Configure lead qualification agents with BANT/MEDDIC frameworks',
          'Set up automated follow-up and nurturing campaigns',
          'Implement demo scheduling and calendar integration',
          'Create performance dashboards and analytics',
          'Train sales team on new AI-assisted workflows'
        ],
        outcome: 'Fully operational AI sales agents integrated with existing processes'
      }
    ]
  },
  {
    id: 'operations-optimization',
    category: 'operations',
    title: 'Operations Optimization',
    icon: Settings,
    businessContext: 'Operations teams are bogged down by manual data entry, inefficient processes, and communication gaps that slow down business operations. These inefficiencies create bottlenecks, increase costs, and prevent teams from focusing on strategic initiatives.',
    specificPainPoints: [
      {
        problem: 'Manual data entry consuming 4+ hours daily per employee',
        impact: 'High error rates (15%) and delayed processing',
        frequency: '500+ documents processed weekly across departments',
        cost: '$200,000 annual cost in manual processing time'
      },
      {
        problem: 'Process inefficiencies with 12+ manual handoffs',
        impact: 'Workflows taking 3-5 days to complete',
        frequency: '80% of processes have unnecessary manual steps',
        cost: '$150,000 annual opportunity cost from delays'
      },
      {
        problem: 'Communication gaps between departments',
        impact: 'Information silos causing duplicated work and errors',
        frequency: '60% of projects experience communication delays',
        cost: '$100,000 annual cost from rework and inefficiencies'
      }
    ],
    agentSolution: {
      approach: 'Deploy AI agents that automate data processing, optimize workflows, and facilitate cross-departmental communication. Agents handle document processing, workflow routing, and real-time status updates to eliminate bottlenecks.',
      capabilities: [
        'Automated document processing with OCR and data extraction',
        'Intelligent workflow routing and approval management',
        'Real-time process monitoring and bottleneck identification',
        'Cross-system integration and data synchronization',
        'Automated notifications and status updates',
        'Predictive analytics for capacity planning',
        'Compliance monitoring and audit trail creation',
        'Performance analytics and continuous improvement'
      ],
      implementation: [
        'Analyze current operational workflows and pain points',
        'Map data sources and integration requirements',
        'Set up document processing and OCR capabilities',
        'Configure workflow automation and approval routing',
        'Implement cross-system integrations (ERP, CRM, etc.)',
        'Create monitoring dashboards and analytics',
        'Train operations team on new automated processes',
        'Establish continuous improvement and optimization cycles'
      ],
      timeline: '4-7 days for basic automation, 2 weeks for full optimization'
    },
    realWorldExample: {
      company: 'ManufacturingCorp',
      industry: 'Industrial Manufacturing',
      situation: 'Mid-size manufacturer with complex approval processes, manual inventory tracking, and communication gaps between production, quality, and logistics departments causing delays and inefficiencies.',
      deployment: 'Implemented AI agents for automated document processing, workflow optimization, and cross-departmental communication. Full integration with ERP system and production management tools.',
      results: [
        {
          metric: 'Document Processing Time',
          before: '4 hours per employee daily',
          after: '30 minutes per employee daily',
          improvement: '87.5% reduction',
          businessValue: '3.5 hours daily saved per employee'
        },
        {
          metric: 'Process Completion Time',
          before: '3-5 days average',
          after: '1-2 days average',
          improvement: '60% faster',
          businessValue: 'Faster order fulfillment and delivery'
        },
        {
          metric: 'Data Accuracy',
          before: '85% accuracy',
          after: '99.5% accuracy',
          improvement: '+17% improvement',
          businessValue: 'Reduced errors and rework costs'
        },
        {
          metric: 'Cross-Department Communication',
          before: '60% projects delayed',
          after: '10% projects delayed',
          improvement: '83% improvement',
          businessValue: 'Better coordination and efficiency'
        },
        {
          metric: 'Operational Costs',
          before: 'Baseline',
          after: '25% reduction',
          improvement: '$300,000 annual savings',
          businessValue: 'Significant cost reduction and ROI'
        }
      ],
      testimonial: {
        quote: "The AI agents have revolutionized our operations. We've eliminated bottlenecks, reduced errors, and our teams can finally focus on strategic work instead of manual tasks. The efficiency gains have been remarkable.",
        author: "Jennifer Chen",
        role: "Operations Director"
      }
    },
    discoveryProcess: [
      {
        step: 'Operational Assessment',
        activities: [
          'Map current operational workflows and processes',
          'Identify manual tasks and automation opportunities',
          'Analyze data flow and integration requirements',
          'Review communication patterns and pain points',
          'Assess current system landscape and capabilities'
        ],
        outcome: 'Comprehensive understanding of operational inefficiencies and automation potential'
      },
      {
        step: 'Automation Strategy',
        activities: [
          'Prioritize automation opportunities by impact and complexity',
          'Design workflow optimization and routing logic',
          'Plan system integrations and data synchronization',
          'Define performance metrics and success criteria',
          'Create implementation roadmap and timeline'
        ],
        outcome: 'Strategic automation plan tailored to operational needs'
      },
      {
        step: 'Agent Implementation',
        activities: [
          'Configure document processing and data extraction agents',
          'Set up workflow automation and approval routing',
          'Implement cross-system integrations and monitoring',
          'Create performance dashboards and analytics',
          'Train operations team on new automated workflows'
        ],
        outcome: 'Fully operational AI agents optimizing business processes'
      }
    ]
  }
]

export function DetailedIndustryExamples() {
  const [selectedExample, setSelectedExample] = useState<string>(detailedExamples[0].id)
  const [activeTab, setActiveTab] = useState<'overview' | 'solution' | 'results' | 'discovery'>('overview')
  
  const currentExample = detailedExamples.find(ex => ex.id === selectedExample)!

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'customer-service': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'sales': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'operations': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Detailed Industry Examples
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Deep Dive: How AI Agents Solve Real Business Problems
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Explore comprehensive examples of how our AI agents transform specific business 
              functions with detailed pain point analysis, solution implementation, and measurable results.
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Category Selection */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {detailedExamples.map((example) => {
              const IconComponent = example.icon
              return (
                <motion.button
                  key={example.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedExample(example.id)
                    setActiveTab('overview')
                  }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all duration-300 ${
                    selectedExample === example.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                      : 'bg-background hover:bg-muted border-border'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">{example.title}</div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs mt-1 ${getCategoryColor(example.category)}`}
                    >
                      {example.category.replace('-', ' ')}
                    </Badge>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </ScrollTriggeredSection>

        {/* Tab Navigation */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'overview', label: 'Pain Points', icon: AlertTriangle },
              { id: 'solution', label: 'AI Solution', icon: Zap },
              { id: 'results', label: 'Real Results', icon: BarChart3 },
              { id: 'discovery', label: 'Discovery Process', icon: Target }
            ].map((tab) => {
              const IconComponent = tab.icon
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              )
            })}
          </div>
        </ScrollTriggeredSection>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedExample}-${activeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Business Context */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <currentExample.icon className="w-6 h-6 text-primary" />
                      Business Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground">
                      {currentExample.businessContext}
                    </p>
                  </CardContent>
                </Card>

                {/* Specific Pain Points */}
                <div className="grid md:grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Specific Pain Points & Business Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {currentExample.specificPainPoints.map((painPoint, index) => (
                          <div key={index} className="border-l-4 border-red-500 pl-4">
                            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                              {painPoint.problem}
                            </h4>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Impact:</span>
                                <p className="text-muted-foreground">{painPoint.impact}</p>
                              </div>
                              <div>
                                <span className="font-medium">Frequency:</span>
                                <p className="text-muted-foreground">{painPoint.frequency}</p>
                              </div>
                              <div>
                                <span className="font-medium">Cost:</span>
                                <p className="text-muted-foreground font-semibold text-red-600">
                                  {painPoint.cost}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'solution' && (
              <div className="space-y-8">
                {/* Solution Approach */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-6 h-6 text-yellow-600" />
                      AI Agent Solution Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground mb-6">
                      {currentExample.agentSolution.approach}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Implementation Timeline: {currentExample.agentSolution.timeline}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Capabilities & Implementation */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Agent Capabilities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentExample.agentSolution.capabilities.map((capability, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{capability}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-600" />
                        Implementation Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2">
                        {currentExample.agentSolution.implementation.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="space-y-8">
                {/* Company Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-primary" />
                      Real-World Implementation: {currentExample.realWorldExample.company}
                    </CardTitle>
                    <CardDescription>
                      {currentExample.realWorldExample.industry}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Situation</h4>
                      <p className="text-muted-foreground">{currentExample.realWorldExample.situation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Deployment</h4>
                      <p className="text-muted-foreground">{currentExample.realWorldExample.deployment}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                      Measurable Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {currentExample.realWorldExample.results.map((result, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-4">
                          <h5 className="font-semibold text-sm mb-3">{result.metric}</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-red-600">Before: {result.before}</span>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              <span className="text-green-600">After: {result.after}</span>
                            </div>
                            <div className="text-center">
                              <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {result.improvement}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground text-center">
                              {result.businessValue}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6">
                      <blockquote className="text-lg italic mb-4">
                        "{currentExample.realWorldExample.testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{currentExample.realWorldExample.testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{currentExample.realWorldExample.testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'discovery' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-6 h-6 text-purple-600" />
                      Our Discovery Process for This Solution
                    </CardTitle>
                    <CardDescription>
                      How we identified and solved the specific pain points in this case
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {currentExample.discoveryProcess.map((step, index) => (
                        <div key={index} className="relative">
                          {index < currentExample.discoveryProcess.length - 1 && (
                            <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
                          )}
                          <div className="flex gap-4">
                            <div className="bg-purple-100 dark:bg-purple-900/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="font-semibold text-purple-600">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">{step.step}</h4>
                              <div className="mb-3">
                                <h5 className="font-medium text-sm mb-2">Key Activities:</h5>
                                <ul className="space-y-1">
                                  {step.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3">
                                <h5 className="font-medium text-sm text-green-700 dark:text-green-400 mb-1">
                                  Outcome:
                                </h5>
                                <p className="text-sm text-green-600 dark:text-green-300">
                                  {step.outcome}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <ScrollTriggeredSection animationType="fadeIn" delay={0.6}>
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your {currentExample.category.replace('-', ' ')}?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every transformation starts with understanding your specific pain points. 
              Let us analyze your challenges and create custom AI agents that deliver similar results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Start Your Discovery Process
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Download Detailed Case Study
              </Button>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </section>
  )
}