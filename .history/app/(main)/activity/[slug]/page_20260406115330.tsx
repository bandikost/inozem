import { getActivity } from "@/lib/activity"
import { notFound } from "next/navigation"

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
     const { slug } = await params 
  const activities = await getActivity()
  const activity = activities.find(act => act.slug === slug)

  if (!activity) return notFound()

  return (
    <section className='flex flex-col justify-center pb-20 px-4'>
        <div className=" mt-27 h-full">

            <h1 className="text-prpl text-xl text-center">{activity.name}</h1>
            <div className="text-center text-2xl" dangerouslySetInnerHTML={{ __html: activity.title }} />
            <div className="text-center" dangerouslySetInnerHTML={{ __html: activity.dates }} />
        </div>

      <div className="mb-6 mt-30">
        <h2 className="text-xl text-prpl mb-2">Описание</h2>
        <div dangerouslySetInnerHTML={{ __html: activity.description }} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-prpl mb-2">Преподаватель</h2>
        <div dangerouslySetInnerHTML={{ __html: activity.teacher }} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-prpl mb-2">Цель семинара</h2>
        <div dangerouslySetInnerHTML={{ __html: activity.purpose }} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-prpl mb-2">Аудитория</h2>
        <p>{activity.audience}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-prpl mb-2">Условия участия</h2>
        <div dangerouslySetInnerHTML={{ __html: activity.conditions }} />
      </div>
    </section>
  )
}