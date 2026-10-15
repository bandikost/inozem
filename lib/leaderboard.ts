import { db } from "./db";

export async function getLeaderboardTests(user_id: number) {
  const [rows] = await db.execute(
    `
      SELECT
        r.*,
        t.slug AS test_slug,
        t.title AS test_title
      FROM tests_results AS r
      LEFT JOIN tests_creator AS t
        ON r.name_test = t.title
        OR r.name_test = t.slug
      WHERE r.user_id = ?
      ORDER BY r.created_at DESC
    `,
    [user_id]
  );

  return rows as any[];
}