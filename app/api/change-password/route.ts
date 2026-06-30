import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { JwtPayload } from "jsonwebtoken"

import { db } from "@/lib/db"
import { verifyToken } from "@/lib/tokens/jwt"

export async function POST(req: NextRequest) {
  try {
    const { oldPassword, newPassword } = await req.json()

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { message: "Заполните все поля" },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "Пароль должен содержать минимум 6 символов" },
        { status: 400 }
      )
    }

    if (oldPassword === newPassword) {
      return NextResponse.json(
        { message: "Новый пароль должен отличаться от текущего" },
        { status: 400 }
      )
    }

    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "Вы не авторизованы" },
        { status: 401 }
      )
    }

    const payload = verifyToken(token) as JwtPayload & { id: number }

    const [rows]: any = await db.query(
      "SELECT password FROM users WHERE id = ?",
      [payload.id]
    )

    if (!rows.length) {
      return NextResponse.json(
        { message: "Пользователь не найден" },
        { status: 404 }
      )
    }

    const user = rows[0]

    const passwordCorrect = await bcrypt.compare(
      oldPassword,
      user.password
    )

    if (!passwordCorrect) {
      return NextResponse.json(
        { message: "Текущий пароль введён неверно" },
        { status: 400 }
      )
    }

    const hash = await bcrypt.hash(newPassword, 12)

    await db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hash, payload.id]
    )

    return NextResponse.json({
      message: "Пароль успешно изменён",
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    )
  }
}