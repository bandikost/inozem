
import { NextResponse } from "next/server"
import { getTests } from "@/lib/test"

export async function GET() {
  try {
    const tests = await getTests()

    return NextResponse.json(tests)
  } catch (error) {
    console.error("Ошибка получения результатов тестов:", error)

    return NextResponse.json(
      { error: "Не удалось получить результаты тестов" },
      { status: 500 }
    )
  }
}
