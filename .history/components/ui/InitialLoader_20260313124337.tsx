'use client'

import { useEffect, useState } from 'react'

export default function InitialLoader() {
  const [visible, setVisible] = useState(true)

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

  return (
   <div className="fixed top-0 left-0 w-screen h-screen z-[9999] grid place-items-center">
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

    <div className="relative flex items-center justify-center !top-1/2 !left-1/2">
      <div className="pulse-container">
        <svg
          className="pulse-line"
          viewBox="0 0 200 60"
          width="200"
          height="60"
        >
          <polyline
            fill="none"
            stroke="#0a9688"
            strokeWidth="3"
            points="0,30 30,30 40,10 50,50 60,30 90,30 100,15 110,45 120,30 160,30"
          />
        </svg>
      </div>
    </div>
  </div>

  )
}
