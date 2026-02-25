import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {

    const [rows] = await db.execute("SELECT stage, specialty, date, timestart FROM accred ORDER BY date ASC")

    return NextResponse.json(rows)

  } catch {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    )
  }
}
