import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json()

  const activityName = body.activityName

  const [rows] = await db.execute(
    `
      SELECT *
      FROM activity_users
      WHERE activity_name = ?
      ORDER BY created_at DESC
    `,
    [activityName]
  );

  return Response.json(rows);
}

