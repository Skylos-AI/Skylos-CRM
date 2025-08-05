"use client"

import React, { forwardRef } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { announcer } from '@/lib/utils/accessibility'

interface AccessibleButtonProps extends ButtonProps {
  // Accessibility props
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-pressed'?: boolean
  'aria-controls'?: string
  
  // Loading state
  loading?: boolean
  loadingText?: string
  
  // Success state
  success?: boolean
  successText?: string
  
  // Announce actions
  announceOnClick?: string
  announceOnSuccess?: string
  
  // Focus management
  autoFocus?: boolean
  focusOnMount?: boolean
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({
    children,
    className,
    loading = false,
    loadingText = 'Loading...',
    success = false,
    successText = 'Success',
    announceOnClick,
    announceOnSuccess,
    autoFocus = false,
    focusOnMount = false,
    onClick,
    disabled,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-expanded': ariaExpanded,
    'aria-pressed': ariaPressed,
    'aria-controls': ariaControls,
    ...props
  }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    
    // Combine refs
    React.useImperativeHandle(ref, () => buttonRef.current!)

    // Focus on mount if requested
    React.useEffect(() => {
      if (focusOnMount && buttonRef.current) {
        buttonRef.current.focus()
      }
    }, [focusOnMount])

    // Announce success state changes
    React.useEffect(() => {
      if (success && announceOnSuccess) {
        announcer.announce(announceOnSuccess, 'polite')
      }
    }, [success, announceOnSuccess])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return

      // Announce action if specified
      if (announceOnClick) {
        announcer.announce(announceOnClick, 'polite')
      }

      onClick?.(event)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      // Handle Enter and Space keys for better accessibility
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick(event as any)
      }
    }

    // Determine button content
    const getButtonContent = () => {
      if (loading) {
        return (
          <span className="flex items-center gap-2">
            <span 
              className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              aria-hidden="true"
            />
            <span>{loadingText}</span>
          </span>
        )
      }

      if (success) {
        return (
          <span className="flex items-center gap-2">
            <span 
              className="h-4 w-4 text-green-500"
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{successText}</span>
          </span>
        )
      }

      return children
    }

    // Determine ARIA attributes
    const ariaAttributes = {
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-expanded': ariaExpanded,
      'aria-pressed': ariaPressed,
      'aria-controls': ariaControls,
      'aria-busy': loading,
      'aria-disabled': disabled || loading,
    }

    // Filter out undefined values
    const cleanAriaAttributes = Object.fromEntries(
      Object.entries(ariaAttributes).filter(([_, value]) => value !== undefined)
    )

    return (
      <Button
        ref={buttonRef}
        className={cn(
          // Focus styles for better accessibility
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
          // High contrast mode support
          'contrast-more:border-2 contrast-more:border-current',
          className
        )}
        disabled={disabled || loading}
        autoFocus={autoFocus}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...cleanAriaAttributes}
        {...props}
      >
        {getButtonContent()}
      </Button>
    )
  }
)

AccessibleButton.displayName = 'AccessibleButton'

// Specialized button variants
export const AccessiblePrimaryButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (props, ref) => (
    <AccessibleButton
      ref={ref}
      variant="default"
      {...props}
    />
  )
)

export const AccessibleSecondaryButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (props, ref) => (
    <AccessibleButton
      ref={ref}
      variant="outline"
      {...props}
    />
  )
)

export const AccessibleIconButton = forwardRef<HTMLButtonElement, AccessibleButtonProps & {
  icon: React.ReactNode
  iconPosition?: 'left' | 'right'
}>(({ icon, iconPosition = 'left', children, ...props }, ref) => (
  <AccessibleButton
    ref={ref}
    className={cn(
      'flex items-center gap-2',
      props.className
    )}
    {...props}
  >
    {iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
    {children}
    {iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
  </AccessibleButton>
))

AccessiblePrimaryButton.displayName = 'AccessiblePrimaryButton'
AccessibleSecondaryButton.displayName = 'AccessibleSecondaryButton'
AccessibleIconButton.displayName = 'AccessibleIconButton'