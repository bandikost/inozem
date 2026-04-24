import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export async function POST(req: NextRequest) {
  try {
    const { id, activity_name, name, last_name, patronymic, email, phone, city, education_level, created_at } = await req.json()

    if (!name || !last_name || !patronymic || !email || phone || education_level || created_at === undefined) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    const [result] = await db.query<ResultSetHeader>(
  `INSERT INTO feedbacks (id, activity_name, name, last_name, patronymic, email, phone, city, education_level, created_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [id, activity_name, name, last_name, patronymic, email, phone, city, education_level, created_at || ""]
)

    return NextResponse.json({ id: result.insertId }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}