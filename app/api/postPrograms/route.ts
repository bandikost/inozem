import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const program = await req.json();

    const { name, time, specialization, isFavorite, bannerName, description, price, slug, suptitle } = program;

    const category = program.category || "Повышение квалификации";
    const education = program.education || "Высшее";

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO programms 
        (name, time, category, education, specialization, isFavorite, bannerName, description, price, slug, suptitle)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, time, category, education, specialization, isFavorite, bannerName, description, price, slug, suptitle]
    );

    return new Response(JSON.stringify({ success: true, id: result.insertId }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Ошибка сервера' }), { status: 500 });
  }
}