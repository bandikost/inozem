'use client'

import { Clock9 } from "lucide-react";
import { useMemo, useState } from "react";
import { getHourWord } from "../GetHourWord";
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties";
import { ProgramRow } from "@/lib/programm";
import Link from "next/link";


export default function InputPrograms({ programs }: { programs: ProgramRow[] }) {
    const [inputValue, setInputValue] = useState("")
    const [visibleItems, setVisibleItems] = useState(12)
    const [education, setEducation] = useState("")
    const [specialization, setSpecialization] = useState("")

    const handleShowMore = () => setVisibleItems(prev => prev + 12)

    const filteredPrograms = useMemo(() => {
    let filtered = programs

    if (inputValue) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
    }

    if (education) {
        filtered = filtered.filter(p =>
            p.education?.toLowerCase() === education.toLowerCase()
        )
    }

    if (specialization) {
        filtered = filtered.filter(p =>
            p.specialization?.toLowerCase().startsWith(specialization.toLowerCase())
        )
    }

    return filtered
}, [inputValue, education, specialization, programs])

    
    return (
    <section className="flex flex-col items-center computer:items-stretch justify-center">
    <div className="mt-10 border border-gray-300 rounded-xl p-3 tablet:p-6 bg-white shadow-xl transition ">
            
        <div className="flex flex-col computer:flex-row justify-between gap-4 items-center mt-2">
            <div className="flex flex-col items-start gap-3 -ml-7 computer:ml-0">
                <h3 className="text-prpl mb-4 !font-normal text-center">Поиск программы по названию</h3>
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value) } className="border border-zinc-400 rounded p-2 w-[240px] xs:w-[300px] !text-default !text-lg" placeholder="Введите название..." />
            </div>

            <div className="flex flex-col items-start  gap-3 mt-10 tablet:mt-0">
                <h3 className="text-prpl mb-4 !font-normal text-center">Поиск программы по образованию</h3>
                <div className="flex items-start gap-3">
                    <select value={education} onChange={(e) => setEducation(e.target.value)} name="education_level"  
                        className="border border-zinc-400 p-2 rounded text-zinc-700 w-[240px] xs:w-[300px] !text-default !text-lg">
                        <option value="">Выберите образование </option>
                        <option value="Среднее">Среднее</option>
                        <option value="Высшее">Высшее</option>
                        <option value="без образования">Без мед.образования</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col items-start gap-3 mt-10 tablet:mt-0">
                <h3 className="text-prpl mb-4 !font-normal text-center">Поиск программы по направлению</h3>
                <div className="flex items-start gap-3 !text-default !text-lg">
                     {education !== "без образования" && (
                        <select name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required={education !== "без образования"}
                            className="border border-zinc-400 p-2 w-[240px] xs:w-[300px] rounded text-zinc-700">

                            <option value="">Выберите специальность </option>
                                {(education === "Высшее" ? HIGHER_SPECIALTIES : SECONDARY_SPECIALTIES).map((spec) => (
                                    <option key={spec} value={spec}>
                                            {spec}
                                    </option>
                                ))}
                        </select>
                    )}
                </div>
            </div>
        </div>

    </div>

        {filteredPrograms.length === 0 && <p className="mt-10 text-zinc-700 !text-lg flex items-center justify-center"> Программ не найдено.</p>}

        
        <div className="flex flex-col items-center mb-20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
                
            
                {filteredPrograms.slice(0, visibleItems).map(program => (
                    <div key={program.id} className="flex flex-col justify-between border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition bg-card relative">
                    <h3 className="md:text-left text-center !font-semibold text-prpl !text-xl">
                    {program.name.length > 58 ? program.name.slice(0, 58) + "..." : program.name}
                    </h3>
                    
                    {program.bannerName && ( 
                                    <div className="relative bg-red-500 text-white text-center p-1 w-2/4 sm:w-1/3 rounded-r -left-7 my-6">
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
                        <p className=""><strong className="text-blue">Даты:</strong> {program.dates.length > 30 ? program.dates.slice(0, 23) + ` и...` : program.dates}</p>
                        <p className=""><strong className="text-blue">Образование:</strong> {program.education}</p>
                        <p className=""><strong className="text-blue">Направления:</strong> {program.specialization}</p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div className="flex flex-col"> 
                            {program.time && (
                                <p className="!font-normal text-zinc-800 flex items-center !text-base">
                                <Clock9 className="w-4 h-4 mr-1 mt-0.1" />{program.time.length > 3 ? `от ${program.time.slice(0, 2)}` : program.time} академ. {getHourWord(Number(program.time))}
                                </p>
                            )}
                           
                        </div>

                    <Link href={`/programs/${program.slug}`} className="button-more ">Подробнее</Link>
                    </div>
                    </div>
                ))}

            </div>

            {visibleItems < filteredPrograms.length && (
                <button className="button-more mt-6" onClick={handleShowMore}>
                    Показать ещё
                </button>
            )}
        </div>

    </section>
    )

}