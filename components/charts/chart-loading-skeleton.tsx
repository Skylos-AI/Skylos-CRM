"use client"

interface ChartLoadingSkeletonProps {
  height?: number
  showHeader?: boolean
  showStats?: boolean
  className?: string
}

export function ChartLoadingSkeletonCard({ 
  height = 300, 
  showHeader = true, 
  showStats = false,
  className = ""
}: ChartLoadingSkeletonProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50 animate-pulse ${className}`}>
      {showHeader && (
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded-lg w-32"></div>
              <div className="h-3 bg-gray-100 rounded-lg w-48"></div>
            </div>
            <div className="h-8 bg-gray-100 rounded-xl w-24"></div>
          </div>
        </div>
      )}
      
      <div className="px-6 pb-6">
        <div 
          className="bg-gray-50 rounded-xl flex items-center justify-center"
          style={{ height: `${height}px` }}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <div className="text-sm text-gray-500 font-medium">Loading chart...</div>
          </div>
        </div>
        
        {showStats && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
                  <div className="h-3 bg-gray-100 rounded w-20 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function ChartErrorState({ 
  title = "Unable to load chart",
  message = "There was an error loading the chart data. Please try again.",
  onRetry,
  className = ""
}: {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50 ${className}`}>
      <div className="p-6">
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 max-w-sm">{message}</p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function ChartEmptyState({
  title = "No data available",
  message = "There's no data to display for this chart yet.",
  actionText,
  onAction,
  className = ""
}: {
  title?: string
  message?: string
  actionText?: string
  onAction?: () => void
  className?: string
}) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50 ${className}`}>
      <div className="p-6">
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 max-w-sm">{message}</p>
          </div>
          {actionText && onAction && (
            <button
              onClick={onAction}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}