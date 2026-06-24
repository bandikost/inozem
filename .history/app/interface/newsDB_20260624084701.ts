import { RowDataPacket } from "mysql2/promise"

export interface NewsDBRow extends RowDataPacket {
  id: number
  slug: string
  header: string
  descript: string
  text: string
  date: string
}