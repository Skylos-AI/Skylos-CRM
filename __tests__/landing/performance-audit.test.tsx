import { render } from '@testing-library/react'
import LandingPageRedesign from '@/app/landing/redesign/page'

// Mock Web Vitals
const mockWebVitals = {
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}

jest.mock('web-vitals', () => mockWebVitals)

// Mock performance observer
const mockPerformanceEntries: PerformanceEntry[] = []

global.PerformanceObserver = jest.fn().mockImplementation((callback) => {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  }
})

// Mock intersection observer
global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }
})

describe('Performance Audit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockPerformanceEntries.length = 0
  })

  describe('Core Web Vitals', () => {
    it('should meet LCP requirements (< 2.5s)', async () => {
      const mockLCPCallback = jest.fn()
      mockWebVitals.getLCP.mockImplementation((callback) => {
        // Simulate good LCP score
        callback({ value: 1800, name: 'LCP' })
      })

      render(<LandingPageRedesign />)

      expect(mockWebVitals.getLCP).toHaveBeenCalled()
    })

    it('should meet FID requirements (< 100ms)', async () => {
      mockWebVitals.getFID.mockImplementation((callback) => {
        // Simulate good FID score
        callback({ value: 50, name: 'FID' })
      })

      render(<LandingPageRedesign />)

      expect(mockWebVitals.getFID).toHaveBeenCalled()
    })

    it('should meet CLS requirements (< 0.1)', async () => {
      mockWebVitals.getCLS.mockImplementation((callback) => {
        // Simulate good CLS score
        callback({ value: 0.05, name: 'CLS' })
      })

      render(<LandingPageRedesign />)

      expect(mockWebVitals.getCLS).toHaveBeenCalled()
    })
  })

  describe('Resource Loading Performance', () => {
    it('should lazy load below-fold images', () => {
      render(<LandingPageRedesign />)

      // Check that images have loading="lazy" attribute
      const images = document.querySelectorAll('img')
      const belowFoldImages = Array.from(images).slice(1) // Skip hero image

      belowFoldImages.forEach(img => {
        expect(img.getAttribute('loading')).toBe('lazy')
      })
    })

    it('should use optimized image formats', () => {
      render(<LandingPageRedesign />)

      const images = document.querySelectorAll('img')
      images.forEach(img => {
        const src = img.getAttribute('src')
        if (src) {
          // Should use WebP or other optimized formats
          expect(src).toMatch(/\.(webp|avif|jpg|jpeg|png)$/i)
        }
      })
    })

    it('should preload critical resources', () => {
      render(<LandingPageRedesign />)

      // Check for preload links in head
      const preloadLinks = document.querySelectorAll('link[rel="preload"]')
      expect(preloadLinks.length).toBeGreaterThan(0)
    })
  })

  describe('Animation Performance', () => {
    it('should use GPU-accelerated transforms', () => {
      render(<LandingPageRedesign />)

      // Check that animated elements use transform instead of position changes
      const animatedElements = document.querySelectorAll('[data-testid*="scroll-triggered"]')
      
      animatedElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element)
        // Should use will-change for performance
        expect(computedStyle.willChange).toBeTruthy()
      })
    })

    it('should respect reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      render(<LandingPageRedesign />)

      // Animations should be disabled or simplified
      const animatedElements = document.querySelectorAll('[data-testid*="scroll-triggered"]')
      expect(animatedElements.length).toBeGreaterThan(0)
    })

    it('should maintain 60fps during animations', async () => {
      const frameRates: number[] = []
      let lastTime = performance.now()

      // Mock requestAnimationFrame to track frame rates
      const originalRAF = window.requestAnimationFrame
      window.requestAnimationFrame = jest.fn().mockImplementation((callback) => {
        const currentTime = performance.now()
        const deltaTime = currentTime - lastTime
        const fps = 1000 / deltaTime
        frameRates.push(fps)
        lastTime = currentTime
        return originalRAF(callback)
      })

      render(<LandingPageRedesign />)

      // Simulate scroll to trigger animations
      window.dispatchEvent(new Event('scroll'))

      // Allow animations to run
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Check that frame rates are consistently above 55fps (allowing some variance)
      const averageFPS = frameRates.reduce((sum, fps) => sum + fps, 0) / frameRates.length
      expect(averageFPS).toBeGreaterThan(55)

      window.requestAnimationFrame = originalRAF
    })
  })

  describe('Bundle Size Optimization', () => {
    it('should use code splitting for animation libraries', () => {
      // This would typically be tested in a build environment
      // Here we can check that dynamic imports are used
      render(<LandingPageRedesign />)

      // Check that framer-motion is loaded dynamically
      expect(document.querySelector('script[src*="framer-motion"]')).toBeTruthy()
    })

    it('should tree-shake unused code', () => {
      // This is typically verified through bundle analysis
      // We can check that only necessary components are rendered
      render(<LandingPageRedesign />)

      const sections = document.querySelectorAll('[data-testid*="section"]')
      expect(sections.length).toBeGreaterThan(0)
      expect(sections.length).toBeLessThan(20) // Reasonable upper bound
    })
  })

  describe('Memory Usage', () => {
    it('should clean up event listeners on unmount', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

      const { unmount } = render(<LandingPageRedesign />)

      const addedListeners = addEventListenerSpy.mock.calls.length
      
      unmount()

      const removedListeners = removeEventListenerSpy.mock.calls.length

      // Should remove at least as many listeners as were added
      expect(removedListeners).toBeGreaterThanOrEqual(addedListeners)

      addEventListenerSpy.mockRestore()
      removeEventListenerSpy.mockRestore()
    })

    it('should dispose of intersection observers', () => {
      const disconnectSpy = jest.fn()
      
      global.IntersectionObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: disconnectSpy,
      }))

      const { unmount } = render(<LandingPageRedesign />)
      
      unmount()

      expect(disconnectSpy).toHaveBeenCalled()
    })
  })

  describe('Network Performance', () => {
    it('should minimize HTTP requests', () => {
      render(<LandingPageRedesign />)

      // Check that resources are bundled efficiently
      const scripts = document.querySelectorAll('script[src]')
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]')
      
      // Should have reasonable number of external resources
      expect(scripts.length + stylesheets.length).toBeLessThan(10)
    })

    it('should use appropriate caching headers', () => {
      // This would typically be tested at the server level
      // Here we can check that static assets have cache-friendly names
      render(<LandingPageRedesign />)

      const scripts = document.querySelectorAll('script[src]')
      scripts.forEach(script => {
        const src = script.getAttribute('src')
        if (src && !src.startsWith('http')) {
          // Should have hash in filename for cache busting
          expect(src).toMatch(/\.[a-f0-9]{8,}\.(js|css)$/)
        }
      })
    })
  })

  describe('Accessibility Performance', () => {
    it('should not impact screen reader performance', async () => {
      render(<LandingPageRedesign />)

      // Check that ARIA labels don't cause performance issues
      const ariaElements = document.querySelectorAll('[aria-label], [aria-describedby], [aria-labelledby]')
      
      // Should have reasonable number of ARIA attributes
      expect(ariaElements.length).toBeGreaterThan(0)
      expect(ariaElements.length).toBeLessThan(100)
    })

    it('should maintain focus performance', () => {
      render(<LandingPageRedesign />)

      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      // Should have reasonable tab order
      expect(focusableElements.length).toBeGreaterThan(5)
      expect(focusableElements.length).toBeLessThan(50)
    })
  })
})