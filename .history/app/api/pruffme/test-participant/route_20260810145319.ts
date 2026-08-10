import { pruffmeRequest } from "@/lib/lectures/pruffme"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const { webinarHash, email, name, surname } = body

        if (!webinarHash || !email) {
            return NextResponse.json(
                {
                    error: "Нужны webinarHash и email"
                },
                {
                    status: 400
                }
            )
        }

        const data = await pruffmeRequest(
            "create-participant",
            {
                webinar: webinarHash,

                user: {
                    email,
                    name: name || "",
                    surname: surname || "",
                    role: "participant"
                }
            }
        )

        return NextResponse.json(data)

    } catch (error) {

        console.error("TEST PARTICIPANT ERROR:", error)

        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : "Ошибка"
            },
            {
                status: 500
            }
        )
    }
}