/**
 * Typography Components
 * 
 * Reusable typography components with consistent styling
 * using Winner Sans and Roboto fonts.
 */

import React from 'react'
import { cn, typographyVariants, getTypographyClasses } from '@/lib/design-system/typography'

// Base Typography Component
interface TypographyProps {
  className?: string
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
}

// Headline Components (Winner Sans)
export function H1({ className, children, as: Component = 'h1', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.headline.h1, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function H2({ className, children, as: Component = 'h2', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.headline.h2, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function H3({ className, children, as: Component = 'h3', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.headline.h3, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function H4({ className, children, as: Component = 'h4', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.headline.h4, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function H5({ className, children, as: Component = 'h5', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.headline.h5, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function H6({ className, children, as: Component = 'h6', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.headline.h6, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

// Display Components for Hero Sections
export function DisplayHero({ className, children, as: Component = 'h1', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.display.hero, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function DisplaySubtitle({ className, children, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.display.subtitle, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

// Body Text Components (Roboto)
export function BodyLarge({ className, children, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.body.large, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function BodyRegular({ className, children, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.body.regular, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function BodySmall({ className, children, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.body.small, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function BodyXS({ className, children, as: Component = 'p', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.body.xs, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

// Interactive Components
export function ButtonText({ className, children, as: Component = 'span', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.interactive.button, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function LinkText({ className, children, as: Component = 'span', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.interactive.link, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function NavText({ className, children, as: Component = 'span', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.interactive.nav, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

// Utility Components
export function Caption({ className, children, as: Component = 'span', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.utility.caption, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function Label({ className, children, as: Component = 'label', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.utility.label, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

export function Code({ className, children, as: Component = 'code', ...props }: TypographyProps) {
  return (
    <Component 
      className={cn(typographyVariants.utility.code, className)} 
      {...props}
    >
      {children}
    </Component>
  )
}

// Generic Typography Component with variant prop
interface GenericTypographyProps extends TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 
           'hero' | 'subtitle' |
           'body-large' | 'body-regular' | 'body-small' | 'body-xs' |
           'button' | 'link' | 'nav' |
           'caption' | 'label' | 'code'
}

export function Typography({ variant, className, children, as, ...props }: GenericTypographyProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'h1': return typographyVariants.headline.h1
      case 'h2': return typographyVariants.headline.h2
      case 'h3': return typographyVariants.headline.h3
      case 'h4': return typographyVariants.headline.h4
      case 'h5': return typographyVariants.headline.h5
      case 'h6': return typographyVariants.headline.h6
      case 'hero': return typographyVariants.display.hero
      case 'subtitle': return typographyVariants.display.subtitle
      case 'body-large': return typographyVariants.body.large
      case 'body-regular': return typographyVariants.body.regular
      case 'body-small': return typographyVariants.body.small
      case 'body-xs': return typographyVariants.body.xs
      case 'button': return typographyVariants.interactive.button
      case 'link': return typographyVariants.interactive.link
      case 'nav': return typographyVariants.interactive.nav
      case 'caption': return typographyVariants.utility.caption
      case 'label': return typographyVariants.utility.label
      case 'code': return typographyVariants.utility.code
      default: return typographyVariants.body.regular
    }
  }

  const getDefaultElement = (): keyof JSX.IntrinsicElements => {
    if (variant.startsWith('h')) return variant as keyof JSX.IntrinsicElements
    if (variant === 'hero') return 'h1'
    if (variant === 'subtitle') return 'p'
    if (variant.startsWith('body')) return 'p'
    if (variant === 'button') return 'span'
    if (variant === 'link') return 'a'
    if (variant === 'nav') return 'span'
    if (variant === 'caption') return 'span'
    if (variant === 'label') return 'label'
    if (variant === 'code') return 'code'
    return 'p'
  }

  const Component = as || getDefaultElement()

  return (
    <Component 
      className={cn(getVariantClasses(), className)} 
      {...props}
    >
      {children}
    </Component>
  )
}