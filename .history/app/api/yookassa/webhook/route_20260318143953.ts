import { assignProgramToUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // интересует только успешная оплата
    if (body.event === "payment.succeeded") {
      const payment = body.object;

      const userId = Number(payment.metadata?.userId);
      const programId = Number(payment.metadata?.programId);

      console.log("🔥 WEBHOOK ПРИШЕЛ");

      if (userId && programId) {
        await assignProgramToUser(userId, programId);

        console.log("✅ Доступ выдан:", userId, programId);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Webhook error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}