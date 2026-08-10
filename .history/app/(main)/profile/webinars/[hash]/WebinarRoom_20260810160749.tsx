"use client"

import Script from "next/script"
import { useEffect } from "react"

interface Props {
  hash: string
}

declare global {
  interface Window {
    pruffmeapi?: any
    pruffmeAPICallback?: (callback: () => void) => void
  }
}

export default function WebinarRoom({ hash }: Props) {

  useEffect(() => {
    window.pruffmeAPICallback = (callback) => {
      const api = window.pruffmeapi

      if (!api) {
        console.error("Pruffme API не найден")
        return
      }

      console.log("Pruffme API:", api)
      console.log("Webinar hash:", hash)

      try {
        api.setWebinarHash(hash)

        api.setWebinarContainerName(
          ".pruffme-container"
        )

        api.setParticipantName(
          "Участник"
        )

        console.log(
          "Pruffme настройки установлены"
        )

        callback()

      } catch (error) {
        console.error(
          "Ошибка настройки Pruffme:",
          error
        )
      }
    }

    return () => {
      delete window.pruffmeAPICallback
    }
  }, [hash])

  return (
    <>
      <Script
        src="https://pruffme.com/api/library.js"
        strategy="afterInteractive"
        data-name="pruffmeapi"
        data-type="webinar"
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