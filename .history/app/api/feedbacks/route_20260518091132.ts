import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from 'mysql2/promise';

export async function POST(req: NextRequest) {
  try {
    const { user_id, name, last_name, patronymic, user_text, rate, answer } = await req.json()

    if (!name || !last_name || !patronymic || !user_text || rate === undefined) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    const [result] = await db.query<ResultSetHeader>(
  `INSERT INTO feedbacks (user_id, name, last_name, patronymic, user_text, rate, answer)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [user_id, name, last_name, patronymic, user_text, rate, answer || ""]
)

    return NextResponse.json({ id: result.insertId }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}