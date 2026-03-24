'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({ showSpinner: false, speed: 400, trickleSpeed: 200 })
    NProgress.start()

    const timeout = setTimeout(() => NProgress.done(), 300)
    return () => clearTimeout(timeout)
  }, [pathname?.toString(), searchParams?.toString()])

  return null
}