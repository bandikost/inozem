import { NewsDBRow } from "@/app/interface/newsDB"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const [rows] = await db.query<NewsDBRow[]>(
      `SELECT id, slug, header, descript, text, date
       FROM news
       WHERE slug = ?
       LIMIT 1`,
      [params.slug]
    )

    const news = rows[0]

    if (!news) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    )
  }
}