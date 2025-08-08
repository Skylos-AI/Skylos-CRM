"use client"

import { forwardRef, HTMLAttributes, ReactNode } from "react"
import { useChartAccessibility } from "@/lib/accessibility/chart-accessibility"
import { cn } from "@/lib/utils"

// Circular focus indicator component
interface CircularFocusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  isActive?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'chart' | 'interactive'
}

export const CircularFocusIndicator = forwardRef<HTMLDivElement, CircularFocusIndicatorProps>(
  ({ children, isActive = false, size = 'md', variant = 'default', className, ...props }, ref) => {
    const { isHighContrast, focusRingStyles } = useChartAccessibility('focus', [])
    
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10', 
      lg: 'w-12 h-12'
    }
    
    const variantClasses = {
      default: 'bg-white border-2 border-gray-200 hover:border-gray-300',
      chart: 'bg-gray-50 border-2 border-gray-300 hover:border-black',
      interactive: 'bg-white border-2 border-black hover:bg-gray-50'
    }
    
    const focusClasses = isHighContrast
      ? 'focus:ring-4 focus:ring-black focus:ring-offset-2 focus:ring-offset-white'
      : 'focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white'
    
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-full flex items-center justify-center transition-all duration-150 ease-in-out',
          'focus:outline-none',
          sizeClasses[size],
          variantClasses[variant],
          focusClasses,
          isActive && 'ring-2 ring-black ring-offset-2',
          className
        )}
        style={isActive ? focusRingStyles : undefined}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CircularFocusIndicator.displayName = "CircularFocusIndicator"

// Accessible button with circular focus
interface AccessibleChartButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isActive?: boolean
  ariaLabel?: string
  ariaDescription?: string
}

export const AccessibleChartButton = forwardRef<HTMLButtonElement, AccessibleChartButtonProps>(
  ({ 
    children, 
    variant = 'secondary', 
    size = 'md', 
    isActive = false,
    ariaLabel,
    ariaDescription,
    className, 
    ...props 
  }, ref) => {
    const { isHighContrast, prefersReducedMotion } = useChartAccessibility('button', [])
    
    const baseClasses = cn(
      'rounded-full font-medium transition-all focus:outline-none',
      'focus:ring-2 focus:ring-black focus:ring-offset-2',
      !prefersReducedMotion && 'duration-150 ease-in-out'
    )
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }
    
    const variantClasses = {
      primary: isHighContrast 
        ? 'bg-black text-white hover:bg-gray-800 border-2 border-black'
        : 'bg-black text-white hover:bg-gray-800',
      secondary: isHighContrast
        ? 'bg-white text-black border-2 border-black hover:bg-gray-50'
        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300',
      ghost: isHighContrast
        ? 'bg-transparent text-black border-2 border-black hover:bg-gray-100'
        : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          isActive && 'ring-2 ring-black ring-offset-2',
          className
        )}
        aria-label={ariaLabel}
        aria-describedby={ariaDescription}
        {...props}
      >
        {children}
      </button>
    )
  }
)

AccessibleChartButton.displayName = "AccessibleChartButton"

// Keyboard navigation helper component
interface KeyboardNavigationHelpProps {
  instructions: string[]
  className?: string
}

export function KeyboardNavigationHelp({ instructions, className }: KeyboardNavigationHelpProps) {
  return (
    <div className={cn("sr-only", className)} role="region" aria-label="Keyboard navigation instructions">
      <h3>Keyboard Navigation</h3>
      <ul>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  )
}

// High contrast mode indicator
export function HighContrastIndicator() {
  const { isHighContrast } = useChartAccessibility('indicator', [])
  
  if (!isHighContrast) return null
  
  return (
    <div 
      className="fixed top-4 right-4 z-50 px-3 py-1 bg-black text-white text-xs font-medium rounded-full border-2 border-white"
      role="status"
      aria-live="polite"
    >
      High Contrast Mode
    </div>
  )
}

// Reduced motion indicator
export function ReducedMotionIndicator() {
  const { prefersReducedMotion } = useChartAccessibility('indicator', [])
  
  if (!prefersReducedMotion) return null
  
  return (
    <div 
      className="fixed top-4 right-20 z-50 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-full"
      role="status"
      aria-live="polite"
    >
      Reduced Motion
    </div>
  )
}

// Skip to chart content link
interface SkipToChartProps {
  chartId: string
  chartTitle: string
}

export function SkipToChart({ chartId, chartTitle }: SkipToChartProps) {
  return (
    <a
      href={`#${chartId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-black text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
    >
      Skip to {chartTitle}
    </a>
  )
}

// Chart data announcement component
interface ChartDataAnnouncementProps {
  message: string
  priority?: 'polite' | 'assertive'
}

export function ChartDataAnnouncement({ message, priority = 'polite' }: ChartDataAnnouncementProps) {
  return (
    <div
      className="sr-only"
      aria-live={priority}
      aria-atomic="true"
      role="status"
    >
      {message}
    </div>
  )
}

// Accessible chart legend
interface AccessibleChartLegendProps {
  items: Array<{
    label: string
    color: string
    value?: string | number
    description?: string
  }>
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function AccessibleChartLegend({ 
  items, 
  orientation = 'horizontal', 
  className 
}: AccessibleChartLegendProps) {
  const { isHighContrast } = useChartAccessibility('legend', [])
  
  return (
    <div 
      className={cn(
        'flex gap-4',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        className
      )}
      role="list"
      aria-label="Chart legend"
    >
      {items.map((item, index) => (
        <div 
          key={index}
          className="flex items-center gap-2"
          role="listitem"
        >
          <div
            className={cn(
              'w-3 h-3 rounded-full flex-shrink-0',
              isHighContrast && 'border-2 border-black'
            )}
            style={{ backgroundColor: isHighContrast ? '#000000' : item.color }}
            aria-hidden="true"
          />
          <span className="text-sm font-medium text-gray-900">
            {item.label}
            {item.value && (
              <span className="ml-1 text-gray-600">({item.value})</span>
            )}
          </span>
          {item.description && (
            <span className="sr-only">{item.description}</span>
          )}
        </div>
      ))}
    </div>
  )
}

// Export all components
export {
  CircularFocusIndicator,
  AccessibleChartButton,
  KeyboardNavigationHelp,
  HighContrastIndicator,
  ReducedMotionIndicator,
  SkipToChart,
  ChartDataAnnouncement,
  AccessibleChartLegend
}