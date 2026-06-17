'use client'

import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"
import { useLoadingStore } from "@/components/Load/loadingStore"

interface LoadingLinkProps extends LinkProps {
  children: ReactNode
  className?: string
}

export default function LoadingLink({
  children,
  className,
  ...props
}: LoadingLinkProps) {
  const show = useLoadingStore((s) => s.show)

  return (
    <Link
      {...props}
      className={className}
      onClick={() => show()}
    >
      {children}
    </Link>
  )
}