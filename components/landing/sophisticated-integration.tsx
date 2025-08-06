'use client';

import React, { useEffect } from 'react';
import { sophisticatedPerformance } from '@/lib/performance/sophisticated-performance';
import { sophisticatedAccessibility } from '@/lib/accessibility/sophisticated-accessibility';
import { sophisticatedMobileUtils } from '@/lib/utils/sophisticated-mobile-optimization';

interface SophisticatedIntegrationProps {
  children: React.ReactNode;
  enablePerformanceMonitoring?: boolean;
  enableAccessibilityEnhancements?: boolean;
  enableMobileOptimizations?: boolean;
}

export function SophisticatedIntegration({
  children,
  enablePerformanceMonitoring = true,
  enableAccessibilityEnhancements = true,
  enableMobileOptimizations = true
}: SophisticatedIntegrationProps) {
  
  useEffect(() => {
    // Initialize performance optimizations
    if (enablePerformanceMonitoring) {
      // Preload critical resources
      sophisticatedPerformance.codeOptimization.preloadCriticalResources();
      
      // Optimize font loading
      sophisticatedPerformance.webVitalsOptimization.optimizeLCP.optimizeFontLoading();
      
      // Start performance monitoring
      sophisticatedPerformance.performanceMonitoring.measureWebVitals();
      
      // Create performance budget
      const budget = sophisticatedPerformance.performanceMonitoring.createPerformanceBudget({
        lcp: 2500, // 2.5 seconds
        fid: 100,  // 100ms
        cls: 0.1   // 0.1
      });
    }

    // Initialize accessibility enhancements
    if (enableAccessibilityEnhancements) {
      // Create skip links
      sophisticatedAccessibility.keyboardNavigation.createSkipLinks();
      
      // Enhance focus indicators
      sophisticatedAccessibility.keyboardNavigation.enhanceFocusIndicators();
      
      // Apply reduced motion styles
      sophisticatedAccessibility.reducedMotionSupport.applyReducedMotionStyles();
      
      // Run accessibility audit in development
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          sophisticatedAccessibility.accessibilityTesting.generateAccessibilityReport();
        }, 2000);
      }
    }

    // Initialize mobile optimizations
    if (enableMobileOptimizations) {
      // Start performance monitoring for mobile
      if (sophisticatedMobileUtils.deviceDetection.isMobile()) {
        sophisticatedMobileUtils.mobilePerformanceMonitor.measureCLS();
        sophisticatedMobileUtils.mobilePerformanceMonitor.measureFID();
        sophisticatedMobileUtils.mobilePerformanceMonitor.measureLCP();
      }
    }

    // Cleanup function
    return () => {
      // Clean up any event listeners or observers
    };
  }, [enablePerformanceMonitoring, enableAccessibilityEnhancements, enableMobileOptimizations]);

  return (
    <div className="sophisticated-landing-integration">
      {children}
    </div>
  );
}

// Section transition manager
export function SectionTransitionManager({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Create intersection observer for section transitions
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return <>{children}</>;
}

// Brand consistency wrapper
export function BrandConsistencyWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply consistent styling across all sections
    const style = document.createElement('style');
    style.textContent = `
      .section-visible {
        animation: sectionFadeIn 0.8s ease-out forwards;
      }
      
      @keyframes sectionFadeIn {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Consistent focus styles */
      .sophisticated-focus:focus-visible {
        outline: 3px solid #4567b7;
        outline-offset: 2px;
        box-shadow: 0 0 0 2px #fff, 0 0 0 5px #4567b7;
      }
      
      /* Consistent button styles */
      .sophisticated-button {
        transition: all 0.2s ease-out;
        transform-origin: center;
      }
      
      .sophisticated-button:hover {
        transform: translateY(-2px);
      }
      
      .sophisticated-button:active {
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
}