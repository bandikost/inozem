"use client"

import { delay } from "@/lib/delay"
import LoadingOverlay from "@/components/ui/LoadingOverlay"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true) 

    try {
      await delay(99990) 

      const res = await fetch("/api/logout", {
        method: "POST",
      })

      if (!res.ok) throw new Error("Failed to logout")

      await delay(1000)

      router.push("/login")
    } catch (err) {
      console.error(err)
      alert("Ошибка при выходе")
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={handleLogout}
        className="mt-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer text-lg w-full"
      >
        Выйти
      </button>

      <LoadingOverlay loading={loading} />
    </>
  )
}