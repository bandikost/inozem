import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("TINKOFF ACTIVITY:", data);

    const [rows]: any = await db.query(
      `
      SELECT
        p.user_id,
        p.activity_id,

        a.name AS activity_name,

        u.name,
        u.last_name,
        u.patronymic,
        u.email,
        u.phone,
        u.city,
        u.education_level

      FROM payments p

      JOIN users u
        ON p.user_id = u.id

      JOIN activity a
        ON p.activity_id = a.id

      WHERE p.order_id = ?
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

      // Добавляем пользователя в мероприятие
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

      // Добавляем регистрационные данные участника
      await db.query(
        `
        INSERT INTO activity_users (
          activity_name,
          name,
          last_name,
          patronymic,
          email,
          phone,
          city,
          education_level
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          payment.activity_name,
          payment.name,
          payment.last_name,
          payment.patronymic,
          payment.email,
          payment.phone,
          payment.city,
          payment.education_level,
        ]
      );

      // Обновляем статус платежа
      await db.query(
        `
        UPDATE payments
        SET status = 'CONFIRMED'
        WHERE order_id = ?
        `,
        [data.OrderId]
      );
    }

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