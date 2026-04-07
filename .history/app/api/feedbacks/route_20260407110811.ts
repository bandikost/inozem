import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { user_id, name, last_name, patronymic, rate, answer } = await req.json();

    if (!user_id || !name || !last_name || !patronymic || rate === undefined) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    const [result] = await db.query(
      `INSERT INTO feedbacks (user_id, name, last_name, patronymic, user_text, rate, answer) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, name, last_name, patronymic, rate, answer || ""]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}