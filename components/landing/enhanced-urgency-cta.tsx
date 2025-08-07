"use client"

import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { SectionBadge } from "@/components/ui/section-badge"
import { CheckCircle, ArrowRight, Users, Calendar, Shield } from "lucide-react"

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

export function EnhancedUrgencyCTA() {
  const keyBenefits: Benefit[] = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Personalized Consultation",
      description: "Direct access to our AI implementation specialists"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Fast Implementation",
      description: "Get your solution deployed in weeks, not months"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Proven Results",
      description: "Join businesses already seeing 40%+ efficiency gains"
    }
  ]

  const whitelistBenefits = [
    "Priority access to our development team",
    "Custom solution designed for your specific needs",
    "Comprehensive training and ongoing support",
    "Transparent pricing with no hidden costs"
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-slate-900 to-black text-white relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-600 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollTriggeredSection animationType="fadeIn">
            <SectionBadge text="READY TO START?" className="bg-blue-600 text-white border-blue-400 mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transform Your Business
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                With Custom AI Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join forward-thinking businesses that are already using AI to reduce costs, 
              improve efficiency, and stay ahead of the competition.
            </p>
          </ScrollTriggeredSection>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {keyBenefits.map((benefit, index) => (
            <ScrollTriggeredSection key={index} animationType="fadeInUp" delay={index * 0.2}>
              <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-400">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            </ScrollTriggeredSection>
          ))}
        </div>

        {/* Whitelist Benefits */}
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 mb-12 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-center mb-8">
              What You Get When You Join Our Whitelist
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {whitelistBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* CTA Section */}
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:shadow-xl">
              <span className="flex items-center justify-center">
                Request Whitelist Access
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Free consultation • No commitment required • Response within 48 hours
            </p>
            <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
              <Users className="w-4 h-4 mr-2" />
              <span>Join 200+ businesses already transforming with AI</span>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </div>
  )
}