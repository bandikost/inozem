
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { NewsRow } from '@/app/interface/news'


export async function GET() {
  try {
    const [rows] = await db.query<NewsRow[]>(
      'SELECT id, slug, header, descript, text, date FROM news ORDER BY date DESC'
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
  }
}

