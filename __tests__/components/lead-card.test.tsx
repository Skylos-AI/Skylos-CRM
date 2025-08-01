import { render, screen, fireEvent } from '@testing-library/react'
import { LeadCard } from '@/components/leads/lead-card'
import { Lead } from '@/lib/types/lead'

// Mock the dnd-kit hooks
jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
}))

const mockLead: Lead = {
  id: '1',
  name: 'Test Lead',
  company: 'Test Company',
  email: 'test@example.com',
  phone: '+1234567890',
  dealAmount: 50000,
  currency: 'USD',
  stage: 'incoming',
  tags: ['urgent', 'enterprise'],
  priority: 'high',
  assignedTo: 'john-doe',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
  lastContactDate: new Date('2024-01-18'),
  nextFollowUp: new Date('2024-02-01'),
  notes: 'Test notes',
  source: 'website'
}

describe('LeadCard', () => {
  it('renders lead information correctly', () => {
    render(<LeadCard lead={mockLead} />)
    
    expect(screen.getByText('Test Lead')).toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    expect(screen.getByText('USD 50,000')).toBeInTheDocument()
    expect(screen.getByText('high')).toBeInTheDocument()
    expect(screen.getByText('urgent')).toBeInTheDocument()
    expect(screen.getByText('enterprise')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', () => {
    const mockOnClick = jest.fn()
    render(<LeadCard lead={mockLead} onClick={mockOnClick} />)
    
    const card = screen.getByRole('button')
    fireEvent.click(card)
    
    expect(mockOnClick).toHaveBeenCalledWith(mockLead)
  })

  it('displays overdue follow-up alert', () => {
    const overdueLead = {
      ...mockLead,
      nextFollowUp: new Date('2023-01-01') // Past date
    }
    
    render(<LeadCard lead={overdueLead} />)
    
    // Should show the follow-up date in red (overdue)
    expect(screen.getByText(/Follow-up:/)).toBeInTheDocument()
  })

  it('shows correct priority color coding', () => {
    render(<LeadCard lead={mockLead} />)
    
    const priorityBadge = screen.getByText('high')
    expect(priorityBadge).toHaveClass('bg-orange-100', 'text-orange-800')
  })
})