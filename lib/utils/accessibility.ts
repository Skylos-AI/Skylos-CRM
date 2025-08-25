// Accessibility utilities and helpers

export interface AccessibilityOptions {
  announceChanges?: boolean
  focusManagement?: boolean
  keyboardNavigation?: boolean
  screenReaderSupport?: boolean
}

// ARIA live region announcer
class LiveRegionAnnouncer {
  private liveRegion: HTMLElement | null = null
  private politeRegion: HTMLElement | null = null
  private assertiveRegion: HTMLElement | null = null
  private initialized = false

  constructor() {
    // Don't initialize during constructor - wait for first use
  }

  private ensureInitialized() {
    if (!this.initialized && typeof window !== 'undefined') {
      this.createLiveRegions()
      this.initialized = true
    }
  }

  private createLiveRegions() {
    // Create polite live region
    this.politeRegion = document.createElement('div')
    this.politeRegion.setAttribute('aria-live', 'polite')
    this.politeRegion.setAttribute('aria-atomic', 'true')
    this.politeRegion.className = 'sr-only'
    document.body.appendChild(this.politeRegion)

    // Create assertive live region
    this.assertiveRegion = document.createElement('div')
    this.assertiveRegion.setAttribute('aria-live', 'assertive')
    this.assertiveRegion.setAttribute('aria-atomic', 'true')
    this.assertiveRegion.className = 'sr-only'
    document.body.appendChild(this.assertiveRegion)
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    this.ensureInitialized()
    const region = priority === 'assertive' ? this.assertiveRegion : this.politeRegion
    
    if (region) {
      // Clear previous message
      region.textContent = ''
      
      // Add new message after a brief delay to ensure screen readers pick it up
      setTimeout(() => {
        region.textContent = message
      }, 100)

      // Clear message after announcement
      setTimeout(() => {
        region.textContent = ''
      }, 1000)
    }
  }

  cleanup() {
    if (this.politeRegion) {
      document.body.removeChild(this.politeRegion)
      this.politeRegion = null
    }
    if (this.assertiveRegion) {
      document.body.removeChild(this.assertiveRegion)
      this.assertiveRegion = null
    }
  }
}

// Global announcer instance
export const announcer = new LiveRegionAnnouncer()

// Focus management utilities
export class FocusManager {
  private focusStack: HTMLElement[] = []
  private trapElement: HTMLElement | null = null
  private previousFocus: HTMLElement | null = null

  // Save current focus and set new focus
  setFocus(element: HTMLElement | null, options: { preventScroll?: boolean } = {}) {
    if (element) {
      this.previousFocus = document.activeElement as HTMLElement
      element.focus({ preventScroll: options.preventScroll })
    }
  }

  // Restore previous focus
  restoreFocus() {
    if (this.previousFocus && document.contains(this.previousFocus)) {
      this.previousFocus.focus()
      this.previousFocus = null
    }
  }

  // Trap focus within an element
  trapFocus(element: HTMLElement) {
    this.trapElement = element
    this.previousFocus = document.activeElement as HTMLElement

    const focusableElements = this.getFocusableElements(element)
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }

    document.addEventListener('keydown', this.handleFocusTrap)
  }

  // Release focus trap
  releaseFocusTrap() {
    document.removeEventListener('keydown', this.handleFocusTrap)
    this.trapElement = null
    this.restoreFocus()
  }

  private handleFocusTrap = (event: KeyboardEvent) => {
    if (!this.trapElement || event.key !== 'Tab') return

    const focusableElements = this.getFocusableElements(this.trapElement)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ')

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[]
  }
}

// Global focus manager instance
export const focusManager = new FocusManager()

// Keyboard navigation utilities
export function handleKeyboardNavigation(
  event: KeyboardEvent,
  options: {
    onEnter?: () => void
    onSpace?: () => void
    onEscape?: () => void
    onArrowUp?: () => void
    onArrowDown?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
    onHome?: () => void
    onEnd?: () => void
  }
) {
  const { key } = event

  switch (key) {
    case 'Enter':
      if (options.onEnter) {
        event.preventDefault()
        options.onEnter()
      }
      break
    case ' ':
      if (options.onSpace) {
        event.preventDefault()
        options.onSpace()
      }
      break
    case 'Escape':
      if (options.onEscape) {
        event.preventDefault()
        options.onEscape()
      }
      break
    case 'ArrowUp':
      if (options.onArrowUp) {
        event.preventDefault()
        options.onArrowUp()
      }
      break
    case 'ArrowDown':
      if (options.onArrowDown) {
        event.preventDefault()
        options.onArrowDown()
      }
      break
    case 'ArrowLeft':
      if (options.onArrowLeft) {
        event.preventDefault()
        options.onArrowLeft()
      }
      break
    case 'ArrowRight':
      if (options.onArrowRight) {
        event.preventDefault()
        options.onArrowRight()
      }
      break
    case 'Home':
      if (options.onHome) {
        event.preventDefault()
        options.onHome()
      }
      break
    case 'End':
      if (options.onEnd) {
        event.preventDefault()
        options.onEnd()
      }
      break
  }
}

// Color contrast utilities
export function getContrastRatio(color1: string, color2: string): number {
  const luminance1 = getLuminance(color1)
  const luminance2 = getLuminance(color2)
  
  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

function getLuminance(color: string): number {
  // Convert color to RGB values
  const rgb = hexToRgb(color)
  if (!rgb) return 0

  // Convert to relative luminance
  const rsRGB = rgb.r / 255
  const gsRGB = rgb.g / 255
  const bsRGB = rgb.b / 255

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// Check if contrast meets WCAG standards
export function meetsWCAGContrast(
  color1: string, 
  color2: string, 
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(color1, color2)
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7
  } else {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5
  }
}

// Screen reader utilities
export function isScreenReaderActive(): boolean {
  // Check for common screen reader indicators
  if (typeof window === 'undefined') return false
  
  // Check for NVDA
  if ((window as any).nvda) return true
  
  // Check for JAWS
  if ((window as any).jaws) return true
  
  // Check for VoiceOver (approximate)
  if (navigator.userAgent.includes('VoiceOver')) return true
  
  // Check for high contrast mode (often used with screen readers)
  if (window.matchMedia('(prefers-contrast: high)').matches) return true
  
  return false
}

// Generate unique IDs for accessibility
let idCounter = 0
export function generateId(prefix: string = 'a11y'): string {
  return `${prefix}-${++idCounter}`
}

// Debounce function for accessibility announcements
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Announce changes with debouncing
export const debouncedAnnounce = debounce(
  (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announcer.announce(message, priority)
  },
  300
)

// Accessibility testing utilities
export function runAccessibilityChecks(element: HTMLElement): string[] {
  const issues: string[] = []
  
  // Check for missing alt text on images
  const images = element.querySelectorAll('img')
  images.forEach((img, index) => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      issues.push(`Image ${index + 1} is missing alt text`)
    }
  })
  
  // Check for missing form labels
  const inputs = element.querySelectorAll('input, select, textarea')
  inputs.forEach((input, index) => {
    const hasLabel = input.getAttribute('aria-label') || 
                    input.getAttribute('aria-labelledby') ||
                    element.querySelector(`label[for="${input.id}"]`)
    
    if (!hasLabel) {
      issues.push(`Form input ${index + 1} is missing a label`)
    }
  })
  
  // Check for missing headings structure
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let previousLevel = 0
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1))
    if (level > previousLevel + 1) {
      issues.push(`Heading ${index + 1} skips levels (h${previousLevel} to h${level})`)
    }
    previousLevel = level
  })
  
  // Check for low contrast (simplified check)
  const textElements = element.querySelectorAll('p, span, div, a, button')
  textElements.forEach((el, index) => {
    const styles = window.getComputedStyle(el)
    const color = styles.color
    const backgroundColor = styles.backgroundColor
    
    if (color && backgroundColor && color !== backgroundColor) {
      try {
        if (!meetsWCAGContrast(color, backgroundColor)) {
          issues.push(`Element ${index + 1} may have insufficient color contrast`)
        }
      } catch (error) {
        // Skip contrast check if colors can't be parsed
      }
    }
  })
  
  return issues
}