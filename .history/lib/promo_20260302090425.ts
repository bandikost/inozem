import { db } from "@/lib/db"

export async function getPromo() {
  const [rows] = await db.query(`
    SELECT id, name, promoname, procent, title, suptitle, text, clarification, created_at
    FROM promo
  `)

  return rows
}