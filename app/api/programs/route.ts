import { NextResponse } from "next/server"
import { getPrograms } from "@/lib/programm"

export async function GET() {
  try {
    const rows = await getPrograms()
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 })
  }
}