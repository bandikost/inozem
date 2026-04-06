import { getActivity } from "@/lib/activity"
import { notFound } from "next/navigation"
import parse, { domToReact, Element, DOMNode } from 'html-react-parser'

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
        <div className="mt-27  text-center">
        {activity.title_bg && (
          <div className="w-full h-[450px] py-10 mb-6 rounded-md bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: `url(${activity.title_bg})` }}>
            <h1 className="text-white !text-2xl font-bold">{activity.name}</h1>
            <div className="text-center text-3xl mt-4 text-white" dangerouslySetInnerHTML={{ __html: activity.title }} />
        <div className="text-center !text-2xl mt-4 text-prpl !font-semibold" dangerouslySetInnerHTML={{ __html: activity.dates }} />
          </div>
          
        )}

        {!activity.title_bg && (
          <>
          <h1 className="text-prpl !text-2xl">{activity.name}</h1>
            <div className="text-center text-3xl mt-4" dangerouslySetInnerHTML={{ __html: activity.title }} />
            <div className="text-center !text-2xl mt-4" dangerouslySetInnerHTML={{ __html: activity.dates }} />
          </>
          
        )}

        
      </div>

      <div className="mb-6 mt-10">
    
        <div>
  {parse(activity.description, {
    replace: domNode => {
      if (domNode instanceof Element) {
        if (domNode.name === 'h2') {
          return (
            <h2 className="text-prpl">
              {domToReact(domNode.children as unknown as DOMNode[])}
            </h2>
          )
        }
        
        if (domNode.name === 'ul') {
          return (
            <ul className="my-10 flex flex-col gap-2">
              {domToReact(domNode.children as unknown as DOMNode[])}
            </ul>
          )
        }
        if (domNode.name === 'li') {
          return (
            <li>
              {domToReact(domNode.children as unknown as DOMNode[])}
            </li>
          )
        }
      }
    }
  })}
</div>
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
         <div dangerouslySetInnerHTML={{ __html: activity.audience}} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-prpl mb-2">Условия участия</h2>
        <div dangerouslySetInnerHTML={{ __html: activity.conditions }} />
      </div>
    </section>
  )
}