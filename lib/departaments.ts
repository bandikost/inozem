import { RowDataPacket } from "mysql2/promise";
import { db } from "./db";
import { Departaments, DepartmentTeacher } from "@/app/interface/departaments";



export async function getDepartaments(): Promise<Departaments[]> {
  const [rows] = await db.query<Departaments[] & RowDataPacket[]>(`
    SELECT
      id,
      name,
      slug,
      goals,
      directions,
      scientific,
      series,
      bases
    FROM departaments
  `);

  return rows;
}

export async function getDepartmentsBySlug(
  slug: string
): Promise<Departaments | null> {
  const [departmentRows] = await db.execute(
    `SELECT *
     FROM departaments
     WHERE slug = ?
     LIMIT 1`,
    [slug]
  )

  const department = (departmentRows as Departaments[])[0]

  if (!department) {
    return null
  }

  const [teacherRows] = await db.execute(
    `SELECT
       du.id,
       du.name,
       du.patronymic,
       du.last_name,
       du.photo_url,
       du.description
     FROM departament_squad ds
     JOIN departament_user du
       ON du.id = ds.departament_user_id
     WHERE ds.departament_id = ?
     ORDER BY du.last_name, du.name`,
    [department.id]
  )

  return {
    ...department,
    teachers: teacherRows as DepartmentTeacher[],
  }
}


export async function getTeacherById(
  id: number
): Promise<DepartmentTeacher | null> {
  const [rows] = await db.execute(
    `SELECT
       id,
       name,
       patronymic,
       last_name,
       photo_url,
       description
     FROM departament_user
     WHERE id = ?
     LIMIT 1`,
    [id]
  )

  return (rows as DepartmentTeacher[])[0] ?? null
}