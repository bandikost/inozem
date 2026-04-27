"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useLoadingStore } from "@/components/Load/loadingStore"
import { delay } from "@/lib/delay"

interface LoginFormState {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" })
  const [error, setError] = useState<string | null>(null)
  const loading = useLoadingStore((s) => s.loading)
  const show = useLoadingStore((s) => s.show)
  const hide = useLoadingStore((s) => s.hide)
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
 
    setError(null)
    show()
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      await delay(1500)
      
      if (!res.ok) {
        setError(data.message)
        hide()
        return
      }

      router.push("/profile")
      hide()
    } catch {
      setError("Пробема с подключением к сети")
      hide()
    }
  }

  return (
     <div className="min-h-screen flex items-center justify-center px-4">
    <div className="max-w-[400px] mx-auto">
        <h1 className="text-prpl font-semibold text-3xl text-center mt-27">Авторизация</h1>
        <p className="text-center mt-4 text-zinc-800 !text-xl ">ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 mb-6 border border-zinc-400 rounded-xl p-4 shadow-2xl">
        <input className="border border-zinc-400 p-1.5 rounded mt-4 text-zinc-700 text-lg !font-normal" name="email" type="email" placeholder="Почта" value={form.email} onChange={handleChange} required/>
        <div className="relative">
          <input className="border border-zinc-400 p-1.5 rounded text-zinc-700 w-full text-lg !font-normal" name="password" type={showPassword ? "text" : "password"} placeholder="Пароль" value={form.password} onChange={handleChange} required/>
          <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:opacity-80 cursor-pointer">
            {showPassword ? <EyeOff size={18} className="!text-zinc-700" /> : <Eye size={18} className="!text-zinc-700" />}
          </button>
        </div>
        <button disabled={loading} type="submit" className={`${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"} 
        flex items-center px-4 py-2 bg-prpl text-white text-center rounded flex cursor-pointer hover:opacity-80 text-lg`}>
        Авторизация
        </button>

      </form>
        <p className="ml-4 my-2 text-zinc-700 !font-normal !text-lg">У вас еще нет аккаунта? <Link className="text-blue-500 hover:underline" href={"/forgot-password"}>Регистрация</Link></p>
        <Link className="text-blue-500 hover:underline ml-4 !text-lg" href={"/forgot-password"}>Забыли пароль?</Link>
    
    {error && <p className="text-red-600 mt-4 ml-4">{error}</p>}
    </div>
    </div>
  )
}
