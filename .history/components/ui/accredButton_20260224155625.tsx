"use client"

import { useState } from "react"
import { years } from "@/data/accred"


export default function AccredButton() {
    const [activeId, setActiveId] = useState(1)

    const activeItem = years.find(a => a.id === activeId)
    
    if (!activeItem) return null


    return (
        <div className="flex gap-2">
        {years.map(active => (
        <button key={active.id} onClick={() => setActiveId(active.id)} 
        className={`px-2 py-1 text-white rounded cursor-pointer transition ${activeId === active.id ? "bg-[#00C7B2]" : "bg-green  hover:opacity-70"}`}>
            {active.year}
        </button>
        ))}
        
        
        </div>
    )
}