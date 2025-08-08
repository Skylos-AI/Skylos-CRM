// Google API Services for CRM Integration

interface GoogleTokens {
  accessToken: string
  refreshToken: string
  expiresAt: Date
  scope: string
}

interface MeetingConfig {
  title: string
  startTime: Date
  endTime: Date
  attendees: string[]
  description?: string
}

interface Meeting {
  id: string
  title: string
  startTime: Date
  endTime: Date
  meetingUrl: string
  attendees: string[]
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
}

interface DateRange {
  start: Date
  end: Date
}

interface CRMData {
  leads: any[]
  companies: any[]
  contacts: any[]
}

interface ReportConfig {
  title: string
  data: any[]
  columns: string[]
  sheetName?: string
}

interface Sheet {
  id: string
  title: string
  url: string
  lastModified: Date
}

interface SyncResult {
  success: boolean
  rowsUpdated: number
  errors: string[]
}

class GoogleAPIError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number
  ) {
    super(message)
    this.name = 'GoogleAPIError'
  }
}

export class GoogleMeetService {
  private static async makeAPICall(
    endpoint: string,
    tokens: GoogleTokens,
    options: RequestInit = {}
  ): Promise<any> {
    // Check if token is expired
    if (new Date() >= tokens.expiresAt) {
      throw new GoogleAPIError('Token expired', 'token_expired', 401)
    }

    const response = await fetch(`https://www.googleapis.com/calendar/v3${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new GoogleAPIError(
        errorData.error?.message || 'API request failed',
        errorData.error?.code || 'api_error',
        response.status
      )
    }

    return response.json()
  }

  static async createMeeting(
    config: MeetingConfig,
    tokens: GoogleTokens,
    calendarId: string = 'primary'
  ): Promise<Meeting> {
    try {
      const event = {
        summary: config.title,
        description: config.description,
        start: {
          dateTime: config.startTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: config.endTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        attendees: config.attendees.map(email => ({ email })),
        conferenceData: {
          createRequest: {
            requestId: `meet-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        }
      }

      const response = await this.makeAPICall(
        `/calendars/${calendarId}/events?conferenceDataVersion=1`,
        tokens,
        {
          method: 'POST',
          body: JSON.stringify(event),
        }
      )

      return {
        id: response.id,
        title: response.summary,
        startTime: new Date(response.start.dateTime),
        endTime: new Date(response.end.dateTime),
        meetingUrl: response.conferenceData?.entryPoints?.[0]?.uri || '',
        attendees: response.attendees?.map((a: any) => a.email) || [],
        status: 'scheduled'
      }
    } catch (error) {
      if (error instanceof GoogleAPIError) {
        throw error
      }
      throw new GoogleAPIError('Failed to create meeting', 'create_failed')
    }
  }

  static async listMeetings(
    dateRange: DateRange,
    tokens: GoogleTokens,
    calendarId: string = 'primary'
  ): Promise<Meeting[]> {
    try {
      const params = new URLSearchParams({
        timeMin: dateRange.start.toISOString(),
        timeMax: dateRange.end.toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime',
      })

      const response = await this.makeAPICall(
        `/calendars/${calendarId}/events?${params.toString()}`,
        tokens
      )

      return response.items?.map((event: any) => ({
        id: event.id,
        title: event.summary || 'Untitled Meeting',
        startTime: new Date(event.start.dateTime || event.start.date),
        endTime: new Date(event.end.dateTime || event.end.date),
        meetingUrl: event.conferenceData?.entryPoints?.[0]?.uri || '',
        attendees: event.attendees?.map((a: any) => a.email) || [],
        status: event.status === 'cancelled' ? 'cancelled' : 
                new Date() > new Date(event.end.dateTime || event.end.date) ? 'completed' :
                new Date() >= new Date(event.start.dateTime || event.start.date) ? 'in-progress' : 'scheduled'
      })) || []
    } catch (error) {
      if (error instanceof GoogleAPIError) {
        throw error
      }
      throw new GoogleAPIError('Failed to list meetings', 'list_failed')
    }
  }

  static async validateConnection(tokens: GoogleTokens): Promise<boolean> {
    try {
      await this.makeAPICall('/calendars/primary', tokens)
      return true
    } catch (error) {
      return false
    }
  }
}

export class GoogleSheetsService {
  private static async makeAPICall(
    endpoint: string,
    tokens: GoogleTokens,
    options: RequestInit = {}
  ): Promise<any> {
    // Check if token is expired
    if (new Date() >= tokens.expiresAt) {
      throw new GoogleAPIError('Token expired', 'token_expired', 401)
    }

    const response = await fetch(`https://sheets.googleapis.com/v4${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new GoogleAPIError(
        errorData.error?.message || 'API request failed',
        errorData.error?.code || 'api_error',
        response.status
      )
    }

    return response.json()
  }

  static async syncData(
    spreadsheetId: string,
    data: CRMData,
    tokens: GoogleTokens
  ): Promise<SyncResult> {
    try {
      const errors: string[] = []
      let totalRowsUpdated = 0

      // Sync leads data
      if (data.leads && data.leads.length > 0) {
        try {
          const leadsData = [
            ['Name', 'Company', 'Stage', 'Deal Amount', 'Priority', 'Created At'],
            ...data.leads.map(lead => [
              lead.name,
              lead.company,
              lead.stage,
              lead.dealAmount,
              lead.priority,
              new Date(lead.createdAt).toLocaleDateString()
            ])
          ]

          await this.makeAPICall(
            `/spreadsheets/${spreadsheetId}/values/Leads!A1:clear`,
            tokens,
            { method: 'POST' }
          )

          await this.makeAPICall(
            `/spreadsheets/${spreadsheetId}/values/Leads!A1?valueInputOption=RAW`,
            tokens,
            {
              method: 'PUT',
              body: JSON.stringify({
                values: leadsData
              })
            }
          )

          totalRowsUpdated += leadsData.length - 1 // Exclude header
        } catch (error) {
          errors.push('Failed to sync leads data')
        }
      }

      // Sync companies data
      if (data.companies && data.companies.length > 0) {
        try {
          const companiesData = [
            ['Name', 'Industry', 'Size', 'Location', 'Created At'],
            ...data.companies.map(company => [
              company.name,
              company.industry || '',
              company.size || '',
              company.location || '',
              new Date(company.createdAt || Date.now()).toLocaleDateString()
            ])
          ]

          await this.makeAPICall(
            `/spreadsheets/${spreadsheetId}/values/Companies!A1:clear`,
            tokens,
            { method: 'POST' }
          )

          await this.makeAPICall(
            `/spreadsheets/${spreadsheetId}/values/Companies!A1?valueInputOption=RAW`,
            tokens,
            {
              method: 'PUT',
              body: JSON.stringify({
                values: companiesData
              })
            }
          )

          totalRowsUpdated += companiesData.length - 1 // Exclude header
        } catch (error) {
          errors.push('Failed to sync companies data')
        }
      }

      return {
        success: errors.length === 0,
        rowsUpdated: totalRowsUpdated,
        errors
      }
    } catch (error) {
      if (error instanceof GoogleAPIError) {
        throw error
      }
      throw new GoogleAPIError('Failed to sync data', 'sync_failed')
    }
  }

  static async createReport(
    config: ReportConfig,
    tokens: GoogleTokens
  ): Promise<Sheet> {
    try {
      // Create a new spreadsheet
      const spreadsheet = await this.makeAPICall(
        '/spreadsheets',
        tokens,
        {
          method: 'POST',
          body: JSON.stringify({
            properties: {
              title: config.title
            },
            sheets: [{
              properties: {
                title: config.sheetName || 'Report'
              }
            }]
          })
        }
      )

      const spreadsheetId = spreadsheet.spreadsheetId

      // Add data to the sheet
      const reportData = [
        config.columns,
        ...config.data.map(row => 
          config.columns.map(col => row[col] || '')
        )
      ]

      await this.makeAPICall(
        `/spreadsheets/${spreadsheetId}/values/${config.sheetName || 'Report'}!A1?valueInputOption=RAW`,
        tokens,
        {
          method: 'PUT',
          body: JSON.stringify({
            values: reportData
          })
        }
      )

      return {
        id: spreadsheetId,
        title: config.title,
        url: spreadsheet.spreadsheetUrl,
        lastModified: new Date()
      }
    } catch (error) {
      if (error instanceof GoogleAPIError) {
        throw error
      }
      throw new GoogleAPIError('Failed to create report', 'create_report_failed')
    }
  }

  static async validateConnection(tokens: GoogleTokens): Promise<boolean> {
    try {
      // Try to access the user's Drive to validate permissions
      const response = await fetch('https://www.googleapis.com/drive/v3/about?fields=user', {
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`,
        },
      })
      return response.ok
    } catch (error) {
      return false
    }
  }
}

// Utility function to refresh expired tokens
export async function refreshGoogleTokens(refreshToken: string, clientId: string, clientSecret: string): Promise<GoogleTokens> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    throw new GoogleAPIError('Failed to refresh token', 'refresh_failed', response.status)
  }

  const data = await response.json()

  return {
    accessToken: data.access_token,
    refreshToken: refreshToken, // Refresh token usually stays the same
    expiresAt: new Date(Date.now() + data.expires_in * 1000),
    scope: data.scope || ''
  }
}

export { GoogleAPIError }
export type { GoogleTokens, Meeting, MeetingConfig, CRMData, SyncResult, Sheet, ReportConfig }