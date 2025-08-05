"use client"

import { useState } from "react"
import { X, CheckCircle, Star, ArrowRight } from "lucide-react"

interface WhitelistModalContent {
  headline: string
  subheadline: string
  benefits: string[]
  exclusivityMessage: string
  ctaText: string
  privacyNote: string
}

interface ProfessionalWhitelistModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string, company?: string) => void
}

export function ProfessionalWhitelistModal({ 
  isOpen, 
  onClose, 
  onSubmit 
}: ProfessionalWhitelistModalProps) {
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const content: WhitelistModalContent = {
    headline: "Don't Miss Your Competitive Edge",
    subheadline: "Join our exclusive whitelist for early access to custom AI solutions that are transforming businesses",
    benefits: [
      "Priority access to our next-generation AI platform",
      "Exclusive beta pricing with up to 50% savings",
      "Dedicated success manager and priority support",
      "Direct input on feature development and roadmap"
    ],
    exclusivityMessage: "Limited to 100 early adopters only",
    ctaText: "Secure My Spot",
    privacyNote: "We respect your privacy. No spam, unsubscribe anytime."
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit(email, company)
    setIsSubmitting(false)
    setEmail("")
    setCompany("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300 scale-100 border border-slate-200 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 rounded-full p-1.5"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-800"></div>

        <div className="p-6 pt-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {content.headline}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {content.subheadline}
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <div className="space-y-3">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusivity message */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-4 mb-6 text-center relative overflow-hidden">
            <p className="text-white font-semibold text-base relative z-10">
              {content.exclusivityMessage}
            </p>
            <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse opacity-75"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Business Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-slate-900"
                placeholder="your.email@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-slate-900"
                placeholder="Your Company"
              />
            </div>

            <button
              type="submit"
              disabled={!email || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-base hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{content.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Privacy note */}
          <p className="text-xs text-slate-500 text-center mt-3">
            {content.privacyNote}
          </p>
        </div>
      </div>
    </div>
  )
}