import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

interface ProgramRow extends RowDataPacket {
  id: number
  name: string
}

export async function GET() {
  const [rows] = await db.query<ProgramRow[]>('SELECT id, name FROM programm')
  return NextResponse.json(rows)
}
