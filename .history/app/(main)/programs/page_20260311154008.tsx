import { ToggleBlock } from "@/components/ui/ToggleBlock";
import { getPrograms } from "@/lib/programm"
import { Clock9 } from "lucide-react";
import Link from "next/link"

function getHourWord(value: number): string {
  const lastTwo = value % 100;
  const last = value % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return "часов";
  }

  if (last === 1) {
    return "час";
  }

  if (last >= 2 && last <= 4) {
    return "часа";
  }

  return "часов";
}

export default async function Page() {
  const programs = await getPrograms()

  return (
    <section className="flex flex-col px-4 px-6 mt-27">

      <h1 className="text-3xl font-semibold text-prpl mb-10 text-center">
        Программы обучения
      </h1>
      <div className="grid grid-cols-3 gap-2 my-10">
          <ToggleBlock title="Инструкция создания профиля" classText="!text-xl font-bold">
        <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
          <Link href={"/"} className="hover:underline">Просмотреть файл</Link> 
        </div>
        
      </ToggleBlock>
      <ToggleBlock title="Формы, анкеты, заявления">
        <div className=" border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
          <Link href={"/"} className="hover:underline">Просмотреть файл</Link> 
        </div>
        
      </ToggleBlock>
      <ToggleBlock title="Программы и прейскурант">
        <div className=" border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
          <Link href={"/"} className="hover:underline">Просмотреть файл</Link> 
        </div>
        
      </ToggleBlock>
      </div>
        


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map(program => (
          <div key={program.id} className="flex flex-col justify-between border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
            <h3 className="text-lg font-semibold text-zinc-800">
              {program.name}
            </h3>

            {program.description && (
              <div className="text-sm !font-medium text-zinc-600 mt-2" dangerouslySetInnerHTML={{ __html: program.description.slice(0, 100) + "..." }} />
            )}

            <div className="flex items-center justify-between mt-6">
              {program.time && (
                <p className="font-medium text-zinc-800 flex items-center">
                  <Clock9 className="w-4 h-4 mr-1 mt-0.1" />{program.time} академ. {getHourWord(Number(program.time))}
                </p>
              )}

              <Link href={`/programs/${program.id}`} className="button-more">Подробнее</Link>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}