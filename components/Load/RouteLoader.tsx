"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { useLoadingStore } from "@/components/Load/loadingStore"

export default function RouteLoader() {
  const pathname = usePathname()
  const show = useLoadingStore((s) => s.show)
  const hide = useLoadingStore((s) => s.hide)

  const prevPath = useRef(pathname)

  useEffect(() => {
    if (prevPath.current === pathname) return

    show()

    const t = setTimeout(() => {
      hide()
    }, 1000)

    prevPath.current = pathname

    return () => clearTimeout(t)
  }, [pathname])

  return null
}