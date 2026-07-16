
import { db } from "@/lib/db";

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