import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

interface UserRow extends RowDataPacket {
  group_user_id: number
  group_name: string
  user_id: number
  first_name: string
  last_name: string
  email: string | null
}

export async function GET(req: Request, { params }: { params: { groupId: string } }) {
  const groupId = parseInt(params.groupId)
  if (isNaN(groupId)) {
    return NextResponse.json({ error: 'Invalid groupId' }, { status: 400 })
  }

  const [rows] = await db.query<UserRow[]>(
    `SELECT gu.id AS group_user_id,
            g.name AS group_name,
            u.id AS user_id,
            u.name AS first_name,
            u.last_name AS last_name,
            u.email
     FROM group_users gu
     JOIN users u ON u.id = gu.user_id
     JOIN groups_programm g ON g.id = gu.group_id
     WHERE gu.group_id = ?`,
    [groupId]
  )

  return NextResponse.json(rows)
}
