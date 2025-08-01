"use client"

import { useState } from "react"
import { CrmLayout } from "@/components/layout/crm-layout"
import { ChannelConfigDialog } from "@/components/channels/channel-config-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Settings,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Channel {
  id: string
  name: string
  type: 'email' | 'sms' | 'whatsapp' | 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'phone'
  icon: React.ReactNode
  description: string
  status: 'connected' | 'disconnected' | 'pending' | 'error'
  isEnabled: boolean
  features: string[]
  setupComplexity: 'easy' | 'medium' | 'advanced'
  lastSync?: Date
  messagesCount?: number
}

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      icon: <Mail className="h-6 w-6" />,
      description: 'Send and receive emails directly from your CRM',
      status: 'connected',
      isEnabled: true,
      features: ['Automated sequences', 'Templates', 'Tracking', 'Analytics'],
      setupComplexity: 'easy',
      lastSync: new Date(),
      messagesCount: 1247
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      type: 'whatsapp',
      icon: <MessageSquare className="h-6 w-6" />,
      description: 'Connect with customers via WhatsApp Business API',
      status: 'disconnected',
      isEnabled: false,
      features: ['Business messaging', 'Media sharing', 'Quick replies', 'Automation'],
      setupComplexity: 'medium',
      messagesCount: 0
    },
    {
      id: 'sms',
      name: 'SMS',
      type: 'sms',
      icon: <Phone className="h-6 w-6" />,
      description: 'Send SMS messages and notifications',
      status: 'pending',
      isEnabled: true,
      features: ['Bulk messaging', 'Delivery reports', 'Two-way SMS', 'Scheduling'],
      setupComplexity: 'easy',
      messagesCount: 89
    },
    {
      id: 'facebook',
      name: 'Facebook Messenger',
      type: 'facebook',
      icon: <Facebook className="h-6 w-6" />,
      description: 'Manage Facebook page messages and comments',
      status: 'error',
      isEnabled: false,
      features: ['Page messaging', 'Comment management', 'Auto-replies', 'Lead ads'],
      setupComplexity: 'medium'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      type: 'linkedin',
      icon: <Linkedin className="h-6 w-6" />,
      description: 'Professional networking and lead generation',
      status: 'disconnected',
      isEnabled: false,
      features: ['InMail', 'Connection requests', 'Lead generation', 'Company pages'],
      setupComplexity: 'advanced'
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      type: 'twitter',
      icon: <Twitter className="h-6 w-6" />,
      description: 'Monitor mentions and engage with followers',
      status: 'disconnected',
      isEnabled: false,
      features: ['Mention monitoring', 'Direct messages', 'Tweet scheduling', 'Analytics'],
      setupComplexity: 'medium'
    }
  ])

  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [configDialogOpen, setConfigDialogOpen] = useState(false)

  const getStatusColor = (status: Channel['status']) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100'
      case 'disconnected': return 'text-gray-600 bg-gray-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'error': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: Channel['status']) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />
      case 'disconnected': return <AlertCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'error': return <AlertCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getComplexityColor = (complexity: Channel['setupComplexity']) => {
    switch (complexity) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleToggleChannel = (channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, isEnabled: !channel.isEnabled }
        : channel
    ))
  }

  const handleConfigureChannel = (channel: Channel) => {
    setSelectedChannel(channel)
    setConfigDialogOpen(true)
  }

  const handleSaveConfig = (config: any) => {
    console.log('Saving config for', selectedChannel?.name, ':', config)
    // Update channel status to connected after successful save
    if (selectedChannel) {
      setChannels(prev => prev.map(channel => 
        channel.id === selectedChannel.id 
          ? { ...channel, status: 'connected' as const }
          : channel
      ))
    }
  }

  const connectedChannels = channels.filter(c => c.status === 'connected').length
  const totalMessages = channels.reduce((sum, c) => sum + (c.messagesCount || 0), 0)

  return (
    <CrmLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Channels</h1>
            <p className="text-muted-foreground">
              Configure your communication channels and integrations to reach customers across multiple platforms.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Channel
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Channels</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{connectedChannels}</div>
              <p className="text-xs text-muted-foreground">
                out of {channels.length} available
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMessages.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                across all channels
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {channels.filter(c => c.isEnabled).length}
              </div>
              <p className="text-xs text-muted-foreground">
                enabled channels
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Channel Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <Card key={channel.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {channel.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{channel.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", getStatusColor(channel.status))}
                        >
                          {getStatusIcon(channel.status)}
                          <span className="ml-1 capitalize">{channel.status}</span>
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", getComplexityColor(channel.setupComplexity))}
                        >
                          {channel.setupComplexity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={channel.isEnabled}
                    onCheckedChange={() => handleToggleChannel(channel.id)}
                    disabled={channel.status === 'error'}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>
                  {channel.description}
                </CardDescription>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {channel.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                {channel.messagesCount !== undefined && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Messages</span>
                    <span className="font-medium">{channel.messagesCount.toLocaleString()}</span>
                  </div>
                )}

                {channel.lastSync && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last sync</span>
                    <span className="font-medium">
                      {channel.lastSync.toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant={channel.status === 'connected' ? 'outline' : 'default'}
                    size="sm"
                    className="flex-1"
                    onClick={() => handleConfigureChannel(channel)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {channel.status === 'connected' ? 'Configure' : 'Connect'}
                  </Button>
                  {channel.status === 'connected' && (
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Setup Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Setup Guide</CardTitle>
            <CardDescription>
              Get started with your most important channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Recommended for Sales Teams</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Email - Essential for professional communication</li>
                  <li>• WhatsApp Business - Direct customer messaging</li>
                  <li>• LinkedIn - B2B lead generation and networking</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Recommended for Marketing</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• SMS - High open rate notifications</li>
                  <li>• Facebook Messenger - Social media engagement</li>
                  <li>• Twitter/X - Brand monitoring and support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Dialog */}
        <ChannelConfigDialog
          channel={selectedChannel}
          open={configDialogOpen}
          onOpenChange={setConfigDialogOpen}
          onSave={handleSaveConfig}
        />
      </div>
    </CrmLayout>
  )
}