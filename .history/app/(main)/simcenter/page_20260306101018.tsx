
'use client'

import { items } from "@/data/simcenter"
import { MoveRight } from "lucide-react"
import { useState } from "react"

export default function Page() {
    const [activeId, setActiveId] = useState(1)

    const activeItem = items.find(a => a.id === activeId)

    if(!activeItem) return null

    return (
       <section className="flex flex-col px-4 justify-center">
        <h1 className="text-prpl font-semibold mt-27 text-center">Симуляционно-тренинговый центр</h1>
            <div className="flex flex-col sm:flex-row">

                <div className="flex flex-col mt-4 mr-4">
                    {items.map(item => (
                        <button key={item.id} onClick={() => setActiveId(item.id)} className={`button-more ${activeId === item.id ? "button-active" : ""}`}>
                            {item.title}
                        </button>
                    ))}
                </div> 

            <div className="w-full border border-gray-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
               <h2 className="text-xl text-green">{activeItem?.title}</h2>
                {activeItem?.links?.length > 0 && (
                        <ul className="flex gap-4 flex-col mt-5">
                            {activeItem.links.map((link, index) => (
                                <li key={index}>
                               
                                    <p className="text-default text-xl">
                                    {link.name}
                                    </p>
                              
                                </li>
                            ))}
                            </ul>
                        )}
            </div>
        </div>

        <ul className="flex flex-col mt-10">
            <li className="text-sm"><strong>Симуляционное обучение в медицинском образовании</strong> – это современные технологии обучения и оценки практических навыков, умений, основанная на реалистическом моделировании, имитации клинической ситуации - для чего используются различной сложности и реалистичности учебные модели.</li>
            <li><strong>Симуляционно-тренинговый центр (СТЦ)</strong> - Академии медицинского образования им. Ф.И. Иноземцева создан в 2015 году. СТЦ реализует образовательные программы дополнительного профессионального образования в соответствии c документами на право ведения образовательной деятельности и Уставом Академии при подготовке специалистов с высшим медицинским образованием и специалистов со средним медицинским образованием.</li>
        </ul>

    </section>
    )
}