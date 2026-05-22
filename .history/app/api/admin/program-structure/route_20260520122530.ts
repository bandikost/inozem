import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const programId = searchParams.get("programId")

  if (!programId) {
    return NextResponse.json({ blocks: [] })
  }

  const [rows]: any = await db.query(
    `SELECT blocks FROM program_structure WHERE program_id = ?`,
    [programId]
  )

  if (!rows || rows.length === 0) {
    return NextResponse.json({ blocks: [] })
  }

  return NextResponse.json({
    blocks: JSON.parse(rows[0].blocks || "[]"),
  })
}

export async function POST(req: Request) {
  const { programId, blocks } = await req.json()

  if (!programId) {
    return NextResponse.json({ error: "no programId" }, { status: 400 })
  }

  await db.query(
    `
    INSERT INTO program_structure (program_id, blocks)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE blocks = VALUES(blocks)
    `,
    [programId, JSON.stringify(blocks || [])]
  )

  return NextResponse.json({ ok: true })
}