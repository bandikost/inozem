import { NextResponse } from "next/server";
import { Activity } from "@/app/interface/activity";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";

export async function GET() {
  const [rows] = await db.query<Activity[] & RowDataPacket[]>(`
    SELECT id, name, slug, price, title, description, teacher, purpose, audience, conditions,
           dates, year, paylink, title_bg, teacher_img, created_at
    FROM activity
    ORDER BY created_at DESC
  `);

  return NextResponse.json(rows);
}