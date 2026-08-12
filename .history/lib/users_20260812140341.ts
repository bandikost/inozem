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
  const [rows] = await db.query<UserRow[]>(`
    SELECT 
      u.id,
      u.name,
      u.last_name,
      u.patronymic,
      u.email,
      u.phone,
      u.specialization,
      u.education_level,

      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', p.id,
          'name', p.name
        )
      ) AS user_programs

    FROM users u

    LEFT JOIN user_programs up 
      ON up.user_id = u.id
      AND up.status = 'active'

    LEFT JOIN programms p
      ON p.id = up.programm_id

    GROUP BY u.id
  `)

  return rows
}


export async function assignProgramToUser(
  userId: number,
  programId: number
) {
  const [existingRows]: any = await db.query(
    `
    SELECT id
    FROM user_programs
    WHERE user_id = ?
    AND programm_id = ?
    LIMIT 1
    `,
    [userId, programId]
  )

  if (existingRows.length > 0) {
    throw new Error("Программа уже назначена")
  }


  const [programRows]: any = await db.query(
    `
    SELECT time
    FROM programms
    WHERE id = ?
    LIMIT 1
    `,
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
    `
    INSERT INTO user_programs (
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
    )
    `,
    [userId, programId, months]
  )
}


export async function getTeacherById(id: number) {
  const [rows] = await db.query(
    `
    SELECT
      users.id,
      users.name,
      users.patronymic,
      users.last_name,
      users.email,
      users.phone,
      users.specialization,
      users.teacher_text,
      users.photo_url,

      teacher_details.position,
      teacher_details.subjects,
      teacher_details.education,
      teacher_details.academic_degree,
      teacher_details.academic_title,
      teacher_details.advanced_training,
      teacher_details.professional_retraining,
      teacher_details.professional_experience,
      teacher_details.educational_programs

    FROM users

    LEFT JOIN teacher_details
      ON users.id = teacher_details.user_id

    WHERE users.id = ?
      AND users.isTeacher = 1

    LIMIT 1
    `,
    [id]
  )

  const teachers = rows as any[]

  return teachers[0] ?? null
}