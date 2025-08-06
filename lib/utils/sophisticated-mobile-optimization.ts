/**
 * Mobile Optimization Utilities for Sophisticated Landing Page
 */

// Device detection utilities
export const deviceDetection = {
  isMobile: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  },
  
  isTablet: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  },
  
  isDesktop: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024;
  },
  
  isTouchDevice: () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
};

// Performance optimization for mobile
export const mobilePerformance = {
  // Lazy load images with intersection observer
  createImageObserver: (callback: (entries: IntersectionObserverEntry[]) => void) => {
    if (typeof window === 'undefined') return null;
    
    return new IntersectionObserver(callback, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
  },
  
  // Debounce scroll events for better performance
  debounceScroll: (func: Function, wait: number = 16) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Optimize animations for mobile
  getOptimizedAnimationConfig: () => {
    const isMobile = deviceDetection.isMobile();
    return {
      duration: isMobile ? 0.3 : 0.6,
      ease: isMobile ? "easeOut" : "easeInOut",
      stagger: isMobile ? 0.1 : 0.15
    };
  },
  
  // Reduce motion for performance
  shouldReduceMotion: () => {
    if (typeof window === 'undefined') return true;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches || deviceDetection.isMobile();
  }
};

// Touch interaction optimizations
export const touchOptimizations = {
  // Minimum touch target size (44px recommended by Apple, 48px by Google)
  minTouchTarget: '48px',
  
  // Touch-friendly spacing
  touchSpacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  },
  
  // Prevent zoom on input focus (iOS)
  preventZoomCSS: {
    fontSize: '16px', // Prevents zoom on iOS
    WebkitAppearance: 'none',
    borderRadius: '0' // Removes iOS default styling
  },
  
  // Touch gesture handlers
  createSwipeHandler: (
    onSwipeLeft?: () => void,
    onSwipeRight?: () => void,
    threshold: number = 50
  ) => {
    let startX: number;
    let startY: number;
    
    return {
      onTouchStart: (e: TouchEvent) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      
      onTouchEnd: (e: TouchEvent) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        }
      }
    };
  }
};

// Responsive breakpoints for sophisticated design
export const sophisticatedBreakpoints = {
  mobile: '0px',
  mobileLarge: '480px',
  tablet: '768px',
  tabletLarge: '1024px',
  desktop: '1280px',
  desktopLarge: '1536px'
};

// Mobile-specific layout utilities
export const mobileLayoutUtils = {
  // Convert asymmetrical layouts to mobile-friendly stacks
  convertAsymmetricalToStack: (direction: 'left' | 'right') => {
    return deviceDetection.isMobile() 
      ? 'flex-col space-y-6'
      : direction === 'left' 
        ? 'lg:flex-row lg:space-x-12 lg:space-y-0'
        : 'lg:flex-row-reverse lg:space-x-reverse lg:space-x-12 lg:space-y-0';
  },
  
  // Optimize grid layouts for mobile
  getResponsiveGridClasses: (columns: { mobile: number, tablet: number, desktop: number }) => {
    return `grid grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`;
  },
  
  // Mobile-friendly typography scaling
  getResponsiveTextClasses: (variant: 'hero' | 'section' | 'body') => {
    const scales = {
      hero: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
      section: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
      body: 'text-sm sm:text-base md:text-lg'
    };
    return scales[variant];
  }
};

// Mobile performance monitoring
export const mobilePerformanceMonitor = {
  // Monitor Core Web Vitals on mobile
  measureCLS: () => {
    if (typeof window === 'undefined') return;
    
    let clsValue = 0;
    let clsEntries: any[] = [];
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value;
          clsEntries.push(entry);
        }
      }
    });
    
    observer.observe({ type: 'layout-shift', buffered: true });
    
    return () => {
      observer.disconnect();
      return { value: clsValue, entries: clsEntries };
    };
  },
  
  // Monitor First Input Delay
  measureFID: () => {
    if (typeof window === 'undefined') return;
    
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          resolve((entry as any).processingStart - entry.startTime);
        }
      });
      
      observer.observe({ type: 'first-input', buffered: true });
    });
  },
  
  // Monitor Largest Contentful Paint
  measureLCP: () => {
    if (typeof window === 'undefined') return;
    
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    });
  }
};

// Mobile accessibility enhancements
export const mobileAccessibility = {
  // Ensure proper focus management on mobile
  manageFocus: {
    trapFocus: (container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      container.addEventListener('keydown', (e) => {
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
      });
    },
    
    // Announce content changes to screen readers
    announceToScreenReader: (message: string) => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  },
  
  // Mobile-specific ARIA enhancements
  mobileARIA: {
    // Add touch-specific labels
    addTouchLabels: (element: HTMLElement, action: string) => {
      element.setAttribute('aria-label', `${element.getAttribute('aria-label') || ''} ${action}`);
      element.setAttribute('role', 'button');
    },
    
    // Manage expanded states for mobile menus
    toggleExpanded: (trigger: HTMLElement, target: HTMLElement) => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', (!isExpanded).toString());
      target.setAttribute('aria-hidden', isExpanded.toString());
    }
  }
};

// Export all utilities
export const sophisticatedMobileUtils = {
  deviceDetection,
  mobilePerformance,
  touchOptimizations,
  sophisticatedBreakpoints,
  mobileLayoutUtils,
  mobilePerformanceMonitor,
  mobileAccessibility
};