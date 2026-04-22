'use client'

import { useEffect, useState } from "react"
import CheckBox152 from "../ui/Checkbox/Checkbox"
import Link from "next/link"
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "@/data/specialties"
import { redirect } from "next/navigation"



export default function FormActivity({ user, activity }: any) {
    const sitekey = process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_SITEKEY
    const [lastName, setLastName] = useState(user?.last_name || "")
    const [firstName, setFirstName] = useState(user?.name || "")
    const [patronymic, setPatronymic] = useState(user?.patronymic || "")
    const [email, setEmail] = useState(user?.email || "")
    const [phone, setPhone] = useState(user?.phone || "")
    const [city, setCity] = useState(user?.city || "")
    const [education_level, setEducation_level] = useState(user?.education_level || "")
    const [captcha, setCaptcha] = useState<string>("")
    const [notice, setNotice] = useState("")

   const allSpec = Array.from(new Set([...HIGHER_SPECIALTIES, ...SECONDARY_SPECIALTIES]))

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

  const t = setTimeout(init, 300)
  return () => clearTimeout(t)
  
}, [sitekey])
    

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!captcha) {
    setNotice("Подтвердите капчу")
    return
  }
  
  if (!activity) {
    setNotice("Вы не выбрали мероприятие")
  }

    alert("Форма отправлена!")
    redirect("/")
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
           
                
                     <select name="specialization" required className="border border-zinc-400 p-2 w-full rounded text-zinc-700 text-lg">
                       <option value="">-- выберите направление --</option>
                        {allSpec.map(spec => (
                            <option key={spec} value={spec} onChange={() => setEducation_level(spec)}>{spec}</option>
                        ))}
                     </select>
                  
            <div className="border border-gray-300 rounded-md p-2">
                {activity ? (
                    <p className="ml-1"><span className="!font-medium">Вы подаете заявку на мероприятие: </span><br />{activity}</p>
                ) : (
                    <p>Вам необходимо выбрать программу на странице <Link className="hover:underline" href="/activity">мероприятий</Link></p>
                )}
            </div>
            <div id="yandex-captcha" className="mt-2" />
            <CheckBox152 />
        </form>

        <h3 className="mt-6 text-center text-red-500">{notice}</h3>
    </section>
    )
}