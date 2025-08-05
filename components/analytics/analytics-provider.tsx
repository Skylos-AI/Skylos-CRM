"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  initializeFunnelTracking, 
  getFunnelTracker,
  type ConversionEvent 
} from '@/lib/analytics/conversion-funnel'
import { 
  initializeScrollTracking, 
  getScrollTracker, 
  getSectionTracker 
} from '@/lib/analytics/scroll-depth-tracker'
import { 
  initializeABTesting, 
  getABTestManager,
  type ABVariant 
} from '@/lib/analytics/ab-testing'

interface AnalyticsContextType {
  sessionId: string
  userId?: string
  trackEvent: (event: string, properties?: Record<string, any>, value?: number) => void
  trackConversion: (conversionType: string, value?: number) => void
  trackCTAClick: (ctaId: string, ctaType: string, ctaText: string, section: string) => void
  trackSectionView: (sectionId: string, sectionName: string) => void
  trackFormInteraction: (action: string, formData: any) => void
  getABVariant: (testId: string) => ABVariant | null
  getABConfig: (testId: string) => Record<string, any>
  isInABTest: (testId: string) => boolean
  trackABConversion: (testId: string, conversionType: string, value?: number) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

interface AnalyticsProviderProps {
  children: ReactNode
  userId?: string
  enableScrollTracking?: boolean
  enableABTesting?: boolean
  enablePerformanceTracking?: boolean
}

export function AnalyticsProvider({
  children,
  userId,
  enableScrollTracking = true,
  enableABTesting = true,
  enablePerformanceTracking = true
}: AnalyticsProviderProps) {
  const [sessionId] = useState(() => 
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  )
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Initialize analytics systems
    const initializeAnalytics = async () => {
      try {
        // Initialize conversion funnel tracking
        initializeFunnelTracking(userId)

        // Initialize scroll tracking
        if (enableScrollTracking) {
          initializeScrollTracking(sessionId)
        }

        // Initialize A/B testing
        if (enableABTesting) {
          initializeABTesting(sessionId, userId)
        }

        // Initialize performance tracking
        if (enablePerformanceTracking) {
          initializePerformanceTracking()
        }

        // Set page start time for analytics
        ;(window as any).pageStartTime = Date.now()

        setIsInitialized(true)
      } catch (error) {
        console.warn('Failed to initialize analytics:', error)
      }
    }

    initializeAnalytics()

    // Track page unload
    const handleBeforeUnload = () => {
      const tracker = getFunnelTracker()
      if (tracker) {
        const analytics = tracker.getSessionAnalytics()
        
        // Send final session data
        navigator.sendBeacon('/api/analytics/session-end', JSON.stringify({
          sessionId,
          userId,
          ...analytics,
          timestamp: Date.now()
        }))
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      
      // Clean up trackers
      const scrollTracker = getScrollTracker()
      const sectionTracker = getSectionTracker()
      
      if (scrollTracker) {
        scrollTracker.destroy()
      }
      
      if (sectionTracker) {
        sectionTracker.destroy()
      }
    }
  }, [sessionId, userId, enableScrollTracking, enableABTesting, enablePerformanceTracking])

  const trackEvent = (event: string, properties: Record<string, any> = {}, value?: number) => {
    const tracker = getFunnelTracker()
    if (tracker) {
      tracker.trackEvent(event, properties, value)
    }
  }

  const trackConversion = (conversionType: string, value?: number) => {
    const tracker = getFunnelTracker()
    if (tracker) {
      tracker.trackConversion(conversionType, value)
    }
  }

  const trackCTAClick = (ctaId: string, ctaType: string, ctaText: string, section: string) => {
    const tracker = getFunnelTracker()
    if (tracker) {
      tracker.trackCTAInteraction('click', {
        ctaId,
        ctaType: ctaType as any,
        ctaText,
        section,
        position: {
          x: 0, // Would be populated with actual coordinates
          y: 0,
          scrollDepth: getCurrentScrollDepth()
        },
        timestamp: Date.now(),
        sessionId,
        userId
      })
    }
  }

  const trackSectionView = (sectionId: string, sectionName: string) => {
    const tracker = getFunnelTracker()
    if (tracker) {
      tracker.trackSectionView(sectionId, sectionName)
    }
  }

  const trackFormInteraction = (action: string, formData: any) => {
    const tracker = getFunnelTracker()
    if (tracker) {
      tracker.trackFormInteraction(action as any, formData)
    }
  }

  const getABVariant = (testId: string): ABVariant | null => {
    const manager = getABTestManager()
    return manager ? manager.getVariant(testId) : null
  }

  const getABConfig = (testId: string): Record<string, any> => {
    const manager = getABTestManager()
    return manager ? manager.getVariantConfig(testId) : {}
  }

  const isInABTest = (testId: string): boolean => {
    const manager = getABTestManager()
    return manager ? manager.isInTest(testId) : false
  }

  const trackABConversion = (testId: string, conversionType: string, value?: number) => {
    const manager = getABTestManager()
    if (manager) {
      manager.trackConversion(testId, conversionType, value)
    }
  }

  const contextValue: AnalyticsContextType = {
    sessionId,
    userId,
    trackEvent,
    trackConversion,
    trackCTAClick,
    trackSectionView,
    trackFormInteraction,
    getABVariant,
    getABConfig,
    isInABTest,
    trackABConversion
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  )
}

// Helper function
const getCurrentScrollDepth = (): number => {
  if (typeof window === 'undefined') return 0
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight
  return Math.round((scrollTop / documentHeight) * 100)
}

// Performance tracking initialization
const initializePerformanceTracking = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  // Track Core Web Vitals
  try {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => {
        sendPerformanceMetric('CLS', metric.value, metric)
      })

      getFID((metric) => {
        sendPerformanceMetric('FID', metric.value, metric)
      })

      getFCP((metric) => {
        sendPerformanceMetric('FCP', metric.value, metric)
      })

      getLCP((metric) => {
        sendPerformanceMetric('LCP', metric.value, metric)
      })

      getTTFB((metric) => {
        sendPerformanceMetric('TTFB', metric.value, metric)
      })
    })
  } catch (error) {
    console.warn('Failed to load web-vitals:', error)
  }

  // Track custom performance metrics
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming
        sendPerformanceMetric('page_load_time', navEntry.loadEventEnd - navEntry.fetchStart)
      }
      
      if (entry.entryType === 'paint') {
        sendPerformanceMetric(entry.name, entry.startTime)
      }
    })
  })

  observer.observe({ entryTypes: ['navigation', 'paint'] })
}

const sendPerformanceMetric = async (name: string, value: number, details?: any) => {
  try {
    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        event_category: 'performance',
        event_label: name,
        value: Math.round(value),
        custom_map: details
      })
    }

    // Send to custom endpoint
    await fetch('/api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        metric: name,
        value,
        details,
        timestamp: Date.now(),
        url: window.location.href
      })
    })
  } catch (error) {
    console.warn('Failed to send performance metric:', error)
  }
}

// Hook to use analytics
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

// Hook for section tracking
export const useSectionTracking = (sectionId: string, sectionName: string) => {
  const { trackSectionView } = useAnalytics()
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView(sectionId, sectionName)
          }
        })
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById(sectionId)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [sectionId, sectionName, trackSectionView])
}

// Hook for CTA tracking
export const useCTATracking = () => {
  const { trackCTAClick } = useAnalytics()

  const trackClick = (ctaId: string, ctaType: string, ctaText: string, section: string) => {
    trackCTAClick(ctaId, ctaType, ctaText, section)
  }

  return { trackClick }
}

// Hook for A/B testing
export const useABTest = (testId: string) => {
  const { getABVariant, getABConfig, isInABTest, trackABConversion } = useAnalytics()
  
  const variant = getABVariant(testId)
  const config = getABConfig(testId)
  const inTest = isInABTest(testId)

  return {
    variant,
    config,
    isInTest: inTest,
    trackConversion: (conversionType: string, value?: number) => 
      trackABConversion(testId, conversionType, value)
  }
}