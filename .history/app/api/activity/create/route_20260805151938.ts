import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      name,
      slug,
      price,
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
      attendance_control,
      location,
      planned_results
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
      INSERT INTO activity (
        name,
        slug,
        price,
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
        attendance_control,
        location,
        planned_results
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        slug,
        price ?? 0,
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
        attendance_control || null,
        location || null,
        planned_results || null
      ]
    )

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
    })

  } catch (error: any) {
    console.error("PROGRAM CREATE ERROR:", error)

    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
      },
      { status: 500 }
    )
  }
}