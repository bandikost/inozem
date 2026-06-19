import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: NextRequest,
  { params }: Context) {
  const { id } = await params;

  const { day, month, year, time } = await request.json();

  await db.query(
    `
      UPDATE accreditation_schedule
      SET
        day=?,
        month=?,
        year=?,
        time=?
      WHERE id=?
    `,
    [day, month, year, time, id]
  );

  return NextResponse.json({
    success: true,
  });
}