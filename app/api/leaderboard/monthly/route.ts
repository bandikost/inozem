import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const testName = request.nextUrl.searchParams.get("test");

    if (!testName) {
      const [rows] = await db.execute(`
        SELECT DISTINCT name_test
        FROM tests_results
        ORDER BY name_test ASC
      `);

      return NextResponse.json({
        tests: (rows as { name_test: string }[]).map(
          (row) => row.name_test
        ),
      })
    }

    const [rows] = await db.execute(
      `
        SELECT
          user_id,
          name,
          patronymic,
          last_name,
          result,
          exp,
          created_at
        FROM tests_results
        WHERE name_test = ?
          AND created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
          AND created_at <= NOW()
        ORDER BY result DESC, created_at ASC, user_id ASC
      `,
      [testName]
    );

    return NextResponse.json({
      results: rows,
    });
  } catch (error) {
    console.error("GET /api/leaderboard/monthly:", error);

    return NextResponse.json(
      { error: "Не удалось загрузить таблицу лидеров" },
      { status: 500 }
    );
  }
}