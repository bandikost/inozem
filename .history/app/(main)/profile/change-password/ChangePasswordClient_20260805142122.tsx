"use client"

import { useState } from "react"
import { ChevronRight, Eye, EyeOff, KeyRound } from "lucide-react"
import { useRouter } from "next/navigation"
import LoadingLink from "@/components/Load/LoadingLink"

export default function ChangePasswordClient() {
    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showRepeat, setShowRepeat] = useState(false)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setError("")
    setSuccess("")

    if (newPassword !== repeatPassword) {
      setError("Новые пароли не совпадают")
      return
    }

    if (newPassword.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        setLoading(false)
        return
      }

      setSuccess("Пароль успешно изменён")

      setOldPassword("")
      setNewPassword("")
      setRepeatPassword("")
      router.push("/profile")
    } catch {
      setError("Ошибка сети")
    } finally {
      setLoading(false)
    }
  }

  return (
     <section className="min-h-screen pb-10">
    <div className="container max-w-6xl px-2 my-27">
           <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />

            <LoadingLink href="/profile" className="shrink-0 hover:text-blue transition hover:underline">
              Личный кабинет
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Смена пароля
        </span>
      
      </nav>

      <div className="flex items-center gap-3 mt-28 mb-8">
        <KeyRound
          size={45}
          strokeWidth={1.5}
          className="text-prpl"
        />

        <div>
          <h1 className="text-prpl font-semibold">
            Смена пароля
          </h1>

          <p className="text-gray-500">
            Для изменения пароля подтвердите текущий пароль.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-300 rounded-xl shadow-2xl p-6 flex flex-col gap-5"
      >

        <div className="relative">
          <input
            type={showOld ? "text" : "password"}
            placeholder="Текущий пароль"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full border border-zinc-400 rounded p-3 pr-10 text-lg"
          />

          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="Новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border border-zinc-400 rounded p-3 pr-10 text-lg"
          />

          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showRepeat ? "text" : "password"}
            placeholder="Повторите новый пароль"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            className="w-full border border-zinc-400 rounded p-3 pr-10 text-lg"
          />

          <button
            type="button"
            onClick={() => setShowRepeat(!showRepeat)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showRepeat ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600">
            {success}
          </p>
        )}

        <button
          disabled={loading}
          className="bg-prpl text-white rounded-md py-3 text-lg hover:opacity-80 disabled:opacity-50 transition cursor-pointer"
        >
          {loading ? "Сохранение..." : "Изменить пароль"}
        </button>

      </form>
      </div>
    </section>
  )
}