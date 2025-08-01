import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable } from '@/components/shared/data-table'

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

const mockColumns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    searchable: true,
  },
  {
    key: 'email',
    title: 'Email',
    sortable: true,
    searchable: true,
  },
  {
    key: 'role',
    title: 'Role',
    sortable: false,
    searchable: false,
  },
]

describe('DataTable', () => {
  it('renders table with data', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
      />
    )
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('User')).toBeInTheDocument()
  })

  it('shows search input when searchable is true', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        searchable={true}
      />
    )
    
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('filters data when searching', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        searchable={true}
      />
    )
    
    const searchInput = screen.getByPlaceholderText('Search...')
    fireEvent.change(searchInput, { target: { value: 'John' } })
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(
      <DataTable
        data={[]}
        columns={mockColumns}
        loading={true}
      />
    )
    
    // Should show skeleton loading
    expect(screen.getByText('Search...')).toBeInTheDocument()
  })

  it('shows no data message when empty', () => {
    render(
      <DataTable
        data={[]}
        columns={mockColumns}
        loading={false}
      />
    )
    
    expect(screen.getByText('No data found.')).toBeInTheDocument()
  })

  it('handles row selection', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        selectable={true}
      />
    )
    
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(4) // 3 rows + select all
  })
})