/**
 * Smooth Minimalist Chart Styling System
 * 
 * Provides monochromatic color palette, smooth styling utilities,
 * and chart configuration for clean, circular, minimalist charts.
 */

// Monochromatic color palette using existing design system
export const CHART_COLORS = {
  // Primary colors - black, white, light greys
  black: '#000000',
  white: '#ffffff',
  
  // Light grey scale for chart elements
  grey: {
    50: '#f9fafb',   // Lightest - backgrounds
    100: '#f3f4f6',  // Light - subtle fills
    200: '#e5e7eb',  // Medium light - borders
    300: '#d1d5db',  // Medium - inactive elements
    400: '#9ca3af',  // Medium dark - text/lines
    500: '#6b7280',  // Dark - primary text
    600: '#4b5563',  // Darker - emphasis
    700: '#374151',  // Darkest - high contrast
  },
  
  // Monochromatic chart palette (lightest to darkest)
  chartPalette: [
    '#f3f4f6', // grey-100
    '#e5e7eb', // grey-200  
    '#d1d5db', // grey-300
    '#9ca3af', // grey-400
    '#6b7280', // grey-500
    '#4b5563', // grey-600
  ],
} as const

// Smooth styling configuration
export const SMOOTH_STYLES = {
  // Border radius for smooth, circular elements
  borderRadius: {
    small: '0.5rem',    // 8px - rounded-lg
    medium: '0.75rem',  // 12px - rounded-xl  
    large: '1rem',      // 16px - rounded-2xl
    full: '9999px',     // rounded-full
  },
  
  // Subtle shadows for depth without clutter
  shadows: {
    subtle: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    soft: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    medium: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  
  // Smooth animations
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  
  // Typography hierarchy
  typography: {
    title: {
      fontSize: '1.125rem', // 18px
      fontWeight: '600',    // semibold
      color: '#000000',     // black
    },
    subtitle: {
      fontSize: '0.875rem', // 14px
      fontWeight: '400',    // normal
      color: '#6b7280',     // grey-500
    },
    value: {
      fontSize: '1.5rem',   // 24px
      fontWeight: '700',    // bold
      color: '#000000',     // black
    },
    label: {
      fontSize: '0.75rem',  // 12px
      fontWeight: '400',    // normal
      color: '#9ca3af',     // grey-400
    },
  },
} as const

// Chart-specific styling configurations
export const CHART_CONFIGS = {
  // Remove visual clutter - no grid lines, minimal axes
  cleanAxis: {
    axisLine: false,
    tickLine: false,
    gridLine: false,
    tick: {
      fontSize: 12,
      fill: CHART_COLORS.grey[400],
      fontWeight: 400,
    },
  },
  
  // Smooth curved lines for all line charts
  smoothLine: {
    type: 'monotone' as const,
    strokeWidth: 2,
    dot: {
      r: 4,
      fill: CHART_COLORS.white,
      stroke: CHART_COLORS.grey[500],
      strokeWidth: 2,
    },
    activeDot: {
      r: 6,
      fill: CHART_COLORS.grey[600],
      stroke: CHART_COLORS.white,
      strokeWidth: 2,
    },
  },
  
  // Rounded bars with smooth corners
  smoothBar: {
    radius: [8, 8, 0, 0] as [number, number, number, number],
    fill: CHART_COLORS.grey[300],
  },
  
  // Clean tooltips with minimal styling
  cleanTooltip: {
    contentStyle: {
      backgroundColor: CHART_COLORS.white,
      border: `1px solid ${CHART_COLORS.grey[200]}`,
      borderRadius: SMOOTH_STYLES.borderRadius.medium,
      boxShadow: SMOOTH_STYLES.shadows.medium,
      padding: '12px',
      fontSize: '14px',
      color: CHART_COLORS.grey[700],
    },
    cursor: {
      fill: 'transparent',
      stroke: CHART_COLORS.grey[200],
      strokeWidth: 1,
      strokeDasharray: '4 4',
    },
  },
  
  // Donut chart configuration
  smoothDonut: {
    innerRadius: 60,
    outerRadius: 100,
    paddingAngle: 2,
    cornerRadius: 4,
  },
} as const

// Utility functions for chart styling
export const chartUtils = {
  // Format currency values
  formatCurrency: (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  },
  
  // Format percentage values
  formatPercentage: (value: number): string => {
    return `${value.toFixed(1)}%`
  },
  
  // Format large numbers with K/M suffixes
  formatNumber: (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  },
  
  // Get color from monochromatic palette by index
  getChartColor: (index: number): string => {
    return CHART_COLORS.chartPalette[index % CHART_COLORS.chartPalette.length]
  },
  
  // Generate gradient for smooth fills
  generateGradient: (startColor: string, endColor: string = 'transparent'): string => {
    return `linear-gradient(180deg, ${startColor} 0%, ${endColor} 100%)`
  },
  
  // Create smooth hover effect styles
  getHoverStyles: (baseColor: string) => ({
    filter: 'brightness(0.95)',
    transition: SMOOTH_STYLES.transitions.fast,
  }),
} as const

// Chart wrapper component props interface
export interface SmoothChartWrapperProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  loading?: boolean
  error?: string | null
  isEmpty?: boolean
}

// Chart data interfaces
export interface ChartDataPoint {
  period: string
  value: number
  label?: string
}

export interface RevenueDataPoint extends ChartDataPoint {
  revenue: number
  growth?: number
  target?: number
}

export interface PerformanceDataPoint extends ChartDataPoint {
  leads: number
  deals: number
  conversion: number
  revenue: number
}

export interface PipelineDataPoint {
  stage: string
  count: number
  value: number
  percentage?: number
}

export interface PriorityDataPoint {
  priority: 'low' | 'medium' | 'high' | 'urgent'
  count: number
  percentage: number
}