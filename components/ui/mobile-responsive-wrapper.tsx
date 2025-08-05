"use client"

import { ReactNode, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useViewport, mobileUtils, touchTargets } from "@/lib/utils/mobile-optimization"

interface MobileResponsiveWrapperProps {
  children: ReactNode
  className?: string
  enableSafeArea?: boolean
  enableHaptics?: boolean
  optimizeAnimations?: boolean
}

export function MobileResponsiveWrapper({
  children,
  className,
  enableSafeArea = true,
  enableHaptics = true,
  optimizeAnimations = true
}: MobileResponsiveWrapperProps) {
  const viewport = useViewport()
  const [safeAreaInsets, setSafeAreaInsets] = useState({ top: 0, bottom: 0, left: 0, right: 0 })

  useEffect(() => {
    if (enableSafeArea) {
      setSafeAreaInsets(mobileUtils.getSafeAreaInsets())
    }
  }, [enableSafeArea])

  // Apply mobile-specific optimizations
  useEffect(() => {
    if (viewport.isMobile) {
      // Add mobile-specific CSS custom properties
      document.documentElement.style.setProperty('--mobile-vh', `${viewport.height * 0.01}px`)
      
      // Optimize for mobile performance
      if (optimizeAnimations) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s')
      }
    } else {
      document.documentElement.style.setProperty('--animation-duration', '0.5s')
    }
  }, [viewport.isMobile, viewport.height, optimizeAnimations])

  const wrapperStyle = enableSafeArea ? {
    paddingTop: `${safeAreaInsets.top}px`,
    paddingBottom: `${safeAreaInsets.bottom}px`,
    paddingLeft: `${safeAreaInsets.left}px`,
    paddingRight: `${safeAreaInsets.right}px`
  } : {}

  return (
    <div
      className={cn(
        "min-h-screen w-full",
        viewport.isMobile && "mobile-optimized",
        viewport.isTablet && "tablet-optimized",
        viewport.isTouch && "touch-optimized",
        className
      )}
      style={wrapperStyle}
      data-viewport={viewport.isMobile ? 'mobile' : viewport.isTablet ? 'tablet' : 'desktop'}
    >
      {children}
    </div>
  )
}

// Touch-friendly button component
interface TouchButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  className?: string
  disabled?: boolean
  hapticFeedback?: boolean
}

export function TouchButton({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className,
  disabled = false,
  hapticFeedback = true
}: TouchButtonProps) {
  const viewport = useViewport()

  const handleClick = () => {
    if (disabled) return
    
    if (hapticFeedback && viewport.isTouch) {
      mobileUtils.hapticFeedback('light')
    }
    
    onClick?.()
  }

  const sizeClasses = {
    small: `min-h-[${touchTargets.minimum}px] px-4 py-2 text-sm`,
    medium: `min-h-[${touchTargets.comfortable}px] px-6 py-3 text-base`,
    large: `min-h-[${touchTargets.large}px] px-8 py-4 text-lg`
  }

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 active:bg-primary/80',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80',
    ghost: 'bg-transparent text-primary hover:bg-primary/10 active:bg-primary/20'
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "rounded-xl font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "select-none touch-manipulation", // Prevent text selection and optimize touch
        sizeClasses[size],
        variantClasses[variant],
        viewport.isTouch && "active:scale-95", // Enhanced touch feedback
        className
      )}
    >
      {children}
    </motion.button>
  )
}

// Mobile-optimized modal
interface MobileModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  fullScreen?: boolean
}

export function MobileModal({
  isOpen,
  onClose,
  children,
  title,
  fullScreen = false
}: MobileModalProps) {
  const viewport = useViewport()

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden'
      
      // Focus trap for accessibility
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      firstElement?.focus()
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: viewport.isMobile ? '100%' : 0,
      scale: viewport.isMobile ? 1 : 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "bg-white rounded-t-2xl md:rounded-2xl shadow-xl max-w-lg w-full",
              fullScreen && viewport.isMobile && "h-full rounded-none",
              !fullScreen && viewport.isMobile && "max-h-[90vh]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile handle */}
            {viewport.isMobile && (
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>
            )}

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-foreground">
                  {title}
                </h2>
                <TouchButton
                  variant="ghost"
                  size="small"
                  onClick={onClose}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  ×
                </TouchButton>
              </div>
            )}

            {/* Content */}
            <div className={cn(
              "p-6 overflow-y-auto",
              fullScreen && viewport.isMobile && "flex-1"
            )}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Swipeable carousel for mobile
interface SwipeableCarouselProps {
  children: ReactNode[]
  className?: string
  showDots?: boolean
  autoPlay?: boolean
  interval?: number
}

export function SwipeableCarousel({
  children,
  className,
  showDots = true,
  autoPlay = false,
  interval = 5000
}: SwipeableCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const viewport = useViewport()

  useEffect(() => {
    if (!autoPlay || isDragging) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % children.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, isDragging, children.length])

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)
    
    const threshold = 50
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (info.offset.x < -threshold && currentIndex < children.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag={viewport.isTouch ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>

      {/* Dots indicator */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-4">
          {children.map((_, index) => (
            <TouchButton
              key={index}
              size="small"
              variant="ghost"
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 p-0 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-primary scale-110"
                  : "bg-primary/30"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Mobile-optimized text input
interface MobileInputProps {
  type?: 'text' | 'email' | 'tel' | 'password'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  preventZoom?: boolean
}

export function MobileInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  preventZoom = true
}: MobileInputProps) {
  const viewport = useViewport()

  const handleFocus = () => {
    if (preventZoom && viewport.isMobile) {
      mobileUtils.preventZoom()
    }
  }

  const handleBlur = () => {
    if (preventZoom && viewport.isMobile) {
      mobileUtils.allowZoom()
    }
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        `min-h-[${touchTargets.comfortable}px] px-4 py-3`,
        "border border-gray-300 rounded-xl",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
        "text-base", // Prevent zoom on iOS
        className
      )}
    />
  )
}