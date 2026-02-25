"use client"
import { useEffect, useState } from "react"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-700 text-white p-4 flex items-center justify-between z-10">
      <p className="text-sm leading-snug max-w-xl">
        Мы используем файлы cookie для улучшения работы сайта.
      </p>
      <button
        onClick={acceptCookies}
        className="ml-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
      >
        Принять
      </button>
    </div>
  )
}
