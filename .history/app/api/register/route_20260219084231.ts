import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { signToken } from "@/lib/jwt"
import { cookies } from "next/headers"

interface ExistingUserRow extends RowDataPacket {
  id: number
}

interface RegisterBody {
  name: string
  last_name: string
  patronymic: string
  email: string
  phone: string
  password: string
  education_level: string
  specialization: string
}

export async function POST(req: NextRequest) {
  try {
    const body: RegisterBody = await req.json()

    const {
      name,
      last_name,
      patronymic,
      email,
      phone,
      password,
      education_level,
      specialization
    } = body

    if (!name || !last_name || !patronymic || !email || !phone || !password || !education_level ||
    (education_level !== "без образования" && !specialization)) {
      return NextResponse.json({ message: "Заполните все поля!" }, { status: 400 })
    }

    const [existingUsers] = await db.query<ExistingUserRow[]>(
      "SELECT id FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    )

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: "Данная почта или номер телефона уже зарегистрированы!" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO users 
      (name, last_name, patronymic, email, phone, password, education_level, specialization) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        last_name.trim(),
        patronymic.trim(),
        email.trim(),
        phone.trim(),
        hashedPassword,
        education_level,
        education_level === "none" ? null : specialization,
        specialization,
      ]
    )

    const userId = result.insertId

    const token = signToken({ id: userId })

    const cookieStore = await cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 182,
    })

    return NextResponse.json(
      { message: "Пользователь успешно зарегистрировался" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Register error:", error)

    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    )
  }
}
