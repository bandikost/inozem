import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

interface GroupRow extends RowDataPacket {
  id: number
  name: string
}

export async function GET(req: Request, { params }: { params: { programId: string } }) {
  const programId = parseInt(params.programId)
  if (isNaN(programId)) {
    return NextResponse.json({ error: 'Invalid programId' }, { status: 400 })
  }

  const [rows] = await db.query<GroupRow[]>(
    'SELECT id, name FROM groups_programm WHERE programm_id = ?',
    [programId]
  )

  return NextResponse.json(rows)
}
