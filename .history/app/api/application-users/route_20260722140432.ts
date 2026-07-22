import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";
import { sendApplicationEmail } from "@/lib/mails/application";

export async function POST(req: NextRequest) {
     try {
        const { last_name, patronymic, name, phone, email, education_level, specialization, programm_name } = await req.json()
        const created_at = new Date()

        if (!last_name || !patronymic || !name || !phone || !email || !education_level || !programm_name || !specialization) {
          return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
        }

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO application (last_name, patronymic, name, phone, email, education_level, specialization, programm_name, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [last_name, patronymic, name, phone, email, education_level, specialization, programm_name, created_at]
    )
        await sendApplicationEmail(last_name, patronymic, name, programm_name, phone, email, education_level, specialization, created_at)
        return NextResponse.json({ id: result.insertId }, { status: 201 })
     } catch (error) {
        console.error("Error submitting question:", error);
        return NextResponse.json({ error: "Ошибка при отправке вопроса" }, { status: 500 });

     }
}