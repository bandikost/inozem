'use client'

import { useState } from "react"
import CheckBox152 from "./Checkbox"
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties"

export default function FormApplication({ user, programs }: any) {
    const [lastName, setLastName] = useState(user?.last_name || "")
    const [firstName, setFirstName] = useState(user?.name || "")
    const [patronymic, setPatronymic] = useState(user?.patronymic || "")
    const [phone, setPhone] = useState(user?.phone || "")
    const [email, setEmail] = useState(user?.email || "")
    const [education_level, setEducation_level] = useState(user?.education_level || "")
    const [specialization, setSpecialization] = useState(user?.specialization || "")

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log({ lastName, firstName, patronymic, phone, email })
        alert("Форма отправлена!")
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
            <select name="education_level" value={education_level} onChange={(e) => {setEducation_level(e.target.value); setSpecialization("")}}required 
            className="border border-zinc-400 p-2 w-full rounded text-zinc-700">
                        <option value="">-- выберите образование --</option>
                        <option value="Среднее">Среднее</option>
                        <option value="Высшее">Высшее</option>
                        <option value="без образования">Без мед.образования</option>
                    </select>
            
            {education_level !== "без образования" && (
            <select name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required={education_level !== "без образования"}
                className="border border-zinc-400 p-2 w-full rounded text-zinc-700">
            <option value="">-- выберите специальность --</option>

                {(education_level === "Высшее" ? HIGHER_SPECIALTIES : SECONDARY_SPECIALTIES).map((spec) => (
                    <option key={spec} value={spec} className="text-default text-lg">
                        {spec}
                    </option>
                ))}
            </select>
            )}
            <select required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-lg">
                {programs.map((p: any, index: any) => (<option key={index}>{p.name}</option>))}
            </select>
            <CheckBox152 />
        </form>
    )
}