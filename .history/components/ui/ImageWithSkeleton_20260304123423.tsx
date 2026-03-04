'use client'

import { useEffect, useState } from 'react'

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
  className = '',
  wrapperClassName = '',
  aspect = '16/9',
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
  const img = new Image()
  img.src = src
  if (img.complete) {
    setLoaded(true)
  }
}, [src])

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${wrapperClassName}`}
      style={{ aspectRatio: aspect }}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-shimmer bg-gray-200" />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onError={(e) => {
    console.log("error", e)
  }}
      />
    </div>
  )
}