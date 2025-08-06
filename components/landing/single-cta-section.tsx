"use client"

import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { SectionBadge } from "@/components/ui/section-badge"
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
    description: "We're accepting a limited number of businesses into our exclusive whitelist for fully customizable AI agents tailored to your specific needs.",
    buttonText: "Request Whitelist Invitation",
    valueProposition: "Limited spots available - Each solution is custom-built for real-world deployment"
  }

  const supportingElements: SupportingElement[] = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Tailored Solutions",
      description: "Custom-built agents for your specific business needs"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Production Ready",
      description: "Fully deployable solutions for real-world scenarios"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Dedicated Craftsmanship",
      description: "We put real effort into delivering proper products"
    }
  ]

  const riskMitigators: RiskMitigator[] = [
    {
      text: "Exclusive access to custom AI agent development",
      icon: <CheckCircle className="w-5 h-5 text-blue-400" />
    },
    {
      text: "Solutions designed specifically for your use case",
      icon: <CheckCircle className="w-5 h-5 text-blue-400" />
    },
    {
      text: "Real-world deployment ready from day one",
      icon: <CheckCircle className="w-5 h-5 text-blue-400" />
    },
    {
      text: "Direct collaboration with our development team",
      icon: <CheckCircle className="w-5 h-5 text-blue-400" />
    }
  ]

  const urgencyMessage = "Limited whitelist invitations available. We carefully select businesses to ensure each solution receives the attention it deserves."

  return (
    <div className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <SectionBadge text="EXCLUSIVE INVITATION" className="bg-white text-black border-2 border-blue-400" />
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              {primaryCTA.headline}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {primaryCTA.description}
            </p>
            <p className="text-lg text-gray-400 mb-12">
              {primaryCTA.valueProposition}
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Supporting Elements */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.2}>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {supportingElements.map((element, index) => (
              <div key={index} className="group text-center p-8 bg-gray-900 rounded-xl border-2 border-gray-700 hover:border-gray-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="text-gray-400 group-hover:text-white mb-6 flex justify-center group-hover:scale-110 transition-all duration-300">
                  {element.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white transition-colors duration-300">{element.title}</h3>
                <p className="text-gray-300 group-hover:text-gray-100 leading-relaxed transition-colors duration-300">{element.description}</p>
              </div>
            ))}
          </div>
        </ScrollTriggeredSection>

        {/* Primary CTA */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.4}>
          <div className="text-center mb-12">
            <button className="bg-white text-black px-16 py-6 rounded-2xl text-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 border-4 border-white hover:border-gray-200">
              {primaryCTA.buttonText}
            </button>
          </div>
        </ScrollTriggeredSection>

        {/* Risk Mitigation */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.6}>
          <div className="bg-gray-900 p-10 rounded-2xl mb-12 border-4 border-gray-700 shadow-2xl">
            <h3 className="text-2xl font-semibold text-center mb-8 text-white">Why Join Our Exclusive Whitelist?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {riskMitigators.map((mitigator, index) => (
                <div key={index} className="group flex items-center space-x-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                  <div className="text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">{mitigator.icon}</div>
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors duration-300">{mitigator.text}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Urgency Reinforcement */}
        <ScrollTriggeredSection animationType="fadeIn" delay={0.8}>
          <div className="text-center">
            <div className="inline-block bg-gray-800 px-8 py-4 rounded-xl mb-8 border-2 border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-gray-300 font-semibold text-lg">{urgencyMessage}</p>
            </div>
            <div className="text-gray-400 text-sm space-y-3">
              <p className="bg-gray-800 px-6 py-2 rounded-full inline-block font-medium border border-blue-400">Currently working with select businesses to perfect our approach</p>
              <p className="bg-gray-800 px-6 py-2 rounded-full inline-block">Questions? Email us at hello@aiagency.com or call (555) 123-4567</p>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </div>
  )
}