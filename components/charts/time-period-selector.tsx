"use client"

import { useState } from "react"

export type TimePeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly'

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod
  onPeriodChange: (period: TimePeriod) => void
  className?: string
}

const TIME_PERIODS: { value: TimePeriod; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' }
]

export function TimePeriodSelector({ selectedPeriod, onPeriodChange, className = "" }: TimePeriodSelectorProps) {
  return (
    <div className={`inline-flex rounded-xl bg-gray-50 p-1 ${className}`}>
      {TIME_PERIODS.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ease-out
            ${selectedPeriod === period.value
              ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
            }
          `}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}