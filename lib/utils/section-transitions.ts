/**
 * Section Transitions Utility
 * 
 * Provides smooth transitions between landing page sections
 * with consistent timing and easing functions.
 */

export interface TransitionConfig {
  duration: number
  easing: string
  delay?: number
  stagger?: number
}

export const TRANSITION_PRESETS = {
  // Fast transitions for micro-interactions
  fast: {
    duration: 150,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Standard transitions for most UI elements
  normal: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Slow transitions for major state changes
  slow: {
    duration: 500,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Smooth section transitions
  section: {
    duration: 600,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  
  // Bouncy transitions for attention-grabbing elements
  bounce: {
    duration: 400,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Smooth entrance animations
  entrance: {
    duration: 800,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    stagger: 100,
  }
} as const

export type TransitionPreset = keyof typeof TRANSITION_PRESETS

/**
 * Creates CSS transition string from config
 */
export function createTransition(config: TransitionConfig): string {
  const { duration, easing, delay = 0 } = config
  return `all ${duration}ms ${easing}${delay ? ` ${delay}ms` : ''}`
}

/**
 * Creates Framer Motion transition object
 */
export function createMotionTransition(preset: TransitionPreset, overrides?: Partial<TransitionConfig>) {
  const config = { ...TRANSITION_PRESETS[preset], ...overrides }
  
  return {
    duration: config.duration / 1000, // Convert to seconds for Framer Motion
    ease: config.easing === 'cubic-bezier(0.4, 0, 0.2, 1)' ? 'easeOut' :
          config.easing === 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' ? 'easeInOut' :
          config.easing === 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' ? 'backOut' :
          'easeOut',
    delay: (config.delay || 0) / 1000,
  }
}

/**
 * Section transition variants for Framer Motion
 */
export const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: createMotionTransition('section'),
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 1.05,
    transition: createMotionTransition('fast'),
  }
}

/**
 * Staggered children animation variants
 */
export const staggeredChildrenVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * Individual child animation variants
 */
export const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: createMotionTransition('normal'),
  },
}

/**
 * Smooth scroll to section with custom easing
 */
export function smoothScrollToSection(
  sectionId: string, 
  offset: number = 0,
  duration: number = 800
): Promise<void> {
  return new Promise((resolve) => {
    const element = document.getElementById(sectionId)
    if (!element) {
      resolve()
      return
    }

    const startPosition = window.pageYOffset
    const targetPosition = element.offsetTop - offset
    const distance = targetPosition - startPosition
    let startTime: number | null = null

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      
      // Smooth easing function
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      window.scrollTo(0, startPosition + distance * ease)

      if (progress < 1) {
        requestAnimationFrame(animation)
      } else {
        resolve()
      }
    }

    requestAnimationFrame(animation)
  })
}

/**
 * Creates intersection observer for section visibility tracking
 */
export function createSectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-10% 0px -10% 0px',
    ...options,
  }

  return new IntersectionObserver(callback, defaultOptions)
}

/**
 * Manages section transition states
 */
export class SectionTransitionManager {
  private observers: Map<string, IntersectionObserver> = new Map()
  private callbacks: Map<string, (visible: boolean, progress: number) => void> = new Map()

  /**
   * Register a section for transition tracking
   */
  registerSection(
    sectionId: string, 
    callback: (visible: boolean, progress: number) => void
  ): void {
    const element = document.getElementById(sectionId)
    if (!element) return

    // Clean up existing observer
    this.unregisterSection(sectionId)

    const observer = createSectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === sectionId) {
          const visible = entry.isIntersecting
          const progress = entry.intersectionRatio
          callback(visible, progress)
        }
      })
    })

    observer.observe(element)
    this.observers.set(sectionId, observer)
    this.callbacks.set(sectionId, callback)
  }

  /**
   * Unregister a section from transition tracking
   */
  unregisterSection(sectionId: string): void {
    const observer = this.observers.get(sectionId)
    if (observer) {
      observer.disconnect()
      this.observers.delete(sectionId)
      this.callbacks.delete(sectionId)
    }
  }

  /**
   * Clean up all observers
   */
  cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers.clear()
    this.callbacks.clear()
  }
}

/**
 * Hook for managing section transitions
 */
export function useSectionTransitions() {
  const manager = new SectionTransitionManager()

  return {
    registerSection: manager.registerSection.bind(manager),
    unregisterSection: manager.unregisterSection.bind(manager),
    cleanup: manager.cleanup.bind(manager),
    smoothScrollToSection,
  }
}