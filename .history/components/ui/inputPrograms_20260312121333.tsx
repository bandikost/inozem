'use client'

import { useState } from "react";

interface ProgramRow {
  id: number
  name: string
}

interface Props {
  programs: ProgramRow[]
}


export default function InputPrograms({ programs }: Props) {
    const [inputValue, setInputValue] = useState("")

    const finderProgram = programs.filter(p => p.name.toLowerCase().startsWith(inputValue.toLowerCase()))

    return (
        <>
        <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value) } className="border border-gray-300" />
        </div>
        {finderProgram.map(program => (
            <li key={program.id}>
                {program.name}
            </li>
        ))}
        </>
    )

}