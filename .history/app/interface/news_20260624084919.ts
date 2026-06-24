import { RowDataPacket } from "mysql2/promise"

export interface NewsRow {
  id: number
  slug: string
  header: string
  descript: string
  text: string
  date: string
}