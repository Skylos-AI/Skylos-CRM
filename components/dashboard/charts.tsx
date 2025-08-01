"use client"

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

interface ChartsProps {
  leads: Lead[]
}

const COLORS = {
  incoming: '#3b82f6',
  decision: '#eab308',
  negotiation: '#f97316',
  final: '#22c55e'
}

const PRIORITY_COLORS = {
  low: '#6b7280',
  medium: '#3b82f6',
  high: '#f97316',
  urgent: '#ef4444'
}

export function DashboardCharts({ leads }: ChartsProps) {
  // Pipeline data for bar chart
  const pipelineData = [
    {
      stage: 'Incoming',
      count: leads.filter(l => l.stage === 'incoming').length,
      value: leads.filter(l => l.stage === 'incoming').reduce((sum, l) => sum + l.dealAmount, 0)
    },
    {
      stage: 'Decision',
      count: leads.filter(l => l.stage === 'decision').length,
      value: leads.filter(l => l.stage === 'decision').reduce((sum, l) => sum + l.dealAmount, 0)
    },
    {
      stage: 'Negotiation',
      count: leads.filter(l => l.stage === 'negotiation').length,
      value: leads.filter(l => l.stage === 'negotiation').reduce((sum, l) => sum + l.dealAmount, 0)
    },
    {
      stage: 'Final',
      count: leads.filter(l => l.stage === 'final').length,
      value: leads.filter(l => l.stage === 'final').reduce((sum, l) => sum + l.dealAmount, 0)
    }
  ]

  // Priority distribution for pie chart
  const priorityData = [
    {
      name: 'Low',
      value: leads.filter(l => l.priority === 'low').length,
      color: PRIORITY_COLORS.low
    },
    {
      name: 'Medium',
      value: leads.filter(l => l.priority === 'medium').length,
      color: PRIORITY_COLORS.medium
    },
    {
      name: 'High',
      value: leads.filter(l => l.priority === 'high').length,
      color: PRIORITY_COLORS.high
    },
    {
      name: 'Urgent',
      value: leads.filter(l => l.priority === 'urgent').length,
      color: PRIORITY_COLORS.urgent
    }
  ].filter(item => item.value > 0)

  // Monthly trend data (simulated)
  const monthlyData = [
    { month: 'Jan', leads: 12, deals: 8, revenue: 45000 },
    { month: 'Feb', leads: 15, deals: 10, revenue: 52000 },
    { month: 'Mar', leads: 18, deals: 12, revenue: 61000 },
    { month: 'Apr', leads: 22, deals: 15, revenue: 73000 },
    { month: 'May', leads: 25, deals: 18, revenue: 85000 },
    { month: 'Jun', leads: leads.length, deals: leads.filter(l => l.stage === 'final').length, revenue: leads.reduce((sum, l) => sum + l.dealAmount, 0) }
  ]

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
  ].filter(item => item.count > 0)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Pipeline Value Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline by Stage</CardTitle>
          <CardDescription>
            Deal value distribution across pipeline stages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              />
              <Bar 
                dataKey="value" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Priority Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Priority Distribution</CardTitle>
          <CardDescription>
            Breakdown of leads by priority level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>
            Leads and deals trend over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Leads"
              />
              <Line 
                type="monotone" 
                dataKey="deals" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Closed Deals"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>
            Monthly revenue growth over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#22c55e" 
                fill="#22c55e"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Deal Size Distribution */}
      {dealSizeData.length > 0 && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Deal Size Distribution</CardTitle>
            <CardDescription>
              Number of deals by value range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dealSizeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="range" type="category" width={80} />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#f97316"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}