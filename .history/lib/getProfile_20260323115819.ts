export interface User {
  id: number
  name: string
  last_name: string
  patronymic: string | null
  education_level: string
  specialization?: string
  email: string
  phone: string
  isTeacher: boolean
  photo_url: string | null
  created_at: string
  isAdmin: boolean
}

export async function getProfile(token: string): Promise<User> {
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
}