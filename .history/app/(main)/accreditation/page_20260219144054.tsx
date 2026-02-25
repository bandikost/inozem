"use client"

import { useState } from "react"

const items = [
  {
  id: 1,
  title: "Нормативная база аккредитации",
  links: [
    { name: "Приказ Минздрава РФ от 28.10.2022 № 709н «Об утверждении Положения об аккредитации специалистов»", url: "" },
    { name: "Письмо Минздрава РФ от 28.12.2021 № 16-7/И/2-22271", url: "" },
    { name: "Приказ Минздрава РФ от 22 ноября 2021 года № 1082н «Об утверждении положения об аккредитации специалистов»", url: "" },
    { name: "Приказ Минздрава РФ от 22 ноября 2021 года № 1081н «Об утверждении положения об аккредитации специалистов»", url: "" },
    { name: "Приказ Минздрава РФ от 08.02.2021 № 58н «Об особенностях допуска к осуществлению медицинской и фармацевтической деятельности в 2021 году»", url: "" },
    { name: "Приказ Минздрава РФ от 02.02.2021 № 40н «Об особенностях проведения аккредитации специалистов в 2021 году»", url: "" },
    { name: "Приказ Минздрава РФ от 24.08.2020 № 891н «Об особенностях проведения аккредитации специалиста в 2020 году»", url: "" },
    { name: "Приказ Минздрава РФ от 04.08.2020 № 806н «О внесении изменений в сроки и этапы аккредитации специалистов»", url: "" },
    { name: "Приказ № 618 от 23.06.2020 «Об утверждении составов аккредитационных комиссий (высшее образование)»", url: "" },
    { name: "Приказ № 594 от 17.06.2020 «Об утверждении составов аккредитационных комиссий (среднее образование)»", url: "" },
    { name: "Приказ Минздрава РФ от 20.01.2020 № 34н «О внесении изменений в приказ № 334н»", url: "" },
    { name: "Приказ № 420 от 14.06.2019 «Об утверждении составов аккредитационных комиссий (высшее образование)»", url: "" },
    { name: "Приказ № 366 от 04.06.2019 «Об утверждении составов аккредитационных комиссий (среднее образование)»", url: "" },
    { name: "Приказ Минздрава РФ от 24.05.2019 № 326н «О внесении изменений в приказ № 334н»", url: "" },
    { name: "Приказ Минздрава РФ от 21.12.2018 № 898н «О внесении изменений в сроки и этапы аккредитации специалистов»", url: "" },
    { name: "Приказ Минздрава РФ № 1043н от 22.12.2017 «Об утверждении сроков и этапов аккредитации специалистов»", url: "" },
    { name: "Приказ Минздрава РФ от 02.06.2016 № 334н «Об утверждении Положения об аккредитации специалистов»", url: "" }
  ]
}
,

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

  if (!activeItem) {
  return null
}

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
               {activeItem?.links?.length > 0 && (
                    <ul className="flex flex-col mt-5">
                    {activeItem.links.map((link, index) => (
                        <li key={index} className="grid gap-4">
                            <a href={link.url} target="_blank" className="text-[#7C109A] underline hover:opacity-70">
                                {link.name}
                            </a>
                        </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
        
        <div className="w-full border-2 border-dotted border-zinc-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
            ылваодл
        </div>
        
    </section> 
    )
}