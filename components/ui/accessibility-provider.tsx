"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { announcer, focusManager, isScreenReaderActive } from '@/lib/utils/accessibility'

interface AccessibilityContextType {
  isScreenReaderActive: boolean
  prefersReducedMotion: boolean
  highContrast: boolean
  announceMessage: (message: string, priority?: 'polite' | 'assertive') => void
  focusElement: (element: HTMLElement | null) => void
  trapFocus: (element: HTMLElement) => void
  releaseFocusTrap: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  isScreenReaderActive: false,
  prefersReducedMotion: false,
  highContrast: false,
  announceMessage: () => {},
  focusElement: () => {},
  trapFocus: () => {},
  releaseFocusTrap: () => {},
})

export function useAccessibility() {
  return useContext(AccessibilityContext)
}

interface AccessibilityProviderProps {
  children: React.ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [screenReaderActive, setScreenReaderActive] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    // Check for screen reader
    setScreenReaderActive(isScreenReaderActive())

    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(reducedMotionQuery.matches)

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)

    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
    setHighContrast(highContrastQuery.matches)

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches)
    }
    highContrastQuery.addEventListener('change', handleHighContrastChange)

    // Add global keyboard event listeners for accessibility
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Skip to main content with Alt+M
      if (event.altKey && event.key === 'm') {
        event.preventDefault()
        const main = document.querySelector('main')
        if (main) {
          main.focus()
          main.scrollIntoView({ behavior: 'smooth' })
        }
      }

      // Skip to navigation with Alt+N
      if (event.altKey && event.key === 'n') {
        event.preventDefault()
        const nav = document.querySelector('nav')
        if (nav) {
          const firstLink = nav.querySelector('a, button')
          if (firstLink instanceof HTMLElement) {
            firstLink.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
      highContrastQuery.removeEventListener('change', handleHighContrastChange)
      document.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [])

  const contextValue: AccessibilityContextType = {
    isScreenReaderActive: screenReaderActive,
    prefersReducedMotion,
    highContrast,
    announceMessage: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      announcer.announce(message, priority)
    },
    focusElement: (element: HTMLElement | null) => {
      focusManager.setFocus(element)
    },
    trapFocus: (element: HTMLElement) => {
      focusManager.trapFocus(element)
    },
    releaseFocusTrap: () => {
      focusManager.releaseFocusTrap()
    },
  }

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  )
}