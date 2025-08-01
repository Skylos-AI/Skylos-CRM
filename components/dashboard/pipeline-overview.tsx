"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { cn, stageVariants } from "@/lib/design-system"
import { Lead } from "@/lib/types/lead"

interface PipelineStage {
  id: Lead['stage']
  title: string
  leads: Lead[]
  color: string
}

interface PipelineOverviewProps {
  leads: Lead[]
  className?: string
}

const PIPELINE_STAGES: Omit<PipelineStage, 'leads'>[] = [
  {
    id: 'incoming',
    title: 'Incoming Leads',
    color: 'info'
  },
  {
    id: 'decision',
    title: 'Decision Making',
    color: 'warning'
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    color: 'warning'
  },
  {
    id: 'final',
    title: 'Final Decision',
    color: 'success'
  }
]

export function PipelineOverview({ leads, className }: PipelineOverviewProps) {
  const totalLeads = leads.length
  
  const getStageData = (stageId: Lead['stage']) => {
    const stageLeads = leads.filter(lead => lead.stage === stageId)
    const totalValue = stageLeads.reduce((sum, lead) => sum + lead.dealAmount, 0)
    const percentage = totalLeads > 0 ? (stageLeads.length / totalLeads) * 100 : 0
    
    return {
      count: stageLeads.length,
      totalValue,
      percentage,
      leads: stageLeads
    }
  }

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      {PIPELINE_STAGES.map((stage, index) => {
        const stageData = getStageData(stage.id)
        
        return (
          <Card 
            key={stage.id}
            className={cn(
              "group transition-all duration-200 hover:shadow-md",
              "border-l-4",
              stage.id === 'incoming' && "border-l-info-500 hover:border-l-info-600",
              stage.id === 'decision' && "border-l-warning-500 hover:border-l-warning-600",
              stage.id === 'negotiation' && "border-l-orange-500 hover:border-l-orange-600",
              stage.id === 'final' && "border-l-success-500 hover:border-l-success-600"
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className={cn(
                  "text-sm font-semibold",
                  stage.id === 'incoming' && "text-info-700",
                  stage.id === 'decision' && "text-warning-700",
                  stage.id === 'negotiation' && "text-orange-700",
                  stage.id === 'final' && "text-success-700"
                )}>
                  {stage.title}
                </CardTitle>
                <div className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  stage.id === 'incoming' && "bg-info-100 text-info-700",
                  stage.id === 'decision' && "bg-warning-100 text-warning-700",
                  stage.id === 'negotiation' && "bg-orange-100 text-orange-700",
                  stage.id === 'final' && "bg-success-100 text-success-700"
                )}>
                  <AnimatedCounter 
                    value={stageData.percentage} 
                    suffix="%" 
                    decimals={1}
                    delay={index * 100}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Lead Count */}
              <div>
                <div className="text-3xl font-bold text-neutral-900 mb-1">
                  <AnimatedCounter 
                    value={stageData.count} 
                    delay={index * 150}
                    duration={800}
                  />
                </div>
                <p className="text-xs text-neutral-500">
                  {stageData.count === 1 ? 'lead' : 'leads'}
                </p>
              </div>

              {/* Total Value */}
              <div>
                <div className="text-lg font-semibold text-neutral-700 mb-1">
                  <AnimatedCounter 
                    value={stageData.totalValue} 
                    prefix="$"
                    delay={index * 200}
                    duration={1000}
                  />
                </div>
                <p className="text-xs text-neutral-500">total value</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">Pipeline %</span>
                  <span className="font-medium text-neutral-700">
                    <AnimatedCounter 
                      value={stageData.percentage} 
                      suffix="%" 
                      decimals={1}
                      delay={index * 250}
                    />
                  </span>
                </div>
                <Progress 
                  value={stageData.percentage} 
                  className={cn(
                    "h-2 transition-all duration-500",
                    stage.id === 'incoming' && "[&>div]:bg-info-500",
                    stage.id === 'decision' && "[&>div]:bg-warning-500",
                    stage.id === 'negotiation' && "[&>div]:bg-orange-500",
                    stage.id === 'final' && "[&>div]:bg-success-500"
                  )}
                />
              </div>

              {/* Average Deal Size */}
              {stageData.count > 0 && (
                <div className="pt-2 border-t border-neutral-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-500">Avg. deal</span>
                    <span className="text-sm font-medium text-neutral-700">
                      <AnimatedCounter 
                        value={stageData.totalValue / stageData.count} 
                        prefix="$"
                        delay={index * 300}
                        duration={1200}
                      />
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Individual pipeline stage card for more detailed views
interface PipelineStageCardProps {
  stage: Lead['stage']
  title: string
  leads: Lead[]
  totalLeads: number
  className?: string
}

export function PipelineStageCard({ 
  stage, 
  title, 
  leads, 
  totalLeads, 
  className 
}: PipelineStageCardProps) {
  const stageLeads = leads.filter(lead => lead.stage === stage)
  const totalValue = stageLeads.reduce((sum, lead) => sum + lead.dealAmount, 0)
  const percentage = totalLeads > 0 ? (stageLeads.length / totalLeads) * 100 : 0
  const avgDealSize = stageLeads.length > 0 ? totalValue / stageLeads.length : 0

  return (
    <Card className={cn(
      "group transition-all duration-200 hover:shadow-md cursor-pointer",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-neutral-700">
            {title}
          </CardTitle>
          <div className={cn(
            stageVariants({ stage, size: 'sm' }),
            "px-2 py-1"
          )}>
            {percentage.toFixed(1)}%
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold text-neutral-900">
              <AnimatedCounter value={stageLeads.length} />
            </div>
            <p className="text-xs text-neutral-500">leads</p>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-neutral-700">
              <AnimatedCounter value={totalValue} prefix="$" />
            </div>
            <p className="text-xs text-neutral-500">value</p>
          </div>
        </div>

        <Progress 
          value={percentage} 
          className="h-2"
        />

        {avgDealSize > 0 && (
          <div className="flex justify-between items-center text-xs pt-2 border-t border-neutral-100">
            <span className="text-neutral-500">Avg. deal size</span>
            <span className="font-medium text-neutral-700">
              <AnimatedCounter value={avgDealSize} prefix="$" />
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}