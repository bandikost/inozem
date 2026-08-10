"use client"

import Script from "next/script"

interface Props {
  hash: string
}

declare global {
  interface Window {
    pruffmeapi?: any
  }
}

export default function WebinarRoom({ hash }: Props) {
 const initWebinar = () => {
  const api = window.pruffmeapi

  if (!api) {
    console.error("Pruffme API не найден")
    return
  }

  console.log("Pruffme API:", api)
  console.log("Hash:", hash)

  try {
    // Указываем сервер Pruffme
    api.host_prefix = "https://pruffme.com"

    api.setWebinarHash(hash)

    api.setWebinarContainerName(".pruffme-container")

    api.setParticipantName("Участник")

    console.log("host_prefix:", api.host_prefix)

    api.init(() => {
      console.log("Pruffme webinar initialized")
    })

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
          console.error(
            "Не удалось загрузить Pruffme library.js"
          )
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