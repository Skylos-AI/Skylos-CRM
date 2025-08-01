"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 500,
  className,
  direction = 'up'
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(20px)'
        case 'down': return 'translateY(-20px)'
        case 'left': return 'translateX(20px)'
        case 'right': return 'translateX(-20px)'
        default: return 'none'
      }
    }
    return 'none'
  }

  return (
    <div
      className={cn("transition-all ease-out", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}