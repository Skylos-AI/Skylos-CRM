"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { testimonials, type Testimonial } from "@/lib/mock-data/testimonials"
import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"

interface TestimonialsCarouselProps {
  className?: string
  autoPlay?: boolean
  interval?: number
}

export function TestimonialsCarousel({ 
  className, 
  autoPlay = true, 
  interval = 5000 
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const featuredTestimonials = testimonials.filter(t => t.featured)

  useEffect(() => {
    if (!autoPlay || isHovered) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTestimonials.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, isHovered, featuredTestimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? featuredTestimonials.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTestimonials.length)
  }

  const currentTestimonial = featuredTestimonials[currentIndex]

  return (
    <ScrollTriggeredSection className={cn("relative", className)}>
      <div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />

        {/* Main testimonial content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Rating stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < currentTestimonial.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>

            {/* Testimonial text */}
            <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Author info and metrics */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-lg">
                  {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-muted-foreground">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              {currentTestimonial.metrics && (
                <div className="bg-white/50 rounded-lg p-4 border border-primary/10">
                  <div className="text-sm text-muted-foreground mb-1">
                    {currentTestimonial.metrics.category}
                  </div>
                  <div className="font-semibold text-primary">
                    {currentTestimonial.metrics.improvement}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    in {currentTestimonial.metrics.timeframe}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2",
            "w-10 h-10 rounded-full bg-white/80 hover:bg-white",
            "flex items-center justify-center",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-200",
            "hover:scale-110 active:scale-95",
            "focus:outline-none focus:ring-2 focus:ring-primary/50"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>

        <button
          onClick={goToNext}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2",
            "w-10 h-10 rounded-full bg-white/80 hover:bg-white",
            "flex items-center justify-center",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-200",
            "hover:scale-110 active:scale-95",
            "focus:outline-none focus:ring-2 focus:ring-primary/50"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {featuredTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                index === currentIndex
                  ? "bg-primary scale-110"
                  : "bg-primary/30 hover:bg-primary/50"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </ScrollTriggeredSection>
  )
}

// Compact testimonial card for grid layouts
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl border border-gray-100"
    >
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < testimonial.rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            )}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-4 line-clamp-3">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-medium text-gray-900 text-sm">
            {testimonial.name}
          </div>
          <div className="text-gray-500 text-xs">
            {testimonial.role}
          </div>
        </div>
      </div>

      {/* Metrics badge */}
      {testimonial.metrics && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-1">
            {testimonial.metrics.category}
          </div>
          <div className="text-sm font-semibold text-primary">
            {testimonial.metrics.improvement}
          </div>
        </div>
      )}
    </motion.div>
  )
}