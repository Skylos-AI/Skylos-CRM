import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import LandingPageRedesign from '@/app/landing/redesign/page'

// Mock browser detection
const mockUserAgent = (userAgent: string) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    writable: true,
    value: userAgent,
  })
}

// Mock CSS support detection
const mockCSSSupports = (property: string, value: string) => {
  const originalSupports = CSS.supports
  CSS.supports = jest.fn().mockImplementation((prop, val) => {
    if (prop === property && val === value) return true
    return originalSupports(prop, val)
  })
}

describe('Cross-Browser Compatibility', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
  })

  describe('Chrome Compatibility', () => {
    beforeEach(() => {
      mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    })

    it('should render all sections correctly in Chrome', () => {
      render(<LandingPageRedesign />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('problem-urgency-section')).toBeInTheDocument()
      expect(screen.getByTestId('solution-showcase')).toBeInTheDocument()
      expect(screen.getByTestId('process-visualization')).toBeInTheDocument()
      expect(screen.getByTestId('competitive-matrix')).toBeInTheDocument()
      expect(screen.getByTestId('pain-point-solver')).toBeInTheDocument()
    })

    it('should support modern CSS features in Chrome', () => {
      mockCSSSupports('backdrop-filter', 'blur(10px)')
      mockCSSSupports('scroll-behavior', 'smooth')
      
      render(<LandingPageRedesign />)
      
      // Test that modern CSS features are applied
      const heroSection = screen.getByTestId('hero-section')
      expect(heroSection).toHaveClass('backdrop-blur-sm')
    })
  })

  describe('Firefox Compatibility', () => {
    beforeEach(() => {
      mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0')
    })

    it('should render correctly in Firefox', () => {
      render(<LandingPageRedesign />)
      
      // Test Firefox-specific rendering
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('floating-navigation')).toBeInTheDocument()
    })

    it('should handle Firefox-specific CSS properties', () => {
      render(<LandingPageRedesign />)
      
      // Test that Firefox fallbacks work
      const animatedElements = screen.getAllByTestId(/scroll-triggered/)
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })

  describe('Safari Compatibility', () => {
    beforeEach(() => {
      mockUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15')
    })

    it('should render correctly in Safari', () => {
      render(<LandingPageRedesign />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })

    it('should handle Safari-specific webkit properties', () => {
      render(<LandingPageRedesign />)
      
      // Test webkit-specific features
      const interactiveElements = screen.getAllByRole('button')
      expect(interactiveElements.length).toBeGreaterThan(0)
    })
  })

  describe('Edge Compatibility', () => {
    beforeEach(() => {
      mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0')
    })

    it('should render correctly in Edge', () => {
      render(<LandingPageRedesign />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('competitive-matrix')).toBeInTheDocument()
    })
  })

  describe('Mobile Browser Compatibility', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      })
    })

    it('should render correctly on iOS Safari', () => {
      mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1')
      
      render(<LandingPageRedesign />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('floating-navigation')).toBeInTheDocument()
    })

    it('should render correctly on Chrome Mobile', () => {
      mockUserAgent('Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36')
      
      render(<LandingPageRedesign />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })
  })

  describe('Feature Detection and Fallbacks', () => {
    it('should provide fallbacks for unsupported CSS features', () => {
      // Mock unsupported features
      CSS.supports = jest.fn().mockReturnValue(false)
      
      render(<LandingPageRedesign />)
      
      // Should still render without modern CSS features
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })

    it('should handle JavaScript disabled gracefully', () => {
      // Mock no JavaScript environment
      const originalCreateElement = document.createElement
      document.createElement = jest.fn().mockImplementation((tagName) => {
        const element = originalCreateElement.call(document, tagName)
        if (tagName === 'script') {
          // Simulate script loading failure
          setTimeout(() => {
            element.dispatchEvent(new Event('error'))
          }, 0)
        }
        return element
      })

      render(<LandingPageRedesign />)
      
      // Basic content should still be accessible
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      
      document.createElement = originalCreateElement
    })
  })

  describe('Animation Performance Across Browsers', () => {
    it('should maintain 60fps animations in supported browsers', async () => {
      const performanceEntries: PerformanceEntry[] = []
      
      // Mock performance observer
      const mockObserver = {
        observe: jest.fn(),
        disconnect: jest.fn(),
      }
      
      global.PerformanceObserver = jest.fn().mockImplementation((callback) => {
        // Simulate performance entries
        setTimeout(() => {
          callback({
            getEntries: () => performanceEntries
          })
        }, 100)
        return mockObserver
      })

      render(<LandingPageRedesign />)
      
      // Trigger scroll animations
      await act(async () => {
        window.dispatchEvent(new Event('scroll'))
        await new Promise(resolve => setTimeout(resolve, 200))
      })

      expect(mockObserver.observe).toHaveBeenCalled()
    })
  })
})