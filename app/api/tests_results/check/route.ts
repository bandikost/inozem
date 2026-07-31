import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = Number(searchParams.get("userId"));
  const nameTest = searchParams.get("nameTest");

  if (!userId || !nameTest) {
    return NextResponse.json(
      { error: "userId и nameTest обязательны" },
      { status: 400 }
    );
  }

  const [rows] = await db.query(
    `
    SELECT id, result, exp, created_at
    FROM tests
    WHERE user_id = ?
      AND name_test = ?
    LIMIT 1
    `,
    [
      userId,
      nameTest
    ]
  );

  return NextResponse.json({
    completed: Array.isArray(rows) && rows.length > 0,
    result: Array.isArray(rows) ? rows[0] ?? null : null,
  });
}