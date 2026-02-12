'use client'

import { useEffect, useState } from 'react'

export default function InitialLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setVisible(false), 2000) 
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

  <div className="relative z-10 flex flex-col items-center">

    <div className="pulse-container mb-6">
      <svg
        className="pulse-line"
        viewBox="0 0 200 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          fill="none"
          stroke="#812991"
          strokeWidth="3"
          points="0,30 30,30 40,10 50,50 60,30 90,30 100,15 110,45 120,30 160,30"
        />
      </svg>
    </div>

  </div>
</div>

  )
}
