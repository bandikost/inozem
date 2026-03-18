import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.event === "payment.succeeded") {
    console.log("Платёж прошёл:", body.object.id);
  }

  return NextResponse.json({ status: "ok" });
}