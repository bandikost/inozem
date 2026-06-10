'use client'

import { useState } from "react"
import { Star } from "lucide-react"

type User = {
  id: number
  name?: string
  last_name?: string
  patronymic?: string
  user_text?: string
  rate?: number
}

export default function FeedbackForm({
  user,
}: {
  user: User | null
}) {
  const [lastName, setLastName] = useState(user?.last_name || "")
  const [firstName, setFirstName] = useState(user?.name || "")
  const [patronymic, setPatronymic] = useState(user?.patronymic || "")
  const [text, setText] = useState(user?.user_text || "")
  const [rate, setRate] = useState(user?.rate || 5)

  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.id,
        name: firstName,
        last_name: lastName,
        patronymic,
        user_text: text,
        rate,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      alert("Спасибо за отзыв!")
      window.location.reload()
    } else {
      alert(data.error || "Ошибка отправки")
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">

      <div className="flex justify-center">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="
            rounded-2xl
            bg-gradient-to-r
            from-prpl
            to-green
            px-8
            py-4
            text-lg
            !text-default
            shadow-lg
            transition-all
            hover:scale-[1.02]
          "
        >
          {showForm
            ? "Скрыть форму отзыва"
            : "Поделиться впечатлением"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="
            mt-8
            rounded-3xl
            border
            border-zinc-200
            bg-white
            p-8
            md:p-10
            shadow-sm
          "
        >
          <div className="text-center">
            <h2 className="text-prpl">
              Оставьте отзыв
            </h2>

            <p className="mt-3 text-zinc-500">
              Ваше мнение поможет другим специалистам
              выбрать программу обучения
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-8">

            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Фамилия"
              className="
                w-full
                rounded-2xl
                border
                border-zinc-200
                p-4
                text-lg
                outline-none
                transition
                focus:border-prpl
              "
            />

            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Имя"
              className="
                w-full
                rounded-2xl
                border
                border-zinc-200
                p-4
                text-lg
                outline-none
                transition
                focus:border-prpl
              "
            />
          </div>

          <input
            required
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
            placeholder="Отчество"
            className="
              mt-4
              w-full
              rounded-2xl
              border
              border-zinc-200
              p-4
              text-lg
              outline-none
              transition
              focus:border-prpl
            "
          />

          <textarea
            required
            maxLength={500}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Расскажите о своём опыте обучения..."
            className="
              mt-4
              min-h-[220px]
              w-full
              resize-none
              rounded-2xl
              border
              border-zinc-200
              p-4
              text-lg
              outline-none
              transition
              focus:border-prpl
            "
          />

          <div className="mt-6">

            <div className="text-lg mb-3">
              Ваша оценка
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRate(star)}
                  className="transition hover:scale-110"
                >
                  <Star
                    size={34}
                    fill={star <= rate ? "#facc15" : "transparent"}
                    stroke={star <= rate ? "#facc15" : "#d4d4d8"}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-prpl
                to-green
                py-4
                text-lg
                text-white
                shadow-md
                transition-all
                hover:scale-[1.01]
              "
            >
              Отправить отзыв
            </button>
          </div>
        </form>
      )}
    </div>
  )
}