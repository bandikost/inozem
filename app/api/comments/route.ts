import { db } from "@/lib/db"
import { ResultSetHeader } from "mysql2"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getProfile } from "@/lib/getProfile"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { programm_id, comment } = body


    if (!comment || !comment.trim()) {
      return NextResponse.json(
        { error: "Комментарий не может быть пустым" },
        { status: 400 }
      )
    }

    if (comment.length > 300) {
      return NextResponse.json(
        { error: "Комментарий слишком длинный" },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Необходимо авторизоваться" },
        { status: 401 }
      )
    }

    const user = await getProfile(token)


    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO comments (programm_id, name, last_name, patronymic, comment) VALUES (?, ?, ?, ?, ?)`,
      [programm_id, user.name, user.last_name, user.patronymic || null, comment.trim()]
    )

    return NextResponse.json(
      { id: result.insertId },
      { status: 201 }
    )

  } catch (err) {
    console.error("COMMENT ERROR:", err)

    return NextResponse.json(
      {
        error: "Ошибка сервера",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    )
  }
}