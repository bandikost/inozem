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
    `SELECT id, name, time, dates, education, specialization, description, video, price
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


export async function putPrograms(program?: {
  name: string;
  time: number;
  dates: string;
  education: string;
  specialization: string;
  isFavorite: number;
  description: string;
  price: number;
}) {
  if (program) {
    const { name, time, dates, education, specialization, isFavorite, description, price } = program;
    const [result] = await db.query(
      `INSERT INTO programms 
        (name, time, dates, education, specialization, isFavorite, description, price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, time, dates, education, specialization, isFavorite, description, price]
    );
    return result;
  }

  const [rows] = await db.query(
    'SELECT id, name, time, dates, education, specialization, isFavorite, description, price FROM programms'
  );
  return rows;
}