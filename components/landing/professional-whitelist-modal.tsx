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
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 border-4 border-black">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-black transition-colors bg-slate-100 hover:bg-slate-200 rounded-full p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-black via-blue-600 to-black rounded-t-2xl"></div>

        <div className="p-8 pt-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-blue-600 shadow-lg">
              <Star className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-black mb-3">
              {content.headline}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {content.subheadline}
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <div className="space-y-4">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-colors duration-300">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-black font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusivity message */}
          <div className="bg-black text-white border-4 border-blue-600 rounded-xl p-6 mb-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-blue-900 to-black opacity-50"></div>
            <p className="text-white font-bold text-lg relative z-10">
              {content.exclusivityMessage}
            </p>
            <div className="absolute top-2 right-2 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
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
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-colors"
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
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-colors"
                placeholder="Your Company"
              />
            </div>

            <button
              type="submit"
              disabled={!email || isSubmitting}
              className="w-full bg-black text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 border-4 border-blue-600 hover:border-blue-500 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{content.ctaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Privacy note */}
          <p className="text-xs text-slate-500 text-center mt-4">
            {content.privacyNote}
          </p>
        </div>
      </div>
    </div>
  )
}