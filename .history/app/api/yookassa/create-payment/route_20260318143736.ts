import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { item, userId, programId, name } = await req.json();

    const paymentData = {
      amount: { value: item, currency: "RUB" },
      confirmation: {
        type: "redirect",
        return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/`,
      },
      capture: true,
      description: name,
      metadata: {
        userId,
        programId,
      },
    };

    const auth = Buffer.from(`${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_SECRET}`).toString("base64");

    const response = await axios.post(
      "https://api.yookassa.ru/v3/payments",
      paymentData,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          "Idempotence-Key": uuidv4(),
        },
      }
    );

    return NextResponse.json({ url: response.data.confirmation.confirmation_url });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: "Не удалось создать платеж" }, { status: 500 });
  }
}