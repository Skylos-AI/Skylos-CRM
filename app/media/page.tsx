"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MediaPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard since media library feature has been removed
    router.replace("/dashboard")
  }, [router])

  return null
}