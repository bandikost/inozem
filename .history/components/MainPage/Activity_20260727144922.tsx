import { ArrowRight, ChevronRight } from "lucide-react";
import LoadingLink from "../Load/LoadingLink";
import parseDateActivity from "@/lib/dates/filterDate";
import { getActivity } from "@/lib/activity";


function getActivityDate(act: { dates: string; year?: number | null }) {
  if (!act.year) return null

  return parseDateActivity(act.dates, act.year)
}


export default async function Activity() {

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


    const upcomingYear = upcomingActivities[0]?.year ?? null


    return (
        <div className="w-full mt-24 px-4">
            <div className="flex flex-col items-start text-left px-2">
                <h4 className="text-3xl font-bold text-prpl">
                    Ближайшие мероприятия
                </h4>

                
       
         <div className="flex items-center gap-4 my-10">
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingActivities
            .slice(0, 2)
            .map((act) => (
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
                    {act.year && ` | ${act.year}`}
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
        

            </div>
        </div>

         <div className="mt-10 flex justify-center">
          <LoadingLink
            href="/activity"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-2xl
              border
              border-blue
              px-6
              py-3
              text-blue
              transition-all
              duration-200
              hover:bg-blue
              hover:!text-white
            "
          >
            Все мероприятия
        
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
            />
          </LoadingLink>
        </div>
        </div>
    )
}