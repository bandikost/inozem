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
  price: string
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

  return rows[0]
}


export async function getIndividProgram(userId: number): Promise<ProgramRow[]> {

  const [rows] = await db.query<ProgramRow[]>(
    `SELECT 
      p.id,
      p.name,
      p.dates,
      p.price
     FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ?`,
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
     AND created_at >= NOW() - INTERVAL 1 YEAR
     LIMIT 1`,
    [userId, programId]
  )

  await db.query(
    `DELETE FROM user_programs
     WHERE user_id = ?
     AND programm_id = ?
     AND created_at < NOW() - INTERVAL 1 YEAR`,
    [userId, programId]
  )

  return (rows as any[]).length > 0
}


function groupData(rows: any[]) {
  const map = new Map()

  for (const row of rows) {
    if (!map.has(row.section_id)) {
      map.set(row.section_id, {
        id: row.section_id,
        title: row.section_title,
        items: []
      })
    }

    if (row.item_id) {
      map.get(row.section_id).items.push({
        id: row.item_id,
        title: row.item_title,
        type: row.type,
        content: row.content
      })
    }
  }

  return Array.from(map.values())
}

export async function getProgramContent(programId: number) {
  const [rows]: any = await db.query(
    `
    SELECT 
      s.id AS section_id,
      s.title AS section_title,
      s.sort_order,
      i.id AS item_id,
      i.title AS item_title,
      i.type,
      i.content,
      i.sort_order AS item_order
    FROM programs_sections s
    LEFT JOIN programs_items i ON i.section_id = s.id
    WHERE s.program_id = ?
    ORDER BY s.sort_order, i.sort_order
    `,
    [programId]
  )

  return groupData(rows)
}