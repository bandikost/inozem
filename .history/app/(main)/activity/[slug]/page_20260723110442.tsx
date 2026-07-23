import { getActivity, getActivityBySlug } from "@/lib/activity"
import { notFound } from "next/navigation"
import parse, { domToReact, Element, DOMNode } from "html-react-parser"
import ImageWithSkeleton from "@/components/ui/LazyLoad/ImageWithSkeleton"
import LoadingLink from "@/components/Load/LoadingLink"
import { ChevronRight } from "lucide-react"

interface PageProps {
  params: { slug: string }
}

interface ProgramsPageProps { 
   params: { slug: string } // типизируем что хотм получить slug из url
}

export async function generateMetadata({ params }: ProgramsPageProps) {
  const { slug } = await params 
  const program = await getActivityBySlug(slug)
  

  return {
    title: program
      ? `${program.name} | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»`
      : "Программа не найдена",
  }
}


export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const activities = await getActivity()
  const activity = activities.find((act) => act.slug === slug)

  if (!activity) return notFound()

  return (
    <section className="min-h-screen mb-20">
    <div className="container mx-auto px-4 mt-27">

     <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">

      <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
        Главная
      </LoadingLink>

      <ChevronRight size={14} className="shrink-0" />

      <LoadingLink href="/activity" className="shrink-0 hover:text-blue transition hover:underline">
        Образовательные мероприятия
      </LoadingLink>

      <ChevronRight size={14} className="shrink-0" />

  <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70" title={activity.name}>
    {activity.name}
  </span>

</nav>

      {activity.title_bg ? (
        <div
          className="relative min-h-[550px] flex items-center justify-center overflow-hidden rounded-2xl px-4"
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
        <div className="mx-auto mt-8 max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white px-6 py-12 text-center shadow-sm md:px-12 md:py-16">

            <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 rounded-b-full bg-prpl" />

            <div className="mx-auto max-w-4xl">

              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-prpl/70">
                Образовательное мероприятие
              </div>

              <h1 className="!text-3xl font-bold leading-tight text-prpl md:!text-5xl">
                {activity.name}
              </h1>

              {activity.title && (
                <div
                  className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-zinc-500 md:text-xl"
                  dangerouslySetInnerHTML={{ __html: activity.title }}
                />
              )}

              {activity.dates && (
                <div className="mt-8 inline-flex items-center rounded-2xl bg-prpl/10 px-6 py-3 text-lg font-semibold text-prpl">
                  {activity.dates}
                </div>
              )}

            </div>

          </div>
        </div>
      )}


      <div className="max-w-6xl mx-auto mt-14">

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 md:p-10 shadow-sm text-lg text-default">
          {activity.description &&
          typeof activity.description === "string" ? (
            parse(activity.description, {
              replace: (domNode) => {
                if (domNode instanceof Element) {
                  if (domNode.name === "h2") {
                    return (
                      <h2 className="text-prpl mb-5 !text-2xl">
                        {domToReact(
                          domNode.children as unknown as DOMNode[]
                        )}
                      </h2>
                    )
                  }

                  if (domNode.name === "ul") {
                    return (
                      <ul className="flex flex-col gap-4 my-8">
                        {domToReact(
                          domNode.children as unknown as DOMNode[]
                        )}
                      </ul>
                    )
                  }

                  if (domNode.name === "li") {
                    return (
                      <li className="flex gap-3 items-start !text-gray-300">
                        <span className="mt-2 h-2 w-2 rounded-full bg-prpl flex-shrink-0 !text-gray-300" />
                        <span className="!text-gray-300">
                          {domToReact(
                            domNode.children as unknown as DOMNode[]
                          )}
                        </span>
                      </li>
                    )
                  }
                  
                }
              },
            })
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
  <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

    
    <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

      <h2 className="mb-4 text-prpl">
        Условия участия
      </h2>

      <div
        dangerouslySetInnerHTML={{
          __html: activity.conditions,
        }}
      />

    </div>

   
              {activity.description && (
                  <div className="flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">

                    <div className="flex-1 bg-gradient-to-r from-green to-prpl px-8 py-8 text-center">

                      <h2 className="!text-2xl font-semibold text-white">
                        Примите участие
                      </h2>

                      <p className="mt-3 text-white/80">
                        Подайте заявку или зарегистрируйтесь на мероприятие.
                      </p>

                    </div>

                    <div className="flex flex-col gap-3 p-6">

                      <LoadingLink
                        href={`/activity-form?title=${encodeURIComponent(
                          activity.title || activity.name
                        )}`}
                        className="button-more w-full !p-4 !text-base"
                      >
                        Подать заявку
                      </LoadingLink>

                      {activity.paylink && (
                        <LoadingLink
                          href={activity.paylink}
                          className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-prpl
                            px-7
                            py-3.5
                            text-base
                            font-medium
                            text-prpl
                            transition
                            hover:bg-prpl
                            hover:text-white
                          "
                        >
                          Оплатить участие
                        </LoadingLink>
                      )}

                    </div>

                  </div>
                )}

              </div>
            )}
        </div>

      
      </div>
      </div>
    </section>
  )
}