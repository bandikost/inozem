import { assignProgramToUser } from "@/lib/users"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId, programId } = await req.json()

    if (!userId || !programId) {
      return NextResponse.json({ error: "No data" }, { status: 400 })
    }

    await assignProgramToUser(userId, programId)

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}