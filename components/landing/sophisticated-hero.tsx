'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SophisticatedScrollTrigger, FloatingGeometricShape } from '@/components/animations/sophisticated-scroll-trigger';
import { SophisticatedButton } from '@/components/animations/sophisticated-interactions';
import { HeroHeading, CreativeLineBreak, AccentText } from '@/components/ui/sophisticated-typography';
import { sophisticatedColors } from '@/lib/design-system/sophisticated-tokens';

interface SophisticatedHeroProps {
  titlePosition?: 'left' | 'right';
  headline: string;
  subheadline: string;
  ctaButtons: Array<{
    text: string;
    variant: 'primary' | 'secondary' | 'accent';
    href: string;
    onClick?: () => void;
  }>;
  badge?: {
    text: string;
    variant: 'accent' | 'professional';
  };
}

export function SophisticatedHero({
  titlePosition = 'left',
  headline,
  subheadline,
  ctaButtons,
  badge,
}: SophisticatedHeroProps) {
  // Split headline into creative line breaks
  const headlineLines = headline.split(' ').reduce((acc, word, index, array) => {
    if (index === 0) {
      acc.push(word);
    } else if (index < array.length / 2) {
      acc[0] += ` ${word}`;
    } else if (acc.length === 1) {
      acc.push(word);
    } else {
      acc[1] += ` ${word}`;
    }
    return acc;
  }, [] as string[]);

  return (
    <div className="relative min-h-screen bg-sophisticated-black overflow-hidden">
      {/* Floating Geometric Shapes */}
      <FloatingGeometricShape
        shape="circle"
        size={120}
        color={sophisticatedColors.professionalBlue.opacity[20]}
        className="top-20 left-20"
        floatIntensity="subtle"
      />
      <FloatingGeometricShape
        shape="square"
        size={80}
        color={sophisticatedColors.skyBlue.opacity[15]}
        className="top-40 right-32"
        floatIntensity="normal"
      />
      <FloatingGeometricShape
        shape="circle"
        size={60}
        color={sophisticatedColors.richPurple.opacity[10]}
        className="bottom-32 left-1/4"
        floatIntensity="dramatic"
      />
      <FloatingGeometricShape
        shape="square"
        size={100}
        color={sophisticatedColors.deepPurple.opacity[10]}
        className="bottom-20 right-20"
        floatIntensity="subtle"
      />

      {/* Diagonal Accent Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${sophisticatedColors.deepPurple.DEFAULT} 0%, transparent 50%, ${sophisticatedColors.professionalBlue.DEFAULT} 100%)`
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 h-screen flex items-center">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full ${
          titlePosition === 'right' ? 'lg:grid-flow-col-dense' : ''
        }`}>
          
          {/* Text Content */}
          <div className={`space-y-8 ${titlePosition === 'right' ? 'lg:col-start-2' : ''}`}>
            
            {/* Badge */}
            {badge && (
              <SophisticatedScrollTrigger variant="fadeIn" staggerDelay={0.2}>
                <AccentText className={`inline-block px-4 py-2 rounded-full border ${
                  badge.variant === 'accent' 
                    ? 'border-sophisticated-rich-purple text-sophisticated-rich-purple bg-sophisticated-rich-purple/10'
                    : 'border-sophisticated-professional-blue text-sophisticated-professional-blue bg-sophisticated-professional-blue/10'
                }`}>
                  {badge.text}
                </AccentText>
              </SophisticatedScrollTrigger>
            )}

            {/* Headline with Creative Line Breaks */}
            <SophisticatedScrollTrigger variant="slideUp" staggerDelay={0.4}>
              <CreativeLineBreak
                lines={headlineLines}
                variant="hero"
                className="text-sophisticated-white"
              />
            </SophisticatedScrollTrigger>

            {/* Subheadline */}
            <SophisticatedScrollTrigger variant="fadeIn" staggerDelay={0.6}>
              <p className="body-large text-sophisticated-white/80 max-w-2xl leading-relaxed">
                {subheadline}
              </p>
            </SophisticatedScrollTrigger>

            {/* CTA Buttons */}
            <SophisticatedScrollTrigger variant="slideUp" staggerDelay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4">
                {ctaButtons.map((button, index) => (
                  <SophisticatedButton
                    key={index}
                    variant={button.variant}
                    size="lg"
                    onClick={button.onClick}
                    className="min-w-[200px]"
                  >
                    {button.text}
                  </SophisticatedButton>
                ))}
              </div>
            </SophisticatedScrollTrigger>
          </div>

          {/* Visual Elements Side */}
          <div className={`relative ${titlePosition === 'right' ? 'lg:col-start-1' : ''}`}>
            <SophisticatedScrollTrigger variant="scaleIn" staggerDelay={1.0}>
              
              {/* Main Visual Container */}
              <div className="relative">
                
                {/* Abstract AI Visualization */}
                <div className="relative w-full h-96 lg:h-[500px]">
                  
                  {/* Central Hub */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div 
                      className="w-32 h-32 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: sophisticatedColors.professionalBlue.DEFAULT,
                        background: `radial-gradient(circle, ${sophisticatedColors.professionalBlue.opacity[20]} 0%, transparent 70%)`
                      }}
                    >
                      <div 
                        className="w-16 h-16 rounded-full"
                        style={{
                          backgroundColor: sophisticatedColors.skyBlue.opacity[30]
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Orbiting Elements */}
                  {[0, 1, 2, 3, 4].map((index) => (
                    <motion.div
                      key={index}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transformOrigin: '0 0',
                      }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 15 + index * 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: index % 2 === 0 
                            ? sophisticatedColors.richPurple.opacity[40]
                            : sophisticatedColors.skyBlue.opacity[40],
                          transform: `translate(${120 + index * 20}px, -8px)`,
                        }}
                      />
                    </motion.div>
                  ))}

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={sophisticatedColors.professionalBlue.opacity[30]} />
                        <stop offset="100%" stopColor={sophisticatedColors.skyBlue.opacity[20]} />
                      </linearGradient>
                    </defs>
                    
                    {/* Dynamic connection lines */}
                    <motion.path
                      d="M 50% 50% Q 70% 30% 80% 20%"
                      stroke="url(#connectionGradient)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: 1.2 }}
                    />
                    <motion.path
                      d="M 50% 50% Q 30% 70% 20% 80%"
                      stroke="url(#connectionGradient)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: 1.4 }}
                    />
                  </svg>
                </div>

                {/* Accent Geometric Shapes */}
                <div 
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-lg transform rotate-12"
                  style={{
                    background: `linear-gradient(45deg, ${sophisticatedColors.richPurple.opacity[20]}, ${sophisticatedColors.deepPurple.opacity[15]})`
                  }}
                />
                <div 
                  className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full"
                  style={{
                    backgroundColor: sophisticatedColors.skyBlue.opacity[25]
                  }}
                />
              </div>
            </SophisticatedScrollTrigger>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <SophisticatedScrollTrigger variant="fadeIn" staggerDelay={1.5}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex flex-col items-center space-y-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sophisticated-white/60 text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-sophisticated-white/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-sophisticated-white/60 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </SophisticatedScrollTrigger>
    </div>
  );
}