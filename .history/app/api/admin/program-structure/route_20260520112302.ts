import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const programId = searchParams.get("programId")

  if (!programId) {
    return NextResponse.json({ error: "programId required" }, { status: 400 })
  }

  const [rows]: any = await db.query(
    `SELECT blocks FROM program_structure WHERE program_id = ?`,
    [programId]
  )

  const blocks = rows?.[0]?.blocks ? JSON.parse(rows[0].blocks) : []

  return NextResponse.json({ blocks })
}