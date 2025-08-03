"use client"

import { useState } from "react"
import { Lead } from "@/lib/types/lead"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  User,
  Tag,
  MessageSquare,
  Edit,
  Save,
  X,
  Send,
  Clock,
  FileText,
  Plus,
  Copy,
  Eye
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PriorityIndicator, StatusIndicator } from "./priority-status-indicators"
import { EnhancedTagSystem } from "./enhanced-tag-system"

interface FollowUpMessage {
  id: string
  type: 'email' | 'call' | 'meeting' | 'task'
  subject?: string
  content: string
  scheduledDate?: Date
  status: 'draft' | 'scheduled' | 'sent' | 'completed'
  createdAt: Date
  updatedAt: Date
}

interface EnhancedLeadDetailsDialogProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (updatedLead: Lead) => void
  defaultTab?: string
}

const stageOptions = [
  { value: 'incoming', label: 'Incoming Leads' },
  { value: 'decision', label: 'Decision Making' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'final', label: 'Final Decision' }
]

const messageTemplates = [
  {
    id: 'initial_contact',
    name: 'Initial Contact',
    type: 'email' as const,
    subject: 'Thank you for your interest in [Product]',
    content: `Hi [Name],

Thank you for your interest in our [Product/Service]. I wanted to reach out personally to see how we can help you achieve your goals.

Based on your inquiry, I believe our solution could be a great fit for [Company]. I'd love to schedule a brief 15-minute call to discuss your specific needs and show you how we've helped similar companies.

Would you be available for a quick call this week? I have availability on [Day] at [Time] or [Day] at [Time].

Looking forward to connecting!

Best regards,
[Your Name]`
  },
  {
    id: 'follow_up',
    name: 'Follow-up',
    type: 'email' as const,
    subject: 'Following up on our conversation',
    content: `Hi [Name],

I wanted to follow up on our conversation about [Topic]. I hope you had a chance to review the information I shared.

I'm here to answer any questions you might have and help you move forward with [Next Step].

Would you like to schedule another call to discuss this further?

Best regards,
[Your Name]`
  },
  {
    id: 'proposal_follow_up',
    name: 'Proposal Follow-up',
    type: 'email' as const,
    subject: 'Checking in on your proposal review',
    content: `Hi [Name],

I wanted to check in regarding the proposal I sent over last week. I hope you've had a chance to review it with your team.

I'm happy to answer any questions or make adjustments based on your feedback. 

When would be a good time to discuss the next steps?

Best regards,
[Your Name]`
  }
]

export function EnhancedLeadDetailsDialog({ lead, open, onOpenChange, onSave, defaultTab = 'details' }: EnhancedLeadDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedLead, setEditedLead] = useState<Lead | null>(null)
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [followUpMessages, setFollowUpMessages] = useState<FollowUpMessage[]>([])
  const [newMessage, setNewMessage] = useState<Partial<FollowUpMessage>>({
    type: 'email',
    content: '',
    status: 'draft'
  })

  if (!lead) return null

  const handleEdit = () => {
    setEditedLead({ ...lead })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditedLead(null)
    setIsEditing(false)
  }

  const handleSave = () => {
    if (editedLead && onSave) {
      onSave(editedLead)
    }
    setIsEditing(false)
    setEditedLead(null)
  }

  const handleInputChange = (field: keyof Lead, value: any) => {
    if (editedLead) {
      setEditedLead({ ...editedLead, [field]: value })
    }
  }

  const handleCreateMessage = () => {
    if (newMessage.content) {
      const message: FollowUpMessage = {
        id: Date.now().toString(),
        type: newMessage.type || 'email',
        subject: newMessage.subject,
        content: newMessage.content,
        scheduledDate: newMessage.scheduledDate,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setFollowUpMessages([...followUpMessages, message])
      setNewMessage({ type: 'email', content: '', status: 'draft' })
    }
  }

  const handleUseTemplate = (template: typeof messageTemplates[0]) => {
    setNewMessage({
      ...newMessage,
      type: template.type,
      subject: template.subject.replace('[Product]', 'our solution').replace('[Name]', lead.name),
      content: template.content
        .replace(/\[Name\]/g, lead.name)
        .replace(/\[Company\]/g, lead.company)
        .replace(/\[Product\/Service\]/g, 'our solution')
    })
  }

  const currentLead = isEditing ? editedLead : lead
  if (!currentLead) return null

  const initials = currentLead.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">
                  {isEditing ? (
                    <Input
                      value={currentLead.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-xl font-semibold border-none p-0 h-auto"
                    />
                  ) : (
                    currentLead.name
                  )}
                </DialogTitle>
                <DialogDescription className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>{currentLead.company}</span>
                  <span>•</span>
                  <span className="font-semibold text-green-600">
                    {currentLead.currency} {currentLead.dealAmount.toLocaleString()}
                  </span>
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button size="sm" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Lead Details</TabsTrigger>
            <TabsTrigger value="follow-up">Follow-up Messages</TabsTrigger>
            <TabsTrigger value="activity">Activity History</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="details" className="space-y-6 p-1">
              {/* Quick Status Overview */}
              <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                <PriorityIndicator priority={currentLead.priority} size="md" variant="full" />
                <StatusIndicator stage={currentLead.stage} size="md" variant="full" />
                {currentLead.nextFollowUp && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Next follow-up: {new Date(currentLead.nextFollowUp).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={currentLead.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{currentLead.email}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={currentLead.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{currentLead.phone || 'Not provided'}</span>
                          {currentLead.phone && (
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Copy className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="source">Source</Label>
                      {isEditing ? (
                        <Input
                          id="source"
                          value={currentLead.source}
                          onChange={(e) => handleInputChange('source', e.target.value)}
                        />
                      ) : (
                        <span className="capitalize">{currentLead.source.replace('_', ' ')}</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignedTo">Assigned To</Label>
                      {isEditing ? (
                        <Input
                          id="assignedTo"
                          value={currentLead.assignedTo}
                          onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{currentLead.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Deal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dealAmount">Deal Amount</Label>
                      {isEditing ? (
                        <Input
                          id="dealAmount"
                          type="number"
                          value={currentLead.dealAmount}
                          onChange={(e) => handleInputChange('dealAmount', parseFloat(e.target.value))}
                        />
                      ) : (
                        <div className="text-lg font-semibold text-green-600">
                          {currentLead.currency} {currentLead.dealAmount.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stage">Stage</Label>
                      {isEditing ? (
                        <Select
                          value={currentLead.stage}
                          onValueChange={(value) => handleInputChange('stage', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {stageOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <StatusIndicator stage={currentLead.stage} size="md" variant="badge" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      {isEditing ? (
                        <Select
                          value={currentLead.priority}
                          onValueChange={(value) => handleInputChange('priority', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <PriorityIndicator priority={currentLead.priority} size="md" variant="badge" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <EnhancedTagSystem
                      tags={currentLead.tags}
                      maxVisible={10}
                      size="md"
                      variant="default"
                      editable={isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="follow-up" className="space-y-6 p-1">
              {/* Create New Message */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Program Follow-up Message
                  </CardTitle>
                  <CardDescription>
                    Create and schedule follow-up messages for this lead
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Message Templates */}
                  <div className="space-y-2">
                    <Label>Quick Templates</Label>
                    <div className="flex flex-wrap gap-2">
                      {messageTemplates.map((template) => (
                        <Button
                          key={template.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleUseTemplate(template)}
                        >
                          {template.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Message Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Message Type</Label>
                      <Select
                        value={newMessage.type}
                        onValueChange={(value) => setNewMessage({ ...newMessage, type: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="call">Call Script</SelectItem>
                          <SelectItem value="meeting">Meeting Agenda</SelectItem>
                          <SelectItem value="task">Task Reminder</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Schedule Date (Optional)</Label>
                      <Input
                        type="datetime-local"
                        value={newMessage.scheduledDate ? new Date(newMessage.scheduledDate).toISOString().slice(0, 16) : ''}
                        onChange={(e) => setNewMessage({
                          ...newMessage,
                          scheduledDate: e.target.value ? new Date(e.target.value) : undefined
                        })}
                      />
                    </div>
                  </div>

                  {/* Subject (for emails) */}
                  {newMessage.type === 'email' && (
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Input
                        value={newMessage.subject || ''}
                        onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                        placeholder="Email subject line..."
                      />
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="space-y-2">
                    <Label>Message Content</Label>
                    <Textarea
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                      rows={8}
                      placeholder="Write your follow-up message here..."
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setNewMessage({ type: 'email', content: '', status: 'draft' })}>
                      Clear
                    </Button>
                    <Button onClick={handleCreateMessage}>
                      <Plus className="h-4 w-4 mr-2" />
                      Save Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Saved Messages */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Saved Follow-up Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  {followUpMessages.length > 0 ? (
                    <div className="space-y-4">
                      {followUpMessages.map((message) => (
                        <div key={message.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="capitalize">
                                {message.type}
                              </Badge>
                              <Badge variant={message.status === 'draft' ? 'secondary' : 'default'}>
                                {message.status}
                              </Badge>
                              {message.scheduledDate && (
                                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(message.scheduledDate).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {message.subject && (
                            <h4 className="font-medium">{message.subject}</h4>
                          )}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {message.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No follow-up messages created yet.</p>
                      <p className="text-sm">Create your first message above to get started.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Activity history will appear here.</p>
                    <p className="text-sm">Track all interactions and changes to this lead.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}