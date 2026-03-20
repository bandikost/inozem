import { getPrograms } from "@/lib/programm"
import { Clock9 } from "lucide-react"
import Link from "next/link";
import { getHourWord } from "../ui/GetHourWord";


export default async function Programms() {
    const programs = await getPrograms()

    const favoritePrograms = programs.filter(p => p.isFavorite)

    return (
        <section className="w-full flex flex-col gap-4 mt-20 px-4">
            <div className="flex flex-col items-center justify-center tablet:items-start">
                <h2 className="text-prpl">Программы обучения</h2>
                <p className="mt-2 text-center">Какая то информация защпшсгшподпкылжад asdasdasd</p>
            </div> 
        
            <div className="flex flex-col items-center justify-center">
                
                {favoritePrograms.length === 0 ? (
                    <p className="p-4 text-center text-zinc-500">Программы временно недоступны</p>
                ) : (
                    <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mt-8">
                        {favoritePrograms.map((p) => (
                            <div key={p.id} className="flex flex-col justify-between gap-8 p-4 rounded-lg shadow-md border border-gray-300 bg-card">
                                    <h3 className="md:text-left text-center ">{p.name.length > 58 ? p.name.slice(0, 58) + "..." : p.name}</h3>
                                <div className="grid gap-1">
                                    <p className=""><strong className="text-blue">Даты:</strong> {p.dates}</p>
                                    <p className=""><strong className="text-blue">Образование:</strong> {p.education}</p>
                                    <p className=""><strong className="text-blue">Направления:</strong> {p.specialization}</p>
                                </div>

                                <div className="grid grid-cols-2 items-center">
                                    <p className="flex mt-2 items-center"><Clock9 className="w-4 h-4 mr-1 -mt-0.5" />{p.time.length > 3 ? `> ${p.time.slice(0, 2)}` : p.time} академ. {getHourWord(Number(p.time))}</p>
                                    <Link href={`/programs/${p.id}`} className="button-more">
                                        Подробнее
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Link href={"/programs"} className="!text-lg  mt-4 hover:opacity-80 hover:underline">Перейти в общий раздел обучения</Link>
            </div>
            
        </section>
    )
}