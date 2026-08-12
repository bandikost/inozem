import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      schema,
    } = body;

    if (!title || !schema) {
      return NextResponse.json(
        {
          error: "Название и схема обязательны",
        },
        { status: 400 }
      );
    }

    let slug = createSlug(title);

   
    slug += `-${Date.now()}`;

    await db.execute(
  `
  INSERT INTO tests_creator
  (
    title,
    slug,
    description,
    test_schema,
    is_published
  )
  VALUES (?, ?, ?, ?, ?)
  `,
  [
    title,
    slug,
    description || null,
    schema,
    0,
  ]
);

    return NextResponse.json({
      success: true,
      slug,
    });
  } catch (error) {
    console.error("CREATE TEST ERROR:", error);

    return NextResponse.json(
      {
        error: "Ошибка создания теста",
      },
      { status: 500 }
    );
  }
}