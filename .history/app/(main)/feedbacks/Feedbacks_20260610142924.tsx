'use client'

import { useState } from "react"
import { UserRow } from "@/app/interface/user"
import {
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

type Feedback = {
  id: number
  name: string
  last_name: string
  patronymic?: string | null
  user_text: string
  rate: number
  created_at: string
  user_id?: number
  answer: string
}

type Props = {
  feedback: Feedback[]
  user: UserRow | null
}

export default function FeedbacksCarousel({ feedback, user }: Props) {
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState("")
  
  const [visibleForm, setVisibleForm] = useState(false)
  const nextSlide = () => setCurrent(prev => (prev + 1) % feedback.length)
  const prevSlide = () => setCurrent(prev => (prev - 1 + feedback.length) % feedback.length)

  if (!feedback.length) return <p>Нет отзывов</p>
  const first = feedback[current]

  const handleAnswer = () => {
    setVisibleForm(prev => !prev)
  }

  const handlePostAnswer = async (e: React.SubmitEvent, id: number) => {
    e.preventDefault()

    const res = await fetch("/api/feedbackAnswer", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: id,
        answer
      })
    })

    const data = await res.json()

    if (res.ok) {
      alert("Форма отправлена!")
      window.location.reload()
    } else {
      alert(data.error || "Ошибка отправки")
    }
  }

 const renderCard = (feed: Feedback) => (
  <>
    <div
      key={feed.id}
      className="
        rounded-3xl
        border
        border-zinc-200
        bg-white
        p-8
        shadow-sm
        min-h-[420px]
        flex
        flex-col
      "
    >
      <div className="flex items-start justify-between gap-4">

        <div>
          <h3 className="text-xl font-semibold text-prpl">
            {feed.last_name} {feed.name}
          </h3>

          {feed.patronymic && (
            <p className="text-zinc-500">
              {feed.patronymic}
            </p>
          )}
        </div>

        <div className="flex gap-1">
          {Array.from({ length: feed.rate }).map((_, i) => (
            <Star
              key={i}
              size={18}
              fill="#facc15"
              stroke="#facc15"
            />
          ))}
        </div>

      </div>

      <div className="mt-2 text-sm text-zinc-500">
        {new Date(feed.created_at).toLocaleDateString(
          "ru-RU",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        )}
      </div>

      <div className="h-px bg-zinc-100 my-6" />

      <p className="flex-1 !text-lg leading-8 text-default">
        {feed.user_text}
      </p>

      {feed.answer && (
        <div className="mt-8 rounded-2xl border border-prpl/10 bg-prpl/5 p-5">
          <div className="font-semibold text-prpl mb-2">
            Ответ академии
          </div>

          <p className="leading-7 text-default text-md">
            {feed.answer}
          </p>
        </div>
      )}
    </div>

    {user?.isAdmin && (
      <>
        <button
          className="button-more mt-6"
          onClick={handleAnswer}
        >
          {visibleForm ? "Закрыть" : "Ответить"}
        </button>

        {visibleForm && (
          <form
            onSubmit={(e) =>
              handlePostAnswer(e, feed.id)
            }
            className="
              mt-4
              flex
              flex-col
              gap-4
            "
          >
            <textarea
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
              maxLength={200}
              placeholder="Ответ от академии"
              className="
                min-h-[120px]
                rounded-2xl
                border
                border-zinc-200
                p-4
                resize-none
                outline-none
                focus:border-prpl
              "
            />

            <button
              type="submit"
              className="
                rounded-2xl
                bg-gradient-to-r
                from-prpl
                to-green
                py-3
                text-white
              "
            >
              Отправить ответ
            </button>
          </form>
        )}
      </>
    )}
  </>
)

  return (
    <div className="relative">
      <div className="grid grid-cols-1">{renderCard(first)}</div>

      <button
  onClick={prevSlide}
  className="
    absolute
    left-[-24px]
    top-1/2
    -translate-y-1/2

    h-12
    w-12

    rounded-full
    bg-white

    border
    border-zinc-200

    shadow-lg

    flex
    items-center
    justify-center

    transition
    hover:scale-110
    cursor-pointer
  "
>
  <ChevronLeft size={22} />
</button>

<button
  onClick={nextSlide}
  className="
    absolute
    right-[-24px]
    top-1/2
    -translate-y-1/2

    h-12
    w-12

    rounded-full
    bg-white

    border
    border-zinc-200

    shadow-lg

    flex
    items-center
    justify-center

    transition
    hover:scale-110
    cursor-pointer
  "
>
  <ChevronRight size={22} />
</button>

    </div>
  )
}