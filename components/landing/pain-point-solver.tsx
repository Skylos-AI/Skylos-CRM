"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollTriggeredSection } from '@/components/animations/scroll-triggered-section'
import { Industry, PainPoint, Solution } from '@/lib/types/pain-points'
import { ChevronRight, TrendingUp, Clock, CheckCircle } from 'lucide-react'

interface PainPointSolverProps {
  industries: Industry[]
  painPoints: PainPoint[]
  solutions: Solution[]
}

export function PainPointSolver({ industries, painPoints, solutions }: PainPointSolverProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(industries[0]?.id || '')
  const [selectedPainPoint, setSelectedPainPoint] = useState<string | null>(null)

  // Filter pain points by selected industry
  const filteredPainPoints = painPoints.filter(point => 
    point.industry.includes(selectedIndustry)
  )

  // Get solution for selected pain point
  const selectedSolution = selectedPainPoint 
    ? solutions.find(sol => sol.painPointId === selectedPainPoint)
    : null

  const selectedIndustryData = industries.find(ind => ind.id === selectedIndustry)

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Solving Real Business Challenges
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI agents are built around your specific pain points, not generic solutions. 
              See how we've transformed businesses across industries.
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Industry Selection */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.2}>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Select Your Industry
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {industries.map((industry) => (
                <motion.div
                  key={industry.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedIndustry === industry.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => {
                      setSelectedIndustry(industry.id)
                      setSelectedPainPoint(null)
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{industry.icon}</div>
                      <h4 className="font-semibold text-sm">{industry.name}</h4>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Industry Overview */}
        {selectedIndustryData && (
          <ScrollTriggeredSection animationType="fadeInUp" delay={0.3}>
            <Card className="mb-12 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="text-6xl">{selectedIndustryData.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{selectedIndustryData.name}</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {selectedIndustryData.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedIndustryData.commonPainPoints.map((point, index) => (
                        <Badge key={index} variant="secondary">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollTriggeredSection>
        )}

        {/* Pain Points Grid */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.4}>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">
              Common Pain Points in {selectedIndustryData?.name}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPainPoints.map((painPoint) => (
                <motion.div
                  key={painPoint.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 h-full ${
                      selectedPainPoint === painPoint.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedPainPoint(
                      selectedPainPoint === painPoint.id ? null : painPoint.id
                    )}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{painPoint.title}</CardTitle>
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            variant={
                              painPoint.impact === 'high' ? 'destructive' : 
                              painPoint.impact === 'medium' ? 'default' : 'secondary'
                            }
                          >
                            {painPoint.impact} impact
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <TrendingUp className="w-4 h-4" />
                            {painPoint.frequency}% affected
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {painPoint.description}
                      </CardDescription>
                      <div className="mt-4 flex items-center text-primary">
                        <span className="text-sm font-medium">See Solution</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Solution Details */}
        <AnimatePresence mode="wait">
          {selectedSolution && (
            <motion.div
              key={selectedSolution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-green-700 dark:text-green-400">
                        AI Solution
                      </CardTitle>
                      <CardDescription className="text-lg mt-2">
                        How we solve this challenge
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {selectedSolution.timeToValue} to deploy
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Approach */}
                  <div>
                    <h4 className="font-semibold mb-2">Our Approach</h4>
                    <p className="text-muted-foreground">{selectedSolution.approach}</p>
                  </div>

                  {/* Outcome */}
                  <div>
                    <h4 className="font-semibold mb-2">Expected Outcome</h4>
                    <p className="text-green-700 dark:text-green-400 font-medium">
                      {selectedSolution.outcome}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedSolution.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Case Study Preview */}
                  {selectedSolution.caseStudy && (
                    <div className="border-t pt-6">
                      <h4 className="font-semibold mb-3">Success Story</h4>
                      <div className="bg-background/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{selectedSolution.caseStudy.company}</span>
                          <Badge variant="outline">{selectedSolution.caseStudy.industry}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {selectedSolution.caseStudy.challenge}
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          {selectedSolution.caseStudy.metrics.map((metric, index) => (
                            <div key={index} className="text-center">
                              <div className="font-bold text-lg text-primary">
                                {metric.value}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {metric.label}
                              </div>
                              <div className="text-xs text-green-600">
                                {metric.improvement}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button size="lg">
                      Get Started with This Solution
                    </Button>
                    <Button variant="outline" size="lg">
                      View Full Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <ScrollTriggeredSection animationType="fadeIn" delay={0.6}>
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Solve Your Business Challenges?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our discovery process identifies your specific pain points and creates 
              custom AI agents tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Start Your Discovery Process
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </section>
  )
}