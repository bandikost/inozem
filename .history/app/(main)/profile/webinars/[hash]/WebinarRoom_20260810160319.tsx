"use client"

import Script from "next/script"
import { useState } from "react"

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

  const initWebinar = () => {
    const api = window.pruffmeapi

    if (!api) {
      console.error("Pruffme API не найден")
      return
    }

    console.log("Инициализация Pruffme")
    console.log("Hash:", hash)

    try {
      // Hash вебинара
      api.setWebinarHash(hash)

      // Контейнер, куда Pruffme будет рендерить комнату
      api.setWebinarContainerName(".pruffme-container")

      // Имя участника
      // Здесь можешь потом передать реальное ФИО пользователя
      api.setParticipantName("Участник")

      // ВАЖНО:
      // запускаем дальнейшую инициализацию Pruffme
      api.init(() => {
        console.log("Pruffme webinar initialized")
      })

      setLoaded(true)

    } catch (error) {
      console.error(
        "Ошибка инициализации Pruffme:",
        error
      )
    }
  }

  return (
    <>
    <Script
      src="https://pruffme.com/api/library.js"
      strategy="afterInteractive"
      onLoad={() => {
        console.log("Pruffme library loaded")
        initWebinar()
      }}
      onError={() => {
        console.error("Не удалось загрузить Pruffme library.js")
      }}
    />

    <div
      className="pruffme-container w-full"
      style={{
        width: "100%",
        height: "800px",
        position: "relative",
        overflow: "hidden",
      }}
    />
  </>
  )
}