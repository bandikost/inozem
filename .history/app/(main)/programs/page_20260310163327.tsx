import { getPrograms } from "@/lib/programm"

export default async function Page() {
  const programs = await getPrograms()

  return (
    <section className="flex flex-col px-4 px-6 mt-27">

      <h1 className="text-3xl font-semibold text-zinc-800 mb-10">
        Программы обучения
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map(program => (
          <div
            key={program.id}
            className="border border-zinc-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-zinc-800">
              {program.name}
            </h3>

            {program.description && (
              <p className="text-sm text-zinc-600 mt-2">
                {program.description}
              </p>
            )}

            <div className="flex items-center justify-between mt-6">
              {program.price && (
                <p className="font-medium text-zinc-800">
                  {program.price} ₽
                </p>
              )}

              <button className="px-4 py-2 text-sm bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition">
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}