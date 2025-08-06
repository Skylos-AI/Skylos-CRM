/**
 * Performance Optimization for Sophisticated Landing Page
 * Ensures 60fps animations and sub-3-second load times
 */

// Animation performance optimization
export const animationPerformance = {
  // Force hardware acceleration for smooth animations
  enableHardwareAcceleration: (element: HTMLElement) => {
    element.style.transform = 'translateZ(0)';
    element.style.willChange = 'transform, opacity';
  },
  
  // Optimize animation timing for 60fps
  optimizeAnimationTiming: {
    // Use requestAnimationFrame for smooth animations
    createAnimationLoop: (callback: (timestamp: number) => void) => {
      let lastTime = 0;
      const targetFPS = 60;
      const targetFrameTime = 1000 / targetFPS;
      
      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime >= targetFrameTime) {
          callback(currentTime);
          lastTime = currentTime - (deltaTime % targetFrameTime);
        }
        
        requestAnimationFrame(animate);
      };
      
      return requestAnimationFrame(animate);
    },
    
    // Throttle scroll events for better performance
    throttleScroll: (callback: Function, limit: number = 16) => {
      let inThrottle: boolean;
      return function(this: any, ...args: any[]) {
        if (!inThrottle) {
          callback.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  },
  
  // Monitor animation performance
  performanceMonitor: {
    measureFrameRate: () => {
      let frames = 0;
      let lastTime = performance.now();
      
      const measureFPS = () => {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
          const fps = Math.round((frames * 1000) / (currentTime - lastTime));
          console.log(`Current FPS: ${fps}`);
          frames = 0;
          lastTime = currentTime;
        }
        
        requestAnimationFrame(measureFPS);
      };
      
      requestAnimationFrame(measureFPS);
    },
    
    // Detect performance issues
    detectJank: () => {
      let lastFrameTime = performance.now();
      
      const checkFrame = () => {
        const currentTime = performance.now();
        const frameDuration = currentTime - lastFrameTime;
        
        // Flag frames longer than 16.67ms (60fps threshold)
        if (frameDuration > 16.67) {
          console.warn(`Jank detected: ${frameDuration.toFixed(2)}ms frame`);
        }
        
        lastFrameTime = currentTime;
        requestAnimationFrame(checkFrame);
      };
      
      requestAnimationFrame(checkFrame);
    }
  }
};

// Code splitting and lazy loading
export const codeOptimization = {
  // Dynamic imports for animation libraries
  loadAnimationLibrary: async () => {
    const { motion } = await import('framer-motion');
    return motion;
  },
  
  // Lazy load components below the fold
  createLazyComponent: <T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
  ) => {
    return React.lazy(importFunc);
  },
  
  // Preload critical resources
  preloadCriticalResources: () => {
    // Preload fonts
    const fontPreloads = [
      '/fonts/inter-var.woff2',
      '/fonts/roboto-var.woff2'
    ];
    
    fontPreloads.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    // Preload critical images
    const criticalImages = [
      '/images/hero-bg.webp',
      '/images/ai-visualization.webp'
    ];
    
    criticalImages.forEach(image => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = image;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }
};

// Core Web Vitals optimization
export const webVitalsOptimization = {
  // Optimize Largest Contentful Paint (LCP)
  optimizeLCP: {
    // Preload hero images
    preloadHeroImage: (src: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    },
    
    // Optimize font loading
    optimizeFontLoading: () => {
      // Use font-display: swap for better LCP
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
          src: url('/fonts/inter-var.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Roboto';
          font-display: swap;
          src: url('/fonts/roboto-var.woff2') format('woff2');
        }
      `;
      document.head.appendChild(style);
    }
  },
  
  // Optimize First Input Delay (FID)
  optimizeFID: {
    // Break up long tasks
    yieldToMain: () => {
      return new Promise(resolve => {
        setTimeout(resolve, 0);
      });
    },
    
    // Use web workers for heavy computations
    createWebWorker: (script: string) => {
      const blob = new Blob([script], { type: 'application/javascript' });
      return new Worker(URL.createObjectURL(blob));
    }
  },
  
  // Optimize Cumulative Layout Shift (CLS)
  optimizeCLS: {
    // Reserve space for dynamic content
    reserveSpace: (element: HTMLElement, width: number, height: number) => {
      element.style.minWidth = `${width}px`;
      element.style.minHeight = `${height}px`;
    },
    
    // Use transform instead of changing layout properties
    animateWithTransform: (element: HTMLElement, x: number, y: number) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }
};

// Image optimization
export const imageOptimization = {
  // Create responsive image with multiple formats
  createResponsiveImage: (
    src: string,
    alt: string,
    sizes: string = '100vw'
  ) => {
    const picture = document.createElement('picture');
    
    // WebP source
    const webpSource = document.createElement('source');
    webpSource.srcset = `${src.replace(/\.[^.]+$/, '.webp')}`;
    webpSource.type = 'image/webp';
    picture.appendChild(webpSource);
    
    // AVIF source (if available)
    const avifSource = document.createElement('source');
    avifSource.srcset = `${src.replace(/\.[^.]+$/, '.avif')}`;
    avifSource.type = 'image/avif';
    picture.appendChild(avifSource);
    
    // Fallback image
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.sizes = sizes;
    img.loading = 'lazy';
    img.decoding = 'async';
    picture.appendChild(img);
    
    return picture;
  },
  
  // Lazy load images with intersection observer
  createImageObserver: () => {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    return imageObserver;
  }
};

// Memory management
export const memoryOptimization = {
  // Clean up event listeners
  createCleanupManager: () => {
    const listeners: Array<{
      element: Element;
      event: string;
      handler: EventListener;
    }> = [];
    
    return {
      addEventListener: (
        element: Element,
        event: string,
        handler: EventListener,
        options?: AddEventListenerOptions
      ) => {
        element.addEventListener(event, handler, options);
        listeners.push({ element, event, handler });
      },
      
      cleanup: () => {
        listeners.forEach(({ element, event, handler }) => {
          element.removeEventListener(event, handler);
        });
        listeners.length = 0;
      }
    };
  },
  
  // Debounce expensive operations
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
  
  // Throttle high-frequency events
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Performance monitoring and reporting
export const performanceMonitoring = {
  // Measure and report Core Web Vitals
  measureWebVitals: () => {
    // Measure LCP
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('LCP:', entry.startTime);
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    
    // Measure FID
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('FID:', (entry as any).processingStart - entry.startTime);
      }
    }).observe({ type: 'first-input', buffered: true });
    
    // Measure CLS
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      console.log('CLS:', clsValue);
    }).observe({ type: 'layout-shift', buffered: true });
  },
  
  // Create performance budget alerts
  createPerformanceBudget: (budgets: {
    lcp: number;
    fid: number;
    cls: number;
  }) => {
    return {
      checkLCP: (value: number) => {
        if (value > budgets.lcp) {
          console.warn(`LCP budget exceeded: ${value}ms > ${budgets.lcp}ms`);
        }
      },
      checkFID: (value: number) => {
        if (value > budgets.fid) {
          console.warn(`FID budget exceeded: ${value}ms > ${budgets.fid}ms`);
        }
      },
      checkCLS: (value: number) => {
        if (value > budgets.cls) {
          console.warn(`CLS budget exceeded: ${value} > ${budgets.cls}`);
        }
      }
    };
  }
};

// Export all performance utilities
export const sophisticatedPerformance = {
  animationPerformance,
  codeOptimization,
  webVitalsOptimization,
  imageOptimization,
  memoryOptimization,
  performanceMonitoring
};