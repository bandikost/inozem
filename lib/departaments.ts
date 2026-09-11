import { RowDataPacket } from "mysql2/promise";
import { db } from "./db";
import { Departaments } from "@/app/interface/departaments";



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


export async function getDepartmentsBySlug(slug: string): Promise<Departaments | null> {
    const [rows] = await db.execute(`SELECT * FROM departaments WHERE slug = ? LIMIT 1 `, [slug]) 
    return (rows as any[])[0] ?? null
}

