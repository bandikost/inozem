'use client'

import { useEffect, useState } from "react"
import CheckBox152 from "../ui/Checkbox/Checkbox"


export default function FormActivity({ user, activity }: any) {
    const sitekey = process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_SITEKEY
    const [lastName, setLastName] = useState(user?.last_name || "")
    const [firstName, setFirstName] = useState(user?.name || "")
    const [patronymic, setPatronymic] = useState(user?.patronymic || "")
    const [email, setEmail] = useState(user?.email || "")
    const [phone, setPhone] = useState(`${'+' + user?.phone}` || "")
    const [captcha, setCaptcha] = useState<string>("")

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
    

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  if (!captcha) {
    alert("Подтвердите капчу")
    return
  }

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
            
            <div id="yandex-captcha" className="mt-2" />
            <CheckBox152 />
        </form>
    )
}