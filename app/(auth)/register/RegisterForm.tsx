"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"
import { HIGHER_SPECIALTIES, SECONDARY_SPECIALTIES } from "../../../data/specialties"
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { delay } from "@/lib/delay"
import { useLoadingStore } from "@/components/Load/loadingStore";


interface RegisterForm {
  name: string
  last_name: string
  patronymic: string
  email: string
  phone: string
  password: string
  education_level: string
  specialization?: string
  captcha?: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(false)
  const sitekey = process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_SITEKEY
  const [form, setForm] = useState<RegisterForm>({ name: "", last_name: "", patronymic: "", email: "", phone: "", password: "", education_level: "", specialization: ""})
  const [error, setError] = useState<string | null>(null)
  const show = useLoadingStore((s) => s.show)
  const hide = useLoadingStore((s) => s.hide)
  const loading = useLoadingStore((s) => s.loading)
  const [hasNoPatronymic, setHasNoPatronymic] = useState(false)

useEffect(() => {
  const init = () => {
    if (!window.smartCaptcha) return

    if (!sitekey) {
      console.error("YANDEX CAPTCHA sitekey не найден")
      return
    }

    window.smartCaptcha.render("yandex-captcha", {
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
}, [sitekey])


function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  const { name, value } = e.target

  if (name === "education_level") { setForm((prev) => ({...prev, education_level: value, specialization: "" })) 
    return 
  }

  setForm((prev) => ({...prev, [name]: value}))
}

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    show()
    setError(null)

    try {
      
      if (!form.captcha) {
      setError("Подтвердите капчу")
      return
    }
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(form),
      })

      const data: { message: string } = await res.json()

      if (!res.ok) {
        setError(data.message)
       await delay(1500) 
       hide()
        return
      }

      router.push("/profile")
    } catch {
      setError("Проблема с интернетом")
      await delay(1500) 
      hide()
    }
  }

 return (
  <div className="min-h-screen py-12 md:py-16 px-4">

    <div className="mx-auto max-w-4xl">

      <div className="text-center mb-10">

        <div className="inline-flex items-center justify-center rounded-2xl bg-prpl/10 px-4 py-2 mb-4">
          <span className="text-sm font-medium text-prpl">
            Личный кабинет
          </span>
        </div>

        <h1 className="!text-3xl md:!text-4xl !font-semibold text-prpl">
          Регистрация
        </h1>

        <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base leading-6 text-zinc-500">
          Создайте личный аккаунт для доступа к образовательным программам,
          результатам обучения и другим возможностям Академии.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="
          rounded-3xl
          border
          border-zinc-200
          bg-white
          shadow-sm
          overflow-hidden
        "
      >

        <div className="bg-prpl px-6 py-6 md:px-8">

          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Данные пользователя
          </h2>

          <p className="mt-1 text-sm text-white/80">
            Заполните основные сведения для создания аккаунта
          </p>

        </div>

        <div className="p-6 md:p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Фамилия
              </label>

              <input
                name="last_name"
                placeholder="Введите фамилию"
                value={form.last_name}
                onChange={handleChange}
                required
                maxLength={30}
                className="
                  w-full
                  h-12
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
                Имя
              </label>

              <input
                name="name"
                placeholder="Введите имя"
                value={form.name}
                onChange={handleChange}
                required
                maxLength={30}
                className="
                  w-full
                  h-12
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

            {!hasNoPatronymic && (
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Отчество
                </label>

                <input
                  name="patronymic"
                  placeholder="Введите отчество"
                  value={form.patronymic}
                  onChange={handleChange}
                  required={!hasNoPatronymic}
                  maxLength={30}
                  className="
                    w-full
                    h-12
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
            )}


            <div className="flex items-center">

              <label className="
                flex
                items-center
                gap-3
                cursor-pointer
                text-sm
                text-zinc-600
              ">

                <input
                  type="checkbox"
                  className="
                    h-5
                    w-5
                    cursor-pointer
                    rounded
                    border-zinc-300
                    accent-prpl
                  "
                  checked={hasNoPatronymic}
                  onChange={(e) =>
                    setHasNoPatronymic(e.target.checked)
                  }
                />

                У меня нет отчества

              </label>

            </div>

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
                maxLength={40}
                className="
                  w-full
                  h-12
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
                Номер телефона
              </label>

              <PhoneInput
                country="ru"
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
                inputClass="
                  !h-12
                  !w-full
                  !pl-[52px]
                  !rounded-xl
                  !border-zinc-200
                  !bg-zinc-50
                  !text-base
                  !text-zinc-800
                  focus:!border-prpl
                "
                buttonClass="
                  !rounded-l-xl
                  !border-zinc-200
                  !bg-zinc-50
                "
                dropdownClass="!rounded-xl"
                inputProps={{
                  required: true,
                  name: "phone",
                }}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Пароль
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Введите пароль"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    h-12
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

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Уровень образования
              </label>

              <select
                name="education_level"
                value={form.education_level}
                onChange={handleChange}
                required
                className="
                  w-full
                  h-12
                  rounded-xl
                  border
                  border-zinc-200
                  bg-zinc-50
                  px-4
                  text-base
                  text-zinc-700
                  outline-none
                  transition
                  focus:border-prpl
                  focus:bg-white
                  focus:ring-4
                  focus:ring-prpl/10
                "
              >
                <option value="">
                  Выберите образование
                </option>

                <option value="Среднее">
                  Среднее
                </option>

                <option value="Высшее">
                  Высшее
                </option>

                <option value="без образования">
                  Без медицинского образования
                </option>

              </select>

            </div>

            {form.education_level !== "без образования" && (

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Специальность
                </label>

                <select
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-zinc-200
                    bg-zinc-50
                    px-4
                    text-base
                    text-zinc-700
                    outline-none
                    transition
                    focus:border-prpl
                    focus:bg-white
                    focus:ring-4
                    focus:ring-prpl/10
                  "
                >

                  <option value="">
                    Выберите специальность
                  </option>

                  {(form.education_level === "Высшее"
                    ? HIGHER_SPECIALTIES
                    : SECONDARY_SPECIALTIES
                  ).map((spec) => (

                    <option
                      key={spec}
                      value={spec}
                    >
                      {spec}
                    </option>

                  ))}

                </select>

              </div>

            )}

          </div>

          <div className="mt-8 border-t border-zinc-100 pt-6">

            <label className="
              flex
              items-start
              gap-3
              cursor-pointer
            ">

              <input
                type="checkbox"
                className="
                  mt-0.5
                  h-5
                  w-5
                  shrink-0
                  cursor-pointer
                  rounded
                  border-zinc-300
                  accent-prpl
                "
                checked={checked}
                onChange={(e) =>
                  setChecked(e.target.checked)
                }
              />

              <span className="text-sm leading-5 text-zinc-600">

                Я даю согласие на{" "}

                <Link
                  target="_blank"
                  href="/files/personalize/personal-data.pdf"
                  className="font-medium text-blue hover:underline"
                >
                  обработку персональных данных
                </Link>

              </span>

            </label>

            <div className="mt-6">

              <div id="yandex-captcha" />

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
              type="submit"
              disabled={loading || !checked}
              className="
                mt-6
                w-full
                h-12
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
              {loading ? "Регистрация..." : "Создать аккаунт"}
            </button>

          </div>

        </div>

      </form>


      <div className="mt-6 text-center space-y-2 text-sm text-zinc-600">

        <p>
          Уже есть аккаунт?{" "}

          <Link
            href="/login"
            className="font-medium text-blue hover:underline"
          >
            Авторизация
          </Link>
        </p>

        <p>
          <Link
            href="/"
            className="text-zinc-500 hover:text-blue transition"
          >
            Вернуться на главную
          </Link>
        </p>

      </div>

    </div>
  </div>
)
}