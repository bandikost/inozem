import { getPrograms } from "@/lib/programm"
import Link from "next/link"

export default async function Page() {
  const programs = await getPrograms()

  return (
    <section className="flex flex-col px-4 px-6 mt-27">

      <h1 className="text-3xl font-semibold text-zinc-800 mb-10">
        Программы обучения
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map(program => (
          <div key={program.id} className="border border-zinc-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-zinc-800">
              {program.name}
            </h3>

            {program.description && (
              <div className="text-sm text-zinc-600 mt-2" dangerouslySetInnerHTML={{ __html: program.description }} />
            )}

            <div className="flex items-center justify-between mt-6">
              {program.price && (
                <p className="font-medium text-zinc-800">
                  {program.price} ₽
                </p>
              )}

              <Link href={`/programs/${program.id}`} className="button-more">
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}