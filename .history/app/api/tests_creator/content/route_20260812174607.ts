import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      test_id,
      questions,
    } = body;

    if (!test_id) {
      return NextResponse.json(
        { error: "Не указан test_id" },
        { status: 400 }
      );
    }

    if (!Array.isArray(questions)) {
      return NextResponse.json(
        { error: "questions должен быть массивом" },
        { status: 400 }
      );
    }

    /*
     * Проверяем, существует ли тест
     */
    const [testRows] = await db.execute(
      `
        SELECT id
        FROM tests_creator
        WHERE id = ?
        LIMIT 1
      `,
      [test_id]
    );

    const tests = testRows as { id: number }[];

    if (!tests.length) {
      return NextResponse.json(
        { error: "Тест не найден" },
        { status: 404 }
      );
    }

    /*
     * Удаляем старые вопросы
     */
    await db.execute(
      `
        DELETE FROM tests_creator_content
        WHERE test_id = ?
      `,
      [test_id]
    );

    /*
     * Добавляем новые
     */
    for (let i = 0; i < questions.length; i++) {
      const item = questions[i];

      await db.execute(
        `
          INSERT INTO tests_creator_content (
            test_id,
            question_number,
            question,
            answers
          )
          VALUES (?, ?, ?, ?)
        `,
        [
          test_id,
          i + 1,
          item.question,
          JSON.stringify(item.answers),
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Тест сохранён",
    });

  } catch (error) {
    console.error(
      "POST /api/tests_creator/content:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Ошибка сохранения теста",
      },
      {
        status: 500,
      }
    );
  }
}