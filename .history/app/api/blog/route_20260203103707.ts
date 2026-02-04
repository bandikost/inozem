import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

type NewsRow = RowDataPacket & {
  id: number
  title: string
  text: string
  created_at: Date
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const {id} = params
  try {
    const [rows] = await db.query<NewsRow[]>(
      'SELECT id, title, created_at FROM news ORDER BY created_at DESC'
    )

    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
  }
}
