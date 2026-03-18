import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (
    email === process.env.MANAGER_LOGIN &&
    password === process.env.MANAGER_PASSWORD
  ) {
    const res = NextResponse.json({ ok: true })

    res.cookies.set("manager", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    })

    return res
  }

  return NextResponse.json(
    { error: "Неверные данные" },
    { status: 401 }
  )
}