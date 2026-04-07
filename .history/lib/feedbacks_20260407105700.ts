import { RowDataPacket } from "mysql2"
import { db } from "@/lib/db"
import { Feedback } from "@/app/types/feedback"
import { NextRequest, NextResponse } from "next/server"

export async function getFeedback(): Promise<Feedback[]> {
  const [rows] = await db.query<Feedback[] & RowDataPacket[]>(`
    SELECT id, user_id, name, last_name, patronymic, rate, created_at
    FROM feedbacks
    ORDER BY created_at DESC
  `)

  return rows
}

export async function postFeedback(req: NextRequest) {
  try {
    const { user_id, name, last_name, patronymic, rate, answer } = await req.json();

    if (!user_id || !name || !last_name || !patronymic || rate === undefined) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    const [result] = await db.query(
      `INSERT INTO feedbacks (user_id, name, last_name, patronymic, rate, answer) VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, name, last_name, patronymic, rate, answer || ""]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}