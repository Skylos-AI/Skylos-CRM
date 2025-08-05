/**
 * Performance Audit Utility
 * 
 * Tools for monitoring and optimizing landing page performance
 * including Core Web Vitals and custom metrics.
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  
  // Additional metrics
  fcp: number | null // First Contentful Paint
  ttfb: number | null // Time to First Byte
  tti: number | null // Time to Interactive
  
  // Custom metrics
  heroLoadTime: number | null
  sectionsLoadTime: number | null
  animationFrameRate: number | null
  memoryUsage: number | null
}

export interface PerformanceThresholds {
  lcp: { good: number; needsImprovement: number }
  fid: { good: number; needsImprovement: number }
  cls: { good: number; needsImprovement: number }
  fcp: { good: number; needsImprovement: number }
  ttfb: { good: number; needsImprovement: number }
}

export const PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  fcp: { good: 1800, needsImprovement: 3000 },
  ttfb: { good: 800, needsImprovement: 1800 }
}

export type PerformanceScore = 'good' | 'needs-improvement' | 'poor'

/**
 * Performance Audit Manager
 */
export class PerformanceAudit {
  private metrics: Partial<PerformanceMetrics> = {}
  private observers: PerformanceObserver[] = []
  private startTime: number = performance.now()

  constructor() {
    this.initializeObservers()
  }

  /**
   * Initialize performance observers
   */
  private initializeObservers(): void {
    if (typeof window === 'undefined') return

    // Observe Core Web Vitals
    this.observeLCP()
    this.observeFID()
    this.observeCLS()
    this.observeFCP()
    
    // Observe custom metrics
    this.observeHeroLoadTime()
    this.observeMemoryUsage()
    this.observeAnimationPerformance()
  }

  /**
   * Observe Largest Contentful Paint
   */
  private observeLCP(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number }
        this.metrics.lcp = lastEntry.startTime
      })
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true })
      this.observers.push(observer)
    } catch (error) {
      console.warn('LCP observation not supported:', error)
    }
  }

  /**
   * Observe First Input Delay
   */
  private observeFID(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          this.metrics.fid = entry.processingStart - entry.startTime
        })
      })
      
      observer.observe({ type: 'first-input', buffered: true })
      this.observers.push(observer)
    } catch (error) {
      console.warn('FID observation not supported:', error)
    }
  }

  /**
   * Observe Cumulative Layout Shift
   */
  private observeCLS(): void {
    try {
      let clsValue = 0
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            this.metrics.cls = clsValue
          }
        })
      })
      
      observer.observe({ type: 'layout-shift', buffered: true })
      this.observers.push(observer)
    } catch (error) {
      console.warn('CLS observation not supported:', error)
    }
  }

  /**
   * Observe First Contentful Paint
   */
  private observeFCP(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime
          }
        })
      })
      
      observer.observe({ type: 'paint', buffered: true })
      this.observers.push(observer)
    } catch (error) {
      console.warn('FCP observation not supported:', error)
    }
  }

  /**
   * Observe hero section load time
   */
  private observeHeroLoadTime(): void {
    const heroElement = document.getElementById('hero')
    if (!heroElement) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.metrics.heroLoadTime) {
          this.metrics.heroLoadTime = performance.now() - this.startTime
          observer.disconnect()
        }
      })
    })

    observer.observe(heroElement)
  }

  /**
   * Observe memory usage
   */
  private observeMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      this.metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024 // MB
    }
  }

  /**
   * Observe animation performance
   */
  private observeAnimationPerformance(): void {
    let frameCount = 0
    let lastTime = performance.now()
    let fps = 0

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        this.metrics.animationFrameRate = fps
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measureFPS)
    }

    requestAnimationFrame(measureFPS)
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): Partial<PerformanceMetrics> {
    // Add TTFB from navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      this.metrics.ttfb = navigation.responseStart - navigation.requestStart
    }

    return { ...this.metrics }
  }

  /**
   * Get performance score for a metric
   */
  getScore(metric: keyof PerformanceThresholds, value: number): PerformanceScore {
    const thresholds = PERFORMANCE_THRESHOLDS[metric]
    
    if (value <= thresholds.good) return 'good'
    if (value <= thresholds.needsImprovement) return 'needs-improvement'
    return 'poor'
  }

  /**
   * Get overall performance report
   */
  getReport(): {
    metrics: Partial<PerformanceMetrics>
    scores: Record<string, PerformanceScore>
    recommendations: string[]
  } {
    const metrics = this.getMetrics()
    const scores: Record<string, PerformanceScore> = {}
    const recommendations: string[] = []

    // Calculate scores
    if (metrics.lcp) {
      scores.lcp = this.getScore('lcp', metrics.lcp)
      if (scores.lcp !== 'good') {
        recommendations.push('Optimize Largest Contentful Paint by reducing image sizes and improving server response times')
      }
    }

    if (metrics.fid) {
      scores.fid = this.getScore('fid', metrics.fid)
      if (scores.fid !== 'good') {
        recommendations.push('Reduce First Input Delay by minimizing JavaScript execution time')
      }
    }

    if (metrics.cls) {
      scores.cls = this.getScore('cls', metrics.cls)
      if (scores.cls !== 'good') {
        recommendations.push('Improve Cumulative Layout Shift by setting dimensions for images and ads')
      }
    }

    if (metrics.fcp) {
      scores.fcp = this.getScore('fcp', metrics.fcp)
      if (scores.fcp !== 'good') {
        recommendations.push('Optimize First Contentful Paint by reducing render-blocking resources')
      }
    }

    if (metrics.ttfb) {
      scores.ttfb = this.getScore('ttfb', metrics.ttfb)
      if (scores.ttfb !== 'good') {
        recommendations.push('Improve Time to First Byte by optimizing server response times')
      }
    }

    // Animation performance recommendations
    if (metrics.animationFrameRate && metrics.animationFrameRate < 55) {
      recommendations.push('Optimize animations to maintain 60fps by using CSS transforms and reducing complex calculations')
    }

    // Memory usage recommendations
    if (metrics.memoryUsage && metrics.memoryUsage > 50) {
      recommendations.push('Reduce memory usage by optimizing images and cleaning up event listeners')
    }

    return {
      metrics,
      scores,
      recommendations
    }
  }

  /**
   * Run comprehensive performance audit
   */
  async runAudit(): Promise<{
    coreWebVitals: Record<string, { value: number | null; score: PerformanceScore }>
    customMetrics: Record<string, number | null>
    recommendations: string[]
    overallScore: PerformanceScore
  }> {
    // Wait for metrics to be collected
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const report = this.getReport()
    const { metrics, scores, recommendations } = report

    const coreWebVitals = {
      lcp: { value: metrics.lcp, score: scores.lcp || 'poor' },
      fid: { value: metrics.fid, score: scores.fid || 'poor' },
      cls: { value: metrics.cls, score: scores.cls || 'poor' },
      fcp: { value: metrics.fcp, score: scores.fcp || 'poor' },
      ttfb: { value: metrics.ttfb, score: scores.ttfb || 'poor' }
    }

    const customMetrics = {
      heroLoadTime: metrics.heroLoadTime,
      sectionsLoadTime: metrics.sectionsLoadTime,
      animationFrameRate: metrics.animationFrameRate,
      memoryUsage: metrics.memoryUsage
    }

    // Calculate overall score
    const goodScores = Object.values(scores).filter(score => score === 'good').length
    const totalScores = Object.values(scores).length
    const overallScore: PerformanceScore = 
      goodScores / totalScores >= 0.8 ? 'good' :
      goodScores / totalScores >= 0.5 ? 'needs-improvement' : 'poor'

    return {
      coreWebVitals,
      customMetrics,
      recommendations,
      overallScore
    }
  }

  /**
   * Clean up observers
   */
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

/**
 * Utility functions for performance optimization
 */
export const performanceUtils = {
  /**
   * Preload critical resources
   */
  preloadCriticalResources(resources: Array<{ href: string; as: string; type?: string }>) {
    resources.forEach(({ href, as, type }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      if (type) link.type = type
      document.head.appendChild(link)
    })
  },

  /**
   * Lazy load images with intersection observer
   */
  lazyLoadImages(selector: string = 'img[data-src]') {
    const images = document.querySelectorAll(selector)
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          img.classList.remove('lazy')
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach(img => imageObserver.observe(img))
  },

  /**
   * Optimize animation performance
   */
  optimizeAnimations() {
    // Add will-change property to animated elements
    const animatedElements = document.querySelectorAll('[data-animate]')
    animatedElements.forEach(element => {
      (element as HTMLElement).style.willChange = 'transform, opacity'
    })

    // Remove will-change after animation completes
    document.addEventListener('animationend', (e) => {
      const target = e.target as HTMLElement
      if (target.hasAttribute('data-animate')) {
        target.style.willChange = 'auto'
      }
    })
  },

  /**
   * Monitor and report performance issues
   */
  monitorPerformance() {
    const audit = new PerformanceAudit()
    
    // Report performance issues in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(async () => {
        const report = await audit.runAudit()
        console.group('🚀 Performance Audit Report')
        console.table(report.coreWebVitals)
        console.log('Custom Metrics:', report.customMetrics)
        console.log('Overall Score:', report.overallScore)
        if (report.recommendations.length > 0) {
          console.warn('Recommendations:', report.recommendations)
        }
        console.groupEnd()
        audit.cleanup()
      }, 5000)
    }

    return audit
  }
}