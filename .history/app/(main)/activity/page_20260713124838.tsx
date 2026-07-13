import { getActivity } from "@/lib/activity"
import parseDateActivity from "@/lib/dates/filterDate"
import LoadingLink from "@/components/Load/LoadingLink"
import { ChevronRight } from "lucide-react"

export const revalidate = 3600

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
    
<section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Образовательные мероприятия
        </span>
      
      </nav>
      <h1 className="text-prpl text-center">
        Образовательные мероприятия
      </h1>

      {upcomingActivities.length > 0 && (
        <>
         <div className="flex items-center gap-4 my-10">
          <div className="w-2 h-12 rounded-full bg-prpl"></div>

          <div>
              <h2 className="text-3xl font-semibold text-zinc-900">
                  Предстоящие мероприятия
              </h2>

              {upcomingYear && (
                  <p className="text-zinc-500 mt-1">
                      {upcomingYear} год
                  </p>
              )}
          </div>
      </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingActivities.map((act) => (
              <LoadingLink key={act.id} href={`/activity/${act.slug}`} className="
        group relative overflow-hidden rounded-3xl
        border border-zinc-200 bg-white shadow-md transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl">

    <div className="h-1 w-full bg-gradient-to-r from-prpl to-green" />

    <div className="flex h-full flex-col p-7">


        <div className="mb-5">

            <span className="
                inline-flex
                items-center
                rounded-full
                bg-prpl/10
                px-4
                py-2
                text-sm
                font-medium
                text-prpl
            ">
                📅
                <span className="ml-2">
                    <span dangerouslySetInnerHTML={{ __html: act.dates }} />
                    {act.year && ` ${act.year}`}
                </span>
            </span>

        </div>

        <h3 className="flex-1 text-2xl font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-prpl">{act.name}</h3>


        <div className="
            mt-8
            flex
            items-center
            justify-between
            border-t
            pt-5
        ">

            <span className="text-zinc-400 text-sm">
                Образовательное мероприятие
            </span>

            <div className="
                flex
                items-center
                gap-2
                font-medium
                text-prpl
            ">

                Подробнее

                <ChevronRight
                    size={18}
                    className="
                        transition-transform
                        group-hover:translate-x-1
                    "
                />

            </div>

        </div>

    </div>

</LoadingLink>
            ))}
          </div>
        </>
      )}

      {pastActivities.length > 0 && (
        <>

  <div className="flex items-center gap-4 my-14">
          <div className="w-2 h-12 rounded-full bg-prpl"></div>

          <div>
              <h2 className="text-3xl font-semibold text-zinc-900">
                  Прошедшие мероприятия
              </h2>

              {pastYear && (
                  <p className="text-zinc-500 mt-1">
                      {pastYear} год
                  </p>
              )}
          </div>
      </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {pastActivities.map((act) => (
      <LoadingLink
    key={act.id}
    href={`/activity/${act.slug}`}
    className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-zinc-200
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        opacity-50
    "
>
    <div className="h-1 w-full bg-gradient-to-r from-prpl to-green" />

    <div className="flex h-full flex-col p-7">

        <div className="mb-5">

            <span className="
                inline-flex
                items-center
                rounded-full
                bg-prpl/10
                px-4
                py-2
                text-sm
                font-medium
                text-prpl
            ">
                📅
                <span className="ml-2">
                    <span dangerouslySetInnerHTML={{ __html: act.dates }} />
                    {act.year && ` ${act.year}`}
                </span>
            </span>

        </div>

        <h3
            className="
                flex-1
                text-2xl
                font-semibold
                leading-snug
                text-zinc-900
                transition-colors
                group-hover:text-prpl
            "
        >
            {act.name}
        </h3>

        <div className="
            mt-8
            flex
            items-center
            justify-between
            border-t
            pt-5
        ">

            <span className="text-zinc-400 text-sm">
                Образовательное мероприятие
            </span>

            <div className="
                flex
                items-center
                gap-2
                font-medium
                text-prpl
            ">

                Подробнее

                <ChevronRight
                    size={18}
                    className="
                        transition-transform
                        group-hover:translate-x-1
                    "
                />

            </div>

        </div>

    </div>

</LoadingLink>
    ))}
  </div>
</>
      )}
      </div>
    </section>
  )
}