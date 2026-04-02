'use client'
import { learning } from "@/data/learning"
import { useState } from "react"


export default function SidesButtons() {

    const [activeId, setActiveId] = useState(1)
    const activeItem = learning.find(item => item.id === activeId)

  if (!activeItem) {
  return null
}

    return (
        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 mb-12">

        <div className="flex flex-col mr-4 gap-2">
          {learning.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`!px-3 !py-3 button-more text-lg  ${activeId === item.id ? "button-active" : ""}`}>
              {item.title}
            </button>
          ))}
        </div> 

            <div className="w-full sm:w-3/4 border border-gray-300 rounded shadow-xl bg-white pt-3 mt-8 sm:mt-0">
               <h2 className="text-xl text-green text-center mt-2 p-1">{activeItem?.title}</h2> 
              
                  <ul className="grid grid-cols-2">
                    {activeItem.links.map((link, index)=> (
                      <li key={index}>
                          <a href={link.url} target="_blank" className="text-base tablet:!text-lg text-[#7C109A] hover:bg-blue hover:!text-white cursor-pointer flex flex-col items-center border border-gray-300 p-3">
                            {link.name}
                          </a>
                        </li>
                    ))}
                    </ul>
            </div>

        </div>
    )
}