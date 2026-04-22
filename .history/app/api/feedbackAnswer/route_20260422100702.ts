import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export async function POST(req: NextRequest) {
  try {
    const { user_id, answer } = await req.json()


    const [result] = await db.query<ResultSetHeader>(
  `INSERT INTO feedbacks (user_id, answer)
   VALUES (?, ?)`,
  [user_id, answer || ""]
)

    return NextResponse.json({ id: result.insertId }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}