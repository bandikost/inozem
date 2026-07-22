'use client'
import { learning } from "@/data/learning"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"


export default function Learn() {

    const [activeId, setActiveId] = useState(1)
    const activeItem = learning.find(item => item.id === activeId)

  if (!activeItem) {
  return null
}

    return (
       <div className="flex flex-col items-center mb-12">

  <div className="w-full max-w-5xl">

    <h2 className="text-2xl font-semibold text-center text-green mb-8">
      {activeItem.title}
    </h2>

    <div className="grid gap-4 sm:grid-cols-2">

      {activeItem.links.map((link, index) => (

        <a
          key={index}
          href={link.url}
          target="_blank"
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

          <span className="text-lg text-zinc-800 group-hover:text-blue transition">
            {link.name}
          </span>

          <span className="text-2xl text-zinc-300 group-hover:text-blue">
            <ArrowUpRight
                size={20}
                className="text-zinc-400 transition group-hover:text-blue"
              />
          </span>

        </a>

      ))}

    </div>

  </div>

</div>
    )
}