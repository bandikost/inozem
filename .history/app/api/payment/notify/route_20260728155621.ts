import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const order = searchParams.get("order");

  if (!order) {
    return NextResponse.json({
      success: false,
    });
  }


  const [rows]: any = await db.query(
    `
    SELECT status
    FROM payments
    WHERE order_id = ?
    `,
    [order]
  );


  if (!rows.length) {
    return NextResponse.json({
      success: false,
    });
  }


  return NextResponse.json({
    success: rows[0].status === "CONFIRMED",
  });
}