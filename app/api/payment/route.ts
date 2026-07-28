import { NextResponse } from "next/server";
import crypto from "crypto";
import { getProgramById } from "@/lib/programm";
import { db } from "@/lib/db";


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
  const { programId, userId } = await request.json();

  const program = await getProgramById(programId);

  if (!program) {
    return NextResponse.json(
      { error: "Программа не найдена" },
      { status: 404 }
    );
  }

  const orderId = crypto.randomUUID()

  await db.query(
  `
  INSERT INTO payments (
    user_id,
    program_id,
    order_id,
    amount,
    status
  )
  VALUES (?, ?, ?, ?, 'NEW')
  `,
  [
    userId,
    programId,
    orderId,
    Number(program.price)
  ]
)

  const body = {
    TerminalKey: process.env.TINKOFF_TERMINAL_KEY!,
    Amount: Number(program.price) * 100,
    OrderId: orderId,
    Description: program.name,

    SuccessURL: `https://https://xn--e1adcscg.xn--p1ai//payment/success?order=${orderId}`,
     NotificationURL: "https://https://xn--e1adcscg.xn--p1ai//api/payment/notify"
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

  return NextResponse.json(await res.json());
}