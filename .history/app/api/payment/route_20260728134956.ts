import { NextResponse } from "next/server";
import crypto from "crypto";

function makeToken(data: Record<string, any>, password: string) {
  const tokenData = {
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

export async function POST() {
  const body = {
    TerminalKey: process.env.TINKOFF_TERMINAL_KEY!,
    Amount: 10000, // 100 рублей
    OrderId: crypto.randomUUID(),
    Description: "Оплата курса",
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
  )

  console.log(data)

  return NextResponse.json(await res.json());
}