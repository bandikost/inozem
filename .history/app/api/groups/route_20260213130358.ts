import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

interface GroupRow extends RowDataPacket {
  id: number
  name: string
}

export async function GET() {
  const [rows] = await db.query<GroupRow[]>('SELECT id, name FROM groups_programm')
  return NextResponse.json(rows)
}
