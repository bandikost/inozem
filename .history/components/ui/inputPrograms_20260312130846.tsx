'use client'

import { Clock9 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


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

export default function InputPrograms({ programs }: { programs: any[] }) {
    const [inputValue, setInputValue] = useState("")
    const [findTotal, setFindTotal] = useState(programs)

    const handleFindProgramm = () => {
        setFindTotal(programs.filter(p => p.name.toLowerCase().startsWith(inputValue.toLowerCase())))
    } 

    
    return (
        <>
        <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
            
        <div className="grid grid-cols-2 gap-4 items-center">
            <div className="flex flex-col items-start gap-3">
                <h3 className="text-prpl mb-4 !font-normal">Поиск программы по названию</h3>
                <div className="flex items-center gap-3">
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value) } className="border border-gray-300 rounded p-2" placeholder="Введите название..." />
                    <button className="button-more" onClick={() => handleFindProgramm()}>Найти программу</button>
                </div>
            </div>
            <div className="flex flex-col items-start gap-3">
                <h3 className="text-prpl mb-4 !font-normal">Поиск программы по названию</h3>
                <div className="flex items-center gap-3">
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value) } className="border border-gray-300 rounded p-2" placeholder="Введите название..." />
                <button className="button-more" onClick={() => handleFindProgramm()}>Найти программу</button>
                </div>
            </div>
            </div>
        </div>

        {findTotal.length === 0 && (
                <p className="mt-10 text-zinc-700 !text-lg flex items-center justify-center">
                    Программ не найдено.
                </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
       
           
        {findTotal.map(program => (
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

              <Link href={`/programs/${program.id}`} className="button-more ">Подробнее</Link>
            </div>
          </div>
        ))}
           </div>
        </>
    )

}