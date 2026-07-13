import { db } from "@/lib/db"


export async function getActivityBySlug(slug: string) {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM activity
    WHERE slug = ?
    LIMIT 1
    `,
    [slug]
  );

  return (rows as any[])[0] ?? null;
}