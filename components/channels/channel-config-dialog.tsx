"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Save, 
  TestTube, 
  Key, 
  Settings, 
  Info, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Copy,
  Eye,
  EyeOff
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Channel {
  id: string
  name: string
  type: string
  icon: React.ReactNode
  description: string
  status: 'connected' | 'disconnected' | 'pending' | 'error'
  isEnabled: boolean
  features: string[]
  setupComplexity: 'easy' | 'medium' | 'advanced'
}

interface ChannelConfigDialogProps {
  channel: Channel | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (config: any) => void
}

interface ConfigField {
  key: string
  label: string
  type: 'text' | 'password' | 'textarea' | 'url' | 'email'
  placeholder: string
  required: boolean
  description?: string
  helpUrl?: string
}

const getChannelConfig = (channelType: string): ConfigField[] => {
  switch (channelType) {
    case 'email':
      return [
        {
          key: 'smtpHost',
          label: 'SMTP Host',
          type: 'text',
          placeholder: 'smtp.gmail.com',
          required: true,
          description: 'Your email provider\'s SMTP server'
        },
        {
          key: 'smtpPort',
          label: 'SMTP Port',
          type: 'text',
          placeholder: '587',
          required: true
        },
        {
          key: 'username',
          label: 'Username/Email',
          type: 'email',
          placeholder: 'your-email@example.com',
          required: true
        },
        {
          key: 'password',
          label: 'Password/App Password',
          type: 'password',
          placeholder: 'Your email password',
          required: true,
          description: 'Use app-specific password for Gmail'
        }
      ]
    case 'whatsapp':
      return [
        {
          key: 'phoneNumberId',
          label: 'Phone Number ID',
          type: 'text',
          placeholder: '1234567890123456',
          required: true,
          description: 'From your WhatsApp Business API dashboard',
          helpUrl: 'https://developers.facebook.com/docs/whatsapp'
        },
        {
          key: 'accessToken',
          label: 'Access Token',
          type: 'password',
          placeholder: 'Your WhatsApp Business API token',
          required: true
        },
        {
          key: 'webhookVerifyToken',
          label: 'Webhook Verify Token',
          type: 'password',
          placeholder: 'Custom verification token',
          required: true
        }
      ]
    case 'sms':
      return [
        {
          key: 'accountSid',
          label: 'Account SID',
          type: 'text',
          placeholder: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          required: true,
          description: 'Your Twilio Account SID'
        },
        {
          key: 'authToken',
          label: 'Auth Token',
          type: 'password',
          placeholder: 'Your Twilio Auth Token',
          required: true
        },
        {
          key: 'phoneNumber',
          label: 'From Phone Number',
          type: 'text',
          placeholder: '+1234567890',
          required: true,
          description: 'Your Twilio phone number'
        }
      ]
    case 'facebook':
      return [
        {
          key: 'pageId',
          label: 'Page ID',
          type: 'text',
          placeholder: '1234567890123456',
          required: true,
          description: 'Your Facebook Page ID'
        },
        {
          key: 'pageAccessToken',
          label: 'Page Access Token',
          type: 'password',
          placeholder: 'Your Facebook Page Access Token',
          required: true,
          helpUrl: 'https://developers.facebook.com/docs/pages/access-tokens'
        },
        {
          key: 'appSecret',
          label: 'App Secret',
          type: 'password',
          placeholder: 'Your Facebook App Secret',
          required: true
        }
      ]
    case 'linkedin':
      return [
        {
          key: 'clientId',
          label: 'Client ID',
          type: 'text',
          placeholder: 'Your LinkedIn App Client ID',
          required: true
        },
        {
          key: 'clientSecret',
          label: 'Client Secret',
          type: 'password',
          placeholder: 'Your LinkedIn App Client Secret',
          required: true
        },
        {
          key: 'redirectUri',
          label: 'Redirect URI',
          type: 'url',
          placeholder: 'https://your-domain.com/auth/linkedin',
          required: true
        }
      ]
    case 'google-meet':
      return [
        {
          key: 'clientId',
          label: 'Google Client ID',
          type: 'text',
          placeholder: 'Your Google OAuth Client ID',
          required: true,
          description: 'From Google Cloud Console',
          helpUrl: 'https://console.cloud.google.com/apis/credentials'
        },
        {
          key: 'clientSecret',
          label: 'Google Client Secret',
          type: 'password',
          placeholder: 'Your Google OAuth Client Secret',
          required: true,
          description: 'Keep this secure and never share publicly'
        },
        {
          key: 'calendarId',
          label: 'Default Calendar ID',
          type: 'text',
          placeholder: 'primary',
          required: false,
          description: 'Calendar ID for scheduling meetings (optional, defaults to primary)'
        }
      ]
    case 'google-sheets':
      return [
        {
          key: 'clientId',
          label: 'Google Client ID',
          type: 'text',
          placeholder: 'Your Google OAuth Client ID',
          required: true,
          description: 'From Google Cloud Console',
          helpUrl: 'https://console.cloud.google.com/apis/credentials'
        },
        {
          key: 'clientSecret',
          label: 'Google Client Secret',
          type: 'password',
          placeholder: 'Your Google OAuth Client Secret',
          required: true,
          description: 'Keep this secure and never share publicly'
        },
        {
          key: 'spreadsheetId',
          label: 'Default Spreadsheet ID',
          type: 'text',
          placeholder: 'Google Sheets ID for data sync',
          required: false,
          description: 'Optional: Default sheet for CRM data export'
        }
      ]
    default:
      return []
  }
}

export function ChannelConfigDialog({ channel, open, onOpenChange, onSave }: ChannelConfigDialogProps) {
  const [config, setConfig] = useState<Record<string, string>>({})
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [saving, setSaving] = useState(false)

  if (!channel) return null

  const configFields = getChannelConfig(channel.type)

  const handleInputChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }))
    setTestResult(null) // Clear test result when config changes
  }

  const togglePasswordVisibility = (key: string) => {
    setShowPasswords(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)

    try {
      // For Google services, we need different testing logic
      if (channel.type === 'google-meet' || channel.type === 'google-sheets') {
        // Check if required Google OAuth fields are present
        const clientId = config.clientId
        const clientSecret = config.clientSecret

        if (!clientId || !clientSecret) {
          setTestResult({
            success: false,
            message: 'Please provide both Google Client ID and Client Secret before testing.'
          })
          return
        }

        // Simulate Google OAuth validation
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Mock validation result
        const success = Math.random() > 0.2 // 80% success rate for Google services
        setTestResult({
          success,
          message: success 
            ? `Google OAuth credentials validated successfully for ${channel.name}!`
            : `Failed to validate Google OAuth credentials. Please check your Client ID and Secret.`
        })
      } else {
        // Original logic for other channels
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Mock test result based on channel type
        const success = Math.random() > 0.3 // 70% success rate for demo
        setTestResult({
          success,
          message: success 
            ? `Successfully connected to ${channel.name}!`
            : `Failed to connect to ${channel.name}. Please check your credentials.`
        })
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Test failed due to network error.'
      })
    } finally {
      setTesting(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 1000))
      onSave?.(config)
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to save configuration:', error)
    } finally {
      setSaving(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-muted">
              {channel.icon}
            </div>
            <div>
              <DialogTitle>Configure {channel.name}</DialogTitle>
              <DialogDescription>
                Set up your {channel.name} integration to start communicating with customers
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="configuration" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="configuration" className="space-y-4">
            {/* Configuration Fields */}
            <div className="space-y-4">
              {configFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.key}>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {field.helpUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs"
                        onClick={() => window.open(field.helpUrl, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Help
                      </Button>
                    )}
                  </div>
                  
                  <div className="relative">
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.key}
                        placeholder={field.placeholder}
                        value={config[field.key] || ''}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={field.key}
                        type={field.type === 'password' && !showPasswords[field.key] ? 'password' : 'text'}
                        placeholder={field.placeholder}
                        value={config[field.key] || ''}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'password' && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility(field.key)}
                      >
                        {showPasswords[field.key] ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    )}
                  </div>
                  
                  {field.description && (
                    <p className="text-xs text-muted-foreground">{field.description}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Test Connection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Test Connection</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTest}
                  disabled={testing || !Object.keys(config).length}
                >
                  <TestTube className="mr-2 h-4 w-4" />
                  {testing ? 'Testing...' : 'Test'}
                </Button>
              </div>

              {testResult && (
                <Alert variant={testResult.success ? "default" : "destructive"}>
                  {testResult.success ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{testResult.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Channel Settings</CardTitle>
                <CardDescription>
                  Configure how this channel behaves in your CRM
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-reply</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically respond to incoming messages
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lead Creation</Label>
                    <p className="text-xs text-muted-foreground">
                      Create leads from new conversations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Get notified of new messages
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Setup Instructions</CardTitle>
                <CardDescription>
                  Step-by-step guide to configure {channel.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {channel.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Setup Complexity</h4>
                  <Badge variant={
                    channel.setupComplexity === 'easy' ? 'default' :
                    channel.setupComplexity === 'medium' ? 'secondary' : 'destructive'
                  }>
                    {channel.setupComplexity.charAt(0).toUpperCase() + channel.setupComplexity.slice(1)}
                  </Badge>
                </div>

                {(channel.type === 'google-meet' || channel.type === 'google-sheets') ? (
                  <div className="space-y-2">
                    <h4 className="font-medium">OAuth Redirect URI</h4>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={`${typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/auth/google/callback`}
                        readOnly
                        className="font-mono text-xs"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`${typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/auth/google/callback`)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add this redirect URI to your Google Cloud Console OAuth configuration
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="font-medium">Webhook URL</h4>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={`https://your-domain.com/webhooks/${channel.type}`}
                        readOnly
                        className="font-mono text-xs"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`https://your-domain.com/webhooks/${channel.type}`)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use this URL in your {channel.name} webhook configuration
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}