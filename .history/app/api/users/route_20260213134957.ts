import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const [rows] = await db.query("SELECT id, name, last_name, patronymic, email, phone, photo_url, isTeacher, created_at FROM users")
    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 })
  }
}

