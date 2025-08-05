/**
 * Floating Navigation Component
 * 
 * Provides sticky navigation for easy section access, smooth scrolling between sections,
 * progress indicators for page completion, and exit-intent detection with retention messaging.
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Home, 
  Target, 
  Lightbulb, 
  Settings, 
  Trophy, 
  Users, 
  MessageSquare,
  ArrowUp,
  X,
  ChevronRight,
  Menu,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { EnhancedCTAButton } from '@/components/landing/enhanced-interactive-elements'

interface NavigationSection {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  color?: string
}

interface FloatingNavigationProps {
  sections: NavigationSection[]
  className?: string
  position?: 'left' | 'right'
  showProgress?: boolean
  showScrollToTop?: boolean
  exitIntentEnabled?: boolean
  onExitIntent?: () => void
}

const defaultSections: NavigationSection[] = [
  {
    id: 'hero',
    label: 'Home',
    icon: <Home className="w-4 h-4" />,
    href: '#hero',
    color: 'blue'
  },
  {
    id: 'problem',
    label: 'Problem',
    icon: <Target className="w-4 h-4" />,
    href: '#problem',
    color: 'red'
  },
  {
    id: 'solution',
    label: 'Solution',
    icon: <Lightbulb className="w-4 h-4" />,
    href: '#solution',
    color: 'yellow'
  },
  {
    id: 'process',
    label: 'Process',
    icon: <Settings className="w-4 h-4" />,
    href: '#process',
    color: 'green'
  },
  {
    id: 'competitive',
    label: 'Advantages',
    icon: <Trophy className="w-4 h-4" />,
    href: '#competitive',
    color: 'purple'
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    icon: <Users className="w-4 h-4" />,
    href: '#testimonials',
    color: 'pink'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: <MessageSquare className="w-4 h-4" />,
    href: '#contact',
    color: 'indigo'
  }
]

export function FloatingNavigation({
  sections = defaultSections,
  className,
  position = 'right',
  showProgress = true,
  showScrollToTop = true,
  exitIntentEnabled = true,
  onExitIntent
}: FloatingNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const exitIntentTriggered = useRef(false)

  const { scrollY } = useScroll()
  const progressWidth = useTransform(scrollY, [0, 1000], [0, 100])

  // Show/hide navigation based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Show navigation after scrolling 100px
      setIsVisible(scrolled > 100)

      // Calculate scroll progress
      const progress = (scrolled / (documentHeight - windowHeight)) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))

      // Update active section based on scroll position
      const sectionElements = sections.map(section => 
        document.querySelector(section.href)
      ).filter(Boolean)

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i] as HTMLElement
        if (element && element.offsetTop <= scrolled + 200) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  // Exit intent detection
  useEffect(() => {
    if (!exitIntentEnabled) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered.current) {
        exitIntentTriggered.current = true
        setShowExitIntent(true)
        onExitIntent?.()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [exitIntentEnabled, onExitIntent])

  const handleSectionClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsExpanded(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const positionClasses = {
    left: 'left-6',
    right: 'right-6'
  }

  return (
    <>
      {/* Main Floating Navigation */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={cn(
              'fixed top-1/2 -translate-y-1/2 z-50',
              positionClasses[position],
              className
            )}
            initial={{ opacity: 0, x: position === 'right' ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position === 'right' ? 100 : -100 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Progress Indicator */}
            {showProgress && (
              <motion.div
                className="absolute -left-1 top-0 w-1 bg-gray-200 rounded-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-full bg-primary rounded-full origin-top"
                  style={{ 
                    height: `${scrollProgress}%`,
                    transition: 'height 0.1s ease-out'
                  }}
                />
              </motion.div>
            )}

            {/* Navigation Container */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              {/* Toggle Button */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              </motion.button>

              {/* Navigation Items */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="border-t border-gray-100"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {sections.map((section, index) => (
                      <motion.button
                        key={section.id}
                        onClick={() => handleSectionClick(section.href)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-primary/5',
                          activeSection === section.id 
                            ? 'text-primary bg-primary/10 border-r-2 border-primary' 
                            : 'text-gray-600 hover:text-primary'
                        )}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        <span className={cn(
                          'transition-colors',
                          activeSection === section.id ? 'text-primary' : 'text-gray-400'
                        )}>
                          {section.icon}
                        </span>
                        <span className="whitespace-nowrap">{section.label}</span>
                        {activeSection === section.id && (
                          <motion.div
                            className="ml-auto"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          >
                            <ChevronRight className="w-3 h-3 text-primary" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && isVisible && scrollProgress > 20 && (
          <motion.button
            onClick={scrollToTop}
            className={cn(
              'fixed bottom-6 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow',
              positionClasses[position]
            )}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp className="w-5 h-5 mx-auto" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageSquare className="w-8 h-8 text-primary" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Wait! Don't Miss Out
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Get a free consultation and see how AI can transform your business. 
                  Our experts are ready to help you get started today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <EnhancedCTAButton
                    variant="primary"
                    size="md"
                    className="flex-1"
                    icon={<ExternalLink className="w-4 h-4" />}
                    iconPosition="right"
                    glowEffect={true}
                  >
                    Get Free Consultation
                  </EnhancedCTAButton>
                  
                  <button
                    onClick={() => setShowExitIntent(false)}
                    className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Compact version for mobile
export function CompactFloatingNavigation({
  sections = defaultSections,
  className
}: Omit<FloatingNavigationProps, 'position' | 'showProgress'>) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      setIsVisible(scrolled > 100)

      // Update active section
      const sectionElements = sections.map(section => 
        document.querySelector(section.href)
      ).filter(Boolean)

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i] as HTMLElement
        if (element && element.offsetTop <= scrolled + 200) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const handleSectionClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
            className
          )}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full shadow-lg px-2 py-2">
            <div className="flex items-center gap-1">
              {sections.slice(0, 5).map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionClick(section.href)}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200',
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-gray-600 hover:text-primary hover:bg-primary/10'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {section.icon}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Section progress indicator
export function SectionProgressIndicator({
  sections = defaultSections,
  className
}: {
  sections?: NavigationSection[]
  className?: string
}) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Calculate overall progress
      const overallProgress = (scrolled / (documentHeight - windowHeight)) * 100
      setProgress(Math.min(100, Math.max(0, overallProgress)))

      // Update active section
      const sectionElements = sections.map(section => 
        document.querySelector(section.href)
      ).filter(Boolean)

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i] as HTMLElement
        if (element && element.offsetTop <= scrolled + 200) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div className={cn('fixed top-0 left-0 right-0 z-50', className)}>
      <div className="h-1 bg-gray-200">
        <motion.div
          className="h-full bg-primary origin-left"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}