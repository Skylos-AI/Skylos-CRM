"use client"

import React from 'react'
import { CHART_COLORS, SMOOTH_STYLES, chartUtils } from "@/lib/charts/smooth-chart-styles"

/**
 * Smooth Tooltip Component
 * 
 * Clean, minimalist tooltip for chart interactions
 * with smooth animations and monochromatic styling.
 */

interface SmoothTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  type?: 'revenue' | 'performance' | 'pipeline' | 'priority'
}

export function SmoothTooltip({ active, payload, label, type = 'revenue' }: SmoothTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 min-w-[160px]"
      style={{
        boxShadow: SMOOTH_STYLES.shadows.medium,
        borderRadius: SMOOTH_STYLES.borderRadius.medium,
      }}
    >
      {/* Tooltip header with period/label */}
      {label && (
        <div className="mb-2 pb-2 border-b border-gray-100">
          <p 
            className="font-medium text-black text-sm"
            style={{ color: CHART_COLORS.black }}
          >
            {label}
          </p>
        </div>
      )}
      
      {/* Tooltip content based on chart type */}
      <div className="space-y-1">
        {type === 'revenue' && <RevenueTooltipContent payload={payload} />}
        {type === 'performance' && <PerformanceTooltipContent payload={payload} />}
        {type === 'pipeline' && <PipelineTooltipContent payload={payload} />}
        {type === 'priority' && <PriorityTooltipContent payload={payload} />}
      </div>
    </div>
  )
}

/**
 * Revenue Tooltip Content
 */
function RevenueTooltipContent({ payload }: { payload: any[] }) {
  const data = payload[0]?.payload
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Revenue</span>
        <span className="font-semibold text-black text-sm">
          {chartUtils.formatCurrency(data?.revenue || 0)}
        </span>
      </div>
      
      {data?.growth !== undefined && (
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs">Growth</span>
          <span 
            className={`text-xs font-medium ${
              data.growth > 0 ? 'text-gray-700' : 
              data.growth < 0 ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {data.growth > 0 ? '+' : ''}{chartUtils.formatPercentage(data.growth)}
          </span>
        </div>
      )}
    </div>
  )
}

/**
 * Performance Tooltip Content
 */
function PerformanceTooltipContent({ payload }: { payload: any[] }) {
  const data = payload[0]?.payload
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Leads</span>
        <span className="font-semibold text-black text-sm">
          {data?.leads || 0}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Deals</span>
        <span className="font-semibold text-black text-sm">
          {data?.deals || 0}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Conversion</span>
        <span className="font-semibold text-black text-sm">
          {chartUtils.formatPercentage(data?.conversion || 0)}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Revenue</span>
        <span className="font-semibold text-black text-sm">
          {chartUtils.formatCurrency(data?.revenue || 0)}
        </span>
      </div>
    </div>
  )
}

/**
 * Pipeline Tooltip Content
 */
function PipelineTooltipContent({ payload }: { payload: any[] }) {
  const data = payload[0]?.payload
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Stage</span>
        <span className="font-semibold text-black text-sm">
          {data?.stage}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Count</span>
        <span className="font-semibold text-black text-sm">
          {data?.count || 0}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Value</span>
        <span className="font-semibold text-black text-sm">
          {chartUtils.formatCurrency(data?.value || 0)}
        </span>
      </div>
      
      {data?.percentage !== undefined && (
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs">Percentage</span>
          <span className="font-semibold text-black text-sm">
            {chartUtils.formatPercentage(data.percentage)}
          </span>
        </div>
      )}
    </div>
  )
}

/**
 * Priority Tooltip Content
 */
function PriorityTooltipContent({ payload }: { payload: any[] }) {
  const data = payload[0]?.payload
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Priority</span>
        <span className="font-semibold text-black text-sm capitalize">
          {data?.priority}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Count</span>
        <span className="font-semibold text-black text-sm">
          {data?.count || 0}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Percentage</span>
        <span className="font-semibold text-black text-sm">
          {chartUtils.formatPercentage(data?.percentage || 0)}
        </span>
      </div>
    </div>
  )
}

/**
 * Custom Tooltip Cursor
 * Smooth, subtle cursor for chart interactions
 */
export function SmoothTooltipCursor() {
  return (
    <div 
      className="opacity-20"
      style={{
        stroke: CHART_COLORS.grey[300],
        strokeWidth: 1,
        strokeDasharray: '4 4',
        fill: 'transparent',
      }}
    />
  )
}