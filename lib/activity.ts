import { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { Activity } from "@/app/interface/activity"

export async function getActivity(): Promise<Activity[]> {
  const [rows] = await db.query<Activity[] & RowDataPacket[]>(`
    SELECT id, name, slug, title, description, teacher, purpose, audience, conditions, dates, title_bg, teacher_img, created_at
    FROM activity
    ORDER BY created_at DESC
  `)

  return rows
}