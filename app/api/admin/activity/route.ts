import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"


export async function POST() {
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
    await db.query(
      `
        INSERT INTO admin_activity (user_id, activity_date)
        VALUES (?, CURDATE())
        ON DUPLICATE KEY UPDATE id = id
      `,
      [userId]
    )

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Admin activity error:", error)

    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    )
  }
}