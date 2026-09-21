import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { getActivityById } from "@/lib/activity";

function makeToken(data: Record<string, any>, password: string) {
  const tokenData: Record<string, any> = {
    ...data,
    Password: password,
  };

  const token = Object.keys(tokenData)
    .sort()
    .map((key) => String(tokenData[key]))
    .join("");

  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const { activityId, userId } = await request.json();

    const activity = await getActivityById(activityId);

    if (!activity) {
      return NextResponse.json(
        { error: "Мероприятие не найдено" },
        { status: 404 }
      );
    }

    const orderId = crypto.randomUUID();

    await db.query(
      `
      INSERT INTO payments (
        user_id,
        activity_id,
        order_id,
        amount,
        status
      )
      VALUES (?, ?, ?, ?, 'NEW')
      `,
      [
        userId,
        activityId,
        orderId,
        Number(activity.price),
      ]
    );

    const body = {
      TerminalKey: process.env.TINKOFF_TERMINAL_KEY!,
      Amount: Number(activity.price) * 100,
      OrderId: orderId,
      Description: activity.name,

      SuccessURL: `https://xn--e1adcscg.xn--p1ai/payment/success?order=${orderId}`,

      NotificationURL:
        "https://xn--e1adcscg.xn--p1ai/api/payment/activity/notify",
    };

    const token = makeToken(
      body,
      process.env.TINKOFF_SECRET_KEY!
    );

    const res = await fetch(
      "https://securepay.tinkoff.ru/v2/Init",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          Token: token,
        }),
      }
    );

    const tinkoffResponse = await res.json();

    console.log("TINKOFF ACTIVITY:", tinkoffResponse);

    if (tinkoffResponse.Success && tinkoffResponse.PaymentId) {
      await db.query(
        `
        UPDATE payments
        SET payment_id = ?
        WHERE order_id = ?
        `,
        [
          tinkoffResponse.PaymentId,
          orderId,
        ]
      );
    }

    return NextResponse.json(tinkoffResponse);

  } catch (error) {
    console.error("ACTIVITY PAYMENT ERROR:", error);

    return NextResponse.json(
      {
        error: "Payment init failed",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}