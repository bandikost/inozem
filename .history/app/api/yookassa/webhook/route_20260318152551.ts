import { assignProgramToUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("🔥 WEBHOOK HIT");

  try {
    const body = await req.json();
    console.log("BODY:", body.event);

    if (body.event === "payment.succeeded") {
      const payment = body.object;

      const userId = Number(payment.metadata?.userId);
      const programId = Number(payment.metadata?.programId);

      console.log("META:", userId, programId);

      if (userId && programId) {
        try {
          await assignProgramToUser(userId, programId);
          console.log("✅ ACCESS GRANTED");
        } catch (dbError) {
          console.log("❌ DB ERROR", dbError);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("❌ WEBHOOK CRASH", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}