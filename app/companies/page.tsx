"use client"

import { useState, useEffect } from "react"
import { CrmLayout } from "@/components/layout/crm-layout"
import { DataTable, DataTableColumn, DataTableAction } from "@/components/shared/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Company } from "@/lib/types/company"
import { CompaniesService } from "@/lib/api/companies"
import { Plus, Building2, Eye, Edit, Trash2, Globe } from "lucide-react"

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      const data = await CompaniesService.getCompanies()
      setCompanies(data)
    } catch (error) {
      console.error('Failed to load companies:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSizeColor = (size: Company['size']) => {
    const colors = {
      startup: 'bg-purple-100 text-purple-800',
      small: 'bg-blue-100 text-blue-800',
      medium: 'bg-green-100 text-green-800',
      large: 'bg-orange-100 text-orange-800',
      enterprise: 'bg-red-100 text-red-800'
    }
    return colors[size] || 'bg-gray-100 text-gray-800'
  }

  const columns: DataTableColumn<Company>[] = [
    {
      key: 'name',
      title: 'Company',
      sortable: true,
      searchable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {row.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{value}</div>
            {row.website && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Globe className="h-3 w-3 mr-1" />
                {row.website.replace('https://', '')}
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'industry',
      title: 'Industry',
      sortable: true,
      searchable: true,
    },
    {
      key: 'size',
      title: 'Size',
      sortable: true,
      render: (value) => (
        <Badge variant="outline" className={getSizeColor(value)}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    {
      key: 'contacts',
      title: 'Contacts',
      render: (value) => (
        <div className="text-sm">
          {value.length} contact{value.length !== 1 ? 's' : ''}
        </div>
      )
    },
    {
      key: 'deals',
      title: 'Active Deals',
      render: (value) => (
        <div className="text-sm">
          {value.length} deal{value.length !== 1 ? 's' : ''}
        </div>
      )
    },
    {
      key: 'address',
      title: 'Location',
      render: (value) => (
        <div className="text-sm text-muted-foreground">
          {value ? `${value.city}, ${value.state}` : 'Not specified'}
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

  const actions: DataTableAction<Company>[] = [
    {
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />,
      onClick: (company) => {
        console.log('View company:', company)
        // TODO: Implement company details view
      }
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (company) => {
        console.log('Edit company:', company)
        // TODO: Implement company editing
      }
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive' as const,
      onClick: (company) => {
        console.log('Delete company:', company)
        // TODO: Implement company deletion
      }
    }
  ]

  const handleRowClick = (company: Company) => {
    console.log('Company clicked:', company)
    // TODO: Navigate to company details page
  }

  return (
    <CrmLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
            <p className="text-muted-foreground">
              Manage your company relationships and information.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </div>

        <DataTable
          data={companies}
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
  )
}