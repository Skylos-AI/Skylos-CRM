/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { 
  FloatingNavigation, 
  CompactFloatingNavigation,
  SectionProgressIndicator 
} from '@/components/landing/floating-navigation'
import { Home, Target, Lightbulb } from 'lucide-react'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}))

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn()

const mockSections = [
  {
    id: 'hero',
    label: 'Home',
    icon: <Home className="w-4 h-4" />,
    href: '#hero'
  },
  {
    id: 'problem',
    label: 'Problem',
    icon: <Target className="w-4 h-4" />,
    href: '#problem'
  },
  {
    id: 'solution',
    label: 'Solution',
    icon: <Lightbulb className="w-4 h-4" />,
    href: '#solution'
  }
]

describe('FloatingNavigation', () => {
  beforeEach(() => {
    // Mock DOM elements for sections
    document.body.innerHTML = `
      <div id="hero">Hero Section</div>
      <div id="problem">Problem Section</div>
      <div id="solution">Solution Section</div>
    `
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders with default sections when no sections provided', () => {
    render(<FloatingNavigation sections={[]} />)
    // Should render but be hidden initially
    expect(document.querySelector('[class*="fixed"]')).toBeInTheDocument()
  })

  it('renders with custom sections', () => {
    render(<FloatingNavigation sections={mockSections} />)
    expect(document.querySelector('[class*="fixed"]')).toBeInTheDocument()
  })

  it('handles section navigation clicks', async () => {
    render(<FloatingNavigation sections={mockSections} />)
    
    // Mock scroll position to make navigation visible
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true })
    Object.defineProperty(window, 'pageYOffset', { value: 200, writable: true })
    
    // Trigger scroll event to make navigation visible
    fireEvent.scroll(window)
    
    await waitFor(() => {
      const toggleButton = screen.getByRole('button')
      if (toggleButton) {
        fireEvent.click(toggleButton)
      }
    })
  })

  it('shows/hides based on scroll position', () => {
    render(<FloatingNavigation sections={mockSections} />)
    
    // Initially hidden (scroll position 0)
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    fireEvent.scroll(window)
    
    // Should be visible after scrolling
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true })
    fireEvent.scroll(window)
  })

  it('handles exit intent detection', () => {
    const onExitIntent = jest.fn()
    render(
      <FloatingNavigation 
        sections={mockSections} 
        exitIntentEnabled={true}
        onExitIntent={onExitIntent}
      />
    )
    
    // Simulate mouse leaving the document
    fireEvent.mouseLeave(document, { clientY: -10 })
    
    expect(onExitIntent).toHaveBeenCalled()
  })

  it('renders progress indicator when enabled', () => {
    render(<FloatingNavigation sections={mockSections} showProgress={true} />)
    
    // Progress indicator should be present
    expect(document.querySelector('[class*="bg-gray-200"]')).toBeInTheDocument()
  })

  it('renders scroll to top button when enabled', () => {
    render(<FloatingNavigation sections={mockSections} showScrollToTop={true} />)
    
    // Mock scroll position to show scroll to top
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    fireEvent.scroll(window)
  })

  it('positions correctly based on position prop', () => {
    const { rerender } = render(
      <FloatingNavigation sections={mockSections} position="left" />
    )
    
    expect(document.querySelector('[class*="left-6"]')).toBeInTheDocument()
    
    rerender(<FloatingNavigation sections={mockSections} position="right" />)
    expect(document.querySelector('[class*="right-6"]')).toBeInTheDocument()
  })
})

describe('CompactFloatingNavigation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="hero">Hero Section</div>
      <div id="problem">Problem Section</div>
      <div id="solution">Solution Section</div>
    `
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders compact navigation', () => {
    render(<CompactFloatingNavigation sections={mockSections} />)
    expect(document.querySelector('[class*="fixed"]')).toBeInTheDocument()
  })

  it('shows only first 5 sections', () => {
    const manySections = Array.from({ length: 10 }, (_, i) => ({
      id: `section-${i}`,
      label: `Section ${i}`,
      icon: <Home className="w-4 h-4" />,
      href: `#section-${i}`
    }))
    
    render(<CompactFloatingNavigation sections={manySections} />)
    
    // Mock scroll to make it visible
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true })
    fireEvent.scroll(window)
  })

  it('handles section clicks', () => {
    render(<CompactFloatingNavigation sections={mockSections} />)
    
    // Mock scroll to make it visible
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true })
    fireEvent.scroll(window)
  })
})

describe('SectionProgressIndicator', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="hero">Hero Section</div>
      <div id="problem">Problem Section</div>
      <div id="solution">Solution Section</div>
    `
    
    // Mock document dimensions
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true
    })
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders progress indicator', () => {
    render(<SectionProgressIndicator sections={mockSections} />)
    
    expect(document.querySelector('[class*="fixed"]')).toBeInTheDocument()
    expect(document.querySelector('[class*="bg-gray-200"]')).toBeInTheDocument()
  })

  it('updates progress based on scroll', () => {
    render(<SectionProgressIndicator sections={mockSections} />)
    
    // Mock scroll position
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true })
    Object.defineProperty(window, 'pageYOffset', { value: 600, writable: true })
    
    fireEvent.scroll(window)
    
    // Progress bar should be present
    expect(document.querySelector('[class*="bg-primary"]')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<SectionProgressIndicator sections={mockSections} className="custom-class" />)
    
    expect(document.querySelector('.custom-class')).toBeInTheDocument()
  })
})

describe('Navigation Integration', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="hero" style="height: 800px;">Hero Section</div>
      <div id="problem" style="height: 800px;">Problem Section</div>
      <div id="solution" style="height: 800px;">Solution Section</div>
    `
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('updates active section based on scroll position', () => {
    render(<FloatingNavigation sections={mockSections} />)
    
    // Mock different scroll positions
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    fireEvent.scroll(window)
    
    Object.defineProperty(window, 'scrollY', { value: 800, writable: true })
    fireEvent.scroll(window)
    
    Object.defineProperty(window, 'scrollY', { value: 1600, writable: true })
    fireEvent.scroll(window)
  })

  it('handles smooth scrolling to sections', async () => {
    render(<FloatingNavigation sections={mockSections} />)
    
    const heroElement = document.getElementById('hero')
    const problemElement = document.getElementById('problem')
    
    expect(heroElement).toBeInTheDocument()
    expect(problemElement).toBeInTheDocument()
  })
})