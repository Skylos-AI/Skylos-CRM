"use client"

import { useState } from "react"
import { CustomAgentRequest } from "@/lib/types/agent"
import { AgentsService } from "@/lib/api/agents"
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
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, Bot, Lightbulb, Target, Zap } from "lucide-react"

interface CustomAgentBuilderProps {
  onSubmit: (request: CustomAgentRequest) => void
  onClose: () => void
}

export function CustomAgentBuilder({ onSubmit, onClose }: CustomAgentBuilderProps) {
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    businessUseCase: "",
    priority: "medium" as CustomAgentRequest['priority'],
    requirements: [""],
    expectedCapabilities: [""],
    integrationNeeds: [""]
  })

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const request = await AgentsService.createCustomAgentRequest({
        userId: "current-user", // This would come from auth context
        title: formData.title,
        description: formData.description,
        businessUseCase: formData.businessUseCase,
        priority: formData.priority,
        requirements: formData.requirements.filter(r => r.trim()),
        expectedCapabilities: formData.expectedCapabilities.filter(c => c.trim()),
        integrationNeeds: formData.integrationNeeds.filter(i => i.trim()),
        status: 'pending'
      })
      onSubmit(request)
    } catch (error) {
      console.error('Failed to create custom agent request:', error)
    } finally {
      setLoading(false)
    }
  }

  const addListItem = (field: 'requirements' | 'expectedCapabilities' | 'integrationNeeds') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }))
  }

  const updateListItem = (field: 'requirements' | 'expectedCapabilities' | 'integrationNeeds', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const removeListItem = (field: 'requirements' | 'expectedCapabilities' | 'integrationNeeds', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.title.trim() && formData.description.trim()
      case 2:
        return formData.businessUseCase.trim()
      case 3:
        return formData.requirements.some(r => r.trim()) && 
               formData.expectedCapabilities.some(c => c.trim())
      default:
        return true
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Tell us about your custom agent idea
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Agent Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Real Estate Lead Qualifier"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Briefly describe what this agent should do"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Priority Level</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value: CustomAgentRequest['priority']) => 
                    setFormData(prev => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Nice to have</SelectItem>
                    <SelectItem value="medium">Medium - Important</SelectItem>
                    <SelectItem value="high">High - Business critical</SelectItem>
                    <SelectItem value="urgent">Urgent - Immediate need</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Business Use Case</span>
              </CardTitle>
              <CardDescription>
                Explain how this agent will help your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-use-case">Business Use Case *</Label>
                <Textarea
                  id="business-use-case"
                  value={formData.businessUseCase}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessUseCase: e.target.value }))}
                  placeholder="Describe the business problem this agent will solve and the expected benefits"
                  rows={5}
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Tip</h4>
                    <p className="text-sm text-blue-700">
                      Include specific metrics or outcomes you hope to achieve, such as "reduce response time by 50%" or "increase lead conversion by 20%"
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
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
                  <Label>Functional Requirements *</Label>
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={requirement}
                        onChange={(e) => updateListItem('requirements', index, e.target.value)}
                        placeholder="e.g., Must integrate with CRM system"
                      />
                      {formData.requirements.length > 1 && (
                        <Button
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
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem('requirements')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Requirement
                  </Button>
                </div>

                {/* Expected Capabilities */}
                <div className="space-y-3">
                  <Label>Expected Capabilities *</Label>
                  {formData.expectedCapabilities.map((capability, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={capability}
                        onChange={(e) => updateListItem('expectedCapabilities', index, e.target.value)}
                        placeholder="e.g., Natural language processing"
                      />
                      {formData.expectedCapabilities.length > 1 && (
                        <Button
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
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem('expectedCapabilities')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Capability
                  </Button>
                </div>

                {/* Integration Needs */}
                <div className="space-y-3">
                  <Label>Integration Needs</Label>
                  {formData.integrationNeeds.map((integration, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={integration}
                        onChange={(e) => updateListItem('integrationNeeds', index, e.target.value)}
                        placeholder="e.g., Salesforce API, Email platform"
                      />
                      {formData.integrationNeeds.length > 1 && (
                        <Button
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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Custom Agent</DialogTitle>
          <DialogDescription>
            Step {currentStep} of 3: Let's create your custom AI agent
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-2 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : step < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  step < currentStep ? 'bg-green-500' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {renderStep()}

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
            {currentStep < 3 ? (
              <Button 
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!isStepValid(currentStep)}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={loading || !isStepValid(currentStep)}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}