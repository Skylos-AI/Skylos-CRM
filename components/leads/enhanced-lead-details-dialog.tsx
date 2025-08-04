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
  Eye,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PriorityIndicator, StatusIndicator } from "./priority-status-indicators"
import { EnhancedTagSystem } from "./enhanced-tag-system"




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





export function EnhancedLeadDetailsDialog({ lead, open, onOpenChange, onSave, defaultTab = 'details' }: EnhancedLeadDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedLead, setEditedLead] = useState<Lead | null>(null)
  const [activeTab, setActiveTab] = useState(defaultTab)

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
      // Basic validation
      if (!editedLead.name.trim()) {
        alert('Lead name is required')
        return
      }
      if (!editedLead.email.trim()) {
        alert('Email is required')
        return
      }
      if (editedLead.dealAmount <= 0) {
        alert('Deal amount must be greater than 0')
        return
      }
      
      onSave(editedLead)
      setIsEditing(false)
      setEditedLead(null)
    }
  }

  const handleInputChange = (field: keyof Lead, value: any) => {
    if (editedLead) {
      setEditedLead({ ...editedLead, [field]: value })
    }
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
                      placeholder="Lead name (required)"
                      required
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
                      <Label htmlFor="email">Email *</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={currentLead.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Email address (required)"
                          required
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
                      <Label htmlFor="dealAmount">Deal Amount *</Label>
                      {isEditing ? (
                        <Input
                          id="dealAmount"
                          type="number"
                          value={currentLead.dealAmount}
                          onChange={(e) => handleInputChange('dealAmount', parseFloat(e.target.value) || 0)}
                          placeholder="Deal amount"
                          min="0"
                          step="0.01"
                          required
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

              {/* Notes Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes</CardTitle>
                  <CardDescription>
                    Additional information and observations about this lead
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Lead Notes</Label>
                    {isEditing ? (
                      <Textarea
                        id="notes"
                        value={currentLead.notes || ''}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Add notes about this lead..."
                        className="min-h-[100px]"
                      />
                    ) : (
                      <div className="p-3 bg-muted/30 rounded-md min-h-[100px]">
                        {currentLead.notes ? (
                          <p className="text-sm whitespace-pre-wrap">{currentLead.notes}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No notes added yet</p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="follow-up" className="space-y-6 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Follow-up Messages</CardTitle>
                  <CardDescription>
                    Manage follow-up messages for this lead
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Follow-up functionality will be implemented here.</p>
                    <p className="text-sm">Create and schedule follow-up messages for {currentLead.name}.</p>
                  </div>
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