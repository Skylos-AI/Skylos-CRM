'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CompetitiveMatrixProps, ComparisonFeature } from '@/lib/types/competitive-matrix'
import { InteractiveFeatureCard, InteractiveBadge } from '@/components/landing/enhanced-interactive-elements'
import { hoverEffects } from '@/lib/animations/hover-effects'

export function CompetitiveMatrix({ 
  features, 
  competitors, 
  highlightedFeatures,
  className 
}: CompetitiveMatrixProps) {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Features' },
    { id: 'cost', label: 'Cost & Pricing' },
    { id: 'security', label: 'Security' },
    { id: 'features', label: 'Features' },
    { id: 'support', label: 'Support' },
    { id: 'integration', label: 'Integrations' }
  ]

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory)

  const renderValue = (value: string | boolean, isOurs: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className={cn(
          "w-5 h-5",
          isOurs ? "text-green-600" : "text-gray-400"
        )} />
      ) : (
        <X className="w-5 h-5 text-red-400" />
      )
    }
    
    return (
      <span className={cn(
        "text-sm",
        isOurs ? "font-semibold text-gray-900" : "text-gray-600"
      )}>
        {value}
      </span>
    )
  }

  const toggleExpanded = (featureId: string) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId)
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: selectedCategory === category.id 
                  ? '0 4px 12px rgba(37, 99, 235, 0.3)' 
                  : '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              transition={{ duration: 0.2 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 font-semibold text-gray-900 min-w-[200px]">
                Feature
              </th>
              <th className="text-center p-4 font-semibold text-blue-600 bg-blue-50 min-w-[150px]">
                Our Solution
              </th>
              {competitors.map((competitor) => (
                <th 
                  key={competitor.id}
                  className="text-center p-4 font-semibold text-gray-600 min-w-[150px]"
                >
                  {competitor.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.map((feature, index) => (
              <React.Fragment key={feature.id}>
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "border-t border-gray-200 hover:bg-gray-50 transition-colors",
                    feature.isHighlight && "bg-blue-50/50"
                  )}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {feature.name}
                          {feature.isHighlight && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              Key Advantage
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {feature.description}
                        </div>
                      </div>
                      <motion.button
                        onClick={() => toggleExpanded(feature.id)}
                        className="ml-auto p-1 hover:bg-gray-200 rounded transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Info className="w-4 h-4 text-gray-400" />
                      </motion.button>
                    </div>
                  </td>
                  <td className="p-4 text-center bg-blue-50/50">
                    <div className="flex justify-center">
                      {renderValue(feature.ourSolution, true)}
                    </div>
                  </td>
                  {competitors.map((competitor) => (
                    <td key={competitor.id} className="p-4 text-center">
                      <div className="flex justify-center">
                        {renderValue(feature.competitors[competitor.id])}
                      </div>
                    </td>
                  ))}
                </motion.tr>
                <AnimatePresence>
                  {expandedFeature === feature.id && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-50"
                    >
                      <td colSpan={competitors.length + 2} className="p-4">
                        <div className="text-sm text-gray-700">
                          <strong>Detailed Comparison:</strong>
                          <div className="mt-2 space-y-2">
                            <div>
                              <span className="font-medium text-blue-600">Our Solution: </span>
                              {typeof feature.ourSolution === 'string' 
                                ? feature.ourSolution 
                                : feature.ourSolution ? 'Fully Supported' : 'Not Available'
                              }
                            </div>
                            {competitors.map((competitor) => (
                              <div key={competitor.id}>
                                <span className="font-medium">{competitor.name}: </span>
                                {typeof feature.competitors[competitor.id] === 'string'
                                  ? feature.competitors[competitor.id]
                                  : feature.competitors[competitor.id] ? 'Available' : 'Not Available'
                                }
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden",
              feature.isHighlight && "border-blue-200 bg-blue-50/30"
            )}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    {feature.name}
                    {feature.isHighlight && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Key
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                </div>
                <button
                  onClick={() => toggleExpanded(feature.id)}
                  className="p-1 hover:bg-gray-200 rounded ml-2"
                >
                  {expandedFeature === feature.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Our Solution Highlight */}
              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-900">Our Solution</span>
                  <div className="flex items-center">
                    {renderValue(feature.ourSolution, true)}
                  </div>
                </div>
              </div>

              {/* Competitors */}
              <div className="space-y-2">
                {competitors.map((competitor) => (
                  <div key={competitor.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm font-medium text-gray-700">
                      {competitor.name}
                    </span>
                    <div className="flex items-center">
                      {renderValue(feature.competitors[competitor.id])}
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {expandedFeature === feature.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="text-sm text-gray-700 space-y-2">
                      <div>
                        <span className="font-medium text-blue-600">Our Advantage: </span>
                        {typeof feature.ourSolution === 'string' 
                          ? feature.ourSolution 
                          : feature.ourSolution ? 'Fully Supported' : 'Not Available'
                        }
                      </div>
                      {competitors.map((competitor) => (
                        <div key={competitor.id}>
                          <span className="font-medium">{competitor.name}: </span>
                          {typeof feature.competitors[competitor.id] === 'string'
                            ? feature.competitors[competitor.id]
                            : feature.competitors[competitor.id] ? 'Available' : 'Limited'
                          }
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}