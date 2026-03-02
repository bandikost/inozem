import { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"

export type Teacher = {
  id: number
  name: string
  last_name: string
  photo_url: string
  isTeacher?: boolean
}

export async function getTeachers(): Promise<Teacher[]> {
  const [rows] = await db.query<Teacher[] & RowDataPacket[]>
  (` SELECT id, name, last_name, photo_url, isTeacher FROM users WHERE isTeacher AND isRated = 1`)

  return rows
}