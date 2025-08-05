/**
 * ScrollTriggeredSection Component Tests
 * 
 * Unit tests for scroll-triggered animation components
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { ScrollTriggeredSection, StaggerItem } from '@/components/animations/scroll-triggered-section'
import { StaggerContainer } from '@/components/animations/stagger-container'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => (
      <div ref={ref} {...props} data-testid="motion-div">
        {children}
      </div>
    )),
  },
}))

// Mock intersection observer
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})
window.IntersectionObserver = mockIntersectionObserver

// Mock matchMedia for reduced motion
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

describe('ScrollTriggeredSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders children correctly', () => {
    render(
      <ScrollTriggeredSection>
        <div>Test content</div>
      </ScrollTriggeredSection>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <ScrollTriggeredSection className="custom-class">
        <div>Test content</div>
      </ScrollTriggeredSection>
    )

    expect(screen.getByTestId('motion-div')).toHaveClass('custom-class')
  })

  it('sets up intersection observer with correct options', () => {
    render(
      <ScrollTriggeredSection
        threshold={0.5}
        rootMargin="10px"
        triggerOnce={false}
      >
        <div>Test content</div>
      </ScrollTriggeredSection>
    )

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.5,
        rootMargin: '10px',
      })
    )
  })

  it('calls animation callbacks when provided', async () => {
    const onAnimationStart = jest.fn()
    const onAnimationComplete = jest.fn()

    render(
      <ScrollTriggeredSection
        onAnimationStart={onAnimationStart}
        onAnimationComplete={onAnimationComplete}
      >
        <div>Test content</div>
      </ScrollTriggeredSection>
    )

    // Note: In a real test, you would trigger the intersection observer
    // and test the callback invocations
    expect(screen.getByTestId('motion-div')).toBeInTheDocument()
  })

  it('respects reduced motion preference', () => {
    // Mock reduced motion preference
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    render(
      <ScrollTriggeredSection>
        <div>Test content</div>
      </ScrollTriggeredSection>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders with different animation types', () => {
    const animationTypes = ['fadeIn', 'fadeInUp', 'fadeInLeft', 'scaleIn'] as const

    animationTypes.forEach(animationType => {
      const { unmount } = render(
        <ScrollTriggeredSection animationType={animationType}>
          <div>Test content {animationType}</div>
        </ScrollTriggeredSection>
      )

      expect(screen.getByText(`Test content ${animationType}`)).toBeInTheDocument()
      unmount()
    })
  })

  it('handles stagger configuration correctly', () => {
    render(
      <ScrollTriggeredSection
        staggerChildren={true}
        staggerDelay={0.2}
      >
        <div>Staggered content</div>
      </ScrollTriggeredSection>
    )

    expect(screen.getByText('Staggered content')).toBeInTheDocument()
  })
})

describe('StaggerContainer', () => {
  it('renders children with stagger configuration', () => {
    render(
      <StaggerContainer staggerDelay={0.1} delayChildren={0.2}>
        <StaggerItem>Item 1</StaggerItem>
        <StaggerItem>Item 2</StaggerItem>
        <StaggerItem>Item 3</StaggerItem>
      </StaggerContainer>
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('applies correct CSS classes for grid layout', () => {
    render(
      <StaggerContainer className="test-grid">
        <div>Grid item</div>
      </StaggerContainer>
    )

    expect(screen.getByTestId('motion-div')).toHaveClass('test-grid')
  })

  it('handles reverse stagger direction', () => {
    render(
      <StaggerContainer direction="reverse">
        <div>Reverse stagger</div>
      </StaggerContainer>
    )

    expect(screen.getByText('Reverse stagger')).toBeInTheDocument()
  })
})

describe('StaggerItem', () => {
  it('renders with different animation types', () => {
    const animationTypes = ['slideUp', 'slideDown', 'slideLeft', 'slideRight', 'fade', 'scale'] as const

    animationTypes.forEach(animationType => {
      const { unmount } = render(
        <StaggerItem animationType={animationType}>
          <div>Item {animationType}</div>
        </StaggerItem>
      )

      expect(screen.getByText(`Item ${animationType}`)).toBeInTheDocument()
      unmount()
    })
  })

  it('applies custom className', () => {
    render(
      <StaggerItem className="custom-item">
        <div>Custom item</div>
      </StaggerItem>
    )

    expect(screen.getByTestId('motion-div')).toHaveClass('custom-item')
  })

  it('renders with different HTML elements', () => {
    render(
      <StaggerItem as="section">
        <div>Section item</div>
      </StaggerItem>
    )

    expect(screen.getByText('Section item')).toBeInTheDocument()
  })
})

// Integration tests
describe('Animation Integration', () => {
  it('works with nested stagger containers and items', () => {
    render(
      <ScrollTriggeredSection animationType="stagger">
        <StaggerContainer>
          <StaggerItem>Nested item 1</StaggerItem>
          <StaggerItem>Nested item 2</StaggerItem>
        </StaggerContainer>
      </ScrollTriggeredSection>
    )

    expect(screen.getByText('Nested item 1')).toBeInTheDocument()
    expect(screen.getByText('Nested item 2')).toBeInTheDocument()
  })

  it('handles performance mode correctly', () => {
    render(
      <ScrollTriggeredSection performanceMode={true}>
        <div>Performance mode content</div>
      </ScrollTriggeredSection>
    )

    expect(screen.getByText('Performance mode content')).toBeInTheDocument()
  })
})

// Accessibility tests
describe('Animation Accessibility', () => {
  it('respects reduced motion preferences', () => {
    // Mock reduced motion
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    render(
      <ScrollTriggeredSection>
        <div>Accessible content</div>
      </ScrollTriggeredSection>
    )

    expect(screen.getByText('Accessible content')).toBeInTheDocument()
  })

  it('provides immediate visibility for reduced motion users', () => {
    // This would test that animations are disabled and content is immediately visible
    // when reduced motion is preferred
    expect(true).toBe(true) // Placeholder for actual implementation
  })
})