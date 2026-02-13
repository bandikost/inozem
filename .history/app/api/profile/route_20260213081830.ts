import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface JwtPayload {
  id: number;
}

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  last_name: string;
  patronymic: string | null;
  email: string;
  phone: string;
  isTeacher: number;
  photo_url: string | null;
  created_at: Date;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let decoded: JwtPayload;
    try {
      decoded = verifyToken(token) as JwtPayload;
    } catch {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [rows] = await db.query<UserRow[]>(
      "SELECT id, name, last_name, patronymic, email, phone, isTeacher, photo_url, created_at FROM users WHERE id = ?",
      [decoded.id]
    );

    if (rows.length === 0) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const user = rows[0];

    return NextResponse.json({
      ...user,
      isTeacher: user.isTeacher === 1,
      created_at: user.created_at.toISOString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
