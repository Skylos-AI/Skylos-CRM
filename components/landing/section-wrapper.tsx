"use client"

import { ReactNode, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
  background?: 'white' | 'gray' | 'primary' | 'gradient'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale'
  enableAnimation?: boolean
  fullWidth?: boolean
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const backgroundVariants = {
  white: 'bg-white',
  gray: 'bg-gray-50 dark:bg-gray-900',
  primary: 'bg-primary text-primary-foreground',
  gradient: 'bg-gradient-to-br from-primary/5 via-white to-secondary/5 dark:from-primary/10 dark:via-gray-900 dark:to-secondary/10'
}

const paddingVariants = {
  sm: 'py-12',
  md: 'py-16',
  lg: 'py-20',
  xl: 'py-24'
}

const containerVariants = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-8xl',
  full: 'max-w-full'
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(({
  id,
  children,
  className,
  background = 'white',
  padding = 'lg',
  animationType = 'fadeIn',
  enableAnimation = true,
  fullWidth = false,
  containerMaxWidth = 'xl',
  ...props
}, ref) => {
  const sectionContent = (
    <section
      ref={ref}
      id={id}
      className={cn(
        'relative overflow-hidden',
        backgroundVariants[background],
        paddingVariants[padding],
        className
      )}
      {...props}
    >
      <div className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        !fullWidth && containerVariants[containerMaxWidth]
      )}>
        {children}
      </div>
    </section>
  )

  if (!enableAnimation) {
    return sectionContent
  }

  return (
    <ScrollTriggeredSection animationType={animationType}>
      {sectionContent}
    </ScrollTriggeredSection>
  )
})

SectionWrapper.displayName = "SectionWrapper"