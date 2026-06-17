'use client'

import Link from "next/link"
import { ReactNode } from "react"
import { useLoadingStore } from "@/components/Load/loadingStore"

interface LoadingLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export default function LoadingLink({
  href,
  children,
  className,
}: LoadingLinkProps) {
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