/**
 * Enhanced Interactive Elements for Landing Page
 * 
 * Provides sophisticated hover effects, micro-interactions, and feedback systems
 * specifically designed for the landing page redesign with subtle animations
 * and enhanced user experience.
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  ArrowRight, 
  Check, 
  Loader2, 
  ExternalLink, 
  ChevronRight,
  Star,
  Zap,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react'

// Enhanced CTA Button with sophisticated micro-interactions
interface EnhancedCTAButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  success?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
  href?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  glowEffect?: boolean
  magneticEffect?: boolean
  rippleEffect?: boolean
}

export function EnhancedCTAButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  disabled = false,
  className,
  onClick,
  href,
  icon,
  iconPosition = 'right',
  glowEffect = false,
  magneticEffect = false,
  rippleEffect = true,
  ...props
}: EnhancedCTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden group'
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary',
    ghost: 'text-primary hover:bg-primary/10 focus-visible:ring-primary',
  }

  const sizeClasses = {
    sm: 'h-9 px-4 text-sm rounded-md',
    md: 'h-11 px-6 text-base rounded-lg',
    lg: 'h-13 px-8 text-lg rounded-xl',
    xl: 'h-16 px-10 text-xl rounded-2xl',
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magneticEffect || !buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set((e.clientX - centerX) * 0.1)
    mouseY.set((e.clientY - centerY) * 0.1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rippleEffect && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const newRipple = { id: Date.now(), x, y }
      setRipples(prev => [...prev, newRipple])
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, 600)
    }
    
    onClick?.()
  }

  const buttonContent = (
    <>
      {/* Ripple Effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Glow Effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-inherit bg-gradient-to-r from-primary/50 to-secondary/50 blur-lg"
          animate={{
            opacity: isHovered ? 0.7 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Shimmer Effect */}
      <div className="absolute inset-0 rounded-inherit overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          animate={{
            x: isHovered ? '200%' : '-200%',
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <Loader2 className="w-4 h-4 animate-spin" />
          </motion.div>
        )}
        
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check className="w-4 h-4" />
          </motion.div>
        )}

        {icon && iconPosition === 'left' && !loading && !success && (
          <motion.span
            animate={{
              x: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}

        <motion.span
          animate={{
            opacity: loading || success ? 0.7 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {success ? 'Success!' : children}
        </motion.span>

        {icon && iconPosition === 'right' && !loading && !success && (
          <motion.span
            animate={{
              x: isHovered ? 2 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
      </div>
    </>
  )

  const buttonProps = {
    ref: buttonRef,
    className: cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabled && 'opacity-50 cursor-not-allowed',
      className
    ),
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    disabled: disabled || loading,
    ...props,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        style={magneticEffect ? { x, y } : {}}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        {...buttonProps}
      >
        {buttonContent}
      </motion.a>
    )
  }

  return (
    <motion.button
      style={magneticEffect ? { x, y } : {}}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      {...buttonProps}
    >
      {buttonContent}
    </motion.button>
  )
}

// Interactive Feature Card with advanced hover effects
interface InteractiveFeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  badge?: string
  hoverEffect?: 'lift' | 'tilt' | 'glow' | 'scale'
  glowColor?: string
}

export function InteractiveFeatureCard({
  title,
  description,
  icon,
  className,
  onClick,
  href,
  badge,
  hoverEffect = 'lift',
  glowColor = 'primary',
}: InteractiveFeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set((e.clientX - centerX) / 10)
    mouseY.set((e.clientY - centerY) / 10)
  }

  const getHoverVariants = () => {
    switch (hoverEffect) {
      case 'lift':
        return {
          y: -8,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        }
      case 'tilt':
        return {
          rotateX: 5,
          rotateY: 5,
          scale: 1.02,
        }
      case 'glow':
        return {
          boxShadow: `0 0 30px rgba(var(--${glowColor}), 0.3)`,
        }
      case 'scale':
        return {
          scale: 1.05,
        }
      default:
        return {}
    }
  }

  const cardContent = (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative p-6 bg-white rounded-xl border border-gray-200 cursor-pointer overflow-hidden group',
        className
      )}
      style={hoverEffect === 'tilt' ? { x: mouseX, y: mouseY } : {}}
      whileHover={getHoverVariants()}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />

      {/* Icon */}
      <motion.div
        className="relative z-10 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>

      {/* Badge */}
      {badge && (
        <motion.div
          className="absolute top-4 right-4 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {badge}
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <motion.h3
          className="text-lg font-semibold text-gray-900 mb-2"
          animate={{
            x: isHovered ? 4 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="text-gray-600 text-sm leading-relaxed"
          animate={{
            x: isHovered ? 4 : 0,
          }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Arrow Icon */}
      <motion.div
        className="absolute bottom-4 right-4 text-primary opacity-0 group-hover:opacity-100"
        animate={{
          x: isHovered ? 0 : 10,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <ArrowRight className="w-4 h-4" />
      </motion.div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0"
        animate={{
          x: isHovered ? '200%' : '-200%',
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.div>
  )

  if (href) {
    return <a href={href}>{cardContent}</a>
  }

  return cardContent
}

// Animated Statistics Counter
interface AnimatedStatProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  icon?: React.ReactNode
}

export function AnimatedStat({
  value,
  label,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
  icon,
}: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / (duration * 1000), 1)
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setDisplayValue(Math.floor(value * easeOutQuart))
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          
          animate()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, duration, isVisible])

  return (
    <motion.div
      ref={ref}
      className={cn('text-center', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        {icon && (
          <motion.div
            animate={{
              scale: isVisible ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-primary"
          >
            {icon}
          </motion.div>
        )}
        <motion.div
          className="text-3xl md:text-4xl font-bold text-gray-900"
          animate={{
            scale: isVisible ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {prefix}{displayValue.toLocaleString()}{suffix}
        </motion.div>
      </div>
      <motion.p
        className="text-gray-600 font-medium"
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        {label}
      </motion.p>
    </motion.div>
  )
}

// Interactive Link with sophisticated hover effects
interface EnhancedLinkProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'default' | 'arrow' | 'external' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

export function EnhancedLink({
  children,
  href,
  onClick,
  className,
  variant = 'default',
  size = 'md',
  icon,
}: EnhancedLinkProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const getVariantContent = () => {
    switch (variant) {
      case 'arrow':
        return (
          <>
            <span>{children}</span>
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </>
        )
      case 'external':
        return (
          <>
            <span>{children}</span>
            <motion.span
              animate={{ 
                x: isHovered ? 2 : 0,
                y: isHovered ? -2 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.span>
          </>
        )
      case 'underline':
        return (
          <span className="relative">
            {children}
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 bg-current"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? '100%' : 0 }}
              transition={{ duration: 0.3 }}
            />
          </span>
        )
      default:
        return (
          <>
            {icon && (
              <motion.span
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.span>
            )}
            <span>{children}</span>
          </>
        )
    }
  }

  const linkProps = {
    className: cn(
      'inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors duration-200',
      sizeClasses[size],
      className
    ),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        {...linkProps}
      >
        {getVariantContent()}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...linkProps}
    >
      {getVariantContent()}
    </motion.button>
  )
}

// Interactive Badge with pulse and glow effects
interface InteractiveBadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  glow?: boolean
  className?: string
  onClick?: () => void
}

export function InteractiveBadge({
  children,
  variant = 'default',
  size = 'md',
  pulse = false,
  glow = false,
  className,
  onClick,
}: InteractiveBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  const variantClasses = {
    default: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <motion.span
      className={cn(
        'inline-flex items-center font-medium rounded-full border transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        onClick && 'cursor-pointer hover:scale-105',
        glow && 'shadow-lg',
        className
      )}
      animate={{
        scale: pulse ? [1, 1.05, 1] : isHovered ? 1.05 : 1,
        boxShadow: glow && isHovered 
          ? '0 0 20px rgba(var(--primary), 0.3)' 
          : glow 
            ? '0 0 10px rgba(var(--primary), 0.2)' 
            : undefined,
      }}
      transition={{
        scale: pulse 
          ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.2 },
        boxShadow: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </motion.span>
  )
}

// Floating elements with magnetic effect
interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  delay?: number
}

export function FloatingElement({
  children,
  className,
  intensity = 1,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10 * intensity, 0],
        rotate: [0, 2 * intensity, 0, -2 * intensity, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}