"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollTriggeredSection } from '@/components/animations/scroll-triggered-section'
import { 
  Building2, 
  ShoppingCart, 
  Heart, 
  DollarSign, 
  Truck, 
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react'

interface CaseStudy {
  id: string
  industry: string
  icon: any
  company: string
  companySize: string
  challenge: string
  painPoints: string[]
  solution: string
  implementation: {
    timeline: string
    approach: string[]
    agentTypes: string[]
  }
  results: {
    metric: string
    before: string
    after: string
    improvement: string
  }[]
  testimonial: {
    quote: string
    author: string
    role: string
  }
  tags: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: 'healthcare-clinic',
    industry: 'Healthcare',
    icon: Heart,
    company: 'MedCenter Plus',
    companySize: '150+ employees',
    challenge: 'Patient intake process was consuming 4+ hours daily per staff member, creating bottlenecks and delays in patient care. Manual data entry errors were causing compliance issues.',
    painPoints: [
      'Manual patient data entry taking 4+ hours daily',
      'High error rates in patient records',
      'Delayed patient processing affecting care quality',
      'Compliance documentation burden',
      'Staff burnout from repetitive tasks'
    ],
    solution: 'Deployed AI agents to automate patient intake, insurance verification, and medical record updates across multiple systems.',
    implementation: {
      timeline: '6 days',
      approach: [
        'Analyzed existing patient intake workflows',
        'Identified integration points with EHR systems',
        'Developed HIPAA-compliant AI agents',
        'Implemented automated data validation',
        'Created staff training programs'
      ],
      agentTypes: ['Patient Intake Agent', 'Insurance Verification Agent', 'Records Management Agent']
    },
    results: [
      {
        metric: 'Manual Data Entry',
        before: '4 hours/day per staff',
        after: '24 minutes/day per staff',
        improvement: '90% reduction'
      },
      {
        metric: 'Data Accuracy',
        before: '87%',
        after: '99.5%',
        improvement: '95% improvement'
      },
      {
        metric: 'Patient Processing Time',
        before: '45 minutes',
        after: '18 minutes',
        improvement: '60% faster'
      },
      {
        metric: 'Compliance Issues',
        before: '12 per month',
        after: '0 per month',
        improvement: '100% elimination'
      }
    ],
    testimonial: {
      quote: "The AI agents have transformed our patient intake process. Our staff can now focus on patient care instead of paperwork, and our accuracy has never been better.",
      author: "Dr. Sarah Johnson",
      role: "Chief Medical Officer"
    },
    tags: ['HIPAA Compliant', 'EHR Integration', 'Process Automation', 'Data Accuracy']
  },
  {
    id: 'ecommerce-retailer',
    industry: 'E-commerce',
    icon: ShoppingCart,
    company: 'RetailMax',
    companySize: '75+ employees',
    challenge: 'Customer support team was overwhelmed with repetitive inquiries about products, shipping, and returns. 70% of support time was spent on basic questions that could be automated.',
    painPoints: [
      'Support team overwhelmed with repetitive inquiries',
      '8+ hour response times during peak seasons',
      'Inconsistent product information across channels',
      'High cart abandonment due to unanswered questions',
      'Limited after-hours support affecting global customers'
    ],
    solution: 'Implemented conversational AI agents for customer support, product recommendations, and order management with 24/7 availability.',
    implementation: {
      timeline: '4 days',
      approach: [
        'Analyzed customer inquiry patterns and categories',
        'Integrated with product catalog and order systems',
        'Developed multilingual support capabilities',
        'Created intelligent escalation workflows',
        'Implemented real-time inventory integration'
      ],
      agentTypes: ['Customer Support Agent', 'Product Advisor Agent', 'Order Management Agent']
    },
    results: [
      {
        metric: 'Response Time',
        before: '8+ hours',
        after: '30 seconds',
        improvement: '99.9% faster'
      },
      {
        metric: 'Inquiry Automation',
        before: '0%',
        after: '80%',
        improvement: '80% automated'
      },
      {
        metric: 'Customer Satisfaction',
        before: '3.2/5',
        after: '4.8/5',
        improvement: '50% increase'
      },
      {
        metric: 'Cart Abandonment',
        before: '68%',
        after: '42%',
        improvement: '38% reduction'
      }
    ],
    testimonial: {
      quote: "Our customers love the instant responses, and our support team can finally focus on complex issues. Sales have increased significantly since implementation.",
      author: "Mike Chen",
      role: "Head of Customer Experience"
    },
    tags: ['24/7 Support', 'Multilingual', 'E-commerce Integration', 'Real-time Inventory']
  },
  {
    id: 'financial-services',
    industry: 'Financial Services',
    icon: DollarSign,
    company: 'FinanceFirst',
    companySize: '200+ employees',
    challenge: 'Complex compliance requirements and inconsistent customer service quality were creating regulatory risks and customer dissatisfaction.',
    painPoints: [
      'Inconsistent service quality across agents',
      'Complex compliance documentation requirements',
      'Long wait times for account inquiries',
      'Manual KYC processes causing delays',
      'Risk of regulatory violations'
    ],
    solution: 'Deployed compliant AI agents for customer service, KYC processing, and regulatory documentation with built-in compliance monitoring.',
    implementation: {
      timeline: '8 days',
      approach: [
        'Conducted comprehensive compliance audit',
        'Developed SOC 2 compliant AI infrastructure',
        'Integrated with core banking systems',
        'Implemented real-time compliance monitoring',
        'Created audit trail capabilities'
      ],
      agentTypes: ['Customer Service Agent', 'KYC Processing Agent', 'Compliance Monitoring Agent']
    },
    results: [
      {
        metric: 'Service Consistency',
        before: '60%',
        after: '95%',
        improvement: '58% improvement'
      },
      {
        metric: 'KYC Processing Time',
        before: '3-5 days',
        after: '2-4 hours',
        improvement: '85% faster'
      },
      {
        metric: 'Compliance Violations',
        before: '8 per quarter',
        after: '0 per quarter',
        improvement: '100% elimination'
      },
      {
        metric: 'Customer Wait Time',
        before: '12 minutes',
        after: '45 seconds',
        improvement: '94% reduction'
      }
    ],
    testimonial: {
      quote: "The AI agents ensure every customer interaction meets our compliance standards while delivering exceptional service. It's been a game-changer for our operations.",
      author: "Jennifer Martinez",
      role: "Chief Compliance Officer"
    },
    tags: ['SOC 2 Compliant', 'Banking Integration', 'KYC Automation', 'Regulatory Compliance']
  },
  {
    id: 'manufacturing-company',
    industry: 'Manufacturing',
    icon: Building2,
    company: 'ManufacturingCorp',
    companySize: '300+ employees',
    challenge: 'Complex approval processes and inventory management were creating bottlenecks, delays, and excess costs across multiple production facilities.',
    painPoints: [
      'Approval processes taking 2-3 weeks',
      'Manual inventory tracking across facilities',
      'Communication gaps between departments',
      'Frequent stockouts and overstock situations',
      'Inefficient resource allocation'
    ],
    solution: 'Implemented AI agents for process automation, inventory optimization, and cross-departmental communication.',
    implementation: {
      timeline: '10 days',
      approach: [
        'Mapped existing approval workflows',
        'Integrated with ERP and inventory systems',
        'Developed predictive inventory algorithms',
        'Created automated approval routing',
        'Implemented real-time communication channels'
      ],
      agentTypes: ['Process Automation Agent', 'Inventory Management Agent', 'Communication Coordinator Agent']
    },
    results: [
      {
        metric: 'Approval Process Time',
        before: '2-3 weeks',
        after: '3-5 days',
        improvement: '75% faster'
      },
      {
        metric: 'Inventory Accuracy',
        before: '78%',
        after: '96%',
        improvement: '23% improvement'
      },
      {
        metric: 'Stockout Incidents',
        before: '45 per month',
        after: '8 per month',
        improvement: '82% reduction'
      },
      {
        metric: 'Operational Costs',
        before: 'Baseline',
        after: '18% reduction',
        improvement: '$2.1M annual savings'
      }
    ],
    testimonial: {
      quote: "The AI agents have streamlined our operations beyond what we thought possible. We're more efficient, more accurate, and more profitable than ever.",
      author: "Robert Kim",
      role: "Operations Director"
    },
    tags: ['ERP Integration', 'Process Automation', 'Inventory Optimization', 'Multi-facility']
  }
]

export function IndustryCaseStudies() {
  const [selectedCase, setSelectedCase] = useState<string>(caseStudies[0].id)
  const selectedCaseStudy = caseStudies.find(cs => cs.id === selectedCase)!

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Industry Case Studies
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real Results Across Industries
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              See how our pain-point-driven approach has transformed businesses across 
              different industries, delivering measurable results and solving critical challenges.
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Industry Selection */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {caseStudies.map((caseStudy) => {
              const IconComponent = caseStudy.icon
              return (
                <motion.button
                  key={caseStudy.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCase(caseStudy.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg border transition-all duration-300 ${
                    selectedCase === caseStudy.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-muted border-border'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{caseStudy.industry}</span>
                </motion.button>
              )
            })}
          </div>
        </ScrollTriggeredSection>

        {/* Case Study Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Company Overview */}
              <div className="lg:col-span-1">
                <Card className="h-fit">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <selectedCaseStudy.icon className="w-8 h-8 text-primary" />
                      <div>
                        <CardTitle className="text-xl">{selectedCaseStudy.company}</CardTitle>
                        <CardDescription>{selectedCaseStudy.companySize}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{selectedCaseStudy.industry}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Challenge</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedCaseStudy.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Pain Points</h4>
                      <ul className="space-y-1">
                        {selectedCaseStudy.painPoints.map((point, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCaseStudy.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Solution & Implementation */}
              <div className="lg:col-span-2 space-y-6">
                {/* Solution Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Solution Implemented
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {selectedCaseStudy.solution}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          Implementation Timeline
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {selectedCaseStudy.implementation.timeline}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          AI Agents Deployed
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {selectedCaseStudy.implementation.agentTypes.map((agent, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {agent}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Measurable Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {selectedCaseStudy.results.map((result, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-4">
                          <h5 className="font-semibold text-sm mb-2">{result.metric}</h5>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-red-600">Before: {result.before}</span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <span className="text-green-600">After: {result.after}</span>
                          </div>
                          <div className="text-center mt-2">
                            <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {result.improvement}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6">
                      <blockquote className="text-lg italic mb-4">
                        "{selectedCaseStudy.testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{selectedCaseStudy.testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{selectedCaseStudy.testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <ScrollTriggeredSection animationType="fadeIn" delay={0.6}>
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Achieve Similar Results?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every success story started with identifying specific pain points. 
              Let us analyze your challenges and create custom AI agents that deliver measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Start Your Case Study
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Download Full Case Studies
              </Button>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </section>
  )
}