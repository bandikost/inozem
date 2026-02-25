"use client"

import { useState } from "react"

const items = [
  { id: 1, title: "Нормативная база аккредитации", text: "Текст нормативной базы..." },
  { id: 2, title: "Документы", text: "Текст про документы..." },
  { id: 3, title: "Правила поведения", text: "Текст про правила..." },
]

export default function Page() {
    const [activeId, setActiveId] = useState(1)

  const activeItem = items.find(item => item.id === activeId)

return (
    <section className="flex flex-col">
      <h1 className="text-prpl font-semibold mt-27 text-3xl text-center">Первичная специализированная аккредитация</h1>

        <div className="flex justify-between">

             <div className="flex flex-col mt-8 mr-4 gap-4">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`px-2 py-2 text-white rounded-md cursor-pointer transition
                ${activeId === item.id
                  ? "bg-purple-600"
                  : "bg-prpl hover:bg-purple-500"
                }`}
            >
              {item.title}
            </button>
          ))}
        </div> 

            <div className="w-full border-2 border-dotted border-zinc-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
               <p>{activeItem?.text}</p>
            </div>

        </div>
        
        
        
    </section> 
    )
}