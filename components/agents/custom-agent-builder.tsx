"use client"

import { useState, useEffect } from "react"
import { CustomAgentRequest } from "@/lib/types/agent"
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

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Plus, 
  X, 
  Bot, 
  Lightbulb, 
  Target, 
  Zap, 
  Layout,
  CheckCircle,

  Users,
  MessageSquare,
  ShoppingCart,
  Calendar,
  BarChart3,
  Settings
} from "lucide-react"

// Form validation schema
const customAgentSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  businessUseCase: z.string().min(20, "Business use case must be at least 20 characters").max(1000, "Business use case must be less than 1000 characters"),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  template: z.string().optional(),
  requirements: z.array(z.string().min(1)).min(1, "At least one requirement is needed"),
  expectedCapabilities: z.array(z.string().min(1)).min(1, "At least one capability is needed"),
  integrationNeeds: z.array(z.string().min(1)).optional(),
  estimatedComplexity: z.enum(['simple', 'moderate', 'complex']).optional(),
  timeline: z.enum(['asap', '1-2weeks', '1month', 'flexible']).optional()
})

type CustomAgentFormData = z.infer<typeof customAgentSchema>

// Agent templates
const agentTemplates = [
  {
    id: 'sales-sdr',
    name: 'Sales Development Representative',
    icon: 'Users',
    description: 'Qualify leads, schedule meetings, and manage initial sales outreach',
    category: 'Sales',
    complexity: 'moderate' as const,
    estimatedTime: '1-2 weeks',
    defaultRequirements: [
      'Lead qualification based on BANT criteria',
      'Integration with CRM system',
      'Email and LinkedIn outreach capabilities',
      'Meeting scheduling automation'
    ],
    defaultCapabilities: [
      'Natural language processing for lead conversations',
      'CRM data entry and updates',
      'Email template personalization',
      'Calendar integration'
    ],
    defaultIntegrations: [
      'Salesforce/HubSpot CRM',
      'Email platform (Gmail, Outlook)',
      'Calendar system',
      'LinkedIn Sales Navigator'
    ]
  },
  {
    id: 'customer-support',
    name: 'Customer Support Specialist',
    icon: 'MessageSquare',
    description: 'Handle customer inquiries, resolve issues, and provide product support',
    category: 'Support',
    complexity: 'moderate' as const,
    estimatedTime: '2-3 weeks',
    defaultRequirements: [
      'Multi-channel support (chat, email, phone)',
      'Knowledge base integration',
      'Ticket management system',
      'Escalation to human agents'
    ],
    defaultCapabilities: [
      'Issue categorization and routing',
      'Knowledge base search and retrieval',
      'Sentiment analysis',
      'Multi-language support'
    ],
    defaultIntegrations: [
      'Help desk software (Zendesk, Freshdesk)',
      'Knowledge base system',
      'Chat platform',
      'Email system'
    ]
  },
  {
    id: 'ecommerce-assistant',
    name: 'E-commerce Assistant',
    icon: 'ShoppingCart',
    description: 'Help customers with product recommendations, orders, and shopping assistance',
    category: 'E-commerce',
    complexity: 'complex' as const,
    estimatedTime: '3-4 weeks',
    defaultRequirements: [
      'Product catalog integration',
      'Order management capabilities',
      'Payment processing support',
      'Inventory status checking'
    ],
    defaultCapabilities: [
      'Product recommendation engine',
      'Order tracking and updates',
      'Return and refund processing',
      'Personalized shopping assistance'
    ],
    defaultIntegrations: [
      'E-commerce platform (Shopify, WooCommerce)',
      'Payment gateway',
      'Inventory management system',
      'Shipping carriers'
    ]
  },
  {
    id: 'appointment-scheduler',
    name: 'Appointment Scheduler',
    icon: 'Calendar',
    description: 'Manage appointments, bookings, and calendar coordination',
    category: 'Scheduling',
    complexity: 'simple' as const,
    estimatedTime: '1 week',
    defaultRequirements: [
      'Calendar integration',
      'Availability checking',
      'Automated reminders',
      'Rescheduling capabilities'
    ],
    defaultCapabilities: [
      'Natural language date/time processing',
      'Conflict detection',
      'Multi-timezone support',
      'Automated confirmations'
    ],
    defaultIntegrations: [
      'Calendar systems (Google, Outlook)',
      'Booking platform',
      'SMS/Email notifications',
      'Video conferencing tools'
    ]
  },
  {
    id: 'data-analyst',
    name: 'Data Analysis Assistant',
    icon: 'BarChart3',
    description: 'Analyze data, generate reports, and provide business insights',
    category: 'Analytics',
    complexity: 'complex' as const,
    estimatedTime: '4-6 weeks',
    defaultRequirements: [
      'Data source connectivity',
      'Report generation capabilities',
      'Data visualization',
      'Automated insights'
    ],
    defaultCapabilities: [
      'Statistical analysis',
      'Trend identification',
      'Predictive modeling',
      'Dashboard creation'
    ],
    defaultIntegrations: [
      'Database systems',
      'BI tools (Tableau, Power BI)',
      'Data warehouses',
      'API endpoints'
    ]
  },
  {
    id: 'custom',
    name: 'Custom Agent',
    icon: 'Settings',
    description: 'Build a completely custom agent tailored to your specific needs',
    category: 'Custom',
    complexity: 'complex' as const,
    estimatedTime: 'Variable',
    defaultRequirements: [],
    defaultCapabilities: [],
    defaultIntegrations: []
  }
]

interface CustomAgentBuilderProps {
  onSubmit: (request: CustomAgentRequest) => void
  onClose: () => void
}

export function CustomAgentBuilder({ onSubmit, onClose }: CustomAgentBuilderProps) {
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [submitProgress, setSubmitProgress] = useState(0)

  const getIcon = (iconName: string) => {
    const iconProps = { className: "h-6 w-6" }
    switch (iconName) {
      case 'Users': return <Users {...iconProps} />
      case 'MessageSquare': return <MessageSquare {...iconProps} />
      case 'ShoppingCart': return <ShoppingCart {...iconProps} />
      case 'Calendar': return <Calendar {...iconProps} />
      case 'BarChart3': return <BarChart3 {...iconProps} />
      case 'Settings': return <Settings {...iconProps} />
      default: return <Bot {...iconProps} />
    }
  }

  const form = useForm<CustomAgentFormData>({
    resolver: zodResolver(customAgentSchema),
    defaultValues: {
      title: "",
      description: "",
      businessUseCase: "",
      priority: "medium",
      template: "",
      requirements: [""],
      expectedCapabilities: [""],
      integrationNeeds: [""],
      estimatedComplexity: "moderate",
      timeline: "flexible"
    }
  })

  const watchedTemplate = form.watch('template')

  useEffect(() => {
    if (watchedTemplate && watchedTemplate !== selectedTemplate) {
      const template = agentTemplates.find(t => t.id === watchedTemplate)
      if (template && template.id !== 'custom') {
        // Auto-populate form with template data
        form.setValue('title', template.name)
        form.setValue('description', template.description)
        form.setValue('requirements', template.defaultRequirements.length > 0 ? template.defaultRequirements : [""])
        form.setValue('expectedCapabilities', template.defaultCapabilities.length > 0 ? template.defaultCapabilities : [""])
        form.setValue('integrationNeeds', template.defaultIntegrations.length > 0 ? template.defaultIntegrations : [""])
        form.setValue('estimatedComplexity', template.complexity)
      }
      setSelectedTemplate(watchedTemplate)
    }
  }, [watchedTemplate, selectedTemplate, form])

  const onSubmitForm = async (data: CustomAgentFormData) => {
    try {
      setLoading(true)
      setSubmitProgress(0)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setSubmitProgress(prev => Math.min(prev + 20, 90))
      }, 300)

      const request = await AgentsService.createCustomAgentRequest({
        userId: "current-user", // This would come from auth context
        title: data.title,
        description: data.description,
        businessUseCase: data.businessUseCase,
        priority: data.priority,
        requirements: data.requirements.filter(r => r.trim()),
        expectedCapabilities: data.expectedCapabilities.filter(c => c.trim()),
        integrationNeeds: data.integrationNeeds?.filter(i => i.trim()) || [],
        status: 'pending'
      })

      clearInterval(progressInterval)
      setSubmitProgress(100)

      setTimeout(() => {
        onSubmit(request)
      }, 500)
    } catch (error) {
      console.error('Failed to create custom agent request:', error)
      setSubmitProgress(0)
    } finally {
      setTimeout(() => {
        setLoading(false)
        setSubmitProgress(0)
      }, 1000)
    }
  }

  const addListItem = (field: 'requirements' | 'expectedCapabilities' | 'integrationNeeds') => {
    const currentValues = form.getValues(field) || []
    form.setValue(field, [...currentValues, ""])
  }

  const updateListItem = (field: 'requirements' | 'expectedCapabilities' | 'integrationNeeds', index: number, value: string) => {
    const currentValues = form.getValues(field) || []
    const newValues = currentValues.map((item, i) => i === index ? value : item)
    form.setValue(field, newValues)
  }

  const removeListItem = (field: 'requirements' | 'expectedCapabilities' | 'integrationNeeds', index: number) => {
    const currentValues = form.getValues(field) || []
    form.setValue(field, currentValues.filter((_, i) => i !== index))
  }

  const isStepValid = (step: number) => {
    const values = form.getValues()
    switch (step) {
      case 1:
        return !!values.template
      case 2:
        return values.title?.trim() && values.description?.trim()
      case 3:
        return values.businessUseCase?.trim()
      case 4:
        return values.requirements?.some(r => r.trim()) && 
               values.expectedCapabilities?.some(c => c.trim())
      default:
        return true
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Choose Template"
      case 2: return "Basic Information"
      case 3: return "Business Use Case"
      case 4: return "Requirements & Capabilities"
      default: return ""
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layout className="h-5 w-5" />
                <span>Choose Template</span>
              </CardTitle>
              <CardDescription>
                Select a template to get started quickly, or choose custom for a completely tailored agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {agentTemplates.map((template) => (
                          <div key={template.id} className="relative">
                            <RadioGroupItem
                              value={template.id}
                              id={template.id}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={template.id}
                              className="flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5"
                            >
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                  {getIcon(template.icon)}
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold">{template.name}</div>
                                  <div className="text-xs text-muted-foreground">{template.category}</div>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                              <div className="flex items-center justify-between text-xs">
                                <span className={`px-2 py-1 rounded-full ${
                                  template.complexity === 'simple' ? 'bg-green-100 text-green-800' :
                                  template.complexity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {template.complexity}
                                </span>
                                <span className="text-muted-foreground">{template.estimatedTime}</span>
                              </div>
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Customize the details for your agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Real Estate Lead Qualifier" />
                    </FormControl>
                    <FormDescription>
                      A clear, descriptive name for your agent
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
                        placeholder="Briefly describe what this agent should do"
                        rows={3}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a clear overview of the agent's purpose and main functions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">🟢 Low - Nice to have</SelectItem>
                          <SelectItem value="medium">🟡 Medium - Important</SelectItem>
                          <SelectItem value="high">🟠 High - Business critical</SelectItem>
                          <SelectItem value="urgent">🔴 Urgent - Immediate need</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeline</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                          <SelectItem value="1month">1 month</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Business Use Case</span>
              </CardTitle>
              <CardDescription>
                Explain how this agent will help your business and what outcomes you expect
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="businessUseCase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Use Case</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe the business problem this agent will solve and the expected benefits"
                        rows={5}
                      />
                    </FormControl>
                    <FormDescription>
                      Be specific about the problem, solution, and expected outcomes
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedComplexity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Complexity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select complexity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="simple">
                          <div className="flex items-center space-x-2">
                            <span>🟢</span>
                            <div>
                              <div>Simple</div>
                              <div className="text-xs text-muted-foreground">Basic functionality, minimal integrations</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="moderate">
                          <div className="flex items-center space-x-2">
                            <span>🟡</span>
                            <div>
                              <div>Moderate</div>
                              <div className="text-xs text-muted-foreground">Multiple features, some integrations</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="complex">
                          <div className="flex items-center space-x-2">
                            <span>🔴</span>
                            <div>
                              <div>Complex</div>
                              <div className="text-xs text-muted-foreground">Advanced features, multiple integrations</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tip:</strong> Include specific metrics or outcomes you hope to achieve, such as "reduce response time by 50%" or "increase lead conversion by 20%"
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Requirements & Capabilities</span>
                </CardTitle>
                <CardDescription>
                  Define what your agent needs to do and how it should work
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Requirements */}
                <div className="space-y-3">
                  <Label>Functional Requirements</Label>
                  <p className="text-sm text-muted-foreground">What specific functions must this agent perform?</p>
                  {form.watch('requirements')?.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={requirement}
                        onChange={(e) => updateListItem('requirements', index, e.target.value)}
                        placeholder="e.g., Must integrate with CRM system"
                      />
                      {(form.watch('requirements')?.length || 0) > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeListItem('requirements', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem('requirements')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Requirement
                  </Button>
                </div>

                <Separator />

                {/* Expected Capabilities */}
                <div className="space-y-3">
                  <Label>Expected Capabilities</Label>
                  <p className="text-sm text-muted-foreground">What technical capabilities should this agent have?</p>
                  {form.watch('expectedCapabilities')?.map((capability, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={capability}
                        onChange={(e) => updateListItem('expectedCapabilities', index, e.target.value)}
                        placeholder="e.g., Natural language processing"
                      />
                      {(form.watch('expectedCapabilities')?.length || 0) > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeListItem('expectedCapabilities', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem('expectedCapabilities')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Capability
                  </Button>
                </div>

                <Separator />

                {/* Integration Needs */}
                <div className="space-y-3">
                  <Label>Integration Needs</Label>
                  <p className="text-sm text-muted-foreground">What systems or platforms should this agent integrate with?</p>
                  {form.watch('integrationNeeds')?.map((integration, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={integration}
                        onChange={(e) => updateListItem('integrationNeeds', index, e.target.value)}
                        placeholder="e.g., Salesforce API, Email platform"
                      />
                      {(form.watch('integrationNeeds')?.length || 0) > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeListItem('integrationNeeds', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem('integrationNeeds')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Integration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>Request Custom Agent</span>
          </DialogTitle>
          <DialogDescription>
            Step {currentStep} of 4: {getStepTitle(currentStep)}
          </DialogDescription>
          {loading && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Settings className="h-4 w-4 animate-spin" />
                <span>Submitting your request...</span>
              </div>
              <Progress value={submitProgress} className="h-2" />
            </div>
          )}
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step === currentStep 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-110' 
                  : step < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 rounded-full transition-all ${
                  step < currentStep ? 'bg-green-500' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        <Form {...form}>
          {renderStep()}
        </Form>

        <DialogFooter className="flex justify-between">
          <div>
            {currentStep > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={loading}
              >
                Previous
              </Button>
            )}
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            {currentStep < 4 ? (
              <Button 
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!isStepValid(currentStep)}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={form.handleSubmit(onSubmitForm)} 
                disabled={loading || !isStepValid(currentStep)}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit Request"
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}