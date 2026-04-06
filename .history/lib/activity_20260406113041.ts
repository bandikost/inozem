import { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { Activity } from "./types"

export async function getActivity(): Promise<Activity[]> {
  const [rows] = await db.query<Activity[] & RowDataPacket[]>(`
    SELECT id, name, slug, title, description, teacher, purpose, audience, conditions, dates, created_at
    FROM activity
    ORDER BY created_at DESC
  `)

  return rows
}