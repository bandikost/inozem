import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import { signToken } from "@/lib/tokens/jwt"
import { cookies } from "next/headers"
import { UserRow } from "@/app/interface/user"


interface LoginBody {
  email: string
  password: string
}

export async function POST(req: NextRequest) {
  try {
    const body: LoginBody = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { message: "Почта и пароль авторизированы" },
        { status: 400 }
      )
    }

    const [rows] = await db.query<UserRow[]>(
      "SELECT id, password FROM users WHERE email = ?",
      [email.trim()]
    )

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Неверные учетные данные" },
        { status: 401 }
      )
    }

    const user = rows[0]

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json(
        { message: "Неверные учетные данные" },
        { status: 401 }
      )
    }

    const token = signToken({ id: user.id })

    const cookieStore = await cookies()

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: false, // process.env.NODE_ENV === "production"
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 182,
    })

    return NextResponse.json(
      { message: "Пользователь авторизирован!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Ошибка авторизации:", error)

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
