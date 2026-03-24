import { NextRequest, NextResponse } from "next/server"
import axios, { AxiosError } from "axios"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { item, userId, programId, name, time } = await req.json()

    const auth = Buffer.from(`${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_SECRET}`).toString("base64")

    const response = await axios.post(
      "https://api.yookassa.ru/v3/payments",
      {
        amount: { value: item, currency: "RUB" },
        confirmation: { type: "redirect", return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success` },
        capture: true,
        description: `${name} - ${time} час(-ов)`,
        metadata: { userId, programId },
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          "Idempotence-Key": uuidv4(),
        },
      }
    )

    const paymentId = response.data.id
    const paymentUrl = response.data.confirmation.confirmation_url
    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${paymentId}`

    return NextResponse.json({ url: paymentUrl, paymentId })
  } catch (error: unknown) {
    if (error instanceof AxiosError) console.error(error.response?.data || error.message)
    else if (error instanceof Error) console.error(error.message)
    else console.error(error)

    return NextResponse.json({ error: "Не удалось создать платеж" }, { status: 500 })
  }
}