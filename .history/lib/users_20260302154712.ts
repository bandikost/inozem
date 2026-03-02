import { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"

export type Teacher = {
  id: number
  name: string
  last_name: string
  photo_url: string
  isTeacher?: boolean
  education_level: string
  specialization: string
  Teacher_text: string
}

export async function getTeachers(): Promise<Teacher[]> {
  const [rows]: [Teacher[] & RowDataPacket[], any] = await db.query(
    `SELECT id, name, last_name, education_level, specialization, Teacher_text, photo_url, isTeacher
     FROM users
     WHERE isTeacher = 1 AND isRated = 1`
  );
  return rows
}