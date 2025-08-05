/**
 * ProcessSection Component
 * 
 * Complete process section that combines ProcessVisualization and ProcessContent
 * to create a comprehensive showcase of the streamlined implementation process.
 */

'use client'

import React from 'react'
import { ProcessVisualization } from './process-visualization'
import { ProcessContent } from './process-content'
import { cn } from '@/lib/utils'

interface ProcessSectionProps {
  className?: string
  layout?: 'horizontal' | 'vertical'
  showVisualization?: boolean
  showContent?: boolean
  showROICalculator?: boolean
  showCompetitiveComparison?: boolean
  emphasizeSpeed?: boolean
  interactive?: boolean
}

export function ProcessSection({
  className,
  layout = 'horizontal',
  showVisualization = true,
  showContent = true,
  showROICalculator = true,
  showCompetitiveComparison = true,
  emphasizeSpeed = true,
  interactive = true
}: ProcessSectionProps) {
  return (
    <section className={cn(
      'py-16 lg:py-24 bg-background',
      className
    )}>
      <div className="container space-y-16 lg:space-y-24">
        {/* Process Visualization */}
        {showVisualization && (
          <ProcessVisualization
            layout={layout}
            interactive={interactive}
            emphasizeSpeed={emphasizeSpeed}
          />
        )}

        {/* Process Content */}
        {showContent && (
          <ProcessContent
            showROICalculator={showROICalculator}
            showCompetitiveComparison={showCompetitiveComparison}
            emphasizeSpeed={emphasizeSpeed}
          />
        )}
      </div>
    </section>
  )
}

// Specialized variants for different use cases
export function VisualizationOnlyProcessSection(props: Omit<ProcessSectionProps, 'showContent'>) {
  return <ProcessSection {...props} showContent={false} />
}

export function ContentOnlyProcessSection(props: Omit<ProcessSectionProps, 'showVisualization'>) {
  return <ProcessSection {...props} showVisualization={false} />
}

export function CompactProcessSection(props: ProcessSectionProps) {
  return (
    <ProcessSection 
      {...props} 
      showROICalculator={false}
      showCompetitiveComparison={false}
      className={cn('py-12 lg:py-16', props.className)}
    />
  )
}

export function ROIFocusedProcessSection(props: ProcessSectionProps) {
  return (
    <ProcessSection 
      {...props} 
      showROICalculator={true}
      showCompetitiveComparison={false}
    />
  )
}

export function CompetitiveFocusedProcessSection(props: ProcessSectionProps) {
  return (
    <ProcessSection 
      {...props} 
      showROICalculator={false}
      showCompetitiveComparison={true}
    />
  )
}

// Mobile and desktop optimized versions
export function MobileProcessSection(props: ProcessSectionProps) {
  return (
    <div className="lg:hidden">
      <ProcessSection {...props} layout="vertical" />
    </div>
  )
}

export function DesktopProcessSection(props: ProcessSectionProps) {
  return (
    <div className="hidden lg:block">
      <ProcessSection {...props} layout="horizontal" />
    </div>
  )
}

// Responsive version that adapts layout based on screen size
export function ResponsiveProcessSection(props: ProcessSectionProps) {
  return (
    <>
      <MobileProcessSection {...props} />
      <DesktopProcessSection {...props} />
    </>
  )
}