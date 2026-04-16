import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { signToken } from "@/lib/jwt"
import { cookies } from "next/headers"
import { sendWelcomeEmail } from "@/lib/mail"

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
  captcha?: string
}

export async function POST(req: NextRequest) {
  console.log("🚀 STEP 1: API HIT")

  try {
    const body: RegisterBody = await req.json()
    console.log("📦 STEP 2: BODY PARSED")

    const {
      name,
      last_name,
      patronymic,
      email,
      phone,
      password,
      education_level,
      specialization,
      captcha
    } = body

    console.log("🧾 STEP 3: DATA EXTRACTED", { email, phone })

    if (!name || !last_name || !email || !phone || !password) {
      console.log("❌ STEP 4: VALIDATION FAIL")
      return NextResponse.json({ message: "Вы заполнили не все поля" }, { status: 400 })
    }

    if (!captcha) {
      console.log("❌ STEP 5: CAPTCHA EMPTY")
      return NextResponse.json({ message: "Подтвердите капчу" }, { status: 400 })
    }

    console.log("🔐 STEP 6: ENV CHECK", {
      secretExists: !!process.env.YANDEX_CAPTCHA_SECRET,
    })

    console.log("🪪 STEP 7: TOKEN LENGTH", captcha.length)

    let captchaRes

    try {
      console.log("🌐 STEP 8: FETCH CAPTCHA START")

      captchaRes = await fetch(
        "https://smartcaptcha.yandexcloud.net/validate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            secret: process.env.YANDEX_CAPTCHA_SECRET!,
            token: captcha,
          }),
        }
      )

      console.log("🌐 STEP 9: FETCH DONE", captchaRes.status)

    } catch (e) {
      console.log("💥 STEP 8 ERROR: CAPTCHA FETCH FAILED", e)
      throw e
    }

    const text = await captchaRes.text()
    console.log("📨 STEP 10: YANDEX RESPONSE:", text)

    const isOk = text.includes("ok=1")

    if (!isOk) {
      console.log("❌ STEP 11: CAPTCHA FAIL")
      return NextResponse.json({ message: "Капча не пройдена" }, { status: 403 })
    }

    console.log("✅ STEP 12: CAPTCHA OK")

    const [existingUsers] = await db.query<ExistingUserRow[]>(
      "SELECT id FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    )

    console.log("🗄 STEP 13: DB CHECK DONE", existingUsers.length)

    if (existingUsers.length > 0) {
      console.log("❌ STEP 14: USER EXISTS")
      return NextResponse.json(
        { message: "Данная почта или номер телефона уже зарегистрированы!" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("🔑 STEP 15: PASSWORD HASHED")

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
      ]
    )

    console.log("🆔 STEP 16: USER CREATED", result.insertId)

    setTimeout(() => {
      console.log("📧 STEP 17: SENDING EMAIL")
      sendWelcomeEmail(email, name)
    }, 0)

    const token = signToken({ id: result.insertId })
    console.log("🎟 STEP 18: TOKEN CREATED")

    const cookieStore = await cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 182,
    })

    console.log("🍪 STEP 19: COOKIE SET")

    return NextResponse.json(
      { message: "Пользователь успешно зарегистрировался" },
      { status: 201 }
    )

  } catch (error) {
    console.error("💥 GLOBAL ERROR:", error)

    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    )
  }
}