"use client"

import { useState } from "react"
import { years } from "@/data/accred"


export default function AccredButton() {
    const [activeId, setActiveId] = useState(1)

    const activeItem = years.find(a => a.id === activeId)
    
    if (!activeItem) return null


    return (
        <>
        {activeItem.map(active => (
            <div className="">
            <button onClick={() => setActiveId(activeId.id)}>{}</button>
        </div>
        ))}
        
        
        </>
    )
}