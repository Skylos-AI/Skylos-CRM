/**
 * Feedback System Components
 * 
 * Provides loading states, success feedback, error states, and other
 * user feedback mechanisms with smooth animations and micro-interactions.
 */

'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Zap,
  Heart,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Loading Spinner with different variants
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'ring'
  color?: 'primary' | 'secondary' | 'white' | 'gray'
  className?: string
}

export function LoadingSpinner({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  className
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    gray: 'text-gray-500'
  }

  if (variant === 'spinner') {
    return (
      <motion.div
        className={cn(sizeClasses[size], colorClasses[color], className)}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className="w-full h-full" />
      </motion.div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex gap-1', className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'rounded-full',
              size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4',
              colorClasses[color].replace('text-', 'bg-')
            )}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={cn(
          'rounded-full',
          sizeClasses[size],
          colorClasses[color].replace('text-', 'bg-'),
          className
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    )
  }

  if (variant === 'bars') {
    return (
      <div className={cn('flex gap-1 items-end', className)}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'rounded-sm',
              size === 'sm' ? 'w-1' : size === 'md' ? 'w-1.5' : size === 'lg' ? 'w-2' : 'w-3',
              colorClasses[color].replace('text-', 'bg-')
            )}
            animate={{
              height: [
                size === 'sm' ? 8 : size === 'md' ? 12 : size === 'lg' ? 16 : 24,
                size === 'sm' ? 16 : size === 'md' ? 24 : size === 'lg' ? 32 : 48,
                size === 'sm' ? 8 : size === 'md' ? 12 : size === 'lg' ? 16 : 24
              ]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'ring') {
    return (
      <motion.div
        className={cn(
          'rounded-full border-2 border-transparent',
          sizeClasses[size],
          className
        )}
        style={{
          borderTopColor: 'currentColor',
          borderRightColor: 'currentColor'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    )
  }

  return null
}

// Success Feedback Component
interface SuccessFeedbackProps {
  message?: string
  icon?: React.ReactNode
  duration?: number
  onComplete?: () => void
  className?: string
  variant?: 'checkmark' | 'celebration' | 'simple'
}

export function SuccessFeedback({
  message = 'Success!',
  icon,
  duration = 3000,
  onComplete,
  className,
  variant = 'checkmark'
}: SuccessFeedbackProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  const getIcon = () => {
    if (icon) return icon
    
    switch (variant) {
      case 'celebration':
        return <Star className="w-6 h-6" />
      case 'simple':
        return <CheckCircle2 className="w-6 h-6" />
      default:
        return <Check className="w-6 h-6" />
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700',
            className
          )}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1,
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
            className="text-green-600"
          >
            {getIcon()}
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="font-medium"
          >
            {message}
          </motion.span>

          {variant === 'celebration' && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                    opacity: 1
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 200}%`,
                    y: `${50 + (Math.random() - 0.5) * 200}%`,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.1,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Error Feedback Component
interface ErrorFeedbackProps {
  message?: string
  icon?: React.ReactNode
  duration?: number
  onComplete?: () => void
  className?: string
  dismissible?: boolean
}

export function ErrorFeedback({
  message = 'Something went wrong',
  icon,
  duration = 5000,
  onComplete,
  className,
  dismissible = true
}: ErrorFeedbackProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onComplete])

  const handleDismiss = () => {
    setIsVisible(false)
    onComplete?.()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700',
            className
          )}
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: 0,
            // Shake animation
            ...(isVisible && { x: [-2, 2, -2, 2, 0] })
          }}
          exit={{ opacity: 0, scale: 0.8, x: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-red-600"
          >
            {icon || <XCircle className="w-6 h-6" />}
          </motion.div>
          
          <span className="font-medium flex-1">{message}</span>

          {dismissible && (
            <motion.button
              onClick={handleDismiss}
              className="text-red-400 hover:text-red-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Progress Indicator
interface ProgressIndicatorProps {
  progress: number
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning'
  className?: string
  animated?: boolean
}

export function ProgressIndicator({
  progress,
  showPercentage = true,
  size = 'md',
  color = 'primary',
  className,
  animated = true
}: ProgressIndicatorProps) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500'
  }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <motion.div
          className={cn('h-full rounded-full', colorClasses[color])}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          transition={{ 
            duration: animated ? 0.5 : 0, 
            ease: 'easeOut' 
          }}
        />
      </div>
      
      {showPercentage && (
        <motion.div
          className="text-sm text-gray-600 mt-1 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  )
}

// Notification Toast
interface NotificationToastProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  onClose?: () => void
  className?: string
}

export function NotificationToast({
  type,
  title,
  message,
  duration = 4000,
  onClose,
  className
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600'
        }
      case 'error':
        return {
          icon: <XCircle className="w-5 h-5" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600'
        }
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600'
        }
      case 'info':
        return {
          icon: <Info className="w-5 h-5" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-600'
        }
    }
  }

  const config = getConfig()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-md',
            config.bgColor,
            config.borderColor,
            config.textColor,
            className
          )}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <motion.div
            className={config.iconColor}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: 0.1,
              type: 'spring',
              stiffness: 300
            }}
          >
            {config.icon}
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h4
              className="font-semibold text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h4>
            
            {message && (
              <motion.p
                className="text-sm mt-1 opacity-90"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.9, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {message}
              </motion.p>
            )}
          </div>
          
          <motion.button
            onClick={() => {
              setIsVisible(false)
              onClose?.()
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Skeleton Loader
interface SkeletonLoaderProps {
  lines?: number
  className?: string
  animated?: boolean
}

export function SkeletonLoader({
  lines = 3,
  className,
  animated = true
}: SkeletonLoaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-200 rounded"
          style={{ width: `${Math.random() * 40 + 60}%` }}
          animate={animated ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={animated ? {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1
          } : {}}
        />
      ))}
    </div>
  )
}

// Heartbeat Animation (for like buttons, etc.)
interface HeartbeatProps {
  children: React.ReactNode
  active?: boolean
  className?: string
  onClick?: () => void
}

export function Heartbeat({
  children,
  active = false,
  className,
  onClick
}: HeartbeatProps) {
  return (
    <motion.button
      className={cn('inline-flex items-center justify-center', className)}
      animate={active ? {
        scale: [1, 1.2, 1],
      } : {}}
      transition={{
        duration: 0.6,
        repeat: active ? Infinity : 0,
        ease: 'easeInOut'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}