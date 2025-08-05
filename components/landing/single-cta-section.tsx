"use client"

import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { CheckCircle, Clock, Shield, Star } from "lucide-react"

interface CTAConfig {
  headline: string
  description: string
  buttonText: string
  valueProposition: string
}

interface SupportingElement {
  icon: React.ReactNode
  title: string
  description: string
}

interface RiskMitigator {
  text: string
  icon: React.ReactNode
}

export function SingleCTASection() {
  const primaryCTA: CTAConfig = {
    headline: "Ready to Transform Your Business with AI?",
    description: "Join our exclusive whitelist and be among the first to experience next-generation conversational AI that actually works for your business.",
    buttonText: "Join Exclusive Whitelist",
    valueProposition: "Get priority access, beta pricing, and dedicated support"
  }

  const supportingElements: SupportingElement[] = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Implementation",
      description: "Deploy in 2-4 weeks, not months"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level security and compliance"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Proven Results",
      description: "70% efficiency gains on average"
    }
  ]

  const riskMitigators: RiskMitigator[] = [
    {
      text: "No upfront commitment required",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      text: "30-day money-back guarantee",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      text: "Free consultation and ROI analysis",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      text: "Dedicated success manager included",
      icon: <CheckCircle className="w-5 h-5" />
    }
  ]

  const urgencyMessage = "Limited spots available for our beta program. Early adopters get exclusive benefits and priority support."

  return (
    <div className="py-24 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              {primaryCTA.headline}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {primaryCTA.description}
            </p>
            <p className="text-lg text-blue-200 mb-12">
              {primaryCTA.valueProposition}
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Supporting Elements */}
        <ScrollTriggeredSection animationType="slideUp" delay={0.2}>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {supportingElements.map((element, index) => (
              <div key={index} className="group text-center p-8 bg-blue-700 rounded-xl border-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="text-blue-200 group-hover:text-white mb-6 flex justify-center group-hover:scale-110 transition-all duration-300">
                  {element.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">{element.title}</h3>
                <p className="text-blue-100 group-hover:text-blue-50 leading-relaxed transition-colors duration-300">{element.description}</p>
              </div>
            ))}
          </div>
        </ScrollTriggeredSection>

        {/* Primary CTA */}
        <ScrollTriggeredSection animationType="slideUp" delay={0.4}>
          <div className="text-center mb-12">
            <button className="bg-white text-blue-600 px-16 py-6 rounded-2xl text-2xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 border-4 border-white hover:border-blue-100">
              {primaryCTA.buttonText}
            </button>
          </div>
        </ScrollTriggeredSection>

        {/* Risk Mitigation */}
        <ScrollTriggeredSection animationType="slideUp" delay={0.6}>
          <div className="bg-blue-700 p-10 rounded-2xl mb-12 border-4 border-blue-500 shadow-2xl">
            <h3 className="text-2xl font-semibold text-center mb-8">Why Choose Us? Zero Risk, Maximum Reward</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {riskMitigators.map((mitigator, index) => (
                <div key={index} className="group flex items-center space-x-4 p-4 bg-blue-800 rounded-xl hover:bg-blue-600 transition-all duration-300 hover:scale-105">
                  <div className="text-blue-200 group-hover:text-white group-hover:scale-110 transition-all duration-300">{mitigator.icon}</div>
                  <span className="text-blue-100 group-hover:text-white font-medium transition-colors duration-300">{mitigator.text}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Urgency Reinforcement */}
        <ScrollTriggeredSection animationType="fadeIn" delay={0.8}>
          <div className="text-center">
            <div className="inline-block bg-blue-800 px-8 py-4 rounded-xl mb-8 border-2 border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-blue-100 font-semibold text-lg">{urgencyMessage}</p>
            </div>
            <div className="text-blue-200 text-sm space-y-3">
              <p className="bg-blue-700 px-6 py-2 rounded-full inline-block font-medium">Join 500+ businesses already transforming with AI</p>
              <p className="bg-blue-700 px-6 py-2 rounded-full inline-block">Questions? Email us at hello@aiagency.com or call (555) 123-4567</p>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </div>
  )
}