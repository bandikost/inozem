'use client'

import Link, { LinkProps } from 'next/link'
import NProgress from 'nprogress'
import { ReactNode } from 'react'

type AppLinkProps = LinkProps & {
  children: ReactNode
  className?: string
}

export default function AppLink({ href, children, ...props }: AppLinkProps) {
  const handleClick = () => {
    NProgress.start()
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}