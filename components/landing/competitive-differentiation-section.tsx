'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ScrollTriggeredSection } from '@/components/animations/scroll-triggered-section'
import { CompetitiveMatrix } from './competitive-matrix'
import { 
  comparisonFeatures, 
  competitors, 
  highlightedFeatures,
  costComparison,
  securityFeatures,
  toolIntegrations
} from '@/lib/mock-data/competitive-matrix'
import { TrendingUp, Shield, Zap, DollarSign } from 'lucide-react'

export function CompetitiveDifferentiationSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <TrendingUp className="w-4 h-4" />
              Competitive Analysis
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Why Choose Our AI Solutions?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              See how our custom conversational AI solutions stack up against the competition. 
              We deliver superior value with lower costs, better security, and faster implementation.
            </motion.p>
          </div>
        </ScrollTriggeredSection>

        {/* Key Advantages Overview */}
        <ScrollTriggeredSection animationType="slideUp" className="mb-16">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                70% Lower Costs
              </h3>
              <p className="text-gray-600">
                Significantly lower setup and maintenance costs compared to enterprise alternatives
              </p>
              <div className="mt-4 text-sm text-green-600 font-medium">
                Setup: $3,750 vs $25,000+ average
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Enterprise Security
              </h3>
              <p className="text-gray-600">
                On-premise deployment, HIPAA compliance, and military-grade encryption
              </p>
              <div className="mt-4 text-sm text-blue-600 font-medium">
                GDPR, HIPAA, SOC2, ISO 27001
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Rapid Deployment
              </h3>
              <p className="text-gray-600">
                Get your AI solution running in 1-2 weeks instead of months
              </p>
              <div className="mt-4 text-sm text-purple-600 font-medium">
                1-2 weeks vs 8-16 weeks average
              </div>
            </motion.div>
          </div>
        </ScrollTriggeredSection>

        {/* Detailed Comparison Matrix */}
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Detailed Feature Comparison
              </h3>
              <p className="text-gray-600">
                Compare our solution across all key dimensions that matter for your business.
              </p>
            </div>

            <CompetitiveMatrix
              features={comparisonFeatures}
              competitors={competitors}
              highlightedFeatures={highlightedFeatures}
            />
          </div>
        </ScrollTriggeredSection>

        {/* Cost Breakdown */}
        <ScrollTriggeredSection animationType="slideUp" className="mt-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Total Cost of Ownership Comparison
              </h3>
              <p className="text-gray-600">
                See the real cost difference over 12 months
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  ${costComparison.setup['our-solution'].toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mb-1">Our Setup Cost</div>
                <div className="text-xs text-green-600">
                  vs ${costComparison.setup['chatgpt-enterprise'].toLocaleString()} avg
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  ${costComparison.monthly['our-solution'].toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mb-1">Monthly Cost</div>
                <div className="text-xs text-blue-600">
                  vs ${costComparison.monthly['chatgpt-enterprise'].toLocaleString()} avg
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  ${((costComparison.setup['our-solution'] + (costComparison.monthly['our-solution'] * 12))).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mb-1">12-Month Total</div>
                <div className="text-xs text-purple-600">Our Solution</div>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  ${((costComparison.setup['chatgpt-enterprise'] + (costComparison.monthly['chatgpt-enterprise'] * 12))).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mb-1">12-Month Total</div>
                <div className="text-xs text-red-600">Enterprise Average</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">
                  Save ${((costComparison.setup['chatgpt-enterprise'] + (costComparison.monthly['chatgpt-enterprise'] * 12)) - (costComparison.setup['our-solution'] + (costComparison.monthly['our-solution'] * 12))).toLocaleString()} in the first year
                </span>
              </div>
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Security & Compliance Highlights */}
        <ScrollTriggeredSection animationType="slideUp" className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Security & Compliance Advantages
              </h3>
              <p className="text-gray-600">
                Enterprise-grade security that competitors can&apos;t match
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                  <div className="text-sm">
                    <div className="font-medium text-blue-600 mb-1">Our Implementation:</div>
                    <div className="text-gray-700 mb-3">{feature.ourImplementation}</div>
                    <div className="flex flex-wrap gap-1">
                      {feature.compliance.map((cert) => (
                        <span
                          key={cert}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Integration Capabilities */}
        <ScrollTriggeredSection animationType="fadeIn" className="mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Integration Capabilities
              </h3>
              <p className="text-gray-600">
                Connect with more tools and platforms than any competitor
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {toolIntegrations.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 text-center shadow-sm"
                >
                  <h4 className="font-semibold text-gray-900 mb-3">{category.category}</h4>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {category.ourSupport}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">integrations</div>
                  <div className="text-xs text-gray-500">
                    vs {Math.max(...Object.values(category.competitorSupport))} competitor max
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1 justify-center">
                    {category.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
                      >
                        {tool}
                      </span>
                    ))}
                    {category.tools.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{category.tools.length - 3} more
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Call to Action */}
        <ScrollTriggeredSection animationType="slideUp" className="mt-16">
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to See the Difference?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Get a personalized comparison for your specific use case
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Demo
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Get Custom Quote
              </button>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </section>
  )
}