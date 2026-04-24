'use client'

import { useEffect, useState } from "react"
import CheckBox152 from "../ui/Checkbox/Checkbox"


export default function FormActivity({ user, activity, programs }: any) {
    const sitekey = process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_SITEKEY
    const [lastName, setLastName] = useState(user?.last_name || "")
    const [program, setProgram] = useState("")
    const [firstName, setFirstName] = useState(user?.name || "")
    const [patronymic, setPatronymic] = useState(user?.patronymic || "")
    const [email, setEmail] = useState(user?.email || "")
    const [phone, setPhone] = useState(user?.phone || "")
    const [city, setCity] = useState(user?.city || "")
    const [education_level, setEducation_level] = useState(user?.education_level || "")
    const [captcha, setCaptcha] = useState<string>("")
    const [notice, setNotice] = useState("")

    useEffect(() => {
  const init = () => {
    if (!(window as any).smartCaptcha) return
    if (!sitekey) return

    ;(window as any).smartCaptcha.render("yandex-captcha", {
      sitekey,
      callback: (token: string) => {
        setCaptcha(token)
      },
    })
  }
if (!activity) {
    setNotice("Вы не выбрали мероприятие")
  }
  const t = setTimeout(init, 300)
  return () => clearTimeout(t)
  
}, [sitekey])
    

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  if (!captcha) {
    setNotice("Подтвердите капчу")
    return
  }
  
  

  alert("Форма отправлена!")
}
    

    return (
    <section>
        <form onSubmit={handleSubmit} className="border border-gray-300 py-4 px-6 rounded-md flex flex-col gap-4 w-[450px]">
            <h2 className="my-2 text-center text-prpl">Форма подачи заявки</h2>
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Ваша фамилия" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Ваше имя" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={patronymic} onChange={e => setPatronymic(e.target.value)} placeholder="Ваше отчество" />
            <input className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={city} onChange={e => setCity(e.target.value)} placeholder="Ваш город проживания (необязательное поле)" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ваш телефон" />
            <input required className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg"
                value={email} onChange={e => setEmail(e.target.value)} placeholder="Ваша почта" />
            <select name="education_level" value={education_level} onChange={(e) => {setEducation_level(e.target.value)}}required 
            className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg">
                        <option value="">Выберите ваше образование</option>
                        <option value="Среднее">Среднее</option>
                        <option value="Высшее">Высшее</option>
                        <option value="без образования">Без мед.образования</option>
                    </select>
            
            <select required value={program} onChange={(e) => setProgram(e.target.value)} className="border py-1 px-2 border-gray-300 rounded-md w-[400px] text-default text-lg">
                <option value="" disabled>
                    Выберите ваше направление
                </option>

                {programs.map((p: any, index: any) => (
                    <option key={index} value={p.name}>
                        {p.name}
                    </option>
                ))}
            </select>
            <div className="border border-gray-300 rounded-md p-2">
                {activity ? (
                    <p className="ml-1"><span className="!font-medium">Вы подаете заявку на мероприятие: </span><br />{activity}</p>
                ) : (
                    <p>Вам необходимо выбрать программу на странице мероприятий</p>
                )}
            </div>
            <div id="yandex-captcha" className="mt-2" />
            <CheckBox152 />
        </form>

        <h3 className="mt-6 text-center text-red-500">{notice}</h3>
    </section>
    )
}