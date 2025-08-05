"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowUp, Star, Zap } from "lucide-react"

interface FinalPolishProps {
  children: React.ReactNode
}

export function FinalPolish({ children }: FinalPolishProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track mouse position for subtle parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative">
      {/* Subtle background gradient that follows mouse */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, rgba(59, 130, 246, 0.02), transparent 50%)`
        }}
        animate={{
          opacity: isHovering ? 1 : 0.5
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main content */}
      <div 
        className="relative z-10"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {children}
      </div>

      {/* Floating elements for visual interest */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
        {/* Animated sparkles */}
        <motion.div
          className="absolute top-1/4 left-1/4"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star className="w-4 h-4 text-primary/20" />
        </motion.div>

        <motion.div
          className="absolute top-3/4 right-1/3"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Zap className="w-3 h-3 text-accent/15" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-1/4"
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
            rotate: [0, 90, 180],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          <Star className="w-2 h-2 text-secondary/25" />
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className={cn(
              "fixed bottom-8 right-8 z-50",
              "w-12 h-12 rounded-full",
              "bg-primary text-primary-foreground",
              "shadow-lg hover:shadow-xl",
              "transition-all duration-200",
              "hover:scale-110 active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
            )}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 mx-auto" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Subtle page transition overlay */}
      <motion.div
        className="fixed inset-0 bg-white pointer-events-none z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  )
}

// Enhanced hover effects for interactive elements
export function EnhancedHoverEffect({ 
  children, 
  className,
  intensity = 'medium' 
}: { 
  children: React.ReactNode
  className?: string
  intensity?: 'subtle' | 'medium' | 'strong'
}) {
  const intensityConfig = {
    subtle: {
      scale: 1.02,
      y: -2,
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
    },
    medium: {
      scale: 1.05,
      y: -4,
      shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
    },
    strong: {
      scale: 1.08,
      y: -6,
      shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
    }
  }

  const config = intensityConfig[intensity]

  return (
    <motion.div
      className={cn("cursor-pointer", className)}
      whileHover={{
        scale: config.scale,
        y: config.y,
        boxShadow: config.shadow,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{
        scale: config.scale * 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.div>
  )
}

// Smooth section reveal animation
export function SectionReveal({ 
  children, 
  delay = 0,
  direction = 'up' 
}: { 
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const directionConfig = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  }

  const initial = {
    opacity: 0,
    ...directionConfig[direction]
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6,
          delay,
          ease: "easeOut"
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  )
}