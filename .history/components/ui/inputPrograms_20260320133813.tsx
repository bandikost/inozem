'use client'

import { Clock9 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getHourWord } from "./GetHourWord";
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties";


export default function InputPrograms({ programs }: { programs: any[] }) {
    const [inputValue, setInputValue] = useState("")
    const [findTotal, setFindTotal] = useState(programs)
    const [visibleItems, setVisibleItems] = useState(12)
    const [education, setEducation] = useState("")
    const [specialization, setSpecialization] = useState("")

    const handleShowMore = () => setVisibleItems(prev => prev + 12)
    const handleFindProgramm = () => setFindTotal(programs.filter(p => p.name.toLowerCase().startsWith(inputValue.toLowerCase())))

    const handleFindByEducation = (value: string) => { 
        setEducation(value)

    if (!value) {
        setFindTotal(programs)
        return
    }

    setFindTotal(programs.filter(p => p.education?.toLowerCase() === value.toLowerCase()))
}

useEffect(() => {
    let filtered = programs

    if (inputValue) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(inputValue.toLowerCase())
        )
    }

    if (education) {
        filtered = filtered.filter(p =>
            p.education?.toLowerCase() === education.toLowerCase()
        )
    }

    if (specialization) {
        filtered = filtered.filter(p =>
            p.specialization?.toLowerCase().includes(specialization.toLowerCase())
        )
    }

    setFindTotal(filtered)
}, [inputValue, education, specialization, programs])

    
    return (
    <section>
    <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
            
        <div className="flex flex-col tablet:flex-row justify-between gap-4 items-start">
            <div className="flex flex-col items-center tablet:items-start gap-3">
                <h3 className="text-prpl mb-4 !font-normal text-center">Поиск программы по названию</h3>
                <div className="flex flex-col items-center gap-3 ">
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value) } className="border border-gray-300 rounded p-2 w-[260px] xs:w-[300px]" placeholder="Введите название..." />
                    <button className="button-more w-full" onClick={() => handleFindProgramm()}>Найти программу</button>
                </div>
            </div>

            <div className="flex flex-col items-center tablet:items-end gap-3 mt-10 tablet:mt-0">
                <h3 className="text-prpl mb-4 !font-normal text-center">Поиск программы по образованию</h3>
                <div className="flex items-center gap-3">
                    <select value={education} onChange={(e) => handleFindByEducation(e.target.value)} name="education_level"  
                        className="border border-zinc-400 p-2 rounded text-zinc-700 w-[260px] xs:w-[300px]">
                        <option value="">-- выберите образование --</option>
                        <option value="Среднее">Среднее</option>
                        <option value="Высшее">Высшее</option>
                        <option value="без образования">Без мед.образования</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col items-center tablet:items-end gap-3 mt-10 tablet:mt-0">
                <h3 className="text-prpl mb-4 !font-normal text-center">Поиск программы по направлению</h3>
                <div className="flex items-center gap-3">
                     {education !== "без образования" && (
                        <select name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required={education !== "без образования"}
                            className="border border-zinc-400 p-2 max-w-[250px] rounded text-zinc-700">

                            <option value="">-- выберите специальность --</option>
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

        {findTotal.length === 0 ? (
                <p className="mt-10 text-zinc-700 !text-lg flex items-center justify-center">
                    Программ не найдено.
                </p> 
         ) : ( <h2 className="mt-12 text-prpl text-center">Все программы</h2> )}

        
        <div className="flex flex-col items-center mb-20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
                
            
                {findTotal.slice(0, visibleItems).map(program => (
                    <div key={program.id} className="flex flex-col justify-between border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition bg-card">
                    <h3 className="text-lg !font-semibold text-prpl mb-4">
                    {program.name.length > 58 ? program.name.slice(0, 58) + "..." : program.name}
                    </h3>
                    
                    <div className="grid gap-1">
                        <p className=""><strong className="text-blue">Даты:</strong> {program.dates}</p>
                        <p className=""><strong className="text-blue">Образование:</strong> {program.education}</p>
                        <p className=""><strong className="text-blue">Направления:</strong> {program.specialization}</p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div className="flex flex-col"> 
                            {program.time && (
                                <p className="font-medium text-zinc-800 flex items-center">
                                <Clock9 className="w-4 h-4 mr-1 mt-0.1" />{program.time} академ. {getHourWord(Number(program.time))}
                                </p>
                            )}
                           
                        </div>

                    <Link href={`/programs/${program.id}`} className="button-more ">Подробнее</Link>
                    </div>
                    </div>
                ))}

            </div>

            {visibleItems < findTotal.length && (
                <button className="button-more mt-6" onClick={handleShowMore}>
                    Показать ещё
                </button>
            )}
        </div>

    </section>
    )

}