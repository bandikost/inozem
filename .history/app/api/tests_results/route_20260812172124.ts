import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface TestsResultBody {
  user_id: number;
  name_test: string;

  name: string;
  patronymic?: string | null;
  last_name: string;

  result: number;
  exp: number;

  education_level?: string | null;
  age?: number | null;
  gender?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TestsResultBody;

    const {
      user_id,
      name_test,
      name,
      patronymic,
      last_name,
      result,
      exp,
      education_level,
      age,
      gender,
    } = body;

    if (!user_id) {
      return NextResponse.json(
        { error: "Не указан user_id" },
        { status: 400 }
      );
    }

    if (!name_test) {
      return NextResponse.json(
        { error: "Не указан name_test" },
        { status: 400 }
      );
    }

    if (!name || !last_name) {
      return NextResponse.json(
        { error: "Не указаны имя или фамилия" },
        { status: 400 }
      );
    }

    if (typeof result !== "number") {
      return NextResponse.json(
        { error: "result должен быть числом" },
        { status: 400 }
      );
    }

    if (typeof exp !== "number") {
      return NextResponse.json(
        { error: "exp должен быть числом" },
        { status: 400 }
      );
    }

    const [existing] = await db.execute(
      `
        SELECT id, result, exp
        FROM tests_results
        WHERE user_id = ?
          AND name_test = ?
        LIMIT 1
      `,
      [user_id, name_test]
    );

    const rows = existing as {
      id: number;
      result: string | null;
      exp: number | null;
    }[];

    if (rows.length === 0) {
      await db.execute(
        `
          INSERT INTO tests_results (
            user_id,
            name_test,
            name,
            patronymic,
            last_name,
            result,
            exp,
            education_level,
            age,
            gender
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          user_id,
          name_test,
          name,
          patronymic ?? null,
          last_name,
          result,
          exp,
          education_level ?? null,
          age ?? null,
          gender ?? null,
        ]
      );

      return NextResponse.json({
        success: true,
        action: "created",
        result,
        exp,
      });
    }

    const oldResult = Number(rows[0].result ?? 0);

    if (result <= oldResult) {
      return NextResponse.json({
        success: true,
        action: "nothing_changed",
        result: oldResult,
        exp: rows[0].exp,
      });
    }

    await db.execute(
      `
        UPDATE tests_results
        SET
          name = ?,
          patronymic = ?,
          last_name = ?,
          result = ?,
          exp = ?,
          education_level = ?,
          age = ?,
          gender = ?,
          created_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      [
        name,
        patronymic ?? null,
        last_name,
        result,
        exp,
        education_level ?? null,
        age ?? null,
        gender ?? null,
        rows[0].id,
      ]
    );

    return NextResponse.json({
      success: true,
      action: "updated",
      result,
      exp,
    });

  } catch (error) {
    console.error("POST /api/tests-results error:", error);

    return NextResponse.json(
      {
        error: "Ошибка сохранения результата",
      },
      {
        status: 500,
      }
    );
  }
}