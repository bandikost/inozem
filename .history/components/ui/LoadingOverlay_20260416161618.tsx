"use client"

import { messages } from "@/lib/loading"
import { useEffect, useState } from "react"


interface Props {
  loading: boolean
}

export default function LoadingOverlay({ loading }: Props) {
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    if (!loading) return

    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % messages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [loading])

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [loading])

  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-white/30 border-t-[#0a9688] rounded-full animate-spin" />

        <p className="text-white text-center text-base animate-slide-up">
          {messages[textIndex]}
        </p>
      </div>
    </div>
  )
}