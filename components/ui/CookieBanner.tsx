"use client"
import { useState } from "react"

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => {
  if (typeof window === "undefined") return false
  return !localStorage.getItem("cookie_consent")
})

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-prpl text-white p-4 h-20 flex items-center justify-between z-100 rounded">
      <p className="text-base leading-snug max-w-xl">
        Мы используем файлы cookie для улучшения работы сайта.
      </p>
      <button
        onClick={acceptCookies}
        className="ml-4 px-4 py-2 bg-blue rounded hover:bg-purple-700 transition cursor-pointer !text-white"
      >
        Принять
      </button>
    </div>
  )
}
