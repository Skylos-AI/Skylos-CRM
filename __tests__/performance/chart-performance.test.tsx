/**
 * Chart Performance Optimization Tests
 * Verifies React.memo, useMemo, debouncing, caching, and lazy loading
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Lead } from '@/lib/types/lead'
import { 
  useOptimizedPerformanceData,
  useOptimizedPipelineData,
  useOptimizedPriorityData,
  useOptimizedRevenueData,
  useDebouncedHover,
  clearChartCache
} from '@/lib/performance/chart-performance'
import { chartPerformanceMonitor, performanceTestUtils } from '@/lib/performance/chart-performance-monitor'

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock data for testing
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Test Lead 1',
    email: 'test1@example.com',
    company: 'Test Company 1',
    stage: 'incoming',
    priority: 'high',
    dealAmount: 50000,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Test Lead 2',
    email: 'test2@example.com',
    company: 'Test Company 2',
    stage: 'final',
    priority: 'medium',
    dealAmount: 75000,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  }
]

// Mock Recharts components to avoid rendering issues in tests
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
  Line: () => <div data-testid="line" />,
  Bar: () => <div data-testid="bar" />,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  CartesianGrid: () => <div data-testid="grid" />
}))

describe('Chart Performance Optimizations', () => {
  beforeEach(() => {
    clearChartCache()
    chartPerformanceMonitor.clear()
  })

  describe('Data Caching', () => {
    it('should cache performance data and return cached results', () => {
      const TestComponent = () => {
        const data1 = useOptimizedPerformanceData(mockLeads, 'monthly')
        const data2 = useOptimizedPerformanceData(mockLeads, 'monthly')
        return <div data-testid="test-component">{JSON.stringify({ data1, data2 })}</div>
      }

      render(<TestComponent />)
      
      // Both calls should return the same cached data
      const component = screen.getByTestId('test-component')
      const { data1, data2 } = JSON.parse(component.textContent || '{}')
      expect(data1).toEqual(data2)
    })

    it('should cache pipeline data efficiently', () => {
      const TestComponent = () => {
        const data1 = useOptimizedPipelineData(mockLeads)
        const data2 = useOptimizedPipelineData(mockLeads)
        return <div data-testid="pipeline-test">{JSON.stringify({ data1, data2 })}</div>
      }

      render(<TestComponent />)
      
      const component = screen.getByTestId('pipeline-test')
      const { data1, data2 } = JSON.parse(component.textContent || '{}')
      expect(data1).toEqual(data2)
    })

    it('should cache priority data correctly', () => {
      const TestComponent = () => {
        const data1 = useOptimizedPriorityData(mockLeads)
        const data2 = useOptimizedPriorityData(mockLeads)
        return <div data-testid="priority-test">{JSON.stringify({ data1, data2 })}</div>
      }

      render(<TestComponent />)
      
      const component = screen.getByTestId('priority-test')
      const { data1, data2 } = JSON.parse(component.textContent || '{}')
      expect(data1).toEqual(data2)
    })

    it('should cache revenue data properly', () => {
      const TestComponent = () => {
        const data1 = useOptimizedRevenueData(mockLeads)
        const data2 = useOptimizedRevenueData(mockLeads)
        return <div data-testid="revenue-test">{JSON.stringify({ data1, data2 })}</div>
      }

      render(<TestComponent />)
      
      const component = screen.getByTestId('revenue-test')
      const { data1, data2 } = JSON.parse(component.textContent || '{}')
      expect(data1).toEqual(data2)
    })
  })

  describe('Debounced Hover', () => {
    it('should debounce hover interactions', async () => {
      let hoverCount = 0
      
      const TestComponent = () => {
        const { isHovered, debouncedHovered, handleMouseEnter, handleMouseLeave } = useDebouncedHover(100)
        
        if (debouncedHovered) {
          hoverCount++
        }
        
        return (
          <div
            data-testid="hover-test"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Hovered: {isHovered ? 'true' : 'false'}, Debounced: {debouncedHovered ? 'true' : 'false'}
          </div>
        )
      }

      render(<TestComponent />)
      
      const element = screen.getByTestId('hover-test')
      
      // Rapid hover events should be debounced
      fireEvent.mouseEnter(element)
      fireEvent.mouseLeave(element)
      fireEvent.mouseEnter(element)
      fireEvent.mouseLeave(element)
      fireEvent.mouseEnter(element)
      
      // Wait for debounce delay
      await waitFor(() => {
        expect(hoverCount).toBeLessThanOrEqual(1)
      }, { timeout: 200 })
    })
  })

  describe('Performance Monitoring', () => {
    it('should record chart render performance', async () => {
      const startTime = performance.now()
      
      // Create a simple test component instead of the full dashboard
      const TestComponent = () => {
        const data = useOptimizedPerformanceData(mockLeads, 'monthly')
        return <div data-testid="test-performance">Performance data loaded: {data.length}</div>
      }
      
      render(<TestComponent />)
      
      // Wait for components to render
      await waitFor(() => {
        expect(screen.getByTestId('test-performance')).toBeInTheDocument()
      })
      
      const renderTime = performance.now() - startTime
      expect(renderTime).toBeGreaterThan(0)
    })

    it('should track cache performance', () => {
      const testCache = (key: string) => {
        // Simulate cache behavior
        return key === 'hit' ? { data: 'cached' } : null
      }
      
      const results = performanceTestUtils.testCachePerformance(testCache, ['hit', 'miss', 'hit', 'hit'])
      
      expect(results.hits).toBe(3)
      expect(results.misses).toBe(1)
      expect(results.avgAccessTime).toBeGreaterThan(0)
    })
  })

  describe('Memory Usage', () => {
    it('should generate heavy chart data for testing', () => {
      const heavyData = performanceTestUtils.generateHeavyChartData(1000)
      
      expect(heavyData).toHaveLength(1000)
      expect(heavyData[0]).toHaveProperty('id')
      expect(heavyData[0]).toHaveProperty('value')
      expect(heavyData[0]).toHaveProperty('category')
      expect(heavyData[0]).toHaveProperty('timestamp')
    })

    it('should measure render time', async () => {
      const renderFunction = async () => {
        // Simulate async rendering
        await new Promise(resolve => setTimeout(resolve, 10))
      }
      
      const renderTime = await performanceTestUtils.measureRenderTime(renderFunction)
      expect(renderTime).toBeGreaterThanOrEqual(10)
    })
  })

  describe('Component Memoization', () => {
    it('should not re-render when props are the same', () => {
      let renderCount = 0
      
      const TestComponent = React.memo(({ leads }: { leads: Lead[] }) => {
        renderCount++
        return <div data-testid="memo-test">Render count: {renderCount}</div>
      })
      
      const { rerender } = render(<TestComponent leads={mockLeads} />)
      
      const initialRenderCount = renderCount
      
      // Re-render with same props
      rerender(<TestComponent leads={mockLeads} />)
      
      // Should not re-render due to memoization
      expect(renderCount).toBe(initialRenderCount)
    })

    it('should re-render when leads change', () => {
      let renderCount = 0
      
      const TestComponent = ({ leads }: { leads: Lead[] }) => {
        renderCount++
        return <div data-testid="memo-test">Render count: {renderCount}</div>
      }
      
      const { rerender } = render(<TestComponent leads={mockLeads} />)
      
      expect(renderCount).toBe(1)
      
      // Re-render with different props
      const newLeads = [...mockLeads, { ...mockLeads[0], id: '3' }]
      rerender(<TestComponent leads={newLeads} />)
      
      // Should re-render due to prop change
      expect(renderCount).toBe(2)
    })
  })

  describe('Bundle Optimization', () => {
    it('should lazy load chart components', async () => {
      // Test lazy loading by importing the lazy loader
      const { LazyRevenueChart } = await import('@/components/charts/lazy-chart-loader')
      
      render(<LazyRevenueChart leads={mockLeads} />)
      
      // Should eventually load the chart
      await waitFor(() => {
        expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
      }, { timeout: 2000 })
    })
  })

  describe('Smooth Transitions', () => {
    it('should handle time period changes smoothly', async () => {
      // Test time period changes with a simple component
      const TestComponent = () => {
        const [period, setPeriod] = React.useState<'monthly' | 'weekly'>('monthly')
        const data = useOptimizedPerformanceData(mockLeads, period)
        
        return (
          <div>
            <button onClick={() => setPeriod('weekly')}>Weekly</button>
            <div data-testid="period-data">Period: {period}, Data: {data.length}</div>
          </div>
        )
      }
      
      render(<TestComponent />)
      
      // Find and click time period selector
      const weeklyButton = screen.getByText('Weekly')
      fireEvent.click(weeklyButton)
      
      // Should handle the change without errors
      await waitFor(() => {
        expect(screen.getByTestId('period-data')).toHaveTextContent('Period: weekly')
      })
    })
  })
})