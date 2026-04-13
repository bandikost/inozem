import { RowDataPacket } from "mysql2"

export type Feedback = {
  id: number
  user_id: number
  name: string
  last_name: string
  patronymic: string
  user_text: string
  rate: number
  created_at: string
  answer: string
}