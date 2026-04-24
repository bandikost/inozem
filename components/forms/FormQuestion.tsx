'use client'

import { useState } from "react"
import CheckBox152 from "../ui/Checkbox/Checkbox"
import { useYandexCaptcha } from "@/hooks/useYandexCaptcha"
import { UserRow } from "@/app/types/user"
import { useSubmitWithCaptcha } from "@/hooks/useSubmitWithCaptcha"

type Props = {
  user?: UserRow
}

export default function FormActivity({ user }: Props) {
    const [lastName, setLastName] = useState(user?.last_name || "")
    const [firstName, setFirstName] = useState(user?.name || "")
    const [patronymic, setPatronymic] = useState(user?.patronymic || "")
    const [email, setEmail] = useState(user?.email || "")
    const [phone, setPhone] = useState(user?.phone || "")
    const [question, setQuestion] = useState("")
    const [notice, setNotice] = useState("")
    const [captcha, setCaptcha] = useState<string>("")
    const captchaId = useYandexCaptcha(setCaptcha)
    const handleSubmit = useSubmitWithCaptcha()

    return (
    <section>
        <form onSubmit={(e) => handleSubmit({ e, captcha, setNotice, url: "/api/question",
 body: { last_name: lastName, patronymic: patronymic, name: firstName, phone: phone, email: email, question: question } })} 
      className="border border-gray-300 py-4 px-6 rounded-md flex flex-col gap-4 max-w-[450px] shadow-xl">
            <h2 className="my-2 text-center text-prpl">Форма подачи заявки</h2>
            <input required className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Ваша фамилия" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={patronymic} onChange={e => setPatronymic(e.target.value)} placeholder="Ваше отчество" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Ваше имя" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ваш телефон" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] text-default text-lg"
                value={email} onChange={e => setEmail(e.target.value)} placeholder="Ваша почта" />    
            <textarea required maxLength={300} className="border py-1 px-2 border-gray-300 rounded-md max-w-[400px] h-68 text-default text-lg"
                value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ваш вопрос" />

            <div id={captchaId} className="mt-2" />
            <CheckBox152 />
        </form>

        <h3 className="mt-6 text-center text-red-500">{notice}</h3>
    </section>
    )
}