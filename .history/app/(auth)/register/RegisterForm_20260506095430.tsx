"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "../../../data/specialties"
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { delay } from "@/lib/delay"
import { useLoadingStore } from "@/components/Load/loadingStore";


interface RegisterForm {
  name: string
  last_name: string
  patronymic: string
  email: string
  phone: string
  password: string
  education_level: string
  specialization?: string
  captcha?: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(false)
  const sitekey = process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_SITEKEY
  const [form, setForm] = useState<RegisterForm>({ name: "", last_name: "", patronymic: "", email: "", phone: "", password: "", education_level: "", specialization: ""})
  const [error, setError] = useState<string | null>(null)
  const show = useLoadingStore((s) => s.show)
  const hide = useLoadingStore((s) => s.hide)
  const loading = useLoadingStore((s) => s.loading)
  

useEffect(() => {
  const init = () => {
    if (!window.smartCaptcha) return

    if (!sitekey) {
      console.error("YANDEX CAPTCHA sitekey не найден")
      return
    }

    window.smartCaptcha.render("yandex-captcha", {
      sitekey,
      callback: (token: string) => {
        setForm((prev) => ({
          ...prev,
          captcha: token,
        }))
      },
    })
  }

  const t = setTimeout(init, 300)

  return () => clearTimeout(t)
}, [sitekey])


function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  const { name, value } = e.target

  if (name === "education_level") { setForm((prev) => ({...prev, education_level: value, specialization: "" })) 
    return 
  }

  setForm((prev) => ({...prev, [name]: value}))
}

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    show()
    setError(null)

    try {
      
      if (!form.captcha) {
      setError("Подтвердите капчу")
      return
    }
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(form),
      })

      const data: { message: string } = await res.json()

      if (!res.ok) {
        setError(data.message)
       await delay(1500) 
       hide()
        return
      }

      router.push("/profile")
    } catch {
      setError("Проблема с интернетом")
      await delay(1500) 
      hide()
    }
  }

  return (
    <div className="max-w-[400px] mx-auto h-full">
      <h1 className="text-prpl !font-normal text-center mt-15">Регистрация</h1>
      <p className="text-center mt-4 text-zinc-800 text-lg">ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5 border border-zinc-400 rounded-xl p-4 shadow-2xl">
        <input className="border border-zinc-400 p-1.5 rounded text-lg mt-4 text-zinc-700 !font-normal" name="name" placeholder="Имя" value={form.name} onChange={handleChange} required maxLength={30} />
        <input className="border border-zinc-400 p-1.5 rounded text-lg text-zinc-700 !font-normal" name="last_name" placeholder="Фамилия" value={form.last_name} onChange={handleChange} required maxLength={30} />
        <input className="border border-zinc-400 p-1.5 rounded text-lg text-zinc-700 !font-normal" name="patronymic" placeholder="Отчество" value={form.patronymic} onChange={handleChange} maxLength={30} />
        <label className="flex gap-2">
          <input type="checkbox" className="cursor-pointer" />
          <p>У меня нет отчества</p>
        </label>
        
        <input className="border border-zinc-400 p-1.5 rounded text-lg text-zinc-700 !font-normal" name="email" type="email" placeholder="Почта" value={form.email} onChange={handleChange} required maxLength={40} />
        <PhoneInput country={"ru"} value={form.phone} onChange={(phone) => setForm((prev) => ({ ...prev, phone,}))} enableSearch disableSearchIcon countryCodeEditable={false} inputClass="!h-[36px] !w-full !pl-[50px] !border-zinc-400 text-zinc-700" buttonClass="!border !text-zinc-500" inputProps={{ required: true, name: "phone" }} />

        <div className="relative">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Пароль" value={form.password} onChange={handleChange} className="border border-zinc-400 p-2 w-full rounded text-zinc-700 pr-10 text-lg !font-normal"/>
          <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-2 top-1/2 -translate-y-1/2  hover:opacity-80 cursor-pointer">
            {showPassword ? <EyeOff size={18} className="!text-zinc-700" /> : <Eye size={18} className="!text-zinc-700" />}
          </button>
        </div>

        <select name="education_level" value={form.education_level} onChange={handleChange} required className="border border-zinc-400 p-2 w-full rounded text-zinc-700 text-lg">
            <option value="">-- выберите образование --</option>
            <option value="Среднее">Среднее</option>
            <option value="Высшее">Высшее</option>
            <option value="без образования">Без мед.образования</option>
        </select>

        {form.education_level !== "без образования" && (
          <select name="specialization" value={form.specialization} onChange={handleChange} required={form.education_level !== "без образования"}  className="border border-zinc-400 p-2 w-full rounded text-zinc-700 text-lg">
            <option value="">-- выберите специальность --</option>
              {(form.education_level === "Высшее" ? HIGHER_SPECIALTIES : SECONDARY_SPECIALTIES).map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
          </select>
        )}

        <div className="flex items-center ml-1">
          <input type="checkbox" className="cursor-pointer scale-130" checked={checked} onChange={(e) => setChecked(e.target.checked) } />
          <p className="text-base text-zinc-700 ml-3">Согласие на <br /><Link target="_blank" href={"/files/personalize/personal-data.pdf"} className="text-blue hover:text-blue-700">обработку персональных данных</Link></p>
        </div>        
        
        <div id="yandex-captcha" className="mt-2" />

        <button type="submit"  disabled={loading || !checked} className="flex items-center px-4 py-2 bg-prpl text-white text-center rounded flex cursor-pointer hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg">
          Регистрация
        </button>
        
      </form>
        
        <p className="ml-4 mt-4 text-zinc-700">У вас уже есть личный аккаунт? <Link className="text-blue hover:underline" href={"/login"}>Авторизация</Link></p>
        <p className="ml-4 mt-2 text-zinc-700 mb-10">Вернуться на <Link className="text-blue hover:underline" href={"/"}>главную</Link> </p>

      {error && <p className="text-red-600 mt-6 ml-4">{error}</p>}
      
    </div>
  )
}