"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { TestimonialsCarousel } from "./testimonials-carousel"
import { CaseStudiesShowcase } from "./case-studies-showcase"
import { SuccessMetricsDisplay } from "./success-metrics-display"

interface SocialProofSectionProps {
  className?: string
}

export function SocialProofSection({ className }: SocialProofSectionProps) {
  return (
    <section 
      className={cn("py-20 bg-gradient-to-b from-white to-gray-50", className)}
      data-testid="social-proof-section"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <ScrollTriggeredSection>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Trusted by Industry Leaders
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join hundreds of companies that have transformed their operations with our conversational AI solutions. 
                See real results from real businesses across every industry.
              </p>
            </motion.div>
          </div>
        </ScrollTriggeredSection>

        {/* Success metrics overview */}
        <SuccessMetricsDisplay className="mb-20" />

        {/* Featured testimonials carousel */}
        <div className="mb-20">
          <ScrollTriggeredSection>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Our Clients Say
              </h3>
              <p className="text-lg text-muted-foreground">
                Hear directly from the leaders who've experienced the transformation
              </p>
            </div>
          </ScrollTriggeredSection>
          
          <TestimonialsCarousel />
        </div>

        {/* Case studies showcase */}
        <CaseStudiesShowcase className="mb-20" />

        {/* Trust indicators */}
        <ScrollTriggeredSection>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Companies Choose Us
              </h3>
              <p className="text-lg text-muted-foreground">
                The numbers speak for themselves
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  stat: "500+",
                  label: "Successful Deployments",
                  description: "Across 50+ industries"
                },
                {
                  stat: "98%",
                  label: "Client Satisfaction",
                  description: "Based on post-deployment surveys"
                },
                {
                  stat: "2 weeks",
                  label: "Average Implementation",
                  description: "From start to full deployment"
                },
                {
                  stat: "24/7",
                  label: "Support & Monitoring",
                  description: "Continuous optimization"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {item.stat}
                  </div>
                  <div className="font-semibold text-foreground mb-2">
                    {item.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Social proof badges */}
        <ScrollTriggeredSection>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-8">
              Trusted by companies of all sizes
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[
                "TechFlow Solutions",
                "GrowthLab Inc",
                "CloudScale Systems",
                "RetailMax",
                "ServicePro",
                "InnovateTech"
              ].map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Final CTA */}
        <ScrollTriggeredSection>
          <div className="mt-20 text-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Success Story Starts Here
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't just take our word for it. Join the growing number of businesses that have transformed their operations with conversational AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Your Free Consultation
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200"
              >
                Download Case Studies
              </motion.button>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </section>
  )
}