'use client'

import { useState } from "react"

export default function FeedbackForm({ user }: any) {
    const [lastName, setLastName] = useState(user?.last_name || "")
    const [firstName, setFirstName] = useState(user?.name || "")
    const [patronymic, setPatronymic] = useState(user?.patronymic || "")
    const [rate, setRate] = useState(user?.rate || 0)


    const handleSubmit = () => {
        alert("Форма отправлена!")
  
    }

    return (
        <form onSubmit={handleSubmit} className="mt-15 border border-gray-300 py-4 px-6 rounded-md flex flex-col gap-4 w-[450px]">
            <h2 className="my-2 text-center text-prpl">Форма подачи заявки</h2>
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Ваша фамилия" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Ваше имя" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={patronymic} onChange={e => setPatronymic(e.target.value)} placeholder="Ваше отчество" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={rate} maxLength={1} onChange={e => setRate(e.target.value)} placeholder="Ваша оценка" />

        </form>
    )
}