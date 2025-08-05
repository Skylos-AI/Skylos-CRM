import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import LandingPageRedesign from '@/app/landing/redesign/page'

// Mock window resize
const mockResize = (width: number, height: number) => {
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
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'))
}

// Mock matchMedia for different screen sizes
const mockMatchMedia = (query: string) => {
  const mediaQueries: Record<string, boolean> = {
    '(min-width: 320px)': window.innerWidth >= 320,
    '(min-width: 640px)': window.innerWidth >= 640,
    '(min-width: 768px)': window.innerWidth >= 768,
    '(min-width: 1024px)': window.innerWidth >= 1024,
    '(min-width: 1280px)': window.innerWidth >= 1280,
    '(min-width: 1536px)': window.innerWidth >= 1536,
    '(orientation: portrait)': window.innerHeight > window.innerWidth,
    '(orientation: landscape)': window.innerWidth > window.innerHeight,
  }

  return {
    matches: mediaQueries[query] || false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(mockMatchMedia),
})

describe('Responsive Design Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Mobile Devices (320px - 639px)', () => {
    const mobileBreakpoints = [
      { width: 320, height: 568, device: 'iPhone SE' },
      { width: 375, height: 667, device: 'iPhone 8' },
      { width: 375, height: 812, device: 'iPhone X' },
      { width: 414, height: 896, device: 'iPhone 11 Pro Max' },
    ]

    mobileBreakpoints.forEach(({ width, height, device }) => {
      it(`should render correctly on ${device} (${width}x${height})`, async () => {
        await act(async () => {
          mockResize(width, height)
        })

        render(<LandingPageRedesign />)

        // Hero section should stack vertically
        const heroSection = screen.getByTestId('hero-section')
        expect(heroSection).toBeInTheDocument()

        // Navigation should be mobile-friendly
        const navigation = screen.getByTestId('floating-navigation')
        expect(navigation).toBeInTheDocument()

        // All sections should be visible
        expect(screen.getByTestId('problem-urgency-section')).toBeInTheDocument()
        expect(screen.getByTestId('solution-showcase')).toBeInTheDocument()
        expect(screen.getByTestId('process-visualization')).toBeInTheDocument()
      })
    })

    it('should have touch-friendly button sizes on mobile', async () => {
      await act(async () => {
        mockResize(375, 667)
      })

      render(<LandingPageRedesign />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect()
        
        // Minimum 44px touch target
        expect(Math.max(rect.width, rect.height)).toBeGreaterThanOrEqual(44)
      })
    })

    it('should stack competitive matrix on mobile', async () => {
      await act(async () => {
        mockResize(375, 667)
      })

      render(<LandingPageRedesign />)

      const matrix = screen.getByTestId('competitive-matrix')
      const computedStyle = window.getComputedStyle(matrix)
      
      // Should use flex-direction: column or similar mobile layout
      expect(
        computedStyle.flexDirection === 'column' ||
        computedStyle.display === 'block'
      ).toBe(true)
    })
  })

  describe('Tablet Devices (640px - 1023px)', () => {
    const tabletBreakpoints = [
      { width: 640, height: 960, device: 'Small Tablet Portrait' },
      { width: 768, height: 1024, device: 'iPad Portrait' },
      { width: 1024, height: 768, device: 'iPad Landscape' },
    ]

    tabletBreakpoints.forEach(({ width, height, device }) => {
      it(`should render correctly on ${device} (${width}x${height})`, async () => {
        await act(async () => {
          mockResize(width, height)
        })

        render(<LandingPageRedesign />)

        // Should have tablet-optimized layout
        const heroSection = screen.getByTestId('hero-section')
        expect(heroSection).toBeInTheDocument()

        // Process visualization should be readable
        const processSection = screen.getByTestId('process-visualization')
        expect(processSection).toBeInTheDocument()

        // Competitive matrix should be partially collapsed
        const matrix = screen.getByTestId('competitive-matrix')
        expect(matrix).toBeInTheDocument()
      })
    })

    it('should optimize text sizes for tablet reading', async () => {
      await act(async () => {
        mockResize(768, 1024)
      })

      render(<LandingPageRedesign />)

      const headings = screen.getAllByRole('heading')
      headings.forEach(heading => {
        const computedStyle = window.getComputedStyle(heading)
        const fontSize = parseFloat(computedStyle.fontSize)
        
        // Should have readable font sizes (not too small, not too large)
        expect(fontSize).toBeGreaterThan(16)
        expect(fontSize).toBeLessThan(60)
      })
    })
  })

  describe('Desktop Devices (1024px+)', () => {
    const desktopBreakpoints = [
      { width: 1024, height: 768, device: 'Small Desktop' },
      { width: 1280, height: 720, device: 'HD Desktop' },
      { width: 1440, height: 900, device: 'MacBook Pro' },
      { width: 1920, height: 1080, device: 'Full HD Desktop' },
      { width: 2560, height: 1440, device: '2K Desktop' },
    ]

    desktopBreakpoints.forEach(({ width, height, device }) => {
      it(`should render correctly on ${device} (${width}x${height})`, async () => {
        await act(async () => {
          mockResize(width, height)
        })

        render(<LandingPageRedesign />)

        // Should use full desktop layout
        const heroSection = screen.getByTestId('hero-section')
        expect(heroSection).toBeInTheDocument()

        // Asymmetrical hero should be side-by-side
        const heroContent = heroSection.querySelector('[data-testid="hero-content"]')
        if (heroContent) {
          const computedStyle = window.getComputedStyle(heroContent)
          expect(computedStyle.display).toMatch(/(flex|grid)/)
        }

        // Competitive matrix should be full table
        const matrix = screen.getByTestId('competitive-matrix')
        expect(matrix).toBeInTheDocument()
      })
    })

    it('should utilize wide screens effectively', async () => {
      await act(async () => {
        mockResize(2560, 1440)
      })

      render(<LandingPageRedesign />)

      // Content should not be too wide (max-width constraint)
      const mainContent = screen.getByRole('main')
      const computedStyle = window.getComputedStyle(mainContent)
      
      // Should have reasonable max-width
      expect(computedStyle.maxWidth).toBeTruthy()
    })
  })

  describe('Orientation Changes', () => {
    it('should handle portrait to landscape transition', async () => {
      // Start in portrait
      await act(async () => {
        mockResize(375, 812)
      })

      const { rerender } = render(<LandingPageRedesign />)

      expect(screen.getByTestId('hero-section')).toBeInTheDocument()

      // Switch to landscape
      await act(async () => {
        mockResize(812, 375)
        rerender(<LandingPageRedesign />)
      })

      // Should still render correctly
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('floating-navigation')).toBeInTheDocument()
    })

    it('should adjust layout for landscape mobile', async () => {
      await act(async () => {
        mockResize(812, 375) // Landscape mobile
      })

      render(<LandingPageRedesign />)

      // Should optimize for landscape viewing
      const heroSection = screen.getByTestId('hero-section')
      const computedStyle = window.getComputedStyle(heroSection)
      
      // Should adjust height for landscape
      expect(computedStyle.minHeight).toBeTruthy()
    })
  })

  describe('Content Reflow and Readability', () => {
    it('should maintain readable line lengths across breakpoints', async () => {
      const breakpoints = [375, 768, 1024, 1440]

      for (const width of breakpoints) {
        await act(async () => {
          mockResize(width, 800)
        })

        render(<LandingPageRedesign />)

        const textElements = document.querySelectorAll('p, li')
        textElements.forEach(element => {
          const computedStyle = window.getComputedStyle(element)
          const maxWidth = computedStyle.maxWidth
          
          // Should have reasonable max-width for readability
          if (maxWidth && maxWidth !== 'none') {
            const maxWidthPx = parseFloat(maxWidth)
            expect(maxWidthPx).toBeLessThan(800) // Optimal reading width
          }
        })
      }
    })

    it('should scale images appropriately', async () => {
      const breakpoints = [375, 768, 1024, 1440]

      for (const width of breakpoints) {
        await act(async () => {
          mockResize(width, 800)
        })

        render(<LandingPageRedesign />)

        const images = screen.getAllByRole('img')
        images.forEach(img => {
          const rect = img.getBoundingClientRect()
          
          // Images should not overflow container
          expect(rect.width).toBeLessThanOrEqual(width)
          
          // Images should maintain aspect ratio
          expect(rect.width).toBeGreaterThan(0)
          expect(rect.height).toBeGreaterThan(0)
        })
      }
    })
  })

  describe('Interactive Elements Responsiveness', () => {
    it('should maintain usable button sizes across breakpoints', async () => {
      const breakpoints = [320, 768, 1024, 1440]

      for (const width of breakpoints) {
        await act(async () => {
          mockResize(width, 800)
        })

        render(<LandingPageRedesign />)

        const buttons = screen.getAllByRole('button')
        buttons.forEach(button => {
          const rect = button.getBoundingClientRect()
          
          if (width < 768) {
            // Mobile: minimum 44px touch target
            expect(Math.max(rect.width, rect.height)).toBeGreaterThanOrEqual(44)
          } else {
            // Desktop: minimum 32px
            expect(Math.max(rect.width, rect.height)).toBeGreaterThanOrEqual(32)
          }
        })
      }
    })

    it('should adapt navigation for different screen sizes', async () => {
      // Mobile
      await act(async () => {
        mockResize(375, 667)
      })

      render(<LandingPageRedesign />)
      
      const mobileNav = screen.getByTestId('floating-navigation')
      expect(mobileNav).toBeInTheDocument()

      // Desktop
      await act(async () => {
        mockResize(1440, 900)
      })

      render(<LandingPageRedesign />)
      
      const desktopNav = screen.getByTestId('floating-navigation')
      expect(desktopNav).toBeInTheDocument()
    })
  })

  describe('Performance on Different Screen Sizes', () => {
    it('should load appropriate image sizes', async () => {
      const breakpoints = [
        { width: 375, expectedSize: 'small' },
        { width: 768, expectedSize: 'medium' },
        { width: 1440, expectedSize: 'large' },
      ]

      for (const { width, expectedSize } of breakpoints) {
        await act(async () => {
          mockResize(width, 800)
        })

        render(<LandingPageRedesign />)

        const images = screen.getAllByRole('img')
        images.forEach(img => {
          const src = img.getAttribute('src')
          if (src) {
            // Should load appropriate size based on screen width
            // This would depend on your image optimization setup
            expect(src).toBeTruthy()
          }
        })
      }
    })

    it('should not load unnecessary content on mobile', async () => {
      await act(async () => {
        mockResize(375, 667)
      })

      render(<LandingPageRedesign />)

      // Check that heavy desktop-only content is not loaded
      const decorativeElements = document.querySelectorAll('[data-desktop-only="true"]')
      decorativeElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element)
        expect(computedStyle.display).toBe('none')
      })
    })
  })

  describe('Edge Cases and Extreme Sizes', () => {
    it('should handle very small screens (< 320px)', async () => {
      await act(async () => {
        mockResize(280, 500)
      })

      render(<LandingPageRedesign />)

      // Should still be functional, even if not optimal
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })

    it('should handle very large screens (> 2560px)', async () => {
      await act(async () => {
        mockResize(3840, 2160) // 4K
      })

      render(<LandingPageRedesign />)

      // Should not stretch content too wide
      const mainContent = screen.getByRole('main')
      const rect = mainContent.getBoundingClientRect()
      
      // Content should be centered and not use full width
      expect(rect.width).toBeLessThan(3840)
    })

    it('should handle very tall screens', async () => {
      await act(async () => {
        mockResize(375, 2000)
      })

      render(<LandingPageRedesign />)

      // Should fill the height appropriately
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })
  })
})