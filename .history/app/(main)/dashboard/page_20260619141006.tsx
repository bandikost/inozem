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
     <section className="flex min-h-screen items-center justify-center px-4">
  <div className="w-full max-w-md flex flex-col items-center">

    <h1 className="text-3xl font-semibold text-zinc-800">
      Авторизация
    </h1>

    <p className="mt-2 !text-md text-zinc-600 !font-normal">
      Вернуться в{" "}
      <Link href="/profile" className="text-prpl hover:underline !font normal">
        профиль
      </Link>
    </p>

    <form
      onSubmit={handleSubmit}
      className="mt-8 w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg flex flex-col gap-4"
    >
      <input
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-default outline-none
                   focus:border-prpl focus:ring-2 focus:ring-prpl/20 transition text-lg !font-normal"
        type="text"
        placeholder="Логин"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base outline-none
                   focus:border-prpl focus:ring-2 focus:ring-prpl/20 transition text-lg !font-normal"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button
        disabled={loading}
        className="mt-2 w-full rounded-lg bg-prpl py-2 text-white font-medium
                   hover:opacity-90 active:scale-[0.99] transition"
      >
        {loading ? "Авторизация..." : "Войти"}
      </button>
    </form>

    {error && (
      <p className="mt-4 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
</section>
  )
}