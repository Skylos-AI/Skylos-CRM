/**
 * WCAG 2.1 AA Accessibility Compliance for Sophisticated Landing Page
 */

// Color contrast validation
export const colorContrast = {
  // Calculate contrast ratio between two colors
  calculateContrastRatio: (color1: string, color2: string): number => {
    const getLuminance = (color: string): number => {
      // Convert hex to RGB
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      // Calculate relative luminance
      const sRGB = [r, g, b].map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    };
    
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  },
  
  // Validate WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
  validateWCAGCompliance: (
    textColor: string,
    backgroundColor: string,
    isLargeText: boolean = false
  ): { compliant: boolean; ratio: number; level: string } => {
    const ratio = colorContrast.calculateContrastRatio(textColor, backgroundColor);
    const requiredRatio = isLargeText ? 3 : 4.5;
    const aaCompliant = ratio >= requiredRatio;
    const aaaCompliant = ratio >= (isLargeText ? 4.5 : 7);
    
    return {
      compliant: aaCompliant,
      ratio: Math.round(ratio * 100) / 100,
      level: aaaCompliant ? 'AAA' : aaCompliant ? 'AA' : 'Fail'
    };
  },
  
  // Sophisticated color palette compliance check
  validateSophisticatedPalette: () => {
    const palette = {
      deepPurple: '#241b50',
      professionalBlue: '#4567b7',
      skyBlue: '#87ceeb',
      richPurple: '#7a288a',
      white: '#ffffff',
      black: '#000000'
    };
    
    const results: Record<string, any> = {};
    
    // Check text on white background
    Object.entries(palette).forEach(([name, color]) => {
      if (color !== '#ffffff') {
        results[`${name}-on-white`] = colorContrast.validateWCAGCompliance(color, palette.white);
      }
    });
    
    // Check white text on colored backgrounds
    Object.entries(palette).forEach(([name, color]) => {
      if (color !== '#ffffff' && color !== '#87ceeb') { // Skip light colors
        results[`white-on-${name}`] = colorContrast.validateWCAGCompliance(palette.white, color);
      }
    });
    
    return results;
  }
};

// Keyboard navigation support
export const keyboardNavigation = {
  // Create focus trap for modals and overlays
  createFocusTrap: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
      
      if (e.key === 'Escape') {
        // Allow escape to close modal
        const closeButton = container.querySelector('[data-close]') as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    // Focus first element when trap is created
    if (firstElement) {
      firstElement.focus();
    }
    
    return {
      destroy: () => {
        container.removeEventListener('keydown', handleKeyDown);
      }
    };
  },
  
  // Skip links for better navigation
  createSkipLinks: () => {
    const skipLinks = [
      { href: '#main-content', text: 'Skip to main content' },
      { href: '#navigation', text: 'Skip to navigation' },
      { href: '#footer', text: 'Skip to footer' }
    ];
    
    const skipContainer = document.createElement('div');
    skipContainer.className = 'skip-links sr-only-focusable';
    skipContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9999;
      background: #000;
      color: #fff;
      padding: 8px 16px;
      text-decoration: none;
      transform: translateY(-100%);
      transition: transform 0.3s;
    `;
    
    skipLinks.forEach(link => {
      const skipLink = document.createElement('a');
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = 'skip-link';
      skipLink.style.cssText = `
        display: block;
        color: #fff;
        text-decoration: none;
        padding: 4px 0;
      `;
      
      skipLink.addEventListener('focus', () => {
        skipContainer.style.transform = 'translateY(0)';
      });
      
      skipLink.addEventListener('blur', () => {
        skipContainer.style.transform = 'translateY(-100%)';
      });
      
      skipContainer.appendChild(skipLink);
    });
    
    document.body.insertBefore(skipContainer, document.body.firstChild);
  },
  
  // Enhanced focus indicators
  enhanceFocusIndicators: () => {
    const style = document.createElement('style');
    style.textContent = `
      .sophisticated-focus:focus {
        outline: 3px solid #4567b7;
        outline-offset: 2px;
        box-shadow: 0 0 0 2px #fff, 0 0 0 5px #4567b7;
      }
      
      .sophisticated-focus:focus:not(:focus-visible) {
        outline: none;
        box-shadow: none;
      }
      
      .sophisticated-focus:focus-visible {
        outline: 3px solid #4567b7;
        outline-offset: 2px;
        box-shadow: 0 0 0 2px #fff, 0 0 0 5px #4567b7;
      }
    `;
    document.head.appendChild(style);
  }
};

// Screen reader compatibility
export const screenReaderSupport = {
  // Create proper ARIA labels and descriptions
  enhanceARIA: (element: HTMLElement, options: {
    label?: string;
    description?: string;
    role?: string;
    expanded?: boolean;
    controls?: string;
  }) => {
    if (options.label) {
      element.setAttribute('aria-label', options.label);
    }
    
    if (options.description) {
      const descId = `desc-${Math.random().toString(36).substr(2, 9)}`;
      const descElement = document.createElement('span');
      descElement.id = descId;
      descElement.className = 'sr-only';
      descElement.textContent = options.description;
      element.appendChild(descElement);
      element.setAttribute('aria-describedby', descId);
    }
    
    if (options.role) {
      element.setAttribute('role', options.role);
    }
    
    if (options.expanded !== undefined) {
      element.setAttribute('aria-expanded', options.expanded.toString());
    }
    
    if (options.controls) {
      element.setAttribute('aria-controls', options.controls);
    }
  },
  
  // Live regions for dynamic content
  createLiveRegion: (type: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', type);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    return {
      announce: (message: string) => {
        liveRegion.textContent = message;
        setTimeout(() => {
          liveRegion.textContent = '';
        }, 1000);
      },
      destroy: () => {
        document.body.removeChild(liveRegion);
      }
    };
  },
  
  // Semantic markup validation
  validateSemanticMarkup: () => {
    const issues: string[] = [];
    
    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && level !== 1) {
        issues.push('Page should start with h1');
      }
      
      if (level > lastLevel + 1) {
        issues.push(`Heading level jumps from h${lastLevel} to h${level}`);
      }
      
      lastLevel = level;
    });
    
    // Check for alt text on images
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-hidden')) {
        issues.push(`Image ${index + 1} missing alt text`);
      }
    });
    
    // Check for form labels
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input, index) => {
      const hasLabel = document.querySelector(`label[for="${input.id}"]`) ||
                     input.getAttribute('aria-label') ||
                     input.getAttribute('aria-labelledby');
      
      if (!hasLabel) {
        issues.push(`Form input ${index + 1} missing label`);
      }
    });
    
    return issues;
  }
};

// Reduced motion support
export const reducedMotionSupport = {
  // Detect user's motion preference
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Create motion-safe animations
  createMotionSafeAnimation: (
    element: HTMLElement,
    animation: Keyframe[] | PropertyIndexedKeyframes,
    options: KeyframeAnimationOptions
  ) => {
    if (reducedMotionSupport.prefersReducedMotion()) {
      // Provide reduced motion alternative
      return element.animate(
        { opacity: [0, 1] },
        { duration: 200, easing: 'ease-out' }
      );
    }
    
    return element.animate(animation, options);
  },
  
  // Apply reduced motion styles
  applyReducedMotionStyles: () => {
    const style = document.createElement('style');
    style.textContent = `
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        .sophisticated-parallax {
          transform: none !important;
        }
        
        .sophisticated-float {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

// Accessibility testing utilities
export const accessibilityTesting = {
  // Run automated accessibility audit
  runAccessibilityAudit: () => {
    const issues: Array<{
      type: string;
      severity: 'error' | 'warning' | 'info';
      message: string;
      element?: HTMLElement;
    }> = [];
    
    // Check color contrast
    const contrastResults = colorContrast.validateSophisticatedPalette();
    Object.entries(contrastResults).forEach(([key, result]) => {
      if (!result.compliant) {
        issues.push({
          type: 'color-contrast',
          severity: 'error',
          message: `Poor color contrast: ${key} (${result.ratio}:1, needs ${result.level === 'AAA' ? '7:1' : '4.5:1'})`
        });
      }
    });
    
    // Check semantic markup
    const semanticIssues = screenReaderSupport.validateSemanticMarkup();
    semanticIssues.forEach(issue => {
      issues.push({
        type: 'semantic-markup',
        severity: 'warning',
        message: issue
      });
    });
    
    // Check for keyboard accessibility
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach((element, index) => {
      if (element.getAttribute('tabindex') === '-1' && !element.getAttribute('aria-hidden')) {
        issues.push({
          type: 'keyboard-accessibility',
          severity: 'error',
          message: `Interactive element ${index + 1} not keyboard accessible`,
          element: element as HTMLElement
        });
      }
    });
    
    return issues;
  },
  
  // Generate accessibility report
  generateAccessibilityReport: () => {
    const issues = accessibilityTesting.runAccessibilityAudit();
    const report = {
      timestamp: new Date().toISOString(),
      totalIssues: issues.length,
      errors: issues.filter(i => i.severity === 'error').length,
      warnings: issues.filter(i => i.severity === 'warning').length,
      info: issues.filter(i => i.severity === 'info').length,
      issues: issues,
      compliance: {
        colorContrast: colorContrast.validateSophisticatedPalette(),
        reducedMotion: reducedMotionSupport.prefersReducedMotion(),
        semanticMarkup: screenReaderSupport.validateSemanticMarkup().length === 0
      }
    };
    
    console.log('Accessibility Report:', report);
    return report;
  }
};

// Export all accessibility utilities
export const sophisticatedAccessibility = {
  colorContrast,
  keyboardNavigation,
  screenReaderSupport,
  reducedMotionSupport,
  accessibilityTesting
};