'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface Props {
  searchParams: {
    userId?: string
    programId?: string
  }
}

export default function SuccessPage({ searchParams }: Props) {
  const router = useRouter()
  const userId = Number(searchParams.userId)
  const programId = Number(searchParams.programId)

  useEffect(() => {
    if (!userId || !programId) return

    fetch("/api/user-program", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId, programId })
    })
      .then(res => {
        if (!res.ok) throw new Error("Ошибка назначения")
        alert("Программа назначена ✅")
        router.push(`/programs/${programId}`)
      })
      .catch(err => {
        console.error(err)
        alert("Ошибка выдачи программы")
      })
  }, [userId, programId, router])

  return (
    <div className="mt-20 text-center">
      Оплата выполнена. Ожидаем подтверждение…
    </div>
  )
}