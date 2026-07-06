import { getActivity } from "@/lib/activity"
import { notFound } from "next/navigation"
import parse, { domToReact, Element, DOMNode } from "html-react-parser"
import ImageWithSkeleton from "@/components/ui/LazyLoad/ImageWithSkeleton"
import LoadingLink from "@/components/Load/LoadingLink"

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const activities = await getActivity()
  const activity = activities.find((act) => act.slug === slug)

  if (!activity) return notFound()

  return (
    <section className="pb-24">

      {activity.title_bg ? (
        <div
          className="relative min-h-[550px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${activity.title_bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 max-w-5xl px-6 text-center">
            <div className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-md px-5 py-2 text-white text-sm mb-8">
              Образовательное мероприятие
            </div>

            <h1 className="text-white !text-2xl leading-tight">
              {activity.name}
            </h1>

            {activity.title && (
              <div
                className="mt-8 text-white/90 text-xl md:text-2xl"
                dangerouslySetInnerHTML={{ __html: activity.title }}
              />
            )}

            <div className="mt-10 inline-flex rounded-2xl bg-white px-8 py-4 text-prpl text-xl shadow-xl">
              <span dangerouslySetInnerHTML={{ __html: activity.dates }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 pt-32 text-center">
          <h1 className="text-prpl !text-2xl">{activity.name}</h1>

          {activity.title && (
            <div
              className="mt-6 text-3xl text-gray-600 font-light"
              dangerouslySetInnerHTML={{ __html: activity.title }}
            />
          )}

          <div
            className="mt-6 text-2xl text-prpl"
            dangerouslySetInnerHTML={{ __html: activity.dates }}
          />
        </div>
      )}


      <div className="max-w-6xl mx-auto px-4 mt-14">

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 md:p-10 shadow-sm text-lg text-default">
        {Array.isArray(activity.content) && activity.content.length > 0 ? (
  <div className="space-y-6">
    {activity.content.map((block: any, i: number) => (
      <div key={i}>
        
        {block.type === "title" && (
          <h2 className="text-2xl font-semibold text-prpl">
            {block.value}
          </h2>
        )}

        {block.type === "text" && (
          <p className="text-gray-700 whitespace-pre-line">
            {block.value}
          </p>
        )}

        {block.type === "list" && (
          <ul className="list-disc pl-5 space-y-1">
            {block.items.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

      </div>
    ))}
  </div>
) : (
  <div className="text-center py-10">
    <h2 className="!text-xl opacity-60">
      На данный момент информация о мероприятии отсутствует
    </h2>

    <p className="mt-3">
      <span className="opacity-60">
        Вы можете ознакомиться с другими
      </span>{" "}
      <LoadingLink
        href="/activity"
        className="text-prpl hover:underline"
      >
        мероприятиями
      </LoadingLink>
    </p>
  </div>
)}
        </div>

        {activity.teacher && (
          <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              {activity.teacher_img && (
                <ImageWithSkeleton
                  src={activity.teacher_img}
                  alt="Преподаватель мероприятия"
                  wrapperClassName="w-[220px] h-[220px] rounded-2xl object-cover overflow-hidden"
                  aspect="1/1"
                />
              )}

              <div className="flex-1">
                <div className="uppercase tracking-wider text-zinc-500 text-sm">
                  Спикер мероприятия
                </div>

                <h2 className="text-prpl mt-2 mb-5">
                  Кто будет вести мероприятие
                </h2>

                <div
                  dangerouslySetInnerHTML={{
                    __html: activity.teacher,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {activity.purpose && (
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
              <h2 className="text-prpl mb-4">Цель мероприятия</h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: activity.purpose,
                }}
              />
            </div>
          )}

          {activity.audience && (
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
              <h2 className="text-prpl mb-4">Аудитория</h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: activity.audience,
                }}
              />
            </div>
          )}

          {activity.conditions && (
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm md:col-span-2">
              <h2 className="text-prpl mb-4">Условия участия</h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: activity.conditions,
                }}
              />
            </div>
          )}
        </div>

        {activity.content && (
       
            <div className="rounded-3xl bg-gradient-to-r from-green to-prpl p-8 text-center text-white">

              <p className="mt-3 opacity-90">
                Подайте заявку на участие или оплатите мероприятие онлайн.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-4">
                <LoadingLink href={`/activity-form?title=${encodeURIComponent(activity.title || activity.name)}`} className="!text-lg button-more">
                  Подать заявку
                </LoadingLink>

                {activity.paylink && (
                  <LoadingLink href={activity.paylink} className="rounded-2xl button-more-bulge border border-white px-8 py-4 text-lg hover:bg-white hover:text-prpl transition">
                    Оплатить участие
                  </LoadingLink>
                )}
              </div>
            </div>
       
        )}
      </div>
    </section>
  )
}