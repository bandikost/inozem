"use client"

import { useEffect } from "react"

export default function AdminActivityTracker() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      await fetch("/api/admin/activity", {
        method: "POST",
      })
    }, 30_000)

    return () => clearTimeout(timer)
  }, [])

  return null
}