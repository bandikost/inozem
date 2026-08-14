import { db } from "./db";

export interface Notify {
  id: number;
  name: string;
  title: string;
  suptitle: string | null;
  description: string;
  rules: boolean;
  created_at: string;
}

export async function getNotify(
  limit: number,
  offset: number,
  rules: boolean
): Promise<Notify[]> {
  const [rows] = await db.query(
    `
      SELECT
        id,
        name,
        title,
        suptitle,
        description,
        rules,
        created_at
      FROM notify
      WHERE rules = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `,
    [rules ? 1 : 0, limit, offset]
  );

  return rows as Notify[];
}