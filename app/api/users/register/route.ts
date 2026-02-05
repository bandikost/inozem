import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { RowDataPacket, OkPacket } from 'mysql2';

type UserRow = RowDataPacket & { id: number };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, phone, password } = body;

    if (!first_name || !last_name || !email || !phone || !password) {
      return NextResponse.json({ message: 'Все поля обязательны' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Проверка, есть ли уже email
    const [existingRows] = await db.query<UserRow[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingRows.length > 0) {
      return NextResponse.json({ message: 'Email уже зарегистрирован' }, { status: 400 });
    }

    // Вставка пользователя
    const [result] = await db.query<OkPacket>(
      'INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone, hashedPassword]
    );

    return NextResponse.json({ ok: true, insertedId: result.insertId });
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Неизвестная ошибка' }, { status: 500 });
  }
}
