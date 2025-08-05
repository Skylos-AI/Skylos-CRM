/**
 * Responsive Layout Components
 * 
 * Utilities for creating mobile-responsive layouts that stack
 * appropriately on different screen sizes.
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function ResponsiveContainer({
  children,
  className,
  maxWidth = 'xl',
  padding = 'md',
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  }

  const paddingClasses = {
    none: '',
    sm: 'px-4',
    md: 'px-6 lg:px-8',
    lg: 'px-8 lg:px-12',
  }

  return (
    <div className={cn(
      'mx-auto w-full',
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  )
}

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  columns?: {
    mobile?: 1 | 2
    tablet?: 1 | 2 | 3
    desktop?: 1 | 2 | 3 | 4
  }
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
}

export function ResponsiveGrid({
  children,
  className,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  alignItems = 'stretch',
}: ResponsiveGridProps) {
  const getColumnClasses = () => {
    const { mobile = 1, tablet = 2, desktop = 3 } = columns
    
    const mobileClass = mobile === 2 ? 'grid-cols-2' : 'grid-cols-1'
    const tabletClass = tablet === 3 ? 'md:grid-cols-3' : tablet === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'
    const desktopClass = desktop === 4 ? 'lg:grid-cols-4' : desktop === 3 ? 'lg:grid-cols-3' : desktop === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
    
    return `${mobileClass} ${tabletClass} ${desktopClass}`
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  return (
    <div className={cn(
      'grid',
      getColumnClasses(),
      gapClasses[gap],
      alignClasses[alignItems],
      className
    )}>
      {children}
    </div>
  )
}

interface ResponsiveStackProps {
  children: React.ReactNode
  className?: string
  direction?: {
    mobile?: 'column' | 'row'
    tablet?: 'column' | 'row'
    desktop?: 'column' | 'row'
  }
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around'
}

export function ResponsiveStack({
  children,
  className,
  direction = { mobile: 'column', tablet: 'row', desktop: 'row' },
  gap = 'md',
  alignItems = 'stretch',
  justifyContent = 'start',
}: ResponsiveStackProps) {
  const getDirectionClasses = () => {
    const { mobile = 'column', tablet = 'row', desktop = 'row' } = direction
    
    const mobileClass = mobile === 'row' ? 'flex-row' : 'flex-col'
    const tabletClass = tablet === 'row' ? 'md:flex-row' : 'md:flex-col'
    const desktopClass = desktop === 'row' ? 'lg:flex-row' : 'lg:flex-col'
    
    return `${mobileClass} ${tabletClass} ${desktopClass}`
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  }

  return (
    <div className={cn(
      'flex',
      getDirectionClasses(),
      gapClasses[gap],
      alignClasses[alignItems],
      justifyClasses[justifyContent],
      className
    )}>
      {children}
    </div>
  )
}

interface ResponsiveSectionProps {
  children: React.ReactNode
  className?: string
  padding?: {
    mobile?: 'sm' | 'md' | 'lg'
    tablet?: 'sm' | 'md' | 'lg'
    desktop?: 'sm' | 'md' | 'lg'
  }
  background?: 'none' | 'muted' | 'card'
}

export function ResponsiveSection({
  children,
  className,
  padding = { mobile: 'md', tablet: 'lg', desktop: 'lg' },
  background = 'none',
}: ResponsiveSectionProps) {
  const getPaddingClasses = () => {
    const { mobile = 'md', tablet = 'lg', desktop = 'lg' } = padding
    
    const mobilePadding = {
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
    }
    
    const tabletPadding = {
      sm: 'md:py-12',
      md: 'md:py-16',
      lg: 'md:py-20',
    }
    
    const desktopPadding = {
      sm: 'lg:py-16',
      md: 'lg:py-20',
      lg: 'lg:py-24',
    }
    
    return `${mobilePadding[mobile]} ${tabletPadding[tablet]} ${desktopPadding[desktop]}`
  }

  const backgroundClasses = {
    none: '',
    muted: 'bg-muted/50',
    card: 'bg-card',
  }

  return (
    <section className={cn(
      getPaddingClasses(),
      backgroundClasses[background],
      className
    )}>
      <div className="container">
        {children}
      </div>
    </section>
  )
}

// Specialized components for common layouts
export function HeroLayout({
  children,
  className,
  reverse = false,
}: {
  children: React.ReactNode
  className?: string
  reverse?: boolean
}) {
  return (
    <ResponsiveGrid
      className={cn(
        'items-center',
        reverse && 'lg:grid-flow-col-dense',
        className
      )}
      columns={{ mobile: 1, tablet: 1, desktop: 2 }}
      gap="xl"
    >
      {children}
    </ResponsiveGrid>
  )
}

export function FeatureLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ResponsiveGrid
      className={className}
      columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      gap="lg"
    >
      {children}
    </ResponsiveGrid>
  )
}

export function TestimonialLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ResponsiveGrid
      className={className}
      columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      gap="md"
    >
      {children}
    </ResponsiveGrid>
  )
}

export function CTALayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ResponsiveStack
      className={className}
      direction={{ mobile: 'column', tablet: 'row', desktop: 'row' }}
      gap="md"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </ResponsiveStack>
  )
}

// Breakpoint utilities
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<keyof typeof breakpoints>('lg')

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width >= 1536) setBreakpoint('2xl')
      else if (width >= 1280) setBreakpoint('xl')
      else if (width >= 1024) setBreakpoint('lg')
      else if (width >= 768) setBreakpoint('md')
      else setBreakpoint('sm')
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}

// Responsive visibility utilities
interface ResponsiveShowProps {
  children: React.ReactNode
  on?: ('mobile' | 'tablet' | 'desktop')[]
  className?: string
}

export function ResponsiveShow({ 
  children, 
  on = ['mobile', 'tablet', 'desktop'],
  className 
}: ResponsiveShowProps) {
  const getVisibilityClasses = () => {
    const classes = []
    
    if (!on.includes('mobile')) classes.push('hidden')
    if (!on.includes('tablet')) classes.push('md:hidden')
    if (!on.includes('desktop')) classes.push('lg:hidden')
    
    if (on.includes('mobile') && !classes.includes('hidden')) classes.push('block')
    if (on.includes('tablet')) classes.push('md:block')
    if (on.includes('desktop')) classes.push('lg:block')
    
    return classes.join(' ')
  }

  return (
    <div className={cn(getVisibilityClasses(), className)}>
      {children}
    </div>
  )
}

export function MobileOnly({ children, className }: { children: React.ReactNode, className?: string }) {
  return <ResponsiveShow on={['mobile']} className={className}>{children}</ResponsiveShow>
}

export function TabletOnly({ children, className }: { children: React.ReactNode, className?: string }) {
  return <ResponsiveShow on={['tablet']} className={className}>{children}</ResponsiveShow>
}

export function DesktopOnly({ children, className }: { children: React.ReactNode, className?: string }) {
  return <ResponsiveShow on={['desktop']} className={className}>{children}</ResponsiveShow>
}

export function MobileAndTablet({ children, className }: { children: React.ReactNode, className?: string }) {
  return <ResponsiveShow on={['mobile', 'tablet']} className={className}>{children}</ResponsiveShow>
}

export function TabletAndDesktop({ children, className }: { children: React.ReactNode, className?: string }) {
  return <ResponsiveShow on={['tablet', 'desktop']} className={className}>{children}</ResponsiveShow>
}