"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const enhancedButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-lg active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105 hover:shadow-lg active:scale-95",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:shadow-md active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 hover:shadow-md active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105 active:scale-95",
        floating: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 hover:shadow-xl hover:-translate-y-1 active:scale-95 active:translate-y-0 shadow-lg",
        gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 hover:scale-105 hover:shadow-lg active:scale-95",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        bounce: "hover:animate-bounce-in",
        pulse: "hover:animate-pulse",
        wiggle: "hover:animate-wiggle",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant, size, animation, asChild = false, loading = false, icon, iconPosition = "left", children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const isDisabled = disabled || loading
    
    return (
      <Comp
        className={cn(
          enhancedButtonVariants({ variant, size, animation, className }),
          loading && "cursor-not-allowed opacity-70",
          "group relative overflow-hidden"
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
        
        <div className={cn(
          "flex items-center gap-2 transition-opacity duration-200",
          loading && "opacity-0"
        )}>
          {icon && iconPosition === "left" && (
            <span className="transition-transform duration-200 group-hover:scale-110">
              {icon}
            </span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="transition-transform duration-200 group-hover:scale-110">
              {icon}
            </span>
          )}
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 overflow-hidden rounded-md">
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out skew-x-12" />
        </div>
      </Comp>
    )
  }
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, enhancedButtonVariants }