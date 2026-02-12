import { useState } from "react"

type Promo = {
    secret_code: string
}


export default async function Page() {
    const [inputValue, setInputValue] = useState("")

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/promo`)
    if (!res.ok) throw new Error('Failed to fetch payment')

    const promo: Promo[] = await res.json()

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