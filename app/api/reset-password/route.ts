import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Не указан токен или пароль" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(
      "SELECT * FROM password_resets WHERE token = ?",
      [token]
    );

    if (!rows.length) {
      return NextResponse.json(
        { message: "Токен недействителен или уже использован" },
        { status: 400 }
      );
    }

    const record = rows[0];

    if (new Date(record.expires_at) < new Date()) {
      return NextResponse.json(
        { message: "Токен истек" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hash, record.user_id]
    );

    await db.query(
      "DELETE FROM password_resets WHERE token = ?",
      [token]
    );

    return NextResponse.json({
      success: true,
      message: "Пароль успешно изменён",
    });

  } catch (error) {
    console.error("Ошибка сброса пароля:", error);

    return NextResponse.json(
      { message: "Произошла ошибка при смене пароля" },
      { status: 500 }
    );
  }
}