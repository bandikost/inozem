import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface GroupRow {
  id: number
  name: string
}

export async function GET() {
  const [rows] = await db.query<GroupRow[]>('SELECT id, name FROM groups_programm')
  return NextResponse.json(rows)
}
