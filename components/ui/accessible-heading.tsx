"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface AccessibleHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  id?: string
  visualLevel?: 1 | 2 | 3 | 4 | 5 | 6
}

export function AccessibleHeading({
  level,
  children,
  className,
  id,
  visualLevel,
}: AccessibleHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  const displayLevel = visualLevel || level

  // Visual styles based on heading level
  const getHeadingStyles = (level: number) => {
    switch (level) {
      case 1:
        return 'text-4xl md:text-5xl font-bold'
      case 2:
        return 'text-3xl md:text-4xl font-bold'
      case 3:
        return 'text-2xl md:text-3xl font-semibold'
      case 4:
        return 'text-xl md:text-2xl font-semibold'
      case 5:
        return 'text-lg md:text-xl font-medium'
      case 6:
        return 'text-base md:text-lg font-medium'
      default:
        return 'text-base font-medium'
    }
  }

  return (
    <Tag
      id={id}
      className={cn(
        getHeadingStyles(displayLevel),
        'scroll-mt-20', // Account for fixed headers
        className
      )}
    >
      {children}
    </Tag>
  )
}