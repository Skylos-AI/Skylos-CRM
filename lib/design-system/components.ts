/**
 * Design System Component Variants
 * 
 * Consistent component variants and configurations that follow
 * the design system principles.
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { designTokens } from './tokens'

/**
 * Button component variants
 */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-all duration-150 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'select-none'
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-600 text-white shadow-sm',
          'hover:bg-primary-700 hover:shadow-md',
          'focus:ring-primary-500',
          'active:bg-primary-800'
        ],
        secondary: [
          'bg-white text-neutral-900 border border-neutral-300 shadow-sm',
          'hover:bg-neutral-50 hover:shadow-md',
          'focus:ring-neutral-500',
          'active:bg-neutral-100'
        ],
        outline: [
          'border border-neutral-300 bg-transparent text-neutral-700',
          'hover:bg-neutral-50 hover:text-neutral-900',
          'focus:ring-neutral-500',
          'active:bg-neutral-100'
        ],
        ghost: [
          'text-neutral-700 bg-transparent',
          'hover:bg-neutral-100 hover:text-neutral-900',
          'focus:ring-neutral-500',
          'active:bg-neutral-200'
        ],
        destructive: [
          'bg-error-600 text-white shadow-sm',
          'hover:bg-error-700 hover:shadow-md',
          'focus:ring-error-500',
          'active:bg-error-800'
        ],
        success: [
          'bg-success-600 text-white shadow-sm',
          'hover:bg-success-700 hover:shadow-md',
          'focus:ring-success-500',
          'active:bg-success-800'
        ]
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg'
      },
      fullWidth: {
        true: 'w-full'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

/**
 * Card component variants - optimized for dark theme readability
 */
export const cardVariants = cva(
  [
    'rounded-lg border bg-card text-card-foreground',
    'transition-all duration-150 ease-in-out'
  ],
  {
    variants: {
      variant: {
        default: [
          'border-border shadow-sm hover:shadow-md',
          'dark:border-dark-border-default dark:bg-dark-bg-elevated/50'
        ],
        elevated: [
          'border-border shadow-md hover:shadow-lg',
          'dark:border-dark-border-emphasis dark:bg-dark-bg-elevated'
        ],
        outlined: [
          'border-2 border-border shadow-none hover:border-border',
          'dark:border-dark-border-emphasis dark:hover:border-dark-border-emphasis'
        ],
        ghost: [
          'border-transparent shadow-none hover:bg-muted/50',
          'dark:hover:bg-dark-bg-tertiary/30'
        ]
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      },
      interactive: {
        true: 'cursor-pointer hover:scale-[1.01]'
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md'
    }
  }
)

/**
 * Badge component variants
 */
export const badgeVariants = cva(
  [
    'inline-flex items-center rounded-full border font-medium',
    'transition-colors duration-150 ease-in-out'
  ],
  {
    variants: {
      variant: {
        default: 'border-neutral-200 bg-neutral-100 text-neutral-800',
        primary: 'border-primary-200 bg-primary-100 text-primary-800',
        secondary: 'border-neutral-200 bg-neutral-100 text-neutral-600',
        success: 'border-success-200 bg-success-100 text-success-800',
        warning: 'border-warning-200 bg-warning-100 text-warning-800',
        error: 'border-error-200 bg-error-100 text-error-800',
        outline: 'border-neutral-300 bg-transparent text-neutral-700'
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

/**
 * Input component variants
 */
export const inputVariants = cva(
  [
    'flex w-full rounded-md border bg-white px-3 py-2 text-sm',
    'transition-colors duration-150 ease-in-out',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-neutral-500',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ],
  {
    variants: {
      variant: {
        default: [
          'border-neutral-300 text-neutral-900',
          'focus:border-primary-500 focus:ring-primary-500'
        ],
        error: [
          'border-error-300 text-error-900',
          'focus:border-error-500 focus:ring-error-500'
        ],
        success: [
          'border-success-300 text-success-900',
          'focus:border-success-500 focus:ring-success-500'
        ]
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

/**
 * Alert component variants
 */
export const alertVariants = cva(
  [
    'relative w-full rounded-lg border p-4',
    'transition-all duration-150 ease-in-out'
  ],
  {
    variants: {
      variant: {
        default: 'border-neutral-200 bg-neutral-50 text-neutral-900',
        info: 'border-info-200 bg-info-50 text-info-900',
        success: 'border-success-200 bg-success-50 text-success-900',
        warning: 'border-warning-200 bg-warning-50 text-warning-900',
        error: 'border-error-200 bg-error-50 text-error-900'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

/**
 * Avatar component variants
 */
export const avatarVariants = cva(
  [
    'relative flex shrink-0 overflow-hidden rounded-full',
    'transition-all duration-150 ease-in-out'
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl'
      },
      variant: {
        default: 'bg-neutral-100 text-neutral-600',
        primary: 'bg-primary-100 text-primary-600',
        success: 'bg-success-100 text-success-600',
        warning: 'bg-warning-100 text-warning-600',
        error: 'bg-error-100 text-error-600'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
)

/**
 * Progress component variants
 */
export const progressVariants = cva(
  [
    'relative h-2 w-full overflow-hidden rounded-full bg-neutral-200',
    'transition-all duration-150 ease-in-out'
  ],
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
      },
      variant: {
        default: '[&>div]:bg-primary-600',
        success: '[&>div]:bg-success-600',
        warning: '[&>div]:bg-warning-600',
        error: '[&>div]:bg-error-600'
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'default'
    }
  }
)

/**
 * Skeleton component variants
 */
export const skeletonVariants = cva(
  [
    'animate-pulse rounded bg-neutral-200',
    'transition-all duration-150 ease-in-out'
  ],
  {
    variants: {
      variant: {
        default: 'bg-neutral-200',
        light: 'bg-neutral-100',
        dark: 'bg-neutral-300'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

/**
 * Priority indicator variants for leads - optimized for dark theme readability
 */
export const priorityVariants = cva(
  [
    'inline-flex items-center rounded-full border font-medium',
    'transition-colors duration-150 ease-in-out'
  ],
  {
    variants: {
      priority: {
        low: [
          'border-neutral-200 bg-neutral-50 text-neutral-700',
          'dark:border-neutral-650 dark:bg-neutral-800/50 dark:text-neutral-300'
        ],
        medium: [
          'border-blue-200 bg-blue-50 text-blue-700',
          'dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300'
        ],
        high: [
          'border-orange-200 bg-orange-50 text-orange-700',
          'dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300'
        ],
        urgent: [
          'border-red-200 bg-red-50 text-red-700',
          'dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300'
        ]
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm'
      }
    },
    defaultVariants: {
      priority: 'medium',
      size: 'sm'
    }
  }
)

/**
 * Stage indicator variants for kanban - optimized for dark theme readability
 */
export const stageVariants = cva(
  [
    'inline-flex items-center rounded-md font-medium border-l-4',
    'transition-colors duration-150 ease-in-out'
  ],
  {
    variants: {
      stage: {
        incoming: [
          'bg-blue-50 text-blue-700 border-blue-500',
          'dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-400'
        ],
        decision: [
          'bg-yellow-50 text-yellow-700 border-yellow-500',
          'dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-400'
        ],
        negotiation: [
          'bg-orange-50 text-orange-700 border-orange-500',
          'dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-400'
        ],
        final: [
          'bg-green-50 text-green-700 border-green-500',
          'dark:bg-green-500/10 dark:text-green-300 dark:border-green-400'
        ]
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base'
      }
    },
    defaultVariants: {
      stage: 'incoming',
      size: 'md'
    }
  }
)

// Export types for component props
export type ButtonVariants = VariantProps<typeof buttonVariants>
export type CardVariants = VariantProps<typeof cardVariants>
export type BadgeVariants = VariantProps<typeof badgeVariants>
export type InputVariants = VariantProps<typeof inputVariants>
export type AlertVariants = VariantProps<typeof alertVariants>
export type AvatarVariants = VariantProps<typeof avatarVariants>
export type ProgressVariants = VariantProps<typeof progressVariants>
export type SkeletonVariants = VariantProps<typeof skeletonVariants>
export type PriorityVariants = VariantProps<typeof priorityVariants>
export type StageVariants = VariantProps<typeof stageVariants>