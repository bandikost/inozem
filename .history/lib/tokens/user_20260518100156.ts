import { UserRow } from "@/app/interface/user"
import { db } from "@/lib/db"

export async function getProfileByToken(token: string): Promise<UserRow | null> {
  const [rows] = await db.query<UserRow[]>(
    `SELECT id, name, last_name, patronymic, email, phone, specialization, education_level, password, isTeacher, isAdmin, photo_url, created_at
     FROM users LIMIT 1`,
    [token]
  )

  return rows[0] || null
}