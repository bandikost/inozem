
'use client'

import LoadingLink from "@/components/Load/LoadingLink"
import MediaGallery from "@/components/ui/LazyLoad/ImageGallery"
import ImageGallery from "@/components/ui/LazyLoad/ImageGallery"
import { items } from "@/data/simcenter"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

export default function SimClient() {
    const [activeId, setActiveId] = useState(1)

    const activeItem = items.find(a => a.id === activeId)

    if(!activeItem) return null

    return (
       <section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Симуляционно-тренинговый центр
        </span>
      
      </nav>
        <h1 className="text-prpl font-semibold text-center">Симуляционно-тренинговый центр</h1>
           <div className="mt-8">

            <div className="flex w-full overflow-x-auto border-b border-zinc-200">

                {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`
                    relative
                    whitespace-nowrap
                    px-5
                    py-4
                    text-lg
                    !font-normal
                    transition
                    cursor-pointer
                    ${
                        activeId === item.id
                        ? "text-blue"
                        : "text-zinc-500 hover:text-zinc-900"
                    }
                    `}
                >
                    {item.title}

                    {activeId === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue" />
                    )}
                </button>
                ))}

            </div>

            <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

                <h2 className="text-center text-xl text-green">
                {activeItem.title}
                </h2>

                {activeItem.links?.length > 0 && (
                <ul className="mt-5 flex flex-col gap-4">

                    {activeItem.links.map((link, index) => (
                    <li
                        key={index}
                        className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 transition hover:border-blue/30 hover:bg-blue/5"
                    >
                        <p className="text-lg text-default">
                        {link.name}
                        </p>
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

        <div className="border border-gray-300 rounded shadow-2xl bg-white px-6 py-4 mt-12">
            <h2 className="text-prpl py-2">В СТЦ Академии воспроизведен кабинет манипуляционная, оснащенный следующим оборудованием</h2>
                <MediaGallery items={[{ type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/7.png" }, { type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/8.png" },{ type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/9.png" },{ type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/10.png" },{ type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/11.png" },
                { type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/12.png" },{ type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/13.png" },{ type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/14.png" },{ type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/15.png" },
                ]} cols="lg:grid-cols-5 sm:grid-cols-1 md:grid-cols-2"/>
        </div>

        <div className="border border-gray-300 rounded shadow-2xl bg-white px-6 py-4 mt-8 ">
            <h2 className="text-prpl py-2">Большим успехом услуги СТЦ пользуются при подготовке специалистов к первичной специализированной аккредитации (ПСА) по направлениям подготовки</h2>
            <MediaGallery
            cols="lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2"
            items={[
                { type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/1.png" },
                { type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/2.png" },
                { type: "video", src: "https://rutube.ru/play/embed/75a6452524e2ed9ac387a654c208b57e/?p=eHMTiRloYyZOY09stfR44g", preview: "/Images/заглушка.png" },            
                { type: "video", src: "https://rutube.ru/play/embed/35c0a78073eac3c019deec0d4469d2d7/?p=YxOHNiXNEOOXcXYq5iE4dw", preview: "/Images/заглушка.png" },
            ]}
            />
            
        </div>

         <div className="border border-gray-300 rounded shadow-2xl bg-white px-6 py-4 mt-12">
            <h2 className="text-prpl py-2">Акушерство и гинекология и Акушерское дело</h2>
            <p className="!font-normal">В СТЦ Академии работает симуляционная родовая, в которой проходят обучение как врачи акушеры-гинекологи, так и акушерки.
                <br/>
                Оборудование для симуляционно-тренингового обучения по направлениям подготовки «Акушерство и гинекология» и «Акушерское дело»</p>
                <ImageGallery cols="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4" items={[ { type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/3.png" },{ type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/4.png" },{ type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/5.png" },{ type: "image", src: "https://storage.yandexcloud.net/inozemstorage/simcenter/6.png" },]} />
        </div>

        
            </div>
    </section>
    )
}