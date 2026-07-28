import { NextResponse } from "next/server";
import crypto from "crypto";
import { getProgramById } from "@/lib/programm";


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
  const { programId } = await request.json();

  const program = await getProgramById(programId);

  if (!program) {
    return NextResponse.json(
      { error: "Программа не найдена" },
      { status: 404 }
    );
  }

  const orderId = crypto.randomUUID()

  const body = {
    TerminalKey: process.env.TINKOFF_TERMINAL_KEY!,
    Amount: Number(program.price) * 100,
    OrderId: orderId,
    Description: program.name,

    SuccessURL: `http://localhost:3000/payment/success?order=${orderId}`,
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