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
      <button onClick={handleLogout} className="cursor-pointer bg-red-500 flex p-8 border border-gray-300 justify-center w-1/2 text-2xl rounded-md items-center text-center hover:opacity-70 shadow-2xl">
        Выйти <LogOut className="text-white" size={20} />
      </button>

     
    </>
  )
}