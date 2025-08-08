"use client"

import { useState, useEffect } from "react"
import { CrmLayout } from "@/components/layout/crm-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DataTable, DataTableColumn, DataTableAction } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Contact } from "@/lib/types/contact"
import { Company } from "@/lib/types/company"
import { ContactsService } from "@/lib/api/contacts"
import { CompaniesService } from "@/lib/api/companies"
import { Plus, User, Eye, Edit, Trash2, Mail, Phone, Building2, Linkedin } from "lucide-react"

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [contactsData, companiesData] = await Promise.all([
        ContactsService.getContacts(),
        CompaniesService.getCompanies()
      ])
      setContacts(contactsData)
      setCompanies(companiesData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCompanyName = (companyId: string) => {
    const company = companies.find(c => c.id === companyId)
    return company?.name || 'Unknown Company'
  }

  const columns: DataTableColumn<Contact>[] = [
    {
      key: 'firstName',
      title: 'Contact',
      sortable: true,
      searchable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            {row.avatar ? (
              <AvatarImage src={row.avatar} alt={`${row.firstName} ${row.lastName}`} />
            ) : (
              <AvatarFallback className="text-xs">
                {row.firstName[0]}{row.lastName[0]}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-medium">{row.firstName} {row.lastName}</div>
            {row.position && (
              <div className="text-xs text-muted-foreground">{row.position}</div>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true,
      searchable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Mail className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{value}</span>
        </div>
      )
    },
    {
      key: 'phone',
      title: 'Phone',
      render: (value) => (
        value ? (
          <div className="flex items-center space-x-2">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{value}</span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">Not provided</span>
        )
      )
    },
    {
      key: 'companyId',
      title: 'Company',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Building2 className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{getCompanyName(value)}</span>
        </div>
      )
    },
    {
      key: 'socialProfiles',
      title: 'Social',
      render: (value) => (
        <div className="flex items-center space-x-1">
          {value && value.length > 0 ? (
            value.map((profile: any, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {profile.platform === 'linkedin' && <Linkedin className="h-3 w-3 mr-1" />}
                {profile.platform}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">None</span>
          )}
        </div>
      )
    },
    {
      key: 'createdAt',
      title: 'Added',
      sortable: true,
      render: (value) => (
        <div className="text-sm text-muted-foreground">
          {new Date(value).toLocaleDateString()}
        </div>
      )
    }
  ]

  const actions: DataTableAction<Contact>[] = [
    {
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />,
      onClick: (contact) => {
        console.log('View contact:', contact)
        // TODO: Implement contact details view
      }
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (contact) => {
        console.log('Edit contact:', contact)
        // TODO: Implement contact editing
      }
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive' as const,
      onClick: (contact) => {
        console.log('Delete contact:', contact)
        // TODO: Implement contact deletion
      }
    }
  ]

  const handleRowClick = (contact: Contact) => {
    console.log('Contact clicked:', contact)
    // TODO: Navigate to contact details page
  }

  return (
    <ProtectedRoute>
      <CrmLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
            <p className="text-muted-foreground">
              Manage your contact relationships and communication.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>

        <DataTable
          data={contacts}
          columns={columns}
          actions={actions}
          loading={loading}
          searchable={true}
          selectable={true}
          pagination={true}
          pageSize={10}
          onRowClick={handleRowClick}
        />
      </div>
    </CrmLayout>
    </ProtectedRoute>
  )
}