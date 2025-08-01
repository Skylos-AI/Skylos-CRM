/**
 * Design System Utilities
 * 
 * Utility functions for consistent usage of design tokens
 * and common design patterns.
 */

import { designTokens, type Spacing, type Color, type FontSize } from './tokens'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Enhanced className utility that merges Tailwind classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get spacing value from design tokens
 */
export function getSpacing(size: Spacing): string {
  return designTokens.spacing[size]
}

/**
 * Get color value from design tokens
 */
export function getColor(colorPath: string): string {
  const keys = colorPath.split('.')
  let value: any = designTokens.colors
  
  for (const key of keys) {
    value = value?.[key]
  }
  
  return value || colorPath
}

/**
 * Generate priority-based styles for components
 */
export function getPriorityStyles(priority: 'low' | 'medium' | 'high' | 'urgent') {
  const priorityColors = designTokens.colors.priority[priority]
  
  return {
    backgroundColor: priorityColors.bg,
    color: priorityColors.text,
    borderColor: priorityColors.border,
  }
}

/**
 * Generate stage-based styles for kanban components
 */
export function getStageStyles(stage: 'incoming' | 'decision' | 'negotiation' | 'final') {
  const stageColors = designTokens.colors.stage[stage]
  
  return {
    backgroundColor: stageColors.bg,
    borderColor: stageColors.border,
    color: stageColors.text,
  }
}

/**
 * Generate responsive breakpoint classes
 */
export function responsive(classes: {
  base?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}) {
  const classNames: string[] = []
  
  if (classes.base) classNames.push(classes.base)
  if (classes.sm) classNames.push(`sm:${classes.sm}`)
  if (classes.md) classNames.push(`md:${classes.md}`)
  if (classes.lg) classNames.push(`lg:${classes.lg}`)
  if (classes.xl) classNames.push(`xl:${classes.xl}`)
  if (classes['2xl']) classNames.push(`2xl:${classes['2xl']}`)
  
  return classNames.join(' ')
}

/**
 * Generate focus ring styles for accessibility
 */
export function focusRing(color: string = 'primary') {
  return cn(
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    color === 'primary' && 'focus:ring-primary-500',
    color === 'error' && 'focus:ring-error-500',
    color === 'success' && 'focus:ring-success-500'
  )
}

/**
 * Generate hover transition styles
 */
export function hoverTransition() {
  return cn(
    'transition-all duration-150 ease-in-out',
    'hover:scale-[1.02] hover:shadow-md'
  )
}

/**
 * Generate loading skeleton styles
 */
export function skeleton(className?: string) {
  return cn(
    'animate-pulse bg-neutral-200 rounded',
    className
  )
}

/**
 * Generate truncated text styles with tooltip support
 */
export function truncate(lines: number = 1) {
  if (lines === 1) {
    return 'truncate'
  }
  
  return cn(
    'overflow-hidden',
    `line-clamp-${lines}`
  )
}

/**
 * Generate card styles with consistent design
 */
export function cardStyles(variant: 'default' | 'elevated' | 'outlined' = 'default') {
  const baseStyles = cn(
    'bg-white rounded-lg border border-neutral-200',
    'transition-all duration-150 ease-in-out'
  )
  
  switch (variant) {
    case 'elevated':
      return cn(baseStyles, 'shadow-md hover:shadow-lg')
    case 'outlined':
      return cn(baseStyles, 'border-2')
    default:
      return cn(baseStyles, 'shadow-sm hover:shadow-md')
  }
}

/**
 * Generate button styles with consistent design
 */
export function buttonStyles(
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md'
) {
  const baseStyles = cn(
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-all duration-150 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  )
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  
  const variantStyles = {
    primary: cn(
      'bg-primary-600 text-white hover:bg-primary-700',
      'focus:ring-primary-500'
    ),
    secondary: cn(
      'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
      'focus:ring-neutral-500'
    ),
    outline: cn(
      'border border-neutral-300 bg-white text-neutral-700',
      'hover:bg-neutral-50 focus:ring-neutral-500'
    ),
    ghost: cn(
      'text-neutral-700 hover:bg-neutral-100',
      'focus:ring-neutral-500'
    ),
  }
  
  return cn(baseStyles, sizeStyles[size], variantStyles[variant])
}

/**
 * Generate badge styles with consistent design
 */
export function badgeStyles(
  variant: 'default' | 'primary' | 'success' | 'warning' | 'error' = 'default',
  size: 'sm' | 'md' = 'md'
) {
  const baseStyles = cn(
    'inline-flex items-center rounded-full font-medium',
    'border'
  )
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }
  
  const variantStyles = {
    default: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    primary: 'bg-primary-100 text-primary-800 border-primary-200',
    success: 'bg-success-100 text-success-800 border-success-200',
    warning: 'bg-warning-100 text-warning-800 border-warning-200',
    error: 'bg-error-100 text-error-800 border-error-200',
  }
  
  return cn(baseStyles, sizeStyles[size], variantStyles[variant])
}

/**
 * Generate input styles with consistent design
 */
export function inputStyles(
  variant: 'default' | 'error' = 'default',
  size: 'sm' | 'md' | 'lg' = 'md'
) {
  const baseStyles = cn(
    'block w-full rounded-md border bg-white',
    'transition-colors duration-150 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  )
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  }
  
  const variantStyles = {
    default: cn(
      'border-neutral-300 text-neutral-900',
      'focus:border-primary-500 focus:ring-primary-500'
    ),
    error: cn(
      'border-error-300 text-error-900',
      'focus:border-error-500 focus:ring-error-500'
    ),
  }
  
  return cn(baseStyles, sizeStyles[size], variantStyles[variant])
}

/**
 * Generate animation classes for common interactions
 */
export const animations = {
  fadeIn: 'animate-in fade-in duration-300',
  fadeOut: 'animate-out fade-out duration-300',
  slideIn: 'animate-in slide-in-from-bottom-4 duration-300',
  slideOut: 'animate-out slide-out-to-bottom-4 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-300',
  scaleOut: 'animate-out zoom-out-95 duration-300',
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
}

/**
 * Generate layout utilities
 */
export const layout = {
  container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
  section: 'py-8 sm:py-12 lg:py-16',
  grid: {
    cols1: 'grid grid-cols-1',
    cols2: 'grid grid-cols-1 md:grid-cols-2',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  },
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
  },
}

/**
 * Accessibility utilities
 */
export const a11y = {
  srOnly: 'sr-only',
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
  skipLink: cn(
    'absolute left-4 top-4 z-50 rounded-md bg-primary-600 px-4 py-2 text-white',
    'transform -translate-y-16 transition-transform',
    'focus:translate-y-0'
  ),
}