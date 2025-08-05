import { useEffect, useState } from 'react'

// Mobile detection utilities
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export const isTablet = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

export const isDesktop = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 1024
}

// Touch detection
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// Viewport hook for responsive behavior
export function useViewport() {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouch: false
  })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isTouch: isTouchDevice()
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport, { passive: true })
    window.addEventListener('orientationchange', updateViewport, { passive: true })

    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('orientationchange', updateViewport)
    }
  }, [])

  return viewport
}

// Responsive breakpoints
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

// Media query utilities
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  '2xl': `(min-width: ${breakpoints['2xl']}px)`,
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)'
} as const

// Touch-friendly sizing
export const touchTargets = {
  minimum: 44, // iOS/Android minimum
  comfortable: 48, // More comfortable size
  large: 56 // Large touch targets
} as const

// Mobile-specific utilities
export const mobileUtils = {
  // Prevent zoom on input focus (iOS)
  preventZoom: () => {
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      )
    }
  },

  // Allow zoom back
  allowZoom: () => {
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0'
      )
    }
  },

  // Safe area insets for notched devices
  getSafeAreaInsets: () => {
    if (typeof window === 'undefined') return { top: 0, bottom: 0, left: 0, right: 0 }
    
    const style = getComputedStyle(document.documentElement)
    return {
      top: parseInt(style.getPropertyValue('--safe-area-inset-top') || '0'),
      bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom') || '0'),
      left: parseInt(style.getPropertyValue('--safe-area-inset-left') || '0'),
      right: parseInt(style.getPropertyValue('--safe-area-inset-right') || '0')
    }
  },

  // Haptic feedback (if supported)
  hapticFeedback: (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      }
      navigator.vibrate(patterns[type])
    }
  }
}

// Responsive font scaling
export const responsiveFontSize = (base: number, scale: number = 0.8) => ({
  fontSize: `${base}px`,
  '@media (max-width: 767px)': {
    fontSize: `${base * scale}px`
  }
})

// Responsive spacing
export const responsiveSpacing = (desktop: number, mobile?: number) => {
  const mobileValue = mobile || desktop * 0.75
  return {
    padding: `${desktop}px`,
    '@media (max-width: 767px)': {
      padding: `${mobileValue}px`
    }
  }
}

// Container queries (for modern browsers)
export const containerQueries = {
  small: '@container (max-width: 400px)',
  medium: '@container (min-width: 401px) and (max-width: 800px)',
  large: '@container (min-width: 801px)'
}

// Performance optimizations for mobile
export const mobilePerformance = {
  // Reduce animation complexity on mobile
  getAnimationConfig: (isMobile: boolean) => ({
    duration: isMobile ? 0.3 : 0.5,
    ease: isMobile ? 'easeOut' : 'easeInOut',
    reduce: isMobile
  }),

  // Lazy load images with mobile-specific settings
  getLazyLoadConfig: (isMobile: boolean) => ({
    threshold: isMobile ? 0.1 : 0.3,
    rootMargin: isMobile ? '50px' : '100px'
  }),

  // Debounce scroll events more aggressively on mobile
  getScrollDebounce: (isMobile: boolean) => isMobile ? 16 : 8
}

// Gesture utilities
export const gestureUtils = {
  // Swipe detection
  detectSwipe: (
    element: HTMLElement,
    onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void,
    threshold: number = 50
  ) => {
    let startX = 0
    let startY = 0
    let endX = 0
    let endY = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX
      endY = e.changedTouches[0].clientY
      
      const deltaX = endX - startX
      const deltaY = endY - startY
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > threshold) {
          onSwipe(deltaX > 0 ? 'right' : 'left')
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > threshold) {
          onSwipe(deltaY > 0 ? 'down' : 'up')
        }
      }
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  },

  // Pinch zoom detection
  detectPinch: (
    element: HTMLElement,
    onPinch: (scale: number) => void
  ) => {
    let initialDistance = 0

    const getDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX
      const dy = touches[0].clientY - touches[1].clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDistance = getDistance(e.touches)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistance > 0) {
        const currentDistance = getDistance(e.touches)
        const scale = currentDistance / initialDistance
        onPinch(scale)
      }
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
    }
  }
}

// Accessibility helpers for mobile
export const mobileA11y = {
  // Announce content changes for screen readers
  announceChange: (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },

  // Focus management for mobile navigation
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }
}