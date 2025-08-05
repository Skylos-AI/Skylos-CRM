/**
 * AsymmetricalHero Component
 * 
 * Hero section with asymmetrical layout supporting left/right title positioning,
 * clean typography hierarchy using Winner Sans, and responsive design.
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrollTriggeredSection } from '@/components/animations/scroll-triggered-section'
import { DisplayHero, DisplaySubtitle } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EnhancedCTAButton } from '@/components/landing/enhanced-interactive-elements'
import { hoverEffects } from '@/lib/animations/hover-effects'
import { cn } from '@/lib/utils'

interface CTAButton {
  text: string
  href?: string
  onClick?: () => void
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  icon?: React.ReactNode
}

interface AsymmetricalHeroProps {
  titlePosition?: 'left' | 'right'
  headline: string
  subheadline: string
  badge?: {
    text: string
    variant?: 'default' | 'secondary' | 'outline'
  }
  ctaButtons: CTAButton[]
  backgroundElement?: React.ReactNode
  className?: string
  contentMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  spacing?: 'compact' | 'normal' | 'spacious'
}

export function AsymmetricalHero({
  titlePosition = 'left',
  headline,
  subheadline,
  badge,
  ctaButtons,
  backgroundElement,
  className,
  contentMaxWidth = 'xl',
  spacing = 'normal',
}: AsymmetricalHeroProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  }

  const spacingClasses = {
    compact: 'py-16 lg:py-20',
    normal: 'py-20 lg:py-32',
    spacious: 'py-24 lg:py-40',
  }

  const contentSpacing = {
    compact: 'space-y-6',
    normal: 'space-y-8',
    spacious: 'space-y-10',
  }

  return (
    <section className={cn(
      'relative overflow-hidden bg-black',
      spacingClasses[spacing],
      className
    )}>
      {/* Background Element */}
      {backgroundElement && (
        <div className="absolute inset-0 -z-10">
          {backgroundElement}
        </div>
      )}

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-white to-blue-600"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-0 w-1 h-32 bg-white opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-1 h-32 bg-white opacity-20"></div>
      </div>

      {/* Background Image Placeholder on Right Side */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-3/4 opacity-10">
          <div className="relative w-full h-full bg-white rounded-2xl border-4 border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Image placeholder content */}
            <div className="text-center space-y-6 p-8">
              <div className="mx-auto h-20 w-20 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <div className="h-10 w-10 bg-blue-600 rounded-lg" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">AI Visualization</p>
                <p className="text-sm text-white/70">Interactive demo placeholder</p>
              </div>
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-600 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-600 rounded-br-2xl"></div>
          </div>
        </div>
      </div>

      <div className="container relative">
        <div className="flex items-center justify-start min-h-[80vh]">
          {/* Content Section */}
          <ScrollTriggeredSection
            animationType="hero"
            className={cn(
              titlePosition === 'right' && 'lg:order-2'
            )}
          >
            <div className={cn(
              contentSpacing[spacing],
              maxWidthClasses[contentMaxWidth],
              titlePosition === 'right' && 'lg:ml-auto'
            )}>
              {/* Badge */}
              {badge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Badge 
                    variant={badge.variant || 'secondary'} 
                    className="w-fit text-sm font-medium bg-white text-black hover:bg-gray-100 transition-colors duration-300 border-2 border-white"
                  >
                    {badge.text}
                  </Badge>
                </motion.div>
              )}

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <DisplayHero className={cn(
                  'text-white font-bold relative z-10',
                  titlePosition === 'right' && 'lg:text-right'
                )}>
                  {headline}
                </DisplayHero>
                {/* Accent line under headline */}
                <div className="absolute -bottom-2 left-0 w-24 h-1 bg-blue-600 rounded-full"></div>
              </motion.div>

              {/* Subheadline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <DisplaySubtitle className={cn(
                  'text-gray-300 leading-relaxed',
                  titlePosition === 'right' && 'lg:text-right'
                )}>
                  {subheadline}
                </DisplaySubtitle>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className={cn(
                  'flex flex-col sm:flex-row gap-4',
                  titlePosition === 'right' && 'lg:justify-end'
                )}
              >
                {ctaButtons.map((button, index) => (
                  <EnhancedCTAButton
                    key={index}
                    variant={button.variant === 'default' ? 'primary' : button.variant as any}
                    size={button.size === 'lg' ? 'lg' : 'md'}
                    className="w-full sm:w-auto"
                    onClick={button.onClick}
                    href={button.href}
                    icon={button.icon}
                    iconPosition="right"
                    glowEffect={index === 0} // Primary button gets glow effect
                    magneticEffect={true}
                    rippleEffect={true}
                  >
                    {button.text}
                  </EnhancedCTAButton>
                ))}
              </motion.div>
            </div>
          </ScrollTriggeredSection>


        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-white to-transparent opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-white to-transparent opacity-30" />
      
      {/* Additional corner elements */}
      <div className="absolute top-8 right-8 w-4 h-4 border-2 border-blue-600 rotate-45"></div>
      <div className="absolute bottom-8 left-8 w-4 h-4 border-2 border-white rotate-45"></div>
    </section>
  )
}

// Specialized hero variants for common use cases
export function LeftAlignedHero(props: Omit<AsymmetricalHeroProps, 'titlePosition'>) {
  return <AsymmetricalHero {...props} titlePosition="left" />
}

export function RightAlignedHero(props: Omit<AsymmetricalHeroProps, 'titlePosition'>) {
  return <AsymmetricalHero {...props} titlePosition="right" />
}

// Hero with custom background patterns
interface HeroWithPatternProps extends AsymmetricalHeroProps {
  pattern?: 'dots' | 'grid' | 'gradient' | 'none'
}

export function HeroWithPattern({ 
  pattern = 'none', 
  ...props 
}: HeroWithPatternProps) {
  const getPatternElement = () => {
    switch (pattern) {
      case 'dots':
        return (
          <div className="absolute inset-0 opacity-30">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(var(--primary), 0.1) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>
        )
      case 'grid':
        return (
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(var(--border), 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(var(--border), 0.5) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }}
            />
          </div>
        )
      case 'gradient':
        return (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <AsymmetricalHero 
      {...props} 
      backgroundElement={getPatternElement()}
    />
  )
}

// Compact hero for secondary pages
export function CompactHero(props: Omit<AsymmetricalHeroProps, 'spacing'>) {
  return <AsymmetricalHero {...props} spacing="compact" />
}

// Spacious hero for landing pages
export function SpaciousHero(props: Omit<AsymmetricalHeroProps, 'spacing'>) {
  return <AsymmetricalHero {...props} spacing="spacious" />
}