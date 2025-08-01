# API Integration Guide

This document outlines the API endpoints and data structures needed for backend integration with the CRM system.

## Base Configuration

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
```

## Authentication

All API requests should include authentication headers:

```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

## API Endpoints

### Leads Management

#### GET /leads
Retrieve all leads with optional filtering

**Query Parameters:**
- `search` (string): Search term for name, company, or email
- `stage` (string[]): Filter by pipeline stages
- `priority` (string[]): Filter by priority levels
- `tags` (string[]): Filter by tags
- `assignedTo` (string[]): Filter by assigned users
- `page` (number): Page number for pagination
- `limit` (number): Items per page

**Response:**
```typescript
{
  data: Lead[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}
```

#### GET /leads/:id
Retrieve a specific lead

**Response:**
```typescript
{
  data: Lead
}
```

#### POST /leads
Create a new lead

**Request Body:**
```typescript
{
  name: string,
  company: string,
  email: string,
  phone?: string,
  dealAmount: number,
  currency: string,
  stage: 'incoming' | 'decision' | 'negotiation' | 'final',
  tags: string[],
  priority: 'low' | 'medium' | 'high' | 'urgent',
  assignedTo: string,
  notes?: string,
  source: string
}
```

#### PUT /leads/:id
Update an existing lead

**Request Body:** Same as POST /leads

#### PATCH /leads/:id/stage
Move lead to different pipeline stage

**Request Body:**
```typescript
{
  stage: 'incoming' | 'decision' | 'negotiation' | 'final'
}
```

#### DELETE /leads/:id
Delete a lead

### Companies Management

#### GET /companies
Retrieve all companies

**Query Parameters:**
- `search` (string): Search term
- `industry` (string): Filter by industry
- `size` (string): Filter by company size
- `page` (number): Page number
- `limit` (number): Items per page

#### POST /companies
Create a new company

**Request Body:**
```typescript
{
  name: string,
  industry: string,
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise',
  website?: string,
  address?: {
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  }
}
```

### Contacts Management

#### GET /contacts
Retrieve all contacts

#### POST /contacts
Create a new contact

**Request Body:**
```typescript
{
  firstName: string,
  lastName: string,
  email: string,
  phone?: string,
  position?: string,
  companyId: string,
  socialProfiles?: {
    platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram',
    url: string
  }[]
}
```

### Channel Configuration

#### GET /channels
Retrieve channel configurations

#### POST /channels/:type/configure
Configure a specific channel

**Request Body:** Varies by channel type

#### POST /channels/:type/test
Test channel connection

### Dashboard Analytics

#### GET /analytics/dashboard
Retrieve dashboard metrics

**Response:**
```typescript
{
  totalLeads: number,
  activeDeals: number,
  pipelineValue: number,
  conversionRate: number,
  avgDealSize: number,
  leadsThisMonth: number,
  dealsClosedThisMonth: number,
  pipelineData: {
    stage: string,
    count: number,
    value: number
  }[],
  monthlyTrend: {
    month: string,
    leads: number,
    deals: number,
    revenue: number
  }[]
}
```

## Data Models

### Lead
```typescript
interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone?: string
  dealAmount: number
  currency: string
  stage: 'incoming' | 'decision' | 'negotiation' | 'final'
  tags: string[]
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string
  createdAt: Date
  updatedAt: Date
  lastContactDate?: Date
  nextFollowUp?: Date
  notes?: string
  source: string
}
```

### Company
```typescript
interface Company {
  id: string
  name: string
  industry: string
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
  website?: string
  address?: Address
  contacts: Contact[]
  deals: Lead[]
  createdAt: Date
  updatedAt: Date
}
```

### Contact
```typescript
interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  position?: string
  companyId: string
  avatar?: string
  socialProfiles?: SocialProfile[]
  createdAt: Date
  updatedAt: Date
}
```

## Error Handling

All API responses should follow this error format:

```typescript
{
  error: {
    code: string,
    message: string,
    details?: any
  }
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Internal Server Error

## Real-time Updates (WebSocket)

For real-time updates, implement WebSocket connections:

```typescript
const ws = new WebSocket('ws://localhost:8000/ws')

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  // Handle real-time updates
}
```

## File Uploads

For file uploads (avatars, documents):

#### POST /upload
**Content-Type:** multipart/form-data

**Response:**
```typescript
{
  url: string,
  filename: string,
  size: number,
  mimeType: string
}
```

## Rate Limiting

Implement rate limiting:
- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users

## Caching

Recommended caching strategies:
- GET requests: Cache for 5 minutes
- Dashboard analytics: Cache for 15 minutes
- Static data (industries, tags): Cache for 1 hour