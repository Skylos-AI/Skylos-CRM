"use client"

interface CircularProgressProps {
  size?: number
  strokeWidth?: number
  progress?: number
  className?: string
  showPercentage?: boolean
}

export function CircularProgress({
  size = 40,
  strokeWidth = 3,
  progress,
  className = "",
  showPercentage = false
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = progress !== undefined 
    ? circumference - (progress / 100) * circumference 
    : 0

  if (progress === undefined) {
    // Indeterminate spinner
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg
          width={size}
          height={size}
          className="animate-spin"
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-25"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.75}
            className="opacity-75"
            strokeLinecap="round"
          />
        </svg>
      </div>
    )
  }

  // Determinate progress
  return (
    <div className={`inline-flex items-center justify-center relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-25"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="opacity-75 transition-all duration-300 ease-out"
          strokeLinecap="round"
        />
      </svg>
      {showPercentage && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  )
}

export function ChartLoadingIndicator({ 
  message = "Loading...",
  className = ""
}: {
  message?: string
  className?: string
}) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <CircularProgress size={32} className="text-gray-400" />
      <p className="text-sm text-gray-500 font-medium">{message}</p>
    </div>
  )
}