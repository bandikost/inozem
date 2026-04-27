import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { transporter } from "@/lib/mails/activity";

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

  await transporter.sendMail({
  from: `"Академия" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Восстановление пароля",
  html: `
    <div>
      <h2>Сброс пароля</h2>
      <p>Нажмите на ссылку:</p>
      <a href="${link}">${link}</a>
      <p>Ссылка действует 15 минут</p>
    </div>
  `,
});

  return NextResponse.json({ message: "Письмо отправлено" });
}