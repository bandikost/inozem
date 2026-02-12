"use client"

import { useState } from "react"


export default function Page() {
    const [inputValue, setInputValue] = useState("")

    const handlePay = (e: React.FormEvent<HTMLFormElement>) => {
        if (!inputValue.trim()) return

        e.preventDefault();
        console.log(inputValue)
        setInputValue("")
    }
        

    return (
        <section>
            <form onSubmit={handlePay} className="mt-30">
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value.trim())} className="border-2 " />
                <button type="submit">pay</button>
            </form>
        </section>
    )
}