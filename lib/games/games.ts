import { RowDataPacket } from "mysql2/promise"
import { db } from "@/lib/db"
import { Game } from "@/app/interface/games"


export async function getLeaderboard(): Promise<Game[]> {
  const [rows] = await db.query<Game[] & RowDataPacket[]>(`
    SELECT us.id, us.user_id, u.name, u.last_name, u.patronymic, us.achievements, us.experience
    FROM user_stats us
    JOIN users u ON u.id = us.user_id
    ORDER BY us.experience DESC
    
  `)

  return rows
}

export async function getAchievments(userId: number): Promise<Game[]> {
  const [rows] = await db.query<Game[] & RowDataPacket[]>(`
    SELECT
      us.id,
      us.user_id,
      u.name,
      u.last_name,
      u.patronymic,
      us.achievements,
      us.experience
  FROM user_stats us
  JOIN users u ON u.id = us.user_id
  WHERE us.user_id = ?
  `, [userId])

  return rows
}