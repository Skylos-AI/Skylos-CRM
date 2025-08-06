'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sophisticatedColors } from '@/lib/design-system/sophisticated-tokens';
import { 
  ChevronUp, 
  Menu, 
  X, 
  Home, 
  Target, 
  Lightbulb, 
  Settings, 
  BarChart3,
  MessageSquare 
} from 'lucide-react';

interface NavigationSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface SophisticatedNavigationProps {
  sections: NavigationSection[];
  position?: 'left' | 'right';
  showProgress?: boolean;
  exitIntentEnabled?: boolean;
  onExitIntent?: () => void;
}

export function SophisticatedNavigation({
  sections,
  position = 'right',
  showProgress = true,
  exitIntentEnabled = false,
  onExitIntent
}: SophisticatedNavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
      
      // Show navigation after scrolling 100px
      setIsVisible(scrolled > 100);
      
      // Update active section based on scroll position
      const sectionElements = sections.map(section => 
        document.getElementById(section.id.replace('#', ''))
      ).filter(Boolean);
      
      const currentSection = sectionElements.find(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-1/2 transform -translate-y-1/2 z-50 ${
            position === 'left' ? 'left-6' : 'right-6'
          }`}
          initial={{ opacity: 0, x: position === 'left' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: position === 'left' ? -50 : 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-sophisticated-white/90 backdrop-blur-sm border border-sophisticated-black/10 rounded-2xl p-3 shadow-lg">
            
            {/* Progress Indicator */}
            {showProgress && (
              <div className="mb-4">
                <div className="w-2 h-32 bg-sophisticated-black/10 rounded-full overflow-hidden">
                  <motion.div
                    className="w-full bg-sophisticated-professional-blue rounded-full"
                    style={{ height: `${scrollProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            )}

            {/* Navigation Items */}
            <div className="space-y-2">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.href)}
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
                    ${activeSection === section.id.replace('#', '')
                      ? 'bg-sophisticated-professional-blue text-sophisticated-white'
                      : 'text-sophisticated-black/60 hover:bg-sophisticated-professional-blue/10 hover:text-sophisticated-professional-blue'
                    }
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={section.label}
                >
                  {section.icon}
                </motion.button>
              ))}
            </div>

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 mt-4 rounded-xl flex items-center justify-center text-sophisticated-black/60 hover:bg-sophisticated-professional-blue/10 hover:text-sophisticated-professional-blue transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Scroll to top"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}