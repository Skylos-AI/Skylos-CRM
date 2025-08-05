/**
 * useReducedMotion Hook
 * 
 * Hook for detecting and respecting user's reduced motion preferences
 * for accessibility compliance.
 */

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

// Hook for conditional animation based on reduced motion preference
export function useConditionalAnimation<T>(
  normalAnimation: T,
  reducedAnimation: T
): T {
  const prefersReducedMotion = useReducedMotion()
  return prefersReducedMotion ? reducedAnimation : normalAnimation
}

// Hook for animation duration based on reduced motion preference
export function useAnimationDuration(normalDuration: number): number {
  const prefersReducedMotion = useReducedMotion()
  return prefersReducedMotion ? 0.1 : normalDuration
}

// Hook for animation variants with reduced motion support
export function useAccessibleAnimation(variants: {
  normal: any
  reduced: any
}) {
  const prefersReducedMotion = useReducedMotion()
  return prefersReducedMotion ? variants.reduced : variants.normal
}