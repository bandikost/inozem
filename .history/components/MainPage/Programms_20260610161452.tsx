import { getPrograms } from "@/lib/programm"
import { Clock9 } from "lucide-react"
import Link from "next/link"
import { getHourWord } from "../ui/GetHourWord"

export default async function Programms() {
  const programs = await getPrograms()
  const favoritePrograms = programs.filter(p => p.isFavorite)

  return (
    <section className="w-full mt-24 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
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
                         shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
            {program.bannerName && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100 absolute">
                    {program.bannerName}
                  </span>
                </div>
              )}

        
              <h3 className="text-lg font-semibold text-slate-900 pr-10 mt-6">
                {program.name.length > 60
                  ? program.name.slice(0, 60) + "..."
                  : program.name}
              </h3>

              {program.time >= 432 && (
                <p className="mt-1 text-sm text-slate-500">
                  Профессиональная переподготовка
                </p>
              )}

             <div className="mt-5 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="text-slate-400">Даты:</span> {program.dates}
                </p>

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
                <div className="flex items-center gap-1 text-slate-700 text-sm">
                  <Clock9 className="w-4 h-4 text-slate-500" />
                  <span>
                    {program.time} ч. {getHourWord(program.time)}
                  </span>
                </div>

                <Link
                  href={`/programs/${program.slug}`}
                  className="text-sm font-medium text-prpl hover:underline"
                >
                  Подробнее →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="max-w-6xl mx-auto mt-12 flex justify-center">
        <Link
          href="/programs"
          className="button-more hover:opacity-90 transition"
        >
          Все программы
        </Link>
      </div>
    </section>
  )
}