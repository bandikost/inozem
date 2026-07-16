import { RowDataPacket } from "mysql2/promise"
import { db } from "@/lib/db"
import { Activity } from "@/app/interface/activity"

type UpdateActivity = {
  name: string;
  slug: string;
  title: string;
  dates: string;
  year: number | null;
  paylink: string;
  description: string;
  teacher: string;
  purpose: string;
  audience: string;
  conditions: string;
};



export async function getActivity(): Promise<Activity[]> {
  const [rows] = await db.query<Activity[] & RowDataPacket[]>(`
    SELECT id, name, slug, title, description, teacher, purpose, audience, conditions, dates, year, paylink, title_bg, teacher_img, created_at
    FROM activity
    ORDER BY created_at DESC
  `)

  return rows
}

export async function getActivityBySlug(slug: string) { 
  const [rows] = await db.execute(`SELECT * FROM activity WHERE slug = ? LIMIT 1 `, [slug] 

  ) 
  return (rows as any[])[0] ?? null
}


export async function updateActivityBySlug(
  slug: string,
  data: UpdateActivity
) {
  const [result] = await db.execute(
    `
    UPDATE activity
    SET
      name = ?,
      slug = ?,
      title = ?,
      dates = ?,
      year = ?,
      paylink = ?,
      description = ?,
      teacher = ?,
      purpose = ?,
      audience = ?,
      conditions = ?
    WHERE slug = ?
    `,
    [
      data.name,
      data.slug,
      data.title,
      data.dates,
      data.year,
      data.paylink,
      data.description,
      data.teacher,
      data.purpose,
      data.audience,
      data.conditions,
      slug,
    ]
  );

  return result;
}