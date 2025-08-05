/**
 * ScrollTriggeredSection Component
 * 
 * Reusable component for scroll-triggered animations with configurable
 * animation types, performance monitoring, and accessibility support.
 */

'use client'

import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/use-intersection-observer'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { 
  getAnimationVariants, 
  AnimationType, 
  reducedMotionVariants 
} from '@/lib/animations/variants'
import { cn } from '@/lib/utils'

interface ScrollTriggeredSectionProps {
  children: React.ReactNode
  animationType?: AnimationType
  className?: string
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
  duration?: number
  staggerChildren?: boolean
  staggerDelay?: number
  as?: keyof JSX.IntrinsicElements
  performanceMode?: boolean
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
}

export function ScrollTriggeredSection({
  children,
  animationType = 'fadeInUp',
  className,
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = true,
  delay = 0,
  duration,
  staggerChildren = false,
  staggerDelay = 0.1,
  as: Component = 'div',
  performanceMode = false,
  onAnimationStart,
  onAnimationComplete,
  ...motionProps
}: ScrollTriggeredSectionProps & Omit<MotionProps, 'variants' | 'initial' | 'animate'>) {
  const { ref, shouldAnimate } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
    delay,
  })
  
  const prefersReducedMotion = useReducedMotion()
  
  // Get animation variants based on reduced motion preference
  const variants = prefersReducedMotion 
    ? reducedMotionVariants 
    : getAnimationVariants(animationType)

  // Create custom variants with duration override if provided
  const customVariants = duration ? {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...variants.visible.transition,
        duration,
      },
    },
  } : variants

  // Add stagger configuration if enabled
  const staggerVariants = staggerChildren ? {
    ...customVariants,
    visible: {
      ...customVariants.visible,
      transition: {
        ...customVariants.visible.transition,
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  } : customVariants

  const MotionComponent = motion[Component as keyof typeof motion] as any

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      variants={staggerVariants}
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

// Specialized components for common use cases
export function FadeInSection(props: Omit<ScrollTriggeredSectionProps, 'animationType'>) {
  return <ScrollTriggeredSection {...props} animationType="fadeIn" />
}

export function SlideUpSection(props: Omit<ScrollTriggeredSectionProps, 'animationType'>) {
  return <ScrollTriggeredSection {...props} animationType="fadeInUp" />
}

export function SlideLeftSection(props: Omit<ScrollTriggeredSectionProps, 'animationType'>) {
  return <ScrollTriggeredSection {...props} animationType="fadeInLeft" />
}

export function SlideRightSection(props: Omit<ScrollTriggeredSectionProps, 'animationType'>) {
  return <ScrollTriggeredSection {...props} animationType="fadeInRight" />
}

export function ScaleInSection(props: Omit<ScrollTriggeredSectionProps, 'animationType'>) {
  return <ScrollTriggeredSection {...props} animationType="scaleIn" />
}

export function ZoomInSection(props: Omit<ScrollTriggeredSectionProps, 'animationType'>) {
  return <ScrollTriggeredSection {...props} animationType="zoomIn" />
}

export function StaggerSection(props: Omit<ScrollTriggeredSectionProps, 'animationType' | 'staggerChildren'>) {
  return (
    <ScrollTriggeredSection 
      {...props} 
      animationType="stagger" 
      staggerChildren={true}
    />
  )
}

// Hero section with specialized animation
export function HeroSection(props: Omit<ScrollTriggeredSectionProps, 'animationType'>) {
  return <ScrollTriggeredSection {...props} animationType="hero" />
}

// Component for individual stagger items
export function StaggerItem({ 
  children, 
  className,
  delay = 0,
  ...motionProps 
}: {
  children: React.ReactNode
  className?: string
  delay?: number
} & Omit<MotionProps, 'variants'>) {
  const prefersReducedMotion = useReducedMotion()
  
  const variants = prefersReducedMotion ? reducedMotionVariants : {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.2, 1],
        delay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}