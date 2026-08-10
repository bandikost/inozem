import { pruffmeRequest } from "@/lib/lectures/pruffme"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {

    try {

        const hash = req.nextUrl.searchParams.get("hash")

        if (!hash) {
            return NextResponse.json(
                { error: "Не указан hash вебинара" },
                { status: 400 }
            )
        }

        const data = await pruffmeRequest(
            "webinar-get-registrations-stat",
            {
                webinar: hash,

                date_from: "2020-01-01 00:00:00",

                date_to: "2030-12-31 23:59:59",
            }
        )

        return NextResponse.json(data)

    } catch (error) {

        console.error(
            "PRUFFME PARTICIPANTS ERROR:",
            error
        )

        return NextResponse.json(
            {
                error: "Ошибка получения участников",
            },
            {
                status: 500,
            }
        )
    }
}