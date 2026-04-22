import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import { sendActivityEmail } from "@/lib/mails/activity";


export async function POST(req: NextRequest) {
  try {
    const { id, activity_name, name, last_name, patronymic, email, phone, city, education_level  } = await req.json()

    if (!name || !last_name || !patronymic || !email || !phone || !education_level === undefined) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    const [result] = await db.query<ResultSetHeader>(
  `INSERT INTO activity_users (id, activity_name, name, last_name, patronymic, email, phone, city, education_level)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [id, activity_name, name, last_name, patronymic, email, phone, city, education_level  || ""]
)
    await sendActivityEmail(email, name)
    return NextResponse.json({ id: result.insertId }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}