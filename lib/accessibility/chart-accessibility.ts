/**
 * Chart Accessibility Utilities
 * 
 * Provides ARIA labels, focus management, high contrast support,
 * and reduced motion preferences for chart components.
 */

import { useEffect, useState } from 'react'

// ARIA label generators for different chart types
export const chartAriaLabels = {
  // Revenue chart ARIA labels
  revenueChart: (data: any[], currentValue: number, growth: number) => ({
    chartLabel: `Revenue trend chart showing ${data.length} data points`,
    chartDescription: `Current revenue is ${formatCurrency(currentValue)} with ${growth >= 0 ? 'positive' : 'negative'} growth of ${Math.abs(growth).toFixed(1)}%`,
    dataPointLabel: (point: any, index: number) => 
      `${point.month}: Revenue ${formatCurrency(point.revenue)}, Growth ${point.growth >= 0 ? '+' : ''}${point.growth.toFixed(1)}%`,
    summaryLabel: `Revenue chart summary: Total of ${data.length} months of data with current value ${formatCurrency(currentValue)}`
  }),

  // Pipeline chart ARIA labels
  pipelineChart: (data: any[]) => ({
    chartLabel: `Pipeline by stage bar chart showing ${data.length} stages`,
    chartDescription: `Pipeline distribution across ${data.length} stages with total value of ${formatCurrency(data.reduce((sum, item) => sum + item.value, 0))}`,
    dataPointLabel: (point: any) => 
      `${point.stage} stage: ${point.count} deals worth ${formatCurrency(point.value)}`,
    summaryLabel: `Pipeline summary: ${data.reduce((sum, item) => sum + item.count, 0)} total deals across ${data.length} stages`
  }),

  // Priority distribution chart ARIA labels
  priorityChart: (data: any[], total: number) => ({
    chartLabel: `Lead priority distribution donut chart showing ${data.length} priority levels`,
    chartDescription: `Distribution of ${total} leads across ${data.length} priority levels`,
    dataPointLabel: (point: any) => 
      `${point.name} priority: ${point.value} leads (${((point.value / total) * 100).toFixed(1)}%)`,
    summaryLabel: `Priority distribution summary: ${total} total leads distributed across ${data.length} priority levels`
  }),

  // Performance chart ARIA labels
  performanceChart: (data: any[], timePeriod: string) => ({
    chartLabel: `Performance overview line chart showing ${timePeriod} data with ${data.length} data points`,
    chartDescription: `Performance trends for leads, deals, and conversion rates over ${data.length} ${timePeriod} periods`,
    dataPointLabel: (point: any) => 
      `${point.period}: ${point.leads} leads, ${point.deals} deals, ${point.conversion.toFixed(1)}% conversion rate`,
    summaryLabel: `Performance summary: ${data.reduce((sum, item) => sum + item.leads, 0)} total leads, ${data.reduce((sum, item) => sum + item.deals, 0)} total deals over ${data.length} periods`
  })
}

// Focus management utilities
export const focusManagement = {
  // Create circular focus ring styles
  getFocusRingStyles: (isHighContrast: boolean = false) => ({
    outline: 'none',
    boxShadow: isHighContrast 
      ? '0 0 0 3px #000000, 0 0 0 6px #ffffff' 
      : '0 0 0 2px #ffffff, 0 0 0 4px #000000',
    borderRadius: '9999px', // rounded-full
    transition: 'box-shadow 150ms ease-in-out'
  }),

  // Focus trap for chart interactions
  createFocusTrap: (containerRef: React.RefObject<HTMLElement>) => {
    const focusableElements = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    if (!focusableElements || focusableElements.length === 0) return null

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    return {
      firstElement,
      lastElement,
      trapFocus: (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
      }
    }
  },

  // Keyboard navigation for chart elements
  handleChartKeyNavigation: (e: KeyboardEvent, dataLength: number, currentIndex: number, onIndexChange: (index: number) => void) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        onIndexChange(currentIndex < dataLength - 1 ? currentIndex + 1 : 0)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        onIndexChange(currentIndex > 0 ? currentIndex - 1 : dataLength - 1)
        break
      case 'Home':
        e.preventDefault()
        onIndexChange(0)
        break
      case 'End':
        e.preventDefault()
        onIndexChange(dataLength - 1)
        break
    }
  }
}

// High contrast mode detection and styles
export const highContrastSupport = {
  // Detect high contrast mode
  useHighContrastMode: () => {
    const [isHighContrast, setIsHighContrast] = useState(false)

    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-contrast: high)')
      setIsHighContrast(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setIsHighContrast(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return isHighContrast
  },

  // High contrast color palette
  getHighContrastColors: () => ({
    background: '#ffffff',
    foreground: '#000000',
    border: '#000000',
    accent: '#000000',
    muted: '#666666',
    chart: {
      primary: '#000000',
      secondary: '#333333',
      tertiary: '#666666',
      quaternary: '#999999',
    }
  }),

  // Apply high contrast styles to chart elements
  applyHighContrastStyles: (isHighContrast: boolean) => {
    if (!isHighContrast) return {}

    const colors = highContrastSupport.getHighContrastColors()
    
    return {
      '--chart-background': colors.background,
      '--chart-foreground': colors.foreground,
      '--chart-border': colors.border,
      '--chart-primary': colors.chart.primary,
      '--chart-secondary': colors.chart.secondary,
      '--chart-tertiary': colors.chart.tertiary,
      '--chart-quaternary': colors.chart.quaternary,
    } as React.CSSProperties
  }
}

// Reduced motion preferences
export const reducedMotionSupport = {
  // Detect reduced motion preference
  useReducedMotion: () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return prefersReducedMotion
  },

  // Get animation configuration based on motion preference
  getAnimationConfig: (prefersReducedMotion: boolean) => ({
    // Chart animations
    chartAnimation: {
      animationDuration: prefersReducedMotion ? 0 : 1200,
      animationEasing: prefersReducedMotion ? 'linear' : 'ease-out',
    },
    
    // Transition animations
    transitions: {
      duration: prefersReducedMotion ? '0ms' : '300ms',
      easing: prefersReducedMotion ? 'linear' : 'ease-in-out',
    },
    
    // Hover animations
    hover: {
      transition: prefersReducedMotion ? 'none' : 'all 150ms ease-in-out',
    },
    
    // Loading animations
    loading: {
      animation: prefersReducedMotion ? 'none' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }
  })
}

// Screen reader utilities
export const screenReaderSupport = {
  // Generate comprehensive chart descriptions
  generateChartDescription: (chartType: string, data: any[], additionalInfo?: string) => {
    const baseDescription = `${chartType} chart with ${data.length} data points.`
    const dataDescription = data.length > 0 ? ` Data ranges from ${data[0]?.period || 'start'} to ${data[data.length - 1]?.period || 'end'}.` : ' No data available.'
    const additional = additionalInfo ? ` ${additionalInfo}` : ''
    
    return baseDescription + dataDescription + additional
  },

  // Create live region announcements
  announceChartUpdate: (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },

  // Create data table alternative for charts
  generateDataTable: (data: any[], columns: string[]) => {
    return {
      caption: `Data table representation of chart with ${data.length} rows and ${columns.length} columns`,
      headers: columns,
      rows: data.map(item => columns.map(col => item[col] || 'N/A'))
    }
  }
}

// Utility functions
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Export all accessibility utilities
export const chartAccessibility = {
  ...chartAriaLabels,
  ...focusManagement,
  ...highContrastSupport,
  ...reducedMotionSupport,
  ...screenReaderSupport
}

// Main accessibility hook for charts
export const useChartAccessibility = (chartType: string, data: any[]) => {
  const isHighContrast = highContrastSupport.useHighContrastMode()
  const prefersReducedMotion = reducedMotionSupport.useReducedMotion()
  
  return {
    isHighContrast,
    prefersReducedMotion,
    highContrastStyles: highContrastSupport.applyHighContrastStyles(isHighContrast),
    animationConfig: reducedMotionSupport.getAnimationConfig(prefersReducedMotion),
    focusRingStyles: focusManagement.getFocusRingStyles(isHighContrast),
    chartDescription: screenReaderSupport.generateChartDescription(chartType, data)
  }
}