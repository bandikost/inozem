'use client'

import { getPrograms } from "@/lib/programm";
import { useState } from "react";


export default async function InputPrograms() {
    const [inputValue, setInputValue] = useState("")

    const programs = await getPrograms()

    return (
        <>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value) } />
        </>
    )

}