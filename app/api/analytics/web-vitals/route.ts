import { NextRequest, NextResponse } from 'next/server'

interface WebVitalsData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
  url?: string
  userAgent?: string
  timestamp?: number
}

export async function POST(request: NextRequest) {
  try {
    const data: WebVitalsData = await request.json()
    
    // Add additional context
    const enrichedData = {
      ...data,
      url: request.nextUrl.href,
      userAgent: request.headers.get('user-agent'),
      timestamp: Date.now(),
      referer: request.headers.get('referer'),
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', enrichedData)
    }

    // In production, you would send this to your analytics service
    // Examples:
    
    // Send to Google Analytics 4
    if (process.env.GA_MEASUREMENT_ID) {
      await sendToGA4(enrichedData)
    }

    // Send to custom analytics service
    if (process.env.ANALYTICS_ENDPOINT) {
      await sendToCustomAnalytics(enrichedData)
    }

    // Store in database
    if (process.env.DATABASE_URL) {
      await storeInDatabase(enrichedData)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing Web Vitals data:', error)
    return NextResponse.json(
      { error: 'Failed to process Web Vitals data' },
      { status: 500 }
    )
  }
}

async function sendToGA4(data: WebVitalsData & { userAgent?: string | null }) {
  try {
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: data.id,
          events: [
            {
              name: 'web_vitals',
              params: {
                metric_name: data.name,
                metric_value: data.value,
                metric_rating: data.rating,
                metric_delta: data.delta,
                navigation_type: data.navigationType,
              },
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`GA4 API error: ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to send to GA4:', error)
  }
}

async function sendToCustomAnalytics(data: WebVitalsData) {
  try {
    const response = await fetch(process.env.ANALYTICS_ENDPOINT!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY}`,
      },
      body: JSON.stringify({
        event: 'web_vitals',
        properties: data,
      }),
    })

    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to send to custom analytics:', error)
  }
}

async function storeInDatabase(data: WebVitalsData) {
  // This is a placeholder for database storage
  // You would implement this based on your database choice
  try {
    // Example with a hypothetical database client
    // await db.webVitals.create({ data })
    console.log('Would store in database:', data)
  } catch (error) {
    console.error('Failed to store in database:', error)
  }
}

// GET endpoint to retrieve Web Vitals data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const metric = searchParams.get('metric')
    const timeRange = searchParams.get('timeRange') || '24h'

    // This would query your database for Web Vitals data
    // For now, return mock data
    const mockData = {
      metric: metric || 'all',
      timeRange,
      data: [
        { name: 'LCP', value: 2100, rating: 'good', timestamp: Date.now() - 3600000 },
        { name: 'FID', value: 85, rating: 'good', timestamp: Date.now() - 3600000 },
        { name: 'CLS', value: 0.08, rating: 'good', timestamp: Date.now() - 3600000 },
      ],
      summary: {
        averageLCP: 2100,
        averageFID: 85,
        averageCLS: 0.08,
        totalSamples: 150,
        goodRating: 85,
        needsImprovementRating: 12,
        poorRating: 3,
      },
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error('Error retrieving Web Vitals data:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve Web Vitals data' },
      { status: 500 }
    )
  }
}