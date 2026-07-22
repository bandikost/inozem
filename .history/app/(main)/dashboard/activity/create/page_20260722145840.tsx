"use client"

import LoadingLink from "@/components/Load/LoadingLink"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    title: "",
    description: "",
    teacher: "",
    purpose: "",
    conditions: "",
    audience: "",
    dates: "",
    year: "",
    paylink: "",
    teacher_img: "",
    title_bg: "",
    content: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/activity/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          year: form.year
            ? Number(form.year)
            : null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || "Ошибка создания программы"
        )
      }

      alert("Программа успешно создана!")

    } catch (error) {
      console.error(error)
      alert("Ошибка сервера")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative mx-auto mt-16 w-full px-6 pb-20 mt-27">

   
      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

        <LoadingLink
          href="/dashboard/manager"
          className="shrink-0 transition hover:text-blue hover:underline"
        >
          Главная страница Админки
        </LoadingLink>

        <ChevronRight
          size={14}
          className="shrink-0"
        />

        <LoadingLink
          href="/dashboard/programs"
          className="shrink-0 transition hover:text-blue hover:underline"
        >
          Список программ
        </LoadingLink>

        <ChevronRight
          size={14}
          className="shrink-0"
        />

        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Создание новой программы
        </span>

      </nav>


      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
      >

        <section className="border-b border-gray-100 p-8">

          <div className="mb-7">

            <h2 className="text-xl font-semibold text-gray-900">
              Основная информация
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Название и основные сведения об образовательной программе
            </p>

          </div>


          <div className="space-y-6">

            <Field
              label="Название программы"
              required
              hint="Отображается в каталоге программ"
            >
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Например: Актуальные вопросы анестезиологии и реаниматологии"
                className="input-main"
              />
            </Field>


            <Field
              label="URL программы"
              required
              hint="Используется в адресе страницы"
            >
              <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">

                <span className="whitespace-nowrap border-r border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-400">
                  /program/
                </span>

                <input
                  required
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="anesteziologiya"
                  className="w-full border-0 bg-transparent px-4 py-3.5 text-base outline-none"
                />

              </div>
            </Field>


            <Field
              label="Заголовок"
              hint="Дополнительный заголовок программы"
            >
              <textarea
                name="title"
                value={form.title}
                onChange={handleChange}
                rows={3}
                className="input-main min-h-[100px] resize-y"
              />
            </Field>


            <Field
              label="Описание программы"
              hint="Краткое описание для пользователей"
            >
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={7}
                placeholder="Опишите содержание и основные особенности образовательной программы..."
                className="input-main min-h-[180px] resize-y"
              />

              <div className="mt-3 text-right text-xs text-gray-400">
                {form.description.length} символов
              </div>

            </Field>

          </div>

        </section>


        <section className="border-b border-gray-100 bg-gray-50/50 p-8">

          <div className="mb-7">

            <h2 className="text-xl font-semibold text-gray-900">
              Информация об обучении
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Основные сведения о содержании и условиях обучения
            </p>

          </div>


          <div className="space-y-6">

            <Field label="Преподаватель">
              <textarea
                name="teacher"
                value={form.teacher}
                onChange={handleChange}
                rows={5}
                placeholder="Укажите информацию о преподавателе..."
                className="input-main min-h-[140px] resize-y"
              />
            </Field>


            <Field label="Цель обучения">
              <textarea
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                rows={5}
                placeholder="Опишите цель образовательной программы..."
                className="input-main min-h-[140px] resize-y"
              />
            </Field>


            <Field label="Условия поступления">
              <textarea
                name="conditions"
                value={form.conditions}
                onChange={handleChange}
                rows={5}
                placeholder="Укажите требования к поступающим..."
                className="input-main min-h-[140px] resize-y"
              />
            </Field>


            <Field label="Для кого предназначена программа">
              <textarea
                name="audience"
                value={form.audience}
                onChange={handleChange}
                rows={5}
                placeholder="Опишите целевую аудиторию программы..."
                className="input-main min-h-[140px] resize-y"
              />
            </Field>

          </div>

        </section>

        <section className="border-b border-gray-100 p-8">

          <div className="mb-7">

            <h2 className="text-xl font-semibold text-gray-900">
              Даты и параметры программы
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Сроки проведения и дополнительные параметры
            </p>

          </div>


          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <Field label="Даты обучения">
              <input
                name="dates"
                value={form.dates}
                onChange={handleChange}
                placeholder="15–30 сентября"
                className="input-main"
              />
            </Field>


            <Field label="Год">
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2026"
                className="input-main"
              />
            </Field>


            <Field
              label="Ссылка на оплату"
              hint="Если используется онлайн-оплата"
            >
              <input
                type="url"
                name="paylink"
                value={form.paylink}
                onChange={handleChange}
                placeholder="https://..."
                className="input-main"
              />
            </Field>

          </div>

        </section>


        <section className="border-b border-gray-100 bg-gray-50/50 p-8">

          <div className="mb-7">

            <h2 className="text-xl font-semibold text-gray-900">
              Изображения
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Изображения, используемые на странице программы
            </p>

          </div>


          <div className="space-y-6">

            <Field
              label="Изображение преподавателя"
              hint="Путь к изображению"
            >
              <input
                name="teacher_img"
                value={form.teacher_img}
                onChange={handleChange}
                placeholder="/uploads/teacher.jpg"
                className="input-main"
              />
            </Field>


            <Field
              label="Фоновое изображение заголовка"
              hint="Путь к фоновому изображению"
            >
              <input
                name="title_bg"
                value={form.title_bg}
                onChange={handleChange}
                placeholder="/uploads/title-bg.jpg"
                className="input-main"
              />
            </Field>

          </div>

        </section>

        <section className="border-b border-gray-100 p-8">

          <div className="mb-7">

            <h2 className="text-xl font-semibold text-gray-900">
              Содержание программы
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Полное содержание образовательной программы
            </p>

          </div>


          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={15}
            placeholder="Введите содержание программы..."
            className="input-main min-h-[350px] resize-y"
          />

        </section>


        <div className="flex items-center justify-end gap-6 bg-white px-8 py-6">

          <button
            disabled={loading}
            type="submit"
            className="button-more min-w-[230px] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Создание..."
              : "Создать программу"}
          </button>

        </div>

      </form>


      <style jsx>{`
        .input-main {
          width: 100%;
          border: 1px solid rgb(229 231 235);
          border-radius: 0.75rem;
          background: white;
          padding: 0.875rem 1rem;
          font-size: 1rem;
          color: rgb(17 24 39);
          outline: none;
          transition: all 0.2s ease;
        }

        .input-main::placeholder {
          color: rgb(156 163 175);
        }

        .input-main:focus {
          border-color: rgb(37 99 235);
          box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
        }
      `}</style>

    </section>
  )
}


function Field({
  label,
  required = false,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-4">

        <label className="text-sm font-semibold text-gray-700">

          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}

        </label>


        {hint && (
          <span className="hidden text-xs text-gray-400 sm:block">
            {hint}
          </span>
        )}

      </div>

      {children}

    </div>
  )
}