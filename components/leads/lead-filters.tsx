"use client"

import { useState, useCallback } from "react"
import { LeadFilters } from "@/lib/types/lead"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { debounce } from "@/lib/performance"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  Tag,
  AlertCircle,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LeadFiltersProps {
  filters: LeadFilters
  onFiltersChange: (filters: LeadFilters) => void
  onClearFilters: () => void
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

const commonTags = [
  'enterprise', 'software', 'urgent', 'marketing', 'automation', 
  'integration', 'crm', 'small-business', 'retail', 'demo'
]

const assignedToOptions = [
  { value: 'john-doe', label: 'John Doe' },
  { value: 'jane-smith', label: 'Jane Smith' },
  { value: 'mike-johnson', label: 'Mike Johnson' },
  { value: 'sarah-wilson', label: 'Sarah Wilson' }
]

export function LeadFiltersComponent({ filters, onFiltersChange, onClearFilters }: LeadFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search || '')

  // Debounce search to avoid excessive API calls
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onFiltersChange({ ...filters, search: value || undefined })
    }, 300),
    [filters, onFiltersChange]
  )

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    debouncedSearch(value)
  }

  const handlePriorityToggle = (priority: string) => {
    const currentPriorities = filters.priority || []
    const newPriorities = currentPriorities.includes(priority as any)
      ? currentPriorities.filter(p => p !== priority)
      : [...currentPriorities, priority as any]
    
    onFiltersChange({ 
      ...filters, 
      priority: newPriorities.length > 0 ? newPriorities : undefined 
    })
  }

  const handleStageToggle = (stage: string) => {
    const currentStages = filters.stage || []
    const newStages = currentStages.includes(stage as any)
      ? currentStages.filter(s => s !== stage)
      : [...currentStages, stage as any]
    
    onFiltersChange({ 
      ...filters, 
      stage: newStages.length > 0 ? newStages : undefined 
    })
  }

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || []
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag]
    
    onFiltersChange({ 
      ...filters, 
      tags: newTags.length > 0 ? newTags : undefined 
    })
  }

  const handleAssignedToToggle = (assignedTo: string) => {
    const currentAssignedTo = filters.assignedTo || []
    const newAssignedTo = currentAssignedTo.includes(assignedTo)
      ? currentAssignedTo.filter(a => a !== assignedTo)
      : [...currentAssignedTo, assignedTo]
    
    onFiltersChange({ 
      ...filters, 
      assignedTo: newAssignedTo.length > 0 ? newAssignedTo : undefined 
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.priority?.length) count++
    if (filters.stage?.length) count++
    if (filters.tags?.length) count++
    if (filters.assignedTo?.length) count++
    return count
  }

  const hasActiveFilters = () => {
    return !!(filters.search || filters.priority?.length || filters.stage?.length || 
              filters.tags?.length || filters.assignedTo?.length)
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search leads, companies, emails..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-8"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-6 w-6 p-0"
            onClick={() => handleSearchChange('')}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Filter Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="mr-2 h-4 w-4" />
            Filter
            <ChevronDown className="ml-2 h-4 w-4" />
            {getActiveFiltersCount() > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
              >
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filter Leads</h4>
              {hasActiveFilters() && (
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                  Clear All
                </Button>
              )}
            </div>

            {/* Priority Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Priority
              </label>
              <div className="grid grid-cols-2 gap-2">
                {priorityOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`priority-${option.value}`}
                      checked={filters.priority?.includes(option.value as any) || false}
                      onCheckedChange={() => handlePriorityToggle(option.value)}
                    />
                    <label
                      htmlFor={`priority-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      <Badge variant="outline" className={cn("text-xs", option.color)}>
                        {option.label}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Stage</label>
              <div className="space-y-2">
                {stageOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`stage-${option.value}`}
                      checked={filters.stage?.includes(option.value as any) || false}
                      onCheckedChange={() => handleStageToggle(option.value)}
                    />
                    <label
                      htmlFor={`stage-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Tags
              </label>
              <div className="grid grid-cols-2 gap-2">
                {commonTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={filters.tags?.includes(tag) || false}
                      onCheckedChange={() => handleTagToggle(tag)}
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="text-sm cursor-pointer"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned To Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Assigned To
              </label>
              <div className="space-y-2">
                {assignedToOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`assigned-${option.value}`}
                      checked={filters.assignedTo?.includes(option.value) || false}
                      onCheckedChange={() => handleAssignedToToggle(option.value)}
                    />
                    <label
                      htmlFor={`assigned-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear Filters Button */}
      {hasActiveFilters() && (
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  )
}