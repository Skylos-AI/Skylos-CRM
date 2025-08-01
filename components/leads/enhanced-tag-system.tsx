"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/design-system"
import { Tag, X, Plus } from "lucide-react"

interface TagSystemProps {
  tags: string[]
  maxVisible?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'secondary'
  editable?: boolean
  onTagRemove?: (tag: string) => void
  onTagAdd?: (tag: string) => void
  className?: string
}

interface TagBadgeProps {
  tag: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'secondary'
  removable?: boolean
  onRemove?: () => void
  className?: string
}

// Predefined tag colors for consistency
const TAG_COLORS = [
  'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
  'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-800',
  'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
  'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800',
  'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-800',
  'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
]

function getTagColor(tag: string): string {
  // Simple hash function to consistently assign colors to tags
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    const char = tag.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]
}

export function TagBadge({ 
  tag, 
  size = 'md', 
  variant = 'default',
  removable = false,
  onRemove,
  className 
}: TagBadgeProps) {
  const colorClass = variant === 'default' ? getTagColor(tag) : ''

  return (
    <Badge 
      className={cn(
        "inline-flex items-center border transition-all duration-150",
        // Size variants
        size === 'sm' && "text-xs px-2 py-0.5 h-5",
        size === 'md' && "text-sm px-2.5 py-1 h-6",
        size === 'lg' && "text-base px-3 py-1.5 h-8",
        // Variant styles
        variant === 'default' && colorClass,
        variant === 'outline' && "border-border bg-transparent text-foreground hover:bg-muted",
        variant === 'secondary' && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Removable styles
        removable && "pr-1 hover:bg-opacity-80",
        className
      )}
    >
      <span className="truncate max-w-[100px]">{tag}</span>
      {removable && (
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "ml-1 p-0 hover:bg-transparent",
            size === 'sm' && "h-3 w-3",
            size === 'md' && "h-4 w-4", 
            size === 'lg' && "h-5 w-5"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
        >
          <X className="h-2.5 w-2.5" />
        </Button>
      )}
    </Badge>
  )
}

export function EnhancedTagSystem({ 
  tags, 
  maxVisible = 3,
  size = 'md',
  variant = 'default',
  editable = false,
  onTagRemove,
  onTagAdd,
  className 
}: TagSystemProps) {
  const visibleTags = tags.slice(0, maxVisible)
  const hiddenTags = tags.slice(maxVisible)
  const hasHiddenTags = hiddenTags.length > 0

  if (tags.length === 0) {
    return editable ? (
      <div className={cn("flex items-center space-x-2", className)}>
        <Tag className="h-3 w-3 text-muted-foreground" />
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          onClick={() => onTagAdd?.('')}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add tag
        </Button>
      </div>
    ) : null
  }

  return (
    <TooltipProvider>
      <div className={cn("flex items-center space-x-1 flex-wrap gap-1", className)}>
        {/* Tag icon */}
        <Tag className="h-3 w-3 text-muted-foreground shrink-0" />
        
        {/* Visible tags */}
        {visibleTags.map((tag) => (
          <TagBadge
            key={tag}
            tag={tag}
            size={size}
            variant={variant}
            removable={editable}
            onRemove={() => onTagRemove?.(tag)}
          />
        ))}
        
        {/* Hidden tags indicator */}
        {hasHiddenTags && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge 
                variant="outline"
                className={cn(
                  "cursor-help",
                  size === 'sm' && "text-xs px-2 py-0.5 h-5",
                  size === 'md' && "text-sm px-2.5 py-1 h-6",
                  size === 'lg' && "text-base px-3 py-1.5 h-8"
                )}
              >
                +{hiddenTags.length}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1 max-w-xs">
                <p className="font-medium text-xs">Additional tags:</p>
                <div className="flex flex-wrap gap-1">
                  {hiddenTags.map((tag) => (
                    <TagBadge
                      key={tag}
                      tag={tag}
                      size="sm"
                      variant={variant}
                    />
                  ))}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        )}
        
        {/* Add tag button */}
        {editable && (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-muted-foreground hover:text-foreground",
              size === 'sm' && "h-5 px-1",
              size === 'md' && "h-6 px-2",
              size === 'lg' && "h-8 px-3"
            )}
            onClick={() => onTagAdd?.('')}
          >
            <Plus className="h-3 w-3" />
          </Button>
        )}
      </div>
    </TooltipProvider>
  )
}

// Predefined tag categories for better organization
export const TAG_CATEGORIES = {
  source: {
    label: 'Source',
    tags: ['Website', 'Referral', 'Cold Call', 'Email Campaign', 'Social Media', 'Trade Show', 'Partner']
  },
  industry: {
    label: 'Industry',
    tags: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Government']
  },
  size: {
    label: 'Company Size',
    tags: ['Startup', 'Small Business', 'Mid-Market', 'Enterprise', 'Fortune 500']
  },
  interest: {
    label: 'Interest Level',
    tags: ['Hot Lead', 'Warm Lead', 'Cold Lead', 'Qualified', 'Demo Requested', 'Proposal Sent']
  },
  product: {
    label: 'Product Interest',
    tags: ['Basic Plan', 'Pro Plan', 'Enterprise Plan', 'Custom Solution', 'Add-ons']
  }
}

// Helper function to suggest tags based on lead data
export function suggestTags(lead: { company: string; source: string; dealAmount: number }): string[] {
  const suggestions: string[] = []
  
  // Add source-based tag
  if (lead.source) {
    suggestions.push(lead.source)
  }
  
  // Add deal size-based tag
  if (lead.dealAmount > 100000) {
    suggestions.push('Enterprise')
  } else if (lead.dealAmount > 50000) {
    suggestions.push('Mid-Market')
  } else if (lead.dealAmount > 10000) {
    suggestions.push('Small Business')
  } else {
    suggestions.push('Startup')
  }
  
  return suggestions
}