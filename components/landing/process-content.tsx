/**
 * ProcessContent Component
 * 
 * Comprehensive content and messaging for the process section that emphasizes
 * streamlined implementation, minimal client effort, competitive maintenance costs,
 * fast deployment capabilities, and ROI calculations.
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrollTriggeredSection, StaggerItem } from '@/components/animations/scroll-triggered-section'
import { cn } from '@/lib/utils'
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  Calculator,
  Target,
  Rocket,
  Award
} from 'lucide-react'

interface ROIMetric {
  label: string
  value: string
  description: string
  timeframe: string
  icon: React.ReactNode
}

interface CompetitiveAdvantage {
  title: string
  ourApproach: string
  competitorApproach: string
  savings: string
  icon: React.ReactNode
}

interface ProcessContentProps {
  className?: string
  showROICalculator?: boolean
  showCompetitiveComparison?: boolean
  emphasizeSpeed?: boolean
}

const roiMetrics: ROIMetric[] = [
  {
    label: 'Cost Reduction',
    value: '40-60%',
    description: 'Reduction in operational costs through AI automation',
    timeframe: 'Within 3 months',
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    label: 'Time Savings',
    value: '25-35 hrs',
    description: 'Hours saved per week per employee',
    timeframe: 'Immediate',
    icon: <Clock className="h-5 w-5" />
  },
  {
    label: 'Response Speed',
    value: '85% faster',
    description: 'Improvement in customer response times',
    timeframe: 'Day 1',
    icon: <Zap className="h-5 w-5" />
  },
  {
    label: 'Customer Satisfaction',
    value: '+32%',
    description: 'Increase in customer satisfaction scores',
    timeframe: 'Within 6 weeks',
    icon: <TrendingUp className="h-5 w-5" />
  }
]

const competitiveAdvantages: CompetitiveAdvantage[] = [
  {
    title: 'Implementation Speed',
    ourApproach: '3-7 days total deployment',
    competitorApproach: '3-6 months implementation',
    savings: '90% faster time-to-value',
    icon: <Rocket className="h-5 w-5" />
  },
  {
    title: 'Client Involvement',
    ourApproach: 'Minimal input required',
    competitorApproach: 'Extensive client resources needed',
    savings: '80% less client time investment',
    icon: <Users className="h-5 w-5" />
  },
  {
    title: 'Maintenance Costs',
    ourApproach: '$299-899/month all-inclusive',
    competitorApproach: '$2,000-8,000/month + extras',
    savings: 'Up to 75% cost reduction',
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: 'Testing Capability',
    ourApproach: 'Immediate testing environment',
    competitorApproach: 'Limited testing options',
    savings: 'Instant validation & optimization',
    icon: <Target className="h-5 w-5" />
  }
]

export function ProcessContent({
  className,
  showROICalculator = true,
  showCompetitiveComparison = true,
  emphasizeSpeed = true
}: ProcessContentProps) {
  return (
    <div className={cn('space-y-16 lg:space-y-24', className)}>
      {/* Streamlined Implementation Emphasis */}
      <ScrollTriggeredSection animationType="fadeInUp">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-6 border border-green-200">
            <CheckCircle className="h-4 w-4" />
            Implementation Really Streamlined
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            {emphasizeSpeed ? (
              <>
                From Business Pain Point to{' '}
                <span className="text-primary">Working AI Solution</span>{' '}
                in Under a Week
              </>
            ) : (
              <>
                Streamlined Process,{' '}
                <span className="text-primary">Maximum Impact</span>
              </>
            )}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our implementation is really streamlined and pretty much completed before you even start. 
            We&apos;ve refined our process to require minimal client involvement while delivering 
            solutions perfectly tailored to your specific business needs and pain points.
          </p>
        </div>
      </ScrollTriggeredSection>

      {/* Key Benefits Grid */}
      <ScrollTriggeredSection 
        animationType="stagger" 
        staggerChildren={true}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <StaggerItem>
          <div className="p-6 bg-card border rounded-xl text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Deploy in days, not months. Start seeing results immediately.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem delay={0.1}>
          <div className="p-6 bg-card border rounded-xl text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">Minimal Effort</h3>
            <p className="text-sm text-muted-foreground">
              We handle 95% of the work. You focus on your business.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem delay={0.2}>
          <div className="p-6 bg-card border rounded-xl text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">Competitive Costs</h3>
            <p className="text-sm text-muted-foreground">
              Really competitive maintenance pricing that scales with you.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem delay={0.3}>
          <div className="p-6 bg-card border rounded-xl text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mx-auto">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">Instant Testing</h3>
            <p className="text-sm text-muted-foreground">
              Test immediately, optimize continuously, measure ROI from day one.
            </p>
          </div>
        </StaggerItem>
      </ScrollTriggeredSection>

      {/* ROI Calculator Section */}
      {showROICalculator && (
        <ScrollTriggeredSection animationType="fadeInUp">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12 border border-primary/10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <Calculator className="h-4 w-4" />
                Business Impact Metrics
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Measurable ROI from Day One
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our clients typically see these results within the first 90 days of deployment.
                Your custom solution is designed to deliver immediate, measurable business impact.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {roiMetrics.map((metric, index) => (
                <StaggerItem key={metric.label} delay={index * 0.1}>
                  <div className="bg-background/80 backdrop-blur-sm border rounded-xl p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto">
                      {metric.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm font-medium text-foreground mb-2">
                        {metric.label}
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        {metric.description}
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs border border-green-200">
                        <Clock className="h-3 w-3" />
                        {metric.timeframe}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                * Results based on average client performance across 100+ implementations
              </p>
            </div>
          </div>
        </ScrollTriggeredSection>
      )}

      {/* Competitive Comparison */}
      {showCompetitiveComparison && (
        <ScrollTriggeredSection animationType="fadeInUp">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium mb-4 border border-orange-200">
              <Award className="h-4 w-4" />
              Competitive Advantage
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Why Our Approach Wins
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how our streamlined process and competitive maintenance costs 
              compare to traditional AI implementation approaches.
            </p>
          </div>

          <div className="space-y-6">
            {competitiveAdvantages.map((advantage, index) => (
              <StaggerItem key={advantage.title} delay={index * 0.1}>
                <div className="bg-card border rounded-xl p-6 lg:p-8">
                  <div className="grid gap-6 lg:grid-cols-4 lg:items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                        {advantage.icon}
                      </div>
                      <h4 className="font-semibold text-foreground">
                        {advantage.title}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Our Approach</div>
                      <div className="font-medium text-green-600">
                        {advantage.ourApproach}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Competitors</div>
                      <div className="font-medium text-red-600">
                        {advantage.competitorApproach}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Your Savings</div>
                      <div className="font-bold text-primary">
                        {advantage.savings}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </ScrollTriggeredSection>
      )}

      {/* Fast Deployment Capabilities */}
      <ScrollTriggeredSection animationType="fadeInUp">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12 border border-blue-200">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                <Zap className="h-4 w-4" />
                Fast Deployment
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Test Immediately, Deploy Instantly
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our fast deployment capabilities mean you can start testing your AI solution 
                immediately and see real business impact from day one. No lengthy setup periods, 
                no complex integrations - just results.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-foreground">Live testing environment ready in 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-foreground">Real-time performance monitoring from day one</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-foreground">Continuous optimization based on actual usage</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-foreground">Immediate ROI tracking and business impact measurement</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-background/80 backdrop-blur-sm border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">Deployment Timeline</h4>
                  <div className="text-2xl font-bold text-primary">7 days</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Discovery & Setup</span>
                    <span className="text-sm font-medium">Days 1-3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Development & Testing</span>
                    <span className="text-sm font-medium">Days 4-6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Live Deployment</span>
                    <span className="text-sm font-medium">Day 7</span>
                  </div>
                </div>
              </div>

              <div className="bg-background/80 backdrop-blur-sm border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">Maintenance Cost</h4>
                  <div className="text-2xl font-bold text-green-600">75% less</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Our pricing</span>
                    <span className="text-sm font-medium text-green-600">$299-899/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Competitor average</span>
                    <span className="text-sm font-medium text-red-600">$2,000-8,000/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollTriggeredSection>

      {/* Call to Action */}
      <ScrollTriggeredSection animationType="fadeInUp">
        <div className="text-center bg-card border rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that have streamlined their operations with our 
            custom AI solutions. Get started today and see results within a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your AI Transformation
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Calculate Your ROI
            </motion.button>
          </div>
        </div>
      </ScrollTriggeredSection>
    </div>
  )
}

// Specialized variants
export function CompactProcessContent(props: Omit<ProcessContentProps, 'showROICalculator' | 'showCompetitiveComparison'>) {
  return (
    <ProcessContent 
      {...props} 
      showROICalculator={false}
      showCompetitiveComparison={false}
    />
  )
}

export function ROIFocusedProcessContent(props: Omit<ProcessContentProps, 'showROICalculator'>) {
  return (
    <ProcessContent 
      {...props} 
      showROICalculator={true}
    />
  )
}

export function CompetitiveFocusedProcessContent(props: Omit<ProcessContentProps, 'showCompetitiveComparison'>) {
  return (
    <ProcessContent 
      {...props} 
      showCompetitiveComparison={true}
    />
  )
}