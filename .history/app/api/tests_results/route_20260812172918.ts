import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      user_id,
      name_test,
      result,
      exp,
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

    /*
     * Получаем пользователя
     */
    const [userRows] = await db.execute(
      `
        SELECT
          id,
          name,
          patronymic,
          last_name,
          education_level,
          age,
          gender
        FROM users
        WHERE id = ?
        LIMIT 1
      `,
      [user_id]
    );

    const users = userRows as {
      id: number;
      name: string;
      patronymic: string | null;
      last_name: string;
      education_level: string | null;
      age: number | null;
      gender: string | null;
    }[];

    if (!users.length) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 }
      );
    }

    const user = users[0];

    /*
     * Ищем предыдущий результат
     */
    const [existingRows] = await db.execute(
      `
        SELECT
          id,
          result,
          exp
        FROM tests_results
        WHERE user_id = ?
          AND name_test = ?
        LIMIT 1
      `,
      [user_id, name_test]
    );

    const existing = existingRows as {
      id: number;
      result: string | null;
      exp: number | null;
    }[];

    /*
     * Первый результат
     */
    if (!existing.length) {
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
          user.id,
          name_test,
          user.name,
          user.patronymic,
          user.last_name,
          result,
          exp,
          user.education_level,
          user.age,
          user.gender,
        ]
      );

      return NextResponse.json({
        success: true,
        action: "created",
        result,
        exp,
      });
    }

    /*
     * Старый результат
     */
    const oldResult = Number(existing[0].result ?? 0);

    /*
     * Новый результат не лучше
     */
    if (result <= oldResult) {
      return NextResponse.json({
        success: true,
        action: "nothing_changed",
        result: oldResult,
        exp: existing[0].exp,
      });
    }

    /*
     * Новый результат лучше
     */
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
        user.name,
        user.patronymic,
        user.last_name,
        result,
        exp,
        user.education_level,
        user.age,
        user.gender,
        existing[0].id,
      ]
    );

    return NextResponse.json({
      success: true,
      action: "updated",
      result,
      exp,
    });

  } catch (error) {
    console.error("POST /api/tests_results:", error);

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