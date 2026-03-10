
import { items } from "@/data/accredNotice"
import { useState } from "react"

export default function Page() {
    const [activeId, setActiveId] = useState(1)

    const activeItem = items.find(a => a.id === activeId)

    if(!activeItem) return null

    return (
       <section className="flex flex-col px-4">
        <h1 className="text-prpl font-semibold mt-27 text-center">Симуляционно-тренинговый центр</h1>

        <div className="flex flex-col mt-4 mr-4">
                  {items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveId(item.id)}
                      className={`px-2 py-2 button-more ${activeId === item.id ? "button-active" : ""}`}>
                      {item.title}
                    </button>
                  ))}
                </div> 

      </section>
    )
}