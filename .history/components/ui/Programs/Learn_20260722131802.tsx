"use client"

import { learning } from "@/data/learning"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Learn() {
  const [openId, setOpenId] = useState<number | null>(null)

  const activeItem = learning.find(item => item.id === 3)

  if (!activeItem) {
    return null
  }

  return (
    <div className="flex flex-col items-center mb-12">
      <div className="w-full max-w-5xl">

        <h2 className="text-2xl font-semibold text-center text-green mb-8">
          {activeItem.title}
        </h2>

        <div className="flex flex-col gap-3">

          {activeItem.links.map((link, index) => {
            const isOpen = openId === index

            return (
              <div
                key={index}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border-gray-30
                  bg-white
                  transition-all
                  duration-300
              
                  ${
                    isOpen
                      ? "border-blue-300 shadow-md"
                      : "border-gray-300 shadow-sm"
                  }
                `}
              >

                <button
                  type="button"
                  onClick={() =>
                    setOpenId(isOpen ? null : index)
                  }
                  className="group flex w-full cursor-pointer items-center justify-between gap-5 p-5 text-left border border-gray-200 rounded-2xl"
                >
                  <span
                    className={`
                      text-lg transition
                      ${
                        isOpen
                          ? "text-blue"
                          : "text-zinc-800 group-hover:text-blue"
                      }
                    `}
                  >
                    {link.name}
                  </span>

                  <ChevronDown
                    size={22}
                    className={`
                      shrink-0
                      text-zinc-400
                      transition-transform
                      duration-300
                      ${
                        isOpen
                          ? "rotate-180 text-blue"
                          : "group-hover:text-blue"
                      }
                    `}
                  />
                </button>

                <div
                  className={`
                    grid transition-all duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-zinc-100 px-5 pb-5 pt-4 text-zinc-600">
                      {link.url}
                    </div>
                  </div>
                </div>

              </div>
            )
          })}

        </div>
        
        <div className="overflow-hidden
                  rounded-2xl
                  border-gray-30
                  bg-white
                  transition-all
                  duration-300">
                    asdahs
          </div>

      </div>
    </div>
  )
}