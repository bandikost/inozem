import { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"

export type Teacher = {
  id: number
  name: string
  last_name: string
  photo_url: string
  isTeacher?: boolean
  education_level: string
  specialization: string
  Teacher_text: string
  patronymic: string
  isRated?: boolean
}

let cachedTeachers: Teacher[] | null = null;
let cacheTime = 0;

export async function getTeachers(): Promise<Teacher[]> {
  const now = Date.now();

  if (cachedTeachers && now - cacheTime < 30_000) {
    return cachedTeachers;
  }

  const [rows] = await db.query<Teacher[] & RowDataPacket[]>(
    `SELECT id, name, last_name, education_level, specialization,
            patronymic, Teacher_text, photo_url, isTeacher, isRated
     FROM users
     WHERE isTeacher = 1 AND isRated = 1`
  );

  cachedTeachers = rows;
  cacheTime = now;

  return rows;
}


export async function getAllTeachers(): Promise<Teacher[]> {
  const now = Date.now();

  if (cachedTeachers && now - cacheTime < 30_000) {
    return cachedTeachers;
  }

  const [rows] = await db.query<Teacher[] & RowDataPacket[]>(
    `SELECT id, name, last_name, education_level, specialization,
            patronymic, Teacher_text, photo_url, isTeacher, isRated
     FROM users
     WHERE isTeacher = 1`
  );

  cachedTeachers = rows;
  cacheTime = now;

  return rows;
}


export async function getAllUsers() {
  const [rows] = await db.query(
    `
    SELECT 
      u.id,
      u.name,
      u.last_name,
      u.patronymic,
      u.email,
      u.phone,
      p.name as program_name
    FROM users u
    LEFT JOIN user_programs up 
      ON up.user_id = u.id 
      AND up.status = 'active'
    LEFT JOIN programms p
      ON p.id = up.programm_id
    `
  )

  return rows
}


export async function assignProgramToUser(userId: number, programId: number) {
  await db.query(
    `INSERT INTO user_programs (user_id, programm_id, status)
     VALUES (?, ?, 'active')`,
    [userId, programId]
  )
}
