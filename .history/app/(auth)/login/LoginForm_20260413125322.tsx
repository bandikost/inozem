"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface LoginFormState {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const sitekey = process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_SITEKEY
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const init = () => {
      if (!(window as any).smartCaptcha) return
  
      ;(window as any).smartCaptcha.render("yandex-captcha", {
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
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      

      if (!res.ok) {
        setError(data.message)
        setLoading(false)
        return
      }

      router.push("/profile")
    } catch {
      setError("Пробема с подключением к сети")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[400px] mx-auto">
        <h1 className="text-prpl font-semibold text-3xl text-center">Авторизация</h1>
        <p className="text-center mt-4 text-zinc-800 !text-xl ">ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 mb-6 border border-zinc-400 rounded-xl p-4 shadow-2xl">
        <input className="border border-zinc-400 p-1.5 rounded mt-4 text-zinc-700" name="email" type="email" placeholder="Почта" value={form.email} onChange={handleChange} required/>
        <input className="border border-zinc-400 p-1.5 rounded text-zinc-700" name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required/>
        <div id="yandex-captcha" className="mt-2" />
        <button type="submit" disabled={loading} className="flex items-center px-4 py-2 bg-prpl text-white text-center rounded flex cursor-pointer hover:opacity-80">
          {loading ? "Авторизация..." : "Авторизация"}
        </button>

      </form>
   
        <p className="ml-4 my-2 text-zinc-700 !font-normal !text-lg">У вас еще нет аккаунта? <Link className="text-blue-500 hover:underline" href={"/register"}>Регистрация</Link></p>
        <Link className="text-blue-500 hover:underline ml-4 !text-lg" href={"/register"}>Забыли пароль?</Link>
    
    {error && <p className="text-red-600 mt-4 ml-4">{error}</p>}
    </div>
  )
}
