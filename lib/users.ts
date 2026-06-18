import { RowDataPacket } from "mysql2/promise"
import { db } from "@/lib/db"
import { UserRow } from "@/app/interface/user"

let cachedTeachers: UserRow[] | null = null;
let cacheTime = 0;

export async function getTeachers(): Promise<UserRow[]> {
  const now = Date.now();

  if (cachedTeachers && now - cacheTime < 30_000) {
    return cachedTeachers;
  }

  const [rows] = await db.query<UserRow[] & RowDataPacket[]>(
    `SELECT id, name, last_name, education_level, specialization,
            patronymic, Teacher_text, photo_url, isTeacher, isRated
     FROM users
     WHERE isTeacher = 1 AND isRated = 1`
  );

  cachedTeachers = rows;
  cacheTime = now;

  return rows;
}


export async function getAllTeachers(): Promise<UserRow[]> {

  const [rows] = await db.query<UserRow[] & RowDataPacket[]>(
    `SELECT id, name, last_name, education_level, specialization,
            patronymic, Teacher_text, photo_url, isTeacher, isRated
     FROM users
     WHERE isTeacher = 1`
  );

  return rows;
}

export async function getAllEmlployeer(): Promise<UserRow[]> {

  const [rows] = await db.query<UserRow[] & RowDataPacket[]>(
    `SELECT id, name, last_name, education_level, specialization,
            patronymic, Teacher_text, photo_url, isEmployer, isAdmin, isRated
     FROM users
     WHERE isEmployer = 1`
  );

  return rows;
}


export async function getAllUsers(): Promise<UserRow[]> {
  const [rows] = await db.query<UserRow[]>(
    `
   SELECT 
  u.id,
  u.name,
  u.last_name,
  u.patronymic,
  u.email,
  u.phone,
  u.specialization,
  u.education_level,
  GROUP_CONCAT(p.name SEPARATOR ', ') as program_name
FROM users u
LEFT JOIN user_programs up 
  ON up.user_id = u.id 
  AND up.status = 'active'
LEFT JOIN programms p
  ON p.id = up.programm_id
GROUP BY u.id
    `
  )

  return rows
}


export async function assignProgramToUser(
  userId: number,
  programId: number
) {
  const [programRows]: any = await db.query(
    `SELECT time FROM programms WHERE id = ?`,
    [programId]
  )

  const program = programRows[0]

  if (!program) {
    throw new Error("Программа не найдена")
  }

  let months = 1

  if (program.time >= 71 && program.time < 143) {
    months = 2
  } else if (program.time >= 143 && program.time < 287) {
    months = 3
  } else if (program.time >= 287) {
    months = 12
  }

  await db.query(
    `INSERT INTO user_programs (
      user_id,
      programm_id,
      status,
      expires_at
    )
    VALUES (
      ?,
      ?,
      'active',
      DATE_ADD(NOW(), INTERVAL ? MONTH)
    )`,
    [userId, programId, months]
  )
}