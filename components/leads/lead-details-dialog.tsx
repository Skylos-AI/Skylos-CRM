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
import { 
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  DollarSign,
  User,
  Tag,
  FileText,
  Edit,
  Save,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LeadDetailsDialogProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (updatedLead: Lead) => void
}

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
]

const stageOptions = [
  { value: 'incoming', label: 'Incoming Leads' },
  { value: 'decision', label: 'Decision Making' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'final', label: 'Final Decision' }
]

export function LeadDetailsDialog({ lead, open, onOpenChange, onSave }: LeadDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedLead, setEditedLead] = useState<Lead | null>(null)

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

  const currentLead = isEditing ? editedLead : lead
  if (!currentLead) return null

  const initials = currentLead.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
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
                <DialogDescription>
                  Lead Details and Information
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

        <div className="grid gap-6 py-4">
          {/* Basic Information */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold flex items-center">
              <User className="h-5 w-5 mr-2" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                {isEditing ? (
                  <Input
                    id="company"
                    value={currentLead.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{currentLead.company}</span>
                  </div>
                )}
              </div>
              
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
            </div>

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
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Deal Information */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Deal Information
            </h3>
            
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
                  <Badge variant="outline">
                    {stageOptions.find(s => s.value === currentLead.stage)?.label}
                  </Badge>
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
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      priorityOptions.find(p => p.value === currentLead.priority)?.color
                    )}
                  >
                    {currentLead.priority}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Tags
            </Label>
            <div className="flex flex-wrap gap-2">
              {currentLead.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Last Contact
              </Label>
              <span className="text-sm">
                {currentLead.lastContactDate 
                  ? new Date(currentLead.lastContactDate).toLocaleDateString()
                  : 'No contact yet'
                }
              </span>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Next Follow-up
              </Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={currentLead.nextFollowUp 
                    ? new Date(currentLead.nextFollowUp).toISOString().split('T')[0]
                    : ''
                  }
                  onChange={(e) => handleInputChange('nextFollowUp', e.target.value ? new Date(e.target.value) : null)}
                />
              ) : (
                <span className="text-sm">
                  {currentLead.nextFollowUp 
                    ? new Date(currentLead.nextFollowUp).toLocaleDateString()
                    : 'Not scheduled'
                  }
                </span>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Notes
            </Label>
            {isEditing ? (
              <Textarea
                id="notes"
                value={currentLead.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                placeholder="Add notes about this lead..."
              />
            ) : (
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                {currentLead.notes || 'No notes added yet.'}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}