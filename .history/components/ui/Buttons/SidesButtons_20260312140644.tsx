'use client'
import { learning } from "@/data/learning"
import { useState } from "react"


export default function SidesButtons() {

    const [activeId, setActiveId] = useState(1)
    const activeItem = learning.find(item => item.id === activeId)


    return (
        <div className="flex flex-col sm:flex-row mt-8 w-3/4">

        <div className="flex flex-col mr-4 gap-2">
          {learning.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`px-2 py-2 button-more ${activeId === item.id ? "button-active" : ""}`}>
              {item.title}
            </button>
          ))}
        </div> 

            <div className="w-full border border-gray-300 rounded shadow-2xl bg-white px-6 py-3 mt-8 sm:mt-0">
               <h2 className="text-xl text-green text-center mt-2">{activeItem?.title}</h2>
  
            </div>

        </div>
    )
}