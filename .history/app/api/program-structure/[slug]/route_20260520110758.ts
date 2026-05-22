import { db } from "@/lib/db"

export async function GET() {
  const result = await db.query(
    `SELECT slug FROM program_structure`
  )

  return Response.json({
    result
  })
}