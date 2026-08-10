import { NextRequest, NextResponse } from "next/server"
import { pruffmeRequest } from "@/lib/lectures/pruffme"

export async function GET(req: NextRequest) {

    try {

        const hash = req.nextUrl.searchParams.get("hash")

        if (!hash) {
            return NextResponse.json(
                { error: "Не указан hash" },
                { status: 400 }
            )
        }

        const data = await pruffmeRequest(
            "webinar-info",
            {
                hash,
            }
        )

        return NextResponse.json(data)

    } catch (error) {

        console.error("PRUFFME WEBINAR INFO ERROR:", error)

        return NextResponse.json(
            {
                error: "Ошибка получения информации о вебинаре",
            },
            {
                status: 500,
            }
        )
    }
}