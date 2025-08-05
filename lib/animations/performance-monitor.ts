/**
 * Animation Performance Monitor
 * 
 * Utilities for monitoring animation performance and providing
 * adaptive animation quality based on device capabilities.
 */

import React from 'react'

interface PerformanceMetrics {
  fps: number
  frameDrops: number
  renderTime: number
  memoryUsage?: number
}

interface AnimationQualitySettings {
  enableComplexAnimations: boolean
  staggerDelay: number
  animationDuration: number
  enableParallax: boolean
  enableBlur: boolean
}

class AnimationPerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 60,
    frameDrops: 0,
    renderTime: 0,
  }
  
  private frameCount = 0
  private lastTime = performance.now()
  private isMonitoring = false
  private animationFrame: number | null = null
  private observers: ((metrics: PerformanceMetrics) => void)[] = []

  // Start monitoring performance
  startMonitoring() {
    if (this.isMonitoring) return
    
    this.isMonitoring = true
    this.frameCount = 0
    this.lastTime = performance.now()
    this.measurePerformance()
  }

  // Stop monitoring performance
  stopMonitoring() {
    this.isMonitoring = false
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
  }

  // Subscribe to performance updates
  subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.observers.push(callback)
    return () => {
      this.observers = this.observers.filter(obs => obs !== callback)
    }
  }

  // Get current performance metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  // Measure performance continuously
  private measurePerformance = () => {
    if (!this.isMonitoring) return

    const currentTime = performance.now()
    this.frameCount++

    // Calculate FPS every second
    if (currentTime - this.lastTime >= 1000) {
      const fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
      
      this.metrics = {
        ...this.metrics,
        fps,
        frameDrops: fps < 55 ? this.metrics.frameDrops + 1 : this.metrics.frameDrops,
      }

      // Add memory usage if available
      if ('memory' in performance) {
        this.metrics.memoryUsage = (performance as any).memory.usedJSHeapSize
      }

      // Notify observers
      this.observers.forEach(callback => callback(this.metrics))

      this.frameCount = 0
      this.lastTime = currentTime
    }

    this.animationFrame = requestAnimationFrame(this.measurePerformance)
  }

  // Check if device can handle complex animations
  canHandleComplexAnimations(): boolean {
    const { fps, frameDrops } = this.metrics
    
    // Basic device capability checks
    const hasWebGL = this.hasWebGLSupport()
    const hasHighDPI = window.devicePixelRatio > 1
    const isMobile = this.isMobileDevice()
    const hasGoodPerformance = fps >= 55 && frameDrops < 5

    return hasWebGL && !isMobile && hasGoodPerformance
  }

  // Get recommended animation quality settings
  getQualitySettings(): AnimationQualitySettings {
    const canHandleComplex = this.canHandleComplexAnimations()
    const { fps } = this.metrics
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return {
        enableComplexAnimations: false,
        staggerDelay: 0,
        animationDuration: 0.1,
        enableParallax: false,
        enableBlur: false,
      }
    }

    if (canHandleComplex && fps >= 58) {
      return {
        enableComplexAnimations: true,
        staggerDelay: 0.1,
        animationDuration: 0.6,
        enableParallax: true,
        enableBlur: true,
      }
    }

    if (fps >= 45) {
      return {
        enableComplexAnimations: false,
        staggerDelay: 0.05,
        animationDuration: 0.4,
        enableParallax: false,
        enableBlur: false,
      }
    }

    // Low performance mode
    return {
      enableComplexAnimations: false,
      staggerDelay: 0,
      animationDuration: 0.2,
      enableParallax: false,
      enableBlur: false,
    }
  }

  // Helper methods
  private hasWebGLSupport(): boolean {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      return !!gl
    } catch {
      return false
    }
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  // Measure specific animation performance
  measureAnimationPerformance<T>(
    animationFn: () => Promise<T>,
    name: string
  ): Promise<{ result: T; metrics: { duration: number; fps: number } }> {
    return new Promise((resolve) => {
      const startTime = performance.now()
      let frameCount = 0
      
      const measureFrame = () => {
        frameCount++
        requestAnimationFrame(measureFrame)
      }
      
      requestAnimationFrame(measureFrame)
      
      animationFn().then((result) => {
        const endTime = performance.now()
        const duration = endTime - startTime
        const fps = Math.round((frameCount * 1000) / duration)
        
        resolve({
          result,
          metrics: { duration, fps }
        })
      })
    })
  }
}

// Global performance monitor instance
export const performanceMonitor = new AnimationPerformanceMonitor()

// React hook for using performance monitoring
export function useAnimationPerformance() {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics>(() => 
    performanceMonitor.getMetrics()
  )
  const [qualitySettings, setQualitySettings] = React.useState<AnimationQualitySettings>(() =>
    performanceMonitor.getQualitySettings()
  )

  React.useEffect(() => {
    performanceMonitor.startMonitoring()
    
    const unsubscribe = performanceMonitor.subscribe((newMetrics) => {
      setMetrics(newMetrics)
      setQualitySettings(performanceMonitor.getQualitySettings())
    })

    return () => {
      unsubscribe()
      performanceMonitor.stopMonitoring()
    }
  }, [])

  return {
    metrics,
    qualitySettings,
    canHandleComplexAnimations: performanceMonitor.canHandleComplexAnimations(),
  }
}

// Adaptive animation hook that adjusts based on performance
export function useAdaptiveAnimation() {
  const { qualitySettings } = useAnimationPerformance()
  
  return {
    duration: qualitySettings.animationDuration,
    staggerDelay: qualitySettings.staggerDelay,
    enableComplex: qualitySettings.enableComplexAnimations,
    enableParallax: qualitySettings.enableParallax,
    enableBlur: qualitySettings.enableBlur,
  }
}

// Performance-aware animation variants
export function getPerformanceAwareVariants(baseVariants: any, qualitySettings: AnimationQualitySettings) {
  if (!qualitySettings.enableComplexAnimations) {
    // Simplified variants for low-performance devices
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { duration: qualitySettings.animationDuration }
      },
    }
  }

  // Enhanced variants with adjusted timing
  return {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVariants.visible.transition,
        duration: qualitySettings.animationDuration,
        staggerChildren: qualitySettings.staggerDelay,
      },
    },
  }
}

// Utility for conditional animation features
export function shouldEnableFeature(feature: keyof AnimationQualitySettings): boolean {
  const settings = performanceMonitor.getQualitySettings()
  return settings[feature] as boolean
}

export default performanceMonitor