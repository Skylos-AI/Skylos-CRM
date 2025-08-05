/**
 * Background Elements
 * 
 * Subtle background elements and patterns for the landing page
 * with performance-optimized animations.
 */

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useParallax } from '@/lib/animations/scroll-utils'
import { cn } from '@/lib/utils'

// Floating geometric shapes
export function FloatingShapes({ className }: { className?: string }) {
  const parallaxOffset = useParallax(0.3)

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Large circle */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />

      {/* Medium circle */}
      <motion.div
        className="absolute bottom-1/3 left-1/5 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      />

      {/* Small accent shapes */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-4 h-4 bg-primary/20 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/3 w-6 h-6 bg-accent/15 rounded-full"
        animate={{
          y: [0, -10, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </div>
  )
}

// Gradient mesh background
export function GradientMesh({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-accent/8 to-transparent opacity-40" />
    </div>
  )
}

// Dot pattern background
export function DotPattern({ 
  className,
  size = 24,
  opacity = 0.3 
}: { 
  className?: string
  size?: number
  opacity?: number
}) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(var(--foreground), ${opacity}) 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
        }}
      />
    </div>
  )
}

// Grid pattern background
export function GridPattern({ 
  className,
  size = 32,
  opacity = 0.2 
}: { 
  className?: string
  size?: number
  opacity?: number
}) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--border), ${opacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--border), ${opacity}) 1px, transparent 1px)
          `,
          backgroundSize: `${size}px ${size}px`,
        }}
      />
    </div>
  )
}

// Animated lines background
export function AnimatedLines({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Horizontal lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scaleX: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scaleX: [1.2, 0.8, 1.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Vertical lines */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scaleY: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent"
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scaleY: [1, 0.7, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />
    </div>
  )
}

// Particle system background
export function ParticleField({ className }: { className?: string }) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }))

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-primary/10 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// Noise texture overlay
export function NoiseTexture({ 
  className,
  opacity = 0.03 
}: { 
  className?: string
  opacity?: number
}) {
  return (
    <div 
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='${opacity}'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

// Composite background with multiple elements
export function CompositeBackground({ 
  className,
  elements = ['gradient', 'shapes', 'lines']
}: { 
  className?: string
  elements?: ('gradient' | 'shapes' | 'lines' | 'dots' | 'grid' | 'particles' | 'noise')[]
}) {
  return (
    <div className={cn('absolute inset-0', className)}>
      {elements.includes('gradient') && <GradientMesh />}
      {elements.includes('shapes') && <FloatingShapes />}
      {elements.includes('lines') && <AnimatedLines />}
      {elements.includes('dots') && <DotPattern />}
      {elements.includes('grid') && <GridPattern />}
      {elements.includes('particles') && <ParticleField />}
      {elements.includes('noise') && <NoiseTexture />}
    </div>
  )
}

// Minimalist background for clean designs
export function MinimalistBackground({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0', className)}>
      <GradientMesh />
      <div className="absolute top-1/4 left-0 w-px h-32 bg-gradient-to-b from-transparent via-border to-transparent opacity-50" />
      <div className="absolute bottom-1/4 right-0 w-px h-32 bg-gradient-to-b from-transparent via-border to-transparent opacity-50" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/20 rounded-full" />
    </div>
  )
}