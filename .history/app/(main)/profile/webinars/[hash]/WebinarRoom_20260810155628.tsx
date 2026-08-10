"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

interface Props {
  hash: string
}

declare global {
  interface Window {
    pruffmeapi?: any
  }
}

export default function WebinarRoom({ hash }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return

    const api = window.pruffmeapi

    console.log("Pruffme API:", api)
    console.log("Webinar hash:", hash)

    if (!api) {
      console.error("Pruffme API не найден")
      return
    }

    try {
      api.setWebinarHash(hash)

      console.log("setWebinarHash выполнен")

      // Посмотреть, какие методы реально доступны
      console.log(
        "Методы Pruffme:",
        Object.keys(api)
      )
    } catch (error) {
      console.error(
        "Ошибка инициализации Pruffme:",
        error
      )
    }
  }, [loaded, hash])

  return (
    <div className="w-full">

      <Script
        src="https://pruffme.com/api/library.js"
        strategy="afterInteractive"
        data-name="pruffmeapi"
        data-type="webinar"
        onLoad={() => {
          console.log("Pruffme library loaded")
          setLoaded(true)
        }}
        onError={() => {
          console.error(
            "Не удалось загрузить Pruffme library.js"
          )
        }}
      />

      <div
        id="pruffme-webinar"
        className="w-full min-h-[700px]"
      />

    </div>
  )
}