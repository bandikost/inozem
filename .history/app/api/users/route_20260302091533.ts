import { NextResponse } from "next/server"
import { getTeachers } from "@/lib/users"

export async function GET() {
  const teachers = await getTeachers()
  return NextResponse.json(teachers)
}