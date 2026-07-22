"use client"

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
  const [message, setMessage] = useState("")

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

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^а-яёa-z0-9\s-]/gi, "")
      .replace(/\s+/g, "-")
  }

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value

    setForm((prev) => ({
      ...prev,
      name: value,
      slug: generateSlug(value),
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/program", {
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

      setMessage("Программа успешно создана")

      setForm({
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

    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Основная информация
        </h2>

        <div className="grid gap-5">

          <div>
            <label>Название программы</label>

            <input
              name="name"
              value={form.name}
              onChange={handleNameChange}
              placeholder="Например: Актуальные вопросы анестезиологии"
              className="input"
              required
            />
          </div>

          <div>
            <label>Slug</label>

            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="aktualnye-voprosy-anesteziologii"
              className="input"
              required
            />
          </div>

          <div>
            <label>Заголовок</label>

            <textarea
              name="title"
              value={form.title}
              onChange={handleChange}
              className="textarea"
            />
          </div>

          <div>
            <label>Описание</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              className="textarea"
            />
          </div>

        </div>

      </section>


      <section className="rounded-2xl border border-zinc-200 bg-white p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Информация об обучении
        </h2>

        <div className="grid gap-5">

          <div>
            <label>Преподаватель</label>

            <textarea
              name="teacher"
              value={form.teacher}
              onChange={handleChange}
              className="textarea"
            />
          </div>

          <div>
            <label>Цель обучения</label>

            <textarea
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              className="textarea"
            />
          </div>

          <div>
            <label>Условия поступления</label>

            <textarea
              name="conditions"
              value={form.conditions}
              onChange={handleChange}
              className="textarea"
            />
          </div>

          <div>
            <label>Для кого предназначена программа</label>

            <textarea
              name="audience"
              value={form.audience}
              onChange={handleChange}
              className="textarea"
            />
          </div>

        </div>

      </section>


      <section className="rounded-2xl border border-zinc-200 bg-white p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Даты и ссылки
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label>Даты обучения</label>

            <input
              name="dates"
              value={form.dates}
              onChange={handleChange}
              placeholder="01.09.2026 — 30.09.2026"
              className="input"
            />
          </div>

          <div>
            <label>Год</label>

            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="md:col-span-2">
            <label>Ссылка на оплату</label>

            <input
              name="paylink"
              value={form.paylink}
              onChange={handleChange}
              className="input"
            />
          </div>

        </div>

      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Изображения
        </h2>

        <div className="grid gap-5">

          <div>
            <label>Изображение преподавателя</label>

            <input
              name="teacher_img"
              value={form.teacher_img}
              onChange={handleChange}
              placeholder="/uploads/teacher.jpg"
              className="input"
            />
          </div>

          <div>
            <label>Фоновое изображение заголовка</label>

            <input
              name="title_bg"
              value={form.title_bg}
              onChange={handleChange}
              placeholder="/uploads/title-bg.jpg"
              className="input"
            />
          </div>

        </div>

      </section>


      <section className="rounded-2xl border border-zinc-200 bg-white p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Контент программы
        </h2>

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={15}
          placeholder="Содержимое программы..."
          className="textarea"
        />

      </section>


      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-blue px-8 py-4 text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {loading
          ? "Создание..."
          : "Создать программу"}
      </button>

      {message && (
        <p className="text-sm">
          {message}
        </p>
      )}

    </form>
  )
}