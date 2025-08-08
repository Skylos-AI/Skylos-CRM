"use client"

import { ReactNode, useState, useEffect, useCallback } from "react"
import { ChartLoadingSkeletonCard, ChartErrorState, ChartEmptyState } from "./chart-loading-skeleton"

interface SmoothChartWrapperProps {
  children: ReactNode
  loading?: boolean
  error?: string | null
  isEmpty?: boolean
  height?: number
  showHeader?: boolean
  showStats?: boolean
  className?: string
  onRetry?: () => void
  emptyTitle?: string
  emptyMessage?: string
  emptyActionText?: string
  onEmptyAction?: () => void
}

export function SmoothChartWrapper({
  children,
  loading = false,
  error = null,
  isEmpty = false,
  height = 300,
  showHeader = true,
  showStats = false,
  className = "",
  onRetry,
  emptyTitle,
  emptyMessage,
  emptyActionText,
  onEmptyAction
}: SmoothChartWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!loading && !error && !isEmpty) {
      // Smooth fade-in animation
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [loading, error, isEmpty])

  // Loading state
  if (loading) {
    return (
      <ChartLoadingSkeletonCard
        height={height}
        showHeader={showHeader}
        showStats={showStats}
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

  // Chart content with smooth fade-in
  return (
    <div 
      className={`transition-opacity duration-500 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Hook for managing chart loading states with performance optimizations
export function useChartState<T>(
  dataFetcher: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await dataFetcher()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [dataFetcher])

  useEffect(() => {
    fetchData()
  }, dependencies)

  const retry = useCallback(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    retry,
    isEmpty: !loading && !error && (!data || (Array.isArray(data) && data.length === 0))
  }
}