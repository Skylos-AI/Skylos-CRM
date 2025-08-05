/**
 * Typography Utilities
 * 
 * Utility functions and classes for consistent typography usage
 * across the landing page and application.
 */

import { typography } from './tokens'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function for combining classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Typography variant definitions for consistent usage
export const typographyVariants = {
  // Headlines using Winner Sans
  headline: {
    h1: 'font-primary text-4xl lg:text-5xl font-bold tracking-tight leading-tight',
    h2: 'font-primary text-3xl lg:text-4xl font-bold tracking-tight leading-tight',
    h3: 'font-primary text-2xl lg:text-3xl font-semibold tracking-tight leading-tight',
    h4: 'font-primary text-xl lg:text-2xl font-semibold tracking-tight leading-tight',
    h5: 'font-primary text-lg lg:text-xl font-semibold tracking-tight leading-tight',
    h6: 'font-primary text-base lg:text-lg font-semibold tracking-tight leading-tight',
  },
  
  // Body text using Roboto
  body: {
    large: 'font-secondary text-lg leading-relaxed',
    regular: 'font-secondary text-base leading-normal',
    small: 'font-secondary text-sm leading-normal',
    xs: 'font-secondary text-xs leading-normal',
  },
  
  // Special text variants
  display: {
    hero: 'font-primary text-5xl lg:text-6xl font-bold tracking-tight leading-tight',
    subtitle: 'font-secondary text-xl lg:text-2xl leading-relaxed text-muted-foreground',
  },
  
  // Interactive elements
  interactive: {
    button: 'font-secondary text-sm font-medium',
    link: 'font-secondary text-sm font-medium hover:underline',
    nav: 'font-secondary text-sm font-medium',
  },
  
  // Utility text
  utility: {
    caption: 'font-secondary text-xs text-muted-foreground',
    label: 'font-secondary text-sm font-medium',
    code: 'font-mono text-sm',
  },
} as const

// Typography component props
export interface TypographyProps {
  variant?: keyof typeof typographyVariants.headline | 
           keyof typeof typographyVariants.body | 
           keyof typeof typographyVariants.display |
           keyof typeof typographyVariants.interactive |
           keyof typeof typographyVariants.utility
  className?: string
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
}

// Helper function to get typography classes
export function getTypographyClasses(
  category: keyof typeof typographyVariants,
  variant: string
): string {
  const categoryVariants = typographyVariants[category] as Record<string, string>
  return categoryVariants[variant] || ''
}

// Responsive typography utilities
export const responsiveText = {
  // Mobile-first responsive text sizes
  xs: 'text-xs sm:text-sm',
  sm: 'text-sm sm:text-base',
  base: 'text-base sm:text-lg',
  lg: 'text-lg sm:text-xl',
  xl: 'text-xl sm:text-2xl',
  '2xl': 'text-2xl sm:text-3xl',
  '3xl': 'text-3xl sm:text-4xl',
  '4xl': 'text-4xl sm:text-5xl',
  '5xl': 'text-5xl sm:text-6xl',
} as const

// Text color utilities for different themes
export const textColors = {
  primary: 'text-foreground',
  secondary: 'text-muted-foreground',
  muted: 'text-muted-foreground/70',
  accent: 'text-primary',
  success: 'text-success-600',
  warning: 'text-warning-600',
  error: 'text-error-600',
  info: 'text-info-600',
} as const

// Line height utilities
export const lineHeights = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
} as const

// Letter spacing utilities
export const letterSpacing = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
} as const

// Font weight utilities
export const fontWeights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const

// Export typography tokens for direct access
export { typography } from './tokens'