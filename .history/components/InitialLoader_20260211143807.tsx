'use client'

import { useEffect, useState } from 'react'

export default function InitialLoader() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const images = Array.from(document.images)
    const scripts = Array.from(document.scripts)
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))

    const elements: Element[] = [...images, ...scripts, ...links]
    const total = elements.length || 1
    let loaded = 0

    const updateProgress = () => {
      loaded++
      setProgress(Math.round((loaded / total) * 100))
      if (loaded >= total) {
        setFadeOut(true)
        setTimeout(() => setVisible(false), 800)
      }
    }

    useEffect(() => {
  const target = 100
  let current = 0

  const interval = setInterval(() => {
    current += Math.random() * 5 
    if (current >= target) {
      current = target
      clearInterval(interval)
      setFadeOut(true)
      setTimeout(() => setVisible(false), 800)
    }
    setProgress(Math.round(current))
  }, 100)

  return () => clearInterval(interval)
}, [])


    elements.forEach((el) => {
      if (el instanceof HTMLImageElement) {
        if (el.complete) updateProgress()
        else el.addEventListener('load', updateProgress)
      } else if (el instanceof HTMLScriptElement || el instanceof HTMLLinkElement) {
        el.addEventListener('load', updateProgress)
      }
    })

    if (document.readyState === 'complete') {
      setProgress(100)
      setFadeOut(true)
      setTimeout(() => setVisible(false), 800)
    }

    return () => {
      elements.forEach((el) => {
        if (el instanceof HTMLImageElement || el instanceof HTMLScriptElement || el instanceof HTMLLinkElement) {
          el.removeEventListener('load', updateProgress)
        }
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
