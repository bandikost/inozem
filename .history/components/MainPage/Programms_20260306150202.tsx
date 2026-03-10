import { getPrograms } from "@/lib/programm"
import { Clock9 } from "lucide-react"
import Link from "next/link";

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

export default async function Programms() {
    const programs = await getPrograms()

    

    return (
        <section className="w-full flex flex-col  gap-4 mt-20"> 
            <div className="flex flex-col items-center tablet:items-start px-4">
                <h2 className="text-prpl">Программы обучения</h2>
                <p className="mt-2 text-center">Какая то информация защпшсгшподпкылжад asdasdasd</p>
                {programs.length === 0 ? (
                    <p className="p-4 text-center text-zinc-500">Программы временно недоступны</p>
                ) : (
                    <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mt-8">
                        {programs.map((p) => (
                            <div key={p.id} className="flex flex-col justify-between gap-8 bg-white p-4 rounded-lg shadow-md border border-gray-300">
                                    <h3 className="md:text-left text-center ">{p.name.length > 58 ? p.name.slice(0, 58) + "..." : p.name}</h3>
                                <div className="grid gap-1">
                                    <p className=""><strong className="text-blue">Даты:</strong> {p.dates}</p>
                                    <p className=""><strong className="text-blue">Образование:</strong> {p.education}</p>
                                    <p className=""><strong className="text-blue">Направления:</strong> {p.specialization}</p>
                                </div>

                                <div className="grid grid-cols-2 items-center">
                                    <p className="flex mt-2"><Clock9 className="w-4 h-4 mr-1" />{p.time} академ. {getHourWord(Number(p.time))}</p>
                                    <button className="button-more">
                                        Подробнее
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Link href={"/learning"} className="flex items-center justify-center mt-4">Перейти в общий раздел обучения</Link>
        </section>
    )
}