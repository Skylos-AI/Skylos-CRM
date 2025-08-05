"use client"

import { ReactNode, useState, useRef, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

interface LazyLoadProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
  className?: string
  onLoad?: () => void
}

export function LazyLoad({
  children,
  fallback = <div className="animate-pulse bg-muted h-32 w-full rounded" />,
  rootMargin = '50px',
  threshold = 0.1,
  triggerOnce = true,
  className,
  onLoad,
}: LazyLoadProps) {
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  const isIntersecting = useIntersectionObserver(ref, {
    rootMargin,
    threshold,
    triggerOnce,
  })

  useEffect(() => {
    if (isIntersecting && !hasLoaded) {
      setHasLoaded(true)
      onLoad?.()
    }
  }, [isIntersecting, hasLoaded, onLoad])

  return (
    <div ref={ref} className={className}>
      {hasLoaded ? children : fallback}
    </div>
  )
}

// Specialized lazy loading components
export function LazySection({ 
  children, 
  className,
  minHeight = 'min-h-[200px]'
}: { 
  children: ReactNode
  className?: string
  minHeight?: string
}) {
  return (
    <LazyLoad
      className={`${className} ${minHeight}`}
      fallback={
        <div className={`${minHeight} flex items-center justify-center`}>
          <div className="animate-pulse bg-muted h-full w-full rounded-lg" />
        </div>
      }
    >
      {children}
    </LazyLoad>
  )
}

export function LazyImage({ 
  src, 
  alt, 
  className,
  ...props 
}: { 
  src: string
  alt: string
  className?: string
  [key: string]: any
}) {
  return (
    <LazyLoad
      fallback={
        <div className={`animate-pulse bg-muted rounded ${className}`} />
      }
    >
      <img src={src} alt={alt} className={className} {...props} />
    </LazyLoad>
  )
}