"use client"

import { useState, useEffect } from "react"
import { CrmLayout } from "@/components/layout/crm-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import dynamic from "next/dynamic"
import { LeadsService } from "@/lib/api/leads"
import { CompaniesService } from "@/lib/api/companies"
import { ContactsService } from "@/lib/api/contacts"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { FadeIn } from "@/components/shared/fade-in"
import { PageTransition, FadeInUp, SlideInLeft, StaggerContainer, StaggerItem } from "@/components/shared/page-transition"
import { EnhancedKPICard, PrimaryKPICard, SecondaryKPICard } from "@/components/dashboard/enhanced-kpi-card"
import { PipelineOverview } from "@/components/dashboard/pipeline-overview"
import { EnhancedActivityFeed, transformActivityData } from "@/components/dashboard/enhanced-activity-feed"
import { EnhancedFollowUps } from "@/components/dashboard/enhanced-follow-ups"
import { Lead } from "@/lib/types/lead"

// Dynamically import charts to reduce initial bundle size
const DashboardCharts = dynamic(
  () => import("@/components/dashboard/charts"),
  {
    loading: () => (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    ),
    ssr: false
  }
)
import { 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp,
  Target,
  Activity,
  Clock,
  CheckCircle,
  BarChart3,
  Percent
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardStats {
  totalLeads: number
  activeDeals: number
  totalCompanies: number
  totalContacts: number
  pipelineValue: number
  conversionRate: number
  avgDealSize: number
  leadsThisMonth: number
  dealsClosedThisMonth: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    activeDeals: 0,
    totalCompanies: 0,
    totalContacts: 0,
    pipelineValue: 0,
    conversionRate: 0,
    avgDealSize: 0,
    leadsThisMonth: 0,
    dealsClosedThisMonth: 0
  })
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [leadsData, companiesData, contactsData] = await Promise.all([
        LeadsService.getLeads(),
        CompaniesService.getCompanies(),
        ContactsService.getContacts()
      ])

      setLeads(leadsData)

      // Calculate stats
      const activeDeals = leadsData.filter(lead => lead.stage !== 'final').length
      const pipelineValue = leadsData.reduce((sum, lead) => sum + lead.dealAmount, 0)
      const avgDealSize = leadsData.length > 0 ? pipelineValue / leadsData.length : 0
      const closedDeals = leadsData.filter(lead => lead.stage === 'final').length
      const conversionRate = leadsData.length > 0 ? (closedDeals / leadsData.length) * 100 : 0

      setStats({
        totalLeads: leadsData.length,
        activeDeals,
        totalCompanies: companiesData.length,
        totalContacts: contactsData.length,
        pipelineValue,
        conversionRate,
        avgDealSize,
        leadsThisMonth: leadsData.filter(lead => 
          new Date(lead.createdAt).getMonth() === new Date().getMonth()
        ).length,
        dealsClosedThisMonth: leadsData.filter(lead => 
          lead.stage === 'final' && 
          new Date(lead.updatedAt).getMonth() === new Date().getMonth()
        ).length
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStageLeads = (stage: Lead['stage']) => {
    return leads.filter(lead => lead.stage === stage)
  }

  const getRecentActivity = () => {
    return leads
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
      .map(lead => ({
        id: lead.id,
        title: `${lead.name} - ${lead.company}`,
        description: `Stage: ${lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}`,
        time: new Date(lead.updatedAt).toLocaleDateString(),
        type: lead.stage === 'final' ? 'success' : lead.priority === 'urgent' ? 'warning' : 'info'
      }))
  }

  const getUpcomingFollowUps = () => {
    return leads
      .filter(lead => lead.nextFollowUp)
      .sort((a, b) => new Date(a.nextFollowUp!).getTime() - new Date(b.nextFollowUp!).getTime())
      .slice(0, 5)
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <CrmLayout>
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 bg-neutral-200 rounded-md w-48 animate-pulse"></div>
              <div className="h-4 bg-neutral-200 rounded-md w-96 animate-pulse"></div>
            </div>
            <div className="flex space-x-3">
              <div className="h-10 bg-neutral-200 rounded-md w-32 animate-pulse"></div>
              <div className="h-10 bg-neutral-200 rounded-md w-28 animate-pulse"></div>
            </div>
          </div>
          
          {/* KPI Cards Skeleton */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-neutral-200 p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-neutral-200 rounded-md"></div>
                    <div className="h-4 bg-neutral-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-8 bg-neutral-200 rounded w-20"></div>
                  <div className="h-3 bg-neutral-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pipeline Overview Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-6 bg-neutral-200 rounded w-40 animate-pulse"></div>
                <div className="h-4 bg-neutral-200 rounded w-64 animate-pulse"></div>
              </div>
              <div className="h-9 bg-neutral-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-neutral-200 p-6 animate-pulse border-l-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-neutral-200 rounded w-24"></div>
                      <div className="h-6 bg-neutral-200 rounded-full w-12"></div>
                    </div>
                    <div className="h-8 bg-neutral-200 rounded w-16"></div>
                    <div className="h-2 bg-neutral-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CrmLayout>
      </ProtectedRoute>
    )
  }

  const recentActivity = getRecentActivity()
  const upcomingFollowUps = getUpcomingFollowUps()

  return (
    <ProtectedRoute>
      <CrmLayout>
        <PageTransition>
        <div className="space-y-6">
          <FadeInUp>
            <div className="flex items-center justify-between">
              <SlideInLeft>
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tight text-light-text-primary dark:text-slate-50">
                    Dashboard
                  </h1>
                  <p className="text-muted-foreground max-w-2xl">
                    Welcome back! Here's what's happening with your business today.
                  </p>
                </div>
              </SlideInLeft>
              <FadeInUp delay={0.2}>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="transition-all duration-200 hover:scale-105">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                  <Button className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
                    <Activity className="mr-2 h-4 w-4" />
                    View Reports
                  </Button>
                </div>
              </FadeInUp>
            </div>
          </FadeInUp>
        
        {/* Enhanced KPI Cards with Visual Hierarchy */}
        <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Primary KPI - Most Important Metrics */}
          <StaggerItem>
            <EnhancedKPICard
            title="Total Leads"
            value={stats.totalLeads}
            icon={<Users className="h-4 w-4" />}
            priority="primary"
            trend={{
              value: stats.leadsThisMonth,
              direction: stats.leadsThisMonth > 0 ? 'up' : 'neutral',
              period: 'this month',
              isPositive: true
            }}
            delay={100}
          />
          </StaggerItem>

          <StaggerItem>
            <EnhancedKPICard
              title="Pipeline Value"
              value={stats.pipelineValue}
              icon={<DollarSign className="h-4 w-4" />}
              priority="primary"
              prefix="$"
              trend={{
                value: stats.activeDeals,
                direction: stats.activeDeals > 0 ? 'up' : 'neutral',
                period: 'active deals',
                isPositive: true
              }}
              subtitle={`${stats.activeDeals} active deals`}
              delay={200}
            />
          </StaggerItem>

          {/* Secondary KPIs - Supporting Metrics */}
          <StaggerItem>
            <EnhancedKPICard
              title="Conversion Rate"
              value={stats.conversionRate}
              icon={<Percent className="h-4 w-4" />}
              priority="secondary"
              suffix="%"
              decimals={1}
              trend={{
                value: stats.dealsClosedThisMonth,
                direction: stats.conversionRate > 15 ? 'up' : stats.conversionRate < 10 ? 'down' : 'neutral',
                period: 'closed this month',
                isPositive: stats.conversionRate > 15
              }}
              delay={300}
            />
          </StaggerItem>
          
          <StaggerItem>
            <EnhancedKPICard
              title="Avg Deal Size"
              value={stats.avgDealSize}
              icon={<BarChart3 className="h-4 w-4" />}
              priority="secondary"
              prefix="$"
              subtitle={`${stats.totalCompanies} companies`}
              delay={400}
            />
          </StaggerItem>
        </StaggerContainer>

        {/* Enhanced Pipeline Overview */}
        <FadeInUp delay={0.4}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Pipeline Overview</h2>
                <p className="text-sm text-muted-foreground">Track leads through your sales process</p>
              </div>
              <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
                <Target className="mr-2 h-4 w-4" />
                Manage Pipeline
              </Button>
            </div>
            <PipelineOverview leads={leads} />
          </div>
        </FadeInUp>
        
        <FadeInUp delay={0.5}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Enhanced Recent Activity */}
            <EnhancedActivityFeed
              activities={transformActivityData(recentActivity)}
              onViewAll={() => console.log('View all activities')}
            />
            
            {/* Enhanced Upcoming Follow-ups */}
            <EnhancedFollowUps
              followUps={upcomingFollowUps}
              onViewAll={() => console.log('View all follow-ups')}
              onFollowUpClick={(lead) => console.log('Follow-up clicked:', lead.name)}
            />
          </div>
        </FadeInUp>

        {/* Charts Section */}
        <FadeInUp delay={0.6}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h2>
              <Button variant="outline" className="transition-all duration-200 hover:scale-105">
                <TrendingUp className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
            <DashboardCharts leads={leads} />
          </div>
        </FadeInUp>
      </div>
        </PageTransition>
      </CrmLayout>
    </ProtectedRoute>
  )
}