'use client'

import { Clock9 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getHourWord } from "./GetHourWord";


export default function InputPrograms({ programs }: { programs: any[] }) {
    const [inputValue, setInputValue] = useState("")
    const [findTotal, setFindTotal] = useState(programs)
    const [visibleItems, setVisibleItems] = useState(12)

    const handleShowMore = () => {
        setVisibleItems(prev => prev + 12)
    }

    const handleFindProgramm = () => {
        setFindTotal(programs.filter(p => p.name.toLowerCase().startsWith(inputValue.toLowerCase())))
    } 

    
    return (
        <section >
    <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition w-full">
            
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 items-center">
            <div className="flex flex-col items-center tablet:items-start gap-3">
                <h3 className="text-prpl mb-4 !font-normal text-center">Поиск программы по названию</h3>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value) } className="border border-gray-300 rounded p-2 w-full" placeholder="Введите название..." />
                    <button className="button-more" onClick={() => handleFindProgramm()}>Найти программу</button>
                </div>
            </div>

            <div className="flex flex-col items-center tablet:items-end gap-3 mt-10 tablet:mt-0">
                <h3 className="text-prpl mb-4 !font-normal text-center">Поиск программы по образованию</h3>
                <div className="flex items-center gap-3">
                    <button className="button-more" onClick={() => handleFindProgramm()}>Найти программу</button>
                    <button className="button-more" onClick={() => handleFindProgramm()}>Найти программу</button>
                </div>
            </div>
        </div>

    </div>

        {findTotal.length === 0 ? (
                <p className="mt-10 text-zinc-700 !text-lg flex items-center justify-center">
                    Программ не найдено.
                </p>
        ) : (
            <h2 className="mt-12 text-prpl text-center">Все программы</h2>
        )}

        
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
                        {program.price && <p>{program.price} ₽</p>}
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