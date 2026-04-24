import { NextResponse } from "next/server"
import { getPromo } from "@/lib/promo"

export async function GET() {
  try {
    const promo = await getPromo()

    return NextResponse.json(promo)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch promo" },
      { status: 500 }
    )
  }
}