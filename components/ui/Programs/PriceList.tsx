'use client'
import { learning } from "@/data/learning"
import { useState } from "react"


export default function PriceList() {

    const [activeId, setActiveId] = useState(2)
    const activeItem = learning.find(item => item.id === activeId)

  if (!activeItem) {
  return null
}

    return (
        <div className="flex flex-col justify-center items-center mt-8 mb-12">

            <div className="w-full sm:w-3/4 border border-gray-300 rounded shadow-xl bg-white pt-3 mt-8 sm:mt-0">
               <h2 className="text-xl text-green text-center mt-2 p-1">{activeItem?.title}</h2> 
              
                  <ul className="grid grid-cols-1 tablet:grid-cols-2 mt-4">
                    {activeItem.links.map((link, index)=> (
                      <li key={index}>
                          <a href={link.url} target="_blank" className="!text-lg text-[#7C109A] hover:bg-blue hover:!text-white cursor-pointer flex flex-col border border-gray-300 p-3">
                            {link.name}
                          </a>
                        </li>
                    ))}
                    </ul>
            </div>

        </div>
    )
}