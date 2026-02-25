"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"


interface RegisterForm {
  name: string
  last_name: string
  patronymic: string
  email: string
  phone: string
  password: string
}

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    last_name: "",
    patronymic: "",
    email: "",
    phone: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

 function handleChange(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const { name, value } = e.target

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }))
}


  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const data: { message: string } = await res.json()

      if (!res.ok) {
        setError(data.message)
        setLoading(false)
        return
      }

      router.push("/profile")
    } catch {
      setError("Проблема с интернетом")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[300px] mx-auto">
      <h1 className="text-prpl font-semibold mt-10 text-3xl text-center">Регистрация</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
        <input
          className="border border-zinc-400 p-1 rounded"
          name="name"
          placeholder="Имя"
          value={form.name}
          onChange={handleChange}
          required
          maxLength={30}
        />

        <input
          className="border border-zinc-400 p-1 rounded"
          name="last_name"
          placeholder="Фамилия"
          value={form.last_name}
          onChange={handleChange}
          required
          maxLength={30}
        />

        <input
          className="border border-zinc-400 p-1 rounded"
          name="patronymic"
          placeholder="Отчество"
          value={form.patronymic}
          onChange={handleChange}
          maxLength={30}
        />

        <input
          className="border border-zinc-400 p-1 rounded"
          name="email"
          type="email"
          placeholder="Почта"
          value={form.email}
          onChange={handleChange}
          required
          maxLength={40}
        />

        <PhoneInput
  country={"ru"}
  value={form.phone}
  onChange={(phone) =>
    setForm((prev) => ({
      ...prev,
      phone,
    }))
  }
  enableSearch
  disableSearchIcon
  countryCodeEditable={false}
  inputClass="!h-[34px] !pl-[50px] !border-zinc-400"
  buttonClass="!border "
  inputProps={{
    required: true,
    name: "phone",
  }}
/>


        <input
          className="border border-zinc-400 p-1 rounded"
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
          maxLength={40}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Регистрация"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-10">{error}</p>}
    </div>
  )
}
