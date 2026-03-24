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
                <p className="mt-2 text-center">Проводим программы, подходящие вашему уровню образования и специализации.</p>
            </div> 
        
            <div className="flex flex-col items-center justify-center">
                
                {favoritePrograms.length === 0 ? (
                    <p className="p-4 text-center text-zinc-500">Программы временно недоступны</p>
                ) : (
                    <div>
                        <h2 className="mt-10 text-center text-prpl">Самые популярные 🔥</h2>
                        
                    <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mt-8">
                        
                        {favoritePrograms.map((program) => (
                            <div key={program.id} className="flex flex-col justify-between gap-8 p-4 rounded-lg shadow-md border border-gray-300 bg-card">
                                    <h3 className="md:text-left text-center !font-semibold text-prpl">{program.name.length > 58 ? program.name.slice(0, 58) + "..." : program.name}</h3>
                                <div className="grid gap-1">
                                    <p className=""><strong className="text-blue">Даты:</strong> {program.dates}</p>
                                    <p className=""><strong className="text-blue">Образование:</strong> {program.education}</p>
                                    <p className=""><strong className="text-blue">Направления:</strong> {program.specialization}</p>
                                </div>

                            <div className="flex items-center justify-between mt-6">
                                <div className="flex flex-col"> 
                                    {program.time && (
                                        <p className="font-medium text-zinc-800 flex items-center">
                                        <Clock9 className="w-4 h-4 mr-1 mt-0.1" />{program.time.length > 3 ? `от ${program.time.slice(0, 2)}` : program.time} академ. {getHourWord(Number(program.time))}
                                        </p>
                                    )}
                                </div>
                                <Link href={`/programs/${program.slug}`} className="button-more ">Подробнее</Link>
                                
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                )}
                <Link href={"/programs"} className="!text-lg !text-white bg-blue py-1.5 px-3 cursor-pointer rounded-md mt-8 hover:opacity-80 hover:underline">Перейти в общий раздел обучения</Link>

            </div>
            
        </section>
    )
}