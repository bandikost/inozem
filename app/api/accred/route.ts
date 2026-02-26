import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const specialty = searchParams.get("specialty")
    const year = searchParams.get("year")

    if (!specialty || !year) {
      return NextResponse.json([])
    }

    const [rows] = await db.execute(`
  SELECT  id, stage, specialty, date, timestart, file_urls, protocol FROM accred WHERE specialty = ? AND YEAR(date) = ?`, [specialty, year])



    return NextResponse.json(rows)

  } catch {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    )
  }
}
