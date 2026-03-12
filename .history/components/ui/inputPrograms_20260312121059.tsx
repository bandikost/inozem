'use client'

import { useState } from "react";

interface ProgramRow {
  id: number
  name: string
}

interface Props {
  programs: ProgramRow[]
}


export default async function InputPrograms({ programs }: Props) {
    const [inputValue, setInputValue] = useState("")

    const finderProgram = programs.filter(f => inputValue === f.name)

    return (
        <>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value) } className="border border-gray-300" />

        {finderProgram.map(program => (
            <li key={program.id}>
                {program.name}
            </li>
        ))}
        </>
    )

}