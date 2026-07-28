import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const orderId = searchParams.get("order");

  if (!orderId) {
    return NextResponse.json({
      success: false,
    });
  }

  return NextResponse.json({
    success: true,
  });
}