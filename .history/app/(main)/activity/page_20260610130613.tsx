import { getActivity } from "@/lib/activity"
import parseDateActivity from "@/lib/dates/filterDate";
import Link from "next/link"

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Мероприятия | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»"
}

function getActivityDate(act: { dates: string; year?: number | null }) {
  if (!act.year) return null

  return parseDateActivity(act.dates, act.year)
}

export default async function Page() {
  const activity = await getActivity()
  const now = new Date()

  const upcomingActivities = activity
    .filter((act) => {
      const date = getActivityDate(act)
      return date ? date >= now : false
    })
    .sort((a, b) => {
      const dateA = getActivityDate(a)
      const dateB = getActivityDate(b)

      if (!dateA || !dateB) return 0

      return dateA.getTime() - dateB.getTime()
    })

  const pastActivities = activity
    .filter((act) => {
      const date = getActivityDate(act)
      return date ? date < now : false
    })
    .sort((a, b) => {
      const dateA = getActivityDate(a)
      const dateB = getActivityDate(b)

      if (!dateA || !dateB) return 0

      return dateB.getTime() - dateA.getTime()
    })

  const upcomingYear = upcomingActivities[0]?.year ?? null
  const pastYear = pastActivities[0]?.year ?? null

  return (
    <section className="flex flex-col justify-center pb-20 px-4">
      <h1 className="mt-27 text-prpl text-center">
        Образовательные мероприятия
      </h1>

      {upcomingActivities.length > 0 && (
        <>
          <h2 className="text-prpl my-10 !text-3xl">
            Предстоящие мероприятия
            {upcomingYear ? ` — ${upcomingYear} г.` : ""}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingActivities.map((act) => (
              <Link key={act.id} href={`/activity/${act.slug}`} className="group rounded-xl border border-zinc-200 bg-white p-1 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
             
              <div className="px-6 pt-6 pb-2 flex flex-col h-full min-h-[180px]">
                
                <div className="text-xl text-prpl"> <span dangerouslySetInnerHTML={{ __html: act.dates }} />
                  {act.year && ` ${act.year}`}
                </div>

                <h3 className="flex-1 mt-4 text-xl leading-tight text-gray-400"> {act.name} </h3>

                <div className="mt-4 inline-flex items-center text-lg gap-2 text-green group-hover:gap-3 transition-all">
                  Перейти →
                </div>

              </div>
            </Link>
            ))}
          </div>
        </>
      )}

      {pastActivities.length > 0 && (
        <>
          <h2 className="text-prpl mb-10 mt-15 !text-3xl">
            Прошедшие мероприятия
            {pastYear ? ` — ${pastYear} г.` : ""}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastActivities.map((act) => (
              <div
                key={act.id}
                className="border border-gray-300 shadow-xl rounded-md p-4 opacity-70"
              >
                <div className="flex flex-col justify-between w-full h-full">
                  <h3 className="text-prpl !text-2xl">
                    {act.name}
                  </h3>

                  <div className="flex items-center mt-5 gap-4">
                    <div className="!font-normal opacity-60">
                      <span
                        dangerouslySetInnerHTML={{ __html: act.dates }}
                      />
                      {act.year && ` ${act.year}`}
                    </div>

                    <Link
                      className="hover:underline !text-lg"
                      href={`/activity/${act.slug}`}
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}