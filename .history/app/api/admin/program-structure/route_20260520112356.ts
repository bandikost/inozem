import { db } from "@/lib/db"
import { NextResponse } from "next/server"


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


export async function POST(req: Request) {
  const body = await req.json()

  const { programId, blocks } = body

  if (!programId) {
    return NextResponse.json({ error: "programId required" }, { status: 400 })
  }

  await db.query(
    `
    INSERT INTO program_structure (program_id, blocks)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE blocks = VALUES(blocks)
    `,
    [programId, JSON.stringify(blocks)]
  )

  return NextResponse.json({ ok: true })
}