/**
 * ProcessVisualization Component Tests
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProcessVisualization } from '@/components/landing/process-visualization'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'
import { it } from 'zod/v4/locales/index.cjs'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock hooks
jest.mock('@/hooks/use-intersection-observer', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    shouldAnimate: true,
  }),
}))

jest.mock('@/hooks/use-reduced-motion', () => ({
  useReducedMotion: () => false,
}))

describe('ProcessVisualization', () => {
  it('renders with default props', () => {
    render(<ProcessVisualization />)
    
    expect(screen.getByText('From Idea to Implementation in')).toBeInTheDocument()
    expect(screen.getByText('3 Simple Steps')).toBeInTheDocument()
    expect(screen.getByText('Discovery & Analysis')).toBeInTheDocument()
    expect(screen.getByText('AI Agent Customization')).toBeInTheDocument()
    expect(screen.getByText('Deployment & Testing')).toBeInTheDocument()
  })

  it('displays time indicators for each step', () => {
    render(<ProcessVisualization />)
    
    expect(screen.getByText('2-3 days')).toBeInTheDocument()
    expect(screen.getByText('3-5 days')).toBeInTheDocument()
    expect(screen.getByText('1-2 days')).toBeInTheDocument()
  })

  it('shows client input requirements', () => {
    render(<ProcessVisualization />)
    
    const minimalInputElements = screen.getAllByText('Minimal Input')
    expect(minimalInputElements).toHaveLength(3) // All steps require minimal input
  })

  it('displays total timeline when emphasizeSpeed is true', () => {
    render(<ProcessVisualization emphasizeSpeed={true} />)
    
    expect(screen.getByText(/Total timeline: \d+ days maximum/)).toBeInTheDocument()
  })

  it('shows interactive hover details when interactive is true', () => {
    render(<ProcessVisualization interactive={true} />)
    
    const firstStep = screen.getByText('Discovery & Analysis').closest('div')
    expect(firstStep).toBeInTheDocument()
    
    // The hover details should be present but initially hidden (multiple instances expected)
    expect(screen.getAllByText('What\'s included:')).toHaveLength(3)
    expect(screen.getByText('Business process analysis')).toBeInTheDocument()
  })

  it('renders in vertical layout when specified', () => {
    render(<ProcessVisualization layout="vertical" />)
    
    // Should still render all steps
    expect(screen.getByText('Discovery & Analysis')).toBeInTheDocument()
    expect(screen.getByText('AI Agent Customization')).toBeInTheDocument()
    expect(screen.getByText('Deployment & Testing')).toBeInTheDocument()
  })

  it('displays summary section with key metrics', () => {
    render(<ProcessVisualization />)
    
    expect(screen.getByText('Why Our Process Works')).toBeInTheDocument()
    expect(screen.getByText('Days maximum from start to deployment')).toBeInTheDocument()
    expect(screen.getByText('Client input required throughout')).toBeInTheDocument()
    expect(screen.getByText('Testing and ROI tracking')).toBeInTheDocument()
  })

  it('shows time to value indicators', () => {
    render(<ProcessVisualization />)
    
    expect(screen.getByText('⚡ Immediate insights')).toBeInTheDocument()
    expect(screen.getByText('⚡ Working prototype ready')).toBeInTheDocument()
    expect(screen.getByText('⚡ Immediate ROI tracking')).toBeInTheDocument()
  })

  it('renders step numbers correctly', () => {
    render(<ProcessVisualization />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    const { container } = render(<ProcessVisualization className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('handles custom steps prop', () => {
    const customSteps = [
      {
        id: 'custom-step',
        title: 'Custom Step',
        description: 'Custom description',
        icon: <div>Custom Icon</div>,
        duration: '1 day',
        clientInput: 'minimal' as const,
        details: ['Custom detail'],
        timeToValue: 'Custom time to value'
      }
    ]

    render(<ProcessVisualization steps={customSteps} />)
    
    expect(screen.getByText('Custom Step')).toBeInTheDocument()
    expect(screen.getByText('Custom description')).toBeInTheDocument()
    expect(screen.getByText('1 day')).toBeInTheDocument()
  })
})

describe('ProcessVisualization Variants', () => {
  it('HorizontalProcessVisualization renders correctly', () => {
    const { HorizontalProcessVisualization } = require('@/components/landing/process-visualization')
    render(<HorizontalProcessVisualization />)
    
    expect(screen.getByText('From Idea to Implementation in')).toBeInTheDocument()
  })

  it('VerticalProcessVisualization renders correctly', () => {
    const { VerticalProcessVisualization } = require('@/components/landing/process-visualization')
    render(<VerticalProcessVisualization />)
    
    expect(screen.getByText('From Idea to Implementation in')).toBeInTheDocument()
  })

  it('CompactProcessVisualization renders with reduced padding', () => {
    const { CompactProcessVisualization } = require('@/components/landing/process-visualization')
    const { container } = render(<CompactProcessVisualization />)
    
    expect(container.firstChild).toHaveClass('py-12')
  })
})