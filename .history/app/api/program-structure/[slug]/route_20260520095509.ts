import { NextResponse } from "next/server"

let programs: any = []

export async function GET() {
  return NextResponse.json(programs)
}

export async function POST(req: Request) {
  programs = await req.json()
  return NextResponse.json({ ok: true, programs })
}