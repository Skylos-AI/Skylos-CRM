/**
 * StaggerContainer Component
 * 
 * Container component for creating staggered animations with
 * customizable timing and direction.
 */

'use client'

import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-intersection-observer'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  direction?: 'normal' | 'reverse'
  as?: keyof JSX.IntrinsicElements
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = true,
  direction = 'normal',
  as: Component = 'div',
  onAnimationStart,
  onAnimationComplete,
  ...motionProps
}: StaggerContainerProps & Omit<MotionProps, 'variants' | 'initial' | 'animate'>) {
  const { ref, shouldAnimate } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  })
  
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        staggerDirection: direction === 'reverse' ? -1 : 1,
        delayChildren: prefersReducedMotion ? 0 : delayChildren,
      },
    },
  }

  const MotionComponent = motion[Component as keyof typeof motion] as any

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  )
}

// Specialized stagger containers for different layouts
export function StaggerGrid({
  children,
  className,
  columns = 3,
  ...props
}: Omit<StaggerContainerProps, 'className'> & {
  className?: string
  columns?: number
}) {
  return (
    <StaggerContainer
      className={cn(
        'grid gap-6',
        {
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
          'grid-cols-1 md:grid-cols-2': columns === 2,
          'grid-cols-1 md:grid-cols-4': columns === 4,
        },
        className
      )}
      {...props}
    >
      {children}
    </StaggerContainer>
  )
}

export function StaggerList({
  children,
  className,
  ...props
}: Omit<StaggerContainerProps, 'className'> & {
  className?: string
}) {
  return (
    <StaggerContainer
      className={cn('space-y-4', className)}
      {...props}
    >
      {children}
    </StaggerContainer>
  )
}

export function StaggerFlex({
  children,
  className,
  direction = 'row',
  ...props
}: Omit<StaggerContainerProps, 'className' | 'direction'> & {
  className?: string
  direction?: 'row' | 'column'
}) {
  return (
    <StaggerContainer
      className={cn(
        'flex',
        {
          'flex-row flex-wrap gap-4': direction === 'row',
          'flex-col space-y-4': direction === 'column',
        },
        className
      )}
      {...props}
    >
      {children}
    </StaggerContainer>
  )
}

// Individual stagger item component with different animation types
interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  animationType?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fade' | 'scale'
  as?: keyof JSX.IntrinsicElements
}

export function StaggerItem({
  children,
  className,
  animationType = 'slideUp',
  as: Component = 'div',
  ...motionProps
}: StaggerItemProps & Omit<MotionProps, 'variants'>) {
  const prefersReducedMotion = useReducedMotion()

  const getVariants = () => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1 } },
      }
    }

    const baseTransition = {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    }

    switch (animationType) {
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        }
      case 'slideDown':
        return {
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        }
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        }
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: baseTransition },
        }
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        }
    }
  }

  const MotionComponent = motion[Component as keyof typeof motion] as any

  return (
    <MotionComponent
      className={className}
      variants={getVariants()}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  )
}

// Preset combinations for common use cases
export function FeatureGrid({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <StaggerGrid
      className={className}
      columns={3}
      staggerDelay={0.15}
      delayChildren={0.2}
    >
      {children}
    </StaggerGrid>
  )
}

export function TestimonialList({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <StaggerList
      className={className}
      staggerDelay={0.2}
      delayChildren={0.3}
    >
      {children}
    </StaggerList>
  )
}

export function BenefitsList({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <StaggerList
      className={className}
      staggerDelay={0.1}
      delayChildren={0.1}
    >
      {children}
    </StaggerList>
  )
}