import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { assignProgramToUser } from "@/lib/users";


export async function POST(req: Request) {

  const data = await req.json();


  if (data.Status !== "CONFIRMED") {
    return NextResponse.json({
      ok:true
    });
  }


  const [rows]: any = await db.query(
    `
    SELECT user_id, program_id
    FROM payments
    WHERE order_id = ?
    `,
    [
      data.OrderId
    ]
  );


  const payment = rows[0];


  if (!payment) {
    return NextResponse.json({
      error:"Payment not found"
    }, {
      status:404
    });
  }


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
    [
      data.OrderId
    ]
  );


  return NextResponse.json({
    ok:true
  });
}