import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { assignProgramToUser } from "@/lib/users";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("TINKOFF:", data);


  const [rows]: any = await db.query(
    `
    SELECT *
    FROM payments
    WHERE order_id = ?
    `,
    [data.OrderId]
  );


  const payment = rows[0];


  if (!payment) {
    return NextResponse.json(
      { error: "Payment not found" },
      { status: 404 }
    );
  }


  if (data.Status === "CONFIRMED") {

    await assignProgramToUser(
      payment.user_id,
      payment.program_id
    );

    await db.query(
      `
      UPDATE payments
      SET status='CONFIRMED'
      WHERE order_id=?
      `,
      [data.OrderId]
    );
  }


  if (data.Status === "REFUNDED") {

    await db.query(
      `
      UPDATE payments
      SET status='REFUNDED'
      WHERE order_id=?
      `,
      [data.OrderId]
    );

  }


  return NextResponse.json({
    ok: true
  });
}