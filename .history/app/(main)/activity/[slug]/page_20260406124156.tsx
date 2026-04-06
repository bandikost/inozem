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
        <div className="mt-27 h-full text-center">
        {activity.title_bg && (
          <div 
            className="w-full py-10 mb-6 rounded-md bg-cover bg-center" 
            style={{ backgroundImage: `url(${activity.title_bg})` }}
          >
            <h1 className="text-white text-3xl font-bold">{activity.name}</h1>
          </div>
        )}

        {!activity.title_bg && (
          <h1 className="text-prpl !text-2xl">{activity.name}</h1>
        )}

        <div className="text-center text-3xl mt-4" dangerouslySetInnerHTML={{ __html: activity.title }} />
        <div className="text-center !text-2xl mt-4" dangerouslySetInnerHTML={{ __html: activity.dates }} />
      </div>

      <div className="mb-6 mt-30">
        <h2 className="text-xl text-prpl mb-2">Описание</h2>
        <div dangerouslySetInnerHTML={{ __html: activity.description }} />
      </div>

      <div className="mb-6 flex flex-col md:flex-row items-start gap-4">
        {activity.teacher_img && (
          <img src={activity.teacher_img} alt="Преподаватель" className="w-48 h-48 object-cover rounded-md shadow-lg"/>
        )}
        <div className="flex-1">
          <h2 className="text-xl text-prpl mb-2">Преподаватель</h2>
          <div dangerouslySetInnerHTML={{ __html: activity.teacher }} />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-prpl mb-2">Цель семинара</h2>
        <div dangerouslySetInnerHTML={{ __html: activity.purpose }} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-prpl mb-2">Аудитория</h2>
         <div className="text-left !text-2xl mt-4" dangerouslySetInnerHTML={{ __html: activity.audience}} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-prpl mb-2">Условия участия</h2>
        <div dangerouslySetInnerHTML={{ __html: activity.conditions }} />
      </div>
    </section>
  )
}