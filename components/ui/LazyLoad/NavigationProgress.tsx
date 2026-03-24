'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function NavigationProgress() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false, speed: 400, trickleSpeed: 200 })

    const handleStart = () => NProgress.start()
    const handleStop = () => NProgress.done()

    window.addEventListener('beforeunload', handleStart)
    
    handleStart()
    const timeout = setTimeout(handleStop, 1000) 

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('beforeunload', handleStart)
      NProgress.done()
    }
  }, [usePathname()])

  return null
}