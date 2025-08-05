"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, TrendingUp, Clock, Users, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { caseStudies, type CaseStudy } from "@/lib/mock-data/testimonials"
import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { TestimonialCard } from "./testimonials-carousel"

interface CaseStudiesShowcaseProps {
  className?: string
}

export function CaseStudiesShowcase({ className }: CaseStudiesShowcaseProps) {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'testimonial'>('overview')

  const featuredCases = caseStudies.filter(cs => cs.featured)

  const getMetricIcon = (metric: string) => {
    if (metric.toLowerCase().includes('time')) return Clock
    if (metric.toLowerCase().includes('revenue') || metric.toLowerCase().includes('cost')) return DollarSign
    if (metric.toLowerCase().includes('rate') || metric.toLowerCase().includes('leads')) return TrendingUp
    return Users
  }

  return (
    <ScrollTriggeredSection className={cn("space-y-12", className)}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Real Results from Real Businesses
        </h2>
        <p className="text-xl text-muted-foreground">
          See how companies across industries have transformed their operations with our conversational AI solutions
        </p>
      </div>

      {/* Featured case studies grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {featuredCases.map((caseStudy, index) => (
          <motion.div
            key={caseStudy.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => setSelectedCase(caseStudy)}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-primary/20">
              {/* Company header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {caseStudy.company}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {caseStudy.industry}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {caseStudy.company.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Challenge preview */}
              <div className="mb-6">
                <h4 className="font-medium text-foreground mb-2">Challenge</h4>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {caseStudy.challenge}
                </p>
              </div>

              {/* Key results */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {caseStudy.results.slice(0, 2).map((result, idx) => {
                  const Icon = getMetricIcon(result.metric)
                  return (
                    <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                      <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="font-semibold text-primary text-lg">
                        {result.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.metric}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  View full case study
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* All case studies preview */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
          More Success Stories
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.filter(cs => !cs.featured).map((caseStudy) => (
            <motion.div
              key={caseStudy.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedCase(caseStudy)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {caseStudy.company.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">
                    {caseStudy.company}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {caseStudy.industry}
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {caseStudy.challenge}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-primary">
                  {caseStudy.results[0].improvement} improvement
                </div>
                <ArrowRight className="w-3 h-3 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case study modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {selectedCase.company.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {selectedCase.company}
                      </h2>
                      <p className="text-muted-foreground">
                        {selectedCase.industry}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4">
                  {(['overview', 'results', 'testimonial'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "px-4 py-2 rounded-lg font-medium transition-colors capitalize",
                        activeTab === tab
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          The Challenge
                        </h3>
                        <p className="text-muted-foreground">
                          {selectedCase.challenge}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          Our Solution
                        </h3>
                        <p className="text-muted-foreground">
                          {selectedCase.solution}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'results' && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-6">
                        Measurable Results
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {selectedCase.results.map((result, index) => {
                          const Icon = getMetricIcon(result.metric)
                          return (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                              <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                              <div className="text-3xl font-bold text-primary mb-2">
                                {result.value}
                              </div>
                              <div className="font-medium text-foreground mb-1">
                                {result.metric}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {result.improvement}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'testimonial' && (
                    <motion.div
                      key="testimonial"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-6">
                        What They Say
                      </h3>
                      <TestimonialCard testimonial={selectedCase.testimonial} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollTriggeredSection>
  )
}