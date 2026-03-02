import { NextResponse } from "next/server"
import { getPromo } from "@/lib/promo"

export async function GET() {
  try {
    const rows = await getPromo()
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 })
  }
}