import { pruffmeRequest } from "@/lib/lectures/pruffme"
import { NextResponse } from "next/server"


export async function GET() {
    try {
        const data = await pruffmeRequest(
            "webinars-list",
            {
                limit: 100,
                offset: 0,
            }
        )

        return NextResponse.json(data)

    } catch (error) {

        console.error("PRUFFME WEBINARS ERROR:", error)

        return NextResponse.json(
            {
                error: "Ошибка получения вебинаров Pruffme",
            },
            {
                status: 500,
            }
        )
    }
}