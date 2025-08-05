/**
 * Hero Content Components
 * 
 * Content components for the hero section with FOMO messaging,
 * compelling headlines, and interactive CTAs with conversion tracking.
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap, TrendingUp, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DisplayHero, DisplaySubtitle, BodyLarge } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

// FOMO Badge Component
interface FOMOBadgeProps {
  text: string
  icon?: React.ReactNode
  variant?: 'urgent' | 'trending' | 'limited' | 'new'
  className?: string
}

export function FOMOBadge({ 
  text, 
  icon, 
  variant = 'urgent',
  className 
}: FOMOBadgeProps) {
  const variantStyles = {
    urgent: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
    trending: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
    limited: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
    new: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
  }

  const defaultIcons = {
    urgent: <Zap className="h-3 w-3" />,
    trending: <TrendingUp className="h-3 w-3" />,
    limited: <Clock className="h-3 w-3" />,
    new: <Users className="h-3 w-3" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Badge 
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border',
          variantStyles[variant],
          className
        )}
      >
        {icon || defaultIcons[variant]}
        {text}
      </Badge>
    </motion.div>
  )
}

// Compelling Headlines Component
interface HeroHeadlineProps {
  children: React.ReactNode
  className?: string
  highlight?: string
  highlightColor?: 'primary' | 'gradient' | 'accent'
}

export function HeroHeadline({ 
  children, 
  className,
  highlight,
  highlightColor = 'primary'
}: HeroHeadlineProps) {
  const highlightStyles = {
    primary: 'text-primary',
    gradient: 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent',
    accent: 'text-accent',
  }

  const processText = (text: string) => {
    if (!highlight) return text
    
    const parts = text.split(highlight)
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className={highlightStyles[highlightColor]}>
            {highlight}
          </span>
        )}
      </React.Fragment>
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <DisplayHero className={cn('leading-tight', className)}>
        {typeof children === 'string' ? processText(children) : children}
      </DisplayHero>
    </motion.div>
  )
}

// Interactive CTA Buttons
interface CTAButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'default' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  href?: string
  onClick?: () => void
  className?: string
  trackingId?: string
  loading?: boolean
  pulse?: boolean
}

export function CTAButton({
  children,
  variant = 'primary',
  size = 'lg',
  icon,
  iconPosition = 'right',
  href,
  onClick,
  className,
  trackingId,
  loading = false,
  pulse = false,
}: CTAButtonProps) {
  const handleClick = () => {
    // Track conversion
    if (trackingId) {
      // Analytics tracking would go here
      console.log(`CTA clicked: ${trackingId}`)
    }
    
    if (onClick) {
      onClick()
    }
  }

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  )

  const buttonProps = {
    variant: variant as any,
    size,
    className: cn(
      'transition-all duration-200 font-medium',
      'hover:scale-105 active:scale-95',
      'focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
      pulse && 'animate-pulse',
      className
    ),
    onClick: handleClick,
    disabled: loading,
  }

  if (href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button {...buttonProps} asChild>
          <a href={href}>
            {buttonContent}
          </a>
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button {...buttonProps}>
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
            Loading...
          </div>
        ) : (
          buttonContent
        )}
      </Button>
    </motion.div>
  )
}

// CTA Button Group
interface CTAGroupProps {
  children: React.ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  align?: 'left' | 'center' | 'right'
}

export function CTAGroup({ 
  children, 
  className,
  direction = 'horizontal',
  align = 'left'
}: CTAGroupProps) {
  const directionClasses = {
    horizontal: 'flex flex-col sm:flex-row gap-4',
    vertical: 'flex flex-col gap-4',
  }

  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  return (
    <div className={cn(
      directionClasses[direction],
      alignClasses[align],
      className
    )}>
      {children}
    </div>
  )
}

// Social Proof Elements
interface SocialProofProps {
  stats: {
    label: string
    value: string
    icon?: React.ReactNode
  }[]
  className?: string
}

export function SocialProof({ stats, className }: SocialProofProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className={cn('flex flex-wrap items-center gap-6 text-sm text-muted-foreground', className)}
    >
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2">
          {stat.icon && <span className="text-primary">{stat.icon}</span>}
          <span className="font-semibold text-foreground">{stat.value}</span>
          <span>{stat.label}</span>
        </div>
      ))}
    </motion.div>
  )
}

// Trust Indicators
interface TrustIndicatorProps {
  indicators: {
    text: string
    icon: React.ReactNode
  }[]
  className?: string
}

export function TrustIndicators({ indicators, className }: TrustIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className={cn('flex flex-wrap items-center gap-6 text-sm text-muted-foreground', className)}
    >
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-green-500">{indicator.icon}</span>
          <span>{indicator.text}</span>
        </div>
      ))}
    </motion.div>
  )
}

// Complete Hero Content Template
interface HeroContentTemplateProps {
  badge?: {
    text: string
    variant?: 'urgent' | 'trending' | 'limited' | 'new'
    icon?: React.ReactNode
  }
  headline: string
  highlightText?: string
  subheadline: string
  primaryCTA: {
    text: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
  }
  secondaryCTA?: {
    text: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
  }
  socialProof?: {
    label: string
    value: string
    icon?: React.ReactNode
  }[]
  trustIndicators?: {
    text: string
    icon: React.ReactNode
  }[]
  className?: string
}

export function HeroContentTemplate({
  badge,
  headline,
  highlightText,
  subheadline,
  primaryCTA,
  secondaryCTA,
  socialProof,
  trustIndicators,
  className,
}: HeroContentTemplateProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Badge */}
      {badge && (
        <FOMOBadge 
          text={badge.text}
          variant={badge.variant}
          icon={badge.icon}
        />
      )}

      {/* Headline */}
      <HeroHeadline highlight={highlightText}>
        {headline}
      </HeroHeadline>

      {/* Subheadline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <DisplaySubtitle>
          {subheadline}
        </DisplaySubtitle>
      </motion.div>

      {/* CTA Buttons */}
      <CTAGroup>
        <CTAButton
          href={primaryCTA.href}
          onClick={primaryCTA.onClick}
          icon={primaryCTA.icon || <ArrowRight className="h-4 w-4" />}
          trackingId="hero-primary-cta"
        >
          {primaryCTA.text}
        </CTAButton>
        
        {secondaryCTA && (
          <CTAButton
            variant="outline"
            href={secondaryCTA.href}
            onClick={secondaryCTA.onClick}
            icon={secondaryCTA.icon || <Play className="h-4 w-4" />}
            trackingId="hero-secondary-cta"
          >
            {secondaryCTA.text}
          </CTAButton>
        )}
      </CTAGroup>

      {/* Social Proof */}
      {socialProof && <SocialProof stats={socialProof} />}

      {/* Trust Indicators */}
      {trustIndicators && <TrustIndicators indicators={trustIndicators} />}
    </div>
  )
}