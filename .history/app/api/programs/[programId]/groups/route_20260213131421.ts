import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

interface GroupRow extends RowDataPacket {
  id: number
  name: string
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const segments = url.pathname.split('/')
  const programIdStr = segments[3] 
  const programId = parseInt(programIdStr)

  if (isNaN(programId)) {
    return NextResponse.json({ error: 'Invalid programId' }, { status: 400 })
  }

  const [rows] = await db.query<GroupRow[]>(
    'SELECT id, name FROM groups_programm WHERE programm_id = ?',
    [programId]
  )

  return NextResponse.json(rows)
}
