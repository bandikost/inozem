import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const [rows]: any = await db.query(
    "SELECT * FROM password_resets WHERE token = ?",
    [token]
  );

  if (!rows.length) {
    return NextResponse.json({ message: "Токен недействителен" }, { status: 400 });
  }

  const record = rows[0];

  if (new Date(record.expires_at) < new Date()) {
    return NextResponse.json({ message: "Токен истек" }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);

  await db.query("UPDATE users SET password = ? WHERE id = ?", [
    hash,
    record.user_id,
  ]);

  await db.query("DELETE FROM password_resets WHERE token = ?", [token]);

  return NextResponse.json({ message: "Пароль обновлен" });
}