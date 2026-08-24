"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/Toast/ToastProvider"

interface CommentFormProps {
  programmId: number
}

const MAX_LENGTH = 300

export default function CommentForm({ programmId }: CommentFormProps) {
  const toast = useToast()

  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const text = comment.trim()

    if (!text) {
      toast.error("Напишите комментарий")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programm_id: programmId,
          comment: text,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Ошибка отправки комментария")
        return
      }

      toast.success("Комментарий опубликован")

      setComment("")
      window.location.reload()
    } catch (error) {
      console.error(error)
      toast.error("Не удалось отправить комментарий")
    } finally {
      setLoading(false)
    }
  }

  const charactersLeft = MAX_LENGTH - comment.length

  return (
    <form onSubmit={handleSubmit} className="w-full">

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all focus-within:border-violet-300 focus-within:shadow-[0_8px_30px_rgba(124,58,237,0.08)]">

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={MAX_LENGTH}
          disabled={loading}
          placeholder="Расскажите, что вы думаете о программе..."
          className="
            min-h-[120px]
            w-full
            resize-none
            bg-transparent
            px-5
            pt-5
            text-[15px]
            leading-7
            text-slate-800
            outline-none
            placeholder:text-slate-400
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">

          <span
            className={`text-xs ${
              charactersLeft <= 30
                ? "text-amber-500"
                : "text-slate-400"
            }`}
          >
            {comment.length} / {MAX_LENGTH}
          </span>

          <button
            type="submit"
            disabled={loading || !comment.trim()}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#7A4385]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:shadow-md
              disabled:translate-y-0
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Отправка...
              </>
            ) : (
              <>
                Опубликовать
                <span className="text-base">→</span>
              </>
            )}
          </button>

        </div>
      </div>

    </form>
  )
}