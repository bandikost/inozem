import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      name,
      slug,
      title,
      description,
      teacher,
      purpose,
      conditions,
      audience,
      dates,
      year,
      paylink,
      teacher_img,
      title_bg,
      content,
    } = body

    if (!name || !slug) {
      return NextResponse.json(
        {
          error: "Название программы и slug обязательны",
        },
        { status: 400 }
      )
    }

    const [result] = await db.execute(
      `
      INSERT INTO programs (
        name,
        slug,
        title,
        description,
        teacher,
        purpose,
        conditions,
        audience,
        dates,
        year,
        paylink,
        teacher_img,
        title_bg,
        content
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        slug,
        title || null,
        description || null,
        teacher || null,
        purpose || null,
        conditions || null,
        audience || null,
        dates || null,
        year || null,
        paylink || null,
        teacher_img || null,
        title_bg || null,
        content || null,
      ]
    )

    return NextResponse.json(
      {
        success: true,
        id: (result as any).insertId,
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error("PROGRAM CREATE ERROR:", error)

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        {
          error: "Программа с таким slug уже существует",
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        error: "Ошибка при создании программы",
      },
      { status: 500 }
    )
  }
}