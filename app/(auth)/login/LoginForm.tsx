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
  <div className="min-h-screen px-4 py-12 md:py-16">

    <div className="mx-auto max-w-xl">

      <div className="text-center mb-10">

        <div className="inline-flex items-center justify-center rounded-2xl bg-prpl/10 px-4 py-2 mb-4">
          <span className="text-sm font-medium text-prpl">
            Личный кабинет
          </span>
        </div>

        <h1 className="!text-3xl md:!text-4xl !font-semibold text-prpl">
          Авторизация
        </h1>

        <p className="mt-3 text-sm md:text-base leading-6 text-zinc-500">
          Войдите в личный кабинет Академии медицинского образования
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="
          overflow-hidden
          rounded-3xl
          border
          border-zinc-200
          bg-white
          shadow-sm
        "
      >

        <div className="bg-prpl px-6 py-6 md:px-8">

          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Вход в аккаунт
          </h2>

          <p className="mt-1 text-sm text-white/80">
            Введите данные для входа
          </p>

        </div>
        <div className="p-6 md:p-8">

          <div className="space-y-5">
            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Электронная почта
              </label>

              <input
                name="email"
                type="email"
                placeholder="example@mail.ru"
                value={form.email}
                onChange={handleChange}
                required
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-zinc-200
                  bg-zinc-50
                  px-4
                  text-base
                  text-zinc-800
                  outline-none
                  transition
                  placeholder:text-zinc-400
                  focus:border-prpl
                  focus:bg-white
                  focus:ring-4
                  focus:ring-prpl/10
                "
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Пароль
              </label>

              <div className="relative">

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Введите пароль"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-zinc-200
                    bg-zinc-50
                    px-4
                    pr-12
                    text-base
                    text-zinc-800
                    outline-none
                    transition
                    placeholder:text-zinc-400
                    focus:border-prpl
                    focus:bg-white
                    focus:ring-4
                    focus:ring-prpl/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-zinc-500
                    transition
                    hover:bg-zinc-100
                    hover:text-zinc-800
                    cursor-pointer
                  "
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

          </div>

          {error && (

            <div className="
              mt-5
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            ">
              {error}
            </div>

          )}

          <button
            disabled={loading}
            type="submit"
            className="
              mt-6
              h-12
              w-full
              rounded-xl
              bg-prpl
              px-6
              text-base
              font-medium
              text-white
              transition
              hover:bg-purple-500
              disabled:cursor-not-allowed
              disabled:opacity-50
              cursor-pointer
            "
          >
            {loading ? "Вход..." : "Войти"}
          </button>

        </div>

      </form>

      <div className="mt-6 space-y-3 text-center text-sm">

        <p className="text-zinc-600">

          Нет аккаунта?{" "}

          <Link
            href="/register"
            className="font-medium text-blue hover:underline"
          >
            Зарегистрироваться
          </Link>

        </p>


        <Link
          href="/forgot-password"
          className="
            inline-block
            text-zinc-500
            transition
            hover:text-blue
            hover:underline
          "
        >
          Забыли пароль?
        </Link>

      </div>

    </div>
  </div>
)
}
