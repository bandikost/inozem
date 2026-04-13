"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface LoginFormState {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        <p className="text-center mt-4 text-zinc-800 text-lg">ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»</p>
        <p className="ml-4 mt-4 text-zinc-700 !font-normal">У вас еще нет аккаунта? <Link className="text-blue-500 hover:underline" href={"/register"}>Регистрация</Link></p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 border border-zinc-400 rounded-xl p-4 shadow-2xl">
        <input className="border border-zinc-400 p-1.5 rounded mt-4 text-zinc-700" name="email" type="email" placeholder="Почта" value={form.email} onChange={handleChange} required/>
        <input className="border border-zinc-400 p-1.5 rounded text-zinc-700" name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required/>

        <button type="submit" disabled={loading} className="flex items-center px-4 py-2 bg-prpl text-white text-center rounded flex cursor-pointer hover:opacity-80">
          {loading ? "Авторизация..." : "Авторизация"}
        </button>

      </form>
   
        
        <Link className="text-blue-500 hover:underline ml-4 mt-1 " href={"/register"}>Забыли пароль?</Link>
        <p className="ml-4 mt-2 text-zinc-700">Вернуться на <Link className="text-blue-500 hover:text-blue-700" href={"/"}>главную</Link> </p>
    
    {error && <p className="text-red-600 mt-4 ml-4">{error}</p>}
    </div>
  )
}
