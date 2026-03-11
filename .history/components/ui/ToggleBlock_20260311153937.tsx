'use client'

import { useState } from "react"

export function ToggleBlock({ title, children, classText = "text-base" }: { title: string, children: React.ReactNode, classText?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="px-4">
      <div
        onClick={() => setOpen(prev => !prev)}
        className="cursor-pointer hover:underline text-prpl">
        <p className={`text-prpl ${classText}`}>{title} ({open ? "Свернуть" : "Показать"})</p>
      </div>
      {open && <div className="mt-2 grid gap-2 mt-4">{children}</div>}
    </div>
  )
}