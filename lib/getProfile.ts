import { UserRow } from "@/app/interface/user"

export async function getProfile(token: string): Promise<UserRow> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
    headers: {
      Cookie: `token=${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Ошибка получения профиля")
  }

  return res.json()
}