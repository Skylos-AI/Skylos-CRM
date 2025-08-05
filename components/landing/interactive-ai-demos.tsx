"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  MessageCircle, 
  User, 
  Bot, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Building2,
  ShoppingCart,
  Headphones,
  Briefcase
} from 'lucide-react'
import { ScrollTriggeredSection } from '@/components/animations/scroll-triggered-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EnhancedCTAButton, InteractiveBadge } from '@/components/landing/enhanced-interactive-elements'
import { LoadingSpinner } from '@/components/ui/feedback-system'
import { hoverEffects } from '@/lib/animations/hover-effects'

interface ConversationMessage {
  id: string
  sender: 'user' | 'ai'
  message: string
  timestamp: number
  metadata?: {
    intent?: string
    confidence?: number
    context?: string[]
  }
}

interface DemoScenario {
  id: string
  title: string
  industry: string
  description: string
  icon: React.ReactNode
  conversation: ConversationMessage[]
  metrics: {
    responseTime: string
    accuracy: string
    satisfaction: string
    resolution: string
  }
  businessContext: {
    challenge: string
    solution: string
    impact: string
  }
}

const demoScenarios: DemoScenario[] = [
  {
    id: 'customer-service',
    title: 'Customer Service Excellence',
    industry: 'E-commerce',
    description: 'AI agent handling complex customer inquiries with context awareness',
    icon: <Headphones className="w-6 h-6" />,
    conversation: [
      {
        id: '1',
        sender: 'user',
        message: "Hi, I ordered a laptop last week but haven't received any updates. My order number is #12345.",
        timestamp: 0
      },
      {
        id: '2',
        sender: 'ai',
        message: "Hello! I can help you with order #12345. I see you ordered the Dell XPS 13 on March 15th. Let me check the current status for you.",
        timestamp: 2000,
        metadata: {
          intent: 'order_inquiry',
          confidence: 0.95,
          context: ['order_history', 'customer_profile']
        }
      },
      {
        id: '3',
        sender: 'ai',
        message: "Good news! Your laptop is currently in transit and should arrive tomorrow by 2 PM. I've sent tracking details to your email. Would you like me to set up delivery notifications?",
        timestamp: 4000,
        metadata: {
          intent: 'provide_update',
          confidence: 0.98,
          context: ['shipping_data', 'customer_preferences']
        }
      },
      {
        id: '4',
        sender: 'user',
        message: "That's great! Yes, please set up notifications. Also, can you help me with setting up the warranty?",
        timestamp: 6000
      },
      {
        id: '5',
        sender: 'ai',
        message: "Absolutely! I've enabled delivery notifications for tomorrow. For your warranty, I can register your Dell XPS 13 right now. It comes with a 2-year premium warranty. I'll need to verify a few details - shall we proceed?",
        timestamp: 8000,
        metadata: {
          intent: 'warranty_setup',
          confidence: 0.92,
          context: ['product_info', 'warranty_terms', 'customer_verification']
        }
      }
    ],
    metrics: {
      responseTime: '1.2s',
      accuracy: '96%',
      satisfaction: '4.8/5',
      resolution: '89%'
    },
    businessContext: {
      challenge: 'High volume of order inquiries overwhelming support team',
      solution: 'AI agent with order system integration and proactive communication',
      impact: '60% reduction in support tickets, 40% faster resolution times'
    }
  },
  {
    id: 'sales-qualification',
    title: 'Intelligent Sales Qualification',
    industry: 'B2B SaaS',
    description: 'AI agent qualifying leads and scheduling demos with context understanding',
    icon: <Briefcase className="w-6 h-6" />,
    conversation: [
      {
        id: '1',
        sender: 'user',
        message: "I'm interested in your CRM solution for my marketing agency. We have about 50 employees.",
        timestamp: 0
      },
      {
        id: '2',
        sender: 'ai',
        message: "Great to hear from you! A 50-person marketing agency is right in our sweet spot. I'd love to learn more about your current challenges. What CRM are you using now, and what's driving the need for a change?",
        timestamp: 2000,
        metadata: {
          intent: 'lead_qualification',
          confidence: 0.94,
          context: ['company_size', 'industry_type']
        }
      },
      {
        id: '3',
        sender: 'user',
        message: "We're using spreadsheets mostly. It's getting chaotic with client data scattered everywhere. We need better client tracking and project management integration.",
        timestamp: 4000
      },
      {
        id: '4',
        sender: 'ai',
        message: "I completely understand - that's a common pain point for growing agencies. Our CRM integrates seamlessly with project management tools like Asana and Monday.com. Based on your needs, I'd recommend our Professional plan. Would you be interested in a 15-minute demo this week to see how it handles client data organization?",
        timestamp: 6000,
        metadata: {
          intent: 'solution_matching',
          confidence: 0.97,
          context: ['pain_points', 'integration_needs', 'plan_recommendation']
        }
      },
      {
        id: '5',
        sender: 'user',
        message: "Yes, that sounds perfect. I'm free Thursday afternoon or Friday morning.",
        timestamp: 8000
      },
      {
        id: '6',
        sender: 'ai',
        message: "Excellent! I have Thursday at 2 PM or Friday at 10 AM available. I'll also send you a brief case study of how we helped a similar 45-person agency increase their client retention by 35%. Which time works better for you?",
        timestamp: 10000,
        metadata: {
          intent: 'demo_scheduling',
          confidence: 0.99,
          context: ['calendar_availability', 'relevant_case_studies']
        }
      }
    ],
    metrics: {
      responseTime: '0.8s',
      accuracy: '94%',
      satisfaction: '4.9/5',
      resolution: '78%'
    },
    businessContext: {
      challenge: 'Sales team spending too much time on unqualified leads',
      solution: 'AI agent with intelligent lead scoring and automated qualification',
      impact: '45% increase in qualified leads, 30% more demos booked'
    }
  },
  {
    id: 'technical-support',
    title: 'Advanced Technical Support',
    industry: 'Software',
    description: 'AI agent providing technical troubleshooting with deep product knowledge',
    icon: <Building2 className="w-6 h-6" />,
    conversation: [
      {
        id: '1',
        sender: 'user',
        message: "Our API integration is failing with a 401 error. We're using the Python SDK version 2.1.4.",
        timestamp: 0
      },
      {
        id: '2',
        sender: 'ai',
        message: "I can help you resolve this 401 authentication error. Let me check a few things first. Are you using API keys or OAuth for authentication, and when did this error start occurring?",
        timestamp: 2000,
        metadata: {
          intent: 'technical_troubleshooting',
          confidence: 0.96,
          context: ['api_version', 'error_type', 'sdk_version']
        }
      },
      {
        id: '3',
        sender: 'user',
        message: "We're using API keys. It started this morning around 9 AM. The same code was working fine yesterday.",
        timestamp: 4000
      },
      {
        id: '4',
        sender: 'ai',
        message: "Thanks for that context. I see there was a security update deployed at 8:30 AM today that requires API key headers to include the new 'X-API-Version: 2024-03' header. This affects SDK versions 2.1.4 and earlier. Here's the quick fix:",
        timestamp: 6000,
        metadata: {
          intent: 'provide_solution',
          confidence: 0.98,
          context: ['deployment_logs', 'version_compatibility', 'security_updates']
        }
      },
      {
        id: '5',
        sender: 'ai',
        message: "```python\nheaders = {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'X-API-Version': '2024-03'\n}\n```\n\nAlternatively, upgrade to SDK v2.2.0 which handles this automatically. Would you like me to walk you through the upgrade process?",
        timestamp: 8000,
        metadata: {
          intent: 'code_solution',
          confidence: 0.99,
          context: ['code_examples', 'upgrade_path']
        }
      }
    ],
    metrics: {
      responseTime: '1.5s',
      accuracy: '98%',
      satisfaction: '4.7/5',
      resolution: '92%'
    },
    businessContext: {
      challenge: 'Complex technical issues requiring deep product knowledge',
      solution: 'AI agent with access to documentation, deployment logs, and code examples',
      impact: '50% faster issue resolution, 25% reduction in escalations'
    }
  }
]

export function InteractiveAIDemos() {
  const [activeDemo, setActiveDemo] = useState<string>(demoScenarios[0].id)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0)
  const [displayedMessages, setDisplayedMessages] = useState<ConversationMessage[]>([])

  const currentScenario = demoScenarios.find(scenario => scenario.id === activeDemo)!

  useEffect(() => {
    if (isPlaying && currentMessageIndex < currentScenario.conversation.length) {
      const message = currentScenario.conversation[currentMessageIndex]
      const timer = setTimeout(() => {
        setDisplayedMessages(prev => [...prev, message])
        setCurrentMessageIndex(prev => prev + 1)
      }, message.timestamp || 2000)

      return () => clearTimeout(timer)
    } else if (currentMessageIndex >= currentScenario.conversation.length) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentMessageIndex, currentScenario])

  const handlePlay = () => {
    if (currentMessageIndex >= currentScenario.conversation.length) {
      handleReset()
    }
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentMessageIndex(0)
    setDisplayedMessages([])
  }

  const handleDemoChange = (demoId: string) => {
    setActiveDemo(demoId)
    handleReset()
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See Conversational AI in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience real-world scenarios where our AI agents demonstrate context awareness, 
              industry expertise, and intelligent problem-solving capabilities.
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Demo Selection */}
        <ScrollTriggeredSection animationType="slideUp" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {demoScenarios.map((scenario) => (
              <motion.button
                key={scenario.id}
                onClick={() => handleDemoChange(scenario.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg border transition-all ${
                  activeDemo === scenario.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-1 rounded ${
                  activeDemo === scenario.id ? 'bg-blue-500' : 'bg-gray-100'
                }`}>
                  {scenario.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium">{scenario.title}</div>
                  <div className={`text-sm ${
                    activeDemo === scenario.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {scenario.industry}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </ScrollTriggeredSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Demo Interface */}
          <div className="lg:col-span-2">
            <ScrollTriggeredSection animationType="slideLeft">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                          {currentScenario.icon}
                        </div>
                        {currentScenario.title}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{currentScenario.description}</p>
                    </div>
                    <Badge variant="secondary">{currentScenario.industry}</Badge>
                  </div>
                  
                  {/* Demo Controls */}
                  <div className="flex items-center gap-2 pt-4">
                    <EnhancedCTAButton
                      onClick={isPlaying ? handlePause : handlePlay}
                      size="sm"
                      variant="primary"
                      icon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      iconPosition="left"
                      className="flex items-center gap-2"
                    >
                      {isPlaying ? 'Pause' : 'Play Demo'}
                    </EnhancedCTAButton>
                    <EnhancedCTAButton 
                      onClick={handleReset} 
                      size="sm" 
                      variant="outline"
                      icon={<RotateCcw className="w-4 h-4" />}
                      iconPosition="left"
                    >
                      Reset
                    </EnhancedCTAButton>
                    <div className="text-sm text-gray-500 ml-auto">
                      {displayedMessages.length} / {currentScenario.conversation.length} messages
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Conversation Display */}
                  <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                    <AnimatePresence>
                      {displayedMessages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-3 mb-4 ${
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {message.sender === 'ai' && (
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                          )}
                          
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border shadow-sm'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            
                            {/* AI Metadata */}
                            {message.sender === 'ai' && message.metadata && (
                              <div className="mt-2 pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  <span>Intent: {message.metadata.intent}</span>
                                  <span>•</span>
                                  <span>Confidence: {Math.round((message.metadata.confidence || 0) * 100)}%</span>
                                </div>
                                {message.metadata.context && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {message.metadata.context.map((ctx, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {ctx}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {message.sender === 'user' && (
                            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shrink-0">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    {isPlaying && currentMessageIndex < currentScenario.conversation.length && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3 mb-4"
                      >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white border rounded-lg px-4 py-2 shadow-sm">
                          <LoadingSpinner variant="dots" size="sm" color="gray" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollTriggeredSection>
          </div>

          {/* Metrics and Context */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <ScrollTriggeredSection animationType="slideRight">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {currentScenario.metrics.responseTime}
                      </div>
                      <div className="text-sm text-gray-600">Response Time</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {currentScenario.metrics.accuracy}
                      </div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {currentScenario.metrics.satisfaction}
                      </div>
                      <div className="text-sm text-gray-600">Satisfaction</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {currentScenario.metrics.resolution}
                      </div>
                      <div className="text-sm text-gray-600">Resolution Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollTriggeredSection>

            {/* Business Context */}
            <ScrollTriggeredSection animationType="slideRight" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Business Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                    <p className="text-sm text-gray-600">{currentScenario.businessContext.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                    <p className="text-sm text-gray-600">{currentScenario.businessContext.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Impact</h4>
                    <p className="text-sm text-green-600 font-medium">{currentScenario.businessContext.impact}</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollTriggeredSection>

            {/* Industry Applications */}
            <ScrollTriggeredSection animationType="slideRight" delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    Industry Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['E-commerce', 'Healthcare', 'Financial Services', 'Manufacturing', 'Education'].map((industry) => (
                      <div key={industry} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{industry}</span>
                        <Badge variant="outline" className="text-xs">
                          {industry === currentScenario.industry ? 'Active Demo' : 'Available'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollTriggeredSection>
          </div>
        </div>

        {/* Call to Action */}
        <ScrollTriggeredSection animationType="fadeIn" delay={0.6}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Experience Your Own Custom Demo
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                See how conversational AI can be tailored to your specific industry and use cases. 
                Get a personalized demonstration with your actual business scenarios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <EnhancedCTAButton 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  glowEffect={true}
                  magneticEffect={true}
                >
                  Request Custom Demo
                </EnhancedCTAButton>
                <EnhancedCTAButton 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  magneticEffect={true}
                >
                  Download Case Studies
                </EnhancedCTAButton>
              </div>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </section>
  )
}