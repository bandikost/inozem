import { NextResponse } from "next/server";
import crypto from "crypto";

function makeToken(data: Record<string, any>, secret: string) {
  const values = Object.keys(data)
    .filter((k) => data[k] !== undefined && k !== "Token")
    .sort()
    .map((k) => String(data[k]))
    .join("");

  return crypto
    .createHash("sha256")
    .update(values + secret)
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
  );

  return NextResponse.json(await res.json());
}