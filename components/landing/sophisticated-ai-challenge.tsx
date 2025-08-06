'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SophisticatedScrollTrigger, SophisticatedStaggerContainer } from '@/components/animations/sophisticated-scroll-trigger';
import { SophisticatedCard } from '@/components/animations/sophisticated-interactions';
import { SectionHeading, CreativeTextWrapper, AccentText } from '@/components/ui/sophisticated-typography';
import { sophisticatedColors } from '@/lib/design-system/sophisticated-tokens';
import { AlertTriangle, TrendingDown, Clock, Users, Brain, Zap } from 'lucide-react';

interface BusinessChallenge {
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  urgency: 'high' | 'medium' | 'critical';
}

const businessChallenges: BusinessChallenge[] = [
  {
    icon: <TrendingDown className="w-8 h-8" />,
    title: "Losing Market Share to AI-Powered Competitors",
    description: "While you're still handling customer inquiries manually, your competitors are using AI agents to respond instantly, capture more leads, and close deals faster.",
    impact: "Up to 40% revenue loss",
    urgency: 'critical'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Slow Response Times Killing Conversions",
    description: "Modern customers expect instant responses. Every minute of delay reduces your conversion rate and sends potential customers to faster competitors.",
    impact: "67% conversion drop",
    urgency: 'high'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Scaling Customer Support is Expensive",
    description: "Hiring and training human agents is costly and time-consuming. AI agents work 24/7 without breaks, sick days, or salary increases.",
    impact: "300% cost reduction",
    urgency: 'high'
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Missing AI Implementation Expertise",
    description: "You know AI is the future, but lack the technical expertise to implement it effectively. Generic solutions don't fit your specific business needs.",
    impact: "Competitive disadvantage",
    urgency: 'medium'
  }
];

const aiSolutions = [
  {
    challenge: "Manual Customer Service",
    solution: "24/7 AI Agents",
    benefit: "Instant responses, higher satisfaction"
  },
  {
    challenge: "Lead Qualification Bottleneck",
    solution: "Intelligent Lead Scoring",
    benefit: "Focus on high-value prospects"
  },
  {
    challenge: "Repetitive Task Overload",
    solution: "Process Automation",
    benefit: "Free up human talent for strategy"
  },
  {
    challenge: "Data Analysis Paralysis",
    solution: "AI-Powered Insights",
    benefit: "Make data-driven decisions faster"
  }
];

export function SophisticatedAIChallenge() {
  return (
    <div className="relative py-24 bg-sophisticated-white overflow-hidden">
      
      {/* Diagonal Background Accent */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(45deg, ${sophisticatedColors.professionalBlue.DEFAULT} 0%, transparent 30%, ${sophisticatedColors.skyBlue.DEFAULT} 70%, transparent 100%)`
        }}
      />

      {/* Abstract Visual Representations */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-10">
        <motion.div
          className="w-full h-full border-2 border-sophisticated-professional-blue rounded-lg"
          animate={{ rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="absolute bottom-32 left-10 w-24 h-24 opacity-10">
        <motion.div
          className="w-full h-full bg-sophisticated-rich-purple rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <SophisticatedScrollTrigger variant="fadeIn">
          <div className="text-center mb-16">
            <AccentText className="text-sophisticated-professional-blue mb-4">
              BUSINESS TRANSFORMATION URGENCY
            </AccentText>
            <SectionHeading className="text-sophisticated-deep-purple mb-6">
              Every Day Without AI is a Day Behind Your Competition
            </SectionHeading>
            <p className="body-large text-sophisticated-black/70 max-w-3xl mx-auto">
              While you're reading this, AI-powered businesses are capturing your market share, 
              serving customers faster, and scaling more efficiently. The question isn't whether 
              to implement AI—it's how quickly you can catch up.
            </p>
          </div>
        </SophisticatedScrollTrigger>

        {/* Asymmetrical Challenge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          
          {/* Main Challenge Card - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SophisticatedScrollTrigger variant="slideLeft">
              <SophisticatedCard className="h-full p-8 bg-gradient-to-br from-sophisticated-deep-purple/5 to-sophisticated-professional-blue/5">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 rounded-lg bg-sophisticated-professional-blue/10">
                    <AlertTriangle className="w-8 h-8 text-sophisticated-professional-blue" />
                  </div>
                  <div>
                    <h3 className="heading-card text-sophisticated-deep-purple mb-2">
                      The AI Implementation Gap is Widening
                    </h3>
                    <AccentText className="text-sophisticated-rich-purple">
                      CRITICAL BUSINESS RISK
                    </AccentText>
                  </div>
                </div>
                
                <CreativeTextWrapper wrapStyle="asymmetrical">
                  <p className="body-large text-sophisticated-black/80 mb-6">
                    Companies that implement AI solutions are experiencing 3x faster growth, 
                    50% higher customer satisfaction, and 40% cost reduction in operations. 
                    Meanwhile, businesses without AI are struggling with manual processes, 
                    slower response times, and increasing operational costs.
                  </p>
                </CreativeTextWrapper>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-sophisticated-white rounded-lg">
                    <div className="text-2xl font-bold text-sophisticated-professional-blue">3x</div>
                    <div className="text-sm text-sophisticated-black/60">Faster Growth</div>
                  </div>
                  <div className="text-center p-4 bg-sophisticated-white rounded-lg">
                    <div className="text-2xl font-bold text-sophisticated-rich-purple">50%</div>
                    <div className="text-sm text-sophisticated-black/60">Higher Satisfaction</div>
                  </div>
                </div>
              </SophisticatedCard>
            </SophisticatedScrollTrigger>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <SophisticatedScrollTrigger variant="slideRight" staggerDelay={0.2}>
              <div className="p-6 bg-sophisticated-sky-blue/10 rounded-xl">
                <div className="text-3xl font-bold text-sophisticated-professional-blue mb-2">73%</div>
                <p className="text-sm text-sophisticated-black/70">
                  of businesses report losing customers to AI-powered competitors
                </p>
              </div>
            </SophisticatedScrollTrigger>

            <SophisticatedScrollTrigger variant="slideRight" staggerDelay={0.4}>
              <div className="p-6 bg-sophisticated-rich-purple/10 rounded-xl">
                <div className="text-3xl font-bold text-sophisticated-rich-purple mb-2">2.5x</div>
                <p className="text-sm text-sophisticated-black/70">
                  faster lead qualification with AI agents
                </p>
              </div>
            </SophisticatedScrollTrigger>

            <SophisticatedScrollTrigger variant="slideRight" staggerDelay={0.6}>
              <div className="p-6 bg-sophisticated-deep-purple/10 rounded-xl">
                <div className="text-3xl font-bold text-sophisticated-deep-purple mb-2">24/7</div>
                <p className="text-sm text-sophisticated-black/70">
                  availability without additional staffing costs
                </p>
              </div>
            </SophisticatedScrollTrigger>
          </div>
        </div>

        {/* Business Challenges Grid */}
        <SophisticatedStaggerContainer staggerTiming="normal" className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessChallenges.map((challenge, index) => (
              <SophisticatedCard 
                key={index}
                className="p-6 relative overflow-hidden"
                hoverEffect="lift"
              >
                {/* Urgency Indicator */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                  challenge.urgency === 'critical' 
                    ? 'bg-red-100 text-red-700'
                    : challenge.urgency === 'high'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {challenge.urgency.toUpperCase()}
                </div>

                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 rounded-lg bg-sophisticated-professional-blue/10 text-sophisticated-professional-blue">
                    {challenge.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-card text-sophisticated-deep-purple mb-2">
                      {challenge.title}
                    </h3>
                  </div>
                </div>

                <p className="body-medium text-sophisticated-black/70 mb-4">
                  {challenge.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-sophisticated-black/10">
                  <span className="text-sm font-medium text-sophisticated-rich-purple">
                    Impact: {challenge.impact}
                  </span>
                  <Zap className="w-4 h-4 text-sophisticated-professional-blue" />
                </div>
              </SophisticatedCard>
            ))}
          </div>
        </SophisticatedStaggerContainer>

        {/* AI Solutions Comparison */}
        <SophisticatedScrollTrigger variant="fadeIn">
          <div className="bg-gradient-to-r from-sophisticated-deep-purple/5 to-sophisticated-professional-blue/5 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="heading-subsection text-sophisticated-deep-purple mb-4">
                Transform Challenges into Competitive Advantages
              </h3>
              <p className="body-large text-sophisticated-black/70">
                See how AI implementation solves your biggest business pain points
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiSolutions.map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-sophisticated-white rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">
                    <div className="text-sm text-sophisticated-black/60 mb-2">Before:</div>
                    <div className="font-medium text-sophisticated-black mb-4">
                      {item.challenge}
                    </div>
                    
                    <div className="w-8 h-0.5 bg-sophisticated-professional-blue mx-auto mb-4" />
                    
                    <div className="text-sm text-sophisticated-professional-blue mb-2">After:</div>
                    <div className="font-medium text-sophisticated-deep-purple mb-4">
                      {item.solution}
                    </div>
                  </div>
                  
                  <div className="text-xs text-sophisticated-rich-purple font-medium">
                    {item.benefit}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SophisticatedScrollTrigger>
      </div>
    </div>
  );
}