'use client'

import { useState } from "react"

export function ToggleBlock({ title, children }: { title: string, children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="px-4">
      <div
        onClick={() => setOpen(prev => !prev)}
        className="cursor-pointer hover:underline ">
        <p>{title} ({open ? "Свернуть" : "Показать"})</p>
      </div>
      {open && <div className="px-6 mt-2 grid gap-2 mt-4">{children}</div>}
    </div>
  )
}