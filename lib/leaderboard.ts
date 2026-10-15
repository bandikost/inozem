import { db } from "./db"



export async function getLeaderboardTests(user_id: Number) {
  const [rows] = await db.query(`SELECT * from tests_results where user_id = ?`, [user_id]);

  return rows as any[];
}

