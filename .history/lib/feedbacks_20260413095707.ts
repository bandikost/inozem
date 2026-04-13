import { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { Feedback } from "@/app/types/feedback"

export async function getFeedback(): Promise<Feedback[]> {
    
  const [rows] = await db.query<Feedback[] & RowDataPacket[]>(`
    SELECT id, user_id, name, last_name, patronymic, rate, user_text, created_at, answer
    FROM feedbacks
    ORDER BY created_at DESC
  `)

  return rows
}
