"use strict"

import { useState } from "react"


interface Props {
    program: []
}


export default function InputSearchProgram({program} : Props) {

    const [value, setValue] = useState("")

    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Введите названи программы" />
        </div>
    )
}