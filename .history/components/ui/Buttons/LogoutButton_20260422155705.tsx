"use client"

import { useLoadingStore } from "@/components/Load/loadingStore"
import { delay } from "@/lib/delay"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"


export default function LogoutButton() {
  const router = useRouter()
  const show = useLoadingStore((s) => s.show)
  const hide = useLoadingStore((s) => s.hide)
  
  async function handleLogout() {

    try {
      show()
      const res = await fetch("/api/logout", {
        method: "POST",
      })

      if (!res.ok) throw new Error("Failed to logout")

      await delay(1500)
      hide()
      router.push("/login")
      
    } catch (err) {
      console.error(err)
      alert("Ошибка при выходе")
    }
  }

  return (
    <>
      <button onClick={handleLogout} className="mt-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer text-lg w-full flex items-center gap-6">
        Выйти <LogOut className="text-white" />
      </button>

     
    </>
  )
}