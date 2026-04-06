import { getActivity } from "@/lib/activity"
import Link from "next/link"


function parseDate(dates: string): Date | null {

  const match = dates.match(/(\d{1,2})\s+([а-яё]+)\s+(\d{4})/i)
  if (!match) return null

  const day = parseInt(match[1], 10)
  const monthStr = match[2].toLowerCase()
  const year = parseInt(match[3], 10)

  const months: Record<string, number> = {
    'января': 0,
    'февраля': 1,
    'марта': 2,
    'апреля': 3,
    'мая': 4,
    'июня': 5,
    'июля': 6,
    'августа': 7,
    'сентября': 8,
    'октября': 9,
    'ноября': 10,
    'декабря': 11,
  }

  if (!(monthStr in months)) return null
  return new Date(year, months[monthStr], day)
}

export default async function Page() {
  const activity = await getActivity()
  const now = new Date()

  const upcomingActivities = activity.filter(act => {
    const date = parseDate(act.dates)
    return date ? date >= now : false
  })

  const pastActivities = activity.filter(act => {
    const date = parseDate(act.dates)
    return date ? date < now : false
  })

  return (
    <section className='flex flex-col justify-center pb-20 px-4'>
      <h1 className='mt-27 text-prpl text-center'>Образовательные мероприятия({parseDate(act.dates)?.getFullYear()})</h1>

      {upcomingActivities.length > 0 && (
        <>
          <h2 className="text-prpl my-10">Предстоящие мероприятия</h2>
          <div className="grid grid-cols-2 gap-4">
            {upcomingActivities.map(act => (
              <div key={act.id} className="border border-gray-300 shadow-2xl rounded-md p-4">
                <h3 className="text-prpl">{act.name} </h3>
                <div className="flex items-center mt-2 gap-4">
                  <div dangerouslySetInnerHTML={{ __html: act.dates }} />
                  <Link className="hover:underline !text-lg" href={`/activity/${act.slug}`}>Подробнее</Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {pastActivities.length > 0 && (
        <>
          <h2 className="text-prpl mt-10">Прошедшие мероприятия</h2>
          <div className="grid grid-cols-2 gap-4">
            {pastActivities.map(act => (
              <div key={act.id} className="border border-gray-300 shadow-2xl rounded-md p-4 opacity-70">
                <h3 className="text-prpl">{act.name} ({parseDate(act.dates)?.getFullYear()})</h3>
                <div className="flex items-center mt-2 gap-4">
                  <div dangerouslySetInnerHTML={{ __html: act.dates }} />
                  <Link className="hover:underline !text-lg" href={`/activity/${act.slug}`}>Подробнее</Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}