import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CompetitiveDifferentiationSection } from '@/components/landing/competitive-differentiation-section'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock the ScrollTriggeredSection component
jest.mock('@/components/animations/scroll-triggered-section', () => ({
  ScrollTriggeredSection: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}))

// Mock the CompetitiveMatrix component
jest.mock('@/components/landing/competitive-matrix', () => ({
  CompetitiveMatrix: () => <div data-testid="competitive-matrix">Competitive Matrix</div>,
}))

describe('CompetitiveDifferentiationSection', () => {
  beforeEach(() => {
    // Mock window.matchMedia for responsive tests
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('renders the main heading and description', () => {
    render(<CompetitiveDifferentiationSection />)
    
    expect(screen.getByText('Why Choose Our AI Solutions?')).toBeInTheDocument()
    expect(screen.getByText(/See how our custom conversational AI solutions stack up/)).toBeInTheDocument()
  })

  it('displays key advantages overview', () => {
    render(<CompetitiveDifferentiationSection />)
    
    expect(screen.getByText('70% Lower Costs')).toBeInTheDocument()
    expect(screen.getByText('Enterprise Security')).toBeInTheDocument()
    expect(screen.getByText('Rapid Deployment')).toBeInTheDocument()
  })

  it('shows cost comparison details', () => {
    render(<CompetitiveDifferentiationSection />)
    
    expect(screen.getByText('Setup: $3,750 vs $25,000+ average')).toBeInTheDocument()
    expect(screen.getByText('1-2 weeks vs 8-16 weeks average')).toBeInTheDocument()
  })

  it('renders the competitive matrix component', () => {
    render(<CompetitiveDifferentiationSection />)
    
    expect(screen.getByTestId('competitive-matrix')).toBeInTheDocument()
    expect(screen.getByText('Detailed Feature Comparison')).toBeInTheDocument()
  })

  it('displays total cost of ownership comparison', () => {
    render(<CompetitiveDifferentiationSection />)
    
    expect(screen.getByText('Total Cost of Ownership Comparison')).toBeInTheDocument()
    expect(screen.getByText('Our Setup Cost')).toBeInTheDocument()
    expect(screen.getByText('Monthly Cost')).toBeInTheDocument()
    expect(screen.getAllByText('12-Month Total')).toHaveLength(2) // Appears twice in the cost comparison
  })

  it('shows security and compliance advantages', () => {
    render(<CompetitiveDifferentiationSection />)
    
    expect(screen.getByText('Security & Compliance Advantages')).toBeInTheDocument()
    expect(screen.getByText('Data Encryption')).toBeInTheDocument()
    expect(screen.getByText('On-Premise Deployment')).toBeInTheDocument()
    expect(screen.getByText('HIPAA Compliance')).toBeInTheDocument()
  })

  it('displays integration capabilities', () => {
    render(<CompetitiveDifferentiationSection />)
    
    expect(screen.getByText('Integration Capabilities')).toBeInTheDocument()
    expect(screen.getByText('CRM Systems')).toBeInTheDocument()
    expect(screen.getByText('Communication')).toBeInTheDocument()
    expect(screen.getByText('E-commerce')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('includes call-to-action section', () => {
    render(<CompetitiveDifferentiationSection />)
    
    expect(screen.getByText('Ready to See the Difference?')).toBeInTheDocument()
    expect(screen.getByText('Schedule Demo')).toBeInTheDocument()
    expect(screen.getByText('Get Custom Quote')).toBeInTheDocument()
  })

  it('shows competitive analysis badge', () => {
    render(<CompetitiveDifferentiationSection />)
    
    expect(screen.getByText('Competitive Analysis')).toBeInTheDocument()
  })

  it('displays cost savings calculation', () => {
    render(<CompetitiveDifferentiationSection />)
    
    // Should show savings calculation
    expect(screen.getByText(/Save \$.*in the first year/)).toBeInTheDocument()
  })

  it('shows compliance certifications', () => {
    render(<CompetitiveDifferentiationSection />)
    
    expect(screen.getByText('GDPR, HIPAA, SOC2, ISO 27001')).toBeInTheDocument()
  })

  it('displays integration tool examples', () => {
    render(<CompetitiveDifferentiationSection />)
    
    // Should show some integration tool examples
    expect(screen.getByText('Salesforce')).toBeInTheDocument()
    expect(screen.getByText('Slack')).toBeInTheDocument()
    expect(screen.getByText('Shopify')).toBeInTheDocument()
  })
})