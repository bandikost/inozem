'use client'

import { useState } from "react"
import CheckBox152 from "../ui/Checkbox/Checkbox"
import Link from "next/link"
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties"
import { useYandexCaptcha } from "@/hooks/useYandexCaptcha"
import { UserRow } from "@/app/interface/user"
import { useSubmitWithCaptcha } from "@/hooks/useSubmitWithCaptcha"


type Props = {
  user?: UserRow
  activity?: string
}

export default function FormActivity({ user, activity }: Props) {
    const [lastName, setLastName] = useState(user?.last_name || "")
    const [firstName, setFirstName] = useState(user?.name || "")
    const [patronymic, setPatronymic] = useState(user?.patronymic || "")
    const [email, setEmail] = useState(user?.email || "")
    const [phone, setPhone] = useState(user?.phone || "")
    const [city, setCity] = useState(user?.city || "")
    const [education_level, setEducation_level] = useState(user?.education_level || "")
    const [notice, setNotice] = useState("")
    const [captcha, setCaptcha] = useState<string>("")
    const captchaId = useYandexCaptcha(setCaptcha)
    
    const handleSubmit = useSubmitWithCaptcha()

    const allSpec = Array.from(new Set([...HIGHER_SPECIALTIES, ...SECONDARY_SPECIALTIES]))

    if (!activity) return null

    return (
    <section>
        <form onSubmit={(e) => handleSubmit({ e, captcha, setNotice, url: "/api/activity-users",
 body: { activity_name: activity, name: firstName, last_name: lastName, patronymic: patronymic, email: email, phone: phone, city: city, education_level: education_level }})} 
      className="border border-gray-300 py-4 px-6 rounded-md flex flex-col gap-4 max-w-[450px] shadow-xl">
            <h2 className="my-2 text-center text-prpl">Форма подачи заявки</h2>
            <input required className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Ваша фамилия" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={patronymic} onChange={e => setPatronymic(e.target.value)} placeholder="Ваше отчество" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Ваше имя" />
            <input className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={city} onChange={e => setCity(e.target.value)} placeholder="Ваш город проживания (необязательное поле)" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ваш телефон" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={email} onChange={e => setEmail(e.target.value)} placeholder="Ваша почта" />
           
                     <select name="specialization" value={education_level} onChange={(e) => setEducation_level(e.target.value)} required className="border border-zinc-400 p-2 w-full rounded text-zinc-700 text-lg">
                       <option value="">-- выберите направление --</option>
                        {allSpec.map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                     </select>
                  
            <div className="border border-gray-300 rounded-md p-2">
                {activity ? (
                    <p className="ml-1"><span className="!font-medium">Вы подаете заявку на мероприятие: </span><br />{activity}</p>
                ) : (
                    <p>Вам необходимо выбрать программу на странице <Link className="hover:underline" href="/activity">мероприятий</Link></p>
                )}
            </div>
            <div id={captchaId} className="mt-2" />
            <CheckBox152 />
        </form>

        <h3 className="mt-6 text-center text-red-500">{notice}</h3>
    </section>
    )
}