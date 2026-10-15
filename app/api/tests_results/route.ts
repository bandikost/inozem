import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { user_id, name_test, result, exp } = body;

    if (
      !user_id ||
      typeof name_test !== "string" ||
      !name_test.trim() ||
      result == null ||
      exp == null
    ) {
      return NextResponse.json(
        { error: "Не переданы обязательные поля" },
        { status: 400 }
      );
    }

  
    const [testRows] = await db.execute(
      `
        SELECT title
        FROM tests_creator
        WHERE slug = ?
        LIMIT 1
      `,
      [name_test.trim()]
    );

    const tests = testRows as { title: string }[];

    if (tests.length === 0) {
      return NextResponse.json(
        { error: "Тест не найден" },
        { status: 404 }
      );
    }

    const testTitle = tests[0].title;

    const [existing] = await db.execute(
      `
        SELECT id
        FROM tests_results
        WHERE user_id = ? AND name_test = ?
        LIMIT 1
      `,
      [user_id, testTitle]
    );

    const rows = existing as { id: number }[];

    if (rows.length > 0) {
      await db.execute(
        `
          UPDATE tests_results
          SET result = ?,
              exp = ?,
              created_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `,
        [result, exp, rows[0].id]
      );

      return NextResponse.json({
        success: true,
        action: "updated",
        id: rows[0].id,
      });
    }

    const [insertResult] = await db.execute(
      `
        INSERT INTO tests_results (
          user_id,
          name_test,
          name,
          patronymic,
          last_name,
          result,
          exp,
          education_level
        )
        SELECT
          id,
          ?,
          name,
          patronymic,
          last_name,
          ?,
          ?,
          education_level
        FROM users
        WHERE id = ?
      `,
      [testTitle, result, exp, user_id]
    );

    const inserted = insertResult as {
      insertId: number;
      affectedRows: number;
    };

    if (inserted.affectedRows === 0) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      action: "created",
      id: inserted.insertId,
    });
  } catch (error) {
    console.error("POST /api/tests_results:", error);

    return NextResponse.json(
      { error: "Ошибка сохранения результата теста" },
      { status: 500 }
    );
  }
}
