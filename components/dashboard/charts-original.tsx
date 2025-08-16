"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lead } from "@/lib/types/lead"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
import { processPerformanceData, formatValue } from "@/lib/charts/chart-utils"
import { AccessibleChartWrapper } from "@/components/charts/accessible-chart-wrapper"
import { 
  HighContrastIndicator, 
  ReducedMotionIndicator, 
  SkipToChart,
  AccessibleChartLegend,
  KeyboardNavigationHelp
} from "@/components/ui/accessible-focus-indicators"
import { useChartAccessibility } from "@/lib/accessibility/chart-accessibility"
import { SmoothChartWrapper } from "@/components/charts/smooth-chart-wrapper"

interface ChartsProps {
  leads: Lead[]
}

const PRIORITY_COLORS = {
  low: '#6b7280',
  medium: '#3b82f6',
  high: '#f97316',
  urgent: '#ef4444'
}

function DashboardCharts({ leads }: ChartsProps) {
  // State for time period selection
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod>('monthly');
  
  // Loading states for different charts
  const [chartsLoading, setChartsLoading] = useState(true);
  const [performanceLoading, setPerformanceLoading] = useState(false);
  
  // Get accessibility configuration
  const { isHighContrast, prefersReducedMotion, animationConfig } = useChartAccessibility('dashboard', leads);
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartsLoading(false)
    }, prefersReducedMotion ? 0 : 1500)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion]);
  
  // Handle time period changes with loading
  const handleTimePeriodChange = (period: TimePeriod) => {
    setPerformanceLoading(true);
    setSelectedTimePeriod(period);
    
    // Simulate data fetching delay (respect reduced motion)
    setTimeout(() => {
      setPerformanceLoading(false);
    }, prefersReducedMotion ? 0 : 800);
  };
  
  // Process performance data based on selected time period
  const performanceData = processPerformanceData(leads, selectedTimePeriod);
  
  // Pipeline data for bar chart with monochromatic colors
  const pipelineData = [
    {
      stage: 'Incoming',
      count: leads.filter(l => l.stage === 'incoming').length,
      value: leads.filter(l => l.stage === 'incoming').reduce((sum, l) => sum + l.dealAmount, 0),
      fill: '#f3f4f6'
    },
    {
      stage: 'Decision',
      count: leads.filter(l => l.stage === 'decision').length,
      value: leads.filter(l => l.stage === 'decision').reduce((sum, l) => sum + l.dealAmount, 0),
      fill: '#e5e7eb'
    },
    {
      stage: 'Negotiation',
      count: leads.filter(l => l.stage === 'negotiation').length,
      value: leads.filter(l => l.stage === 'negotiation').reduce((sum, l) => sum + l.dealAmount, 0),
      fill: '#d1d5db'
    },
    {
      stage: 'Final',
      count: leads.filter(l => l.stage === 'final').length,
      value: leads.filter(l => l.stage === 'final').reduce((sum, l) => sum + l.dealAmount, 0),
      fill: '#9ca3af'
    }
  ];

  // Priority distribution for donut chart with monochromatic colors
  const priorityData = [
    {
      name: 'Low',
      value: leads.filter(l => l.priority === 'low').length,
      color: '#f3f4f6' // Lightest grey
    },
    {
      name: 'Medium',
      value: leads.filter(l => l.priority === 'medium').length,
      color: '#e5e7eb' // Light grey
    },
    {
      name: 'High',
      value: leads.filter(l => l.priority === 'high').length,
      color: '#d1d5db' // Medium grey
    },
    {
      name: 'Urgent',
      value: leads.filter(l => l.priority === 'urgent').length,
      color: '#9ca3af' // Darkest grey
    }
  ].filter(item => item.value > 0);

  // Calculate total leads for center display
  const totalLeads = priorityData.reduce((sum, item) => sum + item.value, 0);
  const urgentLeads = leads.filter(l => l.priority === 'urgent').length;

  // Enhanced revenue data with growth calculations
  const revenueData = [
    { month: 'Jan', leads: 12, deals: 8, revenue: 45000, growth: 0 },
    { month: 'Feb', leads: 15, deals: 10, revenue: 52000, growth: 15.6 },
    { month: 'Mar', leads: 18, deals: 12, revenue: 61000, growth: 17.3 },
    { month: 'Apr', leads: 22, deals: 15, revenue: 73000, growth: 19.7 },
    { month: 'May', leads: 25, deals: 18, revenue: 85000, growth: 16.4 },
    { month: 'Jun', leads: leads.length, deals: leads.filter(l => l.stage === 'final').length, revenue: leads.reduce((sum, l) => sum + l.dealAmount, 0), growth: leads.reduce((sum, l) => sum + l.dealAmount, 0) > 85000 ? ((leads.reduce((sum, l) => sum + l.dealAmount, 0) - 85000) / 85000 * 100) : -5.2 }
  ];

  // Calculate current revenue metrics
  const currentRevenue = revenueData[revenueData.length - 1].revenue;
  const previousRevenue = revenueData[revenueData.length - 2].revenue;
  const revenueGrowth = ((currentRevenue - previousRevenue) / previousRevenue * 100);
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);

  // Deal size distribution
  const dealSizeData = [
    {
      range: '< $10K',
      count: leads.filter(l => l.dealAmount < 10000).length
    },
    {
      range: '$10K - $25K',
      count: leads.filter(l => l.dealAmount >= 10000 && l.dealAmount < 25000).length
    },
    {
      range: '$25K - $50K',
      count: leads.filter(l => l.dealAmount >= 25000 && l.dealAmount < 50000).length
    },
    {
      range: '$50K - $100K',
      count: leads.filter(l => l.dealAmount >= 50000 && l.dealAmount < 100000).length
    },
    {
      range: '> $100K',
      count: leads.filter(l => l.dealAmount >= 100000).length
    }
  ].filter(item => item.count > 0);

  return (
    <div>
      <p>Test</p>
      <AccessibleChartWrapper
        title="Revenue Trend"
        description="Monthly revenue growth and performance tracking"
        chartType="revenue"
        data={revenueData}
        loading={chartsLoading}
        height={320}
        className="revenue-chart md:col-span-3"
        isEmpty={revenueData.length === 0}
        emptyTitle="No revenue data"
        emptyMessage="Revenue data will appear here once you have closed deals."
        showDataTable={true}
        additionalAriaInfo={`Current revenue is ${currentRevenue.toLocaleString()} with ${revenueGrowth >= 0 ? 'positive' : 'negative'} growth of ${Math.abs(revenueGrowth).toFixed(1)}%`}
      >
        <Card className="bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50 relative overflow-hidden">
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
              <div className={`text-sm font-medium flex items-center justify-end ${revenueGrowth >= 0 ? 'text-gray-600' : 'text-gray-500'}`}>
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${revenueGrowth >= 0 ? 'bg-gray-400' : 'bg-gray-300'}`}></span>
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
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`, 
                  'Revenue'
                ]}
                labelFormatter={(label) => `${label} 2024`}
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
                animationDuration={1500}
                animationEasing="ease-out"
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
                  {revenueData.filter(d => d.growth > 0).length}/{revenueData.length}
                </div>
                <div className="text-xs text-gray-500 font-medium">Growth Months</div>
              </div>
            </div>
          </div>
        </CardContent>
        </Card>
      </SmoothChartWrapper>

      {/* Enhanced Priority Distribution - Supporting Chart */}
      <AccessibleChartWrapper
        title="Lead Priority Distribution"
        description="Breakdown of leads by priority level"
        chartType="priority"
        data={priorityData}
        loading={chartsLoading}
        height={350}
        className="priority-chart md:col-span-2"
        isEmpty={priorityData.length === 0}
        emptyTitle="No priority data"
        emptyMessage="Lead priority distribution will appear here once you have leads."
        showDataTable={true}
        additionalAriaInfo={`Total of ${totalLeads} leads distributed across ${priorityData.length} priority levels`}
      >
        <div 
          id="priority-chart"
          className="bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50"
        >
          <div className="p-6">
            <ResponsiveContainer width="100%" height={350} className="chart-container">
              <PieChart role="img" aria-label={`Priority distribution donut chart showing ${priorityData.length} priority levels`}>
                <defs>
                  <filter id="priorityGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Donut chart with thick segments */}
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={animationConfig.chartAnimation.animationDuration}
                  animationEasing={animationConfig.chartAnimation.animationEasing}
                >
                  {priorityData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={isHighContrast ? '#000000' : entry.color}
                      stroke="white"
                      strokeWidth={isHighContrast ? 3 : 2}
                    />
                  ))}
                </Pie>
                
                {/* Enhanced tooltip */}
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${value} leads`,
                    `${name} Priority`
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: isHighContrast ? '2px solid #000000' : 'none',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: isHighContrast ? '#000000' : undefined
                  }}
                />
                
                {/* Center display */}
                <text 
                  x="50%" 
                  y="45%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="fill-gray-900 text-2xl font-bold"
                  aria-label={`${totalLeads} total leads`}
                >
                  {totalLeads}
                </text>
                <text 
                  x="50%" 
                  y="55%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="fill-gray-500 text-xs font-medium"
                  aria-hidden="true"
                >
                  Total Leads
                </text>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Accessible Priority legend */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <AccessibleChartLegend
                items={priorityData.map(item => ({
                  label: `${item.name} Priority`,
                  color: isHighContrast ? '#000000' : item.color,
                  value: `${item.value} leads`,
                  description: `${item.name} priority level with ${item.value} leads (${((item.value / totalLeads) * 100).toFixed(1)}%)`
                }))}
                orientation="vertical"
              />
            </div>
          </div>
        </div>
      </AccessibleChartWrapper>

      {/* Enhanced Pipeline by Stage - Supporting Chart */}
      <AccessibleChartWrapper
        title="Pipeline by Stage"
        description="Deal value distribution across pipeline stages"
        chartType="pipeline"
        data={pipelineData}
        loading={chartsLoading}
        height={300}
        className="pipeline-chart md:col-span-2"
        isEmpty={pipelineData.every(item => item.value === 0)}
        emptyTitle="No pipeline data"
        emptyMessage="Pipeline data will appear here once you have deals in progress."
        showDataTable={true}
        additionalAriaInfo={`${pipelineData.reduce((sum, item) => sum + item.count, 0)} total deals worth $${pipelineData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}`}
      >
        <Card className="bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50">
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
              <defs>
                <filter id="pipelineGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <XAxis 
                dataKey="stage" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }}
                tickMargin={15}
              />
              
              <YAxis hide />
              
              <Tooltip 
                formatter={(value: number, name: string, props: any) => [
                  `$${value.toLocaleString()}`,
                  'Pipeline Value'
                ]}
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
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {pipelineData.reduce((sum, item) => sum + item.count, 0)}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Deals</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  ${pipelineData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Value</div>
              </div>
            </div>
          </div>
        </CardContent>
        </Card>
      </SmoothChartWrapper>

      {/* Unified Performance Chart with Time Selection */}
      <AccessibleChartWrapper
        title="Performance Overview"
        description={`Leads, deals, and conversion trends across ${selectedTimePeriod} periods`}
        chartType="performance"
        data={performanceData}
        loading={performanceLoading}
        height={300}
        className="performance-chart md:col-span-3"
        isEmpty={performanceData.length === 0}
        emptyTitle="No performance data"
        emptyMessage="Performance metrics will appear here once you have leads and deals."
        showDataTable={true}
        additionalAriaInfo={`Showing ${selectedTimePeriod} performance data with ${performanceData.length} data points`}
      >
        <Card className="bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50">
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
                onPeriodChange={handleTimePeriodChange}
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
                formatter={(value: number, name: string) => {
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
                }}
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
                dot={{ 
                  fill: '#d1d5db', 
                  strokeWidth: 0, 
                  r: 4
                }}
                activeDot={{ 
                  r: 6, 
                  fill: '#d1d5db',
                  stroke: 'white',
                  strokeWidth: 2
                }}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              
              <Line 
                type="monotone" 
                dataKey="deals" 
                stroke="#9ca3af" 
                strokeWidth={2}
                name="Deals"
                dot={{ 
                  fill: '#9ca3af', 
                  strokeWidth: 0, 
                  r: 5
                }}
                activeDot={{ 
                  r: 7, 
                  fill: '#9ca3af',
                  stroke: 'white',
                  strokeWidth: 2
                }}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              
              <Line 
                type="monotone" 
                dataKey="conversion" 
                stroke="#000000" 
                strokeWidth={3}
                name="Conversion"
                dot={{ 
                  fill: '#000000', 
                  strokeWidth: 0, 
                  r: 6,
                  filter: 'url(#performanceGlow)'
                }}
                activeDot={{ 
                  r: 8, 
                  fill: '#000000',
                  stroke: 'white',
                  strokeWidth: 3,
                  filter: 'url(#performanceGlow)'
                }}
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {performanceData.reduce((sum, item) => sum + item.leads, 0).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Leads</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {performanceData.reduce((sum, item) => sum + item.deals, 0).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Deals</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {(performanceData.reduce((sum, item) => sum + item.conversion, 0) / performanceData.length).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 font-medium">Avg Conversion</div>
              </div>
            </div>
          </div>
        </CardContent>
        </Card>
      </SmoothChartWrapper>

      {/* Deal Size Distribution - Full Width when present */}
      {dealSizeData.length > 0 && (
        <Card className="deal-size-chart md:col-span-5 bg-white rounded-xl shadow-sm border-0 ring-1 ring-gray-200/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Deal Size Distribution</CardTitle>
            <CardDescription className="text-gray-600">
              Number of deals by value range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="chart-container">
              <BarChart data={dealSizeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  type="number" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  dataKey="range" 
                  type="category" 
                  width={80} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#d1d5db"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default DashboardCharts
export { DashboardCharts }