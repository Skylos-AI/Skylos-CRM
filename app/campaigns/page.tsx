"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CampaignsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard since campaigns feature has been removed
    router.replace("/dashboard")
  }, [router])

  return null
}