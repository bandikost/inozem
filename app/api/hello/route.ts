import { NextResponse } from "next/server";

// Эта функция вызовется, когда кто-то сделает GET запрос на /api/hello
export async function GET() {
  return NextResponse.json({ message: "Привет из API!" });
}
