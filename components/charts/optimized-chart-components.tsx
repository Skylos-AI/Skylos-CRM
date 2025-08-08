/**
 * Optimized Chart Components with React.memo and performance enhancements
 * Implements smooth rendering with debounced interactions and efficient re-renders
 */

"use client"

import React, { memo, useMemo, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lead } from "@/lib/types/lead"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts"
import { TimePeriodSelector, TimePeriod } from "@/components/charts/time-period-selector"
import { formatValue } from "@/lib/charts/chart-utils"
import { 
  useOptimizedPerformanceData,
  useOptimizedPipelineData,
  useOptimizedPriorityData,
  useOptimizedRevenueData,
  useDebouncedHover,
  useChartPerformance,
  smoothAnimationConfig
} from "@/lib/performance/chart-performance"
import { SmoothChartWrapper } from "./smooth-chart-wrapper"

// Optimized Revenue Chart Component
interface OptimizedRevenueChartProps {
  leads: Lead[]
  loading?: boolean
  className?: string
}

export const OptimizedRevenueChart = memo<OptimizedRevenueChartProps>(({ 
  leads, 
  loading = false, 
  className = "" 
}) => {
  useChartPerformance('RevenueChart')
  
  const revenueData = useOptimizedRevenueData(leads)
  const { debouncedHovered, handleMouseEnter, handleMouseLeave } = useDebouncedHover(150)
  
  // Memoized calculations
  const { currentRevenue, revenueGrowth, totalRevenue, growthMonths } = useMemo(() => {
    const current = revenueData[revenueData.length - 1]?.revenue || 0
    const previous = revenueData[revenueData.length - 2]?.revenue || 0
    const growth = previous > 0 ? ((current - previous) / previous * 100) : 0
    const total = revenueData.reduce((sum, item) => sum + item.revenue, 0)
    const positiveGrowthMonths = revenueData.filter(d => d.growth > 0).length
    
    return {
      currentRevenue: current,
      revenueGrowth: growth,
      totalRevenue: total,
      growthMonths: positiveGrowthMonths
    }
  }, [revenueData])

  // Memoized tooltip formatter
  const tooltipFormatter = useCallback((value: number, name: string) => [
    `$${value.toLocaleString()}`, 
    'Revenue'
  ], [])

  // Memoized label formatter
  const labelFormatter = useCallback((label: string) => `${label} 2024`, [])

  return (
    <SmoothChartWrapper
      loading={loading}
      isEmpty={revenueData.length === 0}
      className={className}
      height={320}
    >
      <Card 
        className="bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50 relative overflow-hidden transition-all duration-300 ease-out hover:shadow-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Revenue Trend</CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                Monthly revenue growth and performance tracking
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ${currentRevenue.toLocaleString()}
              </div>
              <div className={`text-sm font-medium flex items-center justify-end ${
                revenueGrowth >= 0 ? 'text-gray-600' : 'text-gray-500'
              }`}>
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  revenueGrowth >= 0 ? 'bg-gray-400' : 'bg-gray-300'
                }`}></span>
                {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}% vs last month
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={320} className="chart-container">
            <AreaChart 
              data={revenueData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="smoothRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f3f4f6" stopOpacity={0.6}/>
                  <stop offset="50%" stopColor="#f3f4f6" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#f3f4f6" stopOpacity={0.05}/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
                tickMargin={15}
              />
              
              <YAxis hide />
              
              <Tooltip 
                formatter={tooltipFormatter}
                labelFormatter={labelFormatter}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                cursor={{
                  stroke: '#e5e7eb',
                  strokeWidth: 1,
                  strokeDasharray: '4 4'
                }}
              />
              
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#000000" 
                strokeWidth={3}
                fill="url(#smoothRevenueGradient)"
                dot={{ 
                  fill: '#000000', 
                  strokeWidth: 0, 
                  r: 6,
                  filter: 'url(#glow)'
                }}
                activeDot={{ 
                  r: 8, 
                  fill: '#000000',
                  stroke: 'white',
                  strokeWidth: 3,
                  filter: 'url(#glow)'
                }}
                animationDuration={smoothAnimationConfig.duration}
                animationEasing={smoothAnimationConfig.easing}
              />
            </AreaChart>
          </ResponsiveContainer>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  ${Math.round(totalRevenue / revenueData.length).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-medium">Avg Monthly</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {growthMonths}/{revenueData.length}
                </div>
                <div className="text-xs text-gray-500 font-medium">Growth Months</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SmoothChartWrapper>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for memo optimization
  return (
    prevProps.leads.length === nextProps.leads.length &&
    prevProps.loading === nextProps.loading &&
    prevProps.className === nextProps.className &&
    prevProps.leads.every((lead, index) => 
      lead.id === nextProps.leads[index]?.id &&
      lead.dealAmount === nextProps.leads[index]?.dealAmount &&
      lead.stage === nextProps.leads[index]?.stage
    )
  )
})

OptimizedRevenueChart.displayName = 'OptimizedRevenueChart'

// Optimized Performance Chart Component
interface OptimizedPerformanceChartProps {
  leads: Lead[]
  selectedTimePeriod: TimePeriod
  onTimePeriodChange: (period: TimePeriod) => void
  loading?: boolean
  className?: string
}

export const OptimizedPerformanceChart = memo<OptimizedPerformanceChartProps>(({ 
  leads, 
  selectedTimePeriod, 
  onTimePeriodChange, 
  loading = false, 
  className = "" 
}) => {
  useChartPerformance('PerformanceChart')
  
  const performanceData = useOptimizedPerformanceData(leads, selectedTimePeriod)
  const { debouncedHovered, handleMouseEnter, handleMouseLeave } = useDebouncedHover(150)
  
  // Memoized summary calculations
  const { totalLeads, totalDeals, avgConversion } = useMemo(() => ({
    totalLeads: performanceData.reduce((sum, item) => sum + item.leads, 0),
    totalDeals: performanceData.reduce((sum, item) => sum + item.deals, 0),
    avgConversion: performanceData.length > 0 
      ? performanceData.reduce((sum, item) => sum + item.conversion, 0) / performanceData.length 
      : 0
  }), [performanceData])

  // Memoized tooltip formatter
  const tooltipFormatter = useCallback((value: number, name: string) => {
    switch (name) {
      case 'Leads':
        return [formatValue(value, 'number'), 'Leads']
      case 'Deals':
        return [formatValue(value, 'number'), 'Deals']
      case 'Conversion':
        return [formatValue(value, 'percentage'), 'Conversion Rate']
      default:
        return [value, name]
    }
  }, [])

  return (
    <SmoothChartWrapper
      loading={loading}
      isEmpty={performanceData.length === 0}
      className={className}
      height={300}
    >
      <Card 
        className="bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50 transition-all duration-300 ease-out hover:shadow-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Performance Overview</CardTitle>
              <CardDescription className="text-gray-600">
                Leads, deals, and conversion trends across time periods
              </CardDescription>
            </div>
            <TimePeriodSelector
              selectedPeriod={selectedTimePeriod}
              onPeriodChange={onTimePeriodChange}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300} className="chart-container">
            <LineChart 
              data={performanceData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <defs>
                <filter id="performanceGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <XAxis 
                dataKey="period" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }}
                tickMargin={15}
              />
              
              <YAxis hide />
              
              <Tooltip 
                formatter={tooltipFormatter}
                labelFormatter={(label) => `${label} ${selectedTimePeriod === 'yearly' ? '' : '2024'}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                cursor={{
                  stroke: '#e5e7eb',
                  strokeWidth: 1,
                  strokeDasharray: '4 4'
                }}
              />
              
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#d1d5db" 
                strokeWidth={1}
                name="Leads"
                dot={{ fill: '#d1d5db', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#d1d5db', stroke: 'white', strokeWidth: 2 }}
                animationDuration={smoothAnimationConfig.duration}
                animationEasing={smoothAnimationConfig.easing}
              />
              
              <Line 
                type="monotone" 
                dataKey="deals" 
                stroke="#9ca3af" 
                strokeWidth={2}
                name="Deals"
                dot={{ fill: '#9ca3af', strokeWidth: 0, r: 5 }}
                activeDot={{ r: 7, fill: '#9ca3af', stroke: 'white', strokeWidth: 2 }}
                animationDuration={smoothAnimationConfig.duration}
                animationEasing={smoothAnimationConfig.easing}
              />
              
              <Line 
                type="monotone" 
                dataKey="conversion" 
                stroke="#000000" 
                strokeWidth={3}
                name="Conversion"
                dot={{ fill: '#000000', strokeWidth: 0, r: 6, filter: 'url(#performanceGlow)' }}
                activeDot={{ r: 8, fill: '#000000', stroke: 'white', strokeWidth: 3, filter: 'url(#performanceGlow)' }}
                animationDuration={smoothAnimationConfig.duration}
                animationEasing={smoothAnimationConfig.easing}
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {totalLeads.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Leads</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {totalDeals.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Deals</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {avgConversion.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 font-medium">Avg Conversion</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SmoothChartWrapper>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.leads.length === nextProps.leads.length &&
    prevProps.selectedTimePeriod === nextProps.selectedTimePeriod &&
    prevProps.loading === nextProps.loading &&
    prevProps.className === nextProps.className &&
    prevProps.leads.every((lead, index) => 
      lead.id === nextProps.leads[index]?.id &&
      lead.stage === nextProps.leads[index]?.stage
    )
  )
})

OptimizedPerformanceChart.displayName = 'OptimizedPerformanceChart'

// Optimized Pipeline Chart Component
interface OptimizedPipelineChartProps {
  leads: Lead[]
  loading?: boolean
  className?: string
}

export const OptimizedPipelineChart = memo<OptimizedPipelineChartProps>(({ 
  leads, 
  loading = false, 
  className = "" 
}) => {
  useChartPerformance('PipelineChart')
  
  const pipelineData = useOptimizedPipelineData(leads)
  const { debouncedHovered, handleMouseEnter, handleMouseLeave } = useDebouncedHover(150)
  
  // Memoized summary calculations
  const { totalDeals, totalValue } = useMemo(() => ({
    totalDeals: pipelineData.reduce((sum, item) => sum + item.count, 0),
    totalValue: pipelineData.reduce((sum, item) => sum + item.value, 0)
  }), [pipelineData])

  return (
    <SmoothChartWrapper
      loading={loading}
      isEmpty={pipelineData.every(item => item.value === 0)}
      className={className}
      height={300}
    >
      <Card 
        className="bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50 transition-all duration-300 ease-out hover:shadow-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Pipeline by Stage</CardTitle>
          <CardDescription className="text-gray-600">
            Deal value distribution across pipeline stages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300} className="chart-container">
            <BarChart 
              data={pipelineData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              barCategoryGap="20%"
            >
              <XAxis 
                dataKey="stage" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
                tickMargin={15}
              />
              
              <YAxis hide />
              
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Pipeline Value']}
                labelFormatter={(label) => `${label} Stage`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                cursor={{
                  fill: 'rgba(0, 0, 0, 0.02)',
                  radius: 8
                }}
              />
              
              <Bar 
                dataKey="value" 
                fill={(entry: any) => entry.fill}
                radius={[50, 50, 50, 50]}
                animationDuration={smoothAnimationConfig.duration}
                animationEasing={smoothAnimationConfig.easing}
              />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {totalDeals}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Deals</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  ${totalValue.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Value</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SmoothChartWrapper>
  )
})

OptimizedPipelineChart.displayName = 'OptimizedPipelineChart'

// Optimized Priority Chart Component
interface OptimizedPriorityChartProps {
  leads: Lead[]
  loading?: boolean
  className?: string
}

export const OptimizedPriorityChart = memo<OptimizedPriorityChartProps>(({ 
  leads, 
  loading = false, 
  className = "" 
}) => {
  useChartPerformance('PriorityChart')
  
  const priorityData = useOptimizedPriorityData(leads)
  const { debouncedHovered, handleMouseEnter, handleMouseLeave } = useDebouncedHover(150)
  
  // Memoized total calculation
  const totalLeads = useMemo(() => 
    priorityData.reduce((sum, item) => sum + item.value, 0), 
    [priorityData]
  )

  return (
    <SmoothChartWrapper
      loading={loading}
      isEmpty={priorityData.length === 0}
      className={className}
      height={350}
    >
      <Card 
        className="bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50 transition-all duration-300 ease-out hover:shadow-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Lead Priority Distribution</CardTitle>
          <CardDescription className="text-gray-600">
            Breakdown of leads by priority level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350} className="chart-container">
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={smoothAnimationConfig.duration}
                animationEasing={smoothAnimationConfig.easing}
              >
                {priorityData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value} leads`,
                  `${name} Priority`
                ]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              />
              
              <text 
                x="50%" 
                y="45%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="fill-gray-900 text-2xl font-bold"
              >
                {totalLeads}
              </text>
              <text 
                x="50%" 
                y="55%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="fill-gray-500 text-xs font-medium"
              >
                Total Leads
              </text>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </SmoothChartWrapper>
  )
})

OptimizedPriorityChart.displayName = 'OptimizedPriorityChart'