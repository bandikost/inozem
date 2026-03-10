
'use client'

import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton"
import { items } from "@/data/simcenter"
import { MoveRight } from "lucide-react"
import { useState } from "react"

export default function Page() {
    const [activeId, setActiveId] = useState(1)

    const activeItem = items.find(a => a.id === activeId)

    if(!activeItem) return null

    return (
       <section className="flex flex-col px-4 justify-center mb-10">
        <h1 className="text-prpl font-semibold mt-27 text-center">Симуляционно-тренинговый центр</h1>
            <div className="flex flex-col sm:flex-row mt-8">

                <div className="flex flex-col  mr-4 gap-2">
                    {items.map(item => (
                        <button key={item.id} onClick={() => setActiveId(item.id)} className={`button-more ${activeId === item.id ? "button-active" : ""}`}>
                            {item.title}
                        </button>
                    ))}
                </div> 

                <div className="w-full border border-gray-300 rounded shadow-2xl bg-white px-6 py-3">
                <h2 className="text-xl text-green p-2">{activeItem?.title}</h2>
                    {activeItem?.links?.length > 0 && (
                        <ul className="flex gap-4 flex-col mt-5 p-2">
                            {activeItem.links.map((link, index) => (
                                <li key={index}>
                                    <p className="text-default text-xl ">{link.name}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>

        <div className="flex flex-col mt-10 gap-4">
            <p className="!text-base"><strong>Симуляционное обучение в медицинском образовании</strong> – это современные технологии обучения и оценки практических навыков, умений, основанная на реалистическом моделировании, имитации клинической ситуации - для чего используются различной сложности и реалистичности учебные модели.</p>
            <p className="!text-base"><strong>Симуляционно-тренинговый центр (СТЦ)</strong> - Академии медицинского образования им. Ф.И. Иноземцева создан в 2015 году. СТЦ реализует образовательные программы дополнительного профессионального образования в соответствии c документами на право ведения образовательной деятельности и Уставом Академии при подготовке специалистов с высшим медицинским образованием и специалистов со средним медицинским образованием.</p>
        </div>

        <div className="border border-gray-300 rounded shadow-2xl bg-white px-6 py-4 mt-8 ">
            <h2 className="text-prpl py-2">Большим успехом услуги СТЦ пользуются при подготовке специалистов к первичной специализированной аккредитации (ПСА) по направлениям подготовки</h2>
            <div className="flex gap-6 mt-10 items-center justify-center mb-6">
                <ImageWithSkeleton
                    src="/Images/simcenter/1.png"
                    alt="Изображение академии"
                    wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
                    aspect="1/1"/>
                <ImageWithSkeleton
                    src="/Images/simcenter/2.png"
                    alt="Изображение академии"
                    wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
                    aspect="1/1"/>
            </div>  
        </div>

         <div className="border border-gray-300 rounded shadow-2xl bg-white px-6 py-4 mt-12">
            <h2 className="text-prpl py-2">Акушерство и гинекология и Акушерское дело</h2>
            <p className="!font-normal">В СТЦ Академии работает симуляционная родовая, в которой проходят обучение как врачи акушеры-гинекологи, так и акушерки.
                <br/>
                Оборудование для симуляционно-тренингового обучения по направлениям подготовки «Акушерство и гинекология» и «Акушерское дело»</p>
            <div className="grid grid-cols-4 gap-6 mt-10 items-center justify-center mb-6">
                <ImageWithSkeleton
                    src="/Images/simcenter/3.png"
                    alt="Изображение академии"
                    wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
                    aspect="1/1"/>

                <ImageWithSkeleton
                    src="/Images/simcenter/4.png"
                    alt="Изображение академии"
                    wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
                    aspect="1/1"/>

                <ImageWithSkeleton
                    src="/Images/simcenter/5.png"
                    alt="Изображение академии"
                    wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
                    aspect="1/1"/>

                <ImageWithSkeleton
                    src="/Images/simcenter/6.png"
                    alt="Изображение академии"
                    wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
                    aspect="1/1"/>
            </div>
        </div>

        <div className="border border-gray-300 rounded shadow-2xl bg-white px-6 py-4 mt-12">
            <h2 className="text-prpl py-2">Акушерство и гинекология и Акушерское дело</h2>
            <p className="!font-normal">В СТЦ Академии работает симуляционная родовая, в которой проходят обучение как врачи акушеры-гинекологи, так и акушерки.
                <br/>
                Оборудование для симуляционно-тренингового обучения по направлениям подготовки «Акушерство и гинекология» и «Акушерское дело»</p>
            <div className="grid grid-cols-4 gap-6 mt-10 items-center justify-center mb-6">
                <ImageWithSkeleton
                    src="/Images/simcenter/3.png"
                    alt="Изображение академии"
                    wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
                    aspect="1/1"/>

                <ImageWithSkeleton
                    src="/Images/simcenter/4.png"
                    alt="Изображение академии"
                    wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
                    aspect="1/1"/>

                <ImageWithSkeleton
                    src="/Images/simcenter/5.png"
                    alt="Изображение академии"
                    wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
                    aspect="1/1"/>

                <ImageWithSkeleton
                    src="/Images/simcenter/6.png"
                    alt="Изображение академии"
                    wrapperClassName="max-w-[320px] max-h-[320px] !border-2 border-prpl shadow-xl"
                    aspect="1/1"/>
            </div>
        </div>

    </section>
    )
}