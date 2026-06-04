import { cache } from "react"
import { UserRow } from "@/app/interface/user"

export const getProfile = cache(async (token: string): Promise<UserRow> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store", 
  })

  if (!res.ok) {
    throw new Error("Ошибка получения профиля")
  }

  return res.json()
})