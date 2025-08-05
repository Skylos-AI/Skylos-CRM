"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { initWebVitals, PerformanceMonitor } from '@/lib/performance/web-vitals'
import { preloadAnimationLibraries } from '@/lib/utils/dynamic-imports'
import { preloadImages } from '@/lib/utils/image-optimization'

interface PerformanceContextType {
  isOptimized: boolean
  webVitalsEnabled: boolean
  preloadingComplete: boolean
  performanceScore: number
}

const PerformanceContext = createContext<PerformanceContextType>({
  isOptimized: false,
  webVitalsEnabled: false,
  preloadingComplete: false,
  performanceScore: 0,
})

export function usePerformance() {
  return useContext(PerformanceContext)
}

interface PerformanceProviderProps {
  children: React.ReactNode
  enableWebVitals?: boolean
  preloadCriticalImages?: Array<{ src: string; options?: any }>
  enableResourceMonitoring?: boolean
}

export function PerformanceProvider({
  children,
  enableWebVitals = true,
  preloadCriticalImages = [],
  enableResourceMonitoring = true,
}: PerformanceProviderProps) {
  const [isOptimized, setIsOptimized] = useState(false)
  const [webVitalsEnabled, setWebVitalsEnabled] = useState(false)
  const [preloadingComplete, setPreloadingComplete] = useState(false)
  const [performanceScore, setPerformanceScore] = useState(0)

  useEffect(() => {
    let mounted = true

    async function initializePerformance() {
      try {
        // Initialize Web Vitals monitoring
        if (enableWebVitals) {
          initWebVitals()
          if (mounted) setWebVitalsEnabled(true)
        }

        // Start performance monitoring
        if (enableResourceMonitoring) {
          const monitor = PerformanceMonitor.getInstance()
          monitor.monitorAnimations()
          monitor.monitorResources()
          monitor.monitorLongTasks()
        }

        // Preload critical resources
        const preloadPromises = []

        // Preload animation libraries
        preloadPromises.push(preloadAnimationLibraries())

        // Preload critical images
        if (preloadCriticalImages.length > 0) {
          preloadPromises.push(preloadImages(preloadCriticalImages))
        }

        await Promise.allSettled(preloadPromises)
        
        if (mounted) {
          setPreloadingComplete(true)
          setIsOptimized(true)
          
          // Calculate initial performance score
          calculatePerformanceScore()
        }
      } catch (error) {
        console.warn('Performance initialization failed:', error)
        if (mounted) {
          setIsOptimized(true) // Still mark as optimized to prevent blocking
        }
      }
    }

    initializePerformance()

    return () => {
      mounted = false
      
      // Cleanup performance monitoring
      if (enableResourceMonitoring) {
        const monitor = PerformanceMonitor.getInstance()
        monitor.disconnect()
      }
    }
  }, [enableWebVitals, enableResourceMonitoring, preloadCriticalImages])

  const calculatePerformanceScore = () => {
    if (typeof window === 'undefined') return

    let score = 100

    // Check connection speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection.effectiveType === '2g') score -= 30
      else if (connection.effectiveType === '3g') score -= 15
    }

    // Check device memory
    if ('deviceMemory' in navigator) {
      const memory = (navigator as any).deviceMemory
      if (memory < 4) score -= 20
      else if (memory < 8) score -= 10
    }

    // Check hardware concurrency
    if (navigator.hardwareConcurrency < 4) {
      score -= 15
    }

    // Check if mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      score -= 10
    }

    setPerformanceScore(Math.max(0, score))
  }

  const contextValue: PerformanceContextType = {
    isOptimized,
    webVitalsEnabled,
    preloadingComplete,
    performanceScore,
  }

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  )
}

// Performance-aware component wrapper
export function withPerformanceOptimization<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    fallback?: React.ComponentType<P>
    minPerformanceScore?: number
  } = {}
) {
  const { fallback: Fallback, minPerformanceScore = 50 } = options

  return function PerformanceOptimizedComponent(props: P) {
    const { performanceScore, isOptimized } = usePerformance()

    // Show fallback for low-performance devices
    if (isOptimized && performanceScore < minPerformanceScore && Fallback) {
      return <Fallback {...props} />
    }

    return <Component {...props} />
  }
}

// Hook for conditional feature enabling based on performance
export function usePerformanceFeatures() {
  const { performanceScore, isOptimized } = usePerformance()

  return {
    enableComplexAnimations: performanceScore >= 70,
    enableParallax: performanceScore >= 80,
    enableBlur: performanceScore >= 60,
    enableAutoplay: performanceScore >= 50,
    enableHighQualityImages: performanceScore >= 60,
    maxConcurrentAnimations: performanceScore >= 80 ? 10 : performanceScore >= 60 ? 5 : 2,
    isOptimized,
  }
}