'use client'

import { useEffect, useState } from 'react'

export default function InitialLoader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = (total: number, loaded: number) => {
      setProgress(Math.round((loaded / total) * 100))
    }

    const elements: (HTMLImageElement | HTMLScriptElement | HTMLLinkElement)[] = [
      ...Array.from(document.images),
      ...Array.from(document.scripts),
      ...Array.from(document.querySelectorAll('link[rel="stylesheet"]')),
    ]

    const total = elements.length || 1
    let loaded = 0

    const onResourceLoad = () => {
      loaded++
      updateProgress(total, loaded)
      if (loaded >= total) {
        setFadeOut(true)
        setTimeout(() => setVisible(false), 800)
      }
    }

    elements.forEach((el) => {
      if (el instanceof HTMLImageElement) {
        if (el.complete) onResourceLoad()
        else el.addEventListener('load', onResourceLoad)
      } else if (el instanceof HTMLScriptElement) {
        el.addEventListener('load', onResourceLoad)
      } else if (el instanceof HTMLLinkElement) {
        el.addEventListener('load', onResourceLoad)
      }
    })

    if (document.readyState === 'complete') {
      // Если все уже загрузилось, сразу 100%
      setProgress(100)
      setFadeOut(true)
      setTimeout(() => setVisible(false), 800)
    }

    return () => {
      // Чистим слушатели
      elements.forEach((el) => {
        el.removeEventListener('load', onResourceLoad)
      })
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Пульс */}
        <div className="pulse-container mb-4">
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

        {/* Реальный Loadbar */}
        <div className="w-72 h-2 bg-white/30 rounded overflow-hidden mt-2">
          <div
            className="h-full bg-purple-600 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white mt-2">{progress}%</p>
      </div>
    </div>
  )
}
