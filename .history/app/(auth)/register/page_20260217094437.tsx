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
    <div className="max-w-[400px] mx-auto">
      <h1 className="text-prpl font-semibold mt-10 text-3xl text-center">Регистрация</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Имя"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="last_name"
          placeholder="Фамилия"
          value={form.last_name}
          onChange={handleChange}
          required
        />

        <input
          name="patronymic"
          placeholder="Отчество"
          value={form.patronymic}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Почта"
          value={form.email}
          onChange={handleChange}
          required
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
  inputClass="!w-full !h-[30px] !pl-[48px]"
  containerClass="!w-full"
  buttonClass="!border !border-gray-300"
  inputProps={{
    required: true,
    name: "phone",
  }}
/>


        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Регистрация"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-10">{error}</p>}
    </div>
  )
}
