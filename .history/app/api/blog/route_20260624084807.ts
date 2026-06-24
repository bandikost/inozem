
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { NewsDBRow } from '@/app/interface/newsDB'


export async function GET() {
  try {
    const [rows] = await db.query<NewsDBRow[]>(
      'SELECT id, slug, header, descript, text, date FROM news ORDER BY date DESC'
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
  }
}

