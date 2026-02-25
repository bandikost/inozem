import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const specialty = searchParams.get("specialty")

    if (!specialty) {
      return NextResponse.json([])
    }

    const [rows] = await db.execute("SELECT stage, date, timestart FROM accred WHERE specialty = ? ORDER BY date ASC", [specialty])

    return NextResponse.json(rows)

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    )
  }
}
