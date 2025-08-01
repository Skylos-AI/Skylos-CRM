"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/design-system"

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
  separator?: string
}

export function AnimatedCounter({ 
  value, 
  duration = 1000,
  delay = 0,
  prefix = "", 
  suffix = "",
  className,
  decimals = 0,
  separator = ","
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    let startTime: number
    let animationFrame: number
    let timeoutId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Enhanced easing function for smoother animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = easeOutCubic * value
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    const startAnimation = () => {
      setIsAnimating(true)
      setCount(0)
      animationFrame = requestAnimationFrame(animate)
    }

    if (delay > 0) {
      timeoutId = window.setTimeout(startAnimation, delay)
    } else {
      startAnimation()
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [value, duration, delay])

  const formatNumber = (num: number) => {
    const rounded = decimals > 0 ? num.toFixed(decimals) : Math.floor(num)
    return Number(rounded).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }

  return (
    <span 
      className={cn(
        "tabular-nums transition-all duration-150 ease-in-out",
        isAnimating && "text-primary-600",
        className
      )}
      aria-live="polite"
      aria-label={`${prefix}${formatNumber(value)}${suffix}`}
    >
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}