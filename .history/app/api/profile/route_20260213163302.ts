import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { db } from "@/lib/db"
import { UserRow } from "@/app/types/user"

interface JwtPayload {
  id: number
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value

    if (!token) return NextResponse.json({ message: "Не авторизован!" }, { status: 401 })

    let decoded: JwtPayload
    try {
      decoded = verifyToken(token) as JwtPayload
    } catch {
      return NextResponse.json({ message: "Не авторизован!" }, { status: 401 })
    }

    const [rows] = await db.query<UserRow[]>(
      "SELECT id, name, last_name, patronymic, email, phone, isTeacher, photo_url, created_at FROM users WHERE id = ?",
      [decoded.id]
    )

    if (rows.length === 0) return NextResponse.json({ message: "Пользователь не найден" }, { status: 404 })

    const user = rows[0]

    return NextResponse.json({
      ...user,
      isTeacher: user.isTeacher === 1,
      created_at: user.created_at.toISOString(),
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 })
  }
}
