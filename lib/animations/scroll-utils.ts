/**
 * Scroll Animation Utilities
 * 
 * Performance-optimized utilities for scroll-based animations
 * with throttling, debouncing, and reduced motion support.
 */

import { useEffect, useState, useCallback, useRef } from 'react'

// Throttle function for performance optimization
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Debounce function for scroll end detection
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// Hook for scroll position tracking
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  })

  const updatePosition = useCallback(
    throttle(() => {
      setScrollPosition({
        x: window.pageXOffset,
        y: window.pageYOffset,
      })
    }, 16), // ~60fps
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', updatePosition, { passive: true })
    return () => window.removeEventListener('scroll', updatePosition)
  }, [updatePosition])

  return scrollPosition
}

// Hook for scroll progress (0-1)
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(
    throttle(() => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setProgress(progress)
    }, 16),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress() // Initial calculation
    return () => window.removeEventListener('scroll', updateProgress)
  }, [updateProgress])

  return progress
}

// Hook for scroll direction detection
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const lastScrollY = useRef(0)

  const updateScrollDirection = useCallback(
    throttle(() => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY.current ? 'down' : 'up'
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY.current) > 10) {
        setScrollDirection(direction)
      }
      
      lastScrollY.current = scrollY
    }, 16),
    [scrollDirection]
  )

  useEffect(() => {
    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [updateScrollDirection])

  return scrollDirection
}

// Hook for detecting when user stops scrolling
export function useScrollEnd(delay: number = 150) {
  const [isScrolling, setIsScrolling] = useState(false)

  const handleScrollStart = useCallback(() => {
    setIsScrolling(true)
  }, [])

  const handleScrollEnd = useCallback(
    debounce(() => {
      setIsScrolling(false)
    }, delay),
    [delay]
  )

  useEffect(() => {
    const handleScroll = () => {
      handleScrollStart()
      handleScrollEnd()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScrollStart, handleScrollEnd])

  return isScrolling
}

// Hook for element scroll progress
export function useElementScrollProgress(elementRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(
    throttle(() => {
      if (!elementRef.current) return

      const element = elementRef.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how much of the element is visible
      const elementTop = rect.top
      const elementHeight = rect.height
      
      // Element is fully above viewport
      if (elementTop + elementHeight < 0) {
        setProgress(1)
        return
      }
      
      // Element is fully below viewport
      if (elementTop > windowHeight) {
        setProgress(0)
        return
      }
      
      // Calculate progress based on element position
      const visibleHeight = Math.min(windowHeight - elementTop, elementHeight)
      const progress = Math.max(0, Math.min(1, visibleHeight / elementHeight))
      
      setProgress(progress)
    }, 16),
    [elementRef]
  )

  useEffect(() => {
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    updateProgress() // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress])

  return progress
}

// Hook for parallax scrolling effect
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)

  const updateOffset = useCallback(
    throttle(() => {
      const scrollY = window.pageYOffset
      setOffset(scrollY * speed)
    }, 16),
    [speed]
  )

  useEffect(() => {
    window.addEventListener('scroll', updateOffset, { passive: true })
    return () => window.removeEventListener('scroll', updateOffset)
  }, [updateOffset])

  return offset
}

// Hook for scroll-based animations with performance monitoring
export function useScrollAnimation({
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = true,
  performanceMode = false,
}: {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  performanceMode?: boolean
} = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    frameDrops: 0,
  })
  const elementRef = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const startTime = useRef<number>(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      
      if (performanceMode) {
        startTime.current = performance.now()
      }

      if (entry.isIntersecting) {
        setIsVisible(true)
        
        if (triggerOnce && observerRef.current) {
          observerRef.current.unobserve(element)
        }
      } else if (!triggerOnce) {
        setIsVisible(false)
      }

      if (performanceMode) {
        const renderTime = performance.now() - startTime.current
        setPerformanceMetrics(prev => ({
          renderTime,
          frameDrops: renderTime > 16.67 ? prev.frameDrops + 1 : prev.frameDrops,
        }))
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin, triggerOnce, performanceMode])

  return {
    ref: elementRef,
    isVisible,
    performanceMetrics: performanceMode ? performanceMetrics : null,
  }
}

// Utility function to calculate scroll velocity
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTimestamp = useRef(0)

  const updateVelocity = useCallback(
    throttle(() => {
      const now = performance.now()
      const scrollY = window.pageYOffset
      
      if (lastTimestamp.current) {
        const deltaY = scrollY - lastScrollY.current
        const deltaTime = now - lastTimestamp.current
        const velocity = Math.abs(deltaY / deltaTime)
        setVelocity(velocity)
      }
      
      lastScrollY.current = scrollY
      lastTimestamp.current = now
    }, 16),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', updateVelocity, { passive: true })
    return () => window.removeEventListener('scroll', updateVelocity)
  }, [updateVelocity])

  return velocity
}

// Utility function for smooth scrolling to element
export function scrollToElement(
  elementId: string,
  options: {
    behavior?: ScrollBehavior
    block?: ScrollLogicalPosition
    inline?: ScrollLogicalPosition
    offset?: number
  } = {}
) {
  const element = document.getElementById(elementId)
  if (!element) return

  const { behavior = 'smooth', block = 'start', inline = 'nearest', offset = 0 } = options

  if (offset !== 0) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior,
    })
  } else {
    element.scrollIntoView({
      behavior,
      block,
      inline,
    })
  }
}

// Performance monitoring utilities
export const performanceUtils = {
  // Monitor frame rate during animations
  monitorFrameRate: (callback: (fps: number) => void) => {
    let lastTime = performance.now()
    let frameCount = 0

    const measureFPS = () => {
      const currentTime = performance.now()
      frameCount++

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        callback(fps)
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(measureFPS)
    }

    requestAnimationFrame(measureFPS)
  },

  // Check if device can handle complex animations
  canHandleComplexAnimations: () => {
    // Simple heuristic based on device capabilities
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const hasWebGL = !!gl
    const hasHighDPI = window.devicePixelRatio > 1
    const hasTouch = 'ontouchstart' in window
    
    return hasWebGL && !hasTouch && navigator.hardwareConcurrency > 2
  },

  // Adaptive animation quality based on performance
  getAnimationQuality: () => {
    const canHandleComplex = performanceUtils.canHandleComplexAnimations()
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) return 'none'
    if (canHandleComplex) return 'high'
    return 'low'
  },
}