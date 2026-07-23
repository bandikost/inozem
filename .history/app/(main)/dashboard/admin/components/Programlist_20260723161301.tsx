"use client"

import { getHourWord } from "@/components/ui/GetHourWord"
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock3,
  Pencil,
  Search,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

interface Program {
  id: number
  name: string
  time: number
  slug: string
}

interface Props {
  program: Program[]
}

export default function ProgramList({ program }: Props) {
  const [value, setValue] = useState("")

  const filtered = useMemo(() => {
    return program.filter((p) =>
      p.name.toLowerCase().startsWith(value.toLowerCase())
    )
  }, [program, value])

  return (
    <section className="mx-auto mt-27 max-w-7xl px-6 pb-16">

      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

        <Link
          href="/dashboard/manager"
          className="
            shrink-0
            transition
            hover:text-blue
            hover:underline
          "
        >
          Главная страница Админки
        </Link>

        <ChevronRight
          size={14}
          className="shrink-0"
        />

        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Программы
        </span>

      </nav>



      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Каталог программ
        </h1>

        <p className="mt-2 text-zinc-500">
          Редактирование содержимого образовательных программ.
        </p>

      </div>


      <div className="mb-8">

        <div className="relative max-w-2xl">

          <Search
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-400
            "
          />

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите название программы..."
            className="
              h-13
              w-full
              rounded-2xl
              border
              border-zinc-200
              bg-white
              pl-12
              pr-4
              text-base
              outline-none
              shadow-sm
              transition
              placeholder:text-zinc-400
              focus:border-zinc-300
              focus:shadow-md
            "
          />

        </div>

        <p className="mt-3 text-sm text-zinc-500">
          Найдено программ: {filtered.length}
        </p>

      </div>


      <div className="grid gap-5">

        {filtered.map((p) => (

          <Link
            key={p.id}
            href={`/dashboard/admin/programs/${p.slug}`}
            className="
              group
              rounded-3xl
              border
              border-zinc-200
              bg-white
              p-6
              shadow-sm
              transition
              hover:-translate-y-1
              hover:border-zinc-300
              hover:shadow-xl
            "
          >

            <div className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-center
              lg:justify-between
            ">

              <div className="min-w-0">

                <div className="flex items-start gap-4">

                  <div className="
                    flex
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-zinc-100
                    p-3
                    transition
                    group-hover:bg-black
                    group-hover:text-white
                  ">
                    <BookOpen size={22} />
                  </div>


                  <div className="min-w-0">

                    <h2 className="
                      break-words
                      text-2xl
                      font-bold
                      text-zinc-900
                    ">
                      {p.name}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-3">


                      <div className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-zinc-100
                        px-3
                        py-2
                        text-sm
                        text-zinc-700
                      ">

                        <Clock3 size={16} />

                        {p.time} академических{" "}
                        {getHourWord(p.time)}

                      </div>


                      <div className="
                        max-w-full
                        truncate
                        rounded-xl
                        bg-zinc-100
                        px-3
                        py-2
                        text-sm
                        text-zinc-500
                      ">

                        /{p.slug}

                      </div>

                    </div>

                  </div>

                </div>

              </div>



              <div className="
                flex
                shrink-0
                items-center
                gap-3
              ">

                <div className="
                  rounded-2xl
                  bg-zinc-100
                  p-3
                  transition
                  group-hover:bg-black
                  group-hover:text-white
                ">

                  <Pencil size={20} />

                </div>

                <ArrowRight
                  size={20}
                  className="
                    transition
                    group-hover:translate-x-1
                  "
                />

              </div>

            </div>

          </Link>

        ))}

      </div>




      {filtered.length === 0 && (

        <div className="
          rounded-3xl
          border
          border-dashed
          border-zinc-300
          bg-zinc-50
          py-20
          text-center
        ">

          <BookOpen
            size={42}
            className="mx-auto mb-4 text-zinc-400"
          />

          <h2 className="text-2xl font-semibold">
            Программы не найдены
          </h2>

          <p className="mt-3 text-zinc-500">
            Попробуйте изменить поисковый запрос.
          </p>

        </div>

      )}

    </section>
  )
}