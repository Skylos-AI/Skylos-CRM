"use client"

import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Signal, SignalHigh, SignalLow, SignalMedium } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConnectionStatusProps {
  quality: 'excellent' | 'good' | 'poor' | 'disconnected'
  className?: string
}

export function ConnectionStatus({ quality, className }: ConnectionStatusProps) {
  const getStatusConfig = () => {
    switch (quality) {
      case 'excellent':
        return {
          icon: <SignalHigh className="h-3 w-3" />,
          label: 'Excellent',
          color: 'text-green-500',
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800'
        }
      case 'good':
        return {
          icon: <SignalMedium className="h-3 w-3" />,
          label: 'Good',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800'
        }
      case 'poor':
        return {
          icon: <SignalLow className="h-3 w-3" />,
          label: 'Poor',
          color: 'text-red-500',
          bgColor: 'bg-red-100 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800'
        }
      case 'disconnected':
        return {
          icon: <WifiOff className="h-3 w-3" />,
          label: 'Disconnected',
          color: 'text-gray-500',
          bgColor: 'bg-gray-100 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800'
        }
    }
  }

  const config = getStatusConfig()

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "flex items-center space-x-1 text-xs",
        config.color,
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      {config.icon}
      <span>{config.label}</span>
    </Badge>
  )
}