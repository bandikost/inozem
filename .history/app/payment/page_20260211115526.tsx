"use client"

import { useState } from "react"


export default function Page() {
    const [inputValue, setInputValue] = useState("")

    return (
        <section>
            <div className="mt-30">
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border-2 " />
            </div>
        </section>
    )
}