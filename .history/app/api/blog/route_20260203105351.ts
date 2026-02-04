import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

type NewsRow = RowDataPacket & {
  id: number
  title: string
  created_at: string
}

export async function GET() {
  try {
    const [rows] = await db.query<NewsRow[]>(
      'SELECT id, title, created_at FROM news ORDER BY created_at DESC'
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
  }
}
