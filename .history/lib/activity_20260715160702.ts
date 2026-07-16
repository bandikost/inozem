import { RowDataPacket } from "mysql2/promise"
import { db } from "@/lib/db"
import { Activity } from "@/app/interface/activity"


export async function getActivity(): Promise<Activity[]> {
  const [rows] = await db.query<Activity[] & RowDataPacket[]>(`
    SELECT id, name, slug, title, description, teacher, purpose, audience, conditions, dates, year, paylink, title_bg, teacher_img, created_at
    FROM activity
    ORDER BY created_at DESC
  `)

  return rows
}

export async function getActivityBySlug(slug: string) { 
  const [rows] = await db.execute(`SELECT * FROM activity WHERE slug = ? LIMIT 1 `, [slug] 

  ) 
  return (rows as any[])[0] ?? null
}