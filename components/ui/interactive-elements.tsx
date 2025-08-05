/**
 * Interactive Elements
 * 
 * Components with enhanced hover effects, press states, and micro-interactions
 * for improved user experience and engagement.
 */

'use client'

import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

// Enhanced Button with micro-interactions
interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'default' | 'lg'
  loading?: boolean
  success?: boolean
  className?: string
  hoverScale?: number
  tapScale?: number
  glowEffect?: boolean
}

export function InteractiveButton({
  children,
  variant = 'default',
  size = 'default',
  loading = false,
  success = false,
  className,
  hoverScale = 1.02,
  tapScale = 0.98,
  glowEffect = false,
  ...props
}: InteractiveButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  }

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    default: 'h-10 px-4 py-2',
    lg: 'h-11 px-8 text-lg',
  }

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowEffect && 'shadow-lg hover:shadow-xl',
        success && 'bg-green-500 hover:bg-green-600',
        className
      )}
      whileHover={{ 
        scale: hoverScale,
        boxShadow: glowEffect ? '0 10px 25px rgba(0, 0, 0, 0.15)' : undefined,
      }}
      whileTap={{ scale: tapScale }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      disabled={loading || success}
      {...props}
    >
      {loading && (
        <motion.div
          className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {success && (
        <motion.div
          className="mr-2 h-4 w-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
      
      <motion.span
        animate={success ? { opacity: 0.8 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {success ? 'Success!' : children}
      </motion.span>
    </motion.button>
  )
}

// Interactive Card with hover effects
interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'tilt'
  clickable?: boolean
  onClick?: () => void
  href?: string
}

export function InteractiveCard({
  children,
  className,
  hoverEffect = 'lift',
  clickable = false,
  onClick,
  href,
}: InteractiveCardProps) {
  const baseClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300'
  
  const getHoverVariants = () => {
    switch (hoverEffect) {
      case 'lift':
        return {
          initial: { y: 0, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' },
          hover: { y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' },
        }
      case 'glow':
        return {
          initial: { boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' },
          hover: { boxShadow: '0 0 20px rgba(var(--primary), 0.3)' },
        }
      case 'scale':
        return {
          initial: { scale: 1 },
          hover: { scale: 1.02 },
        }
      case 'tilt':
        return {
          initial: { rotateY: 0, rotateX: 0 },
          hover: { rotateY: 5, rotateX: 5 },
        }
      default:
        return {
          initial: {},
          hover: {},
        }
    }
  }

  const variants = getHoverVariants()
  
  const cardProps = {
    className: cn(
      baseClasses,
      clickable && 'cursor-pointer',
      className
    ),
    variants,
    initial: 'initial',
    whileHover: 'hover',
    whileTap: clickable ? { scale: 0.98 } : undefined,
    onClick,
  }

  if (href) {
    return (
      <motion.a href={href} {...cardProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div {...cardProps}>
      {children}
    </motion.div>
  )
}

// Interactive Link with underline animation
interface InteractiveLinkProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  underlineEffect?: 'slide' | 'fade' | 'grow'
  external?: boolean
}

export function InteractiveLink({
  children,
  href,
  onClick,
  className,
  underlineEffect = 'slide',
  external = false,
}: InteractiveLinkProps) {
  const baseClasses = 'relative inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors duration-200'
  
  const underlineVariants = {
    slide: {
      initial: { scaleX: 0, originX: 0 },
      hover: { scaleX: 1 },
    },
    fade: {
      initial: { opacity: 0 },
      hover: { opacity: 1 },
    },
    grow: {
      initial: { scaleX: 0, originX: 0.5 },
      hover: { scaleX: 1 },
    },
  }

  const linkContent = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-full bg-current"
        variants={underlineVariants[underlineEffect]}
        initial="initial"
        whileHover="hover"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      {external && (
        <motion.span
          className="ml-1 inline-block"
          whileHover={{ x: 2, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.span>
      )}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={cn(baseClasses, className)}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {linkContent}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={cn(baseClasses, className)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {linkContent}
    </motion.button>
  )
}

// Interactive Icon with hover effects
interface InteractiveIconProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: 'bounce' | 'rotate' | 'pulse' | 'shake'
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function InteractiveIcon({
  children,
  className,
  hoverEffect = 'bounce',
  onClick,
  size = 'md',
}: InteractiveIconProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'bounce':
        return { y: [-2, 0, -2] }
      case 'rotate':
        return { rotate: [0, 15, -15, 0] }
      case 'pulse':
        return { scale: [1, 1.2, 1] }
      case 'shake':
        return { x: [-2, 2, -2, 2, 0] }
      default:
        return {}
    }
  }

  return (
    <motion.div
      className={cn(
        'inline-flex items-center justify-center cursor-pointer',
        sizeClasses[size],
        className
      )}
      whileHover={getHoverAnimation()}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Interactive Badge with pulse effect
interface InteractiveBadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  pulse?: boolean
  glow?: boolean
}

export function InteractiveBadge({
  children,
  className,
  variant = 'default',
  pulse = false,
  glow = false,
}: InteractiveBadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-200'
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
  }

  return (
    <motion.span
      className={cn(
        baseClasses,
        variantClasses[variant],
        glow && 'shadow-lg',
        className
      )}
      animate={pulse ? {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
      } : {}}
      transition={pulse ? {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      } : {}}
      whileHover={{
        scale: 1.05,
        boxShadow: glow ? '0 0 15px rgba(var(--primary), 0.4)' : undefined,
      }}
    >
      {children}
    </motion.span>
  )
}

// Floating Action Button with magnetic effect
interface FloatingActionButtonProps {
  children: React.ReactNode
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  onClick?: () => void
  magneticEffect?: boolean
}

export function FloatingActionButton({
  children,
  className,
  position = 'bottom-right',
  onClick,
  magneticEffect = true,
}: FloatingActionButtonProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magneticEffect || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.2
    const deltaY = (e.clientY - centerY) * 0.2
    
    setMousePosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'fixed z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300',
        positionClasses[position],
        className
      )}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}