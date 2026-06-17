'use client'

import Link from 'next/link'
import { useLoadingStore } from '@/components/Load/loadingStore'

export default function LoadingLink({
  href,
  children,
  className,
}) {
  const show = useLoadingStore((s) => s.show)

  return (
    <Link
      href={href}
      className={className}
      onClick={() => show()}
    >
      {children}
    </Link>
  )
}