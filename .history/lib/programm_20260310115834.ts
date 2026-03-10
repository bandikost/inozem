import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'
import { NextResponse } from 'next/server'

interface ProgramRow extends RowDataPacket {
  id: number
  name: string
  time: number
  education: string
  specialization: string
  dates: string
}

let cachedPrograms: ProgramRow[] | null = null
let cacheTime = 0

export async function getPrograms(): Promise<ProgramRow[]> {
  const now = Date.now()

  if (cachedPrograms && now - cacheTime < 30_000) {
    return cachedPrograms
  }

  const [rows] = await db.query<ProgramRow[]>(
    'SELECT id, name, time, dates, education, specialization FROM programms'
  )

  cachedPrograms = rows
  cacheTime = now

  return rows
}


export async function getProgram(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const { id } = await params

  try {
    const [rows] = await db.query<ProgramRow[]>(
      'SELECT id, title, text, created_at FROM news WHERE id = ?',
      [id]
    )

    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
  }
}
