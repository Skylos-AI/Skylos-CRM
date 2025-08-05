import { render, screen } from '@testing-library/react'
import { ProblemUrgencySection } from '@/components/landing/problem-urgency-section'

// Mock the animation components
jest.mock('@/components/animations/scroll-triggered-section', () => {
  return {
    ScrollTriggeredSection: ({ children, className }: any) => (
      <div className={className}>{children}</div>
    )
  }
})

jest.mock('@/components/animations/stagger-container', () => {
  return {
    StaggerContainer: ({ children, className }: any) => (
      <div className={className}>{children}</div>
    )
  }
})

jest.mock('@/components/shared/animated-counter', () => {
  return {
    AnimatedCounter: ({ value, className }: any) => (
      <span className={className}>{value}</span>
    )
  }
})

describe('ProblemUrgencySection', () => {
  it('renders the main headline', () => {
    render(<ProblemUrgencySection />)
    
    expect(screen.getByText('Your Competitors Are')).toBeInTheDocument()
    expect(screen.getByText('Already Ahead')).toBeInTheDocument()
  })

  it('displays urgency messaging', () => {
    render(<ProblemUrgencySection />)
    
    expect(screen.getByText('URGENT: Market Shift in Progress')).toBeInTheDocument()
    expect(screen.getByText(/While you're reading this, businesses in your industry/)).toBeInTheDocument()
  })

  it('shows industry statistics', () => {
    render(<ProblemUrgencySection />)
    
    expect(screen.getByText('The Numbers Don\'t Lie')).toBeInTheDocument()
    expect(screen.getByText('Businesses Using AI')).toBeInTheDocument()
    expect(screen.getByText('Productivity Increase')).toBeInTheDocument()
  })

  it('displays industry trends section', () => {
    render(<ProblemUrgencySection />)
    
    expect(screen.getByText('Industry Leaders Are Moving Fast')).toBeInTheDocument()
    expect(screen.getByText('Customer Service')).toBeInTheDocument()
    expect(screen.getByText('Sales & Lead Generation')).toBeInTheDocument()
  })

  it('shows competitive metrics comparison', () => {
    render(<ProblemUrgencySection />)
    
    expect(screen.getByText('The Performance Gap Is Real')).toBeInTheDocument()
    expect(screen.getByText('Customer Response Time')).toBeInTheDocument()
    expect(screen.getByText('Lead Qualification Rate')).toBeInTheDocument()
  })

  it('displays competitive disadvantages', () => {
    render(<ProblemUrgencySection />)
    
    expect(screen.getByText('What You\'re Losing Every Day')).toBeInTheDocument()
    expect(screen.getByText('Market Share Loss')).toBeInTheDocument()
    expect(screen.getByText('Talent Acquisition')).toBeInTheDocument()
  })

  it('includes call-to-action buttons', () => {
    render(<ProblemUrgencySection />)
    
    expect(screen.getByText('Start Your AI Transformation Now')).toBeInTheDocument()
    expect(screen.getByText('See Competitive Analysis')).toBeInTheDocument()
  })

  it('shows urgency indicators', () => {
    render(<ProblemUrgencySection />)
    
    expect(screen.getByText('The Cost of Waiting Is Exponential')).toBeInTheDocument()
    expect(screen.getByText(/Implementation starts in 48 hours/)).toBeInTheDocument()
  })
})