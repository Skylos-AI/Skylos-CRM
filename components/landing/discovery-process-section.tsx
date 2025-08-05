"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollTriggeredSection } from '@/components/animations/scroll-triggered-section'
import { StaggerContainer } from '@/components/animations/stagger-container'
import { 
  Search, 
  Target, 
  Cog, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  Users,
  TrendingUp,
  Lightbulb
} from 'lucide-react'

const discoverySteps = [
  {
    id: 'pain-identification',
    icon: Search,
    title: 'Pain Point Identification',
    description: 'We conduct deep-dive interviews with your team to identify specific bottlenecks, inefficiencies, and challenges that impact your business operations.',
    duration: '1-2 days',
    deliverables: [
      'Comprehensive pain point analysis',
      'Impact assessment and prioritization',
      'Current process documentation',
      'Stakeholder interview summaries'
    ],
    keyActivities: [
      'Stakeholder interviews across departments',
      'Process observation and documentation',
      'Data analysis of current performance metrics',
      'Identification of automation opportunities'
    ]
  },
  {
    id: 'solution-mapping',
    icon: Target,
    title: 'Solution Mapping',
    description: 'We map each identified pain point to specific AI agent capabilities, ensuring every solution directly addresses your core business challenges.',
    duration: '2-3 days',
    deliverables: [
      'Pain point to solution mapping',
      'Technical requirements specification',
      'Integration architecture plan',
      'Success metrics definition'
    ],
    keyActivities: [
      'Solution architecture design',
      'Integration point identification',
      'Success criteria establishment',
      'Risk assessment and mitigation planning'
    ]
  },
  {
    id: 'agent-design',
    icon: Cog,
    title: 'Custom Agent Design',
    description: 'We design AI agents specifically tailored to solve your pain points, with personalities, capabilities, and workflows that fit your business culture.',
    duration: '3-5 days',
    deliverables: [
      'Custom agent specifications',
      'Conversation flow designs',
      'Integration blueprints',
      'Testing and validation plans'
    ],
    keyActivities: [
      'Agent personality and tone definition',
      'Conversation flow mapping',
      'Integration development',
      'Quality assurance testing'
    ]
  },
  {
    id: 'deployment-optimization',
    icon: CheckCircle,
    title: 'Deployment & Optimization',
    description: 'We deploy your custom agents and continuously optimize their performance based on real-world usage and feedback from your team.',
    duration: '1-2 days',
    deliverables: [
      'Fully deployed AI agents',
      'Performance monitoring dashboard',
      'Training materials for your team',
      'Ongoing optimization plan'
    ],
    keyActivities: [
      'Production deployment',
      'Performance monitoring setup',
      'Team training and onboarding',
      'Continuous improvement implementation'
    ]
  }
]

const painPointCategories = [
  {
    category: 'Customer Service',
    icon: '🎧',
    commonIssues: [
      'Long response times affecting customer satisfaction',
      'Repetitive inquiries consuming agent time',
      'Inconsistent service quality across team members',
      'Limited after-hours support coverage',
      'Inefficient escalation processes'
    ],
    businessImpact: 'Customer churn, reduced satisfaction, increased operational costs'
  },
  {
    category: 'Sales Operations',
    icon: '💼',
    commonIssues: [
      'Lead qualification bottlenecks slowing conversions',
      'Inconsistent follow-up processes losing prospects',
      'Poor lead nurturing reducing conversion rates',
      'Manual demo scheduling creating friction',
      'Inconsistent sales messaging confusing prospects'
    ],
    businessImpact: 'Lost revenue, longer sales cycles, reduced team productivity'
  },
  {
    category: 'Business Operations',
    icon: '⚙️',
    commonIssues: [
      'Manual data entry consuming valuable time',
      'Process inefficiencies creating bottlenecks',
      'Communication gaps between departments',
      'Inventory tracking and management issues',
      'Compliance monitoring and documentation burden'
    ],
    businessImpact: 'Reduced efficiency, increased errors, higher operational costs'
  }
]

export function DiscoveryProcessSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Our Discovery Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pain Points Drive Everything We Build
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We don't build generic solutions. Our discovery process ensures every AI agent 
              is designed around your specific business challenges, creating targeted solutions 
              that deliver measurable results from day one.
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Discovery Process Steps */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.2}>
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">
              How We Identify and Solve Your Pain Points
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {discoverySteps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-xl">{step.title}</CardTitle>
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {step.duration}
                              </Badge>
                            </div>
                            <CardDescription className="text-base">
                              {step.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h5 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Key Deliverables
                          </h5>
                          <ul className="space-y-1">
                            {step.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <ArrowRight className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 flex items-center gap-2">
                            <Cog className="w-4 h-4 text-blue-600" />
                            Key Activities
                          </h5>
                          <ul className="space-y-1">
                            {step.keyActivities.map((activity, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <ArrowRight className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Pain Point Categories */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.4}>
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">
              Common Pain Points We Address
            </h3>
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {painPointCategories.map((category, index) => (
                <motion.div key={category.category}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{category.icon}</span>
                        <CardTitle className="text-xl">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-3 text-red-600 dark:text-red-400">
                          Common Issues:
                        </h5>
                        <ul className="space-y-2">
                          {category.commonIssues.map((issue, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t">
                        <h5 className="font-semibold mb-2 text-orange-600 dark:text-orange-400 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Business Impact:
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {category.businessImpact}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </ScrollTriggeredSection>

        {/* Why Pain-Point-Driven Approach Works */}
        <ScrollTriggeredSection animationType="fadeIn" delay={0.6}>
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  Why Our Pain-Point-Driven Approach Works
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Generic AI solutions fail because they don't address your specific challenges. 
                  Our approach ensures every feature, every interaction, and every capability 
                  directly targets your most critical business pain points.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Targeted Solutions</h4>
                  <p className="text-sm text-muted-foreground">
                    Every agent capability directly addresses a specific business challenge
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Measurable Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    Clear metrics tied to pain point resolution show real business value
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Team Adoption</h4>
                  <p className="text-sm text-muted-foreground">
                    Solutions that solve real problems get embraced by teams immediately
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="mr-4">
                  Start Your Discovery Process
                </Button>
                <Button variant="outline" size="lg">
                  See Discovery Examples
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollTriggeredSection>
      </div>
    </section>
  )
}