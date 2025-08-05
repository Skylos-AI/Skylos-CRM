/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { 
  EnhancedCTAButton, 
  InteractiveFeatureCard, 
  AnimatedStat,
  EnhancedLink,
  InteractiveBadge,
  FloatingElement
} from '@/components/landing/enhanced-interactive-elements'
import { ArrowRight, Star } from 'lucide-react'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => children,
  useMotionValue: () => ({ set: jest.fn() }),
  useSpring: () => ({ set: jest.fn() }),
}))

describe('EnhancedCTAButton', () => {
  it('renders with default props', () => {
    render(<EnhancedCTAButton>Click me</EnhancedCTAButton>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<EnhancedCTAButton onClick={handleClick}>Click me</EnhancedCTAButton>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<EnhancedCTAButton loading>Loading</EnhancedCTAButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows success state', () => {
    render(<EnhancedCTAButton success>Success</EnhancedCTAButton>)
    expect(screen.getByText('Success!')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    render(
      <EnhancedCTAButton icon={<ArrowRight data-testid="arrow-icon" />}>
        With Icon
      </EnhancedCTAButton>
    )
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument()
  })

  it('renders as link when href is provided', () => {
    render(<EnhancedCTAButton href="/test">Link Button</EnhancedCTAButton>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })

  it('applies different variants correctly', () => {
    const { rerender } = render(<EnhancedCTAButton variant="primary">Primary</EnhancedCTAButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<EnhancedCTAButton variant="secondary">Secondary</EnhancedCTAButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<EnhancedCTAButton variant="outline">Outline</EnhancedCTAButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies different sizes correctly', () => {
    const { rerender } = render(<EnhancedCTAButton size="sm">Small</EnhancedCTAButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<EnhancedCTAButton size="lg">Large</EnhancedCTAButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<EnhancedCTAButton size="xl">Extra Large</EnhancedCTAButton>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})

describe('InteractiveFeatureCard', () => {
  const defaultProps = {
    title: 'Test Feature',
    description: 'This is a test feature description',
    icon: <Star data-testid="star-icon" />
  }

  it('renders with required props', () => {
    render(<InteractiveFeatureCard {...defaultProps} />)
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
    expect(screen.getByText('This is a test feature description')).toBeInTheDocument()
    expect(screen.getByTestId('star-icon')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<InteractiveFeatureCard {...defaultProps} onClick={handleClick} />)
    
    fireEvent.click(screen.getByText('Test Feature').closest('div')!)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with badge', () => {
    render(<InteractiveFeatureCard {...defaultProps} badge="New" />)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders as link when href is provided', () => {
    render(<InteractiveFeatureCard {...defaultProps} href="/test" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })

  it('applies different hover effects', () => {
    const { rerender } = render(<InteractiveFeatureCard {...defaultProps} hoverEffect="lift" />)
    expect(screen.getByText('Test Feature')).toBeInTheDocument()

    rerender(<InteractiveFeatureCard {...defaultProps} hoverEffect="tilt" />)
    expect(screen.getByText('Test Feature')).toBeInTheDocument()

    rerender(<InteractiveFeatureCard {...defaultProps} hoverEffect="glow" />)
    expect(screen.getByText('Test Feature')).toBeInTheDocument()

    rerender(<InteractiveFeatureCard {...defaultProps} hoverEffect="scale" />)
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
  })
})

describe('AnimatedStat', () => {
  // Mock IntersectionObserver
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  it('renders with required props', () => {
    render(<AnimatedStat value={100} label="Test Stat" />)
    
    expect(screen.getByText('Test Stat')).toBeInTheDocument()
    // Initial value should be 0
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders with prefix and suffix', () => {
    render(<AnimatedStat value={100} label="Test Stat" prefix="$" suffix="%" />)
    
    expect(screen.getByText('Test Stat')).toBeInTheDocument()
    // Should show prefix and suffix even with initial value
    expect(screen.getByText(/\$.*%/)).toBeInTheDocument()
  })

  it('renders with icon', () => {
    render(<AnimatedStat value={100} label="Test Stat" icon={<Star data-testid="stat-icon" />} />)
    
    expect(screen.getByTestId('stat-icon')).toBeInTheDocument()
  })
})

describe('EnhancedLink', () => {
  it('renders with default variant', () => {
    render(<EnhancedLink>Test Link</EnhancedLink>)
    expect(screen.getByText('Test Link')).toBeInTheDocument()
  })

  it('renders as link when href is provided', () => {
    render(<EnhancedLink href="/test">Test Link</EnhancedLink>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
  })

  it('renders as button when onClick is provided', () => {
    const handleClick = jest.fn()
    render(<EnhancedLink onClick={handleClick}>Test Link</EnhancedLink>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with different variants', () => {
    const { rerender } = render(<EnhancedLink variant="arrow">Arrow Link</EnhancedLink>)
    expect(screen.getByText('Arrow Link')).toBeInTheDocument()

    rerender(<EnhancedLink variant="external">External Link</EnhancedLink>)
    expect(screen.getByText('External Link')).toBeInTheDocument()

    rerender(<EnhancedLink variant="underline">Underline Link</EnhancedLink>)
    expect(screen.getByText('Underline Link')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    render(<EnhancedLink icon={<Star data-testid="link-icon" />}>Link with Icon</EnhancedLink>)
    expect(screen.getByTestId('link-icon')).toBeInTheDocument()
  })

  it('applies different sizes', () => {
    const { rerender } = render(<EnhancedLink size="sm">Small Link</EnhancedLink>)
    expect(screen.getByText('Small Link')).toBeInTheDocument()

    rerender(<EnhancedLink size="lg">Large Link</EnhancedLink>)
    expect(screen.getByText('Large Link')).toBeInTheDocument()
  })
})

describe('InteractiveBadge', () => {
  it('renders with default props', () => {
    render(<InteractiveBadge>Test Badge</InteractiveBadge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('handles click events when onClick is provided', () => {
    const handleClick = jest.fn()
    render(<InteractiveBadge onClick={handleClick}>Clickable Badge</InteractiveBadge>)
    
    fireEvent.click(screen.getByText('Clickable Badge'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies different variants', () => {
    const { rerender } = render(<InteractiveBadge variant="success">Success</InteractiveBadge>)
    expect(screen.getByText('Success')).toBeInTheDocument()

    rerender(<InteractiveBadge variant="warning">Warning</InteractiveBadge>)
    expect(screen.getByText('Warning')).toBeInTheDocument()

    rerender(<InteractiveBadge variant="error">Error</InteractiveBadge>)
    expect(screen.getByText('Error')).toBeInTheDocument()

    rerender(<InteractiveBadge variant="info">Info</InteractiveBadge>)
    expect(screen.getByText('Info')).toBeInTheDocument()
  })

  it('applies different sizes', () => {
    const { rerender } = render(<InteractiveBadge size="sm">Small</InteractiveBadge>)
    expect(screen.getByText('Small')).toBeInTheDocument()

    rerender(<InteractiveBadge size="lg">Large</InteractiveBadge>)
    expect(screen.getByText('Large')).toBeInTheDocument()
  })
})

describe('FloatingElement', () => {
  it('renders children correctly', () => {
    render(
      <FloatingElement>
        <div>Floating Content</div>
      </FloatingElement>
    )
    expect(screen.getByText('Floating Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <FloatingElement className="custom-class">
        <div>Floating Content</div>
      </FloatingElement>
    )
    expect(screen.getByText('Floating Content').parentElement).toHaveClass('custom-class')
  })
})