/**
 * Smooth Scrolling Utilities
 * 
 * Provides enhanced smooth scrolling functionality with easing,
 * offset handling, and callback support for better user experience.
 */

// Easing functions for smooth scrolling
export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
}

export interface SmoothScrollOptions {
  duration?: number
  easing?: keyof typeof easingFunctions
  offset?: number
  callback?: () => void
  onProgress?: (progress: number) => void
}

/**
 * Smooth scroll to a specific element
 */
export function scrollToElement(
  element: HTMLElement | string,
  options: SmoothScrollOptions = {}
): Promise<void> {
  return new Promise((resolve) => {
    const {
      duration = 800,
      easing = 'easeOutCubic',
      offset = 0,
      callback,
      onProgress
    } = options

    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element

    if (!targetElement) {
      console.warn('Target element not found')
      resolve()
      return
    }

    const startPosition = window.pageYOffset
    const targetPosition = targetElement.offsetTop - offset
    const distance = targetPosition - startPosition
    const startTime = performance.now()

    const easingFunction = easingFunctions[easing]

    function animation(currentTime: number) {
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const easedProgress = easingFunction(progress)
      
      const currentPosition = startPosition + (distance * easedProgress)
      window.scrollTo(0, currentPosition)

      onProgress?.(progress)

      if (progress < 1) {
        requestAnimationFrame(animation)
      } else {
        callback?.()
        resolve()
      }
    }

    requestAnimationFrame(animation)
  })
}

/**
 * Smooth scroll to a specific position
 */
export function scrollToPosition(
  targetY: number,
  options: SmoothScrollOptions = {}
): Promise<void> {
  return new Promise((resolve) => {
    const {
      duration = 800,
      easing = 'easeOutCubic',
      callback,
      onProgress
    } = options

    const startPosition = window.pageYOffset
    const distance = targetY - startPosition
    const startTime = performance.now()

    const easingFunction = easingFunctions[easing]

    function animation(currentTime: number) {
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const easedProgress = easingFunction(progress)
      
      const currentPosition = startPosition + (distance * easedProgress)
      window.scrollTo(0, currentPosition)

      onProgress?.(progress)

      if (progress < 1) {
        requestAnimationFrame(animation)
      } else {
        callback?.()
        resolve()
      }
    }

    requestAnimationFrame(animation)
  })
}

/**
 * Smooth scroll to top of page
 */
export function scrollToTop(options: SmoothScrollOptions = {}): Promise<void> {
  return scrollToPosition(0, options)
}

/**
 * Get the current scroll progress as a percentage
 */
export function getScrollProgress(): number {
  const scrolled = window.pageYOffset
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  return Math.min(100, Math.max(0, (scrolled / maxScroll) * 100))
}

/**
 * Get the currently visible section based on scroll position
 */
export function getCurrentSection(
  sections: Array<{ id: string; selector: string }>,
  offset: number = 100
): string | null {
  const scrollPosition = window.pageYOffset + offset

  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.querySelector(sections[i].selector) as HTMLElement
    if (element && element.offsetTop <= scrollPosition) {
      return sections[i].id
    }
  }

  return sections[0]?.id || null
}

/**
 * Check if an element is in viewport
 */
export function isElementInViewport(
  element: HTMLElement,
  threshold: number = 0
): boolean {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= windowHeight + threshold &&
    rect.right <= windowWidth + threshold
  )
}

/**
 * Get element's position relative to viewport
 */
export function getElementViewportPosition(element: HTMLElement): {
  top: number
  bottom: number
  left: number
  right: number
  isVisible: boolean
  visibilityRatio: number
} {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth

  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0)
  const elementArea = rect.width * rect.height
  const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth)
  const visibilityRatio = elementArea > 0 ? visibleArea / elementArea : 0

  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    isVisible: visibilityRatio > 0,
    visibilityRatio
  }
}

/**
 * Debounced scroll handler
 */
export function createScrollHandler(
  callback: (event: Event) => void,
  delay: number = 16
): () => void {
  let timeoutId: NodeJS.Timeout | null = null
  let lastCallTime = 0

  const handler = (event: Event) => {
    const now = Date.now()
    
    if (now - lastCallTime >= delay) {
      callback(event)
      lastCallTime = now
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        callback(event)
        lastCallTime = Date.now()
      }, delay - (now - lastCallTime))
    }
  }

  return handler
}

/**
 * Throttled scroll handler
 */
export function createThrottledScrollHandler(
  callback: (event: Event) => void,
  delay: number = 16
): () => void {
  let isThrottled = false

  return (event: Event) => {
    if (!isThrottled) {
      callback(event)
      isThrottled = true
      setTimeout(() => {
        isThrottled = false
      }, delay)
    }
  }
}

/**
 * Scroll spy functionality
 */
export class ScrollSpy {
  private sections: Array<{ id: string; element: HTMLElement }>
  private callback: (activeSection: string) => void
  private offset: number
  private throttledHandler: () => void

  constructor(
    sections: Array<{ id: string; selector: string }>,
    callback: (activeSection: string) => void,
    offset: number = 100
  ) {
    this.sections = sections
      .map(section => ({
        id: section.id,
        element: document.querySelector(section.selector) as HTMLElement
      }))
      .filter(section => section.element)

    this.callback = callback
    this.offset = offset
    this.throttledHandler = createThrottledScrollHandler(
      this.handleScroll.bind(this),
      16
    )

    this.init()
  }

  private init() {
    window.addEventListener('scroll', this.throttledHandler)
    this.handleScroll() // Initial call
  }

  private handleScroll() {
    const scrollPosition = window.pageYOffset + this.offset

    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = this.sections[i]
      if (section.element.offsetTop <= scrollPosition) {
        this.callback(section.id)
        break
      }
    }
  }

  public destroy() {
    window.removeEventListener('scroll', this.throttledHandler)
  }

  public updateSections(sections: Array<{ id: string; selector: string }>) {
    this.sections = sections
      .map(section => ({
        id: section.id,
        element: document.querySelector(section.selector) as HTMLElement
      }))
      .filter(section => section.element)
  }
}

/**
 * Smooth scroll with intersection observer for better performance
 */
export class PerformantSmoothScroll {
  private observer: IntersectionObserver
  private sections: Map<string, HTMLElement> = new Map()
  private callback: (activeSection: string) => void

  constructor(
    sections: Array<{ id: string; selector: string }>,
    callback: (activeSection: string) => void,
    options: IntersectionObserverInit = {}
  ) {
    this.callback = callback

    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
      ...options
    }

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      defaultOptions
    )

    this.init(sections)
  }

  private init(sections: Array<{ id: string; selector: string }>) {
    sections.forEach(section => {
      const element = document.querySelector(section.selector) as HTMLElement
      if (element) {
        this.sections.set(section.id, element)
        this.observer.observe(element)
      }
    })
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find the section ID for this element
        for (const [id, element] of this.sections.entries()) {
          if (element === entry.target) {
            this.callback(id)
            break
          }
        }
      }
    })
  }

  public destroy() {
    this.observer.disconnect()
    this.sections.clear()
  }

  public updateSections(sections: Array<{ id: string; selector: string }>) {
    this.observer.disconnect()
    this.sections.clear()
    this.init(sections)
  }
}

// Export utility functions
export const smoothScrollUtils = {
  scrollToElement,
  scrollToPosition,
  scrollToTop,
  getScrollProgress,
  getCurrentSection,
  isElementInViewport,
  getElementViewportPosition,
  createScrollHandler,
  createThrottledScrollHandler,
  ScrollSpy,
  PerformantSmoothScroll,
  easingFunctions
}