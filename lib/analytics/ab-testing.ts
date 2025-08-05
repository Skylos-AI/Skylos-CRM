// A/B Testing framework for landing page optimization

export interface ABTest {
  id: string
  name: string
  description: string
  status: 'draft' | 'running' | 'paused' | 'completed'
  startDate: Date
  endDate?: Date
  trafficAllocation: number // Percentage of traffic to include in test
  variants: ABVariant[]
  targetMetric: string
  minimumSampleSize: number
  confidenceLevel: number
}

export interface ABVariant {
  id: string
  name: string
  description: string
  trafficWeight: number // Percentage of test traffic
  isControl: boolean
  config: Record<string, any>
}

export interface ABTestResult {
  testId: string
  variantId: string
  userId?: string
  sessionId: string
  timestamp: number
  events: ABTestEvent[]
  conversionValue?: number
}

export interface ABTestEvent {
  event: string
  timestamp: number
  properties: Record<string, any>
  value?: number
}

export interface ABTestAnalytics {
  testId: string
  status: 'running' | 'completed'
  participants: number
  conversions: Record<string, number>
  conversionRates: Record<string, number>
  statisticalSignificance: Record<string, number>
  winner?: string
  confidence: number
  recommendedAction: 'continue' | 'stop' | 'declare_winner'
}

// Define available A/B tests
export const AB_TESTS: Record<string, ABTest> = {
  hero_layout: {
    id: 'hero_layout',
    name: 'Hero Section Layout',
    description: 'Test different hero section layouts for conversion optimization',
    status: 'running',
    startDate: new Date('2024-01-01'),
    trafficAllocation: 100,
    variants: [
      {
        id: 'control',
        name: 'Original Layout',
        description: 'Current asymmetrical hero layout',
        trafficWeight: 50,
        isControl: true,
        config: {
          titlePosition: 'left',
          ctaStyle: 'primary',
          backgroundStyle: 'gradient'
        }
      },
      {
        id: 'centered',
        name: 'Centered Layout',
        description: 'Centered hero layout with larger CTA',
        trafficWeight: 50,
        isControl: false,
        config: {
          titlePosition: 'center',
          ctaStyle: 'large',
          backgroundStyle: 'solid'
        }
      }
    ],
    targetMetric: 'cta_click',
    minimumSampleSize: 1000,
    confidenceLevel: 95
  },
  
  cta_text: {
    id: 'cta_text',
    name: 'CTA Button Text',
    description: 'Test different call-to-action button text variations',
    status: 'running',
    startDate: new Date('2024-01-01'),
    trafficAllocation: 50,
    variants: [
      {
        id: 'control',
        name: 'Start Your Transformation',
        description: 'Original CTA text',
        trafficWeight: 33.33,
        isControl: true,
        config: {
          primaryCTA: 'Start Your Transformation',
          secondaryCTA: 'Learn More'
        }
      },
      {
        id: 'urgency',
        name: 'Get Started Today',
        description: 'Urgency-focused CTA text',
        trafficWeight: 33.33,
        isControl: false,
        config: {
          primaryCTA: 'Get Started Today',
          secondaryCTA: 'See How It Works'
        }
      },
      {
        id: 'benefit',
        name: 'Boost Your Revenue',
        description: 'Benefit-focused CTA text',
        trafficWeight: 33.34,
        isControl: false,
        config: {
          primaryCTA: 'Boost Your Revenue',
          secondaryCTA: 'View Case Studies'
        }
      }
    ],
    targetMetric: 'conversion',
    minimumSampleSize: 500,
    confidenceLevel: 95
  },

  social_proof_position: {
    id: 'social_proof_position',
    name: 'Social Proof Position',
    description: 'Test optimal placement of testimonials and case studies',
    status: 'running',
    startDate: new Date('2024-01-01'),
    trafficAllocation: 75,
    variants: [
      {
        id: 'control',
        name: 'After Solution',
        description: 'Social proof after solution showcase',
        trafficWeight: 50,
        isControl: true,
        config: {
          socialProofPosition: 'after_solution',
          testimonialStyle: 'carousel'
        }
      },
      {
        id: 'early',
        name: 'After Hero',
        description: 'Social proof immediately after hero section',
        trafficWeight: 50,
        isControl: false,
        config: {
          socialProofPosition: 'after_hero',
          testimonialStyle: 'grid'
        }
      }
    ],
    targetMetric: 'scroll_depth_50',
    minimumSampleSize: 800,
    confidenceLevel: 90
  }
}

class ABTestManager {
  private activeTests: Map<string, ABVariant> = new Map()
  private sessionId: string
  private userId?: string

  constructor(sessionId: string, userId?: string) {
    this.sessionId = sessionId
    this.userId = userId
    this.initializeTests()
  }

  private initializeTests(): void {
    // Determine which tests user should participate in
    Object.values(AB_TESTS).forEach(test => {
      if (test.status === 'running' && this.shouldParticipateInTest(test)) {
        const variant = this.assignVariant(test)
        this.activeTests.set(test.id, variant)
        this.trackTestParticipation(test.id, variant.id)
      }
    })
  }

  private shouldParticipateInTest(test: ABTest): boolean {
    // Check if user should be included in this test
    const hash = this.hashUserId(this.sessionId + test.id)
    const participation = (hash % 100) < test.trafficAllocation
    
    // Additional filters can be added here (e.g., user segments, geography)
    return participation
  }

  private assignVariant(test: ABTest): ABVariant {
    // Use consistent hashing to ensure same user gets same variant
    const hash = this.hashUserId(this.sessionId + test.id + 'variant')
    const random = hash % 100
    
    let cumulativeWeight = 0
    for (const variant of test.variants) {
      cumulativeWeight += variant.trafficWeight
      if (random < cumulativeWeight) {
        return variant
      }
    }
    
    // Fallback to control
    return test.variants.find(v => v.isControl) || test.variants[0]
  }

  private hashUserId(input: string): number {
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  private trackTestParticipation(testId: string, variantId: string): void {
    const event: ABTestEvent = {
      event: 'ab_test_participation',
      timestamp: Date.now(),
      properties: {
        testId,
        variantId,
        sessionId: this.sessionId,
        userId: this.userId
      }
    }

    this.sendTestEvent(testId, variantId, event)
  }

  getVariant(testId: string): ABVariant | null {
    return this.activeTests.get(testId) || null
  }

  getVariantConfig(testId: string): Record<string, any> {
    const variant = this.getVariant(testId)
    return variant ? variant.config : {}
  }

  isInTest(testId: string): boolean {
    return this.activeTests.has(testId)
  }

  trackConversion(testId: string, conversionType: string, value?: number): void {
    const variant = this.getVariant(testId)
    if (!variant) return

    const event: ABTestEvent = {
      event: 'ab_test_conversion',
      timestamp: Date.now(),
      properties: {
        testId,
        variantId: variant.id,
        conversionType,
        sessionId: this.sessionId,
        userId: this.userId
      },
      value
    }

    this.sendTestEvent(testId, variant.id, event)
  }

  trackEvent(testId: string, eventName: string, properties: Record<string, any> = {}, value?: number): void {
    const variant = this.getVariant(testId)
    if (!variant) return

    const event: ABTestEvent = {
      event: eventName,
      timestamp: Date.now(),
      properties: {
        ...properties,
        testId,
        variantId: variant.id,
        sessionId: this.sessionId,
        userId: this.userId
      },
      value
    }

    this.sendTestEvent(testId, variant.id, event)
  }

  private async sendTestEvent(testId: string, variantId: string, event: ABTestEvent): Promise<void> {
    try {
      // Send to Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', event.event, {
          event_category: 'ab_test',
          event_label: `${testId}_${variantId}`,
          value: event.value,
          custom_map: {
            test_id: testId,
            variant_id: variantId,
            session_id: this.sessionId
          }
        })
      }

      // Send to custom analytics endpoint
      await fetch('/api/analytics/ab-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          testId,
          variantId,
          event,
          sessionId: this.sessionId,
          userId: this.userId
        })
      })

      // Store locally
      this.storeTestEvent(testId, variantId, event)

    } catch (error) {
      console.warn('Failed to send A/B test event:', error)
    }
  }

  private storeTestEvent(testId: string, variantId: string, event: ABTestEvent): void {
    try {
      const stored = localStorage.getItem('ab_test_events') || '[]'
      const events = JSON.parse(stored)
      
      events.push({
        testId,
        variantId,
        event,
        sessionId: this.sessionId,
        userId: this.userId,
        timestamp: Date.now()
      })

      // Keep only last 100 events
      if (events.length > 100) {
        events.splice(0, events.length - 100)
      }

      localStorage.setItem('ab_test_events', JSON.stringify(events))
    } catch (error) {
      console.warn('Failed to store A/B test event locally:', error)
    }
  }

  getActiveTests(): Record<string, ABVariant> {
    const result: Record<string, ABVariant> = {}
    this.activeTests.forEach((variant, testId) => {
      result[testId] = variant
    })
    return result
  }

  // Statistical analysis helpers
  calculateSignificance(controlConversions: number, controlSample: number, 
                       testConversions: number, testSample: number): number {
    // Z-test for proportions
    const p1 = controlConversions / controlSample
    const p2 = testConversions / testSample
    const p = (controlConversions + testConversions) / (controlSample + testSample)
    
    const se = Math.sqrt(p * (1 - p) * (1/controlSample + 1/testSample))
    const z = Math.abs(p1 - p2) / se
    
    // Convert Z-score to p-value (simplified)
    return Math.max(0, Math.min(1, 2 * (1 - this.normalCDF(Math.abs(z)))))
  }

  private normalCDF(x: number): number {
    // Approximation of normal cumulative distribution function
    return 0.5 * (1 + this.erf(x / Math.sqrt(2)))
  }

  private erf(x: number): number {
    // Approximation of error function
    const a1 =  0.254829592
    const a2 = -0.284496736
    const a3 =  1.421413741
    const a4 = -1.453152027
    const a5 =  1.061405429
    const p  =  0.3275911

    const sign = x >= 0 ? 1 : -1
    x = Math.abs(x)

    const t = 1.0 / (1.0 + p * x)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

    return sign * y
  }
}

// Singleton instance
let abTestManager: ABTestManager | null = null

export const initializeABTesting = (sessionId: string, userId?: string): ABTestManager => {
  if (!abTestManager) {
    abTestManager = new ABTestManager(sessionId, userId)
  }
  return abTestManager
}

export const getABTestManager = (): ABTestManager | null => {
  return abTestManager
}

// Utility functions
export const getTestVariant = (testId: string): ABVariant | null => {
  const manager = getABTestManager()
  return manager ? manager.getVariant(testId) : null
}

export const getTestConfig = (testId: string): Record<string, any> => {
  const manager = getABTestManager()
  return manager ? manager.getVariantConfig(testId) : {}
}

export const trackTestConversion = (testId: string, conversionType: string, value?: number): void => {
  const manager = getABTestManager()
  if (manager) {
    manager.trackConversion(testId, conversionType, value)
  }
}

export const isInTest = (testId: string): boolean => {
  const manager = getABTestManager()
  return manager ? manager.isInTest(testId) : false
}

// React hook for A/B testing
export const useABTest = (testId: string) => {
  const manager = getABTestManager()
  const variant = manager ? manager.getVariant(testId) : null
  const config = variant ? variant.config : {}
  
  const trackEvent = (eventName: string, properties?: Record<string, any>, value?: number) => {
    if (manager) {
      manager.trackEvent(testId, eventName, properties, value)
    }
  }

  const trackConversion = (conversionType: string, value?: number) => {
    if (manager) {
      manager.trackConversion(testId, conversionType, value)
    }
  }

  return {
    variant,
    config,
    isInTest: !!variant,
    trackEvent,
    trackConversion
  }
}