import { db } from '@/lib/db'
import { RowDataPacket } from 'mysql2'

export interface ProgramRow extends RowDataPacket {
  id: number
  name: string
  time: number
  education: string
  specialization: string
  dates: string
  isFavorite?: boolean
  bannerName: string
  price: string
  created_at: string
  slug: string
}

let cachedPrograms: ProgramRow[] | null = null
let cacheTime = 0

export async function getPrograms(): Promise<ProgramRow[]> {
  const now = Date.now()

  if (cachedPrograms && now - cacheTime < 30_000) {
    return cachedPrograms
  }

  const [rows] = await db.query<any[]>(
    `SELECT id, name, slug, time, dates, education, specialization, isFavorite, bannerName, description, price 
     FROM programms`
  )

  const parsed = rows.map((p) => {
    let time: number[] = []

    return {
      ...p,
      time,
    }
  })

  cachedPrograms = parsed
  cacheTime = now

  return parsed
}


export async function getProgram(id: number): Promise<ProgramRow | null> {

  if (!Number.isInteger(id)) {
    return null
  } 

  const [rows] = await db.query<ProgramRow[]>(
    `SELECT id, name, time, dates, education, specialization, description, price, slug, bannerName
     FROM programms
     WHERE id = ?`,
    [id]
  )
  
  if (!rows.length) return null

  return rows[0] || null
}

export async function getProgramBySlug(slug: string): Promise<ProgramRow | null> {
  const [rows] = await db.query<ProgramRow[]>(
    `SELECT id, name, slug, time, dates, education, specialization, description, price, bannerName
     FROM programms
     WHERE slug = ?`,
    [slug]
  )

   if (!rows.length) return null
  return rows[0] || null
}


export async function getIndividProgram(userId: number): Promise<ProgramRow[]> {
  await db.query(
    `DELETE up FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ? AND up.status = 'active' AND p.time < 71 AND up.created_at < NOW() - INTERVAL 1 MONTH`,
    [userId]
  )

  await db.query(
    `DELETE up FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ? AND up.status = 'active' AND p.time >= 71 AND p.time < 143 AND up.created_at < NOW() - INTERVAL 2 MONTH`,
    [userId]
  )

  await db.query(
    `DELETE up FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ? AND up.status = 'active' AND p.time >= 143 AND p.time < 287 AND up.created_at < NOW() - INTERVAL 3 MONTH`,
    [userId]
  )

  await db.query(
    `DELETE up FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ? AND up.status = 'active' AND p.time >= 287 AND p.time < 500 AND up.created_at < NOW() - INTERVAL 12 MONTH`,
    [userId]
  )

  const [rows] = await db.query<ProgramRow[]>(
    `SELECT 
       p.id,
       p.name,
       p.dates,
       p.price,
       p.time,
       p.slug,
       up.created_at
     FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ? AND up.status = 'active'
     ORDER BY up.created_at DESC`,
    [userId]
  )

  return rows
}


export async function hasUserProgram(userId: number, programId: number): Promise<boolean> {
  const [rows]: any = await db.query(
    `SELECT up.id
     FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ?
       AND up.programm_id = ?
       AND up.status = 'active'
       AND (
         (p.time < 71 AND up.created_at >= NOW() - INTERVAL 1 MONTH) OR
         (p.time >= 71 AND p.time < 143 AND up.created_at >= NOW() - INTERVAL 2 MONTH) OR
         (p.time >= 143 AND p.time < 287 AND up.created_at >= NOW() - INTERVAL 3 MONTH) OR
         (p.time >= 287 AND up.created_at >= NOW() - INTERVAL 12 MONTH)
       )
     LIMIT 1`,
    [userId, programId]
  )

  return rows.length > 0
}