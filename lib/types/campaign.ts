import { MediaAsset } from './media'
import { Lead } from './lead'

export interface Campaign {
  id: string
  name: string
  description: string
  type: 'email' | 'sms' | 'social' | 'multi-channel'
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed'
  objectives: CampaignObjective[]
  targetMetrics: TargetMetrics
  diffusionLists: string[] // List IDs
  content: CampaignContent
  schedule: CampaignSchedule
  workflow?: WorkflowDefinition
  analytics: CampaignAnalytics
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface CampaignObjective {
  id: string
  name: string
  description: string
  targetValue: number
  currentValue: number
  unit: string
}

export interface TargetMetrics {
  expectedReach: number
  targetOpenRate: number
  targetClickRate: number
  targetConversionRate: number
  budgetLimit?: number
}

export interface CampaignContent {
  templates: ContentTemplate[]
  mediaAssets: MediaAsset[]
  personalizations: PersonalizationRule[]
}

export interface ContentTemplate {
  id: string
  name: string
  type: 'email' | 'sms' | 'social' | 'push'
  subject?: string
  body: string
  mediaAttachments: string[] // MediaAsset IDs
  personalizations: string[] // PersonalizationRule IDs
  formatting: RichTextFormatting
  createdAt: Date
  updatedAt: Date
}

export interface PersonalizationRule {
  id: string
  token: string
  fieldPath: string // e.g., 'lead.name', 'lead.company'
  fallbackValue: string
  formatting?: 'uppercase' | 'lowercase' | 'capitalize'
}

export interface RichTextFormatting {
  fontSize?: string
  fontFamily?: string
  textColor?: string
  backgroundColor?: string
  alignment?: 'left' | 'center' | 'right'
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

export interface CampaignSchedule {
  type: 'immediate' | 'scheduled' | 'recurring'
  startDate?: Date
  endDate?: Date
  timezone: string
  frequency?: 'daily' | 'weekly' | 'monthly'
  daysOfWeek?: number[] // 0-6, Sunday = 0
  timeOfDay?: string // HH:MM format
}

export interface CampaignAnalytics {
  sent: number
  delivered: number
  opened: number
  clicked: number
  converted: number
  bounced: number
  unsubscribed: number
  openRate: number
  clickRate: number
  conversionRate: number
  roi?: number
  cost?: number
  revenue?: number
}

// Diffusion List Types
export interface DiffusionList {
  id: string
  name: string
  description: string
  type: 'static' | 'dynamic'
  criteria: ListCriteria
  leads: string[] // Lead IDs for static lists
  statistics: ListStatistics
  createdBy: string
  createdAt: Date
  updatedAt: Date
  lastRefreshed?: Date
}

export interface ListCriteria {
  filters: FilterRule[]
  sorting: SortRule[]
  limit?: number
}

export interface FilterRule {
  id: string
  field: string
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'starts_with' | 'ends_with'
  value: any
  logic: 'and' | 'or'
}

export interface SortRule {
  field: string
  direction: 'asc' | 'desc'
}

export interface ListStatistics {
  totalLeads: number
  activeLeads: number
  engagementRate: number
  conversionRate: number
  lastCampaignDate?: Date
  averageDealValue: number
}

// Workflow Types
export interface WorkflowDefinition {
  id: string
  name: string
  nodes: WorkflowNode[]
  connections: Connection[]
  variables: WorkflowVariable[]
  isActive: boolean
}

export interface WorkflowNode {
  id: string
  type: 'trigger' | 'condition' | 'action' | 'delay'
  config: NodeConfig
  position: { x: number; y: number }
}

export interface Connection {
  id: string
  sourceNodeId: string
  targetNodeId: string
  condition?: string
}

export interface NodeConfig {
  [key: string]: any
}

export interface WorkflowVariable {
  id: string
  name: string
  type: 'string' | 'number' | 'boolean' | 'date'
  defaultValue: any
}

// Message Types
export interface MessageContent {
  subject?: string
  body: string
  mediaAttachments: MediaAsset[]
  personalizations: PersonalizationRule[]
  formatting: RichTextFormatting
}

export interface FollowUpMessage {
  id: string
  leadId: string
  campaignId?: string
  type: 'email' | 'sms' | 'call' | 'meeting'
  content: MessageContent
  scheduledDate: Date
  status: 'scheduled' | 'sent' | 'delivered' | 'failed' | 'cancelled'
  createdBy: string
  createdAt: Date
  sentAt?: Date
  deliveredAt?: Date
}