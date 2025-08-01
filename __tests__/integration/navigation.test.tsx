import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('Navigation Integration', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/dashboard')
  })

  it('renders all navigation items', () => {
    render(<Sidebar />)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Leads')).toBeInTheDocument()
    expect(screen.getByText('Companies')).toBeInTheDocument()
    expect(screen.getByText('Contacts')).toBeInTheDocument()
    expect(screen.getByText('Channels')).toBeInTheDocument()
  })

  it('highlights active navigation item', () => {
    mockUsePathname.mockReturnValue('/leads')
    render(<Sidebar />)
    
    const leadsButton = screen.getByRole('button', { name: /leads/i })
    expect(leadsButton).toHaveClass('bg-secondary')
  })

  it('shows user profile section', () => {
    render(<Sidebar />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Sales Manager')).toBeInTheDocument()
  })

  it('displays navigation badges', () => {
    render(<Sidebar />)
    
    // Should show badge for leads count
    expect(screen.getByText('4')).toBeInTheDocument()
    // Should show badge for channels count
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('shows quick actions section', () => {
    render(<Sidebar />)
    
    expect(screen.getByText('QUICK ACTIONS')).toBeInTheDocument()
    expect(screen.getByText('Add Lead')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('displays notifications with count', () => {
    render(<Sidebar />)
    
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument() // notification count
  })
})