"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronUp,
  ChevronDown,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface DataTableColumn<T> {
  key: keyof T | string
  title: string
  sortable?: boolean
  searchable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  width?: string
}

export interface DataTableAction<T> {
  label: string
  icon?: React.ReactNode
  onClick: (row: T) => void
  variant?: "default" | "destructive"
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  actions?: DataTableAction<T>[]
  searchable?: boolean
  selectable?: boolean
  pagination?: boolean
  pageSize?: number
  loading?: boolean
  onRowClick?: (row: T) => void
  className?: string
}

type SortDirection = "asc" | "desc" | null

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  searchable = true,
  selectable = false,
  pagination = true,
  pageSize = 10,
  loading = false,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)

  // Filter data based on search term
  const filteredData = searchable && searchTerm
    ? data.filter((row) =>
        columns.some((column) => {
          if (!column.searchable) return false
          const value = row[column.key as keyof T]
          return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        })
      )
    : data

  // Sort data
  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]
        
        if (aValue === bValue) return 0
        
        const comparison = aValue < bValue ? -1 : 1
        return sortDirection === "desc" ? -comparison : comparison
      })
    : filteredData

  // Paginate data
  const totalPages = pagination ? Math.ceil(sortedData.length / pageSize) : 1
  const startIndex = pagination ? (currentPage - 1) * pageSize : 0
  const endIndex = pagination ? startIndex + pageSize : sortedData.length
  const paginatedData = sortedData.slice(startIndex, endIndex)

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc"
      )
      if (sortDirection === "desc") {
        setSortColumn(null)
      }
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map((_, index) => startIndex + index)))
    } else {
      setSelectedRows(new Set())
    }
  }

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(index)
    } else {
      newSelected.delete(index)
    }
    setSelectedRows(newSelected)
  }

  const isAllSelected = paginatedData.length > 0 && 
    paginatedData.every((_, index) => selectedRows.has(startIndex + index))

  const isSomeSelected = paginatedData.some((_, index) => selectedRows.has(startIndex + index))

  if (loading) {
    return (
      <div className="space-y-4">
        {searchable && (
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <div className="absolute left-2 top-2.5 h-4 w-4 bg-muted animate-pulse rounded" />
              <div className="h-10 bg-muted animate-pulse rounded-md pl-8" />
            </div>
          </div>
        )}
        <div className="border rounded-md">
          <div className="h-12 bg-muted animate-pulse" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-muted/50 animate-pulse border-t" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search */}
      {searchable && (
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          {selectedRows.size > 0 && (
            <Badge variant="secondary">
              {selectedRows.size} selected
            </Badge>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-slate-800 border border-slate-700/40 rounded-xl shadow-card"
           style={{
             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(148, 163, 184, 0.05)'
           }}>
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className={cn(isSomeSelected && !isAllSelected && "data-[state=checked]:bg-muted")}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key as string}
                  className={cn(
                    column.sortable && "cursor-pointer hover:bg-muted/50",
                    column.width && `w-${column.width}`
                  )}
                  onClick={() => column.sortable && handleSort(column.key as string)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={cn(
                            "h-3 w-3",
                            sortColumn === column.key && sortDirection === "asc"
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 -mt-1",
                            sortColumn === column.key && sortDirection === "desc"
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
              {actions && actions.length > 0 && (
                <TableHead className="w-12">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                const actualIndex = startIndex + index
                return (
                  <TableRow
                    key={actualIndex}
                    className={cn(
                      onRowClick && "cursor-pointer hover:bg-muted/50",
                      selectedRows.has(actualIndex) && "bg-muted/50"
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.has(actualIndex)}
                          onCheckedChange={(checked) => handleSelectRow(actualIndex, checked as boolean)}
                          aria-label={`Select row ${actualIndex + 1}`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell key={column.key as string}>
                        {column.render
                          ? column.render(row[column.key as keyof T], row)
                          : row[column.key as keyof T]?.toString() || "-"}
                      </TableCell>
                    ))}
                    {actions && actions.length > 0 && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {actions.map((action, actionIndex) => (
                              <DropdownMenuItem
                                key={actionIndex}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  action.onClick(row)
                                }}
                                className={cn(
                                  action.variant === "destructive" && "text-destructive"
                                )}
                              >
                                {action.icon && (
                                  <span className="mr-2">{action.icon}</span>
                                )}
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of{" "}
            {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}