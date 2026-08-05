"use client"

import { useState } from "react"
import { TeacherDetailsRow } from "@/app/interface/teacher"
import { UserRow } from "@/app/interface/user"

interface Props {
  user: UserRow
  teacherinfo: TeacherDetailsRow | null
}

export default function ChangeInfoClient({
  user,
  teacherinfo,
}: Props) {
  const [form, setForm] = useState({
    position: teacherinfo?.position ?? "",

    subjects: teacherinfo?.subjects ?? "",

    education: teacherinfo?.education ?? "",

    academic_degree:
      teacherinfo?.academic_degree ?? "",

    academic_title:
      teacherinfo?.academic_title ?? "",

    advanced_training:
      teacherinfo?.advanced_training ?? "",

    professional_retraining:
      teacherinfo?.professional_retraining ?? "",

    professional_experience:
      teacherinfo?.professional_experience?.toString() ?? "",

    educational_programs:
      teacherinfo?.educational_programs ?? "",
  })

  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState("")

  function changeField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setLoading(true)

    setMessage("")

    try {
      const response = await fetch(
        "/api/teacher-details",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: user.id,

            ...form,

            professional_experience:
              form.professional_experience === ""
                ? null
                : Number(
                    form.professional_experience
                  ),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Не удалось сохранить информацию"
        )
      }

      setMessage(
        "Информация успешно сохранена"
      )
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Произошла ошибка"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto">

      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h1 className="text-2xl text-gray-800">
          Информация о преподавателе
        </h1>

        <p className="mt-2 text-gray-500">
          {user.last_name}{" "}
          {user.name}{" "}
          {user.patronymic}
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >

        <FormField
          label="Занимаемая должность"
          value={form.position}
          onChange={(value) =>
            changeField(
              "position",
              value
            )
          }
        />

        <FormField
          label="Преподаваемые учебные предметы, курсы, дисциплины (модули)"
          value={form.subjects}
          onChange={(value) =>
            changeField(
              "subjects",
              value
            )
          }
          textarea
        />

        <FormField
          label="Уровень профессионального образования, направление подготовки, специальность и квалификация"
          value={form.education}
          onChange={(value) =>
            changeField(
              "education",
              value
            )
          }
          textarea
        />

        <FormField
          label="Ученая степень"
          value={form.academic_degree}
          onChange={(value) =>
            changeField(
              "academic_degree",
              value
            )
          }
        />

        <FormField
          label="Ученое звание"
          value={form.academic_title}
          onChange={(value) =>
            changeField(
              "academic_title",
              value
            )
          }
        />

        <FormField
          label="Сведения о повышении квалификации за последние 3 года"
          value={form.advanced_training}
          onChange={(value) =>
            changeField(
              "advanced_training",
              value
            )
          }
          textarea
        />

        <FormField
          label="Сведения о профессиональной переподготовке"
          value={
            form.professional_retraining
          }
          onChange={(value) =>
            changeField(
              "professional_retraining",
              value
            )
          }
          textarea
        />

        <FormField
          label="Продолжительность опыта работы в профессиональной сфере"
          value={
            form.professional_experience
          }
          onChange={(value) =>
            changeField(
              "professional_experience",
              value
            )
          }
          type="number"
        />

        <FormField
          label="Наименование образовательной программы, код и наименование профессии или специальности"
          value={
            form.educational_programs
          }
          onChange={(value) =>
            changeField(
              "educational_programs",
              value
            )
          }
          textarea
          last
        />

        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-prpl px-7 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Сохранение..."
              : "Сохранить изменения"}
          </button>

          {message && (
            <p className="text-sm text-gray-600">
              {message}
            </p>
          )}

        </div>

      </form>
    </div>
  )
}

interface FormFieldProps {
  label: string

  value: string

  onChange: (
    value: string
  ) => void

  textarea?: boolean

  type?: string

  last?: boolean
}

function FormField({
  label,
  value,
  onChange,
  textarea = false,
  type = "text",
  last = false,
}: FormFieldProps) {
  const MAX_LENGTH = 350

  const isTextField = type === "text"

  return (
    <div
      className={`grid grid-cols-1 gap-3 p-5 md:grid-cols-[320px_1fr] md:gap-8 ${
        !last
          ? "border-b border-gray-200"
          : ""
      }`}
    >
      <label className="font-medium text-gray-700">
        {label}
      </label>

      <div className="w-full">

        {textarea ? (
          <textarea
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            maxLength={MAX_LENGTH}
            rows={5}
            className="min-h-[120px] w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-prpl"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
            }
            maxLength={
              isTextField
                ? MAX_LENGTH
                : undefined
            }
            min={
              type === "number"
                ? "0"
                : undefined
            }
            step={
              type === "number"
                ? "0.1"
                : undefined
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-prpl"
          />
        )}

        {isTextField && (
          <div className="mt-1 flex justify-end">
            <span
              className={`text-xs ${
                value.length >= MAX_LENGTH
                  ? "text-red-500"
                  : value.length >= 300
                    ? "text-orange-500"
                    : "text-gray-400"
              }`}
            >
              {value.length} / {MAX_LENGTH}
            </span>
          </div>
        )}

      </div>
    </div>
  )
}