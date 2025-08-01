import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { KanbanBoard } from '@/components/leads/kanban-board'

// Mock the API service
jest.mock('@/lib/api/leads', () => ({
  LeadsService: {
    getLeads: jest.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Test Lead',
        company: 'Test Company',
        email: 'test@example.com',
        dealAmount: 50000,
        currency: 'USD',
        stage: 'incoming',
        tags: ['urgent'],
        priority: 'high',
        assignedTo: 'john-doe',
        createdAt: new Date(),
        updatedAt: new Date(),
        source: 'website'
      }
    ]),
    moveLead: jest.fn().mockResolvedValue({}),
    updateLead: jest.fn().mockResolvedValue({}),
  },
}))

// Mock the error handler hook
jest.mock('@/hooks/use-error-handler', () => ({
  useErrorHandler: () => ({
    handleError: jest.fn(),
    handleSuccess: jest.fn(),
  }),
}))

// Mock dnd-kit
jest.mock('@dnd-kit/core', () => ({
  DndContext: ({ children }: any) => <div>{children}</div>,
  DragOverlay: ({ children }: any) => <div>{children}</div>,
}))

jest.mock('@dnd-kit/sortable', () => ({
  SortableContext: ({ children }: any) => <div>{children}</div>,
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
  verticalListSortingStrategy: {},
}))

describe('Lead Management Integration', () => {
  it('loads and displays leads in kanban board', async () => {
    render(<KanbanBoard />)
    
    // Should show loading initially
    expect(screen.getByText('Loading leads...')).toBeInTheDocument()
    
    // Wait for leads to load
    await waitFor(() => {
      expect(screen.getByText('Test Lead')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    expect(screen.getByText('USD 50,000')).toBeInTheDocument()
  })

  it('displays kanban columns correctly', async () => {
    render(<KanbanBoard />)
    
    await waitFor(() => {
      expect(screen.getByText('Incoming Leads')).toBeInTheDocument()
      expect(screen.getByText('Decision Making')).toBeInTheDocument()
      expect(screen.getByText('Negotiation')).toBeInTheDocument()
      expect(screen.getByText('Final Decision')).toBeInTheDocument()
    })
  })

  it('shows filters when enabled', async () => {
    render(<KanbanBoard showFilters={true} />)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search leads, companies, emails...')).toBeInTheDocument()
      expect(screen.getByText('Filter')).toBeInTheDocument()
    })
  })

  it('handles lead click to open details', async () => {
    render(<KanbanBoard />)
    
    await waitFor(() => {
      const leadCard = screen.getByText('Test Lead')
      fireEvent.click(leadCard)
      // Dialog should open (mocked behavior)
    })
  })
})