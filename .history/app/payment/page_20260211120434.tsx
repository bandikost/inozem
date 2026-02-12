"use client"

import { useState, useEffect } from "react"

type Promo = {
    secret_code: string
}

export default function Page() {
    const [inputValue, setInputValue] = useState("")
    const [promo, setPromo] = useState<Promo[]>([])

    useEffect(() => {
        const fetchPromo = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/promo`)
            if (!res.ok) throw new Error("Failed to fetch promo")
            const data: Promo[] = await res.json()
            setPromo(data)
        }

        fetchPromo()
    }, []) // [] — чтобы запрос выполнялся только один раз при монтировании
  

    const handlePay = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!inputValue.trim()) return
        console.log(inputValue)
        setInputValue("")
    }

    return (
        <section>
            <form onSubmit={handlePay} className="mt-30">
                <input
                    value={inputValue}
                    maxLength={50}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border-2"
                />
                <button type="submit">pay</button>
            </form>
        </section>
    )
}
