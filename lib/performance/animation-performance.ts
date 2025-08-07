// Performance monitoring and optimization utilities for animations

/**
 * Performance monitoring for animations
 */
export class AnimationPerformanceMonitor {
  private frameCount = 0;
  private startTime = 0;
  private lastFrameTime = 0;
  private fps = 0;
  private isMonitoring = false;

  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.startTime = performance.now();
    this.lastFrameTime = this.startTime;
    this.frameCount = 0;
    
    this.measureFrame();
  }

  stop() {
    this.isMonitoring = false;
  }

  private measureFrame = () => {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    this.frameCount++;
    
    // Calculate FPS every second
    if (currentTime - this.startTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.startTime));
      
      // Log performance warning if FPS is too low
      if (this.fps < 30) {
        console.warn(`Animation performance warning: ${this.fps} FPS`);
        this.optimizeAnimations();
      }
      
      // Reset counters
      this.startTime = currentTime;
      this.frameCount = 0;
    }
    
    this.lastFrameTime = currentTime;
    requestAnimationFrame(this.measureFrame);
  };

  private optimizeAnimations() {
    // Reduce animation complexity on low-end devices
    const event = new CustomEvent('reduce-animations', {
      detail: { fps: this.fps }
    });
    window.dispatchEvent(event);
  }

  getFPS(): number {
    return this.fps;
  }
}

/**
 * Device capability detection
 */
export const DeviceCapabilities = {
  isLowEndDevice(): boolean {
    // Check for low-end device indicators
    const connection = (navigator as any).connection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    const memory = (performance as any).memory;
    
    // Low-end device heuristics
    const isSlowConnection = connection && connection.effectiveType === 'slow-2g';
    const isLowConcurrency = hardwareConcurrency <= 2;
    const isLowMemory = memory && memory.jsHeapSizeLimit < 1000000000; // < 1GB
    
    return isSlowConnection || isLowConcurrency || isLowMemory;
  },

  supportsAdvancedAnimations(): boolean {
    // Check for advanced animation support
    const hasWebGL = !!document.createElement('canvas').getContext('webgl');
    const hasTransform3d = 'transform' in document.documentElement.style;
    const hasWillChange = 'willChange' in document.documentElement.style;
    
    return hasWebGL && hasTransform3d && hasWillChange && !this.isLowEndDevice();
  },

  getBatteryLevel(): Promise<number> {
    return new Promise((resolve) => {
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          resolve(battery.level);
        }).catch(() => resolve(1)); // Assume full battery if unavailable
      } else {
        resolve(1); // Assume full battery if API unavailable
      }
    });
  }
};

/**
 * Animation optimization strategies
 */
export const AnimationOptimizer = {
  async shouldReduceAnimations(): Promise<boolean> {
    const batteryLevel = await DeviceCapabilities.getBatteryLevel();
    const isLowEnd = DeviceCapabilities.isLowEndDevice();
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;
    
    return prefersReducedMotion || isLowEnd || batteryLevel < 0.2;
  },

  optimizeForDevice() {
    const isLowEnd = DeviceCapabilities.isLowEndDevice();
    
    if (isLowEnd) {
      // Reduce animation complexity
      document.documentElement.style.setProperty('--animation-duration-multiplier', '0.5');
      document.documentElement.style.setProperty('--animation-complexity', 'low');
    } else {
      document.documentElement.style.setProperty('--animation-duration-multiplier', '1');
      document.documentElement.style.setProperty('--animation-complexity', 'high');
    }
  },

  createOptimizedAnimationConfig(baseConfig: any) {
    const isLowEnd = DeviceCapabilities.isLowEndDevice();
    
    if (isLowEnd) {
      return {
        ...baseConfig,
        letterDelay: baseConfig.letterDelay * 0.5,
        wordDelay: baseConfig.wordDelay * 0.5,
        springConfig: {
          stiffness: baseConfig.springConfig.stiffness * 0.7,
          damping: baseConfig.springConfig.damping * 1.3,
        },
        pathAnimationDuration: baseConfig.pathAnimationDuration * 0.5,
      };
    }
    
    return baseConfig;
  }
};

/**
 * Error boundary for animation failures
 */
export class AnimationErrorHandler {
  static handleAnimationError(error: Error, componentName: string) {
    console.error(`Animation error in ${componentName}:`, error);
    
    // Track error for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: `Animation error in ${componentName}: ${error.message}`,
        fatal: false
      });
    }
    
    // Fallback to static display
    const event = new CustomEvent('animation-fallback', {
      detail: { componentName, error: error.message }
    });
    window.dispatchEvent(event);
  }
}