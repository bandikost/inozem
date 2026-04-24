'use client'

import { Feedback } from "@/app/interface/feedback"
import { useState } from "react"


export default function FeedbackForm({ user }: { user: Feedback | null}) {
    const [lastName, setLastName] = useState(user?.last_name || "")
    const [firstName, setFirstName] = useState(user?.name || "")
    const [patronymic, setPatronymic] = useState(user?.patronymic || "")
    const [text, setText] = useState(user?.user_text || "")
    const [rate, setRate] = useState(user?.rate || 5)
    const [showFilter, setShowFilter] = useState(false)
    const handleShowFilter = () => setShowFilter(prev => !prev)

const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const res = await fetch("/api/feedbacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user?.id,
        name: firstName,
        last_name: lastName,
        patronymic,
        user_text: text,
        rate: Number(rate),
     
      })
    })

    const data = await res.json()

    if (res.ok) {
      alert("Форма отправлена!")
      window.location.reload()
    } else {
      alert(data.error || "Ошибка отправки")
    }
  }

    return (
        <>
        <button className="button-more text-xl w-full" onClick={handleShowFilter}>{showFilter ? "Скрыть форму отзыва" : "Хочу оставить отзыв"}</button>

        <form onSubmit={handleSubmit} className={`${showFilter ? "flex" : "hidden"} mt-15 border border-gray-300 py-4 px-6 rounded-md flex flex-col gap-4 w-[450px] shadow-2xl`}>
            <h2 className="my-2 text-center text-prpl">Оставьте свой отзыв</h2>
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Ваша фамилия" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Ваше имя" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={patronymic} onChange={e => setPatronymic(e.target.value)} placeholder="Ваше отчество" />
            <textarea required maxLength={500} className="border py-1 px-2 border-gray-300 rounded-md min-h-[300px] w-[400px] text-default text-lg"
                value={text} onChange={e => setText(e.target.value)} placeholder="Ваш текст" />  
            <label className="!text-lg">Ваша оценка:</label>      
            <select required className="cursor-pointer border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg -mt-1" value={rate} onChange={e => setRate(Number(e.target.value))}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            
            <button type="submit" className="bg-prpl text-white py-2 rounded-md mt-2 hover:opacity-80 cursor-pointer">Отправить</button>

        </form>
        </>
    )
}