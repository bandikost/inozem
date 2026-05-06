'use client'

import { useState } from "react"
import { Play } from "lucide-react"

interface Props {
  src: string
  preview: string
  title?: string
  subtitles?: string[]
}

export default function VideoPreview({ src, preview, title, subtitles }: Props) {
  const [play, setPlay] = useState(false)

  if (play) {
    return (
      <iframe
        src={src}
        className="w-full aspect-square border-2 border-prpl shadow-xl rounded-xl"
        allow="clipboard-write; autoplay"
        allowFullScreen
      />
    )
  }

  return (
    <div
      onClick={() => setPlay(true)}
      className="relative cursor-pointer border-2 border-prpl shadow-xl rounded-xl overflow-hidden"
    >
      <img
        src={preview}
        alt="Видео"
        className="w-full h-full object-cover aspect-square"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <Play size={50} className="text-white"/>
      </div>
    </div>
  )
}