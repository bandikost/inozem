"use client"

import { useState } from "react"


export default async function Page() {
    const [inputValue, setInputValue] = useState("")


    const handlePay = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
         if (!inputValue.trim()) return
       
        console.log(inputValue)
        setInputValue("")
    }
        

    return (
        <section>
            <form onSubmit={handlePay} className="mt-30">
                <input value={inputValue} maxLength={50} onChange={(e) => setInputValue(e.target.value)} className="border-2 " />
                <button type="submit">pay</button>
            </form>
        </section>
    )
}