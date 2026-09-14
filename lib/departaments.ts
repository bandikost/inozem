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
    `SELECT u.id, u.name, u.patronymic, u.last_name, u.photo_url
     FROM departament_squad ds
     JOIN users u ON u.id = ds.user_id
     WHERE ds.departament_id = ?
     ORDER BY u.name`,
    [department.id]
  )

  return {
    ...department,
    teachers: teacherRows as DepartmentTeacher[],
  }
}

