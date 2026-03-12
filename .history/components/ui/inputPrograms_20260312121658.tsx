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

export default function InputPrograms({ programs }: { programs: any }) {
    const [inputValue, setInputValue] = useState("")

    const finderProgram = programs.filter(p => p.name.toLowerCase().startsWith(inputValue.toLowerCase()))

    return (
        <>
        <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value) } className="border border-gray-300" />
        </div>
        {finderProgram.map(program => (
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
        </>
    )

}