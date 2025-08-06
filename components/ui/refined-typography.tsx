"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TypographyProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
}

export function RefinedHeadline({ children, className, animate = false }: TypographyProps) {
  const Component = animate ? motion.h1 : "h1"
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  } : {}

  return (
    <Component
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight",
        "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent",
        "relative",
        className
      )}
      {...animationProps}
    >
      {children}
      {/* Subtle text shadow for depth */}
      <span className="absolute inset-0 text-slate-900/5 blur-sm -z-10">{children}</span>
    </Component>
  )
}

export function RefinedSubheadline({ children, className, animate = false }: TypographyProps) {
  const Component = animate ? motion.p : "p"
  const animationProps = animate ? {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2 }
  } : {}

  return (
    <Component
      className={cn(
        "text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed",
        "max-w-4xl mx-auto",
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  )
}

export function RefinedSectionTitle({ children, className, animate = false }: TypographyProps) {
  const Component = animate ? motion.h2 : "h2"
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  } : {}

  return (
    <Component
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
        "text-slate-900 mb-6",
        "relative",
        className
      )}
      {...animationProps}
    >
      {children}
      {/* Accent line */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
    </Component>
  )
}

export function RefinedCardTitle({ children, className, animate = false }: TypographyProps) {
  const Component = animate ? motion.h3 : "h3"
  const animationProps = animate ? {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  } : {}

  return (
    <Component
      className={cn(
        "text-xl md:text-2xl font-semibold text-slate-800",
        "mb-3 leading-tight",
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  )
}

export function RefinedBodyText({ children, className, animate = false }: TypographyProps) {
  const Component = animate ? motion.p : "p"
  const animationProps = animate ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay: 0.1 }
  } : {}

  return (
    <Component
      className={cn(
        "text-base text-slate-600 leading-relaxed",
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  )
}

// Enhanced Badge Component
export function RefinedBadge({ 
  children, 
  variant = "default",
  className 
}: { 
  children: React.ReactNode
  variant?: "default" | "accent" | "outline"
  className?: string 
}) {
  const variants = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    accent: "bg-gradient-to-r from-blue-600 to-blue-700 text-white border border-blue-600",
    outline: "bg-transparent text-slate-700 border-2 border-slate-300"
  }

  return (
    <span className={cn(
      "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
      "transition-all duration-300 hover:scale-105",
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}

// Enhanced Quote Component
export function RefinedQuote({ 
  children, 
  author, 
  company,
  className 
}: { 
  children: React.ReactNode
  author?: string
  company?: string
  className?: string 
}) {
  return (
    <blockquote className={cn(
      "relative p-8 bg-white rounded-2xl border-2 border-slate-200",
      "shadow-sm hover:shadow-lg transition-all duration-300",
      className
    )}>
      {/* Quote marks */}
      <div className="absolute top-4 left-4 text-6xl text-blue-600/20 font-serif leading-none">"</div>
      
      <div className="relative z-10">
        <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
          {children}
        </p>
        
        {(author || company) && (
          <div className="border-t border-slate-200 pt-4">
            {author && (
              <div className="font-semibold text-slate-800">{author}</div>
            )}
            {company && (
              <div className="text-sm text-slate-600">{company}</div>
            )}
          </div>
        )}
      </div>
      
      {/* Bottom quote mark */}
      <div className="absolute bottom-4 right-4 text-6xl text-blue-600/20 font-serif leading-none rotate-180">"</div>
    </blockquote>
  )
}