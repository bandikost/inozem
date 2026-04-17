import { RowDataPacket } from "mysql2"

export interface Promo extends RowDataPacket {
  id: number
  name: string
  promoname: string
  procent: number
  title: string
  suptitle: string
  text: string
  clarification: string
  created_at: string
}

