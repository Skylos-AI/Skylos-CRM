/**
 * Chart Accessibility Tests
 * 
 * Tests for ARIA labels, keyboard navigation, high contrast support,
 * and reduced motion preferences in chart components.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccessibleChartWrapper } from '@/components/charts/accessible-chart-wrapper'
import { 
  CircularFocusIndicator,
  AccessibleChartButton,
  AccessibleChartLegend,
  HighContrastIndicator,
  ReducedMotionIndicator
} from '@/components/ui/accessible-focus-indicators'
import { useChartAccessibility } from '@/lib/accessibility/chart-accessibility'

// Mock data for testing
const mockRevenueData = [
  { month: 'Jan', revenue: 45000, growth: 0 },
  { month: 'Feb', revenue: 52000, growth: 15.6 },
  { month: 'Mar', revenue: 61000, growth: 17.3 }
]

const mockPriorityData = [
  { name: 'Low', value: 10, color: '#f3f4f6' },
  { name: 'Medium', value: 15, color: '#e5e7eb' },
  { name: 'High', value: 8, color: '#d1d5db' },
  { name: 'Urgent', value: 3, color: '#9ca3af' }
]

// Mock media queries
const mockMatchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(mockMatchMedia),
})

describe('Chart Accessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('AccessibleChartWrapper', () => {
    it('renders with proper ARIA labels', () => {
      render(
        <AccessibleChartWrapper
          title="Test Chart"
          description="Test chart description"
          chartType="revenue"
          data={mockRevenueData}
        >
          <div>Chart content</div>
        </AccessibleChartWrapper>
      )

      expect(screen.getByRole('img')).toHaveAttribute('aria-labelledby', 'chart-title-revenue')
      expect(screen.getByRole('img')).toHaveAttribute('aria-describedby', expect.stringContaining('chart-desc-revenue'))
      expect(screen.getByText('Test Chart')).toHaveAttribute('id', 'chart-title-revenue')
      expect(screen.getByText('Test chart description')).toHaveAttribute('id', 'chart-desc-revenue')
    })

    it('provides keyboard navigation instructions', () => {
      render(
        <AccessibleChartWrapper
          title="Test Chart"
          chartType="revenue"
          data={mockRevenueData}
        >
          <div>Chart content</div>
        </AccessibleChartWrapper>
      )

      expect(screen.getByText(/Use arrow keys to navigate data points/)).toBeInTheDocument()
      expect(screen.getByText(/Press Alt\+T to toggle between chart and table view/)).toBeInTheDocument()
    })

    it('supports data table toggle', async () => {
      const user = userEvent.setup()
      
      render(
        <AccessibleChartWrapper
          title="Test Chart"
          chartType="revenue"
          data={mockRevenueData}
          showDataTable={true}
        >
          <div>Chart content</div>
        </AccessibleChartWrapper>
      )

      const toggleButton = screen.getByRole('button', { name: /Switch to data table view/ })
      expect(toggleButton).toBeInTheDocument()

      await user.click(toggleButton)
      
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByText('Chart')).toBeInTheDocument()
    })

    it('handles keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <AccessibleChartWrapper
          title="Test Chart"
          chartType="revenue"
          data={mockRevenueData}
        >
          <div>Chart content</div>
        </AccessibleChartWrapper>
      )

      const chartElement = screen.getByRole('img')
      chartElement.focus()

      await user.keyboard('{ArrowRight}')
      // Test that keyboard navigation is handled (would need more specific implementation)
    })
  })

  describe('CircularFocusIndicator', () => {
    it('renders with circular focus styles', () => {
      render(
        <CircularFocusIndicator>
          <span>Content</span>
        </CircularFocusIndicator>
      )

      const indicator = screen.getByText('Content').parentElement
      expect(indicator).toHaveClass('rounded-full')
      expect(indicator).toHaveClass('focus:outline-none')
    })

    it('applies active state styles', () => {
      render(
        <CircularFocusIndicator isActive={true}>
          <span>Content</span>
        </CircularFocusIndicator>
      )

      const indicator = screen.getByText('Content').parentElement
      expect(indicator).toHaveClass('ring-2', 'ring-black', 'ring-offset-2')
    })
  })

  describe('AccessibleChartButton', () => {
    it('renders with proper ARIA attributes', () => {
      render(
        <AccessibleChartButton
          ariaLabel="Test button"
          ariaDescription="Button description"
        >
          Click me
        </AccessibleChartButton>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Test button')
      expect(button).toHaveAttribute('aria-describedby', 'Button description')
    })

    it('applies focus ring styles', () => {
      render(
        <AccessibleChartButton>
          Click me
        </AccessibleChartButton>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('focus:ring-2', 'focus:ring-black', 'focus:ring-offset-2')
    })
  })

  describe('AccessibleChartLegend', () => {
    it('renders legend items with proper structure', () => {
      const legendItems = [
        { label: 'Series 1', color: '#000000', value: '10', description: 'First series' },
        { label: 'Series 2', color: '#666666', value: '20', description: 'Second series' }
      ]

      render(<AccessibleChartLegend items={legendItems} />)

      expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'Chart legend')
      expect(screen.getAllByRole('listitem')).toHaveLength(2)
      expect(screen.getByText('Series 1')).toBeInTheDocument()
      expect(screen.getByText('(10)')).toBeInTheDocument()
    })
  })

  describe('High Contrast Support', () => {
    it('shows high contrast indicator when enabled', () => {
      // Mock high contrast media query
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        ...mockMatchMedia(query),
        matches: query === '(prefers-contrast: high)'
      }))

      render(<HighContrastIndicator />)
      expect(screen.getByText('High Contrast Mode')).toBeInTheDocument()
    })

    it('hides indicator when high contrast is disabled', () => {
      window.matchMedia = jest.fn().mockImplementation(mockMatchMedia)

      render(<HighContrastIndicator />)
      expect(screen.queryByText('High Contrast Mode')).not.toBeInTheDocument()
    })
  })

  describe('Reduced Motion Support', () => {
    it('shows reduced motion indicator when enabled', () => {
      // Mock reduced motion media query
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        ...mockMatchMedia(query),
        matches: query === '(prefers-reduced-motion: reduce)'
      }))

      render(<ReducedMotionIndicator />)
      expect(screen.getByText('Reduced Motion')).toBeInTheDocument()
    })

    it('hides indicator when reduced motion is disabled', () => {
      window.matchMedia = jest.fn().mockImplementation(mockMatchMedia)

      render(<ReducedMotionIndicator />)
      expect(screen.queryByText('Reduced Motion')).not.toBeInTheDocument()
    })
  })

  describe('useChartAccessibility Hook', () => {
    const TestComponent = ({ chartType, data }: { chartType: string, data: any[] }) => {
      const {
        isHighContrast,
        prefersReducedMotion,
        animationConfig,
        chartDescription
      } = useChartAccessibility(chartType, data)

      return (
        <div>
          <span data-testid="high-contrast">{isHighContrast.toString()}</span>
          <span data-testid="reduced-motion">{prefersReducedMotion.toString()}</span>
          <span data-testid="animation-duration">{animationConfig.chartAnimation.animationDuration}</span>
          <span data-testid="chart-description">{chartDescription}</span>
        </div>
      )
    }

    it('returns correct accessibility states', () => {
      render(<TestComponent chartType="revenue" data={mockRevenueData} />)

      expect(screen.getByTestId('high-contrast')).toHaveTextContent('false')
      expect(screen.getByTestId('reduced-motion')).toHaveTextContent('false')
      expect(screen.getByTestId('animation-duration')).toHaveTextContent('1200')
      expect(screen.getByTestId('chart-description')).toHaveTextContent(/revenue chart with 3 data points/)
    })

    it('adapts to reduced motion preference', () => {
      // Mock reduced motion preference
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        ...mockMatchMedia(query),
        matches: query === '(prefers-reduced-motion: reduce)'
      }))

      render(<TestComponent chartType="revenue" data={mockRevenueData} />)

      expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true')
      expect(screen.getByTestId('animation-duration')).toHaveTextContent('0')
    })
  })

  describe('Keyboard Navigation', () => {
    it('handles Alt+T for table toggle', async () => {
      const user = userEvent.setup()
      
      render(
        <AccessibleChartWrapper
          title="Test Chart"
          chartType="revenue"
          data={mockRevenueData}
          showDataTable={true}
        >
          <div>Chart content</div>
        </AccessibleChartWrapper>
      )

      // Focus on the chart container
      const chartContainer = screen.getByRole('img')
      chartContainer.focus()

      // Press Alt+T
      await user.keyboard('{Alt>}t{/Alt}')

      // Should toggle to table view
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument()
      })
    })

    it('handles arrow key navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <AccessibleChartWrapper
          title="Test Chart"
          chartType="revenue"
          data={mockRevenueData}
        >
          <div>Chart content</div>
        </AccessibleChartWrapper>
      )

      const chartContainer = screen.getByRole('img')
      chartContainer.focus()

      // Test arrow key navigation
      await user.keyboard('{ArrowRight}')
      await user.keyboard('{ArrowLeft}')
      await user.keyboard('{Home}')
      await user.keyboard('{End}')

      // Navigation should be handled without errors
    })
  })

  describe('Screen Reader Support', () => {
    it('provides comprehensive chart descriptions', () => {
      render(
        <AccessibleChartWrapper
          title="Revenue Chart"
          description="Monthly revenue data"
          chartType="revenue"
          data={mockRevenueData}
          additionalAriaInfo="Current revenue is $61,000 with positive growth"
        >
          <div>Chart content</div>
        </AccessibleChartWrapper>
      )

      // Check for screen reader content
      expect(screen.getByText(/Current revenue is \$61,000 with positive growth/)).toBeInTheDocument()
    })

    it('announces chart updates', () => {
      // This would require more complex testing setup to verify live region announcements
      // For now, we verify the structure is in place
      render(
        <AccessibleChartWrapper
          title="Test Chart"
          chartType="revenue"
          data={mockRevenueData}
        >
          <div>Chart content</div>
        </AccessibleChartWrapper>
      )

      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })
})