"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageWithSkeletonProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  aspect?: string
}

export default function ImageWithSkeleton({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  aspect = "1/1",
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${wrapperClassName}`} style={{ aspectRatio: aspect }}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-slate-200" />}

      <Image
        src={src}
        alt={alt}
        width={900}
        height={900}
        unoptimized
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  )
}