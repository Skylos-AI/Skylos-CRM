import { render, screen, fireEvent } from '@testing-library/react'
import { DetailedIndustryExamples } from '@/components/landing/detailed-industry-examples'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock scroll-triggered-section
jest.mock('@/components/animations/scroll-triggered-section', () => ({
  ScrollTriggeredSection: ({ children }: any) => <div>{children}</div>,
}))

describe('DetailedIndustryExamples', () => {
  it('renders the main heading', () => {
    render(<DetailedIndustryExamples />)
    expect(screen.getByText('Deep Dive: How AI Agents Solve Real Business Problems')).toBeInTheDocument()
  })

  it('renders category selection buttons', () => {
    render(<DetailedIndustryExamples />)
    expect(screen.getByText('Customer Service Transformation')).toBeInTheDocument()
    expect(screen.getByText('Sales Process Acceleration')).toBeInTheDocument()
    expect(screen.getByText('Operations Optimization')).toBeInTheDocument()
  })

  it('renders tab navigation', () => {
    render(<DetailedIndustryExamples />)
    expect(screen.getByText('Pain Points')).toBeInTheDocument()
    expect(screen.getByText('AI Solution')).toBeInTheDocument()
    expect(screen.getByText('Real Results')).toBeInTheDocument()
    expect(screen.getByText('Discovery Process')).toBeInTheDocument()
  })

  it('shows business context by default', () => {
    render(<DetailedIndustryExamples />)
    expect(screen.getByText('Business Context')).toBeInTheDocument()
    expect(screen.getByText('Customer service teams are overwhelmed with repetitive inquiries')).toBeInTheDocument()
  })

  it('switches between categories', () => {
    render(<DetailedIndustryExamples />)
    
    // Click on Sales category
    fireEvent.click(screen.getByText('Sales Process Acceleration'))
    
    // Should show sales content
    expect(screen.getByText('Sales teams struggle with lead qualification bottlenecks')).toBeInTheDocument()
  })

  it('switches between tabs', () => {
    render(<DetailedIndustryExamples />)
    
    // Click on AI Solution tab
    fireEvent.click(screen.getByText('AI Solution'))
    
    // Should show solution content
    expect(screen.getByText('AI Agent Solution Approach')).toBeInTheDocument()
  })

  it('displays pain point details', () => {
    render(<DetailedIndustryExamples />)
    
    // Should show specific pain points
    expect(screen.getByText('Specific Pain Points & Business Impact')).toBeInTheDocument()
    expect(screen.getByText('Average response time of 8+ hours during peak periods')).toBeInTheDocument()
  })

  it('shows solution capabilities when on solution tab', () => {
    render(<DetailedIndustryExamples />)
    
    // Click on AI Solution tab
    fireEvent.click(screen.getByText('AI Solution'))
    
    // Should show capabilities
    expect(screen.getByText('Agent Capabilities')).toBeInTheDocument()
    expect(screen.getByText('Implementation Steps')).toBeInTheDocument()
  })

  it('displays real results when on results tab', () => {
    render(<DetailedIndustryExamples />)
    
    // Click on Real Results tab
    fireEvent.click(screen.getByText('Real Results'))
    
    // Should show results content
    expect(screen.getByText('Real-World Implementation: TechCorp Solutions')).toBeInTheDocument()
    expect(screen.getByText('Measurable Results')).toBeInTheDocument()
  })

  it('shows discovery process when on discovery tab', () => {
    render(<DetailedIndustryExamples />)
    
    // Click on Discovery Process tab
    fireEvent.click(screen.getByText('Discovery Process'))
    
    // Should show discovery content
    expect(screen.getByText('Our Discovery Process for This Solution')).toBeInTheDocument()
    expect(screen.getByText('Pain Point Analysis')).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<DetailedIndustryExamples />)
    
    expect(screen.getByText('Start Your Discovery Process')).toBeInTheDocument()
    expect(screen.getByText('Download Detailed Case Study')).toBeInTheDocument()
  })
})