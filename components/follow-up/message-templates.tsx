"use client"

import { useState } from 'react'
import { ContentTemplate, MessageContent } from '@/lib/types/campaign'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Copy, 
  Trash2,
  Mail,
  MessageSquare,
  Share2,
  Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MessageTemplatesProps {
  onSelectTemplate?: (template: ContentTemplate) => void
  onCreateTemplate?: (template: Omit<ContentTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void
  className?: string
}

// Mock templates data
const mockTemplates: ContentTemplate[] = [
  {
    id: 'template-1',
    name: 'Welcome Email',
    type: 'email',
    subject: 'Welcome to our platform, {{lead.name}}!',
    body: 'Hi {{lead.name}},\n\nWelcome to our platform! We\'re excited to have {{lead.company}} on board.\n\nBest regards,\nThe Team',
    mediaAttachments: [],
    personalizations: ['pers-1', 'pers-2'],
    formatting: {
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      textColor: '#333333',
      alignment: 'left'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'template-2',
    name: 'Follow-up Reminder',
    type: 'email',
    subject: 'Quick follow-up on our conversation',
    body: 'Hi {{lead.name}},\n\nI wanted to follow up on our recent conversation about {{lead.company}}\'s needs.\n\nDo you have time for a quick call this week?\n\nBest,\n{{user.name}}',
    mediaAttachments: [],
    personalizations: ['pers-1', 'pers-2'],
    formatting: {
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      textColor: '#333333',
      alignment: 'left'
    },
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: 'template-3',
    name: 'Product Demo Invitation',
    type: 'email',
    subject: 'Exclusive demo invitation for {{lead.company}}',
    body: 'Hello {{lead.name}},\n\nI\'d love to show you how our solution can help {{lead.company}} achieve its goals.\n\nWould you be interested in a personalized demo?\n\nLet me know what works for your schedule.\n\nBest regards,\n{{user.name}}',
    mediaAttachments: ['media-1'],
    personalizations: ['pers-1', 'pers-2'],
    formatting: {
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      textColor: '#333333',
      alignment: 'left'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'template-4',
    name: 'SMS Follow-up',
    type: 'sms',
    body: 'Hi {{lead.name}}, just wanted to check in about {{lead.company}}\'s project. Any questions? - {{user.name}}',
    mediaAttachments: [],
    personalizations: ['pers-1', 'pers-2'],
    formatting: {},
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  }
]

export function MessageTemplates({
  onSelectTemplate,
  onCreateTemplate,
  className
}: MessageTemplatesProps) {
  const [templates, setTemplates] = useState<ContentTemplate[]>(mockTemplates)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'email' | 'sms' | 'social'>('all')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.body.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || template.type === selectedType
    return matchesSearch && matchesType
  })

  const handleSelectTemplate = (template: ContentTemplate) => {
    onSelectTemplate?.(template)
  }

  const handleDuplicateTemplate = (template: ContentTemplate) => {
    const duplicated: ContentTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setTemplates(prev => [duplicated, ...prev])
  }

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId))
  }

  const getTypeIcon = (type: ContentTemplate['type']) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'sms': return <MessageSquare className="h-4 w-4" />
      case 'social': return <Share2 className="h-4 w-4" />
      default: return <Mail className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: ContentTemplate['type']) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'sms': return 'bg-green-100 text-green-800 border-green-200'
      case 'social': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Message Templates</h2>
          <p className="text-muted-foreground">
            Create and manage reusable message templates for follow-ups
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Message Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Template Name</Label>
                  <Input placeholder="Enter template name..." />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="social">Social</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Subject (Email only)</Label>
                <Input placeholder="Enter email subject..." />
              </div>
              <div className="space-y-2">
                <Label>Message Content</Label>
                <textarea 
                  className="w-full p-3 border rounded-md min-h-[200px] resize-none"
                  placeholder="Enter your message template..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setCreateDialogOpen(false)}>
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('all')}
          >
            All
          </Button>
          <Button
            variant={selectedType === 'email' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('email')}
          >
            <Mail className="h-3 w-3 mr-1" />
            Email
          </Button>
          <Button
            variant={selectedType === 'sms' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('sms')}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            SMS
          </Button>
          <Button
            variant={selectedType === 'social' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('social')}
          >
            <Share2 className="h-3 w-3 mr-1" />
            Social
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className="cursor-pointer transition-all hover:shadow-md"
            onClick={() => handleSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(template.type)}
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSelectTemplate(template)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Use Template
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateTemplate(template)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={cn("text-xs", getTypeColor(template.type))}>
                  {template.type.toUpperCase()}
                </Badge>
                {template.mediaAttachments.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {template.mediaAttachments.length} attachment{template.mediaAttachments.length !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {template.subject && (
                <div className="mb-3">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Subject:</div>
                  <div className="text-sm font-medium line-clamp-1">{template.subject}</div>
                </div>
              )}
              <div className="text-sm text-muted-foreground line-clamp-3">
                {template.body}
              </div>
              <div className="mt-4 pt-3 border-t text-xs text-muted-foreground">
                Created {template.createdAt.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search criteria' : 'Create your first message template to get started'}
          </p>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      )}
    </div>
  )
}