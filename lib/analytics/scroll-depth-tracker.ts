// Scroll depth tracking for analytics

export interface ScrollDepthEvent {
  depth: number
  timestamp: number
  sessionId: string
  url: string
  documentHeight: number
  viewportHeight: number
  timeToReach: number
}

export interface ScrollAnalytics {
  averageScrollDepth: number
  maxScrollDepth: number
  scrollDistribution: Record<string, number>
  bounceRate: number // Users who scroll less than 25%
  engagementRate: number // Users who scroll more than 50%
}

class ScrollDepthTracker {
  private milestones = [25, 50, 75, 100]
  private trackedMilestones = new Set<number>()
  private startTime: number
  private sessionId: string
  private isTracking = false
  private throttleTimeout: number | null = null

  constructor(sessionId: string) {
    this.sessionId = sessionId
    this.startTime = Date.now()
    this.initialize()
  }

  private initialize(): void {
    if (typeof window === 'undefined') return

    // Start tracking when user begins scrolling
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true })
    
    // Track initial viewport
    this.trackInitialView()
    
    // Track when user leaves page
    window.addEventListener('beforeunload', this.handlePageExit.bind(this))
    
    // Track visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this))
  }

  private trackInitialView(): void {
    // Track that user has loaded the page
    this.sendScrollEvent({
      depth: 0,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      url: window.location.href,
      documentHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      timeToReach: 0
    })
  }

  private handleScroll(): void {
    // Throttle scroll events to avoid performance issues
    if (this.throttleTimeout) return

    this.throttleTimeout = window.setTimeout(() => {
      this.checkScrollMilestones()
      this.throttleTimeout = null
    }, 100)
  }

  private checkScrollMilestones(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercentage = Math.round((scrollTop / documentHeight) * 100)

    // Track milestones
    for (const milestone of this.milestones) {
      if (scrollPercentage >= milestone && !this.trackedMilestones.has(milestone)) {
        this.trackedMilestones.add(milestone)
        this.trackScrollMilestone(milestone)
      }
    }

    // Track maximum scroll depth
    this.trackMaxScrollDepth(scrollPercentage)
  }

  private trackScrollMilestone(depth: number): void {
    const event: ScrollDepthEvent = {
      depth,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      url: window.location.href,
      documentHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      timeToReach: Date.now() - this.startTime
    }

    this.sendScrollEvent(event)
    
    // Send to conversion funnel tracker
    if (typeof window !== 'undefined' && (window as any).funnelTracker) {
      (window as any).funnelTracker.trackScrollDepth(depth)
    }
  }

  private trackMaxScrollDepth(depth: number): void {
    // Store maximum scroll depth in session storage
    const currentMax = parseInt(sessionStorage.getItem('maxScrollDepth') || '0')
    if (depth > currentMax) {
      sessionStorage.setItem('maxScrollDepth', depth.toString())
    }
  }

  private handlePageExit(): void {
    const maxScrollDepth = parseInt(sessionStorage.getItem('maxScrollDepth') || '0')
    const timeOnPage = Date.now() - this.startTime

    // Send final scroll analytics
    this.sendScrollEvent({
      depth: maxScrollDepth,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      url: window.location.href,
      documentHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      timeToReach: timeOnPage
    }, 'page_exit')
  }

  private handleVisibilityChange(): void {
    if (document.hidden) {
      // Page became hidden, pause tracking
      this.isTracking = false
    } else {
      // Page became visible, resume tracking
      this.isTracking = true
    }
  }

  private async sendScrollEvent(event: ScrollDepthEvent, eventType = 'scroll_depth'): Promise<void> {
    try {
      // Send to Google Analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll', {
          event_category: 'engagement',
          event_label: `${event.depth}%`,
          value: event.depth,
          custom_map: {
            session_id: event.sessionId,
            time_to_reach: event.timeToReach,
            document_height: event.documentHeight
          }
        })
      }

      // Send to custom analytics endpoint
      await fetch('/api/analytics/scroll-depth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...event,
          eventType
        })
      })

      // Store locally for offline analysis
      this.storeScrollEvent(event)

    } catch (error) {
      console.warn('Failed to send scroll depth event:', error)
    }
  }

  private storeScrollEvent(event: ScrollDepthEvent): void {
    try {
      const stored = localStorage.getItem('scroll_events') || '[]'
      const events = JSON.parse(stored)
      events.push(event)

      // Keep only last 50 events
      if (events.length > 50) {
        events.splice(0, events.length - 50)
      }

      localStorage.setItem('scroll_events', JSON.stringify(events))
    } catch (error) {
      console.warn('Failed to store scroll event locally:', error)
    }
  }

  // Get scroll analytics for current session
  getScrollAnalytics(): ScrollAnalytics {
    const maxScrollDepth = parseInt(sessionStorage.getItem('maxScrollDepth') || '0')
    const trackedMilestones = Array.from(this.trackedMilestones)

    return {
      averageScrollDepth: trackedMilestones.length > 0 
        ? trackedMilestones.reduce((sum, depth) => sum + depth, 0) / trackedMilestones.length 
        : 0,
      maxScrollDepth,
      scrollDistribution: this.getScrollDistribution(),
      bounceRate: maxScrollDepth < 25 ? 1 : 0,
      engagementRate: maxScrollDepth >= 50 ? 1 : 0
    }
  }

  private getScrollDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {
      '0-25%': 0,
      '25-50%': 0,
      '50-75%': 0,
      '75-100%': 0
    }

    const maxScrollDepth = parseInt(sessionStorage.getItem('maxScrollDepth') || '0')

    if (maxScrollDepth >= 0 && maxScrollDepth < 25) {
      distribution['0-25%'] = 1
    } else if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
      distribution['25-50%'] = 1
    } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
      distribution['50-75%'] = 1
    } else if (maxScrollDepth >= 75) {
      distribution['75-100%'] = 1
    }

    return distribution
  }

  // Clean up event listeners
  destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll.bind(this))
      window.removeEventListener('beforeunload', this.handlePageExit.bind(this))
      document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this))
    }

    if (this.throttleTimeout) {
      clearTimeout(this.throttleTimeout)
    }
  }
}

// Section-specific scroll tracking
export class SectionScrollTracker {
  private sections: Map<string, HTMLElement> = new Map()
  private viewedSections = new Set<string>()
  private observer: IntersectionObserver | null = null
  private sessionId: string

  constructor(sessionId: string) {
    this.sessionId = sessionId
    this.initializeObserver()
  }

  private initializeObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section-id')
            if (sectionId && !this.viewedSections.has(sectionId)) {
              this.trackSectionView(sectionId, entry.target as HTMLElement)
            }
          }
        })
      },
      {
        threshold: 0.5, // Section is considered viewed when 50% visible
        rootMargin: '0px 0px -10% 0px' // Trigger slightly before section is fully visible
      }
    )
  }

  registerSection(sectionId: string, element: HTMLElement): void {
    this.sections.set(sectionId, element)
    element.setAttribute('data-section-id', sectionId)
    
    if (this.observer) {
      this.observer.observe(element)
    }
  }

  private trackSectionView(sectionId: string, element: HTMLElement): void {
    this.viewedSections.add(sectionId)

    const sectionName = element.getAttribute('data-section-name') || sectionId
    const scrollDepth = this.getCurrentScrollDepth()
    const timeOnPage = Date.now() - (window as any).pageStartTime || 0

    // Send section view event
    this.sendSectionEvent({
      sectionId,
      sectionName,
      scrollDepth,
      timeOnPage,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      url: window.location.href
    })

    // Notify conversion funnel tracker
    if (typeof window !== 'undefined' && (window as any).funnelTracker) {
      (window as any).funnelTracker.trackSectionView(sectionId, sectionName)
    }
  }

  private getCurrentScrollDepth(): number {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    return Math.round((scrollTop / documentHeight) * 100)
  }

  private async sendSectionEvent(event: {
    sectionId: string
    sectionName: string
    scrollDepth: number
    timeOnPage: number
    timestamp: number
    sessionId: string
    url: string
  }): Promise<void> {
    try {
      // Send to Google Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'section_view', {
          event_category: 'engagement',
          event_label: event.sectionName,
          value: event.scrollDepth,
          custom_map: {
            section_id: event.sectionId,
            time_on_page: event.timeOnPage,
            session_id: event.sessionId
          }
        })
      }

      // Send to custom analytics
      await fetch('/api/analytics/section-views', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })

    } catch (error) {
      console.warn('Failed to send section view event:', error)
    }
  }

  getViewedSections(): string[] {
    return Array.from(this.viewedSections)
  }

  getSectionAnalytics(): {
    totalSections: number
    viewedSections: number
    viewRate: number
    sectionOrder: string[]
  } {
    return {
      totalSections: this.sections.size,
      viewedSections: this.viewedSections.size,
      viewRate: this.sections.size > 0 ? this.viewedSections.size / this.sections.size : 0,
      sectionOrder: Array.from(this.viewedSections)
    }
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect()
    }
    this.sections.clear()
    this.viewedSections.clear()
  }
}

// Initialize scroll tracking
let scrollTracker: ScrollDepthTracker | null = null
let sectionTracker: SectionScrollTracker | null = null

export const initializeScrollTracking = (sessionId: string): {
  scrollTracker: ScrollDepthTracker
  sectionTracker: SectionScrollTracker
} => {
  if (!scrollTracker) {
    scrollTracker = new ScrollDepthTracker(sessionId)
  }
  
  if (!sectionTracker) {
    sectionTracker = new SectionScrollTracker(sessionId)
  }

  return { scrollTracker, sectionTracker }
}

export const getScrollTracker = () => scrollTracker
export const getSectionTracker = () => sectionTracker

// Utility functions
export const trackScrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    
    // Track the scroll action
    if (scrollTracker) {
      const scrollTop = element.offsetTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100)
      
      // Send custom scroll event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_to_element', {
          event_category: 'navigation',
          event_label: elementId,
          value: scrollPercentage
        })
      }
    }
  }
}