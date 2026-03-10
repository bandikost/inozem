
'use client'

import { items } from "@/data/simcenter"
import { MoveRight } from "lucide-react"
import { useState } from "react"

export default function Page() {
    const [activeId, setActiveId] = useState(1)

    const activeItem = items.find(a => a.id === activeId)

    if(!activeItem) return null

    return (
       <section className="flex flex-col px-4">
        <h1 className="text-prpl font-semibold mt-27 text-center">Симуляционно-тренинговый центр</h1>
            <div className="flex flex-col sm:flex-row">

                <div className="flex flex-col mt-4 mr-4">
                    {items.map(item => (
                        <button key={item.id} onClick={() => setActiveId(item.id)} className={`px-2 py-2 button-more ${activeId === item.id ? "button-active" : ""}`}>
                            {item.title}
                        </button>
                    ))}
                </div> 

            <div className="w-full border border-gray-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
               <h2 className="text-xl text-green">{activeItem?.title}</h2>
                {activeItem?.links?.length > 0 && (
                        <ul className="flex gap-2 flex-col mt-5">
                            {activeItem.links.map((link, index) => (
                                <li key={index}>
                               
                                    <p className="text-default text-xl mb-2 mt-4">
                                    {link.name}
                                    </p>
                              
                                </li>
                            ))}
                            </ul>
                        )}
            </div>
        </div>
    </section>
    )
}