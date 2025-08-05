"use client"

import React, { useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { focusManager, announcer } from '@/lib/utils/accessibility'
import { cn } from '@/lib/utils'

interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnEscape?: boolean
  closeOnOverlayClick?: boolean
  initialFocus?: React.RefObject<HTMLElement>
  announceOnOpen?: string
  announceOnClose?: string
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
  closeOnEscape = true,
  closeOnOverlayClick = true,
  initialFocus,
  announceOnOpen,
  announceOnClose,
}: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const titleId = `modal-title-${React.useId()}`
  const descriptionId = `modal-description-${React.useId()}`

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      // Announce modal opening
      if (announceOnOpen) {
        announcer.announce(announceOnOpen, 'assertive')
      }

      // Trap focus within modal
      if (modalRef.current) {
        focusManager.trapFocus(modalRef.current)
        
        // Focus initial element if specified
        if (initialFocus?.current) {
          setTimeout(() => {
            initialFocus.current?.focus()
          }, 100)
        }
      }
    } else {
      // Release focus trap and restore focus
      focusManager.releaseFocusTrap()
      
      // Announce modal closing
      if (announceOnClose) {
        announcer.announce(announceOnClose, 'polite')
      }
    }

    return () => {
      if (isOpen) {
        focusManager.releaseFocusTrap()
      }
    }
  }, [isOpen, initialFocus, announceOnOpen, announceOnClose])

  // Handle keyboard events
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape) {
      event.preventDefault()
      onClose()
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md'
      case 'md':
        return 'max-w-lg'
      case 'lg':
        return 'max-w-2xl'
      case 'xl':
        return 'max-w-4xl'
      default:
        return 'max-w-lg'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={modalRef}
        className={cn(
          getSizeClasses(),
          'focus:outline-none',
          className
        )}
        onKeyDown={handleKeyDown}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        role="dialog"
        aria-modal="true"
      >
        <DialogHeader>
          <DialogTitle id={titleId} className="sr-only">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div id={descriptionId}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}