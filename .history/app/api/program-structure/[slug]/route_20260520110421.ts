import { db } from "@/lib/db"

export async function GET() {
  const [rows]: any = await db.query(
    `SELECT id, slug FROM program_structure`
  )

  return Response.json({
    allRows: rows
  })
}