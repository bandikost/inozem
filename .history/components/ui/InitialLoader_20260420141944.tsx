'use client'

import { messages } from '@/data/loading'
import { useEffect, useState } from 'react'
import { createPortal } from "react-dom"
import { useLoadingStore } from '../Load/loadingStore'

export default function InitialLoader() {
  const [visible, setVisible] = useState(true)
  const [textIndex, setTextIndex] = useState(0)
  const loading = useLoadingStore((s) => s.loading)

   useEffect(() => {
    if (!loading) return

    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % messages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [loading])
  
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setVisible(false), 1500) 
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!visible) return null

  return createPortal(
   <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]">
         <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-white/30 border-t-[#0a9688] rounded-full animate-spin" />
   
           <p className="text-white text-center text-base animate-slide-up">
             {messages[textIndex]}
           </p>
         </div>
       </div>

  )
}
