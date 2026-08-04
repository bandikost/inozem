"use client"

import LoadingLink from "@/components/Load/LoadingLink"
import MediaGallery from "@/components/ui/LazyLoad/ImageGallery"
import ImageGallery from "@/components/ui/LazyLoad/ImageGallery"
import { items } from "@/data/simcenter"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

export default function SimClient() {
  const [activeId, setActiveId] = useState(1)

  const activeItem = items.find((item) => item.id === activeId)

  if (!activeItem) return null

  return (
    <section className="min-h-screen">

      <div className="container mx-auto my-27 px-2">

        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

          <LoadingLink
            href="/"
            className="shrink-0 transition hover:text-blue hover:underline"
          >
            Главная
          </LoadingLink>

          <ChevronRight
            size={14}
            className="shrink-0"
          />

          <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
            Симуляционно-тренинговый центр
          </span>

        </nav>

        <h1 className="text-center font-semibold text-prpl">
          Симуляционно-тренинговый центр
        </h1>

         <div className="mt-10 grid gap-4 md:grid-cols-2">

            {items.map((item, index) => (

                <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`
                    group
                    relative
                    rounded-3xl
                    border
                    p-6
                    text-left
                    transition-all
                    duration-300
                    cursor-pointer

                    ${
                    activeId === item.id
                        ? "border-blue bg-blue/[0.04] shadow-md"
                        : "border-zinc-200 bg-white hover:border-blue/40 hover:shadow-md"
                    }
                `}
                >

                <div className="flex items-start gap-5">

                    <div
                    className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        text-sm
                        font-semibold
                        transition

                        ${
                        activeId === item.id
                            ? "bg-blue text-white"
                            : "bg-zinc-100 text-zinc-500 group-hover:bg-blue/10 group-hover:text-blue"
                        }
                    `}
                    >
                    {String(index + 1).padStart(2, "0")}
                    </div>


                    <div className="min-w-0 flex-1">

                    <h3
                        className={`
                        text-lg
                        leading-snug
                        transition-colors

                        ${
                            activeId === item.id
                            ? "text-blue"
                            : "text-prpl group-hover:text-blue"
                        }
                        `}
                    >
                        {item.title}
                    </h3>


                    <div
                        className={`
                        mt-4
                        flex
                        items-center
                        gap-2
                        text-sm
                        transition

                        ${
                            activeId === item.id
                            ? "text-blue"
                            : "text-zinc-400 group-hover:text-blue"
                        }
                        `}
                    >
                        <span>
                        {activeId === item.id
                            ? "Раздел открыт"
                            : "Открыть раздел"}
                        </span>

                        <ChevronRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                        />

                    </div>

                    </div>

                </div>

                </button>

            ))}

            </div>

            <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

                <div className="flex items-start justify-between gap-4">

                    <div>

                    <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue">
                        Выбранный раздел
                    </p>

                    <h2 className="text-2xl font-semibold leading-tight text-prpl md:text-3xl">
                        {activeItem.title}
                    </h2>

                    </div>

                </div>


                {activeItem.links?.length > 0 ? (

                    <div className="mt-6 grid gap-3">

                    {activeItem.links.map((link, index) => (

                        <LoadingLink
                        key={`${link.url}-${index}`}
                        href={link.url}
                        className="
                            group
                            flex
                            items-center
                            justify-between
                            gap-4
                            rounded-2xl
                            border
                            border-zinc-200
                            bg-zinc-50
                            px-5
                            py-4
                            transition-all
                            hover:border-blue/40
                            hover:bg-blue/[0.04]
                            hover:shadow-sm
                        "
                        >

                        <span className="text-base text-default transition-colors group-hover:text-blue">
                            {link.name}
                        </span>

                        <ChevronRight
                            size={18}
                            className="
                            shrink-0
                            text-zinc-400
                            transition-all
                            group-hover:translate-x-1
                            group-hover:text-blue
                            "
                        />

                        </LoadingLink>

                    ))}

                    </div>

                ) : (

                    <div className="mt-6 rounded-2xl bg-zinc-50 px-5 py-6 text-center">

                    <p className="text-zinc-500">
                        Материалы раздела пока добавляются.
                    </p>

                    </div>

                )}

                </div>


        

        <div className="mt-12 rounded-3xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">

          <h2 className="py-2 text-prpl">

            В СТЦ Академии воспроизведен кабинет манипуляционная,
            оснащенный следующим оборудованием

          </h2>


          <MediaGallery
            items={[
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/7.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/8.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/9.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/10.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/11.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/12.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/13.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/14.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/15.png",
              },
            ]}
            cols="lg:grid-cols-5 sm:grid-cols-1 md:grid-cols-2"
          />

        </div>

        <div className="mt-10 flex flex-col gap-4">

          <p className="!text-base">

            <strong>
              Симуляционное обучение в медицинском образовании
            </strong>

            {" "}– это современные технологии обучения и оценки практических
            навыков, умений, основанные на реалистическом моделировании,
            имитации клинической ситуации — для чего используются различной
            сложности и реалистичности учебные модели.

          </p>


          <p className="!text-base">

            <strong>
              Симуляционно-тренинговый центр (СТЦ)
            </strong>

            {" "}Академии медицинского образования им. Ф.И. Иноземцева создан
            в 2015 году. СТЦ реализует образовательные программы
            дополнительного профессионального образования в соответствии с
            документами на право ведения образовательной деятельности и
            Уставом Академии при подготовке специалистов с высшим медицинским
            образованием и специалистов со средним медицинским образованием.

          </p>

        </div>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">

          <h2 className="py-2 text-prpl">

            Большим успехом услуги СТЦ пользуются при подготовке
            специалистов к первичной специализированной аккредитации (ПСА)
            по направлениям подготовки

          </h2>


          <MediaGallery
            cols="lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2"
            items={[
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/1.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/2.png",
              },
              {
                type: "video",
                src: "https://rutube.ru/play/embed/75a6452524e2ed9ac387a654c208b57e/?p=eHMTiRloYyZOY09stfR44g",
                preview: "/Images/заглушка.png",
              },
              {
                type: "video",
                src: "https://rutube.ru/play/embed/35c0a78073eac3c019deec0d4469d2d7/?p=YxOHNiXNEOOXcXYq5iE4dw",
                preview: "/Images/заглушка.png",
              },
            ]}
          />

        </div>


        <div className="mt-12 rounded-3xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">

          <h2 className="py-2 text-prpl">

            Акушерство и гинекология и Акушерское дело

          </h2>


          <p className="!font-normal">

            В СТЦ Академии работает симуляционная родовая, в которой проходят
            обучение как врачи акушеры-гинекологи, так и акушерки.

            <br />

            Оборудование для симуляционно-тренингового обучения по направлениям
            подготовки «Акушерство и гинекология» и «Акушерское дело».

          </p>


          <ImageGallery
            cols="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            items={[
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/3.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/4.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/5.png",
              },
              {
                type: "image",
                src: "https://storage.yandexcloud.net/inozemstorage/simcenter/6.png",
              },
            ]}
          />

        </div>

      </div>

    </section>
  )
}