import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { email } = await req.json();

  const [user]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  if (!user.length) {
    return NextResponse.json({ message: "Если email существует — письмо отправлено" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  await db.query(
    "INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)",
    [user[0].id, token, new Date(Date.now() + 1000 * 60 * 15)]
  );

  const link = `http://localhost:3000/reset-password?token=${token}`;

  console.log("RESET LINK:", link);

  return NextResponse.json({ message: "Письмо отправлено" });
}