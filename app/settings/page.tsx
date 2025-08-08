"use client"

import { CrmLayout } from "@/components/layout/crm-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Database, Bell, Shield, Palette, Globe } from "lucide-react"

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <CrmLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Configure your CRM system preferences and integrations.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>General</span>
                </CardTitle>
                <CardDescription>
                  Basic system configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Status</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Version</span>
                    <Badge variant="secondary">v1.0.0</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Environment</span>
                    <Badge variant="outline">Development</Badge>
                  </div>
                </div>
                <Button className="w-full" variant="outline" disabled>
                  System Configuration (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            {/* Database Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Database</span>
                </CardTitle>
                <CardDescription>
                  Data management and backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Connection Status</span>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Auto Backup</span>
                    <Badge variant="secondary">Daily</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Retention</span>
                    <Badge variant="secondary">1 Year</Badge>
                  </div>
                </div>
                <Button className="w-full" variant="outline" disabled>
                  Database Settings (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </CardTitle>
                <CardDescription>
                  Configure system notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Notifications</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Push Notifications</span>
                    <Badge variant="secondary">Disabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SMS Alerts</span>
                    <Badge variant="secondary">Disabled</Badge>
                  </div>
                </div>
                <Button className="w-full" variant="outline" disabled>
                  Notification Settings (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security</span>
                </CardTitle>
                <CardDescription>
                  System security and access control
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Two-Factor Auth</span>
                    <Badge variant="secondary">Disabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Session Timeout</span>
                    <Badge variant="secondary">24 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Password Policy</span>
                    <Badge variant="default">Strong</Badge>
                  </div>
                </div>
                <Button className="w-full" variant="outline" disabled>
                  Security Settings (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Appearance</span>
                </CardTitle>
                <CardDescription>
                  Customize the look and feel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Theme</span>
                    <Badge variant="secondary">System</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Color Scheme</span>
                    <Badge variant="secondary">Default</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Compact Mode</span>
                    <Badge variant="secondary">Disabled</Badge>
                  </div>
                </div>
                <Button className="w-full" variant="outline" disabled>
                  Appearance Settings (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            {/* Localization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Localization</span>
                </CardTitle>
                <CardDescription>
                  Language and regional settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Language</span>
                    <Badge variant="secondary">English (US)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Timezone</span>
                    <Badge variant="secondary">Auto-detect</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Date Format</span>
                    <Badge variant="secondary">MM/DD/YYYY</Badge>
                  </div>
                </div>
                <Button className="w-full" variant="outline" disabled>
                  Localization Settings (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </CrmLayout>
    </ProtectedRoute>
  )
}