'use client'
import { learning } from "@/data/learning"
import { Link, MoveRight } from "lucide-react"
import { useState } from "react"


export default function SidesButtons() {

    const [activeId, setActiveId] = useState(1)
    const activeItem = learning.find(item => item.id === activeId)

  if (!activeItem) {
  return null
}

    return (
        <div className="flex flex-col sm:flex-row  mt-8 mb-12">

        <div className="flex flex-col mr-4 gap-2">
          {learning.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`px-2 py-2 button-more  ${activeId === item.id ? "button-active" : ""}`}>
              {item.title}
            </button>
          ))}
        </div> 

            <div className="w-3/4 border border-gray-300 rounded shadow-xl bg-white px-6 py-3 mt-8 sm:mt-0">
               <h2 className="text-xl text-green text-center mt-2">{activeItem?.title}</h2>
                  <ul className="flex gap-2 flex-col mt-5">
                    {activeItem.links.map(link => (
                      <li>
                          <a href={link.url} target="_blank" className="text-[#7C109A] underline hover:opacity-70 cursor-pointer flex flex-col items-center">
                              <p className="flex items-center">{link.name}<MoveRight className="ml-1 min-w-[5px] max-w-[18px] w-full" /></p>
                          </a>
                        </li>
                    ))}
                    </ul>
            </div>

        </div>
    )
}