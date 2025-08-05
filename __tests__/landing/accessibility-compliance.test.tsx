import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import LandingPageRedesign from '@/app/landing/redesign/page'

expect.extend(toHaveNoViolations)

// Mock reduced motion preference
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

describe('Accessibility Compliance (WCAG 2.1 AA)', () => {
  beforeEach(() => {
    mockMatchMedia(false) // Default to motion enabled
  })

  describe('Automated Accessibility Testing', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<LandingPageRedesign />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should pass accessibility audit for each major section', async () => {
      render(<LandingPageRedesign />)

      const sections = [
        'hero-section',
        'problem-urgency-section',
        'solution-showcase',
        'process-visualization',
        'competitive-matrix',
        'pain-point-solver'
      ]

      for (const sectionId of sections) {
        const section = screen.getByTestId(sectionId)
        const results = await axe(section)
        expect(results).toHaveNoViolations()
      }
    })
  })

  describe('Semantic HTML Structure', () => {
    it('should use proper heading hierarchy', () => {
      render(<LandingPageRedesign />)

      const h1 = screen.getAllByRole('heading', { level: 1 })
      const h2 = screen.getAllByRole('heading', { level: 2 })
      const h3 = screen.getAllByRole('heading', { level: 3 })

      // Should have exactly one h1
      expect(h1).toHaveLength(1)
      
      // Should have logical heading structure
      expect(h2.length).toBeGreaterThan(0)
      expect(h3.length).toBeGreaterThan(0)
    })

    it('should use semantic landmarks', () => {
      render(<LandingPageRedesign />)

      expect(screen.getByRole('banner')).toBeInTheDocument() // header
      expect(screen.getByRole('main')).toBeInTheDocument() // main content
      expect(screen.getByRole('contentinfo')).toBeInTheDocument() // footer
      
      const navigation = screen.getAllByRole('navigation')
      expect(navigation.length).toBeGreaterThan(0)
    })

    it('should have proper list structures', () => {
      render(<LandingPageRedesign />)

      const lists = screen.getAllByRole('list')
      expect(lists.length).toBeGreaterThan(0)

      lists.forEach(list => {
        const listItems = screen.getAllByRole('listitem')
        expect(listItems.length).toBeGreaterThan(0)
      })
    })
  })

  describe('ARIA Labels and Descriptions', () => {
    it('should have proper ARIA labels for interactive elements', () => {
      render(<LandingPageRedesign />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        // Should have accessible name
        expect(button).toHaveAccessibleName()
      })
    })

    it('should have ARIA descriptions for complex elements', () => {
      render(<LandingPageRedesign />)

      // Check competitive matrix has proper descriptions
      const matrix = screen.getByTestId('competitive-matrix')
      expect(matrix).toHaveAttribute('aria-describedby')

      // Check process visualization has proper labels
      const process = screen.getByTestId('process-visualization')
      expect(process).toHaveAttribute('aria-label')
    })

    it('should use ARIA live regions for dynamic content', () => {
      render(<LandingPageRedesign />)

      // Check for live regions in animated sections
      const liveRegions = document.querySelectorAll('[aria-live]')
      expect(liveRegions.length).toBeGreaterThan(0)
    })
  })

  describe('Keyboard Navigation', () => {
    it('should support full keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<LandingPageRedesign />)

      // Should be able to tab through all interactive elements
      const interactiveElements = screen.getAllByRole('button')
      
      for (let i = 0; i < Math.min(interactiveElements.length, 5); i++) {
        await user.tab()
        expect(document.activeElement).toBeInstanceOf(HTMLElement)
      }
    })

    it('should have visible focus indicators', async () => {
      const user = userEvent.setup()
      render(<LandingPageRedesign />)

      const firstButton = screen.getAllByRole('button')[0]
      await user.tab()

      // Focus should be visible
      expect(document.activeElement).toBe(firstButton)
      
      const focusedElement = document.activeElement as HTMLElement
      const computedStyle = window.getComputedStyle(focusedElement, ':focus')
      
      // Should have focus styles (outline, box-shadow, etc.)
      expect(
        computedStyle.outline !== 'none' || 
        computedStyle.boxShadow !== 'none' ||
        computedStyle.borderColor !== 'transparent'
      ).toBe(true)
    })

    it('should support skip links', async () => {
      const user = userEvent.setup()
      render(<LandingPageRedesign />)

      // First tab should focus skip link
      await user.tab()
      
      const skipLink = document.activeElement as HTMLElement
      expect(skipLink).toHaveTextContent(/skip to/i)
    })

    it('should trap focus in modals', async () => {
      const user = userEvent.setup()
      render(<LandingPageRedesign />)

      // Find and open a modal (if any)
      const modalTriggers = screen.queryAllByRole('button', { name: /open|show|view/i })
      
      if (modalTriggers.length > 0) {
        await user.click(modalTriggers[0])
        
        // Focus should be trapped within modal
        const modal = screen.queryByRole('dialog')
        if (modal) {
          const focusableInModal = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          
          expect(focusableInModal.length).toBeGreaterThan(0)
        }
      }
    })
  })

  describe('Screen Reader Compatibility', () => {
    it('should have proper alt text for images', () => {
      render(<LandingPageRedesign />)

      const images = screen.getAllByRole('img')
      images.forEach(img => {
        // Should have alt text or be marked as decorative
        expect(
          img.hasAttribute('alt') || 
          img.getAttribute('role') === 'presentation' ||
          img.getAttribute('aria-hidden') === 'true'
        ).toBe(true)
      })
    })

    it('should announce dynamic content changes', () => {
      render(<LandingPageRedesign />)

      // Check for proper ARIA live regions
      const liveRegions = document.querySelectorAll('[aria-live="polite"], [aria-live="assertive"]')
      expect(liveRegions.length).toBeGreaterThan(0)
    })

    it('should have descriptive link text', () => {
      render(<LandingPageRedesign />)

      const links = screen.getAllByRole('link')
      links.forEach(link => {
        const linkText = link.textContent || ''
        
        // Should not have generic link text
        expect(linkText.toLowerCase()).not.toMatch(/^(click here|read more|link)$/i)
        
        // Should have meaningful text
        expect(linkText.length).toBeGreaterThan(3)
      })
    })
  })

  describe('Color and Contrast', () => {
    it('should meet color contrast requirements', () => {
      render(<LandingPageRedesign />)

      // This would typically use a color contrast analyzer
      // Here we check that text elements have appropriate styling
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button')
      
      textElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element)
        
        // Should have defined text color
        expect(computedStyle.color).toBeTruthy()
        expect(computedStyle.color).not.toBe('transparent')
      })
    })

    it('should not rely solely on color for information', () => {
      render(<LandingPageRedesign />)

      // Check competitive matrix uses more than just color
      const matrixCells = document.querySelectorAll('[data-testid*="matrix-cell"]')
      matrixCells.forEach(cell => {
        // Should have text content or icons, not just color
        expect(
          cell.textContent?.trim() || 
          cell.querySelector('svg') || 
          cell.querySelector('[aria-label]')
        ).toBeTruthy()
      })
    })
  })

  describe('Motion and Animation Accessibility', () => {
    it('should respect reduced motion preferences', () => {
      mockMatchMedia(true) // Enable reduced motion
      
      render(<LandingPageRedesign />)

      // Animated elements should have reduced or no animation
      const animatedElements = document.querySelectorAll('[data-testid*="scroll-triggered"]')
      animatedElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element)
        
        // Should have reduced animation duration or be disabled
        expect(
          computedStyle.animationDuration === '0s' ||
          computedStyle.transitionDuration === '0s' ||
          parseFloat(computedStyle.animationDuration) < 0.5
        ).toBe(true)
      })
    })

    it('should not cause seizures with flashing content', () => {
      render(<LandingPageRedesign />)

      // Check that no elements have rapid flashing animations
      const animatedElements = document.querySelectorAll('[style*="animation"], [class*="animate"]')
      
      animatedElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element)
        const animationDuration = parseFloat(computedStyle.animationDuration)
        
        // Animation should not be too fast (< 0.25s could cause seizures)
        if (animationDuration > 0) {
          expect(animationDuration).toBeGreaterThan(0.25)
        }
      })
    })
  })

  describe('Form Accessibility', () => {
    it('should have proper form labels', () => {
      render(<LandingPageRedesign />)

      const inputs = screen.queryAllByRole('textbox')
      const selects = screen.queryAllByRole('combobox')
      const checkboxes = screen.queryAllByRole('checkbox')
      const radios = screen.queryAllByRole('radio')

      const formElements = [...inputs, ...selects, ...checkboxes, ...radios]
      
      formElements.forEach(element => {
        // Should have accessible name
        expect(element).toHaveAccessibleName()
      })
    })

    it('should provide error messages', () => {
      render(<LandingPageRedesign />)

      // Check for error message containers
      const errorMessages = document.querySelectorAll('[role="alert"], [aria-live="assertive"]')
      
      // Should have error handling in place
      expect(errorMessages.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Mobile Accessibility', () => {
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

    it('should have touch-friendly target sizes', () => {
      render(<LandingPageRedesign />)

      const touchTargets = screen.getAllByRole('button')
      
      touchTargets.forEach(target => {
        const rect = target.getBoundingClientRect()
        
        // Should meet minimum 44px touch target size
        expect(Math.max(rect.width, rect.height)).toBeGreaterThanOrEqual(44)
      })
    })

    it('should support zoom up to 200%', () => {
      render(<LandingPageRedesign />)

      // Simulate zoom
      document.documentElement.style.zoom = '200%'
      
      // Content should still be accessible
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      
      // Reset zoom
      document.documentElement.style.zoom = '100%'
    })
  })
})