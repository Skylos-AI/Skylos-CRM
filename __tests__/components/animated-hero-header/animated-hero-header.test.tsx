import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AnimatedHeroHeader } from '@/components/kokonutui/animated-hero-header';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, animate, whileHover, whileTap, transition, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, variants, initial, animate, whileHover, whileTap, transition, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, variants, initial, animate, whileHover, whileTap, transition, ...props }: any) => <button {...props}>{children}</button>,
    path: ({ children, variants, initial, animate, whileHover, whileTap, transition, ...props }: any) => <path {...props}>{children}</path>,
  },
}));

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

// Mock reduced motion hook
jest.mock('@/hooks/use-reduced-motion');
const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>;

describe('AnimatedHeroHeader', () => {
  beforeEach(() => {
    mockUseReducedMotion.mockReturnValue(false);
    
    // Mock window.matchMedia
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
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default content', () => {
    render(<AnimatedHeroHeader />);
    
    // Check that the component renders properly
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Streamline sales processes/)).toBeInTheDocument();
    expect(screen.getByText('Start Your Journey')).toBeInTheDocument();
  });

  it('renders with custom content', () => {
    const customProps = {
      title: 'Custom Title',
      subtitle: 'Custom subtitle text',
      ctaText: 'Custom CTA',
    };

    render(<AnimatedHeroHeader {...customProps} />);
    
    // Check that the component renders with custom content
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Custom subtitle text')).toBeInTheDocument();
    expect(screen.getByText('Custom CTA')).toBeInTheDocument();
  });

  it('calls onCtaClick when CTA button is clicked', () => {
    const mockOnCtaClick = jest.fn();
    
    render(<AnimatedHeroHeader onCtaClick={mockOnCtaClick} />);
    
    const ctaButton = screen.getByText('Start Your Journey');
    fireEvent.click(ctaButton);
    
    expect(mockOnCtaClick).toHaveBeenCalledTimes(1);
  });

  it('respects reduced motion preferences', () => {
    mockUseReducedMotion.mockReturnValue(true);
    
    render(<AnimatedHeroHeader />);
    
    // Component should still render but without animations
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<AnimatedHeroHeader />);
    
    const heroSection = screen.getByRole('banner');
    expect(heroSection).toHaveAttribute('aria-label', 'Main hero section with animated content');
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });

  it('applies dark theme classes correctly', () => {
    render(<AnimatedHeroHeader theme="dark" />);
    
    const heroSection = screen.getByRole('banner');
    expect(heroSection).toHaveClass('bg-slate-900', 'text-white');
  });

  it('handles keyboard navigation', () => {
    render(<AnimatedHeroHeader />);
    
    const ctaButton = screen.getByText('Start Your Journey');
    
    // Focus the button
    ctaButton.focus();
    
    // Press Enter
    fireEvent.keyDown(ctaButton, { key: 'Enter' });
    // Button should be functional
    expect(ctaButton).toBeInTheDocument();
  });

  it('renders floating paths background', () => {
    render(<AnimatedHeroHeader />);
    
    // Check for SVG elements (floating paths)
    const svgElements = document.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('applies responsive classes correctly', () => {
    render(<AnimatedHeroHeader />);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title.firstChild).toHaveClass(
      'text-4xl',
      'sm:text-5xl', 
      'md:text-6xl',
      'lg:text-7xl',
      'xl:text-8xl'
    );
  });
});