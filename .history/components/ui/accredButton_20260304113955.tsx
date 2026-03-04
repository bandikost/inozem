"use client"

import { years } from "@/data/accred"

type Props = {
  activeYear: number
  onChange: (year: number) => void
}

export default function AccredButton({ activeYear, onChange }: Props) {
  return (
    <div className="grid gap-2 mb-8 justify-center">
      {years.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.year)}
          className={` button-more
            ${activeYear === item.year ? "button-active" : ""}`}
        >
          {item.year}
        </button>
      ))}
    </div>
  )
}