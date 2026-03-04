'use client'

import { useState } from 'react'

interface Props {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  aspect?: string
}

export default function ImageWithSkeleton({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  aspect = '16/9',
}: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${wrapperClassName}`}
      style={{ aspectRatio: aspect }}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-shimmer" />
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  )
}