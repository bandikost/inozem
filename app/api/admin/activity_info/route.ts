import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  let userId: number

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: number }

    userId = decoded.id
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const [rows] = await db.query(
      `
        SELECT
          SUM(
            YEARWEEK(activity_date, 1) =
            YEARWEEK(CURDATE(), 1)
          ) AS currentWeek,

          SUM(
            YEARWEEK(activity_date, 1) =
            YEARWEEK(DATE_SUB(CURDATE(), INTERVAL 7 DAY), 1)
          ) AS previousWeek

        FROM admin_activity
        WHERE user_id = ?
      `,
      [userId]
    )

    const stats = (rows as any[])[0]

    return NextResponse.json({
      currentWeek: Number(stats.currentWeek) || 0,
      previousWeek: Number(stats.previousWeek) || 0,
    })
  } catch (error) {
    console.error("Admin activity GET error:", error)

    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    )
  }
}