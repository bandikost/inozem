import { notFound } from "next/navigation"
import { getDepartmentsBySlug } from "@/lib/departaments"
import LoadingLink from "@/components/Load/LoadingLink"

import {
  ChevronRight,
  Target,
  Compass,
  FlaskConical,
  BookOpen,
  Building2,
} from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const departament = await getDepartmentsBySlug(slug)

  if (!departament) {
    notFound()
  }

  const sections = [
    {
      title: "Цели",
      text: departament.goals,
      icon: Target,
    },
    {
      title: "Серии",
      text: departament.series,
      icon: BookOpen,
    },
    {
      title: "Направления деятельности",
      text: departament.directions,
      icon: Compass,
    },
    {
      title: "Научная деятельность",
      text: departament.scientific,
      icon: FlaskConical,
    },
    
    {
      title: "Клинические базы",
      text: departament.bases,
      icon: Building2,
    },
  ]

  return (
    <section className="min-h-screen">
      <div className="container mx-auto px-2 my-27">
            <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

                <LoadingLink href="/" className="shrink-0 transition hover:text-blue hover:underline">Главная</LoadingLink>
                <ChevronRight size={14} className="shrink-0" />
                <LoadingLink href="/departaments" className="shrink-0 transition hover:text-blue hover:underline">Кафедры</LoadingLink>
                <ChevronRight size={14} className="shrink-0" />

                <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                    {departament.name}
                </span>

            </nav>
       
        <header className="mb-12 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#533785] via-[#8D4C98] to-[#A75BB3] px-7 py-10 text-white sm:px-10 sm:py-14">
          <div className="max-w-4xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <BookOpen size={27} />
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {departament.name}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Информация о кафедре, направлениях деятельности,
              научной работе и клинических базах.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">

          {sections.map((section) => {
            const Icon = section.icon

            if (!section.text) return null

            return (
              <article
                key={section.title}
                className="
                  group
                  rounded-3xl
                  border border-zinc-200
                  bg-white
                  p-6
                  shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-[0_10px_35px_rgba(83,55,133,0.10)]
                  sm:p-8
                "
              >
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className="
                      flex h-12 w-12 shrink-0 items-center justify-center
                      rounded-2xl
                      bg-[#8D4C98]/10
                      text-[#8D4C98]
                      transition
                      group-hover:bg-[#8D4C98]
                      group-hover:text-white
                    "
                  >
                    <Icon size={22} />
                  </div>

                  <h2 className="text-xl font-bold text-zinc-900">
                    {section.title}
                  </h2>
                </div>

                <div
                  className="
                    prose
                    prose-zinc
                    max-w-none
                    text-[15px]
                    leading-7
                    [&_p]:mb-4
                    [&_p:last-child]:mb-0
                    [&_ul]:my-3
                    [&_ul]:list-none
                    [&_a]:text-[#8D4C98]
                    [&_a]:font-medium
                    [&_a]:transition-colors
                    [&_a]:hover:underline
                    [&_a]:hover:text-[#533785]
                    [&_ol]:my-3
                    [&_ol]:list-decimal
                    [&_ol]:pl-5
                    [&_li]:my-1
                    [&_strong]:font-semibold
                  "
                  dangerouslySetInnerHTML={{
                    __html: section.text,
                  }}
                />
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}