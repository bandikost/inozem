"use client"

import { years } from "@/data/accred"

type Props = {
  activeYear: number
  onChange: (year: number) => void
}

export default function AccredButton({ activeYear, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-8 justify-center">
      {years.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.year)}
          className={`px-2 py-1 text-white rounded cursor-pointer 
            ${activeYear === item.year ? "bg-[#00C7B2]" : "bg-green"}`}
        >
          {item.year}
        </button>
      ))}
    </div>
  )
}