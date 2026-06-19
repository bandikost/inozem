import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
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