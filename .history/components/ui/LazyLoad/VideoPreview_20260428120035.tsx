'use client'

import { useState } from "react"
import { Play } from "lucide-react"

interface Props {
  src: string
  preview?: string
  subtitles?: string[]
}

export default function VideoPreview({ src, preview, subtitles }: Props) {
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
    <div className="border border-gray-300 rounded-xl shadow-xl">
      <div onClick={() => setPlay(true)} className="relative cursor-pointer border-2 border-prpl rounded-xl overflow-hidden">
      <img src={preview} alt="Видео" className="w-full h-full object-cover aspect-square"/>

      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <Play size={50} className="text-white"/>
      </div>

      
    </div>
      {subtitles?.map((text, i) => (
        <p key={i} className="!text-lg text-base leading-snug h-12 text-center flex justify-center items-center m-4">
          {text}
        </p>
      ))}
    </div>
    
  )
}