import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";
import { sendActivityEmail } from "@/lib/mails/activity";

export async function POST(req: NextRequest) {
     try {
        const { name, last_name, patronymic, email, phone, education_level, specialization, created_at } = await req.json()

        if (!last_name || !patronymic || !name || !phone || !email || !education_level || !specialization) {
          return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
        }

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO application (last_name, patronymic, name, phone, email, education_level, specialization, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, last_name, patronymic, email, phone, education_level, specialization, created_at]
    )
        await sendActivityEmail(name, last_name, patronymic, email, phone, education_level, specialization, created_at)
        return NextResponse.json({ id: result.insertId }, { status: 201 })
     } catch (error) {
        console.error("Error submitting question:", error);
        return NextResponse.json({ error: "Ошибка при отправке вопроса" }, { status: 500 });

     }
}