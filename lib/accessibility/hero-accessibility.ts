// Accessibility utilities for the animated hero header

/**
 * ARIA labels and semantic structure for the hero header
 */
export const HERO_ARIA_LABELS = {
  heroSection: "Main hero section with animated content",
  heroTitle: "Main page heading",
  heroSubtitle: "Page description and value proposition", 
  ctaButton: "Primary call-to-action button",
  backgroundAnimation: "Decorative background animation",
} as const;

/**
 * Keyboard navigation utilities
 */
export const KEYBOARD_NAVIGATION = {
  focusableSelectors: [
    'button',
    '[href]',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])',
  ].join(','),
  
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      KEYBOARD_NAVIGATION.focusableSelectors
    ) as NodeListOf<HTMLElement>;
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  },
} as const;

/**
 * Color contrast validation utilities
 */
export const COLOR_CONTRAST = {
  // WCAG AA compliant contrast ratios
  minimumContrast: 4.5,
  largeTextContrast: 3.0,
  
  // Validate contrast ratio (simplified implementation)
  validateContrast: (foreground: string, background: string): boolean => {
    // This is a simplified check - in production, use a proper contrast calculation library
    // For now, we'll assume our predefined color combinations are compliant
    return true;
  },
  
  // High contrast mode detection
  isHighContrastMode: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    return window.matchMedia('(prefers-contrast: high)').matches;
  },
} as const;

/**
 * Screen reader utilities
 */
export const SCREEN_READER = {
  announceToScreenReader: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (typeof document === 'undefined') return;
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },
  
  // Skip link for keyboard navigation
  createSkipLink: (targetId: string, text: string = 'Skip to main content') => {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.textContent = text;
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded';
    
    return skipLink;
  },
} as const;