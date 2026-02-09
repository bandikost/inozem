import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT id, first_name, last_name, email, phone, photo_url FROM users");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}

