import dynamic from 'next/dynamic'
import React, { ComponentType } from 'react'

// Dynamic import for Framer Motion components with loading fallback
export const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  {
    loading: () => React.createElement('div', { 
      className: 'animate-pulse bg-muted h-32 w-full rounded' 
    }),
    ssr: false,
  }
)

export const MotionSection = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.section })),
  {
    loading: () => React.createElement('section', { 
      className: 'animate-pulse bg-muted h-64 w-full rounded' 
    }),
    ssr: false,
  }
)

export const MotionSpan = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.span })),
  {
    loading: () => React.createElement('span', { 
      className: 'animate-pulse bg-muted h-4 w-16 rounded' 
    }),
    ssr: false,
  }
)

// Dynamic import for animation variants
export const loadAnimationVariants = () => 
  import('@/lib/animations/variants')

// Dynamic import for scroll utilities
export const loadScrollUtils = () => 
  import('@/lib/animations/scroll-utils')

// Dynamic import for performance monitor
export const loadPerformanceMonitor = () => 
  import('@/lib/animations/performance-monitor')

// Utility function to create dynamic components with better error handling
export function createDynamicComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: {
    loading?: ComponentType
    fallback?: ComponentType<T>
    ssr?: boolean
  } = {}
) {
  const {
    loading = () => React.createElement('div', { 
      className: 'animate-pulse bg-muted h-32 w-full rounded' 
    }),
    fallback,
    ssr = false,
  } = options

  return dynamic(importFn, {
    loading,
    ssr,
  })
}

// Preload critical animation libraries
export function preloadAnimationLibraries() {
  if (typeof window !== 'undefined') {
    // Preload Framer Motion
    import('framer-motion').catch(console.error)
    
    // Preload animation utilities
    loadAnimationVariants().catch(console.error)
    loadScrollUtils().catch(console.error)
  }
}

// Lazy load non-critical components
export const LazyInteractiveDemo = dynamic(
  () => import('@/components/landing/interactive-ai-demos').then(mod => ({ default: mod.InteractiveAIDemos })),
  { ssr: false }
)

export const LazyFloatingNavigation = dynamic(
  () => import('@/components/landing/floating-navigation').then(mod => ({ default: mod.FloatingNavigation })),
  { ssr: false }
)

export const LazyCompetitiveMatrix = dynamic(
  () => import('@/components/landing/competitive-matrix').then(mod => ({ default: mod.CompetitiveMatrix })),
  { ssr: false }
)

// Bundle analyzer helper
export function analyzeBundleSize() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available in production build only')
    return
  }
  
  // This would integrate with webpack-bundle-analyzer
  console.log('Run: npm run build && npm run analyze')
}