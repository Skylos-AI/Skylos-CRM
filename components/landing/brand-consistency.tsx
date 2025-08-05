"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

// Brand messaging constants
export const BRAND_MESSAGING = {
  tagline: "Custom AI Solutions That Actually Work",
  valueProposition: "Streamlined implementation, competitive costs, enterprise security",
  urgencyMessage: "Don't let competitors gain the AI advantage",
  differentiator: "Conversational AI as the next evolution in business automation",
  processPromise: "From idea to implementation in days, not months",
  costAdvantage: "Really competitive maintenance costs",
  securityPromise: "Enterprise-grade security and compliance",
  customizationPromise: "Fully tailored to your specific business needs"
} as const

// Consistent CTA messages
export const CTA_MESSAGES = {
  primary: "Start Your AI Transformation",
  secondary: "See How It Works",
  consultation: "Schedule Free Consultation",
  demo: "Request Live Demo",
  caseStudies: "Download Case Studies",
  contact: "Get Started Today",
  urgency: "Don't Wait - Start Now",
  risk_free: "Try Risk-Free for 30 Days"
} as const

// Brand color scheme
export const BRAND_COLORS = {
  primary: "hsl(222.2, 47.4%, 11.2%)",
  primaryForeground: "hsl(210, 40%, 98%)",
  secondary: "hsl(210, 40%, 96.1%)",
  accent: "hsl(221.2, 83.2%, 53.3%)",
  success: "hsl(142.1, 76.2%, 36.3%)",
  warning: "hsl(38.4, 92.1%, 50.2%)",
  error: "hsl(0, 84.2%, 60.2%)",
  muted: "hsl(210, 40%, 96.1%)",
  mutedForeground: "hsl(215.4, 16.3%, 46.9%)"
} as const

interface BrandedHeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'hero' | 'section' | 'subsection' | 'feature'
  className?: string
  gradient?: boolean
}

export function BrandedHeading({ 
  children, 
  level = 2, 
  variant = 'section',
  className,
  gradient = false
}: BrandedHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  const variantStyles = {
    hero: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    section: "text-3xl md:text-4xl font-bold tracking-tight",
    subsection: "text-2xl md:text-3xl font-semibold tracking-tight",
    feature: "text-xl md:text-2xl font-semibold"
  }

  const gradientClass = gradient 
    ? "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
    : ""

  return (
    <Tag className={cn(
      variantStyles[variant],
      gradientClass,
      "font-primary leading-tight",
      className
    )}>
      {children}
    </Tag>
  )
}

interface BrandedTextProps {
  children: ReactNode
  variant?: 'body' | 'lead' | 'caption' | 'small'
  className?: string
  muted?: boolean
}

export function BrandedText({ 
  children, 
  variant = 'body',
  className,
  muted = false
}: BrandedTextProps) {
  const variantStyles = {
    lead: "text-lg md:text-xl leading-relaxed",
    body: "text-base leading-relaxed",
    caption: "text-sm leading-normal",
    small: "text-xs leading-normal"
  }

  return (
    <p className={cn(
      variantStyles[variant],
      "font-secondary",
      muted ? "text-muted-foreground" : "text-foreground",
      className
    )}>
      {children}
    </p>
  )
}

interface BrandedCTAProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  href?: string
  onClick?: () => void
  urgency?: boolean
  disabled?: boolean
}

export function BrandedCTA({ 
  children, 
  variant = 'primary',
  size = 'md',
  className,
  href,
  onClick,
  urgency = false,
  disabled = false
}: BrandedCTAProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variantStyles = {
    primary: urgency 
      ? "bg-gradient-to-r from-error to-warning text-white hover:from-error/90 hover:to-warning/90 shadow-lg hover:shadow-xl focus:ring-error/50"
      : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl focus:ring-primary/50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary/50",
    ghost: "text-primary hover:bg-primary/10 focus:ring-primary/50"
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-lg",
    xl: "px-10 py-5 text-xl rounded-xl"
  }

  const urgencyPulse = urgency ? "animate-pulse" : ""

  const Component = href ? 'a' : 'button'

  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        urgencyPulse,
        className
      )}
    >
      {children}
      {urgency && (
        <span className="ml-2 text-xs opacity-75">
          ⚡
        </span>
      )}
    </Component>
  )
}

interface MessageConsistencyProps {
  section: 'hero' | 'problem' | 'solution' | 'process' | 'competitive' | 'painpoints' | 'social' | 'contact'
  children?: ReactNode
}

export function MessageConsistency({ section, children }: MessageConsistencyProps) {
  const sectionMessages = {
    hero: {
      headline: "Stop Losing to Competitors Who Already Use AI",
      subheadline: "Get custom conversational agents tailored to your business needs - deployed in days, not months",
      emphasis: BRAND_MESSAGING.urgencyMessage
    },
    problem: {
      headline: "Your Competitors Are Already Ahead",
      subheadline: "Businesses without AI automation are falling behind in efficiency and customer satisfaction",
      emphasis: "The cost of inaction grows every day"
    },
    solution: {
      headline: "Conversational AI: The Next Evolution",
      subheadline: "Move beyond basic automation with intelligent agents that understand context and provide personalized experiences",
      emphasis: BRAND_MESSAGING.differentiator
    },
    process: {
      headline: "From Idea to Implementation in 3 Simple Steps",
      subheadline: "Streamlined process with minimal client input and maximum business impact",
      emphasis: BRAND_MESSAGING.processPromise
    },
    competitive: {
      headline: "Why Choose Our AI Solutions",
      subheadline: "Superior maintenance costs, enterprise security, and comprehensive tool integration",
      emphasis: BRAND_MESSAGING.costAdvantage
    },
    painpoints: {
      headline: "Solving Real Business Challenges",
      subheadline: "Custom agents built around your specific pain points and industry requirements",
      emphasis: BRAND_MESSAGING.customizationPromise
    },
    social: {
      headline: "Trusted by Industry Leaders",
      subheadline: "See how businesses like yours have transformed with our AI solutions",
      emphasis: "Measurable results, proven ROI"
    },
    contact: {
      headline: "Ready to Transform Your Business?",
      subheadline: "Get started with a free consultation and discover your AI potential",
      emphasis: "No commitment, just insights"
    }
  }

  const messages = sectionMessages[section]

  return (
    <div className="text-center space-y-4 mb-12">
      <BrandedHeading variant="section" gradient>
        {messages.headline}
      </BrandedHeading>
      <BrandedText variant="lead" className="max-w-3xl mx-auto">
        {messages.subheadline}
      </BrandedText>
      <BrandedText variant="caption" muted className="font-medium">
        {messages.emphasis}
      </BrandedText>
      {children}
    </div>
  )
}

// Consistent spacing utility
export function BrandedSpacing({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  }
  
  return <div className={sizeMap[size]} />
}