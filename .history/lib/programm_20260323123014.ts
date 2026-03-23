import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

export interface ProgramRow extends RowDataPacket {
  id: number
  name: string
  time: string
  education: string
  specialization: string
  dates: string
  isFavorite?: boolean
  price: string
  created_at: string
}

let cachedPrograms: ProgramRow[] | null = null
let cacheTime = 0

export async function getPrograms(): Promise<ProgramRow[]> {
  const now = Date.now()

  if (cachedPrograms && now - cacheTime < 30_000) {
    return cachedPrograms
  }

  const [rows] = await db.query<ProgramRow[]>(
    'SELECT id, name, time, dates, education, specialization, isFavorite, description, price FROM programms'
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

  return rows[0] || null
}


export async function getIndividProgram(userId: number): Promise<ProgramRow[]> {
  await db.query(
    `DELETE up FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ?
       AND up.status = 'active'
       AND up.created_at < NOW() - INTERVAL 
         CASE 
           WHEN p.time < 71 THEN 1 MONTH
           WHEN p.time < 143 THEN 2 MONTH
           WHEN p.time < 287 THEN 3 MONTH
           WHEN p.time < 500 THEN 12 MONTH
           ELSE 12 MONTH
         END`,
    [userId]
  )

  const [rows] = await db.query<ProgramRow[]>(
    `SELECT 
       p.id,
       p.name,
       p.dates,
       p.price,
       p.time,
       up.created_at
     FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ?
       AND up.status = 'active'
       AND up.created_at >= NOW() - INTERVAL
         CASE 
           WHEN p.time < 71 THEN 1 MONTH
           WHEN p.time < 143 THEN 2 MONTH
           WHEN p.time < 287 THEN 3 MONTH
           WHEN p.time < 500 THEN 12 MONTH
           ELSE 12 MONTH
         END`,
    [userId]
  )

  return rows
}


export async function hasUserProgram(userId: number, programId: number): Promise<boolean> {

 const [rows]: any = await db.query(
    `SELECT id
     FROM user_programs
     WHERE user_id = ?
     AND programm_id = ?
     AND status = 'active'
     AND created_at >= NOW() - INTERVAL 1 MINUTE
     LIMIT 1`,
    [userId, programId]
  )

  await db.query(
    `DELETE FROM user_programs
     WHERE user_id = ?
     AND programm_id = ?
     AND created_at < NOW() - INTERVAL 1 MINUTE`,
    [userId, programId]
  )

  return (rows as any[]).length > 0
}


