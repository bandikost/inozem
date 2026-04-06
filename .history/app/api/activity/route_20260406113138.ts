import { getActivity } from "@/lib/activity"
import { NextResponse } from "next/server"


export async function GET() {
  try {
    const activities = await getActivity()
    return NextResponse.json({ success: true, data: activities })
  } catch (err) {
    console.error("Failed to fetch activities:", err)
    return NextResponse.json({ success: false, error: "Failed to fetch activities" }, { status: 500 })
  }
}