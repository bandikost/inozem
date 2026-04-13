'use client'

import { useState } from "react"
import CheckBox152 from "./Checkbox"
import { redirect } from "next/navigation"

export default function FormApplication({ user, programs }: any) {
    const sitekey = process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_SITEKEY
    const [program, setProgram] = useState("")
    const [lastName, setLastName] = useState(user?.last_name || "")
    const [firstName, setFirstName] = useState(user?.name || "")
    const [patronymic, setPatronymic] = useState(user?.patronymic || "")
    const [phone, setPhone] = useState(user?.phone || "")
    const [email, setEmail] = useState(user?.email || "")
    const [education_level, setEducation_level] = useState(user?.education_level || "")

    const handleSubmit = () => {
        alert("Форма отправлена!")
        redirect("/")
    }

    

    return (
        <form onSubmit={handleSubmit} className="border border-gray-300 py-4 px-6 rounded-md flex flex-col gap-4 w-[450px]">
            <h2 className="my-2 text-center text-prpl">Форма подачи заявки</h2>
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Ваша фамилия" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Ваше имя" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={patronymic} onChange={e => setPatronymic(e.target.value)} placeholder="Ваше отчество" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ваш телефон" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={email} onChange={e => setEmail(e.target.value)} placeholder="Ваша почта" />
            <select name="education_level" value={education_level} onChange={(e) => {setEducation_level(e.target.value)}}required 
            className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg">
                        <option value="">Выберите образование</option>
                        <option value="Среднее">Среднее</option>
                        <option value="Высшее">Высшее</option>
                        <option value="без образования">Без мед.образования</option>
                    </select>
            
            <select required value={program} onChange={(e) => setProgram(e.target.value)} className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg">
                <option value="" disabled>
                    Выберите программу
                </option>

                {programs.map((p: any, index: any) => (
                    <option key={index} value={p.name}>
                        {p.name}
                    </option>
                ))}
            </select>
            
            <CheckBox152 />
        </form>
    )
}