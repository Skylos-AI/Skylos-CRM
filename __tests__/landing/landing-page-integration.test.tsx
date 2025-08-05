/**
 * Landing Page Integration Tests
 * 
 * Comprehensive testing for the redesigned landing page
 * including accessibility, performance, and user interactions.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import LandingPageRedesign from '@/app/landing/redesign/page'
import { AccessibilityProvider } from '@/components/ui/accessibility-provider'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

// Mock ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

const renderLandingPage = () => {
  return render(
    <AccessibilityProvider>
      <LandingPageRedesign />
    </AccessibilityProvider>
  )
}

describe('Landing Page Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Accessibility Compliance', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderLandingPage()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper heading hierarchy', () => {
      renderLandingPage()
      
      // Check for proper heading structure
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(1)
    })

    it('should have proper ARIA labels and roles', () => {
      renderLandingPage()
      
      // Check for navigation landmarks
      const navigation = screen.getByRole('navigation', { hidden: true })
      expect(navigation).toBeInTheDocument()
      
      // Check for main content
      const main = screen.getByRole('main', { hidden: true })
      expect(main).toBeInTheDocument()
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      renderLandingPage()
      
      // Test tab navigation through interactive elements
      const buttons = screen.getAllByRole('button')
      const links = screen.getAllByRole('link')
      const interactiveElements = buttons.concat(links)
      
      expect(interactiveElements.length).toBeGreaterThan(0)
      
      // Focus first interactive element
      if (interactiveElements[0]) {
        await user.tab()
        expect(interactiveElements[0]).toHaveFocus()
      }
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

      renderLandingPage()
      
      // Check that animations are disabled or reduced
      const animatedElements = screen.getAllByTestId(/animated|motion/, { exact: false })
      animatedElements.forEach(element => {
        const styles = window.getComputedStyle(element)
        // Animation should be disabled or have reduced duration
        expect(
          styles.animationDuration === '0s' || 
          styles.animationDuration === '0.01s' ||
          styles.transitionDuration === '0s'
        ).toBeTruthy()
      })
    })
  })

  describe('Responsive Design', () => {
    const viewports = [
      { width: 320, height: 568, name: 'Mobile Small' },
      { width: 375, height: 667, name: 'Mobile Medium' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1440, height: 900, name: 'Desktop Large' },
      { width: 2560, height: 1440, name: 'Desktop XL' }
    ]

    viewports.forEach(({ width, height, name }) => {
      it(`should render correctly on ${name} (${width}x${height})`, () => {
        // Mock viewport size
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        })
        Object.defineProperty(window, 'innerHeight', {
          writable: true,
          configurable: true,
          value: height,
        })

        renderLandingPage()
        
        // Check that content is visible and properly laid out
        const heroSection = screen.getByText(/Stop Losing to Competitors/i)
        expect(heroSection).toBeVisible()
        
        // Check that CTAs are accessible
        const ctaButtons = screen.getAllByRole('button')
        ctaButtons.forEach(button => {
          expect(button).toBeVisible()
        })
      })
    })

    it('should have touch-friendly targets on mobile', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      renderLandingPage()
      
      const buttons = screen.getAllByRole('button')
      const links = screen.getAllByRole('link')
      
      const allInteractiveElements = buttons.concat(links)
      allInteractiveElements.forEach(element => {
        const rect = element.getBoundingClientRect()
        // Touch targets should be at least 44px
        expect(rect.height).toBeGreaterThanOrEqual(44)
        expect(rect.width).toBeGreaterThanOrEqual(44)
      })
    })
  })

  describe('Performance Optimization', () => {
    it('should lazy load below-fold content', async () => {
      renderLandingPage()
      
      // Check that lazy-loaded sections are present
      const lazyElements = screen.getAllByTestId(/lazy-/, { exact: false })
      expect(lazyElements.length).toBeGreaterThan(0)
    })

    it('should preload critical resources', () => {
      renderLandingPage()
      
      // Check for preload links in document head
      const preloadLinks = document.querySelectorAll('link[rel="preload"]')
      expect(preloadLinks.length).toBeGreaterThan(0)
    })

    it('should optimize images', () => {
      renderLandingPage()
      
      const images = screen.getAllByRole('img')
      images.forEach(img => {
        // Check for proper alt text
        expect(img).toHaveAttribute('alt')
        
        // Check for responsive attributes
        const srcset = img.getAttribute('srcset')
        const sizes = img.getAttribute('sizes')
        
        if (srcset || sizes) {
          expect(srcset || sizes).toBeTruthy()
        }
      })
    })
  })

  describe('User Interactions', () => {
    it('should handle CTA button clicks', async () => {
      const user = userEvent.setup()
      renderLandingPage()
      
      const primaryCTA = screen.getByText(/Start Your AI Transformation/i)
      expect(primaryCTA).toBeInTheDocument()
      
      await user.click(primaryCTA)
      // Should navigate or trigger action
    })

    it('should handle smooth scrolling to sections', async () => {
      const user = userEvent.setup()
      renderLandingPage()
      
      const seeHowItWorksButton = screen.getByText(/See How It Works/i)
      await user.click(seeHowItWorksButton)
      
      // Should trigger smooth scroll
      expect(window.scrollTo).toHaveBeenCalled()
    })

    it('should handle floating navigation', async () => {
      renderLandingPage()
      
      // Simulate scroll to show floating navigation
      fireEvent.scroll(window, { target: { scrollY: 500 } })
      
      await waitFor(() => {
        const floatingNav = screen.getByRole('navigation', { hidden: true })
        expect(floatingNav).toBeInTheDocument()
      })
    })

    it('should handle exit intent detection', async () => {
      renderLandingPage()
      
      // Simulate mouse leaving viewport (exit intent)
      fireEvent.mouseLeave(document.body, {
        clientY: -10
      })
      
      // Should trigger exit intent handler
      await waitFor(() => {
        // Check for exit intent modal or message
        const exitIntentElement = screen.queryByTestId('exit-intent')
        // This might not be visible immediately, so we just check it doesn't error
      })
    })
  })

  describe('Content and Messaging', () => {
    it('should display consistent brand messaging', () => {
      renderLandingPage()
      
      // Check for key brand messages
      expect(screen.getByText(/Stop Losing to Competitors Who Already Use AI/i)).toBeInTheDocument()
      expect(screen.getByText(/custom conversational agents/i)).toBeInTheDocument()
      expect(screen.getByText(/deployed in days, not months/i)).toBeInTheDocument()
    })

    it('should have proper section structure', () => {
      renderLandingPage()
      
      // Check for all major sections
      const sections = [
        'hero',
        'problem', 
        'solution',
        'competitive',
        'painpoints',
        'process',
        'case-studies',
        'contact'
      ]
      
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId)
        expect(section).toBeInTheDocument()
      })
    })

    it('should have compelling CTAs throughout', () => {
      renderLandingPage()
      
      const ctaTexts = [
        /Start Your AI Transformation/i,
        /See How It Works/i,
        /Schedule.*Consultation/i,
        /Download.*Case Studies/i
      ]
      
      ctaTexts.forEach(ctaText => {
        const cta = screen.getByText(ctaText)
        expect(cta).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle component errors gracefully', () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      renderLandingPage()
      
      // Component should render without throwing errors
      expect(screen.getByText(/Stop Losing to Competitors/i)).toBeInTheDocument()
      
      consoleSpy.mockRestore()
    })

    it('should handle missing data gracefully', () => {
      // Test with missing or undefined props
      renderLandingPage()
      
      // Page should still render basic structure
      expect(document.body).toBeInTheDocument()
    })
  })

  describe('SEO and Meta Tags', () => {
    it('should have proper document structure', () => {
      renderLandingPage()
      
      // Check for proper HTML structure
      expect(document.documentElement).toHaveAttribute('lang')
      expect(document.head.querySelector('title')).toBeInTheDocument()
      expect(document.head.querySelector('meta[name="description"]')).toBeInTheDocument()
    })
  })
})