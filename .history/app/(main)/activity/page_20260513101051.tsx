import { getActivity } from "@/lib/activity"
import parseDate from "@/lib/months"
import Link from "next/link"

export const metadata = {
    title: "Мероприятия | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»"
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

  const upcomingYear = upcomingActivities[0] ? parseDate(upcomingActivities[0].dates)?.getFullYear() : null
  const pastYear = pastActivities[0] ? parseDate(pastActivities[0].dates)?.getFullYear() : null

  return (
    <section className='flex flex-col justify-center pb-20 px-4'>
      <h1 className='mt-27 text-prpl text-center'>Образовательные мероприятия</h1>

      {upcomingActivities.length > 0 && (
        <>
          <h2 className="text-prpl my-10 !text-3xl">Предстоящие мероприятия {upcomingYear ? `— ${upcomingYear} г.` : ''}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingActivities.map(act => (
              <div key={act.id} className="border border-gray-300 shadow-xl rounded-md p-4">
                <div className="flex flex-col justify-between w-full h-full">
                <h3 className="text-prpl !text-xl">{act.name}</h3>
                <div className="flex items-center mt-5 gap-4">
                  <div className="!font-normal" dangerouslySetInnerHTML={{ __html: act.dates }} />
                  <Link className="hover:underline !text-lg" href={`/activity/${act.slug}`}>Подробнее</Link>
                </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {pastActivities.length > 0 && (
        <>
          <h2 className="text-prpl mb-10 mt-15 !text-3xl">
            Прошедшие мероприятия {pastYear ? `— ${pastYear} г.` : ''}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastActivities
             .sort((a, b) => {
              const dateA = parseDate(a.dates)
              const dateB = parseDate(b.dates)

              if (!dateA || !dateB) return 0

              return dateB.getTime() - dateA.getTime()
            })
            .map(act => (
              <div key={act.id} className="border border-gray-300 shadow-xl rounded-md p-4 opacity-70">

              <div className="flex flex-col justify-between w-full h-full">
                
                  <h3 className="text-prpl !text-2xl">{act.name}</h3>
                    <div className="flex items-center mt-5 gap-4">
                      <div className="!font-normal opacity-60" dangerouslySetInnerHTML={{ __html: act.dates }} />
                      <Link className="hover:underline !text-lg" href={`/activity/${act.slug}`}>Подробнее</Link>
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