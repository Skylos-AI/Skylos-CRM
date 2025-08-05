/**
 * Browser Compatibility Testing Utility
 * 
 * Tools for testing and ensuring cross-browser compatibility
 * of the landing page across different browsers and devices.
 */

export interface BrowserInfo {
  name: string
  version: string
  engine: string
  platform: string
  mobile: boolean
  supported: boolean
}

export interface CompatibilityFeature {
  name: string
  supported: boolean
  fallback?: string
  polyfillRequired?: boolean
}

export interface CompatibilityReport {
  browser: BrowserInfo
  features: CompatibilityFeature[]
  warnings: string[]
  recommendations: string[]
  overallCompatibility: 'excellent' | 'good' | 'fair' | 'poor'
}

/**
 * Browser Detection and Compatibility Checker
 */
export class BrowserCompatibility {
  private userAgent: string
  private browser: BrowserInfo

  constructor() {
    this.userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
    this.browser = this.detectBrowser()
  }

  /**
   * Detect browser information
   */
  private detectBrowser(): BrowserInfo {
    const ua = this.userAgent.toLowerCase()
    
    let name = 'unknown'
    let version = 'unknown'
    let engine = 'unknown'
    
    // Detect browser name and version
    if (ua.includes('chrome') && !ua.includes('edg')) {
      name = 'Chrome'
      const match = ua.match(/chrome\/(\d+)/)
      version = match ? match[1] : 'unknown'
      engine = 'Blink'
    } else if (ua.includes('firefox')) {
      name = 'Firefox'
      const match = ua.match(/firefox\/(\d+)/)
      version = match ? match[1] : 'unknown'
      engine = 'Gecko'
    } else if (ua.includes('safari') && !ua.includes('chrome')) {
      name = 'Safari'
      const match = ua.match(/version\/(\d+)/)
      version = match ? match[1] : 'unknown'
      engine = 'WebKit'
    } else if (ua.includes('edg')) {
      name = 'Edge'
      const match = ua.match(/edg\/(\d+)/)
      version = match ? match[1] : 'unknown'
      engine = 'Blink'
    } else if (ua.includes('trident') || ua.includes('msie')) {
      name = 'Internet Explorer'
      const match = ua.match(/(?:msie |rv:)(\d+)/)
      version = match ? match[1] : 'unknown'
      engine = 'Trident'
    }

    // Detect platform
    let platform = 'unknown'
    if (ua.includes('windows')) platform = 'Windows'
    else if (ua.includes('mac')) platform = 'macOS'
    else if (ua.includes('linux')) platform = 'Linux'
    else if (ua.includes('android')) platform = 'Android'
    else if (ua.includes('iphone') || ua.includes('ipad')) platform = 'iOS'

    // Detect mobile
    const mobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)

    // Determine support level
    const supported = this.isBrowserSupported(name, parseInt(version))

    return {
      name,
      version,
      engine,
      platform,
      mobile,
      supported
    }
  }

  /**
   * Check if browser is supported
   */
  private isBrowserSupported(name: string, version: number): boolean {
    const minimumVersions: Record<string, number> = {
      'Chrome': 88,
      'Firefox': 85,
      'Safari': 14,
      'Edge': 88,
      'Internet Explorer': 0 // Not supported
    }

    const minVersion = minimumVersions[name]
    return minVersion !== undefined && version >= minVersion
  }

  /**
   * Test feature compatibility
   */
  private testFeatures(): CompatibilityFeature[] {
    const features: CompatibilityFeature[] = []

    // CSS Features
    features.push({
      name: 'CSS Grid',
      supported: this.supportsCSS('display', 'grid'),
      fallback: 'Flexbox layout'
    })

    features.push({
      name: 'CSS Flexbox',
      supported: this.supportsCSS('display', 'flex'),
      fallback: 'Float-based layout'
    })

    features.push({
      name: 'CSS Custom Properties',
      supported: this.supportsCSS('--test', 'value'),
      fallback: 'Sass variables'
    })

    features.push({
      name: 'CSS Transforms',
      supported: this.supportsCSS('transform', 'translateX(0)'),
      fallback: 'Position-based animations'
    })

    features.push({
      name: 'CSS Transitions',
      supported: this.supportsCSS('transition', 'all 0.3s'),
      fallback: 'Instant state changes'
    })

    // JavaScript Features
    features.push({
      name: 'ES6 Modules',
      supported: typeof window !== 'undefined' && 'noModule' in document.createElement('script'),
      polyfillRequired: true
    })

    features.push({
      name: 'Intersection Observer',
      supported: typeof window !== 'undefined' && 'IntersectionObserver' in window,
      polyfillRequired: true,
      fallback: 'Scroll event listeners'
    })

    features.push({
      name: 'ResizeObserver',
      supported: typeof window !== 'undefined' && 'ResizeObserver' in window,
      polyfillRequired: true,
      fallback: 'Window resize events'
    })

    features.push({
      name: 'Web Animations API',
      supported: typeof window !== 'undefined' && 'animate' in document.createElement('div'),
      polyfillRequired: true,
      fallback: 'CSS animations'
    })

    features.push({
      name: 'Fetch API',
      supported: typeof window !== 'undefined' && 'fetch' in window,
      polyfillRequired: true,
      fallback: 'XMLHttpRequest'
    })

    // Performance Features
    features.push({
      name: 'Performance Observer',
      supported: typeof window !== 'undefined' && 'PerformanceObserver' in window,
      fallback: 'Basic performance timing'
    })

    features.push({
      name: 'WebP Images',
      supported: this.supportsWebP(),
      fallback: 'JPEG/PNG images'
    })

    // Accessibility Features
    features.push({
      name: 'ARIA Support',
      supported: typeof window !== 'undefined' && 'setAttribute' in document.createElement('div'),
      fallback: 'Semantic HTML'
    })

    features.push({
      name: 'Focus Management',
      supported: typeof window !== 'undefined' && 'focus' in document.createElement('div'),
      fallback: 'Basic tab navigation'
    })

    return features
  }

  /**
   * Test CSS property support
   */
  private supportsCSS(property: string, value: string): boolean {
    if (typeof window === 'undefined') return false
    
    const element = document.createElement('div')
    const prefixes = ['', '-webkit-', '-moz-', '-ms-', '-o-']
    
    for (const prefix of prefixes) {
      try {
        element.style.setProperty(prefix + property, value)
        if (element.style.getPropertyValue(prefix + property)) {
          return true
        }
      } catch (e) {
        // Property not supported
      }
    }
    
    return false
  }

  /**
   * Test WebP support
   */
  private supportsWebP(): boolean {
    if (typeof window === 'undefined') return false
    
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }

  /**
   * Generate compatibility report
   */
  generateReport(): CompatibilityReport {
    const features = this.testFeatures()
    const warnings: string[] = []
    const recommendations: string[] = []

    // Check for unsupported browser
    if (!this.browser.supported) {
      warnings.push(`${this.browser.name} ${this.browser.version} is not officially supported`)
      recommendations.push('Please upgrade to a modern browser for the best experience')
    }

    // Check for missing critical features
    const criticalFeatures = ['CSS Flexbox', 'CSS Transforms', 'Intersection Observer']
    criticalFeatures.forEach(featureName => {
      const feature = features.find(f => f.name === featureName)
      if (feature && !feature.supported) {
        warnings.push(`${featureName} is not supported`)
        if (feature.fallback) {
          recommendations.push(`Using fallback: ${feature.fallback}`)
        }
        if (feature.polyfillRequired) {
          recommendations.push(`Consider loading a polyfill for ${featureName}`)
        }
      }
    })

    // Check for performance features
    const performanceFeatures = ['Performance Observer', 'WebP Images']
    performanceFeatures.forEach(featureName => {
      const feature = features.find(f => f.name === featureName)
      if (feature && !feature.supported) {
        warnings.push(`${featureName} not available - performance may be impacted`)
      }
    })

    // Calculate overall compatibility
    const supportedCount = features.filter(f => f.supported).length
    const totalCount = features.length
    const supportPercentage = supportedCount / totalCount

    let overallCompatibility: 'excellent' | 'good' | 'fair' | 'poor'
    if (supportPercentage >= 0.9) overallCompatibility = 'excellent'
    else if (supportPercentage >= 0.75) overallCompatibility = 'good'
    else if (supportPercentage >= 0.5) overallCompatibility = 'fair'
    else overallCompatibility = 'poor'

    return {
      browser: this.browser,
      features,
      warnings,
      recommendations,
      overallCompatibility
    }
  }

  /**
   * Get browser information
   */
  getBrowserInfo(): BrowserInfo {
    return this.browser
  }

  /**
   * Check if specific feature is supported
   */
  isFeatureSupported(featureName: string): boolean {
    const features = this.testFeatures()
    const feature = features.find(f => f.name === featureName)
    return feature ? feature.supported : false
  }
}

/**
 * Utility functions for browser compatibility
 */
export const compatibilityUtils = {
  /**
   * Load polyfills for unsupported features
   */
  loadPolyfills(features: string[]) {
    const polyfills: Record<string, string> = {
      'Intersection Observer': 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
      'ResizeObserver': 'https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver',
      'Web Animations API': 'https://polyfill.io/v3/polyfill.min.js?features=Element.prototype.animate',
      'Fetch API': 'https://polyfill.io/v3/polyfill.min.js?features=fetch'
    }

    features.forEach(feature => {
      const polyfillUrl = polyfills[feature]
      if (polyfillUrl) {
        const script = document.createElement('script')
        script.src = polyfillUrl
        script.async = true
        document.head.appendChild(script)
      }
    })
  },

  /**
   * Add CSS fallbacks
   */
  addCSSFallbacks() {
    const style = document.createElement('style')
    style.textContent = `
      /* Flexbox fallbacks */
      .flex-fallback {
        display: table;
        width: 100%;
      }
      .flex-fallback > * {
        display: table-cell;
        vertical-align: middle;
      }

      /* Grid fallbacks */
      .grid-fallback {
        display: block;
      }
      .grid-fallback > * {
        display: inline-block;
        vertical-align: top;
        width: calc(50% - 1rem);
        margin: 0.5rem;
      }

      /* Transform fallbacks */
      .no-transforms .transform-element {
        position: relative;
        left: 0;
        top: 0;
      }
    `
    document.head.appendChild(style)
  },

  /**
   * Initialize compatibility checking
   */
  initCompatibilityCheck() {
    const compatibility = new BrowserCompatibility()
    const report = compatibility.generateReport()

    // Add browser classes to body
    document.body.classList.add(
      `browser-${report.browser.name.toLowerCase()}`,
      `version-${report.browser.version}`,
      `engine-${report.browser.engine.toLowerCase()}`,
      `platform-${report.browser.platform.toLowerCase()}`
    )

    if (report.browser.mobile) {
      document.body.classList.add('mobile')
    }

    // Add feature support classes
    report.features.forEach(feature => {
      const className = `${feature.supported ? 'supports' : 'no'}-${feature.name.toLowerCase().replace(/\s+/g, '-')}`
      document.body.classList.add(className)
    })

    // Load required polyfills
    const unsupportedFeatures = report.features
      .filter(f => !f.supported && f.polyfillRequired)
      .map(f => f.name)
    
    if (unsupportedFeatures.length > 0) {
      compatibilityUtils.loadPolyfills(unsupportedFeatures)
    }

    // Add CSS fallbacks
    compatibilityUtils.addCSSFallbacks()

    // Log report in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🌐 Browser Compatibility Report')
      console.log('Browser:', report.browser)
      console.log('Overall Compatibility:', report.overallCompatibility)
      console.table(report.features)
      if (report.warnings.length > 0) {
        console.warn('Warnings:', report.warnings)
      }
      if (report.recommendations.length > 0) {
        console.info('Recommendations:', report.recommendations)
      }
      console.groupEnd()
    }

    return report
  }
}