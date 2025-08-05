/**
 * ProcessVisualization Component
 * 
 * Clean, linear flow visualization of the 3-step process with interactive
 * hover states, time indicators, and mobile-optimized vertical layout.
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollTriggeredSection, StaggerItem } from '@/components/animations/scroll-triggered-section'
import { cn } from '@/lib/utils'
import { Clock, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react'

interface ProcessStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  duration: string
  clientInput: 'minimal' | 'moderate' | 'extensive'
  details: string[]
  timeToValue?: string
}

interface ProcessVisualizationProps {
  steps?: ProcessStep[]
  layout?: 'horizontal' | 'vertical'
  interactive?: boolean
  className?: string
  showConnectors?: boolean
  emphasizeSpeed?: boolean
}

const defaultSteps: ProcessStep[] = [
  {
    id: 'discovery',
    title: 'Discovery & Analysis',
    description: 'We identify your key business pain points and map out the perfect AI solution',
    icon: <Users className="h-6 w-6" />,
    duration: '2-3 days',
    clientInput: 'minimal',
    details: [
      'Business process analysis',
      'Pain point identification',
      'Solution architecture design',
      'Integration requirements mapping'
    ],
    timeToValue: 'Immediate insights'
  },
  {
    id: 'customization',
    title: 'AI Agent Customization',
    description: 'Our team builds and tailors your conversational AI agent to your specific needs',
    icon: <Zap className="h-6 w-6" />,
    duration: '3-5 days',
    clientInput: 'minimal',
    details: [
      'Custom agent development',
      'Conversational flow design',
      'Business logic integration',
      'Quality assurance testing'
    ],
    timeToValue: 'Working prototype ready'
  },
  {
    id: 'deployment',
    title: 'Deployment & Testing',
    description: 'Fast deployment with immediate testing capabilities and ongoing optimization',
    icon: <CheckCircle className="h-6 w-6" />,
    duration: '1-2 days',
    clientInput: 'minimal',
    details: [
      'Production deployment',
      'Live testing environment',
      'Performance monitoring setup',
      'Team training & handoff'
    ],
    timeToValue: 'Immediate ROI tracking'
  }
]

const clientInputLabels = {
  minimal: { text: 'Minimal Input', color: 'text-green-600 bg-green-50 border-green-200' },
  moderate: { text: 'Some Input', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  extensive: { text: 'Active Input', color: 'text-orange-600 bg-orange-50 border-orange-200' }
}

export function ProcessVisualization({
  steps = defaultSteps,
  layout = 'horizontal',
  interactive = true,
  className,
  showConnectors = true,
  emphasizeSpeed = true
}: ProcessVisualizationProps) {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null)

  const totalDuration = steps.reduce((total, step) => {
    const days = parseInt(step.duration.split('-')[1] || step.duration.split('-')[0])
    return total + days
  }, 0)

  return (
    <section className={cn(
      'py-16 lg:py-24 bg-background',
      className
    )}>
      <div className="container">
        <ScrollTriggeredSection animationType="fadeInUp" className="text-center mb-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              From Idea to Implementation in{' '}
              <span className="text-primary">3 Simple Steps</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our streamlined process gets you up and running with custom AI agents in days, not months.
              {emphasizeSpeed && (
                <span className="block mt-2 text-primary font-semibold">
                  Total timeline: {totalDuration} days maximum
                </span>
              )}
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Process Steps */}
        <ScrollTriggeredSection
          animationType="stagger"
          staggerChildren={true}
          className={cn(
            'relative',
            layout === 'horizontal' 
              ? 'grid gap-8 lg:grid-cols-3' 
              : 'space-y-8 max-w-2xl mx-auto'
          )}
        >
          {/* Connecting Lines */}
          {showConnectors && layout === 'horizontal' && (
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0" />
          )}

          {steps.map((step, index) => (
            <StaggerItem key={step.id} delay={index * 0.2}>
              <motion.div
                className={cn(
                  'relative bg-card border rounded-2xl p-6 lg:p-8 transition-all duration-300 cursor-pointer group',
                  interactive && 'hover:shadow-lg hover:border-primary/20 hover:-translate-y-1',
                  hoveredStep === step.id && 'shadow-lg border-primary/20 -translate-y-1',
                  layout === 'vertical' && 'flex gap-6 items-start'
                )}
                onMouseEnter={() => interactive && setHoveredStep(step.id)}
                onMouseLeave={() => interactive && setHoveredStep(null)}
                whileHover={interactive ? { scale: 1.02 } : undefined}
                whileTap={interactive ? { scale: 0.98 } : undefined}
              >
                {/* Step Number */}
                <div className={cn(
                  'absolute -top-4 left-6 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold z-10',
                  layout === 'vertical' && 'relative top-0 left-0 flex-shrink-0'
                )}>
                  {index + 1}
                </div>

                <div className={cn(
                  'space-y-4',
                  layout === 'vertical' && 'flex-1'
                )}>
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Duration and Client Input */}
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200">
                      <Clock className="h-3 w-3" />
                      {step.duration}
                    </div>
                    <div className={cn(
                      'px-3 py-1 rounded-full text-sm border',
                      clientInputLabels[step.clientInput].color
                    )}>
                      {clientInputLabels[step.clientInput].text}
                    </div>
                  </div>

                  {/* Time to Value */}
                  {step.timeToValue && (
                    <div className="text-sm text-green-600 font-medium">
                      ⚡ {step.timeToValue}
                    </div>
                  )}

                  {/* Expandable Details */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: hoveredStep === step.id ? 'auto' : 0,
                      opacity: hoveredStep === step.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        What&apos;s included:
                      </h4>
                      <ul className="space-y-1">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* Arrow Connector for Vertical Layout */}
                {layout === 'vertical' && index < steps.length - 1 && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-muted-foreground">
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </div>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </ScrollTriggeredSection>

        {/* Summary Section */}
        <ScrollTriggeredSection animationType="fadeInUp" className="mt-16 text-center">
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Why Our Process Works
            </h3>
            <div className="grid gap-6 md:grid-cols-3 text-sm">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {totalDuration}
                </div>
                <div className="text-muted-foreground">
                  Days maximum from start to deployment
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  Minimal
                </div>
                <div className="text-muted-foreground">
                  Client input required throughout
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">
                  Immediate
                </div>
                <div className="text-muted-foreground">
                  Testing and ROI tracking
                </div>
              </div>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </section>
  )
}

// Specialized variants
export function HorizontalProcessVisualization(props: Omit<ProcessVisualizationProps, 'layout'>) {
  return <ProcessVisualization {...props} layout="horizontal" />
}

export function VerticalProcessVisualization(props: Omit<ProcessVisualizationProps, 'layout'>) {
  return <ProcessVisualization {...props} layout="vertical" />
}

export function CompactProcessVisualization(props: ProcessVisualizationProps) {
  return (
    <ProcessVisualization 
      {...props} 
      showConnectors={false}
      className={cn('py-12', props.className)}
    />
  )
}

// Mobile-optimized version
export function MobileProcessVisualization(props: ProcessVisualizationProps) {
  return (
    <div className="lg:hidden">
      <VerticalProcessVisualization {...props} />
    </div>
  )
}

// Desktop-optimized version
export function DesktopProcessVisualization(props: ProcessVisualizationProps) {
  return (
    <div className="hidden lg:block">
      <HorizontalProcessVisualization {...props} />
    </div>
  )
}