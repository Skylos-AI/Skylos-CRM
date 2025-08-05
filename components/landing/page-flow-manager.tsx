"use client"

import { ReactNode, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface PageFlowManagerProps {
  children: ReactNode
  enableSmoothTransitions?: boolean
  enableProgressTracking?: boolean
  onSectionChange?: (sectionId: string) => void
}

interface SectionTransition {
  id: string
  isVisible: boolean
  progress: number
}

export function PageFlowManager({
  children,
  enableSmoothTransitions = true,
  enableProgressTracking = true,
  onSectionChange
}: PageFlowManagerProps) {
  const [currentSection, setCurrentSection] = useState<string>('')
  const [sectionTransitions, setSectionTransitions] = useState<SectionTransition[]>([])
  const [pageProgress, setPageProgress] = useState(0)

  // Track scroll progress
  useEffect(() => {
    if (!enableProgressTracking) return

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1)
      setPageProgress(progress)
    }

    const handleScroll = () => {
      requestAnimationFrame(updateProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [enableProgressTracking])

  // Track section visibility
  useEffect(() => {
    if (!enableProgressTracking) return

    const sections = document.querySelectorAll('section[id]')
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const sectionId = entry.target.id
            const isVisible = entry.isIntersecting
            const progress = entry.intersectionRatio

            setSectionTransitions(prev => {
              const existing = prev.find(s => s.id === sectionId)
              if (existing) {
                return prev.map(s => 
                  s.id === sectionId 
                    ? { ...s, isVisible, progress }
                    : s
                )
              }
              return [...prev, { id: sectionId, isVisible, progress }]
            })

            // Update current section
            if (isVisible && progress > 0.5) {
              setCurrentSection(sectionId)
              onSectionChange?.(sectionId)
            }
          })
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: '-10% 0px -10% 0px'
        }
      )

      observer.observe(section)
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [enableProgressTracking, onSectionChange])

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  if (!enableSmoothTransitions) {
    return <>{children}</>
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      {/* Page progress indicator */}
      {enableProgressTracking && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-full bg-primary origin-left"
            style={{ scaleX: pageProgress }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
        </motion.div>
      )}

      {/* Section transition indicators */}
      {enableProgressTracking && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 space-y-2">
          {sectionTransitions.map((section) => (
            <motion.div
              key={section.id}
              className={cn(
                "w-2 h-8 rounded-full transition-colors duration-300",
                section.isVisible 
                  ? "bg-primary" 
                  : "bg-gray-300 dark:bg-gray-600"
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="w-full bg-primary-foreground rounded-full origin-bottom"
                style={{ 
                  height: `${section.progress * 100}%`,
                  opacity: section.isVisible ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Main content with smooth transitions */}
      <motion.div
        variants={contentVariants}
        className="relative"
      >
        {children}
      </motion.div>

      {/* Section transition overlays for smooth visual flow */}
      <AnimatePresence>
        {sectionTransitions.map((section) => (
          section.isVisible && (
            <motion.div
              key={`overlay-${section.id}`}
              className="fixed inset-0 pointer-events-none z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.02 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: `linear-gradient(180deg, 
                  transparent 0%, 
                  rgba(59, 130, 246, 0.01) 50%, 
                  transparent 100%)`
              }}
            />
          )
        ))}
      </AnimatePresence>
    </motion.div>
  )
}