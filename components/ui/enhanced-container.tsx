"use client"

import { forwardRef, HTMLAttributes } from "react"
import { cn, containerStyles } from "@/lib/design-system/utils"

interface EnhancedContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'nested' | 'interactive'
  priority?: 'normal' | 'primary'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const EnhancedContainer = forwardRef<HTMLDivElement, EnhancedContainerProps>(
  ({ 
    className, 
    variant = 'default', 
    priority = 'normal',
    padding = 'md',
    children,
    style,
    ...props 
  }, ref) => {
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }

    // Theme-aware shadow styles
    const shadowStyle = priority === 'primary' 
      ? {
          boxShadow: 'var(--tw-shadow-light-card), inset 0 0 0 1px rgba(59, 130, 246, 0.05)',
          ...style
        }
      : {
          boxShadow: 'var(--tw-shadow-light-card), inset 0 0 0 1px rgba(0, 0, 0, 0.02)',
          ...style
        }

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white dark:bg-slate-800 border border-light-border-subtle/60 dark:border-slate-700/40",
          "rounded-xl shadow-light-card dark:shadow-card",
          "hover:border-light-border-default/80 dark:hover:border-slate-600/60",
          "hover:shadow-light-card-hover dark:hover:shadow-card-hover",
          "transition-all duration-200 ease-in-out",
          variant === 'elevated' && "hover:-translate-y-0.5",
          variant === 'nested' && "bg-gray-50 dark:bg-slate-750 border-light-border-subtle/40 dark:border-slate-600/30 rounded-lg",
          variant === 'interactive' && "cursor-pointer hover:-translate-y-0.5",
          priority === 'primary' && "border-primary-500/30 shadow-light-card dark:shadow-glow-soft hover:border-primary-400/50",
          paddingStyles[padding],
          className
        )}
        style={shadowStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)

EnhancedContainer.displayName = "EnhancedContainer"

export { EnhancedContainer }