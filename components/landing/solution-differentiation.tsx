"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, MessageSquare, Bot, Zap, Shield, Users, BarChart3 } from 'lucide-react'
import { ScrollTriggeredSection } from '@/components/animations/scroll-triggered-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ComparisonFeature {
  id: string
  title: string
  description: string
  basicAutomation: {
    available: boolean
    description: string
    limitation?: string
  }
  conversationalAI: {
    available: boolean
    description: string
    advantage: string
  }
  icon: React.ReactNode
}

interface TechnicalSpec {
  id: string
  title: string
  description: string
  details: string[]
  metrics?: {
    label: string
    value: string
    improvement: string
  }[]
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    id: 'context-awareness',
    title: 'Context-Aware Interactions',
    description: 'Understanding conversation history and business context',
    basicAutomation: {
      available: false,
      description: 'Rule-based responses only',
      limitation: 'Cannot maintain conversation context or adapt to user needs'
    },
    conversationalAI: {
      available: true,
      description: 'Full conversation memory and context understanding',
      advantage: 'Provides personalized, contextually relevant responses that improve over time'
    },
    icon: <MessageSquare className="w-6 h-6" />
  },
  {
    id: 'natural-language',
    title: 'Natural Language Processing',
    description: 'Understanding intent and nuance in human communication',
    basicAutomation: {
      available: false,
      description: 'Keyword matching only',
      limitation: 'Requires exact phrases and cannot handle variations'
    },
    conversationalAI: {
      available: true,
      description: 'Advanced NLP with intent recognition',
      advantage: 'Understands natural speech patterns, slang, and complex requests'
    },
    icon: <Bot className="w-6 h-6" />
  },
  {
    id: 'adaptive-learning',
    title: 'Adaptive Learning',
    description: 'Improving performance based on interactions',
    basicAutomation: {
      available: false,
      description: 'Static rule sets',
      limitation: 'Requires manual updates for any changes'
    },
    conversationalAI: {
      available: true,
      description: 'Continuous learning from interactions',
      advantage: 'Automatically improves accuracy and relevance over time'
    },
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 'multi-channel',
    title: 'Multi-Channel Integration',
    description: 'Seamless operation across different platforms',
    basicAutomation: {
      available: true,
      description: 'Basic channel support',
      limitation: 'Separate configurations needed for each channel'
    },
    conversationalAI: {
      available: true,
      description: 'Unified conversational experience',
      advantage: 'Maintains context and personality across all channels'
    },
    icon: <Users className="w-6 h-6" />
  },
  {
    id: 'security-compliance',
    title: 'Enterprise Security',
    description: 'Data protection and compliance standards',
    basicAutomation: {
      available: true,
      description: 'Basic security measures',
      limitation: 'Limited audit trails and compliance features'
    },
    conversationalAI: {
      available: true,
      description: 'Enterprise-grade security with full compliance',
      advantage: 'SOC2, GDPR, HIPAA compliance with detailed audit logs'
    },
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 'analytics-insights',
    title: 'Advanced Analytics',
    description: 'Deep insights into user interactions and business impact',
    basicAutomation: {
      available: false,
      description: 'Basic usage statistics',
      limitation: 'Limited reporting on effectiveness or user satisfaction'
    },
    conversationalAI: {
      available: true,
      description: 'Comprehensive analytics and business intelligence',
      advantage: 'Detailed insights on user intent, satisfaction, and business outcomes'
    },
    icon: <BarChart3 className="w-6 h-6" />
  }
]

const technicalSpecs: TechnicalSpec[] = [
  {
    id: 'response-accuracy',
    title: 'Response Accuracy',
    description: 'Precision in understanding and responding to user queries',
    details: [
      'Intent recognition accuracy: 95%+',
      'Context retention across conversation turns',
      'Multi-language support with cultural nuances',
      'Domain-specific knowledge integration'
    ],
    metrics: [
      { label: 'Intent Accuracy', value: '95%', improvement: '+40% vs basic automation' },
      { label: 'User Satisfaction', value: '4.8/5', improvement: '+60% improvement' }
    ]
  },
  {
    id: 'performance-scalability',
    title: 'Performance & Scalability',
    description: 'Enterprise-grade performance that scales with your business',
    details: [
      'Sub-second response times globally',
      'Auto-scaling infrastructure',
      '99.9% uptime SLA guarantee',
      'Load balancing across multiple regions'
    ],
    metrics: [
      { label: 'Response Time', value: '<500ms', improvement: '3x faster than competitors' },
      { label: 'Concurrent Users', value: '10,000+', improvement: 'Unlimited scaling' }
    ]
  },
  {
    id: 'integration-capabilities',
    title: 'Integration Capabilities',
    description: 'Seamless connection with your existing business systems',
    details: [
      'REST API and webhook support',
      'Pre-built integrations with 200+ tools',
      'Custom integration development',
      'Real-time data synchronization'
    ],
    metrics: [
      { label: 'Available Integrations', value: '200+', improvement: '5x more than alternatives' },
      { label: 'Setup Time', value: '<24 hours', improvement: '90% faster deployment' }
    ]
  }
]

export function SolutionDifferentiation() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'comparison' | 'specs'>('comparison')

  const toggleFeature = (featureId: string) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId)
  }

  const toggleSpec = (specId: string) => {
    setExpandedSpec(expandedSpec === specId ? null : specId)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Conversational AI: The Next Evolution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Move beyond basic automation to intelligent, context-aware systems that understand 
              your business and adapt to your customers&apos; needs.
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Tab Navigation */}
        <ScrollTriggeredSection animationType="slideUp" delay={0.2}>
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-lg border">
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'comparison'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Feature Comparison
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'specs'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Technical Specifications
              </button>
            </div>
          </div>
        </ScrollTriggeredSection>

        <AnimatePresence mode="wait">
          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-6">
                {comparisonFeatures.map((feature, index) => (
                  <ScrollTriggeredSection
                    key={feature.id}
                    animationType="slideUp"
                    delay={index * 0.1}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                              {feature.icon}
                            </div>
                            <div>
                              <CardTitle className="text-xl">{feature.title}</CardTitle>
                              <p className="text-gray-600 mt-1">{feature.description}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFeature(feature.id)}
                            className="shrink-0"
                          >
                            {expandedFeature === feature.id ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      
                      <AnimatePresence>
                        {expandedFeature === feature.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <div className="grid md:grid-cols-2 gap-6">
                                {/* Basic Automation */}
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className={`w-3 h-3 rounded-full ${
                                      feature.basicAutomation.available ? 'bg-yellow-500' : 'bg-red-500'
                                    }`} />
                                    <h4 className="font-semibold text-gray-900">Basic Automation</h4>
                                  </div>
                                  <p className="text-gray-700 mb-2">{feature.basicAutomation.description}</p>
                                  {feature.basicAutomation.limitation && (
                                    <p className="text-sm text-red-600 italic">
                                      Limitation: {feature.basicAutomation.limitation}
                                    </p>
                                  )}
                                </div>

                                {/* Conversational AI */}
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <h4 className="font-semibold text-gray-900">Conversational AI</h4>
                                  </div>
                                  <p className="text-gray-700 mb-2">{feature.conversationalAI.description}</p>
                                  <p className="text-sm text-green-600 font-medium">
                                    Advantage: {feature.conversationalAI.advantage}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </ScrollTriggeredSection>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'specs' && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-6">
                {technicalSpecs.map((spec, index) => (
                  <ScrollTriggeredSection
                    key={spec.id}
                    animationType="slideUp"
                    delay={index * 0.1}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">{spec.title}</CardTitle>
                            <p className="text-gray-600 mt-1">{spec.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSpec(spec.id)}
                            className="shrink-0"
                          >
                            {expandedSpec === spec.id ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      
                      <AnimatePresence>
                        {expandedSpec === spec.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <div className="space-y-6">
                                {/* Technical Details */}
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-3">Technical Details</h4>
                                  <ul className="space-y-2">
                                    {spec.details.map((detail, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                                        <span className="text-gray-700">{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Performance Metrics */}
                                {spec.metrics && (
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                      {spec.metrics.map((metric, idx) => (
                                        <div key={idx} className="p-3 bg-blue-50 rounded-lg">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">
                                              {metric.label}
                                            </span>
                                            <span className="text-lg font-bold text-blue-600">
                                              {metric.value}
                                            </span>
                                          </div>
                                          <p className="text-xs text-green-600 font-medium">
                                            {metric.improvement}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </ScrollTriggeredSection>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <ScrollTriggeredSection animationType="fadeIn" delay={0.4}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                See how conversational AI can transform your business operations with 
                intelligent, context-aware automation that actually understands your customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Schedule a Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </section>
  )
}