import { pruffmeRequest } from "@/lib/lectures/pruffme"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = await pruffmeRequest("webinars-list", {
      limit: 100,
      offset: 0,
    })

    const webinars = data.result ?? []

    const webinarsWithDates = await Promise.all(
      webinars.map(async (webinar: any) => {
        try {
          const info = await pruffmeRequest("webinar-info", {
            hash: webinar.hash,
          })

          const times = info.webinar?.times ?? []

          const futureTimes = times
            .map((time: any) => ({
              date: time.selected_date,
              duration: time.duration,
            }))
            .filter((time: any) => {
                const webinarStart = new Date(time.date).getTime()

                const webinarEnd = webinarStart + 3 * 60 * 60 * 1000

                return webinarEnd > Date.now()
                })
            .sort(
              (a: any, b: any) =>
                new Date(a.date).getTime() -
                new Date(b.date).getTime()
            )

          const nextTime = futureTimes[0]

          return {
            id: webinar.id,
            hash: webinar.hash,
            name: webinar.name,
            landing: webinar.landing,
            date: nextTime?.date ?? null,
            duration: nextTime?.duration ?? null,
          }
        } catch (error) {
          console.error(
            `Ошибка получения webinar-info ${webinar.hash}:`,
            error
          )

          return {
            id: webinar.id,
            hash: webinar.hash,
            name: webinar.name,
            landing: webinar.landing,
            date: null,
            duration: null,
          }
        }
      })
    )

    const upcomingWebinars = webinarsWithDates
      .filter((webinar: any) => webinar.date)
      .sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )
      .slice(0, 2)

    return NextResponse.json(upcomingWebinars)

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