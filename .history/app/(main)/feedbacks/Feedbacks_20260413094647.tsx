'use client'

import { useState } from "react"
import { Star } from "lucide-react"

type Feedback = {
  id: number
  name: string
  last_name: string
  patronymic?: string | null
  user_text: string
  rate: number
  created_at: string
  user_id?: number
}

type Props = {
  feedback: Feedback[]
}

export default function FeedbacksCarousel({ feedback }: Props) {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => setCurrent(prev => (prev + 1) % feedback.length)
  const prevSlide = () => setCurrent(prev => (prev - 1 + feedback.length) % feedback.length)

  if (!feedback.length) return <p>Нет отзывов</p>
  const first = feedback[current]

  const renderCard = (feed: Feedback) => (
    <div key={feed.id} className="border border-gray-300 shadow rounded-md p-4 mt-5 grid h-[290px] shadow-xl">
      <p className="!text-xl mb-1">{feed.last_name} {feed.name} {feed.patronymic}</p>
      <hr className="border border-gray-300" />
      <p className="mt-2 mb-4 !text-lg">{feed.user_text}</p>
      <div className="grid grid-cols-2 w-full mt-6">
        <p className="text-left opacity-80">
          {new Date(feed.created_at).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "long",
            year: "numeric"
          })}
        </p>
        <p className="flex justify-end items-center opacity-80">
          {Array.from({ length: feed.rate }, (_, i) => (
            <Star key={i} fill="#FFCC00" stroke="none" size={18} />
          ))}
        </p>
      </div>
      <p>Ответ академии: df;gljdfioghdnhfgghdf;gljdfioghdnhfgghdf;gljdfioghdnhfgghdf;gljdfioghdnhfggh</p>
    </div>
  )

  return (
    <div className="relative">
      <div className="grid grid-cols-1">{renderCard(first)}</div>

      <button onClick={prevSlide} className="absolute left-[-25px] top-1/2 -translate-y-1/2 mt-2 !text-black cursor-pointer border border-gray-300 px-2.5 py-1 bg-white shadow-md rounded-full hover:opacity-60">
        <span className="relative -left-0.5">◀</span>
      </button>

      <button onClick={nextSlide} className="absolute right-[-25px] top-1/2 -translate-y-1/2 mt-2 !text-black cursor-pointer border border-gray-300 px-2.5 py-1 bg-white shadow-md rounded-full hover:opacity-60">
       <span className="relative -right-0.5">▶</span>
      </button>

    </div>
  )
}