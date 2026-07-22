'use client'

import { learning } from "@/data/learning"
import { FileText, ArrowUpRight } from "lucide-react"
import { useState } from "react"

export default function PriceList() {

  const [activeId] = useState(2)
  const activeItem = learning.find(item => item.id === activeId)

  if (!activeItem) return null

  return (
    <div className="mb-12 flex justify-center">

      <div className="w-full max-w-6xl flex justify-center">

        <h2 className="mb-8 text-center text-2xl font-semibold text-green">
          {activeItem.title}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">

          {activeItem.links.map((link, index) => (

            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-blue
                hover:shadow-lg
              "
            >
              <div className="flex items-center gap-4">
                <FileText
                  size={22}
                  className="text-blue transition group-hover:scale-110"
                />

                <span className="text-lg text-zinc-800 transition group-hover:text-blue">
                  {link.name}
                </span>
              </div>

              <ArrowUpRight
                size={20}
                className="text-zinc-400 transition group-hover:text-blue"
              />
            </a>

          ))}

        </div>

      </div>

    </div>
  )
}