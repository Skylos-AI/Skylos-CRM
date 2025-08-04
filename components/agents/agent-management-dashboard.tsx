"use client"

import { useState, useEffect } from "react"
import { Agent } from "@/lib/types/agent"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"
import {
  Activity,
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  BarChart3
} from "lucide-react"

interface AgentManagementDashboardProps {
  agents: Agent[]
}

export function AgentManagementDashboard({ agents }: AgentManagementDashboardProps) {
  const [realTimeData, setRealTimeData] = useState<any[]>([])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        currentWorkload: Math.floor(Math.random() * 100),
        activeConversations: Math.floor(Math.random() * 10),
        responseTime: Math.random() * 5 + 1,
        lastActivity: new Date(),
        status: agent.status
      }))
      setRealTimeData(newData)
    }, 5000)

    return () => clearInterval(interval)
  }, [agents])

  // Calculate performance metrics
  const performanceMetrics = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active').length,
    totalInteractions: agents.reduce((sum, agent) => 
      sum + (agent.performance.leadsGenerated || 0) + (agent.performance.ticketsResolved || 0), 0
    ),
    avgResponseTime: agents.reduce((sum, agent) => 
      sum + (agent.performance.responseTime || 0), 0
    ) / agents.length,
    avgSatisfaction: agents.reduce((sum, agent) => 
      sum + (agent.performance.satisfactionScore || 0), 0
    ) / agents.length
  }

  // Performance data for charts
  const performanceData = agents.map(agent => ({
    name: agent.name.split(' ')[0],
    interactions: (agent.performance.leadsGenerated || 0) + (agent.performance.ticketsResolved || 0),
    responseTime: agent.performance.responseTime || 0,
    satisfaction: agent.performance.satisfactionScore || 0
  }))

  const statusDistribution = [
    { name: 'Active', value: agents.filter(a => a.status === 'active').length, color: '#22c55e' },
    { name: 'Inactive', value: agents.filter(a => a.status === 'inactive').length, color: '#6b7280' },
    { name: 'Training', value: agents.filter(a => a.status === 'training').length, color: '#eab308' },
    { name: 'Maintenance', value: agents.filter(a => a.status === 'maintenance').length, color: '#f97316' }
  ].filter(item => item.value > 0)

  const getWorkloadColor = (workload: number) => {
    if (workload < 30) return 'bg-green-500'
    if (workload < 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'inactive': return <Clock className="h-4 w-4 text-gray-500" />
      case 'training': return <Target className="h-4 w-4 text-yellow-500" />
      case 'maintenance': return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.totalAgents}</div>
            <p className="text-xs text-muted-foreground">
              {performanceMetrics.activeAgents} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.totalInteractions}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.avgResponseTime.toFixed(1)}s</div>
            <p className="text-xs text-muted-foreground">
              Across all agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.avgSatisfaction.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Average rating
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground">
              Uptime
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Real-time Activity</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="workload">Workload Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Real-time Agent Activity</span>
              </CardTitle>
              <CardDescription>
                Live view of agent status and current workload
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realTimeData.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(agent.status)}
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {agent.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {agent.activeConversations} active conversations
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {agent.responseTime.toFixed(1)}s avg response
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last active: {agent.lastActivity.toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="w-24">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Workload</span>
                          <span>{agent.currentWorkload}%</span>
                        </div>
                        <Progress 
                          value={agent.currentWorkload} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance Comparison</CardTitle>
                <CardDescription>
                  Total interactions by agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="interactions" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Status Distribution</CardTitle>
                <CardDescription>
                  Current status of all agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
                <CardDescription>
                  Average response time by agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="responseTime" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Scores</CardTitle>
                <CardDescription>
                  Customer satisfaction by agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Bar dataKey="satisfaction" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Workload Distribution</span>
              </CardTitle>
              <CardDescription>
                Current workload across all agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {realTimeData.map((agent) => (
                  <Card key={agent.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {agent.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{agent.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {agent.activeConversations} conversations
                          </div>
                        </div>
                      </div>
                      <Badge variant={agent.currentWorkload > 80 ? 'destructive' : agent.currentWorkload > 50 ? 'default' : 'secondary'}>
                        {agent.currentWorkload}%
                      </Badge>
                    </div>
                    <Progress 
                      value={agent.currentWorkload} 
                      className="h-3"
                    />
                    <div className="mt-2 text-xs text-muted-foreground">
                      Response time: {agent.responseTime.toFixed(1)}s
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}