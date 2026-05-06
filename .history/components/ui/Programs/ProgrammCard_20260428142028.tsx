
import { Clock9 } from "lucide-react";
import Link from "next/link";
import { getHourWord } from "../GetHourWord";
import { ProgramRow } from "@/lib/programm";
import React from "react";

type ProgrammCardProps = {
  filteredPrograms: ProgramRow[];
  visibleItems: number;
  handleShowMore: () => void;
};

function ProgrammCard({filteredPrograms, visibleItems, handleShowMore}: ProgrammCardProps) {

    return (
         <div className="flex flex-col gap-8">
                
            
                {filteredPrograms.slice(0, visibleItems).map(program => (
                    <div key={program.id} className="w-full max-w-[750px] flex flex-col justify-between border border-zinc-200 rounded-xl px-5 py-6 bg-white shadow-xl transition bg-card relative">
                    <h2 className="text-center !font-semibold custom-text">
                    {program.name.length > 58 ? program.name.slice(0, 58) + "..." : program.name}
                    </h2>
                    
                    {program.bannerName && ( 
                                    <div className="relative bg-red-500 text-white text-center p-1 w-2/4 sm:w-1/3 rounded-r -left-7 my-6">
                                    <p className="!text-lg">{program.bannerName}</p>
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
                    <div className="grid gap-1 mt-4">
                        <p className="!text-lg"><strong className="text-blue">Даты:</strong> {program.dates.length > 30 ? program.dates.slice(0, 23) + ` и...` : program.dates}</p>
                        <p className="!text-lg"><strong className="text-blue">Образование:</strong> {program.education}</p>
                        >
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 mt-6">
                        <div className="flex"> 
                            {program.time && (
                                <p className="!font-normal text-zinc-800 flex items-center !text-lg">
                                <Clock9 className="w-4 h-4 mr-1 mt-0.1" />{program.time.length > 3 ? `от ${program.time.slice(0, 2)}` : program.time} академ. {getHourWord(Number(program.time))}
                                </p>
                            )}
                           
                        </div>

                        <div className="flex"> 
                                <p className="!font-normal text-zinc-800 flex items-center !text-lg">
                                Цена: {program.price.length >= 6 ? `от ${program.price.slice(0, 5)}` : program.price} ₽
                                </p>
                        </div>

                    <Link href={`/programs/${program.slug}`} className="button-more ">Подробнее</Link>
                    </div>
                    </div>
                ))}
{visibleItems < filteredPrograms.length && (
                <button className="button-more mt-6" onClick={handleShowMore}>
                    Показать ещё
                </button>
            )}
            </div>
    )
}

export default React.memo(ProgrammCard)