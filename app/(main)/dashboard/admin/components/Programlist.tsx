"use client"

import { getHourWord } from "@/components/ui/GetHourWord"
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Pencil,
  Search,
  ArrowDownAZ,
  Clock,
  CalendarDays,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

interface Program {
  id: number
  name: string
  time: number
  slug: string
  created_at: string
}

interface Props {
  program: Program[]
}

type SortType = "alphabet" | "hours" | "date"

export default function ProgramList({ program }: Props) {
  const [value, setValue] = useState("")
  const [sort, setSort] = useState<SortType>("date")

  const filtered = useMemo(() => {
    const search = value.trim().toLowerCase()

    const result = program.filter((p) =>
      p.name.toLowerCase().startsWith(search)
    )

    return [...result].sort((a, b) => {
      switch (sort) {
        case "alphabet": return a.name.localeCompare(b.name, "ru", { sensitivity: "base" })
        case "hours": return b.time - a.time
        case "date": default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })
  }, [program, value, sort])

  const sortOptions = [
    {
      value: "alphabet" as const,
      label: "Алфавит",
      icon: ArrowDownAZ,
    },
    {
      value: "hours" as const,
      label: "Часы",
      icon: Clock,
    },
    {
      value: "date" as const,
      label: "Дата",
      icon: CalendarDays,
    },
  ]

  return (
    <section className="mt-10 pb-16">
      <div className="mb-8">

        <div className="relative">

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

        <div className="
          mt-4
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">

          <p className="text-sm text-zinc-500">
            Найдено программ:{" "}
            <span className="font-semibold text-zinc-800">
              {filtered.length}
            </span>
          </p>


          <div className="
            flex
            w-full
            rounded-2xl
            border
            border-zinc-200
            bg-zinc-100
            p-1
            sm:w-auto
          ">

            {sortOptions.map((option) => {
              const Icon = option.icon
              const active = sort === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSort(option.value)}
                  className={`
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    transition
                    sm:flex-none
                    cursor-pointer
                    ${
                      active
                        ? "bg-white text-zinc-900 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-800"
                    }
                  `}
                >
                  <Icon size={16} />
                  {option.label}
                </button>
              )
            })}

          </div>

        </div>

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
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-zinc-100
                        px-3
                        py-2
                        text-sm
                        text-zinc-500
                      ">
                        <CalendarDays size={15} />

                        {new Date(p.created_at).toLocaleDateString(
                          "ru-RU"
                        )}
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
                hidden
                shrink-0
                items-center
                gap-3
                lg:flex
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