"use client"

import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { SectionBadge } from "@/components/ui/section-badge"
import { SubtleBackgroundElements } from "@/components/ui/subtle-background-elements"
import { useState } from "react"
import { CheckCircle, ArrowRight, Star } from "lucide-react"

interface SolutionOverview {
  headline: string
  keyBenefits: string[]
  differentiators: string[]
}

interface CompetitiveAdvantage {
  feature: string
  ourSolution: string
  competitors: string
  advantage: string
}

interface TestimonialSummary {
  quote: string
  author: string
  company: string
  metric: string
}

interface WhitelistCTAConfig {
  headline: string
  description: string
  benefits: string[]
  ctaText: string
}

export function UnifiedSolutionShowcase() {
  const [activeTab, setActiveTab] = useState(0)

  const solutionOverview: SolutionOverview = {
    headline: "Conversational AI: The Next Evolution in Business Automation",
    keyBenefits: [
      "24/7 intelligent customer interactions without human intervention",
      "Seamless integration with existing business processes and tools",
      "Context-aware responses that understand customer intent and history",
      "Scalable solution that grows with your business needs"
    ],
    differentiators: [
      "Custom-built for your specific business requirements",
      "Advanced conversational capabilities beyond simple chatbots",
      "Enterprise-grade security and compliance standards",
      "Competitive maintenance costs with transparent pricing"
    ]
  }

  const competitiveAdvantages: CompetitiveAdvantage[] = [
    {
      feature: "Implementation Time",
      ourSolution: "Days to weeks",
      competitors: "Months to years",
      advantage: "Get results 10x faster"
    },
    {
      feature: "Maintenance Costs",
      ourSolution: "40% lower",
      competitors: "Standard pricing",
      advantage: "Significant cost savings"
    },
    {
      feature: "Customization Level",
      ourSolution: "Fully customized",
      competitors: "Template-based",
      advantage: "Perfect fit for your business"
    },
    {
      feature: "Security & Compliance",
      ourSolution: "Enterprise-grade",
      competitors: "Basic security",
      advantage: "Bank-level protection"
    }
  ]

  const testimonials: TestimonialSummary[] = [
    {
      quote: "Our customer service efficiency improved by 70% within the first month.",
      author: "Sarah Chen",
      company: "TechFlow",
      metric: "70% efficiency gain"
    },
    {
      quote: "We reduced operational costs by 40% while improving satisfaction scores.",
      author: "Marcus Rodriguez", 
      company: "RetailPlus",
      metric: "40% cost reduction"
    },
    {
      quote: "Within 2 weeks, we had AI agents handling 80% of customer inquiries.",
      author: "Jennifer Park",
      company: "FinanceFirst",
      metric: "80% automation rate"
    }
  ]

  const whitelistCTA: WhitelistCTAConfig = {
    headline: "Join the Exclusive Beta Program",
    description: "Get early access to our next-generation conversational AI platform with exclusive benefits for early adopters.",
    benefits: [
      "Priority implementation and support",
      "Beta pricing with significant discounts",
      "Direct input on feature development",
      "Dedicated success manager"
    ],
    ctaText: "Join Exclusive Whitelist"
  }

  const tabs = [
    { label: "Solution Overview", content: "overview" },
    { label: "Competitive Advantages", content: "advantages" },
    { label: "Customer Success", content: "testimonials" }
  ]

  return (
    <div className="relative bg-white">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-50 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-slate-50 rounded-full opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative py-24">
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16 pt-8">
            <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold mb-6">
              THE SOLUTION
            </div>
            <h2 className="text-5xl font-bold text-black mb-6">
              {solutionOverview.headline}
            </h2>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              Move beyond basic automation with intelligent conversational agents that understand context, 
              learn from interactions, and deliver personalized experiences at scale.
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Tabbed Content */}
        <ScrollTriggeredSection animationType="slideUp" delay={0.2}>
          <div className="mb-16">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-100 p-1 rounded-xl border-2 border-slate-200 shadow-sm">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 0 && (
                <StaggerContainer className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Key Benefits</h3>
                    <div className="space-y-4">
                      {solutionOverview.keyBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">What Makes Us Different</h3>
                    <div className="space-y-4">
                      {solutionOverview.differentiators.map((diff, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <ArrowRight className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{diff}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerContainer>
              )}

              {activeTab === 1 && (
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-xl shadow-lg border-2 border-slate-200">
                    <thead>
                      <tr className="border-b-2 border-slate-200 bg-slate-50">
                        <th className="text-left p-6 font-semibold text-slate-800">Feature</th>
                        <th className="text-left p-6 font-semibold text-blue-600">Our Solution</th>
                        <th className="text-left p-6 font-semibold text-slate-600">Competitors</th>
                        <th className="text-left p-6 font-semibold text-slate-800">Your Advantage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitiveAdvantages.map((advantage, index) => (
                        <tr key={index} className="border-b border-slate-100 hover:bg-blue-50 transition-colors duration-300 group">
                          <td className="p-6 font-medium text-slate-800 group-hover:text-blue-800 transition-colors duration-300">{advantage.feature}</td>
                          <td className="p-6 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">{advantage.ourSolution}</td>
                          <td className="p-6 text-slate-600">{advantage.competitors}</td>
                          <td className="p-6 text-slate-800 font-medium group-hover:text-blue-800 transition-colors duration-300">{advantage.advantage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 2 && (
                <StaggerContainer className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="group bg-white p-8 rounded-xl border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-2">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-blue-600 fill-current group-hover:text-blue-700 transition-colors duration-300" />
                        ))}
                      </div>
                      <p className="text-slate-700 mb-6 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                      <div className="border-t-2 border-slate-200 pt-4">
                        <div className="font-semibold text-slate-800 group-hover:text-blue-800 transition-colors duration-300">{testimonial.author}</div>
                        <div className="text-slate-600 text-sm mb-2">{testimonial.company}</div>
                        <div className="text-blue-600 font-semibold text-sm bg-blue-50 px-3 py-1 rounded-full inline-block group-hover:bg-blue-100 transition-colors duration-300">{testimonial.metric}</div>
                      </div>
                    </div>
                  ))}
                </StaggerContainer>
              )}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Whitelist CTA */}
        <ScrollTriggeredSection animationType="slideUp" delay={0.4}>
          <div className="bg-blue-600 text-white p-10 rounded-2xl text-center border-4 border-blue-700 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-3xl font-bold mb-6">{whitelistCTA.headline}</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">{whitelistCTA.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {whitelistCTA.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 text-left group">
                  <CheckCircle className="w-6 h-6 text-blue-200 flex-shrink-0 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                  <span className="text-blue-100 group-hover:text-white transition-colors duration-300">{benefit}</span>
                </div>
              ))}
            </div>

            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-white">
              {whitelistCTA.ctaText}
            </button>
            <p className="text-blue-200 text-sm mt-4 bg-blue-700 px-4 py-2 rounded-full inline-block">Limited spots available • No commitment required</p>
          </div>
        </ScrollTriggeredSection>
      </div>
    </div>
  )
}