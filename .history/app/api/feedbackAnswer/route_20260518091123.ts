import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from 'mysql2/promise';

export async function POST(req: NextRequest) {
  try {
    const { id, answer } = await req.json()

    if (!id || !answer) {
      return NextResponse.json(
        { error: "Нет данных" },
        { status: 400 }
      )
    }

    const [result] = await db.query<ResultSetHeader>(
      `UPDATE feedbacks SET answer = ? WHERE id = ?`,
      [answer, id]
    )

    return NextResponse.json({ success: true, affectedRows: result.affectedRows})
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Ошибка сервера" },{ status: 500 })
  }
}