// Conversion funnel tracking for landing page

export interface ConversionEvent {
  event: string
  timestamp: number
  userId?: string
  sessionId: string
  properties: Record<string, any>
  value?: number
  currency?: string
}

export interface FunnelStep {
  id: string
  name: string
  description: string
  required: boolean
  order: number
}

export interface FunnelAnalytics {
  totalSessions: number
  conversions: number
  conversionRate: number
  dropoffPoints: Array<{
    step: string
    dropoffRate: number
    count: number
  }>
  averageTimeToConvert: number
  topSources: Array<{
    source: string
    conversions: number
    rate: number
  }>
}

// Define conversion funnel steps
export const FUNNEL_STEPS: FunnelStep[] = [
  {
    id: 'page_view',
    name: 'Page View',
    description: 'User lands on the page',
    required: true,
    order: 1
  },
  {
    id: 'hero_engagement',
    name: 'Hero Engagement',
    description: 'User interacts with hero section',
    required: false,
    order: 2
  },
  {
    id: 'scroll_depth_25',
    name: '25% Scroll',
    description: 'User scrolls 25% down the page',
    required: false,
    order: 3
  },
  {
    id: 'section_view_problem',
    name: 'Problem Section View',
    description: 'User views problem/urgency section',
    required: false,
    order: 4
  },
  {
    id: 'section_view_solution',
    name: 'Solution Section View',
    description: 'User views solution showcase',
    required: false,
    order: 5
  },
  {
    id: 'scroll_depth_50',
    name: '50% Scroll',
    description: 'User scrolls 50% down the page',
    required: false,
    order: 6
  },
  {
    id: 'cta_view',
    name: 'CTA View',
    description: 'User views a call-to-action button',
    required: false,
    order: 7
  },
  {
    id: 'cta_hover',
    name: 'CTA Hover',
    description: 'User hovers over a CTA button',
    required: false,
    order: 8
  },
  {
    id: 'cta_click',
    name: 'CTA Click',
    description: 'User clicks a call-to-action button',
    required: false,
    order: 9
  },
  {
    id: 'form_start',
    name: 'Form Start',
    description: 'User starts filling out a form',
    required: false,
    order: 10
  },
  {
    id: 'form_complete',
    name: 'Form Complete',
    description: 'User completes and submits a form',
    required: false,
    order: 11
  },
  {
    id: 'conversion',
    name: 'Conversion',
    description: 'User completes the desired action',
    required: false,
    order: 12
  }
]

// CTA tracking configuration
export const CTA_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  HERO: 'hero',
  SECTION: 'section',
  FLOATING: 'floating',
  FOOTER: 'footer'
} as const

export type CTAType = typeof CTA_TYPES[keyof typeof CTA_TYPES]

export interface CTATrackingData {
  ctaId: string
  ctaType: CTAType
  ctaText: string
  section: string
  position: {
    x: number
    y: number
    scrollDepth: number
  }
  timestamp: number
  sessionId: string
  userId?: string
}

class ConversionFunnelTracker {
  private events: ConversionEvent[] = []
  private sessionId: string
  private userId?: string
  private startTime: number

  constructor(userId?: string) {
    this.sessionId = this.generateSessionId()
    this.userId = userId
    this.startTime = Date.now()
    
    // Track initial page view
    this.trackEvent('page_view', {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  trackEvent(event: string, properties: Record<string, any> = {}, value?: number): void {
    const conversionEvent: ConversionEvent = {
      event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      properties: {
        ...properties,
        timeFromStart: Date.now() - this.startTime,
        url: window.location.href
      },
      value,
      currency: value ? 'USD' : undefined
    }

    this.events.push(conversionEvent)
    
    // Send to analytics service
    this.sendToAnalytics(conversionEvent)
    
    // Store in local storage for offline support
    this.storeLocally(conversionEvent)
  }

  trackScrollDepth(percentage: number): void {
    const scrollEvents = ['scroll_depth_25', 'scroll_depth_50', 'scroll_depth_75', 'scroll_depth_100']
    const eventIndex = Math.floor(percentage / 25) - 1
    
    if (eventIndex >= 0 && eventIndex < scrollEvents.length) {
      const eventName = scrollEvents[eventIndex]
      
      // Only track each scroll depth once per session
      if (!this.events.some(e => e.event === eventName)) {
        this.trackEvent(eventName, {
          scrollDepth: percentage,
          documentHeight: document.documentElement.scrollHeight,
          viewportHeight: window.innerHeight
        })
      }
    }
  }

  trackSectionView(sectionId: string, sectionName: string): void {
    const eventName = `section_view_${sectionId}`
    
    // Only track each section view once per session
    if (!this.events.some(e => e.event === eventName)) {
      this.trackEvent(eventName, {
        sectionId,
        sectionName,
        scrollDepth: this.getCurrentScrollDepth(),
        timeOnPage: Date.now() - this.startTime
      })
    }
  }

  trackCTAInteraction(action: 'view' | 'hover' | 'click', data: CTATrackingData): void {
    const eventName = `cta_${action}`
    
    this.trackEvent(eventName, {
      ctaId: data.ctaId,
      ctaType: data.ctaType,
      ctaText: data.ctaText,
      section: data.section,
      position: data.position,
      scrollDepth: this.getCurrentScrollDepth(),
      timeOnPage: Date.now() - this.startTime
    }, action === 'click' ? 1 : undefined) // Assign value to clicks
  }

  trackFormInteraction(action: 'start' | 'field_complete' | 'abandon' | 'complete', formData: {
    formId: string
    fieldId?: string
    fieldType?: string
    completionRate?: number
  }): void {
    const eventName = action === 'field_complete' ? 'form_progress' : `form_${action}`
    
    this.trackEvent(eventName, {
      ...formData,
      scrollDepth: this.getCurrentScrollDepth(),
      timeOnPage: Date.now() - this.startTime
    }, action === 'complete' ? 10 : undefined) // High value for form completion
  }

  trackConversion(conversionType: string, value?: number): void {
    this.trackEvent('conversion', {
      conversionType,
      timeToConvert: Date.now() - this.startTime,
      totalEvents: this.events.length,
      scrollDepth: this.getCurrentScrollDepth()
    }, value)
  }

  private getCurrentScrollDepth(): number {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    return Math.round((scrollTop / documentHeight) * 100)
  }

  private async sendToAnalytics(event: ConversionEvent): Promise<void> {
    try {
      // Send to your analytics service (Google Analytics, Mixpanel, etc.)
      if (typeof gtag !== 'undefined') {
        gtag('event', event.event, {
          event_category: 'conversion_funnel',
          event_label: event.properties.section || 'unknown',
          value: event.value,
          custom_map: {
            session_id: event.sessionId,
            user_id: event.userId
          }
        })
      }

      // Send to custom analytics endpoint
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
    } catch (error) {
      console.warn('Failed to send analytics event:', error)
    }
  }

  private storeLocally(event: ConversionEvent): void {
    try {
      const stored = localStorage.getItem('conversion_events') || '[]'
      const events = JSON.parse(stored)
      events.push(event)
      
      // Keep only last 100 events to prevent storage bloat
      if (events.length > 100) {
        events.splice(0, events.length - 100)
      }
      
      localStorage.setItem('conversion_events', JSON.stringify(events))
    } catch (error) {
      console.warn('Failed to store event locally:', error)
    }
  }

  getSessionEvents(): ConversionEvent[] {
    return [...this.events]
  }

  getSessionAnalytics(): {
    sessionDuration: number
    eventsCount: number
    maxScrollDepth: number
    ctaInteractions: number
    conversionCompleted: boolean
  } {
    const now = Date.now()
    const scrollEvents = this.events.filter(e => e.event.startsWith('scroll_depth_'))
    const maxScrollEvent = scrollEvents.reduce((max, event) => {
      const depth = event.properties.scrollDepth || 0
      return depth > max ? depth : max
    }, 0)

    return {
      sessionDuration: now - this.startTime,
      eventsCount: this.events.length,
      maxScrollDepth: maxScrollEvent,
      ctaInteractions: this.events.filter(e => e.event.startsWith('cta_')).length,
      conversionCompleted: this.events.some(e => e.event === 'conversion')
    }
  }

  // A/B Testing support
  trackVariant(testName: string, variant: string): void {
    this.trackEvent('ab_test_view', {
      testName,
      variant,
      timestamp: Date.now()
    })
  }

  // Heat map data collection
  trackMouseMovement(x: number, y: number): void {
    // Throttled mouse tracking for heat maps
    if (!this.lastMouseTrack || Date.now() - this.lastMouseTrack > 1000) {
      this.trackEvent('mouse_position', {
        x,
        y,
        scrollDepth: this.getCurrentScrollDepth(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      })
      this.lastMouseTrack = Date.now()
    }
  }

  private lastMouseTrack: number = 0
}

// Singleton instance
let funnelTracker: ConversionFunnelTracker | null = null

export const initializeFunnelTracking = (userId?: string): ConversionFunnelTracker => {
  if (!funnelTracker) {
    funnelTracker = new ConversionFunnelTracker(userId)
  }
  return funnelTracker
}

export const getFunnelTracker = (): ConversionFunnelTracker | null => {
  return funnelTracker
}

// Utility functions for common tracking scenarios
export const trackPageView = () => {
  const tracker = getFunnelTracker()
  if (tracker) {
    tracker.trackEvent('page_view')
  }
}

export const trackCTAClick = (ctaId: string, ctaType: CTAType, ctaText: string, section: string) => {
  const tracker = getFunnelTracker()
  if (tracker) {
    tracker.trackCTAInteraction('click', {
      ctaId,
      ctaType,
      ctaText,
      section,
      position: {
        x: 0, // Would be populated with actual click coordinates
        y: 0,
        scrollDepth: tracker['getCurrentScrollDepth']()
      },
      timestamp: Date.now(),
      sessionId: tracker['sessionId'],
      userId: tracker['userId']
    })
  }
}

export const trackFormSubmission = (formId: string) => {
  const tracker = getFunnelTracker()
  if (tracker) {
    tracker.trackFormInteraction('complete', { formId })
    tracker.trackConversion('form_submission', 10)
  }
}

export const trackSectionInView = (sectionId: string, sectionName: string) => {
  const tracker = getFunnelTracker()
  if (tracker) {
    tracker.trackSectionView(sectionId, sectionName)
  }
}