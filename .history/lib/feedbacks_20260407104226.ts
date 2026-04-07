import { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { Feedback } from "@/app/types/feedback"

export async function getActivity(): Promise<Feedback[]> {
  const [rows] = await db.query<Feedback[] & RowDataPacket[]>(`
    SELECT id, user_id, name, last_name, patronymic, rate, created_at
    FROM feedbacks
    ORDER BY created_at DESC
  `)

  return rows
}