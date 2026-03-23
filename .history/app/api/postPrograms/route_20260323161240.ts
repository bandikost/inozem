import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const program = await req.json();

    const { name, time, dates, education, specialization, isFavorite, description, price } = program;

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO programms 
        (name, time, dates, education, specialization, isFavorite, description, price, slug)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, time, dates, education, specialization, isFavorite, description, price]
    );

    return new Response(JSON.stringify({ success: true, id: result.insertId }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Ошибка сервера' }), { status: 500 });
  }
}