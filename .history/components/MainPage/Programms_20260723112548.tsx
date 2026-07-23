export const revalidate = 3600;

import { getPrograms } from "@/lib/programm";
import {
  Clock3,
  GraduationCap,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { getHourWord } from "../ui/GetHourWord";
import LoadingLink from "../Load/LoadingLink";

export default async function Programms() {
  const programs = await getPrograms();
  const favoritePrograms = programs.filter((p) => p.isFavorite);

  return (
    <section className="w-full mt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h4 className="text-3xl font-semibold text-blue">
            Программы обучения
          </h4>

          <p className="mt-2 text-zinc-600 max-w-2xl">
            Программы под разные уровни образования и профессиональные
            направления
          </p>
        </div>

        {favoritePrograms.length === 0 ? (
          <p className="text-center text-zinc-500">
            Программы временно недоступны
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {favoritePrograms.map((program) => (
              <article
                key={program.id}
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-zinc-200
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  overflow-hidden
                  flex
                  flex-col
                "
              >
                <div className="p-6 flex flex-col flex-1">

                  <div>
                    <h3 className="text-xl font-semibold leading-snug text-zinc-900">
                      {program.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-4">

                      {program.time >= 432 && (
                        <span className="rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-sm">
                          Профессиональная переподготовка
                        </span>
                      )}

                      {program.bannerName && (
                        <span className="rounded-full bg-red-500 text-white px-3 py-1 text-sm">
                          {program.bannerName}
                        </span>
                      )}

                    </div>
                  </div>

                  <div className="grid gap-3 mt-6">

                    <div className="rounded-xl border border-zinc-200 bg-gray-50 p-4">
                      <div className="flex items-center gap-2 text-blue mb-2">
                        <GraduationCap size={18} />
                        <span className="text-sm">
                          Образование
                        </span>
                      </div>

                      <p className="text-zinc-700">
                        {program.education}
                      </p>
                    </div>

                    <div className="rounded-xl border border-zinc-200 bg-gray-50 p-4">
                      <div className="flex items-center gap-2 text-blue mb-2">
                        <Stethoscope size={18} />
                        <span className="text-sm">
                          Направление
                        </span>
                      </div>

                      <p className="text-zinc-700 line-clamp-2">
                        {program.specialization}
                      </p>
                    </div>

                  </div>

                  <div className="mt-auto pt-6 border-zinc-200 flex items-center justify-between">

                    <div className="flex items-center gap-2">
                      <Clock3
                        size={18}
                        className="text-blue"
                      />

                      <span className="text-zinc-700">
                        {program.time} акад.{" "}
                        {getHourWord(program.time)}
                      </span>
                    </div>

                    <LoadingLink
                      href={`/programs/${program.slug}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue
                        px-5
                        py-3
                        !text-white
                        hover:opacity-90
                        transition
                      "
                    >
                      Подробнее
                      <ArrowRight size={18} />
                    </LoadingLink>

                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
  <LoadingLink
    href="/programs"
    className="
      group
      inline-flex
      items-center
      gap-2
      rounded-2xl
      border
      border-blue
      px-6
      py-3
      text-blue
      transition-all
      duration-200
      hover:bg-blue
      hover:text-white
    "
  >
    Все программы образования

    <ArrowRight
      size={18}
      className="transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
    />
  </LoadingLink>
</div>
      </div>
    </section>
  );
}