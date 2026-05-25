"use strict"

import { ProgramRow } from "@/lib/programm"
import { useState } from "react"



export default function InputSearchProgram({program} : ProgramRow) {

    const [value, setValue] = useState("")

    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Введите названи программы" />
        </div>
    )
}