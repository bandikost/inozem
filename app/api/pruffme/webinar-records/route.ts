import { NextRequest, NextResponse } from "next/server"
import { pruffmeRequest } from "@/lib/lectures/pruffme"

export async function GET(req: NextRequest) {
    try {
        const data = await pruffmeRequest(
            "webinar-records",
            {}
        )

        return NextResponse.json(data)

    } catch (error) {

        console.error("PRUFFME WEBINAR RECORDS ERROR:", error)

        return NextResponse.json(
            {
                error: "Ошибка получения записей вебинаров",
            },
            {
                status: 500,
            }
        )
    }
}