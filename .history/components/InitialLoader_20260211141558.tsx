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
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-800 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <h1 className="loader-top-text mb-6 text-center text-default text-3xl">
        Академия медицинского образования
      </h1>

      <div className="pulse-container mb-6">
        <svg
          className="pulse-line"
          viewBox="0 0 200 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            fill="none"
            stroke="#a753b6"
            strokeWidth="3"
            points="
              0,30 
              30,30 
              40,10 
              50,50 
              60,30 
              90,30
              100,15
              110,45
              120,30
              200,30
            "
          />
        </svg>
      </div>

      <p className="loader-bottom-text text-center text-default text-3xl">
        Имени Ф.И. Иноземцева
      </p>
    </div>
  )
}
