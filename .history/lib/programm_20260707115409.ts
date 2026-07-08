import { db } from "@/lib/db"
import { RowDataPacket } from "mysql2/promise"


export interface ProgramRow extends RowDataPacket {
  id: number
  name: string
  time: number
  time_secondary: number
  education: string
  specialization: string
  dates: string
  isFavorite?: boolean
  bannerName: string
  price: string
  category: string
  created_at: string
  slug: string
}

type ProgramStructureRow = RowDataPacket & {
  blocks: string
}


const CACHE_TTL = 60_000


let programsCache: ProgramRow[] | null = null
let programsCacheTime = 0

export async function getPrograms(): Promise<ProgramRow[]> {
  const now = Date.now()
  await cleanOldDates()


  if (programsCache && now - programsCacheTime < CACHE_TTL) {
    return programsCache
  }

  const [rows] = await db.query<ProgramRow[]>(
    `SELECT id, name, slug, time, time_secondary, dates, education,
            specialization, isFavorite, bannerName, description, price, category
     FROM programms`
  )

  programsCache = rows
  programsCacheTime = now

  return rows
}

export async function cleanOldDates() {

  const [rows] = await db.query<any[]>(
    `
    SELECT id, dates
    FROM programms
    `
  )


  for (const program of rows) {

    const filtered = program.dates
      .split("\n")
      .filter((date:string)=>{

        const endDate = date.split("-")[1].trim()

        const [day,month,year] = endDate.split(".")

        return new Date(
          Number(year),
          Number(month)-1,
          Number(day)
        ) >= new Date()

      })
      .join("\n")


    if(filtered !== program.dates){

      await db.query(
        `
        UPDATE programms
        SET dates = ?
        WHERE id = ?
        `,
        [
          filtered,
          program.id
        ]
      )

    }

  }

}

const programByIdCache = new Map<number, ProgramRow>()
const programByIdTime = new Map<number, number>()

export async function getProgram(id: number): Promise<ProgramRow | null> {
  if (!Number.isInteger(id)) return null

  const now = Date.now()

  const cached = programByIdCache.get(id)
  const cachedTime = programByIdTime.get(id) ?? 0

  if (cached && now - cachedTime < CACHE_TTL) {
    return cached
  }

  const [rows] = await db.query<ProgramRow[]>(
    `SELECT id, name, time, dates, education, specialization,
            description, price, category, slug, bannerName
     FROM programms
     WHERE id = ?`,
    [id]
  )

  if (!rows.length) return null

  programByIdCache.set(id, rows[0])
  programByIdTime.set(id, now)

  return rows[0]
}


const programBySlugCache = new Map<string, ProgramRow>()
const programBySlugTime = new Map<string, number>()

export async function getProgramBySlug(slug: string): Promise<ProgramRow | null> {
  const now = Date.now()

  const cached = programBySlugCache.get(slug)
  const cachedTime = programBySlugTime.get(slug) ?? 0

  if (cached && now - cachedTime < CACHE_TTL) {
    return cached
  }

  const [rows] = await db.query<ProgramRow[]>(
    `SELECT id, name, slug, time, dates, education,
            specialization, description, price, category, bannerName
     FROM programms
     WHERE slug = ?`,
    [slug]
  )

  if (!rows.length) return null

  programBySlugCache.set(slug, rows[0])
  programBySlugTime.set(slug, now)

  return rows[0]
}

export async function getProgramBlocks(programId: number) {
  const [rows]: any = await db.query(
    `SELECT * FROM blocks WHERE program_id = ?`,
    [programId]
  )

  return rows.map((row: any) => ({
    title: row.title,
    type: row.type,
    data:
      typeof row.data === "string"
        ? JSON.parse(row.data)
        : row.data,
  }))
}


export async function getProgramStructure(programId: number) {
  const [rows] = await db.query<ProgramStructureRow[]>(
    `SELECT blocks FROM program_structure WHERE program_id = ?`,
    [programId]
  )

  if (!rows.length) return null

  return JSON.parse(rows[0].blocks)
}


type IndividCacheEntry = {
  data: ProgramRow[]
  time: number
}

const individCache = new Map<number, IndividCacheEntry>()

export async function getIndividProgram(userId: number): Promise<ProgramRow[]> {
  const now = Date.now()

  const cached = individCache.get(userId)

  if (cached && now - cached.time < CACHE_TTL) {
    return cached.data
  }

  await db.query(
    `DELETE up FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ? AND up.status = 'active'
     AND p.time < 71 AND up.created_at < NOW() - INTERVAL 1 MONTH`,
    [userId]
  )

  await db.query(
    `DELETE up FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ? AND up.status = 'active'
     AND p.time >= 71 AND p.time < 143
     AND up.created_at < NOW() - INTERVAL 2 MONTH`,
    [userId]
  )

  await db.query(
    `DELETE up FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ? AND up.status = 'active'
     AND p.time >= 143 AND p.time < 287
     AND up.created_at < NOW() - INTERVAL 3 MONTH`,
    [userId]
  )

  await db.query(
    `DELETE up FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ? AND up.status = 'active'
     AND p.time >= 287
     AND up.created_at < NOW() - INTERVAL 12 MONTH`,
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

  individCache.set(userId, {
    data: rows,
    time: now,
  })

  return rows
}

export async function hasUserProgram(
  userId: number,
  programId: number
): Promise<boolean> {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT up.id
     FROM user_programs up
     JOIN programms p ON p.id = up.programm_id
     WHERE up.user_id = ?
     AND up.programm_id = ?
     AND up.status = 'active'
     AND (
       (p.time < 71 AND up.created_at >= NOW() - INTERVAL 1 MONTH)
       OR (p.time >= 71 AND p.time < 143 AND up.created_at >= NOW() - INTERVAL 2 MONTH)
       OR (p.time >= 143 AND p.time < 287 AND up.created_at >= NOW() - INTERVAL 3 MONTH)
       OR (p.time >= 287 AND up.created_at >= NOW() - INTERVAL 12 MONTH)
     )
     LIMIT 1`,
    [userId, programId]
  )

  return rows.length > 0
}