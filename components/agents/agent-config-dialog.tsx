"use client"

import { useState } from "react"
import { Agent } from "@/lib/types/agent"
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

import { Clock, MessageSquare, Settings, User } from "lucide-react"

interface AgentConfigDialogProps {
  agent: Agent
  onSave: (agent: Agent) => void
  onClose: () => void
}

export function AgentConfigDialog({ agent, onSave, onClose }: AgentConfigDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: agent.name,
    description: agent.description,
    workingHours: {
      start: agent.configuration.workingHours.start,
      end: agent.configuration.workingHours.end,
      timezone: agent.configuration.workingHours.timezone
    },
    behavior: {
      tone: agent.configuration.behavior.tone,
      responseStyle: agent.configuration.behavior.responseStyle
    },
    channels: agent.configuration.channels
  })

  const handleSave = async () => {
    try {
      setLoading(true)
      const updatedAgent = await AgentsService.updateAgent(agent.id, {
        name: formData.name,
        description: formData.description,
        configuration: {
          ...agent.configuration,
          workingHours: formData.workingHours,
          behavior: {
            ...agent.configuration.behavior,
            tone: formData.behavior.tone,
            responseStyle: formData.behavior.responseStyle
          },
          channels: formData.channels
        }
      })
      onSave(updatedAgent)
    } catch (error) {
      console.error('Failed to update agent:', error)
    } finally {
      setLoading(false)
    }
  }

  const availableChannels = ['email', 'chat', 'phone', 'linkedin', 'whatsapp', 'sms']

  const toggleChannel = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }))
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configure {agent.name}</span>
          </DialogTitle>
          <DialogDescription>
            Customize your agent's behavior, working hours, and channel integrations.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
                <CardDescription>
                  Update your agent's name and description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Agent Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter agent name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this agent does"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Communication Style</CardTitle>
                <CardDescription>
                  Configure how your agent communicates with customers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tone of Voice</Label>
                  <Select 
                    value={formData.behavior.tone} 
                    onValueChange={(value: Agent['configuration']['behavior']['tone']) => 
                      setFormData(prev => ({ 
                        ...prev, 
                        behavior: { ...prev.behavior, tone: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Response Style</Label>
                  <Select 
                    value={formData.behavior.responseStyle} 
                    onValueChange={(value: Agent['configuration']['behavior']['responseStyle']) => 
                      setFormData(prev => ({ 
                        ...prev, 
                        behavior: { ...prev.behavior, responseStyle: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Working Hours</span>
                </CardTitle>
                <CardDescription>
                  Set when your agent should be active
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={formData.workingHours.start}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        workingHours: { ...prev.workingHours, start: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={formData.workingHours.end}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        workingHours: { ...prev.workingHours, end: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select 
                    value={formData.workingHours.timezone} 
                    onValueChange={(value) => 
                      setFormData(prev => ({
                        ...prev,
                        workingHours: { ...prev.workingHours, timezone: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="channels" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Channel Integrations</span>
                </CardTitle>
                <CardDescription>
                  Select which channels this agent can use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {availableChannels.map((channel) => (
                    <div key={channel} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="capitalize">{channel}</span>
                      </div>
                      <Switch
                        checked={formData.channels.includes(channel)}
                        onCheckedChange={() => toggleChannel(channel)}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Label>Active Channels</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.channels.map((channel) => (
                      <Badge key={channel} variant="secondary">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}