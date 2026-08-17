"use client"

import { useState } from "react"
import { Play, ExternalLink } from "lucide-react"

interface Props {
  src: string
  preview?: string
  subtitles?: string[]
}

export default function VideoPreview({ src, preview, subtitles }: Props) {
  const [play, setPlay] = useState(false)

  if (play) {
    return (
      <div className="aspect-square w-full overflow-hidden bg-black">
        <iframe
          src={src}
          className="h-full w-full"
          allow="clipboard-write; autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-square w-full cursor-pointer overflow-hidden bg-slate-100" onClick={() => setPlay(true)}>
      {preview ? (
        <img src={preview} alt="Видео" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
          <ExternalLink className="h-10 w-10 text-slate-400" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-transform duration-300 hover:scale-105">
          <Play className="ml-1 h-7 w-7 text-violet-600" fill="currentColor" />
        </div>
      </div>

      {subtitles?.length ? (
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="rounded-xl bg-black/35 p-3 backdrop-blur-sm">
            {subtitles.map((text, i) => (
              <p
                key={i}
                lang="ru"
                className="!text-sm font-medium leading-snug text-white md:text-base"
                style={{
                  hyphens: "auto",
                  wordBreak: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}