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
                        
                    <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mt-8">
                        
                        {favoritePrograms.map((program) => (
                            <div key={program.id} className="flex flex-col justify-between gap-8 p-4 rounded-lg shadow-md border border-gray-300 bg-card relative">
                                <h3 className="md:text-left text-center !font-semibold custom-text">{program.name.length > 58 ? program.name.slice(0, 58) + "..." : program.name}</h3>
                                
                               
                        {program.bannerName && ( 
                                    <div className="relative bg-red-500 text-white text-center p-1 w-2/4 sm:w-1/3 rounded-r -left-6">
                                    <p className="!text-sm">{program.bannerName}</p>
                                        <span className="absolute left-[-6px] top-[0px] w-0 h-0 
                                            border-t-[0px] border-t-transparent 
                                            border-b-[20px] border-b-transparent 
                                            border-r-[10px] border-r-red-500">
                                        </span>
                                        <span className="absolute left-[-6px] bottom-[0px] w-0 h-0 
                                            border-t-[20px] border-t-transparent 
                                            border-b-[0px] border-b-transparent 
                                            border-r-[10px] border-r-red-500">
                                        </span>
                                    </div>
                                )}
                                    

                            <div className="grid gap-1">
                                <p className=""><strong className="text-blue">Даты:</strong> {program.dates}</p>
                                <p className=""><strong className="text-blue">Образование:</strong> {program.education}</p>
                                <p className=""><strong className="text-blue">Направления:</strong> {program.specialization.length > 40 ? program.specialization.slice(0, 40) + "..." : program.specialization}</p>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <div className="flex flex-col"> 
                                    {program.time && (
                                        <p className="!font-normal text-zinc-800 flex items-center !text-base">
                                        <Clock9 className="w-4 h-4 mr-1 mt-0.1" />{program.time}{program.time_secondary ? `, ${program.time_secondary}` : "" }  академ. {getHourWord(Number(program.time))}
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