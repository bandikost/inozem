import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("TINKOFF ACTIVITY:", data);

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

    // Оплата подтверждена
    if (data.Status === "CONFIRMED") {

      await db.query(
        `
        INSERT INTO user_activity_payment (
          user_id,
          activity_id
        )
        VALUES (?, ?)
        `,
        [
          payment.user_id,
          payment.activity_id,
        ]
      );

      await db.query(
        `
        UPDATE payments
        SET status = 'CONFIRMED'
        WHERE order_id = ?
        `,
        [data.OrderId]
      );
    }

    // Возврат
    if (data.Status === "REFUNDED") {

      await db.query(
        `
        UPDATE payments
        SET status = 'REFUNDED'
        WHERE order_id = ?
        `,
        [data.OrderId]
      );

      await db.query(
        `
        DELETE FROM user_activity_payment
        WHERE user_id = ?
        AND activity_id = ?
        `,
        [
          payment.user_id,
          payment.activity_id,
        ]
      );
    }

    return NextResponse.json({
      ok: true,
    });

  } catch (error) {
    console.error("ACTIVITY PAYMENT NOTIFY ERROR:", error);

    return NextResponse.json(
      {
        error: "Notification processing failed",
      },
      {
        status: 500,
      }
    );
  }
}