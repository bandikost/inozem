import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, slug } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Введите название теста" },
        { status: 400 }
      );
    }

    if (!slug?.trim()) {
      return NextResponse.json(
        { error: "Введите slug" },
        { status: 400 }
      );
    }

    const [existing] = await db.execute(
      `
        SELECT id
        FROM tests_creator
        WHERE slug = ?
        LIMIT 1
      `,
      [slug]
    );

    if ((existing as any[]).length > 0) {
      return NextResponse.json(
        { error: "Тест с таким slug уже существует" },
        { status: 409 }
      );
    }

    const [result] = await db.execute(
      `
        INSERT INTO tests_creator (
          title,
          slug
        )
        VALUES (?, ?)
      `,
      [
        title.trim(),
        slug.trim(),
      ]
    );

    const insertResult = result as {
      insertId: number;
    };

    return NextResponse.json({
      success: true,
      id: insertResult.insertId,
      slug: slug.trim(),
    });

  } catch (error) {
    console.error("POST /api/tests_creator:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Ошибка создания теста",
      },
      { status: 500 }
    );
  }
}