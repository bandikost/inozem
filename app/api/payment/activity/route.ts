import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { getActivityById } from "@/lib/activity";

function makeToken(
  data: Record<string, any>,
  password: string
) {
  const tokenData: Record<string, any> = {
    ...data,
    Password: password,
  };

  const token = Object.keys(tokenData)
    .filter((key) => {
      const value = tokenData[key];

      return (
        value !== undefined &&
        value !== null &&
        typeof value !== "object"
      );
    })
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
    // --------------------------------
    // 1. Получаем данные запроса
    // --------------------------------

    const { activityId, userId } = await request.json();

    if (!activityId || !userId) {
      return NextResponse.json(
        {
          error: "Не переданы activityId или userId",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------
    // 2. Получаем мероприятие
    // --------------------------------

    const activity = await getActivityById(activityId);

    if (!activity) {
      return NextResponse.json(
        {
          error: "Мероприятие не найдено",
        },
        {
          status: 404,
        }
      );
    }

    // --------------------------------
    // 3. Получаем email пользователя
    // --------------------------------

    const [users] = await db.query(
      `
      SELECT email
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [userId]
    );

    const user = (users as {
      email: string | null;
    }[])[0];

    if (!user) {
      return NextResponse.json(
        {
          error: "Пользователь не найден",
        },
        {
          status: 404,
        }
      );
    }

    if (!user.email) {
      return NextResponse.json(
        {
          error: "У пользователя отсутствует email",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------
    // 4. Создаём OrderId
    // --------------------------------

    const orderId = crypto.randomUUID();

    // --------------------------------
    // 5. Сохраняем платёж в БД
    // --------------------------------

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

    // --------------------------------
    // 6. Сумма в копейках
    // --------------------------------

    const amount = Math.round(
      Number(activity.price) * 100
    );

    // --------------------------------
    // 7. Формируем запрос Tinkoff
    // --------------------------------

    const body = {
      TerminalKey:
        process.env.TINKOFF_TERMINAL_KEY!,

      Amount: amount,

      OrderId: orderId,

      Description: activity.name,

      SuccessURL:
        `https://xn--e1adcscg.xn--p1ai/payment/success?order=${orderId}`,

      NotificationURL:
        "https://xn--e1adcscg.xn--p1ai/api/payment/activity/notify",

      Receipt: {
        Email: user.email,

        Taxation: "usn_income",

        Items: [
          {
            Name: activity.name,
            Price: amount,
            Quantity: 1,
            Amount: amount,
            Tax: "none",
          },
        ],
      },
    };

    // --------------------------------
    // 8. Создаём Token
    // --------------------------------

    const token = makeToken(
      body,
      process.env.TINKOFF_SECRET_KEY!
    );

    console.log("ACTIVITY PAYMENT INIT:", {
      orderId,
      userId,
      email: user.email,
      activityId,
      activityName: activity.name,
      amount,
    });

    // --------------------------------
    // 9. Отправляем запрос Tinkoff
    // --------------------------------

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

    // --------------------------------
    // 10. Получаем ответ Tinkoff
    // --------------------------------

    const tinkoffResponse =
      await res.json();

    console.log(
      "TINKOFF ACTIVITY:",
      tinkoffResponse
    );

    // --------------------------------
    // 11. Сохраняем PaymentId
    // --------------------------------

    if (
      tinkoffResponse.Success &&
      tinkoffResponse.PaymentId
    ) {
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

    // --------------------------------
    // 12. Возвращаем ответ
    // --------------------------------

    return NextResponse.json(
      tinkoffResponse
    );

  } catch (error) {
    console.error(
      "ACTIVITY PAYMENT ERROR:",
      error
    );

    if (error instanceof Error) {
      console.error(
        "MESSAGE:",
        error.message
      );

      console.error(
        "CAUSE:",
        error.cause
      );

      console.error(
        "STACK:",
        error.stack
      );
    }

    return NextResponse.json(
      {
        error: "Payment init failed",

        details:
          error instanceof Error
            ? error.message
            : String(error),

        cause:
          error instanceof Error
            ? String(error.cause)
            : null,
      },
      {
        status: 500,
      }
    );
  }
}
