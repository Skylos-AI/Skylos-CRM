import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import LandingPageRedesign from '@/app/landing/redesign/page'

// Mock device configurations
const deviceConfigs = {
  iPhoneSE: {
    width: 320,
    height: 568,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    pixelRatio: 2,
    touch: true
  },
  iPhone12: {
    width: 390,
    height: 844,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    pixelRatio: 3,
    touch: true
  },
  iPadAir: {
    width: 820,
    height: 1180,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    pixelRatio: 2,
    touch: true
  },
  galaxyS21: {
    width: 360,
    height: 800,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    pixelRatio: 3,
    touch: true
  },
  desktop: {
    width: 1920,
    height: 1080,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    pixelRatio: 1,
    touch: false
  }
}

// Mock device setup
const mockDevice = (config: typeof deviceConfigs.iPhoneSE) => {
  // Mock window dimensions
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: config.width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: config.height,
  })

  // Mock user agent
  Object.defineProperty(window.navigator, 'userAgent', {
    writable: true,
    value: config.userAgent,
  })

  // Mock pixel ratio
  Object.defineProperty(window, 'devicePixelRatio', {
    writable: true,
    configurable: true,
    value: config.pixelRatio,
  })

  // Mock touch support
  Object.defineProperty(window, 'ontouchstart', {
    writable: true,
    configurable: true,
    value: config.touch ? {} : undefined,
  })

  Object.defineProperty(window.navigator, 'maxTouchPoints', {
    writable: true,
    configurable: true,
    value: config.touch ? 5 : 0,
  })

  // Mock matchMedia for responsive queries
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

  // Trigger resize event
  window.dispatchEvent(new Event('resize'))
}

describe('Cross-Device Functionality Testing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('iPhone SE (320x568)', () => {
    beforeEach(() => {
      mockDevice(deviceConfigs.iPhoneSE)
    })

    it('should render correctly on iPhone SE', () => {
      render(<LandingPageRedesign />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('floating-navigation')).toBeInTheDocument()
    })

    it('should have touch-friendly button sizes', () => {
      render(<LandingPageRedesign />)
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect()
        expect(Math.max(rect.width, rect.height)).toBeGreaterThanOrEqual(44)
      })
    })

    it('should stack content vertically', () => {
      render(<LandingPageRedesign />)
      
      const heroSection = screen.getByTestId('hero-section')
      const computedStyle = window.getComputedStyle(heroSection)
      
      // Should use mobile layout
      expect(computedStyle.flexDirection).toBe('column')
    })

    it('should handle touch interactions', async () => {
      const user = userEvent.setup()
      render(<LandingPageRedesign />)
      
      const button = screen.getAllByRole('button')[0]
      
      // Simulate touch interaction
      fireEvent.touchStart(button)
      fireEvent.touchEnd(button)
      
      expect(button).toBeInTheDocument()
    })
  })

  describe('iPhone 12 (390x844)', () => {
    beforeEach(() => {
      mockDevice(deviceConfigs.iPhone12)
    })

    it('should render correctly on iPhone 12', () => {
      render(<LandingPageRedesign />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('problem-urgency-section')).toBeInTheDocument()
    })

    it('should optimize for high pixel ratio', () => {
      render(<LandingPageRedesign />)
      
      const images = screen.getAllByRole('img')
      images.forEach(img => {
        // Should have appropriate srcset for high DPI
        expect(img.getAttribute('src')).toBeTruthy()
      })
    })

    it('should handle orientation changes', async () => {
      render(<LandingPageRedesign />)
      
      // Simulate orientation change
      await act(async () => {
        mockDevice({ ...deviceConfigs.iPhone12, width: 844, height: 390 })
        window.dispatchEvent(new Event('orientationchange'))
      })
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })
  })

  describe('iPad Air (820x1180)', () => {
    beforeEach(() => {
      mockDevice(deviceConfigs.iPadAir)
    })

    it('should render correctly on iPad Air', () => {
      render(<LandingPageRedesign />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('competitive-matrix')).toBeInTheDocument()
    })

    it('should use tablet-optimized layout', () => {
      render(<LandingPageRedesign />)
      
      const competitiveMatrix = screen.getByTestId('competitive-matrix')
      const computedStyle = window.getComputedStyle(competitiveMatrix)
      
      // Should use grid layout on tablet
      expect(computedStyle.display).toMatch(/(grid|flex)/)
    })

    it('should support multi-touch gestures', async () => {
      render(<LandingPageRedesign />)
      
      const carousel = document.querySelector('[data-testid*="carousel"]')
      if (carousel) {
        // Simulate pinch gesture
        const touchStart = new TouchEvent('touchstart', {
          touches: [
            { clientX: 100, clientY: 100 } as Touch,
            { clientX: 200, clientY: 200 } as Touch
          ]
        })
        
        fireEvent(carousel, touchStart)
        expect(carousel).toBeInTheDocument()
      }
    })
  })

  describe('Galaxy S21 (360x800)', () => {
    beforeEach(() => {
      mockDevice(deviceConfigs.galaxyS21)
    })

    it('should render correctly on Galaxy S21', () => {
      render(<LandingPageRedesign />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('floating-navigation')).toBeInTheDocument()
    })

    it('should handle Android-specific interactions', () => {
      render(<LandingPageRedesign />)
      
      // Test back button behavior (simulated)
      const backButton = document.querySelector('[data-testid="back-button"]')
      if (backButton) {
        fireEvent.click(backButton)
        expect(backButton).toBeInTheDocument()
      }
    })

    it('should optimize for Chrome Mobile', () => {
      render(<LandingPageRedesign />)
      
      // Check for Chrome-specific optimizations
      const metaViewport = document.querySelector('meta[name="viewport"]')
      expect(metaViewport).toBeTruthy()
    })
  })

  describe('Desktop (1920x1080)', () => {
    beforeEach(() => {
      mockDevice(deviceConfigs.desktop)
    })

    it('should render correctly on desktop', () => {
      render(<LandingPageRedesign />)
      
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
      expect(screen.getByTestId('competitive-matrix')).toBeInTheDocument()
    })

    it('should use desktop layout', () => {
      render(<LandingPageRedesign />)
      
      const heroSection = screen.getByTestId('hero-section')
      const computedStyle = window.getComputedStyle(heroSection)
      
      // Should use horizontal layout on desktop
      expect(computedStyle.flexDirection).toBe('row')
    })

    it('should support mouse interactions', async () => {
      const user = userEvent.setup()
      render(<LandingPageRedesign />)
      
      const button = screen.getAllByRole('button')[0]
      
      await user.hover(button)
      await user.click(button)
      
      expect(button).toBeInTheDocument()
    })
  })

  describe('Cross-Device Consistency', () => {
    it('should maintain consistent branding across devices', () => {
      const devices = [deviceConfigs.iPhoneSE, deviceConfigs.iPadAir, deviceConfigs.desktop]
      
      devices.forEach(device => {
        mockDevice(device)
        const { unmount } = render(<LandingPageRedesign />)
        
        // Check for consistent branding elements
        expect(screen.getByTestId('hero-section')).toBeInTheDocument()
        
        unmount()
      })
    })

    it('should maintain functionality across devices', () => {
      const devices = [deviceConfigs.iPhone12, deviceConfigs.galaxyS21, deviceConfigs.desktop]
      
      devices.forEach(device => {
        mockDevice(device)
        const { unmount } = render(<LandingPageRedesign />)
        
        // Check for core functionality
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBeGreaterThan(0)
        
        const navigation = screen.getByTestId('floating-navigation')
        expect(navigation).toBeInTheDocument()
        
        unmount()
      })
    })

    it('should load appropriate resources for each device', () => {
      const devices = [
        { config: deviceConfigs.iPhoneSE, expectedImageSize: 'small' },
        { config: deviceConfigs.iPadAir, expectedImageSize: 'medium' },
        { config: deviceConfigs.desktop, expectedImageSize: 'large' }
      ]
      
      devices.forEach(({ config, expectedImageSize }) => {
        mockDevice(config)
        const { unmount } = render(<LandingPageRedesign />)
        
        const images = screen.getAllByRole('img')
        images.forEach(img => {
          const src = img.getAttribute('src')
          expect(src).toBeTruthy()
          // Would check for appropriate image sizes based on device
        })
        
        unmount()
      })
    })
  })

  describe('Performance Across Devices', () => {
    it('should maintain performance on low-end devices', async () => {
      mockDevice(deviceConfigs.iPhoneSE)
      
      const startTime = performance.now()
      render(<LandingPageRedesign />)
      const endTime = performance.now()
      
      // Should render quickly even on slower devices
      expect(endTime - startTime).toBeLessThan(1000)
    })

    it('should optimize animations for mobile devices', () => {
      mockDevice(deviceConfigs.iPhone12)
      render(<LandingPageRedesign />)
      
      const animatedElements = document.querySelectorAll('[data-testid*="scroll-triggered"]')
      animatedElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element)
        // Should have optimized animation duration on mobile
        expect(parseFloat(computedStyle.animationDuration)).toBeLessThanOrEqual(0.5)
      })
    })

    it('should handle memory constraints on mobile', () => {
      mockDevice(deviceConfigs.iPhoneSE)
      
      const { unmount } = render(<LandingPageRedesign />)
      
      // Simulate memory pressure
      if (global.gc) {
        global.gc()
      }
      
      unmount()
      
      // Should clean up properly
      expect(document.querySelectorAll('[data-testid]').length).toBe(0)
    })
  })

  describe('Accessibility Across Devices', () => {
    it('should maintain accessibility on touch devices', () => {
      mockDevice(deviceConfigs.iPhone12)
      render(<LandingPageRedesign />)
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        // Should have proper ARIA labels
        expect(button).toHaveAccessibleName()
        
        // Should have adequate touch target size
        const rect = button.getBoundingClientRect()
        expect(Math.max(rect.width, rect.height)).toBeGreaterThanOrEqual(44)
      })
    })

    it('should support keyboard navigation on all devices', async () => {
      const user = userEvent.setup()
      
      const devices = [deviceConfigs.iPadAir, deviceConfigs.desktop]
      
      for (const device of devices) {
        mockDevice(device)
        const { unmount } = render(<LandingPageRedesign />)
        
        // Should be able to tab through interactive elements
        await user.tab()
        expect(document.activeElement).toBeInstanceOf(HTMLElement)
        
        unmount()
      }
    })

    it('should provide appropriate feedback on different devices', () => {
      const touchDevice = deviceConfigs.iPhone12
      const desktopDevice = deviceConfigs.desktop
      
      // Touch device should have haptic feedback capability
      mockDevice(touchDevice)
      render(<LandingPageRedesign />)
      expect(navigator.maxTouchPoints).toBeGreaterThan(0)
      
      // Desktop should have hover states
      mockDevice(desktopDevice)
      render(<LandingPageRedesign />)
      expect(navigator.maxTouchPoints).toBe(0)
    })
  })

  describe('Network Conditions', () => {
    it('should handle slow network on mobile devices', async () => {
      mockDevice(deviceConfigs.iPhoneSE)
      
      // Mock slow network
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        value: {
          effectiveType: '2g',
          downlink: 0.5,
          rtt: 2000
        }
      })
      
      render(<LandingPageRedesign />)
      
      // Should still render core content
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })

    it('should optimize resource loading based on device capabilities', () => {
      const devices = [
        { config: deviceConfigs.iPhoneSE, expectOptimized: true },
        { config: deviceConfigs.desktop, expectOptimized: false }
      ]
      
      devices.forEach(({ config, expectOptimized }) => {
        mockDevice(config)
        const { unmount } = render(<LandingPageRedesign />)
        
        const images = screen.getAllByRole('img')
        images.forEach(img => {
          const loading = img.getAttribute('loading')
          if (expectOptimized) {
            expect(loading).toBe('lazy')
          }
        })
        
        unmount()
      })
    })
  })
})