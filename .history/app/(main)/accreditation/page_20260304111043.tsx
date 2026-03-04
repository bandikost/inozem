"use client"

import AccredTable from "@/components/accred/AccredTable"
import { items } from "@/data/accredNotice"
import { Link } from "lucide-react"
import { useState } from "react"
import AccredResult from "@/components/accred/AccredResult"



export default function Page() {
    const [activeId, setActiveId] = useState(1)

  const activeItem = items.find(item => item.id === activeId)

  if (!activeItem) {
  return null
}

return (
    <section className="flex flex-col">
      <h1 className="text-[#A358B8] font-semibold mt-27 text-3xl text-center">Первичная специализированная аккредитация</h1>

        <div className="flex justify-between">

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

            <div className="w-full border border-gray-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
               <h2 className="text-xl text-[#0a9688]">{activeItem?.title}</h2>
               {activeItem?.links?.length > 0 && (
                  <ul className="flex gap-2 flex-col mt-5">
                    {activeItem.links.map((link, index) => (
                        <li key={index}>
                        {link.title && (
                            <p className="text-[#0a9688] text-xl mb-2 mt-4">
                            {link.title}
                            </p>
                        )}

                        {link.url ? (
                            <a href={link.url} target="_blank" className=" underline hover:opacity-70 cursor-pointer flex flex-col items-start">
                                <p className="flex"><Link />{link.name}</p>
                                {index < 1 || <hr className="border-zinc-300 w-full" />}
                            </a>
                        ) : (
                            <p className="text-zinc-800 text-base">
                            {index + 1}. {link.name}
                            </p>
                        )}
                        </li>
                    ))}
                    </ul>
                )}
            </div>

        </div>
        
        <div className="w-full border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3">
            <h2 className="text-xl text-center text-black mt-3">ГРАФИК ПЕРВИЧНОЙ СПЕЦИАЛИЗИРОВАННОЙ АККРЕДИТАЦИИ</h2>
            
            <AccredTable />

        </div>

        <div className="w-full border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3">
            <h2 className="text-xl text-center text-[#A358B8] mt-3">Результаты первичной специализированной аккредитации</h2>
            
            <AccredResult />
        </div>

        <p className="mt-4 text-sm mt-15">Первичная специализированная аккредитация (ПСА)– это процедура оценки профессиональных навыков фармацевтических или медицинских работников. Ее проходят выпускники интернатуры, ординатуры, а также врачи и специалисты со средним профессиональным образованием после завершения дополнительного профессионального образования по программам профессиональной переподготовки.</p>
        <p className="mt-4 text-sm mb-10">Внимание! С 2022 года для дальнейшей работы Вам не требуется получение свидетельства об аккредитации специалиста, выписки из ЕГИСЗ или выписки из протокола заседания центральной аккредитационной комиссии (часть 3.1 статьи 69 Федерального закона от 21.11.2011 № 323-ФЗ). Сведения о Вашем прохождении аккредитации вносятся в федеральный регистр медицинских работников ЕГИСЗ, доступ в который есть у Вашего работодателя.</p>

    </section> 
    )
}