import { UserRow } from "@/app/interface/user"
import { RowDataPacket } from "mysql2/promise"
import { db } from "../db"

export async function getProfileByToken(token: string): Promise<UserRow | null> {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT id, name, last_name, patronymic, email, phone, specialization, education_level, password, isTeacher, isAdmin, photo_url, created_at, program_name
     FROM users
     WHERE token = ?
     LIMIT 1`,
    [token]
  )

  return rows[0] as UserRow || null
}