import { NextRequest, NextResponse } from 'next/server'
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

export async function GET(req: NextRequest) {
  // Получаем полный URL
  const url = new URL(req.url)
  // Паттерн: /api/groups/<groupId>/users
  const segments = url.pathname.split('/')
  const groupIdStr = segments[3] // 0:'', 1:'api', 2:'groups', 3:'<groupId>'
  const groupId = parseInt(groupIdStr)

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
