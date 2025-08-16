'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SophisticatedScrollTrigger } from '@/components/animations/sophisticated-scroll-trigger';
import { SophisticatedCreativeButton, GeometricShape, SubtleBackgroundPattern } from '@/components/ui/sophisticated-interactive-elements';
import { HeroHeading, AccentText } from '@/components/ui/sophisticated-typography';
import { sophisticatedColors } from '@/lib/design-system/sophisticated-tokens';
import {
  ArrowRight,
  Calendar,
  MessageSquare,
  Zap,
  Clock,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

interface UrgencyIndicator {
  icon: React.ReactNode;
  text: string;
  highlight: string;
}

const urgencyIndicators: UrgencyIndicator[] = [
  {
    icon: <Clock className="w-5 h-5" />,
    text: "Every day without AI costs you",
    highlight: "potential customers"
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    text: "Competitors are gaining",
    highlight: "market advantage"
  },
  {
    icon: <Zap className="w-5 h-5" />,
    text: "AI implementation takes",
    highlight: "weeks, not months"
  }
];

const benefits = [
  "Custom AI solution designed for your business",
  "Implementation in 2-4 weeks, not months",
  "24/7 AI agents working for your success",
  "Measurable ROI from day one",
  "Ongoing optimization and support"
];

export function SophisticatedFinalCTA() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Handle form submission
    console.log('CTA submission:', { email, company });

    setIsSubmitting(false);
    setEmail('');
    setCompany('');
  };

  return (
    <div className="relative py-24 bg-sophisticated-black overflow-hidden">

      {/* Subtle Background Pattern */}
      <SubtleBackgroundPattern
        pattern="diagonal-lines"
        color="professionalBlue"
        opacity={0.03}
      />

      {/* Geometric Background Elements */}
      <GeometricShape
        shape="circle"
        size={200}
        color="professionalBlue"
        opacity={0.08}
        className="top-10 left-10"
        animationType="pulse"
      />
      <GeometricShape
        shape="hexagon"
        size={150}
        color="skyBlue"
        opacity={0.06}
        className="top-20 right-20"
        animationType="rotate"
      />
      <GeometricShape
        shape="diamond"
        size={100}
        color="richPurple"
        opacity={0.1}
        className="bottom-20 left-1/4"
        animationType="float"
      />
      <GeometricShape
        shape="square"
        size={120}
        color="deepPurple"
        opacity={0.05}
        className="bottom-10 right-10"
        animationType="morph"
      />

      {/* Diagonal Accent Overlays */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${sophisticatedColors.deepPurple.DEFAULT} 0%, transparent 30%, ${sophisticatedColors.professionalBlue.DEFAULT} 70%, transparent 100%)`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Urgency Indicators */}
        <SophisticatedScrollTrigger variant="fadeIn">
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {urgencyIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 text-sophisticated-white/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-sophisticated-sky-blue">
                  {indicator.icon}
                </div>
                <span className="text-sm">
                  {indicator.text} <span className="text-sophisticated-sky-blue font-medium">{indicator.highlight}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </SophisticatedScrollTrigger>

        {/* Main CTA Content */}
        <div className="text-center mb-12">
          <SophisticatedScrollTrigger variant="slideUp" staggerDelay={0.2}>
            <AccentText className="text-sophisticated-sky-blue mb-6">
              DON'T LET COMPETITORS WIN
            </AccentText>
          </SophisticatedScrollTrigger>

          <SophisticatedScrollTrigger variant="fadeIn" staggerDelay={0.4}>
            <HeroHeading className="text-sophisticated-white mb-8 max-w-4xl mx-auto">
              Get Your Custom AI Solution Before Your Competitors Do
            </HeroHeading>
          </SophisticatedScrollTrigger>

          <SophisticatedScrollTrigger variant="slideUp" staggerDelay={0.6}>
            <p className="body-large text-sophisticated-white/80 mb-12 max-w-3xl mx-auto">
              Join the exclusive group of forward-thinking businesses that are already transforming
              their operations with AI. Limited spots available for our next implementation cycle.
            </p>
          </SophisticatedScrollTrigger>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Benefits List */}
          <SophisticatedScrollTrigger variant="slideLeft">
            <div className="space-y-6">
              <h3 className="heading-subsection text-sophisticated-white mb-6">
                What You Get:
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-6 h-6 text-sophisticated-sky-blue flex-shrink-0 mt-0.5" />
                    <span className="text-sophisticated-white/90">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="mt-8 p-6 bg-sophisticated-white/5 rounded-xl border border-sophisticated-white/10">
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="w-5 h-5 text-sophisticated-sky-blue" />
                  <span className="text-sophisticated-white font-medium">Trusted by 200+ businesses</span>
                </div>
                <p className="text-sophisticated-white/70 text-sm">
                  "The fastest and most effective AI implementation we've ever experienced.
                  ROI was visible within the first week." - Sarah Chen, CEO TechFlow
                </p>
              </div>
            </div>
          </SophisticatedScrollTrigger>

          {/* CTA Form */}
          <SophisticatedScrollTrigger variant="slideRight">
            <div className="bg-sophisticated-white/10 backdrop-blur-sm rounded-2xl p-8 border border-sophisticated-white/20">
              <div className="text-center mb-6">
                <h3 className="heading-card text-sophisticated-white mb-2">
                  Secure Your Spot Now
                </h3>
                <p className="text-sophisticated-white/70 text-sm">
                  Limited availability - Next implementation cycle starts soon
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-sophisticated-white/10 border border-sophisticated-white/30 rounded-lg text-sophisticated-white placeholder-sophisticated-white/50 focus:outline-none focus:border-sophisticated-sky-blue focus:ring-2 focus:ring-sophisticated-sky-blue/20"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 bg-sophisticated-white/10 border border-sophisticated-white/30 rounded-lg text-sophisticated-white placeholder-sophisticated-white/50 focus:outline-none focus:border-sophisticated-sky-blue focus:ring-2 focus:ring-sophisticated-sky-blue/20"
                  />
                </div>

                <SophisticatedCreativeButton
                  variant="white-colored-border"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  icon={isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Zap className="w-5 h-5" /></motion.div> : <ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  {isSubmitting ? 'Securing Your Spot...' : 'Get My Custom AI Solution'}
                </SophisticatedCreativeButton>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sophisticated-white/60 text-xs mb-4">
                  No spam. Unsubscribe anytime. Your data is secure.
                </p>

                {/* Alternative CTA Options */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-sophisticated-white/30 rounded-lg text-sophisticated-white/80 hover:bg-sophisticated-white/5 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Schedule Call</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-sophisticated-white/30 rounded-lg text-sophisticated-white/80 hover:bg-sophisticated-white/5 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">Live Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </SophisticatedScrollTrigger>
        </div>

        {/* Final Urgency Message */}
        <SophisticatedScrollTrigger variant="fadeIn" staggerDelay={1.0}>
          <div className="text-center mt-16">
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 bg-sophisticated-rich-purple/20 border border-sophisticated-rich-purple/30 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(122, 40, 138, 0.3)',
                  '0 0 30px rgba(122, 40, 138, 0.5)',
                  '0 0 20px rgba(122, 40, 138, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-5 h-5 text-sophisticated-rich-purple" />
              <span className="text-sophisticated-white font-medium">
                Act now - Implementation spots filling fast
              </span>
            </motion.div>
          </div>
        </SophisticatedScrollTrigger>
      </div>
    </div>
  );
}