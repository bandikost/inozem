export const revalidate = 3600

import { getPrograms } from "@/lib/programm"
import { Clock9 } from "lucide-react"
import { getHourWord } from "../ui/GetHourWord"
import LoadingLink from "../Load/LoadingLink"

export default async function Programms() {
  const programs = await getPrograms()
  const favoritePrograms = programs.filter(p => p.isFavorite)

  return (
    <section className="w-full mt-24 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-2 px-2">
        <h2 className="text-2xl font-semibold text-prpl">
          Программы обучения
        </h2>
        <p className="text-slate-600 max-w-2xl">
          Программы под разные уровни образования и профессиональные направления
        </p>
      </div>

      {favoritePrograms.length === 0 ? (
        <p className="mt-10 text-center text-slate-500">
          Программы временно недоступны
        </p>
      ) : (
        <div className="max-w-6xl mx-auto mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {favoritePrograms.map((program) => (
            <div
              key={program.id}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6
                         shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
            

        
              <h3 className="text-lg font-semibold text-slate-900 pr-10">
                {program.name.length > 60
                  ? program.name.slice(0, 60) + "..."
                  : program.name}
              </h3>

              

              {program.time >= 432 && (
                <p className="mt-1 text-sm text-slate-500">
                  Профессиональная переподготовка
                </p>
              )}

              {program.bannerName && (
                <span className="relative text-sm px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100 top-3 max-w-40 text-center">
                    {program.bannerName}
                </span>
              )}

             <div className="mt-5 space-y-2 text-lg text-slate-600">

                <p>
                  <span className="text-slate-400">Образование:</span>{" "}
                  {program.education}
                </p>

                <p>
                  <span className="text-slate-400">Направление:</span>{" "}
                  {program.specialization.length > 50
                    ? program.specialization.slice(0, 50) + "..."
                    : program.specialization}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1 text-slate-700 text-lg">
                  <Clock9 className="w-4 h-4 text-slate-500" />
                  <span>
                    {program.time} ч. {getHourWord(program.time)}
                  </span>
                </div>

                <LoadingLink
                  href={`/programs/${program.slug}`}
                  className="text-lg font-medium text-prpl hover:underline"
                >
                  Подробнее →
                </LoadingLink>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="max-w-6xl mx-auto mt-12 flex justify-center">
        <LoadingLink
          href="/programs"
          className="button-more hover:opacity-90 transition"
        >
          Все программы
        </LoadingLink>
      </div>
    </section>
  )
}