"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "../components/specialties"
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";



interface RegisterForm {
  name: string
  last_name: string
  patronymic: string
  email: string
  phone: string
  password: string
  education_level: string
  specialization?: string

}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [confirm, setConfirm] = useState(false)


  const [form, setForm] = useState<RegisterForm>({
    name: "",
    last_name: "",
    patronymic: "",
    email: "",
    phone: "",
    password: "",
    education_level: "",
    specialization: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  const { name, value } = e.target

  if (name === "education_level") {
    setForm((prev) => ({
      ...prev,
      education_level: value,
      specialization: "",
    }))
    return
  }

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
    <div className="max-w-[400px] mx-auto mb-15">
      <h1 className="text-prpl font-semibold text-3xl text-center mt-10">Регистрация</h1>
      <p className="text-center mt-4 text-zinc-800 text-lg">ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10 border border-zinc-400 rounded-xl p-4 shadow-2xl">
        <input
          className="border border-zinc-400 p-1.5 rounded mt-4 text-zinc-700"
          name="name"
          placeholder="Имя"
          value={form.name}
          onChange={handleChange}
          required
          maxLength={30}
        />

        <input
          className="border border-zinc-400 p-1.5 rounded text-zinc-700"
          name="last_name"
          placeholder="Фамилия"
          value={form.last_name}
          onChange={handleChange}
          required
          maxLength={30}
        />

        <input
          className="border border-zinc-400 p-1.5 rounded text-zinc-700"
          name="patronymic"
          placeholder="Отчество"
          value={form.patronymic}
          onChange={handleChange}
          maxLength={30}
        />

        <input
          className="border border-zinc-400 p-1.5 rounded text-zinc-700"
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
        inputClass="!h-[36px] !w-full !pl-[50px] !border-zinc-400 text-zinc-700"
        buttonClass="!border !text-zinc-500"
        inputProps={{
            required: true,
            name: "phone",
        }} />


        <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Пароль"
    value={form.password}
    onChange={handleChange}
    className="border border-zinc-400 p-2 w-full rounded text-zinc-700 pr-10"
  />

  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-zinc-500"
  >
    {showPassword ? <EyeOff className="cursor-pointer hover:text-zinc-900" size={18} /> : <Eye className="cursor-pointer hover:text-zinc-900"  size={18} />}
  </button>
</div>


        <select name="education_level" value={form.education_level} onChange={handleChange} required className="border border-zinc-400 p-2 w-full rounded text-zinc-700">
            <option value="">-- выберите образование --</option>
            <option value="Среднее">Среднее</option>
            <option value="Высшее">Высшее</option>
            <option value="без образования">Без мед.образования</option>
        </select>

              {form.education_level !== "none" && (
                    <select
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    required={form.education_level !== "none"}
                    className="border border-zinc-400 p-2 w-full rounded text-zinc-700"
                    >
                    <option value="">-- выберите специальность --</option>

                    {(form.education_level === "Высшее"
                        ? HIGHER_SPECIALTIES
                        : SECONDARY_SPECIALTIES
                    ).map((spec) => (
                        <option key={spec} value={spec}>
                        {spec}
                        </option>
                    ))}
                    </select>
                )}



        <button type="submit" disabled={loading} className="flex items-center px-4 py-2 bg-purple-600 text-white text-center rounded flex cursor-pointer hover:bg-prpl">
          {loading ? "Регистрация..." : "Регистрация"}
        </button>
      </form>
        <p className="ml-4 mt-4 text-zinc-700">У вас уже есть личный аккаунт? <Link className="text-blue-500 hover:text-blue-700" href={"/login"}>Авторизция</Link></p>
        <p className="ml-4 mt-2 text-zinc-700">Вернуться на <Link className="text-blue-500 hover:text-blue-700" href={"/"}>главную</Link> </p>
      {error && <p className="text-red-600 mt-10 ml-4">{error}</p>}
    </div>
  )
}