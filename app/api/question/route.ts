import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from 'mysql2/promise';
import { sendQuestionEmail } from "@/lib/mails/question";

export async function POST(req: NextRequest) {
     try {
        const { last_name, patronymic, name, phone, email, question } = await req.json()

        if (!last_name || !patronymic || !name || !phone || !email || !question) {
          return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
        }

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO question (last_name, patronymic, name, phone, email, question)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [last_name, patronymic, name, phone, email, question]
    )

    await sendQuestionEmail(last_name, patronymic, name, phone, email, question)
        return NextResponse.json({ id: result.insertId }, { status: 201 })
     } catch (error) {
        console.error("Error submitting question:", error);
        return NextResponse.json({ error: "Ошибка при отправке вопроса" }, { status: 500 });

     }
}