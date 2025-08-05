/**
 * Conversion Tracking
 * 
 * Analytics and conversion tracking utilities for measuring
 * user interactions and CTA performance.
 */

// Event types for tracking
export interface TrackingEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  userId?: string
  sessionId?: string
  timestamp: number
  metadata?: Record<string, any>
}

// CTA tracking events
export interface CTAEvent extends TrackingEvent {
  ctaId: string
  ctaText: string
  ctaPosition: string
  ctaType: 'primary' | 'secondary' | 'tertiary'
  pageSection: string
}

// Conversion funnel steps
export enum ConversionStep {
  LANDING = 'landing',
  HERO_VIEW = 'hero_view',
  CTA_CLICK = 'cta_click',
  FORM_START = 'form_start',
  FORM_SUBMIT = 'form_submit',
  SIGNUP_COMPLETE = 'signup_complete',
  TRIAL_START = 'trial_start',
  CONVERSION = 'conversion',
}

// Analytics provider interface
interface AnalyticsProvider {
  track(event: TrackingEvent): void
  identify(userId: string, traits?: Record<string, any>): void
  page(name: string, properties?: Record<string, any>): void
}

// Google Analytics 4 provider
class GA4Provider implements AnalyticsProvider {
  private gtag: any

  constructor() {
    this.gtag = (window as any).gtag
  }

  track(event: TrackingEvent): void {
    if (!this.gtag) return

    this.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      custom_parameters: event.metadata,
    })
  }

  identify(userId: string, traits?: Record<string, any>): void {
    if (!this.gtag) return

    this.gtag('config', 'GA_MEASUREMENT_ID', {
      user_id: userId,
      custom_map: traits,
    })
  }

  page(name: string, properties?: Record<string, any>): void {
    if (!this.gtag) return

    this.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: name,
      page_location: window.location.href,
      ...properties,
    })
  }
}

// Custom analytics provider for internal tracking
class CustomAnalyticsProvider implements AnalyticsProvider {
  private events: TrackingEvent[] = []
  private endpoint = '/api/analytics'

  track(event: TrackingEvent): void {
    this.events.push(event)
    this.sendEvent(event)
  }

  identify(userId: string, traits?: Record<string, any>): void {
    const event: TrackingEvent = {
      event: 'identify',
      category: 'user',
      action: 'identify',
      timestamp: Date.now(),
      userId,
      metadata: traits,
    }
    this.track(event)
  }

  page(name: string, properties?: Record<string, any>): void {
    const event: TrackingEvent = {
      event: 'page_view',
      category: 'navigation',
      action: 'page_view',
      label: name,
      timestamp: Date.now(),
      metadata: {
        url: window.location.href,
        referrer: document.referrer,
        ...properties,
      },
    }
    this.track(event)
  }

  private async sendEvent(event: TrackingEvent): Promise<void> {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
    } catch (error) {
      console.warn('Failed to send analytics event:', error)
    }
  }

  getEvents(): TrackingEvent[] {
    return [...this.events]
  }

  clearEvents(): void {
    this.events = []
  }
}

// Main analytics class
class Analytics {
  private providers: AnalyticsProvider[] = []
  private sessionId: string
  private userId?: string

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initializeProviders()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeProviders(): void {
    // Add GA4 provider if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      this.providers.push(new GA4Provider())
    }

    // Add custom provider
    this.providers.push(new CustomAnalyticsProvider())
  }

  // Track generic events
  track(event: Omit<TrackingEvent, 'timestamp' | 'sessionId'>): void {
    const fullEvent: TrackingEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
    }

    this.providers.forEach(provider => provider.track(fullEvent))
  }

  // Track CTA clicks
  trackCTA(ctaData: {
    ctaId: string
    ctaText: string
    ctaPosition: string
    ctaType: 'primary' | 'secondary' | 'tertiary'
    pageSection: string
    metadata?: Record<string, any>
  }): void {
    const event: CTAEvent = {
      event: 'cta_click',
      category: 'engagement',
      action: 'cta_click',
      label: ctaData.ctaText,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...ctaData,
    }

    this.providers.forEach(provider => provider.track(event))
  }

  // Track conversion funnel steps
  trackConversionStep(step: ConversionStep, metadata?: Record<string, any>): void {
    this.track({
      event: 'conversion_step',
      category: 'conversion',
      action: step,
      label: step,
      metadata,
    })
  }

  // Track scroll depth
  trackScrollDepth(depth: number): void {
    const milestone = Math.floor(depth / 25) * 25 // Track in 25% increments
    
    if (milestone > 0 && milestone <= 100) {
      this.track({
        event: 'scroll_depth',
        category: 'engagement',
        action: 'scroll',
        label: `${milestone}%`,
        value: milestone,
      })
    }
  }

  // Track time on page
  trackTimeOnPage(seconds: number): void {
    const milestone = this.getTimeMilestone(seconds)
    
    if (milestone) {
      this.track({
        event: 'time_on_page',
        category: 'engagement',
        action: 'time_spent',
        label: milestone,
        value: seconds,
      })
    }
  }

  private getTimeMilestone(seconds: number): string | null {
    if (seconds >= 300) return '5min+'
    if (seconds >= 180) return '3min'
    if (seconds >= 120) return '2min'
    if (seconds >= 60) return '1min'
    if (seconds >= 30) return '30sec'
    if (seconds >= 15) return '15sec'
    return null
  }

  // Track form interactions
  trackFormInteraction(formId: string, action: 'start' | 'field_focus' | 'field_blur' | 'submit' | 'error', metadata?: Record<string, any>): void {
    this.track({
      event: 'form_interaction',
      category: 'form',
      action: `form_${action}`,
      label: formId,
      metadata,
    })
  }

  // Track video interactions
  trackVideoInteraction(videoId: string, action: 'play' | 'pause' | 'complete' | 'seek', metadata?: Record<string, any>): void {
    this.track({
      event: 'video_interaction',
      category: 'media',
      action: `video_${action}`,
      label: videoId,
      metadata,
    })
  }

  // Track search interactions
  trackSearch(query: string, results: number): void {
    this.track({
      event: 'search',
      category: 'search',
      action: 'search_query',
      label: query,
      value: results,
    })
  }

  // Track error events
  trackError(error: string, context?: string): void {
    this.track({
      event: 'error',
      category: 'error',
      action: 'javascript_error',
      label: error,
      metadata: {
        context,
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    })
  }

  // Identify user
  identify(userId: string, traits?: Record<string, any>): void {
    this.userId = userId
    this.providers.forEach(provider => provider.identify(userId, traits))
  }

  // Track page views
  page(name: string, properties?: Record<string, any>): void {
    this.providers.forEach(provider => provider.page(name, properties))
  }

  // Get session data
  getSessionData(): { sessionId: string; userId?: string } {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
    }
  }
}

// Global analytics instance
export const analytics = new Analytics()

// React hooks for analytics
export function useAnalytics() {
  return analytics
}

// Hook for tracking scroll depth
export function useScrollDepthTracking() {
  React.useEffect(() => {
    let lastDepth = 0
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const depth = Math.round((scrollTop / docHeight) * 100)
      
      if (depth > lastDepth && depth % 25 === 0) {
        analytics.trackScrollDepth(depth)
        lastDepth = depth
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

// Hook for tracking time on page
export function useTimeOnPageTracking() {
  React.useEffect(() => {
    const startTime = Date.now()
    let lastMilestone = 0

    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      const milestone = Math.floor(timeSpent / 15) * 15 // Every 15 seconds
      
      if (milestone > lastMilestone) {
        analytics.trackTimeOnPage(timeSpent)
        lastMilestone = milestone
      }
    }, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [])
}

// Hook for tracking CTA clicks
export function useCTATracking() {
  const trackCTAClick = React.useCallback((ctaData: Parameters<typeof analytics.trackCTA>[0]) => {
    analytics.trackCTA(ctaData)
  }, [])

  return { trackCTAClick }
}

// Hook for tracking conversion funnel
export function useConversionTracking() {
  const trackStep = React.useCallback((step: ConversionStep, metadata?: Record<string, any>) => {
    analytics.trackConversionStep(step, metadata)
  }, [])

  return { trackStep }
}

// Export types and enums
export type { TrackingEvent, CTAEvent }
export { ConversionStep }

// Import React for hooks
import React from 'react'