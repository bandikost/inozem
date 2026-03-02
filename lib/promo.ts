import { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"

export type Promo = {
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

export async function getPromo(): Promise<Promo[]> {
  const [rows] = await db.query<Promo[] & RowDataPacket[]>(`
    SELECT id, name, promoname, procent, title, suptitle, text, clarification, created_at
    FROM promo
  `)

  return rows
}