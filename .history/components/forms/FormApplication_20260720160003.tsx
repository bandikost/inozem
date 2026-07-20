"use client"

import { useState } from "react"
import CheckBox152 from "../ui/Checkbox/Checkbox"
import {
  HIGHER_SPECIALTIES,
  SECONDARY_SPECIALTIES,
} from "@/data/specialties"
import { useYandexCaptcha } from "@/hooks/useYandexCaptcha"
import { UserRow } from "@/app/interface/user"
import { useSubmitWithCaptcha } from "@/hooks/useSubmitWithCaptcha"

type Props = {
  user?: UserRow | null
}

export default function FormApplication({ user }: Props) {
  const [specialization, setSpecialization] = useState("")
  const [lastName, setLastName] = useState(user?.last_name || "")
  const [firstName, setFirstName] = useState(user?.name || "")
  const [patronymic, setPatronymic] = useState(user?.patronymic || "")
  const [phone, setPhone] = useState(`${"+" + user?.phone}` || "")
  const [email, setEmail] = useState(user?.email || "")
  const [education_level, setEducation_level] = useState(
    user?.education_level || ""
  )

  const [captcha, setCaptcha] = useState<string>("")
  const [notice, setNotice] = useState("")

  const captchaId = useYandexCaptcha(setCaptcha)
  const handleSubmit = useSubmitWithCaptcha()

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEducation_level(e.target.value)
    setSpecialization("")
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-default transition-all duration-200 outline-none focus:border-prpl focus:ring-4 focus:ring-prpl/15 !font-normal"

  const selectClass =
    "w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-default transition-all duration-200 outline-none focus:border-prpl focus:ring-4 focus:ring-prpl/15 !font-normal"

  return (
    <section className="flex justify-center">
      <form
        onSubmit={(e) =>
          handleSubmit({
            e,
            captcha,
            setNotice,
            url: "/api/application-users",
            body: {
              last_name: lastName,
              patronymic,
              name: firstName,
              phone,
              email,
              education_level,
              specialization,
            },
          })
        }
        className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-prpl">
            Форма подачи заявки
          </h2>

          <p className="mt-2 text-gray-500">
            Заполните форму, и мы свяжемся с вами в ближайшее время.
          </p>
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
              Уровень образования
            </label>

            <select
              name="education_level"
              value={education_level}
              onChange={handleEducationChange}
              required
              className={selectClass}
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
                Без мед.образования
              </option>
            </select>
          </div>

          {education_level !== "без образования" && (
            <div>
              <label className="mb-2 block text-md font-medium text-gray-600">
                Специальность
              </label>

              <select
                name="specialization"
                value={specialization}
                onChange={(e) =>
                  setSpecialization(e.target.value)
                }
                required={
                  education_level !== "без образования"
                }
                className={selectClass}
              >
                <option value="">
                  Выберите специальность
                </option>

                {(
                  education_level === "Высшее"
                    ? HIGHER_SPECIALTIES
                    : SECONDARY_SPECIALTIES
                ).map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
            <label className="my-2 block text-md font-medium text-gray-600">
              Название программы
            </label>

            <select
              name="education_level"
              value={education_level}
              onChange={handleEducationChange}
              required
              className={selectClass}
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
                Без мед.образования
              </option>
            </select>
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