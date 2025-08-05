/**
 * useFloatingNavigation Hook
 * 
 * Custom hook for managing floating navigation state, scroll progress,
 * active sections, and exit intent detection.
 */

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  scrollToElement, 
  getScrollProgress, 
  ScrollSpy,
  SmoothScrollOptions 
} from '@/lib/utils/smooth-scroll'

interface NavigationSection {
  id: string
  selector: string
  label: string
}

interface UseFloatingNavigationOptions {
  sections: NavigationSection[]
  scrollOffset?: number
  visibilityThreshold?: number
  exitIntentEnabled?: boolean
  progressUpdateInterval?: number
}

interface UseFloatingNavigationReturn {
  // State
  isVisible: boolean
  activeSection: string
  scrollProgress: number
  showExitIntent: boolean
  
  // Actions
  navigateToSection: (sectionId: string, options?: SmoothScrollOptions) => Promise<void>
  scrollToTop: (options?: SmoothScrollOptions) => Promise<void>
  setExitIntentVisible: (visible: boolean) => void
  
  // Utilities
  getSectionElement: (sectionId: string) => HTMLElement | null
  isAtTop: boolean
  isAtBottom: boolean
}

export function useFloatingNavigation({
  sections,
  scrollOffset = 100,
  visibilityThreshold = 100,
  exitIntentEnabled = true,
  progressUpdateInterval = 16
}: UseFloatingNavigationOptions): UseFloatingNavigationReturn {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  const scrollSpyRef = useRef<ScrollSpy | null>(null)
  const exitIntentTriggered = useRef(false)
  const lastScrollY = useRef(0)

  // Initialize scroll spy
  useEffect(() => {
    if (sections.length === 0) return

    scrollSpyRef.current = new ScrollSpy(
      sections,
      setActiveSection,
      scrollOffset
    )

    return () => {
      scrollSpyRef.current?.destroy()
    }
  }, [sections, scrollOffset])

  // Handle scroll events for visibility and progress
  useEffect(() => {
    let animationFrameId: number

    const updateScrollState = () => {
      const scrollY = window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Update visibility
      setIsVisible(scrollY > visibilityThreshold)

      // Update scroll progress
      const progress = getScrollProgress()
      setScrollProgress(progress)

      // Update position flags
      setIsAtTop(scrollY <= 10)
      setIsAtBottom(scrollY >= documentHeight - windowHeight - 10)

      lastScrollY.current = scrollY
    }

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateScrollState)
    }

    // Initial call
    updateScrollState()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [visibilityThreshold])

  // Exit intent detection
  useEffect(() => {
    if (!exitIntentEnabled) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top and hasn't been triggered before
      if (e.clientY <= 0 && !exitIntentTriggered.current && window.pageYOffset > 200) {
        exitIntentTriggered.current = true
        setShowExitIntent(true)
      }
    }

    const handleMouseEnter = () => {
      // Reset exit intent when mouse re-enters
      if (exitIntentTriggered.current) {
        exitIntentTriggered.current = false
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [exitIntentEnabled])

  // Navigate to section
  const navigateToSection = useCallback(async (
    sectionId: string, 
    options: SmoothScrollOptions = {}
  ): Promise<void> => {
    const section = sections.find(s => s.id === sectionId)
    if (!section) {
      console.warn(`Section with id "${sectionId}" not found`)
      return
    }

    const element = document.querySelector(section.selector) as HTMLElement
    if (!element) {
      console.warn(`Element with selector "${section.selector}" not found`)
      return
    }

    const defaultOptions: SmoothScrollOptions = {
      duration: 800,
      easing: 'easeOutCubic',
      offset: scrollOffset,
      ...options
    }

    await scrollToElement(element, defaultOptions)
  }, [sections, scrollOffset])

  // Scroll to top
  const scrollToTop = useCallback(async (
    options: SmoothScrollOptions = {}
  ): Promise<void> => {
    const defaultOptions: SmoothScrollOptions = {
      duration: 600,
      easing: 'easeOutQuad',
      ...options
    }

    await scrollToElement('body', defaultOptions)
  }, [])

  // Set exit intent visibility
  const setExitIntentVisible = useCallback((visible: boolean) => {
    setShowExitIntent(visible)
    if (!visible) {
      exitIntentTriggered.current = false
    }
  }, [])

  // Get section element
  const getSectionElement = useCallback((sectionId: string): HTMLElement | null => {
    const section = sections.find(s => s.id === sectionId)
    if (!section) return null

    return document.querySelector(section.selector) as HTMLElement
  }, [sections])

  return {
    // State
    isVisible,
    activeSection,
    scrollProgress,
    showExitIntent,
    
    // Actions
    navigateToSection,
    scrollToTop,
    setExitIntentVisible,
    
    // Utilities
    getSectionElement,
    isAtTop,
    isAtBottom
  }
}

// Hook for managing navigation sections
export function useNavigationSections(initialSections: NavigationSection[]) {
  const [sections, setSections] = useState<NavigationSection[]>(initialSections)

  const addSection = useCallback((section: NavigationSection) => {
    setSections(prev => {
      const exists = prev.some(s => s.id === section.id)
      if (exists) return prev
      return [...prev, section]
    })
  }, [])

  const removeSection = useCallback((sectionId: string) => {
    setSections(prev => prev.filter(s => s.id !== sectionId))
  }, [])

  const updateSection = useCallback((sectionId: string, updates: Partial<NavigationSection>) => {
    setSections(prev => prev.map(s => 
      s.id === sectionId ? { ...s, ...updates } : s
    ))
  }, [])

  const reorderSections = useCallback((newOrder: string[]) => {
    setSections(prev => {
      const sectionMap = new Map(prev.map(s => [s.id, s]))
      return newOrder.map(id => sectionMap.get(id)).filter(Boolean) as NavigationSection[]
    })
  }, [])

  return {
    sections,
    addSection,
    removeSection,
    updateSection,
    reorderSections,
    setSections
  }
}

// Hook for scroll-based animations
export function useScrollAnimation(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold])

  return { isVisible, elementRef }
}

// Hook for managing scroll direction
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY.current ? 'down' : 'up'
      
      if (Math.abs(scrollY - lastScrollY.current) > 5) {
        setScrollDirection(direction)
      }
      
      lastScrollY.current = scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollDirection
}

// Hook for detecting scroll velocity
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTimestamp = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now()
      const scrollY = window.pageYOffset
      
      if (lastTimestamp.current) {
        const deltaY = scrollY - lastScrollY.current
        const deltaTime = now - lastTimestamp.current
        const currentVelocity = Math.abs(deltaY / deltaTime)
        
        setVelocity(currentVelocity)
      }
      
      lastScrollY.current = scrollY
      lastTimestamp.current = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return velocity
}