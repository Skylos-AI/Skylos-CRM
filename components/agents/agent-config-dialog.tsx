"use client"

import { useState, useEffect } from "react"
import { Agent } from "@/lib/types/agent"
import { AgentsService } from "@/lib/api/agents"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
  Clock, 
  MessageSquare, 
  Settings, 
  User, 
  Shield, 
  Zap, 
  Brain,
  AlertTriangle,
  CheckCircle,
  Info,
  Plus,
  Trash2
} from "lucide-react"

// Form validation schema
const configSchema = z.object({
  name: z.string().min(1, "Agent name is required").max(50, "Name must be less than 50 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  workingHours: z.object({
    start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
    end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
    timezone: z.string().min(1, "Timezone is required")
  }),
  behavior: z.object({
    tone: z.enum(['professional', 'friendly', 'casual']),
    responseStyle: z.enum(['concise', 'detailed']),
    maxResponseTime: z.number().min(1).max(300).optional(),
    escalationRules: z.array(z.string()).optional()
  }),
  channels: z.array(z.string()).min(1, "At least one channel must be selected"),
  capabilities: z.array(z.string()).optional(),
  securitySettings: z.object({
    requireApproval: z.boolean().optional(),
    dataRetention: z.number().min(1).max(365).optional(),
    allowPersonalData: z.boolean().optional()
  }).optional()
})

type ConfigFormData = z.infer<typeof configSchema>

interface AgentConfigDialogProps {
  agent: Agent
  onSave: (agent: Agent) => void
  onClose: () => void
}

export function AgentConfigDialog({ agent, onSave, onClose }: AgentConfigDialogProps) {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [saveProgress, setSaveProgress] = useState(0)
  const [customCapability, setCustomCapability] = useState("")
  const [customEscalationRule, setCustomEscalationRule] = useState("")

  const form = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      name: agent.name,
      description: agent.description,
      workingHours: {
        start: agent.configuration.workingHours.start,
        end: agent.configuration.workingHours.end,
        timezone: agent.configuration.workingHours.timezone
      },
      behavior: {
        tone: agent.configuration.behavior.tone,
        responseStyle: agent.configuration.behavior.responseStyle,
        maxResponseTime: 30,
        escalationRules: agent.configuration.behavior.escalationRules || []
      },
      channels: agent.configuration.channels,
      capabilities: agent.capabilities || [],
      securitySettings: {
        requireApproval: false,
        dataRetention: 30,
        allowPersonalData: true
      }
    }
  })

  const onSubmit = async (data: ConfigFormData) => {
    try {
      setLoading(true)
      setSaveProgress(0)
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setSaveProgress(prev => Math.min(prev + 20, 90))
      }, 200)

      const updatedAgent = await AgentsService.updateAgent(agent.id, {
        name: data.name,
        description: data.description,
        capabilities: data.capabilities,
        configuration: {
          ...agent.configuration,
          workingHours: data.workingHours,
          behavior: {
            ...agent.configuration.behavior,
            tone: data.behavior.tone,
            responseStyle: data.behavior.responseStyle,
            escalationRules: data.behavior.escalationRules || []
          },
          channels: data.channels
        }
      })

      clearInterval(progressInterval)
      setSaveProgress(100)
      
      setTimeout(() => {
        onSave(updatedAgent)
      }, 500)
    } catch (error) {
      console.error('Failed to update agent:', error)
      setSaveProgress(0)
    } finally {
      setTimeout(() => {
        setLoading(false)
        setSaveProgress(0)
      }, 1000)
    }
  }

  const availableChannels = [
    { id: 'email', name: 'Email', icon: '📧', description: 'Send and receive emails' },
    { id: 'chat', name: 'Live Chat', icon: '💬', description: 'Real-time website chat' },
    { id: 'phone', name: 'Phone', icon: '📞', description: 'Voice calls and SMS' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', description: 'Professional networking' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '📱', description: 'WhatsApp messaging' },
    { id: 'sms', name: 'SMS', icon: '💬', description: 'Text messaging' }
  ]

  const defaultCapabilities = [
    'Lead qualification', 'Customer support', 'Appointment scheduling',
    'Product information', 'Order processing', 'FAQ handling',
    'Complaint resolution', 'Follow-up management'
  ]

  const addCustomCapability = () => {
    if (customCapability.trim()) {
      const currentCapabilities = form.getValues('capabilities') || []
      form.setValue('capabilities', [...currentCapabilities, customCapability.trim()])
      setCustomCapability("")
    }
  }

  const removeCapability = (index: number) => {
    const currentCapabilities = form.getValues('capabilities') || []
    form.setValue('capabilities', currentCapabilities.filter((_, i) => i !== index))
  }

  const addEscalationRule = () => {
    if (customEscalationRule.trim()) {
      const currentRules = form.getValues('behavior.escalationRules') || []
      form.setValue('behavior.escalationRules', [...currentRules, customEscalationRule.trim()])
      setCustomEscalationRule("")
    }
  }

  const removeEscalationRule = (index: number) => {
    const currentRules = form.getValues('behavior.escalationRules') || []
    form.setValue('behavior.escalationRules', currentRules.filter((_, i) => i !== index))
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configure {agent.name}</span>
            <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
              {agent.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Customize your agent's behavior, working hours, channel integrations, and security settings.
          </DialogDescription>
          {loading && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Settings className="h-4 w-4 animate-spin" />
                <span>Saving configuration...</span>
              </div>
              <Progress value={saveProgress} className="h-2" />
            </div>
          )}
        </DialogHeader>

        <Form {...form}>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="behavior" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>Behavior</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Schedule</span>
              </TabsTrigger>
              <TabsTrigger value="channels" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Channels</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Basic Information</span>
                  </CardTitle>
                  <CardDescription>
                    Update your agent's name, description, and core capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter agent name" />
                        </FormControl>
                        <FormDescription>
                          This name will be displayed to customers and in the interface
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Describe what this agent does and its primary purpose"
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a clear description of the agent's role and capabilities
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Agent Capabilities</Label>
                      <p className="text-sm text-muted-foreground">
                        Define what this agent can help customers with
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {defaultCapabilities.map((capability) => {
                        const currentCapabilities = form.watch('capabilities') || []
                        const isSelected = currentCapabilities.includes(capability)
                        return (
                          <div
                            key={capability}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              isSelected 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => {
                              if (isSelected) {
                                form.setValue('capabilities', currentCapabilities.filter(c => c !== capability))
                              } else {
                                form.setValue('capabilities', [...currentCapabilities, capability])
                              }
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <div className={`w-4 h-4 rounded border-2 ${
                                isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'
                              }`}>
                                {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                              </div>
                              <span className="text-sm">{capability}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add custom capability..."
                        value={customCapability}
                        onChange={(e) => setCustomCapability(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addCustomCapability()}
                      />
                      <Button type="button" onClick={addCustomCapability} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {form.watch('capabilities')?.length > 0 && (
                      <div className="space-y-2">
                        <Label>Selected Capabilities</Label>
                        <div className="flex flex-wrap gap-2">
                          {form.watch('capabilities')?.map((capability, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                              <span>{capability}</span>
                              <button
                                type="button"
                                onClick={() => removeCapability(index)}
                                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Communication Style</span>
                  </CardTitle>
                  <CardDescription>
                    Configure how your agent communicates and responds to customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="behavior.tone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tone of Voice</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select tone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="professional">
                                <div className="flex items-center space-x-2">
                                  <span>🎯</span>
                                  <div>
                                    <div>Professional</div>
                                    <div className="text-xs text-muted-foreground">Formal and business-like</div>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="friendly">
                                <div className="flex items-center space-x-2">
                                  <span>😊</span>
                                  <div>
                                    <div>Friendly</div>
                                    <div className="text-xs text-muted-foreground">Warm and approachable</div>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="casual">
                                <div className="flex items-center space-x-2">
                                  <span>👋</span>
                                  <div>
                                    <div>Casual</div>
                                    <div className="text-xs text-muted-foreground">Relaxed and informal</div>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="behavior.responseStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Response Style</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="concise">
                                <div className="flex items-center space-x-2">
                                  <span>⚡</span>
                                  <div>
                                    <div>Concise</div>
                                    <div className="text-xs text-muted-foreground">Brief and to the point</div>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="detailed">
                                <div className="flex items-center space-x-2">
                                  <span>📝</span>
                                  <div>
                                    <div>Detailed</div>
                                    <div className="text-xs text-muted-foreground">Comprehensive explanations</div>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="behavior.maxResponseTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Response Time (seconds)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            placeholder="30"
                            min="1"
                            max="300"
                          />
                        </FormControl>
                        <FormDescription>
                          How long customers should wait for a response (1-300 seconds)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Escalation Rules</Label>
                      <p className="text-sm text-muted-foreground">
                        Define when the agent should escalate to a human
                      </p>
                    </div>

                    <div className="space-y-2">
                      {form.watch('behavior.escalationRules')?.map((rule, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="text-sm">{rule}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEscalationRule(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add escalation rule..."
                        value={customEscalationRule}
                        onChange={(e) => setCustomEscalationRule(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addEscalationRule()}
                      />
                      <Button type="button" onClick={addEscalationRule} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Examples: "Escalate after 3 failed attempts", "Escalate for billing issues over $500", "Escalate when customer requests manager"
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Working Hours</span>
                  </CardTitle>
                  <CardDescription>
                    Configure when your agent should be active and available to customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="workingHours.start"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormDescription>
                            When the agent becomes active each day
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workingHours.end"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormDescription>
                            When the agent goes offline each day
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="workingHours.timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="America/New_York">🇺🇸 Eastern Time (ET)</SelectItem>
                            <SelectItem value="America/Chicago">🇺🇸 Central Time (CT)</SelectItem>
                            <SelectItem value="America/Denver">🇺🇸 Mountain Time (MT)</SelectItem>
                            <SelectItem value="America/Los_Angeles">🇺🇸 Pacific Time (PT)</SelectItem>
                            <SelectItem value="Europe/London">🇬🇧 Greenwich Mean Time (GMT)</SelectItem>
                            <SelectItem value="Europe/Paris">🇫🇷 Central European Time (CET)</SelectItem>
                            <SelectItem value="Asia/Tokyo">🇯🇵 Japan Standard Time (JST)</SelectItem>
                            <SelectItem value="UTC">🌍 Coordinated Universal Time (UTC)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The timezone for the agent's working hours
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Current Schedule:</strong> {form.watch('workingHours.start')} - {form.watch('workingHours.end')} ({form.watch('workingHours.timezone')})
                      <br />
                      Outside these hours, customers will receive an automated message about availability.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="channels" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Channel Integrations</span>
                  </CardTitle>
                  <CardDescription>
                    Select which communication channels this agent can use to interact with customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="channels"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Channels</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {availableChannels.map((channel) => {
                            const isSelected = field.value.includes(channel.id)
                            return (
                              <div
                                key={channel.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                  isSelected 
                                    ? 'border-primary bg-primary/5 shadow-sm' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => {
                                  const newChannels = isSelected
                                    ? field.value.filter(c => c !== channel.id)
                                    : [...field.value, channel.id]
                                  field.onChange(newChannels)
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{channel.icon}</span>
                                    <div>
                                      <div className="font-medium">{channel.name}</div>
                                      <div className="text-sm text-muted-foreground">{channel.description}</div>
                                    </div>
                                  </div>
                                  <Switch
                                    checked={isSelected}
                                    onCheckedChange={() => {
                                      const newChannels = isSelected
                                        ? field.value.filter(c => c !== channel.id)
                                        : [...field.value, channel.id]
                                      field.onChange(newChannels)
                                    }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch('channels')?.length > 0 && (
                    <div className="space-y-2">
                      <Label>Active Channels ({form.watch('channels')?.length})</Label>
                      <div className="flex flex-wrap gap-2">
                        {form.watch('channels')?.map((channelId) => {
                          const channel = availableChannels.find(c => c.id === channelId)
                          return (
                            <Badge key={channelId} variant="secondary" className="flex items-center space-x-1">
                              <span>{channel?.icon}</span>
                              <span>{channel?.name}</span>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <Alert>
                    <MessageSquare className="h-4 w-4" />
                    <AlertDescription>
                      The agent will be available on selected channels during working hours. Make sure the necessary integrations are configured in your channel settings.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security & Privacy</span>
                  </CardTitle>
                  <CardDescription>
                    Configure security settings and data handling policies for this agent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="securitySettings.requireApproval"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Require Approval</FormLabel>
                          <FormDescription>
                            Require human approval before the agent can respond to customers
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="securitySettings.allowPersonalData"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Allow Personal Data</FormLabel>
                          <FormDescription>
                            Allow the agent to process and store personal customer information
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="securitySettings.dataRetention"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data Retention Period (days)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            placeholder="30"
                            min="1"
                            max="365"
                          />
                        </FormControl>
                        <FormDescription>
                          How long to keep conversation data (1-365 days)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> These settings affect compliance with data protection regulations like GDPR and CCPA. Consult your legal team before making changes.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Form>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={loading}>
            {loading ? (
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}