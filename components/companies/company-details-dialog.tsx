"use client"

import { Company } from "@/lib/types/company"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Briefcase,
  Calendar,
  ExternalLink,
  Mail,
  Phone
} from "lucide-react"

interface CompanyDetailsDialogProps {
  company: Company | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CompanyDetailsDialog({ company, open, onOpenChange }: CompanyDetailsDialogProps) {
  if (!company) return null

  const initials = company.name.split(' ').map(n => n[0]).join('').toUpperCase()

  const getSizeColor = (size: Company['size']) => {
    const colors = {
      startup: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      small: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      medium: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      large: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      enterprise: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
    return colors[size] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">{company.name}</DialogTitle>
                <DialogDescription className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>{company.industry}</span>
                  <span>•</span>
                  <Badge variant="outline" className={getSizeColor(company.size)}>
                    {company.size.charAt(0).toUpperCase() + company.size.slice(1)}
                  </Badge>
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 p-1">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Industry</div>
                  <div className="text-sm">{company.industry}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Company Size</div>
                  <Badge variant="outline" className={getSizeColor(company.size)}>
                    {company.size.charAt(0).toUpperCase() + company.size.slice(1)}
                  </Badge>
                </div>
              </div>

              {company.website && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Website</div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                    >
                      {company.website.replace('https://', '')}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              )}

              {company.address && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Address</div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm">
                      <div>{company.address.street}</div>
                      <div>{company.address.city}, {company.address.state} {company.address.zipCode}</div>
                      <div>{company.address.country}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Created</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(company.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(company.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Contacts ({company.contacts.length})
              </CardTitle>
              <CardDescription>
                People associated with this company
              </CardDescription>
            </CardHeader>
            <CardContent>
              {company.contacts.length > 0 ? (
                <div className="space-y-3">
                  {company.contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {contact.firstName[0]}{contact.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {contact.firstName} {contact.lastName}
                          </div>
                          {contact.position && (
                            <div className="text-xs text-muted-foreground">
                              {contact.position}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {contact.email && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Mail className="h-3 w-3" />
                          </Button>
                        )}
                        {contact.phone && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Phone className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">No contacts added yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Deals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Active Deals ({company.deals.length})
              </CardTitle>
              <CardDescription>
                Current sales opportunities with this company
              </CardDescription>
            </CardHeader>
            <CardContent>
              {company.deals.length > 0 ? (
                <div className="space-y-3">
                  {company.deals.map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{deal.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Stage: {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          {deal.currency} {deal.dealAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {deal.priority} priority
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">No active deals</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}