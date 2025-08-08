"use client"

import { ReactNode, useRef, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useChartAccessibility, chartAriaLabels, focusManagement, screenReaderSupport } from "@/lib/accessibility/chart-accessibility"
import { ChartLoadingSkeletonCard, ChartErrorState, ChartEmptyState } from "./chart-loading-skeleton"

interface AccessibleChartWrapperProps {
  children: ReactNode
  title: string
  description?: string
  chartType: 'revenue' | 'pipeline' | 'priority' | 'performance'
  data: any[]
  loading?: boolean
  error?: string | null
  isEmpty?: boolean
  height?: number
  className?: string
  onRetry?: () => void
  emptyTitle?: string
  emptyMessage?: string
  emptyActionText?: string
  onEmptyAction?: () => void
  additionalAriaInfo?: string
  showDataTable?: boolean
}

export function AccessibleChartWrapper({
  children,
  title,
  description,
  chartType,
  data,
  loading = false,
  error = null,
  isEmpty = false,
  height = 300,
  className = "",
  onRetry,
  emptyTitle,
  emptyMessage,
  emptyActionText,
  onEmptyAction,
  additionalAriaInfo,
  showDataTable = false
}: AccessibleChartWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [showAlternativeView, setShowAlternativeView] = useState(false)

  // Get accessibility configuration
  const {
    isHighContrast,
    prefersReducedMotion,
    highContrastStyles,
    animationConfig,
    focusRingStyles,
    chartDescription
  } = useChartAccessibility(chartType, data)

  // Generate ARIA labels based on chart type
  const getAriaLabels = () => {
    switch (chartType) {
      case 'revenue':
        return chartAriaLabels.revenueChart(data, data[data.length - 1]?.revenue || 0, data[data.length - 1]?.growth || 0)
      case 'pipeline':
        return chartAriaLabels.pipelineChart(data)
      case 'priority':
        const total = data.reduce((sum, item) => sum + item.value, 0)
        return chartAriaLabels.priorityChart(data, total)
      case 'performance':
        return chartAriaLabels.performanceChart(data, 'monthly')
      default:
        return {
          chartLabel: `${chartType} chart`,
          chartDescription: `Chart showing ${data.length} data points`,
          summaryLabel: `Chart summary with ${data.length} data points`
        }
    }
  }

  const ariaLabels = getAriaLabels()

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return

      // Toggle data table view
      if (e.key === 't' && e.altKey) {
        e.preventDefault()
        setShowAlternativeView(!showAlternativeView)
        screenReaderSupport.announceChartUpdate(
          showAlternativeView ? 'Switched to chart view' : 'Switched to data table view'
        )
        return
      }

      // Navigate chart data points
      if (data.length > 0) {
        focusManagement.handleChartKeyNavigation(e, data.length, focusedIndex, (newIndex) => {
          setFocusedIndex(newIndex)
          const dataPoint = data[newIndex]
          if (dataPoint && ariaLabels.dataPointLabel) {
            screenReaderSupport.announceChartUpdate(
              typeof ariaLabels.dataPointLabel === 'function' 
                ? ariaLabels.dataPointLabel(dataPoint, newIndex)
                : ariaLabels.dataPointLabel
            )
          }
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [data, focusedIndex, showAlternativeView, ariaLabels])

  // Smooth fade-in animation (respecting reduced motion)
  useEffect(() => {
    if (!loading && !error && !isEmpty) {
      const timer = setTimeout(() => setIsVisible(true), prefersReducedMotion ? 0 : 100)
      return () => clearTimeout(timer)
    }
  }, [loading, error, isEmpty, prefersReducedMotion])

  // Loading state
  if (loading) {
    return (
      <ChartLoadingSkeletonCard
        height={height}
        showHeader={true}
        showStats={false}
        className={className}
      />
    )
  }

  // Error state
  if (error) {
    return (
      <ChartErrorState
        message={error}
        onRetry={onRetry}
        className={className}
      />
    )
  }

  // Empty state
  if (isEmpty) {
    return (
      <ChartEmptyState
        title={emptyTitle}
        message={emptyMessage}
        actionText={emptyActionText}
        onAction={onEmptyAction}
        className={className}
      />
    )
  }

  // Generate data table for screen readers
  const dataTable = showDataTable ? screenReaderSupport.generateDataTable(
    data,
    Object.keys(data[0] || {})
  ) : null

  return (
    <div 
      ref={containerRef}
      className={`transition-opacity ${prefersReducedMotion ? 'duration-0' : 'duration-500'} ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={highContrastStyles}
    >
      <Card className="bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50 relative overflow-hidden focus-within:ring-2 focus-within:ring-black">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle 
                className="text-lg font-semibold text-gray-900 mb-2"
                id={`chart-title-${chartType}`}
              >
                {title}
              </CardTitle>
              {description && (
                <CardDescription 
                  className="text-gray-600"
                  id={`chart-desc-${chartType}`}
                >
                  {description}
                </CardDescription>
              )}
            </div>
            
            {/* Accessibility controls */}
            <div className="flex items-center space-x-2">
              {showDataTable && (
                <button
                  onClick={() => {
                    setShowAlternativeView(!showAlternativeView)
                    screenReaderSupport.announceChartUpdate(
                      showAlternativeView ? 'Switched to chart view' : 'Switched to data table view'
                    )
                  }}
                  className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
                  style={focusRingStyles}
                  aria-label={showAlternativeView ? 'Switch to chart view' : 'Switch to data table view'}
                >
                  {showAlternativeView ? 'Chart' : 'Table'}
                </button>
              )}
              
              {isHighContrast && (
                <span className="px-2 py-1 text-xs font-medium text-black bg-white border border-black rounded-full">
                  High Contrast
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Chart or Data Table View */}
          {showAlternativeView && dataTable ? (
            <div 
              className="overflow-x-auto"
              role="table"
              aria-label={dataTable.caption}
            >
              <table className="w-full text-sm">
                <caption className="sr-only">{dataTable.caption}</caption>
                <thead>
                  <tr className="border-b border-gray-200">
                    {dataTable.headers.map((header, index) => (
                      <th 
                        key={index}
                        className="px-3 py-2 text-left font-medium text-gray-900 capitalize"
                        scope="col"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataTable.rows.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex}
                      className={`border-b border-gray-100 ${
                        focusedIndex === rowIndex ? 'bg-gray-50' : ''
                      }`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td 
                          key={cellIndex}
                          className="px-3 py-2 text-gray-700"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              role="img"
              aria-labelledby={`chart-title-${chartType}`}
              aria-describedby={`chart-desc-${chartType} chart-summary-${chartType}`}
              tabIndex={0}
              className="focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg"
              style={{
                ...focusRingStyles,
                outline: 'none'
              }}
              onFocus={() => {
                screenReaderSupport.announceChartUpdate(ariaLabels.chartDescription)
              }}
            >
              {children}
            </div>
          )}
          
          {/* Hidden summary for screen readers */}
          <div 
            id={`chart-summary-${chartType}`}
            className="sr-only"
            aria-live="polite"
          >
            {ariaLabels.summaryLabel}
            {additionalAriaInfo && ` ${additionalAriaInfo}`}
          </div>
          
          {/* Keyboard navigation instructions */}
          <div className="sr-only">
            Use arrow keys to navigate data points. Press Alt+T to toggle between chart and table view.
            {data.length > 0 && ' Press Home to go to first data point, End to go to last data point.'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for managing accessible chart interactions
export function useAccessibleChart(data: any[], chartType: string) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [announceUpdates, setAnnounceUpdates] = useState(true)
  
  const handleDataPointFocus = (index: number) => {
    setFocusedIndex(index)
    if (announceUpdates && data[index]) {
      const dataPoint = data[index]
      const message = `Data point ${index + 1} of ${data.length}: ${JSON.stringify(dataPoint)}`
      screenReaderSupport.announceChartUpdate(message)
    }
  }
  
  const handleChartUpdate = (newData: any[]) => {
    if (announceUpdates) {
      screenReaderSupport.announceChartUpdate(
        `Chart updated with ${newData.length} data points`
      )
    }
  }
  
  return {
    focusedIndex,
    setFocusedIndex,
    handleDataPointFocus,
    handleChartUpdate,
    announceUpdates,
    setAnnounceUpdates
  }
}