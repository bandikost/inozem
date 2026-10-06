
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

          console.log("================================")
          console.log("WEBINAR:", webinar.name)
          console.log("TIMES:", times)
          console.log("================================")

          const now = Date.now()

const availableTimes = times
  .map((time: any) => {
    const start = new Date(time.selected_date).getTime()
    const duration = Number(time.duration) || 0

    // Pruffme duration в минутах
    const end = start + duration * 60 * 1000

    return {
      date: time.selected_date,
      duration,
      start,
      end,
      isLive: start <= now && now < end,
    }
  })
  .filter((time: any) => time.end > now)
  .sort((a: any, b: any) => a.start - b.start)

const nextTime = availableTimes[0]

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

    const result = webinarsWithDates
      .filter((webinar: any) => webinar.date)
      .sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      )
      .slice(0, 10)

    console.log("RESULT:", result)

    return NextResponse.json({
      result,
    })
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
