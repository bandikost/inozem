"use client"

import { useState } from "react"

const items = [
  { id: 1, title: "Нормативная база аккредитации",
    links: [
      { name: "Пожарная безопасность", url: "/files/about/pozh_bez.png" },
      { name: "Санэпид заключение", url: "/files/about/san_epid.png" }
    ]},

  { id: 2, title: "Документы для первичной специализированной аккредитации",
    links: [
      { name: "Пожарная безопасность", url: "/files/about/pozh_bez.png" },
      { name: "Санэпид заключение", url: "/files/about/san_epid.png" }
    ]},

  { id: 3, title: "Правила поведения аккредитаци", 
    links: [
      { name: "Пожарная безопасность", url: "/files/about/pozh_bez.png" },
      { name: "Санэпид заключение", url: "/files/about/san_epid.png" }
    ]},
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
              className={`px-2 py-2 text-white rounded-md cursor-pointer transition ${activeId === item.id ? "bg-[#0a9688]" : "bg-[#00C7B2] hover:opacity-70"}`}>
              {item.title}
            </button>
          ))}
        </div> 

            <div className="w-full border-2 border-dotted border-zinc-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
               <h2 className="text-xl">{activeItem?.title}</h2>
            </div>

        </div>
        
        <div className="w-full border-2 border-dotted border-zinc-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
            ылваодл
        </div>
        
    </section> 
    )
}