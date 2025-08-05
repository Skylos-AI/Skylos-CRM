"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Clock, 
  TrendingDown, 
  Star, 
  TrendingUp, 
  Zap, 
  Users,
  BarChart3,
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"
import { successMetrics, industryAdoption, type SuccessMetric } from "@/lib/mock-data/testimonials"
import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"

interface SuccessMetricsDisplayProps {
  className?: string
}

// Animated counter component
function AnimatedCounter({ 
  value, 
  duration = 2000,
  suffix = "",
  prefix = "" 
}: { 
  value: string
  duration?: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Extract numeric value from string
  const numericValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0
  const isPercentage = value.includes('%')
  const hasDecimal = value.includes('.')

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = numericValue * easeOut
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isVisible, numericValue, duration])

  const formatValue = (num: number) => {
    if (hasDecimal) {
      return num.toFixed(1)
    }
    return Math.round(num).toString()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true }}
      className="font-bold text-3xl md:text-4xl text-primary"
    >
      {prefix}{formatValue(count)}{isPercentage ? '%' : suffix}
    </motion.div>
  )
}

// Icon mapping for metrics
const iconMap = {
  clock: Clock,
  'trending-down': TrendingDown,
  star: Star,
  'trending-up': TrendingUp,
  zap: Zap,
  users: Users,
  'bar-chart': BarChart3,
  target: Target
}

export function SuccessMetricsDisplay({ className }: SuccessMetricsDisplayProps) {
  return (
    <ScrollTriggeredSection className={cn("space-y-16", className)}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Proven Results Across Industries
        </h2>
        <p className="text-xl text-muted-foreground">
          Our conversational AI solutions deliver measurable impact for businesses of all sizes
        </p>
      </div>

      {/* Main metrics grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
        {successMetrics.map((metric, index) => {
          const Icon = iconMap[metric.icon as keyof typeof iconMap] || Target
          
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group hover:scale-105"
            >
              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>

              {/* Value */}
              <AnimatedCounter value={metric.value} />

              {/* Label */}
              <h3 className="font-semibold text-foreground mt-2 mb-2">
                {metric.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {metric.description}
              </p>

              {/* Category badge */}
              <div className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-medium mt-3",
                metric.category === 'efficiency' && "bg-blue-100 text-blue-700",
                metric.category === 'cost' && "bg-green-100 text-green-700",
                metric.category === 'satisfaction' && "bg-yellow-100 text-yellow-700",
                metric.category === 'growth' && "bg-purple-100 text-purple-700"
              )}>
                {metric.category}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Industry adoption section */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Industry Adoption Trends
          </h3>
          <p className="text-lg text-muted-foreground">
            See how different industries are embracing conversational AI
          </p>
        </div>

        <div className="space-y-6">
          {industryAdoption.map((industry, index) => (
            <motion.div
              key={industry.industry}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-foreground text-lg">
                    {industry.industry}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {industry.companies.toLocaleString()} companies
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {industry.adoptionRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    adoption rate
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${industry.adoptionRate}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                  />
                </div>
              </div>

              {/* ROI */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Average ROI
                </span>
                <span className="font-semibold text-green-600">
                  {industry.avgROI}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Ready to Join These Success Stories?
        </h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Don't let your competitors get ahead. Start your AI transformation today and see similar results in weeks, not months.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Your Transformation
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200"
          >
            View More Case Studies
          </motion.button>
        </div>
      </div>
    </ScrollTriggeredSection>
  )
}