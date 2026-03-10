import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

interface ProgramRow extends RowDataPacket {
  id: number
  name: string
  time: number
  education: string
  specialization: string
  dates: string
  isFavorite?: boolean
}

let cachedPrograms: ProgramRow[] | null = null
let cacheTime = 0

export async function getPrograms(): Promise<ProgramRow[]> {
  const now = Date.now()

  if (cachedPrograms && now - cacheTime < 30_000) {
    return cachedPrograms
  }

  const [rows] = await db.query<ProgramRow[]>(
    'SELECT id, name, time, dates, education, specialization, isFavorite FROM programms'
  )

  cachedPrograms = rows
  cacheTime = now

  return rows
}


export async function getProgram(id: number): Promise<ProgramRow | null> {

  if (!Number.isInteger(id)) {
    return null
  } 

  const [rows] = await db.query<ProgramRow[]>(
    `SELECT id, name, time, dates, education, specialization, description, price
     FROM programms
     WHERE id = ?`,
    [id]
  )
  
  if (!rows.length) return null

  return rows[0]
}