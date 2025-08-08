# Design Document

## Overview

This design document outlines the technical approach for modifying the CRM dashboard by removing the Media Library and Campaigns tabs while adding Google Meet and Google Sheets integrations to the Channels section. The design focuses on maintaining system consistency, implementing secure OAuth authentication, and providing a seamless user experience for Google service integrations.

## Architecture

### Navigation Architecture Changes

The navigation system will be modified to remove unused tabs while maintaining the existing structure and styling patterns. The changes will be implemented in the sidebar component with minimal impact on other system components.

**Current Navigation Flow:**
```
Dashboard → Leads → Companies → Contacts → Campaigns → Media Library → AI Agents → Channels
```

**New Navigation Flow:**
```
Dashboard → Leads → Companies → Contacts → AI Agents → Channels
```

### Google Integration Architecture

The Google integrations will follow the existing channel pattern established in the system, utilizing OAuth 2.0 for secure authentication and maintaining consistency with current channel implementations.

**Integration Components:**
- Channel Configuration Dialog Extensions
- OAuth Authentication Flow
- Google API Service Layer
- Channel Status Management
- Statistics and Sync Tracking

## Components and Interfaces

### 1. Navigation Component Updates

**File:** `components/layout/sidebar.tsx`

**Changes Required:**
- Remove "Campaigns" and "Media Library" entries from `mainNavigation` array
- Maintain existing navigation styling and behavior
- Preserve badge functionality for remaining items
- Update navigation order to maintain logical flow

**Interface Updates:**
```typescript
// Remove these entries from mainNavigation array:
// - { name: "Campaigns", href: "/campaigns", icon: Megaphone, badge: "2" }
// - { name: "Media Library", href: "/media", icon: Image, badge: null }
```

### 2. Channel Data Model Extensions

**File:** `app/channels/page.tsx`

**New Channel Definitions:**
```typescript
interface GoogleMeetChannel extends Channel {
  type: 'google-meet'
  features: ['Video meetings', 'Calendar integration', 'Meeting recordings', 'Screen sharing']
  setupComplexity: 'medium'
  oauthScopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/meetings.space.created']
}

interface GoogleSheetsChannel extends Channel {
  type: 'google-sheets'
  features: ['Data sync', 'Automated reports', 'Real-time updates', 'Custom formulas']
  setupComplexity: 'medium'
  oauthScopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file']
}
```

### 3. Channel Configuration Dialog Extensions

**File:** `components/channels/channel-config-dialog.tsx`

**New Configuration Fields:**
```typescript
const getGoogleChannelConfig = (channelType: 'google-meet' | 'google-sheets'): ConfigField[] => {
  const baseFields = [
    {
      key: 'clientId',
      label: 'Google Client ID',
      type: 'text',
      placeholder: 'Your Google OAuth Client ID',
      required: true,
      description: 'From Google Cloud Console'
    },
    {
      key: 'clientSecret',
      label: 'Google Client Secret',
      type: 'password',
      placeholder: 'Your Google OAuth Client Secret',
      required: true
    }
  ]

  if (channelType === 'google-sheets') {
    return [
      ...baseFields,
      {
        key: 'spreadsheetId',
        label: 'Default Spreadsheet ID',
        type: 'text',
        placeholder: 'Google Sheets ID for data sync',
        required: false,
        description: 'Optional: Default sheet for CRM data export'
      }
    ]
  }

  return baseFields
}
```

### 4. OAuth Authentication Component

**New File:** `components/channels/google-oauth-flow.tsx`

**Purpose:** Handle Google OAuth 2.0 authentication flow
**Key Features:**
- Secure token exchange
- Scope validation
- Error handling
- Token refresh management

**Interface:**
```typescript
interface GoogleOAuthFlowProps {
  channelType: 'google-meet' | 'google-sheets'
  scopes: string[]
  onSuccess: (tokens: GoogleTokens) => void
  onError: (error: string) => void
}

interface GoogleTokens {
  accessToken: string
  refreshToken: string
  expiresAt: Date
  scope: string
}
```

### 5. Google API Service Layer

**New File:** `lib/api/google-services.ts`

**Purpose:** Centralized Google API integration
**Services:**
- Google Meet API integration
- Google Sheets API integration
- Token management
- Error handling and retry logic

**Interface:**
```typescript
class GoogleMeetService {
  static async createMeeting(config: MeetingConfig): Promise<Meeting>
  static async listMeetings(dateRange: DateRange): Promise<Meeting[]>
  static async validateConnection(tokens: GoogleTokens): Promise<boolean>
}

class GoogleSheetsService {
  static async syncData(spreadsheetId: string, data: CRMData): Promise<SyncResult>
  static async createReport(config: ReportConfig): Promise<Sheet>
  static async validateConnection(tokens: GoogleTokens): Promise<boolean>
}
```

## Data Models

### Google Channel Configuration

```typescript
interface GoogleChannelConfig {
  id: string
  type: 'google-meet' | 'google-sheets'
  clientId: string
  clientSecret: string // Encrypted in storage
  tokens?: GoogleTokens
  settings: {
    autoSync: boolean
    syncInterval: number // minutes
    defaultSpreadsheetId?: string // For Sheets only
    calendarId?: string // For Meet only
  }
  status: 'connected' | 'disconnected' | 'error' | 'pending'
  lastSync?: Date
  statistics: {
    meetingsCreated?: number // For Meet
    dataRowsSynced?: number // For Sheets
    lastActivity?: Date
  }
}
```

### Channel Statistics Extension

```typescript
interface ChannelStatistics {
  // Existing fields...
  googleMeetMeetings?: number
  googleSheetsRows?: number
  googleServicesConnected: number
}
```

## Error Handling

### OAuth Error Handling

**Common OAuth Errors:**
- Invalid client credentials
- Insufficient permissions
- Token expiration
- Network connectivity issues

**Error Handling Strategy:**
```typescript
class GoogleOAuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public recoverable: boolean = true
  ) {
    super(message)
  }
}

const handleOAuthError = (error: GoogleOAuthError) => {
  switch (error.code) {
    case 'invalid_client':
      return 'Invalid Google Client ID or Secret. Please check your credentials.'
    case 'access_denied':
      return 'Access denied. Please ensure you have granted the necessary permissions.'
    case 'invalid_scope':
      return 'Invalid permissions requested. Please contact support.'
    default:
      return error.message
  }
}
```

### API Error Handling

**Google API Error Responses:**
- Rate limiting (429)
- Authentication errors (401)
- Permission errors (403)
- Resource not found (404)

**Retry Strategy:**
- Exponential backoff for rate limits
- Token refresh for authentication errors
- User notification for permission errors

## Testing Strategy

### Unit Testing

**Components to Test:**
- Google OAuth flow component
- Channel configuration dialog extensions
- Google API service layer
- Navigation component modifications

**Test Cases:**
```typescript
describe('GoogleOAuthFlow', () => {
  it('should initiate OAuth flow with correct scopes')
  it('should handle successful authentication')
  it('should handle OAuth errors gracefully')
  it('should refresh expired tokens')
})

describe('GoogleChannelConfig', () => {
  it('should validate Google Meet configuration')
  it('should validate Google Sheets configuration')
  it('should test connection successfully')
  it('should handle connection failures')
})
```

### Integration Testing

**Test Scenarios:**
- Complete OAuth flow for Google Meet
- Complete OAuth flow for Google Sheets
- Channel configuration save and load
- Navigation updates after tab removal
- Statistics updates with Google channels

### End-to-End Testing

**User Workflows:**
1. Remove tabs and verify navigation works
2. Configure Google Meet channel from start to finish
3. Configure Google Sheets channel from start to finish
4. Test channel enable/disable functionality
5. Verify statistics update correctly

## Security Considerations

### OAuth Security

**Implementation Requirements:**
- Use PKCE (Proof Key for Code Exchange) for OAuth flow
- Store client secrets encrypted
- Implement secure token storage
- Use HTTPS for all OAuth redirects
- Validate OAuth state parameter

### Token Management

**Security Measures:**
- Encrypt refresh tokens in storage
- Implement token rotation
- Set appropriate token expiration
- Clear tokens on logout
- Validate token scopes before API calls

### API Security

**Protection Measures:**
- Rate limiting for Google API calls
- Input validation for all Google API parameters
- Sanitize data before sending to Google APIs
- Log security events for audit

## Performance Considerations

### OAuth Flow Optimization

**Performance Strategies:**
- Cache OAuth configuration
- Minimize redirect hops
- Use popup windows for OAuth flow
- Implement loading states

### API Call Optimization

**Optimization Techniques:**
- Batch Google API requests where possible
- Implement request caching
- Use compression for large data transfers
- Implement connection pooling

### UI Performance

**Optimization Measures:**
- Lazy load Google integration components
- Use skeleton loading for OAuth flows
- Implement optimistic updates
- Cache channel status locally

## Migration Strategy

### Navigation Migration

**Steps:**
1. Update sidebar component to remove tabs
2. Add route guards for removed paths
3. Update any internal links to removed pages
4. Test navigation flow thoroughly

### Channel Integration Migration

**Steps:**
1. Add Google channel definitions to existing array
2. Extend configuration dialog with Google support
3. Implement OAuth flow components
4. Add Google API service layer
5. Update statistics calculations
6. Test complete integration flow

### Rollback Plan

**Rollback Procedures:**
- Revert navigation changes by restoring removed tabs
- Disable Google channels via feature flag
- Remove Google channel configurations
- Restore original channel statistics calculations

## Deployment Considerations

### Environment Configuration

**Required Environment Variables:**
```bash
# Google OAuth Configuration
GOOGLE_OAUTH_CLIENT_ID=your_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret
GOOGLE_OAUTH_REDIRECT_URI=https://your-domain.com/auth/google/callback

# Google API Configuration
GOOGLE_API_KEY=your_api_key
GOOGLE_PROJECT_ID=your_project_id
```

### Feature Flags

**Recommended Feature Flags:**
- `ENABLE_GOOGLE_MEET_INTEGRATION`
- `ENABLE_GOOGLE_SHEETS_INTEGRATION`
- `REMOVE_LEGACY_TABS`

### Monitoring

**Metrics to Track:**
- Google OAuth success/failure rates
- Google API call latency and errors
- Channel configuration completion rates
- User adoption of Google integrations