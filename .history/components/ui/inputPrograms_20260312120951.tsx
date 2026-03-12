'use client'

import { getPrograms } from "@/lib/programm";
import { useState } from "react";


export default async function InputPrograms() {
    const [inputValue, setInputValue] = useState("")

    const programs = await getPrograms()

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