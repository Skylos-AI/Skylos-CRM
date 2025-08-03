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

    const shadowStyle = priority === 'primary' 
      ? {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(59, 130, 246, 0.05)',
          ...style
        }
      : {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(148, 163, 184, 0.05)',
          ...style
        }

    return (
      <div
        ref={ref}
        className={cn(
          containerStyles(variant, priority),
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