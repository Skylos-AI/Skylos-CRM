/**
 * useIntersectionObserver Hook
 * 
 * Custom hook for detecting when elements enter/exit the viewport
 * with performance optimizations and reduced motion support.
 */

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
  skip?: boolean
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement>
  isIntersecting: boolean
  entry: IntersectionObserverEntry | null
}

export function useIntersectionObserver({
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = true,
  skip = false,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [hasTriggered, setHasTriggered] = useState(false)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      setEntry(entry)
      
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        if (triggerOnce) {
          setHasTriggered(true)
        }
      } else if (!triggerOnce) {
        setIsIntersecting(false)
      }
    },
    [triggerOnce]
  )

  useEffect(() => {
    const element = ref.current
    
    if (!element || skip || (triggerOnce && hasTriggered)) {
      return
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsIntersecting(true)
      return
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
      observer.disconnect()
    }
  }, [handleIntersection, threshold, rootMargin, skip, triggerOnce, hasTriggered])

  return { ref, isIntersecting, entry }
}

// Hook for multiple elements
export function useIntersectionObserverMultiple({
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const [entries, setEntries] = useState<Map<Element, IntersectionObserverEntry>>(new Map())
  const observerRef = useRef<IntersectionObserver | null>(null)

  const observe = useCallback((element: Element) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (observerEntries) => {
          setEntries(prev => {
            const newEntries = new Map(prev)
            observerEntries.forEach(entry => {
              newEntries.set(entry.target, entry)
            })
            return newEntries
          })
        },
        { threshold, rootMargin }
      )
    }
    
    observerRef.current.observe(element)
  }, [threshold, rootMargin])

  const unobserve = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { observe, unobserve, entries }
}

// Hook for scroll-triggered animations with performance optimization
export function useScrollAnimation({
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = true,
  delay = 0,
}: UseIntersectionObserverOptions & { delay?: number } = {}) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  })
  
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (isIntersecting) {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setShouldAnimate(true)
        }, delay)
        return () => clearTimeout(timer)
      } else {
        setShouldAnimate(true)
      }
    }
  }, [isIntersecting, delay])

  return { ref, shouldAnimate, isIntersecting }
}