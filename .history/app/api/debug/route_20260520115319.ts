import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")

  const [rows]: any = await db.query(
    `SELECT id, name, slug FROM programms WHERE slug = ?`,
    [slug]
  )

  return NextResponse.json({
    input: slug,
    result: rows,
  })
}