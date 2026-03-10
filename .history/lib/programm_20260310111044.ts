import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

interface ProgramRow extends RowDataPacket {
  id: number
  name: string
  time: number
  education: string
  specialization: string
  dates: string
  description: string
}

let cachedPrograms: ProgramRow[] | null = null
let cacheTime = 0

export async function getPrograms(id: number): Promise<ProgramRow[]> {
  const now = Date.now()

  if (cachedPrograms && now - cacheTime < 30_000) {
    return cachedPrograms
  }

  const [rows] = await db.query<ProgramRow[]>(
    'SELECT id, name, time, dates, education, specialization, description FROM programms WHERE id = ?',
    [id]
  )

  cachedPrograms = rows
  cacheTime = now

  return rows
}