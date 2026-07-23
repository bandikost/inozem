"use client"

import { getHourWord } from "@/components/ui/GetHourWord"
import {
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
    <section className="min-h-screen bg-zinc-50/40 px-4 pb-24 pt-28 sm:px-6">
      <div className="mx-auto max-w-6xl">

        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
          <Link
            href="/dashboard/admin"
            className="transition hover:text-prpl"
          >
            Админка
          </Link>

          <ChevronRight size={15} />

          <span className="text-zinc-800">
            Программы
          </span>
        </nav>


        <div className="mb-8 flex items-start gap-4">
          <div className="
            flex h-12 w-12 shrink-0
            items-center justify-center
            rounded-2xl
            bg-prpl/10
            text-prpl
          ">
            <BookOpen size={23} />
          </div>

          <div>
            <h1 className="text-3xl font-medium tracking-tight text-prpl">
              Каталог программ
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Управление содержанием образовательных программ
            </p>
          </div>
        </div>

 
        <div className="
          mb-8
          rounded-2xl
          border border-zinc-200
          bg-white
          p-4
          shadow-sm
        ">
          <div className="relative">
            <Search
              size={18}
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
                h-12
                w-full
                rounded-xl
                border border-zinc-200
                bg-zinc-50/60
                pl-11
                pr-4
                text-sm
                outline-none
                transition
                placeholder:text-zinc-400
                focus:border-prpl/50
                focus:bg-white
                focus:ring-4
                focus:ring-prpl/10
              "
            />
          </div>

          <p className="mt-3 text-xs text-zinc-400">
            Найдено программ: {filtered.length}
          </p>
        </div>

   
        <div className="
          overflow-hidden
          rounded-2xl
          border border-zinc-200
          bg-white
          shadow-sm
        ">

       
          <div className="
            hidden
            grid-cols-[1fr_220px_150px]
            gap-6
            border-b
            border-zinc-100
            bg-zinc-50/60
            px-6
            py-4
            text-xs
            font-medium
            uppercase
            tracking-wide
            text-zinc-400
            md:grid
          ">
            <span>Программа</span>
            <span>Продолжительность</span>
            <span className="text-right">Действие</span>
          </div>

     
          <div>
            {filtered.length > 0 ? (
              filtered.map((p, index) => (
                <div
                  key={p.id}
                  className={`
                    flex
                    flex-col
                    gap-4
                    px-5
                    py-5
                    transition
                    hover:bg-zinc-50/70
                    md:grid
                    md:grid-cols-[1fr_220px_150px]
                    md:items-center
                    md:gap-6
                    md:px-6
                    ${
                      index !== filtered.length - 1
                        ? "border-b border-zinc-100"
                        : ""
                    }
                  `}
                >

           
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-prpl/8
                      text-prpl
                    ">
                      <BookOpen size={17} />
                    </div>

                    <p className="
                      min-w-0
                      truncate
                      text-base
                      font-medium
                      text-zinc-800
                    ">
                      {p.name}
                    </p>
                  </div>

               
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Clock3
                      size={16}
                      className="text-zinc-400"
                    />

                    <span>
                      {p.time} академических{" "}
                      {getHourWord(p.time)}
                    </span>
                  </div>

                  
                  <Link
                    href={`/dashboard/admin/programs/${p.slug}`}
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-zinc-200
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-zinc-700
                      transition
                      hover:border-prpl/30
                      hover:bg-prpl/5
                      hover:text-prpl
                    "
                  >
                    <Pencil size={15} />
                    Редактировать
                  </Link>

                </div>
              ))
            ) : (
              <div className="px-6 py-16 text-center">
                <BookOpen
                  size={34}
                  className="mx-auto mb-3 text-zinc-300"
                />

                <p className="text-sm text-zinc-500">
                  Программы не найдены
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}