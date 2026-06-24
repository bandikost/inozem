
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { NewsRow } from '@/app/interface/news'


export async function GET() {
  try {
    const [rows] = await db.query<NewsRow[]>(
      'SELECT num, title, text, created_at FROM news ORDER BY created_at DESC'
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
  }
}

