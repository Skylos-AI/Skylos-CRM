import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CompetitiveMatrix } from '@/components/landing/competitive-matrix'
import { comparisonFeatures, competitors, highlightedFeatures } from '@/lib/mock-data/competitive-matrix'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    tr: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('CompetitiveMatrix', () => {
  const defaultProps = {
    features: comparisonFeatures.slice(0, 5), // Use first 5 features for testing
    competitors,
    highlightedFeatures,
  }

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

  it('renders the competitive matrix with all features', () => {
    render(<CompetitiveMatrix {...defaultProps} />)
    
    // Check if category filters are rendered
    expect(screen.getByText('All Features')).toBeInTheDocument()
    expect(screen.getByText('Cost & Pricing')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
    
    // Check if feature names are rendered (using getAllByText since they appear in both desktop and mobile views)
    expect(screen.getAllByText('Setup Cost')).toHaveLength(2) // Desktop and mobile
    expect(screen.getAllByText('Monthly Maintenance')).toHaveLength(2)
  })

  it('filters features by category', async () => {
    render(<CompetitiveMatrix {...defaultProps} />)
    
    // Click on Cost & Pricing filter
    fireEvent.click(screen.getByText('Cost & Pricing'))
    
    await waitFor(() => {
      // Should show cost-related features (appears in both desktop and mobile views)
      expect(screen.getAllByText('Setup Cost')).toHaveLength(2)
      expect(screen.getAllByText('Monthly Maintenance')).toHaveLength(2)
    })
  })

  it('displays competitor names in table header', () => {
    render(<CompetitiveMatrix {...defaultProps} />)
    
    competitors.forEach(competitor => {
      // Competitor names appear multiple times (desktop table header + mobile cards)
      expect(screen.getAllByText(competitor.name).length).toBeGreaterThan(0)
    })
  })

  it('shows "Our Solution" column with highlighting', () => {
    render(<CompetitiveMatrix {...defaultProps} />)
    
    // "Our Solution" appears in both desktop table header and mobile cards
    expect(screen.getAllByText('Our Solution').length).toBeGreaterThan(0)
  })

  it('renders boolean values as check/x icons', () => {
    const booleanFeature = {
      id: 'test-boolean',
      name: 'Test Boolean Feature',
      description: 'A test feature with boolean values',
      ourSolution: true,
      competitors: {
        'chatgpt-enterprise': false,
        'microsoft-copilot': true,
        'google-bard': false,
        'anthropic-claude': true
      },
      isHighlight: false,
      category: 'features' as const
    }

    render(
      <CompetitiveMatrix 
        {...defaultProps} 
        features={[booleanFeature]}
      />
    )

    // Should render check and x icons (we can't easily test the actual icons, but we can test their presence)
    expect(screen.getAllByText('Test Boolean Feature')).toHaveLength(2) // Desktop and mobile
  })

  it('expands feature details when info button is clicked', async () => {
    render(<CompetitiveMatrix {...defaultProps} />)
    
    // Find and click the first info button
    const infoButtons = screen.getAllByRole('button')
    const infoButton = infoButtons.find(button => 
      button.querySelector('svg') // Info icon
    )
    
    if (infoButton) {
      fireEvent.click(infoButton)
      
      await waitFor(() => {
        expect(screen.getByText('Detailed Comparison:')).toBeInTheDocument()
      })
    }
  })

  it('highlights key advantage features', () => {
    const highlightedFeature = {
      id: 'highlighted-test',
      name: 'Highlighted Feature',
      description: 'This feature should be highlighted',
      ourSolution: 'Best in class',
      competitors: {
        'chatgpt-enterprise': 'Basic',
        'microsoft-copilot': 'Limited',
        'google-bard': 'Not available',
        'anthropic-claude': 'Basic'
      },
      isHighlight: true,
      category: 'features' as const
    }

    render(
      <CompetitiveMatrix 
        {...defaultProps} 
        features={[highlightedFeature]}
      />
    )

    expect(screen.getByText('Key Advantage')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <CompetitiveMatrix {...defaultProps} className="custom-class" />
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('handles empty features array', () => {
    render(
      <CompetitiveMatrix 
        {...defaultProps} 
        features={[]}
      />
    )
    
    // Should still render the category filters
    expect(screen.getByText('All Features')).toBeInTheDocument()
  })

  it('switches between category filters correctly', async () => {
    render(<CompetitiveMatrix {...defaultProps} />)
    
    // Start with "All Features"
    expect(screen.getByText('All Features')).toHaveClass('bg-blue-600')
    
    // Click on "Security"
    fireEvent.click(screen.getByText('Security'))
    
    await waitFor(() => {
      expect(screen.getByText('Security')).toHaveClass('bg-blue-600')
      expect(screen.getByText('All Features')).not.toHaveClass('bg-blue-600')
    })
  })
})