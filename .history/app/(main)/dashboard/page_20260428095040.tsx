"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch("/api/manager-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push("/dashboard/manager")  
    } else {
      const data = await res.json()
      setError(data.error)
    }

    setLoading(false)
  }

  return (
     <section className="flex flex-col items-center mt-27 justify-center">
    <div className="flex flex-col items-center min-w-[310px] mx-auto">
      <h1 className="text-prpl font-semibold text-3xl text-center">Авторизация</h1>
      <p className="mt-4">
        Вернуться в <Link href="/profile">профиль</Link>
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-10 border border-zinc-400 rounded-xl p-4 shadow-2xl w-full max-w-[450px]"
      >
        <input
          className="border border-zinc-400 p-1.5 rounded w-full max-w-[450px] text-lg"
          type="text"
          placeholder="Логин"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="border border-zinc-400 p-1.5 rounded w-full max-w-[450px] text-lg"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="px-4 py-2 bg-prpl text-white rounded hover:opacity-80 cursor-pointer"
        >
          {loading ? "Авторизация..." : "Войти"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      
    </div>
    </section>
  )
}