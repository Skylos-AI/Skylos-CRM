# CRM Design System

A comprehensive design system for the CRM application that ensures consistency, accessibility, and maintainability across all components.

## Overview

This design system provides:
- **Design Tokens**: Centralized values for spacing, colors, typography, and animations
- **Component Variants**: Consistent styling patterns using class-variance-authority
- **Utility Functions**: Helper functions for common design patterns
- **Accessibility**: WCAG 2.1 AA compliant components and utilities

## Quick Start

```typescript
import { cn, designTokens, buttonVariants } from '@/lib/design-system'

// Use design tokens
const spacing = designTokens.spacing[4] // 16px
const primaryColor = designTokens.colors.primary[500] // #3b82f6

// Use component variants
const buttonClass = buttonVariants({ variant: 'primary', size: 'md' })

// Use utility functions
const combinedClasses = cn('base-class', 'conditional-class')
```

## Design Tokens

### Spacing System
Based on a 4px grid system for consistent spacing:

```typescript
spacing: {
  0: '0px',    // 0
  1: '4px',    // 4px
  2: '8px',    // 8px
  3: '12px',   // 12px
  4: '16px',   // 16px
  6: '24px',   // 24px
  8: '32px',   // 32px
  12: '48px',  // 48px
  16: '64px',  // 64px
}
```

### Color System
Semantic color palette with accessibility-compliant contrast ratios:

#### Primary Colors
- Used for main actions and brand elements
- Range: `primary.50` to `primary.950`

#### Semantic Colors
- **Success**: Green tones for positive actions and states
- **Warning**: Yellow/orange tones for caution and alerts  
- **Error**: Red tones for errors and destructive actions
- **Info**: Blue tones for informational content

#### Priority Colors
Special color combinations for lead priority indicators:
- **Low**: Gray tones
- **Medium**: Blue tones  
- **High**: Orange tones
- **Urgent**: Red tones

#### Stage Colors
Color combinations for kanban board stages:
- **Incoming**: Blue theme
- **Decision**: Yellow theme
- **Negotiation**: Orange theme
- **Final**: Green theme

### Typography
Consistent typography scale with Inter as the primary font:

```typescript
fontSize: {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
}
```

### Animation
Consistent timing and easing for smooth interactions:

```typescript
duration: {
  fast: '150ms',    // Micro-interactions
  normal: '300ms',  // Standard transitions
  slow: '500ms',    // Complex animations
}

easing: {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Natural motion
}
```

## Component Variants

### Button Variants
```typescript
// Primary button
buttonVariants({ variant: 'primary', size: 'md' })

// Secondary button
buttonVariants({ variant: 'secondary', size: 'sm' })

// Destructive action
buttonVariants({ variant: 'destructive', size: 'lg' })
```

### Card Variants
```typescript
// Default card
cardVariants({ variant: 'default', padding: 'md' })

// Elevated card with more shadow
cardVariants({ variant: 'elevated', padding: 'lg' })

// Interactive card
cardVariants({ variant: 'default', interactive: true })
```

### Badge Variants
```typescript
// Priority badge
badgeVariants({ variant: 'error', size: 'sm' })

// Status badge
badgeVariants({ variant: 'success', size: 'md' })
```

### Priority Indicators
```typescript
// Lead priority
priorityVariants({ priority: 'urgent', size: 'sm' })
priorityVariants({ priority: 'high', size: 'md' })
```

### Stage Indicators
```typescript
// Kanban stage
stageVariants({ stage: 'incoming', size: 'md' })
stageVariants({ stage: 'final', size: 'lg' })
```

## Utility Functions

### Class Name Merging
```typescript
import { cn } from '@/lib/design-system'

// Merge classes intelligently
const className = cn(
  'base-class',
  condition && 'conditional-class',
  'override-class'
)
```

### Priority Styles
```typescript
import { getPriorityStyles } from '@/lib/design-system'

// Get priority-based styles
const styles = getPriorityStyles('urgent')
// Returns: { backgroundColor: '#fee2e2', color: '#dc2626', borderColor: '#fca5a5' }
```

### Stage Styles
```typescript
import { getStageStyles } from '@/lib/design-system'

// Get stage-based styles
const styles = getStageStyles('incoming')
// Returns: { backgroundColor: '#dbeafe', borderColor: '#3b82f6', color: '#1e40af' }
```

### Responsive Classes
```typescript
import { responsive } from '@/lib/design-system'

// Generate responsive classes
const className = responsive({
  base: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
})
// Returns: 'text-sm md:text-base lg:text-lg'
```

### Focus Ring
```typescript
import { focusRing } from '@/lib/design-system'

// Add accessible focus ring
const className = focusRing('primary')
// Returns: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
```

### Hover Transitions
```typescript
import { hoverTransition } from '@/lib/design-system'

// Add smooth hover effects
const className = hoverTransition()
// Returns: 'transition-all duration-150 ease-in-out hover:scale-[1.02] hover:shadow-md'
```

## Accessibility Features

### Focus Management
All interactive components include proper focus indicators:
- Visible focus rings with sufficient contrast
- Keyboard navigation support
- Skip links for screen readers

### Color Contrast
All color combinations meet WCAG 2.1 AA standards:
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Additional visual cues beyond color

### Screen Reader Support
Components include proper ARIA attributes:
- Semantic HTML elements
- ARIA labels and descriptions
- Live regions for dynamic content

## Best Practices

### Spacing
- Use the 4px grid system consistently
- Apply generous whitespace for better readability
- Group related elements with proximity

### Typography
- Limit to 1-2 font families
- Use font weight and size to create hierarchy
- Keep line length between 45-75 characters

### Colors
- Use semantic colors for status and feedback
- Don't rely solely on color to convey information
- Maintain consistent color usage across components

### Interactions
- Provide immediate feedback for user actions
- Use consistent animation timing and easing
- Ensure touch targets are at least 44x44px

### Responsive Design
- Design mobile-first
- Use consistent breakpoints
- Optimize for thumb-zone interaction on mobile

## Migration Guide

### From Existing Components
1. Import design system utilities
2. Replace hardcoded values with design tokens
3. Use component variants for consistent styling
4. Add accessibility improvements

### Example Migration
```typescript
// Before
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click me
</button>

// After
import { buttonVariants } from '@/lib/design-system'

<button className={buttonVariants({ variant: 'primary', size: 'md' })}>
  Click me
</button>
```

## Contributing

When adding new components or patterns:
1. Follow the established design token system
2. Ensure accessibility compliance
3. Add proper TypeScript types
4. Include usage examples
5. Test across different screen sizes

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Class Variance Authority](https://cva.style/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)