"use client"

import { useState } from "react"
import CheckBox152 from "../ui/Checkbox/Checkbox"
import Link from "next/link"
import {
  HIGHER_SPECIALTIES,
  SECONDARY_SPECIALTIES,
} from "@/data/specialties"
import { useYandexCaptcha } from "@/hooks/useYandexCaptcha"
import { UserRow } from "@/app/interface/user"
import { useSubmitWithCaptcha } from "@/hooks/useSubmitWithCaptcha"

type Props = {
  user?: UserRow | null
  activity?: string
}

export default function FormActivity({
  user,
  activity,
}: Props) {
  const [lastName, setLastName] = useState(user?.last_name || "")
  const [firstName, setFirstName] = useState(user?.name || "")
  const [patronymic, setPatronymic] = useState(user?.patronymic || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [city, setCity] = useState(user?.city || "")
  const [educationLevel, setEducationLevel] = useState(
    user?.education_level || ""
  )

  const [notice, setNotice] = useState("")
  const [captcha, setCaptcha] = useState("")

  const captchaId = useYandexCaptcha(setCaptcha)
  const handleSubmit = useSubmitWithCaptcha()

  const allSpec = Array.from(
    new Set([
      ...HIGHER_SPECIALTIES,
      ...SECONDARY_SPECIALTIES,
    ])
  )

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-default transition-all duration-200 outline-none focus:border-prpl focus:ring-4 focus:ring-prpl/15 !font-normal"

  if (!activity) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl">

        <h2 className="text-2xl font-bold text-prpl">
          Мероприятие не выбрано
        </h2>

        <p className="mt-3 text-gray-500">
          Выберите мероприятие на странице образовательных мероприятий.
        </p>

        <Link
          href="/activity"
          className="mt-6 inline-flex button-more"
        >
          Перейти к мероприятиям
        </Link>

      </div>
    )
  }

  return (
    <section className="w-full">

      <form
        onSubmit={(e) =>
          handleSubmit({
            e,
            captcha,
            setNotice,
            url: "/api/activity-users",
            body: {
              activity_name: activity,
              name: firstName,
              last_name: lastName,
              patronymic,
              email,
              phone,
              city,
              education_level: educationLevel,
            },
          })
        }
        className="w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">


        <div className="mb-8 rounded-2xl border border-prpl/15 bg-prpl/5 p-5">

          <div className="text-sm text-gray-500">
            Вы подаете заявку на мероприятие:
          </div>

          <div className="mt-1 text-lg font-semibold text-prpl">
            {activity}
          </div>

        </div>


        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-md font-medium text-gray-600">
              Фамилия
            </label>

            <input
              required
              className={inputClass}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Иванов"
            />
          </div>


          <div>
            <label className="mb-2 block text-md font-medium text-gray-600">
              Имя
            </label>

            <input
              required
              className={inputClass}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Иван"
            />
          </div>


          <div className="md:col-span-2">

            <label className="mb-2 block text-md font-medium text-gray-600">
              Отчество
            </label>

            <input
              required
              className={inputClass}
              value={patronymic}
              onChange={(e) => setPatronymic(e.target.value)}
              placeholder="Иванович"
            />

          </div>


          <div>

            <label className="mb-2 block text-md font-medium text-gray-600">
              Телефон
            </label>

            <input
              required
              className={inputClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (999) 123-45-67"
            />

          </div>


          <div>

            <label className="mb-2 block text-md font-medium text-gray-600">
              Email
            </label>

            <input
              required
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.ru"
            />

          </div>


          <div>

            <label className="mb-2 block text-md font-medium text-gray-600">
              Город проживания
            </label>

            <input
              className={inputClass}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Москва"
            />

          </div>


          <div>

            <label className="mb-2 block text-md font-medium text-gray-600">
              Специальность
            </label>

            <select
              required
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className={inputClass}
            >
              <option value="">
                Выберите специальность
              </option>

              {allSpec.map((spec) => (
                <option
                  key={spec}
                  value={spec}
                >
                  {spec}
                </option>
              ))}

            </select>

          </div>

        </div>


        <div className="mt-8">

          <div id={captchaId} />

          <div className="mt-4">
            <CheckBox152 />
          </div>

        </div>


        {notice && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-red-600">
            {notice}
          </div>
        )}

      </form>

    </section>
  )
}