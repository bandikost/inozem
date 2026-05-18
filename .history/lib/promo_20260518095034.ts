
import { Promo } from "@/app/interface/promo"
import { db } from "@/lib/db"

export async function getPromo(): Promise<Promo[]> {
  const [rows] = await db.query<Promo[]>(`
    SELECT id, name, promoname, procent, title, suptitle, text, clarification, created_at
    FROM promo
  `)

  return rows
}