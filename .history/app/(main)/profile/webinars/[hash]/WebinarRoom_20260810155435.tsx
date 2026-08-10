"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

interface Props {
  hash: string
}

export default function WebinarRoom({ hash }: Props) {

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return

    const pruffme = (window as any).pruffmeapi

    if (!pruffme) {
      console.error("Pruffme API не загружен")
      return
    }

    pruffme.setWebinarHash(hash)

  }, [loaded, hash])

  return (
    <>
      <Script
        src="https://pruffme.com/api/library.js"
        strategy="afterInteractive"
        data-name="pruffmeapi"
        data-type="webinar"
        onLoad={() => setLoaded(true)}
      />

      <div
        id="pruffme-webinar"
        className="w-full min-h-[700px]"
      />
    </>
  )
}