import { RowDataPacket } from "mysql2"

export type Activity = {
  id: number
  name: string
  slug: string
  title: string
  description: string
  teacher: string
  purpose: string
  audience: string
  conditions: string
  dates: string
  created_at: string
  title_bg: string
  title_img: string
}