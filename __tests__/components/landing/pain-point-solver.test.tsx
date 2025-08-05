import { render, screen, fireEvent } from '@testing-library/react'
import { PainPointSolver } from '@/components/landing/pain-point-solver'
import { industries, painPoints, solutions } from '@/lib/mock-data/pain-points'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock scroll-triggered-section
jest.mock('@/components/animations/scroll-triggered-section', () => ({
  ScrollTriggeredSection: ({ children }: any) => <div>{children}</div>,
}))

describe('PainPointSolver', () => {
  const defaultProps = {
    industries,
    painPoints,
    solutions,
  }

  it('renders the main heading', () => {
    render(<PainPointSolver {...defaultProps} />)
    expect(screen.getByText('Solving Real Business Challenges')).toBeInTheDocument()
  })

  it('renders industry selection cards', () => {
    render(<PainPointSolver {...defaultProps} />)
    expect(screen.getByText('Select Your Industry')).toBeInTheDocument()
    expect(screen.getAllByText('Customer Service')).toHaveLength(2) // One in selection, one in overview
    expect(screen.getByText('Sales')).toBeInTheDocument()
    expect(screen.getByText('Operations')).toBeInTheDocument()
  })

  it('shows industry overview when industry is selected', () => {
    render(<PainPointSolver {...defaultProps} />)
    // First industry should be selected by default
    expect(screen.getByText('Transform customer support with intelligent conversational agents')).toBeInTheDocument()
  })

  it('filters pain points by selected industry', () => {
    render(<PainPointSolver {...defaultProps} />)
    
    // Should show customer service pain points by default
    expect(screen.getByText('Slow Response Times')).toBeInTheDocument()
    
    // Click on Sales industry
    fireEvent.click(screen.getByText('Sales'))
    
    // Should now show sales pain points
    expect(screen.getByText('Lead Qualification Bottlenecks')).toBeInTheDocument()
  })

  it('shows solution details when pain point is clicked', () => {
    render(<PainPointSolver {...defaultProps} />)
    
    // Click on a pain point
    fireEvent.click(screen.getByText('Slow Response Times'))
    
    // Should show solution details
    expect(screen.getByText('AI Solution')).toBeInTheDocument()
    expect(screen.getByText('Our Approach')).toBeInTheDocument()
    expect(screen.getByText('Expected Outcome')).toBeInTheDocument()
  })

  it('displays pain point impact and frequency', () => {
    render(<PainPointSolver {...defaultProps} />)
    
    // Check for impact badge and frequency - there are multiple high impact items
    expect(screen.getAllByText('high impact')).toHaveLength(3) // Multiple high impact pain points
    expect(screen.getByText('78% affected')).toBeInTheDocument()
  })

  it('shows case study metrics when solution is selected', () => {
    render(<PainPointSolver {...defaultProps} />)
    
    // Click on a pain point that has a case study
    fireEvent.click(screen.getByText('Slow Response Times'))
    
    // Should show case study information
    expect(screen.getByText('Success Story')).toBeInTheDocument()
    expect(screen.getByText('TechCorp Solutions')).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<PainPointSolver {...defaultProps} />)
    
    expect(screen.getByText('Start Your Discovery Process')).toBeInTheDocument()
    expect(screen.getByText('Schedule a Consultation')).toBeInTheDocument()
  })

  it('handles industry switching correctly', () => {
    render(<PainPointSolver {...defaultProps} />)
    
    // Initially shows customer service
    expect(screen.getByText('Common Pain Points in Customer Service')).toBeInTheDocument()
    
    // Switch to Operations
    fireEvent.click(screen.getByText('Operations'))
    
    // Should update the heading
    expect(screen.getByText('Common Pain Points in Operations')).toBeInTheDocument()
  })

  it('toggles pain point selection', () => {
    render(<PainPointSolver {...defaultProps} />)
    
    const painPointCard = screen.getByText('Slow Response Times').closest('.cursor-pointer')
    
    // Click to select
    fireEvent.click(painPointCard!)
    expect(screen.getByText('AI Solution')).toBeInTheDocument()
    
    // Click again to deselect
    fireEvent.click(painPointCard!)
    expect(screen.queryByText('AI Solution')).not.toBeInTheDocument()
  })

  it('displays solution features correctly', () => {
    render(<PainPointSolver {...defaultProps} />)
    
    // Click on a pain point
    fireEvent.click(screen.getByText('Slow Response Times'))
    
    // Should show key features
    expect(screen.getByText('Key Features')).toBeInTheDocument()
    expect(screen.getByText('Instant response capability')).toBeInTheDocument()
    expect(screen.getByText('24/7 availability')).toBeInTheDocument()
  })
})