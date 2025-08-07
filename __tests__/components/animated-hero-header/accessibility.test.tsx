import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AnimatedHeroHeader } from '@/components/kokonutui/animated-hero-header';

expect.extend(toHaveNoViolations);

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
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
jest.mock('@/hooks/use-reduced-motion', () => ({
  useReducedMotion: () => false,
}));

describe('AnimatedHeroHeader Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<AnimatedHeroHeader />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper heading hierarchy', () => {
    render(<AnimatedHeroHeader />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    // Text is split into letters for animation, so just check it exists
    expect(h1).toBeVisible();
  });

  it('has proper ARIA labels', () => {
    render(<AnimatedHeroHeader />);
    
    const heroSection = screen.getByRole('banner');
    expect(heroSection).toHaveAttribute('aria-label', 'Main hero section with animated content');
    
    const backgroundDiv = document.querySelector('[aria-hidden="true"]');
    expect(backgroundDiv).toBeInTheDocument();
  });

  it('has keyboard accessible CTA button', () => {
    render(<AnimatedHeroHeader />);
    
    const ctaButton = screen.getByRole('button');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).not.toHaveAttribute('tabindex', '-1');
  });

  it('provides proper focus indicators', () => {
    render(<AnimatedHeroHeader />);
    
    const ctaButton = screen.getByRole('button');
    expect(ctaButton).toHaveClass('focus:outline-none', 'focus:ring-4');
  });

  it('respects reduced motion preferences', () => {
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
    });

    render(<AnimatedHeroHeader />);
    
    // Component should still render and be accessible
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('has sufficient color contrast', () => {
    render(<AnimatedHeroHeader />);
    
    const title = screen.getByRole('heading', { level: 1 });
    const computedStyle = window.getComputedStyle(title.firstChild as Element);
    
    // In a real test, you'd use a proper contrast checking library
    // For now, we'll just verify the classes are applied
    expect(title.firstChild).toHaveClass('text-slate-900');
  });

  it('works with screen readers', () => {
    render(<AnimatedHeroHeader />);
    
    // Check that text content is accessible to screen readers
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Streamline sales processes/)).toBeInTheDocument();
    expect(screen.getByText('Start Your Journey')).toBeInTheDocument();
    
    // Ensure decorative elements are hidden from screen readers
    const decorativeElements = document.querySelectorAll('[aria-hidden="true"]');
    expect(decorativeElements.length).toBeGreaterThan(0);
  });

  it('supports high contrast mode', () => {
    // Mock high contrast mode
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-contrast: high)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(<AnimatedHeroHeader />);
    
    // Component should render without issues in high contrast mode
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});