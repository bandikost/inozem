'use client'

import { getPrograms } from "@/lib/programm";
import { useState } from "react";


export default function InputPrograms() {
    const [inputValue, setInputValue] = useState("")


    return (
        <>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border border-gray-300" />
        </>
    )

}