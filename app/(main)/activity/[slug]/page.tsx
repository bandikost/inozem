import { getActivity, getActivityBySlug } from "@/lib/activity"
import { notFound } from "next/navigation"
import parse, { domToReact, Element, DOMNode } from "html-react-parser"
import ImageWithSkeleton from "@/components/ui/LazyLoad/ImageWithSkeleton"
import LoadingLink from "@/components/Load/LoadingLink"
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  Users,
  ClipboardCheck,
  Target,
  GraduationCap,
  ArrowRight,
  CreditCard,
  FileText,
} from "lucide-react"

interface PageProps {
  params: { slug: string }
}

interface ProgramsPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProgramsPageProps) {
  const { slug } = await params
  const program = await getActivityBySlug(slug)

  return {
    title: program
      ? `${program.name} | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»`
      : "Мероприятие не найдено",
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const activities = await getActivity()
  const activity = activities.find((act) => act.slug === slug)

  if (!activity) return notFound()

  /*
   * Информационные блоки.
   * Пустые автоматически убираются.
   */
  const infoBlocks = [
    {
      title: "Цель мероприятия",
      content: activity.purpose,
      icon: Target,
    },
    {
      title: "Аудитория",
      content: activity.audience,
      icon: Users,
    },
    {
      title: "Контроль присутствия",
      content: activity.attendance_control,
      icon: ClipboardCheck,
    },
    {
      title: "Место проведения",
      content: activity.location,
      icon: MapPin,
    },
    {
      title: "Планируемые результаты",
      content: activity.planned_results,
      icon: GraduationCap,
    },
  ].filter((block) => block.content)

  return (
    <section className="min-h-screen pb-20">
      <div className="container mx-auto mt-27 px-2">
        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 px-4 text-md text-zinc-500">

          <LoadingLink
            href="/"
            className="shrink-0 transition hover:text-blue hover:underline"
          >
            Главная
          </LoadingLink>

          <ChevronRight size={14} className="shrink-0" />

          <LoadingLink
            href="/activity"
            className="shrink-0 transition hover:text-blue hover:underline"
          >
            Образовательные мероприятия
          </LoadingLink>

          <ChevronRight size={14} className="shrink-0" />

          <span
            className="min-w-0 flex-1 truncate text-zinc-800 opacity-70"
            title={activity.name}
          >
            {activity.name}
          </span>

        </nav>

        {activity.title_bg ? (

          <div
            className="relative min-h-[560px] overflow-hidden rounded-[2rem] px-5 sm:px-8 py-4"
            style={{
              backgroundImage: `url(${activity.title_bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />

            <div className="relative z-10 flex min-h-[560px] items-center justify-center">

              <div className="max-w-5xl text-center">

                <div className="mb-7 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md">
                  Образовательное мероприятие
                </div>

                <h1 className="!text-xl leading-tight text-white md:!text-3xl ">
                  {activity.name}
                </h1>

                {activity.title && (
                  <div
                    className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl"
                    dangerouslySetInnerHTML={{
                      __html: activity.title,
                    }}
                  />
                )}

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

                  {activity.dates && (
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-base font-semibold text-prpl shadow-xl">
                      <CalendarDays size={19} />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: activity.dates,
                        }}
                      />
                    </div>
                  )}

                  {activity.price > 0 && (
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-prpl px-5 py-3.5 text-base font-semibold text-white shadow-xl">
                      <CreditCard size={19} />
                      {activity.price} ₽
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        ) : (

          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white px-6 py-14 text-center shadow-sm md:px-12 md:py-20">

            <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 rounded-b-full bg-prpl" />

            <div className="mx-auto max-w-4xl">

              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-prpl/60">
                Образовательное мероприятие
              </div>

              <h1 className="!text-3xl font-bold leading-tight text-prpl md:!text-5xl">
                {activity.name}
              </h1>

              {activity.title && (
                <div
                  className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-zinc-500 md:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: activity.title,
                  }}
                />
              )}

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

                {activity.dates && (
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-prpl/10 px-5 py-3 text-base font-semibold text-prpl">
                    <CalendarDays size={18} />

                    {activity.dates}
                  </div>
                )}

                {activity.price > 0 && (
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-blue px-5 py-3 text-base font-semibold text-white">
                    <CreditCard size={18} />

                    {activity.price} ₽
                  </div>
                )}

              </div>

            </div>

          </div>

        )}


        <div className="mx-auto mt-12 max-w-6xl">

          {activity.description &&
          typeof activity.description === "string" ? (

            <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm md:px-10 md:py-10">

              <div className="prose prose-zinc max-w-none text-lg leading-[1.7] text-default">

                {parse(activity.description, {
                  replace: (domNode) => {

                    if (domNode instanceof Element) {

                      if (domNode.name === "h2") {
                        return (
                          <h2 className="mb-6 mt-2 !text-2xl font-semibold text-prpl md:!text-3xl">
                            {domToReact(
                              domNode.children as unknown as DOMNode[]
                            )}
                          </h2>
                        )
                      }

                      if (domNode.name === "ul") {
                        return (
                          <ul className="my-8 flex flex-col gap-4">
                            {domToReact(
                              domNode.children as unknown as DOMNode[]
                            )}
                          </ul>
                        )
                      }

                      if (domNode.name === "li") {
                        return (
                          <li className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-prpl" />

                            <span>
                              {domToReact(
                                domNode.children as unknown as DOMNode[]
                              )}
                            </span>
                          </li>
                        )
                      }

                    }
                  },
                })}

              </div>

            </section>

          ) : (

            <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-12 text-center shadow-sm">

              <h2 className="!text-xl opacity-60">
                На данный момент информация о мероприятии отсутствует
              </h2>

              <p className="mt-3 opacity-60">
                Вы можете ознакомиться с{" "}
                <LoadingLink
                  href="/activity"
                  className="text-prpl hover:underline"
                >
                  другими мероприятиями
                </LoadingLink>
              </p>

            </section>

          )}

        {activity.teacher && (
  <section className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
    <div className="relative overflow-hidden bg-zinc-50 px-7 py-8 md:px-10 md:py-9">

      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-prpl/5" />
      <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-purple-500/80" />

      <div className="relative">

        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-prpl/60">
          Спикеры мероприятия
        </span>

        <h2 className="mt-3 !text-2xl font-semibold text-prpl md:!text-3xl">
          Кто будет вести мероприятие
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-default/60">
          Мероприятие проводят практикующие специалисты и эксперты
          в соответствующих областях.
        </p>

      </div>

    </div>


  
    <div className="p-6 md:p-8">

      <div className={`grid grid-cols-1 gap-6 ${  activity.teacher_img ? "md:grid-cols-2" : ""}`}>
    
        {activity.teacher_img && (
          <div className="
            relative
            overflow-hidden
            rounded-2xl
            bg-zinc-100
            min-h-[280px]
            md:min-h-[360px]
          ">

            <ImageWithSkeleton
              src={activity.teacher_img}
              alt="Спикер мероприятия"
              wrapperClassName="
                h-full
                w-full
                overflow-hidden
                rounded-2xl
              "
              aspect="1/1"
            />

          </div>
        )}

        <div className="
          flex
          flex-col
          justify-center
          rounded-2xl
          border
          border-zinc-200
          bg-white
          p-6
          md:p-8
        ">

          <div
            className="
              text-default/75
              leading-7

              [&_h3]:!text-xl
              [&_h3]:md:!text-2xl
              [&_h3]:font-semibold
              [&_h3]:text-prpl
              [&_h3]:mb-3

              [&_p]:mb-5
              [&_p:last-child]:mb-0
            "
            dangerouslySetInnerHTML={{
              __html: activity.teacher,
            }}
          />

        </div>

      </div>

    </div>

  </section>
)}

          {infoBlocks.length > 0 && (

            <section className="mt-8">

              <div className="mb-6">

                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-blue">
                  О мероприятии
                </span>

                <h2 className="mt-2 !text-2xl font-semibold md:!text-3xl">
                  Основная информация
                </h2>

              </div>


              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {infoBlocks.map((block, index) => {

                  const Icon = block.icon

                  const isLast =
                    infoBlocks.length % 2 === 1 &&
                    index === infoBlocks.length - 1

                  return (
                    <div
                      key={block.title}
                      className={`
                        rounded-[1.75rem]
                        border
                        border-zinc-200
                        bg-white
                        p-7
                        shadow-sm
                        transition
                        hover:-translate-y-0.5
                        hover:shadow-md
                        ${isLast ? "md:col-span-2" : ""}
                      `}
                    >

                      <div className="flex items-start gap-4">

                       

                        <div className="min-w-0">

                          <h3 className="!text-xl font-semibold text-prpl">
                            {block.title}
                          </h3>

                          <div
                            className="mt-3 leading-7 text-default/70"
                            dangerouslySetInnerHTML={{
                              __html: block.content!,
                            }}
                          />

                        </div>

                      </div>

                    </div>
                  )
                })}

              </div>

            </section>

          )}

          <section
            className={`
              mt-8
              grid
              grid-cols-1
              gap-5
              ${activity.conditions ? "md:grid-cols-2" : ""}
            `}
          >
            {activity.conditions && (

              <div className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm md:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <FileText size={21} />
                  </div>

                  <div>

                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-blue/60">
                      Перед участием
                    </span>

                    <h2 className="mt-1 !text-2xl font-semibold text-prpl">
                      Условия участия
                    </h2>

                  </div>

                </div>

                <div
                  className="mt-6 leading-7 text-default/75"
                  dangerouslySetInnerHTML={{
                    __html: activity.conditions,
                  }}
                />

              </div>

            )}

            <div className="relative overflow-hidden rounded-[2rem] bg-blue text-white shadow-lg">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />

              <div className="absolute -right-8 top-8 h-28 w-28 rounded-full bg-white/5" />

              <div className="relative flex h-full flex-col p-7 md:p-8">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <CreditCard size={21} />
                    </div>

                    <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/65">
                      Участие
                    </span>

                  </div>

                  <h2 className="mt-5 !text-2xl font-semibold text-white md:!text-3xl">
                    Примите участие
                  </h2>

                  <p className="mt-2 max-w-md leading-6 text-white/65">
                    Выберите удобный способ участия в мероприятии.
                  </p>


                  {activity.price > 0 && (

                    <div className="mt-7">

                      <span className="block text-sm text-white/55">
                        Стоимость участия
                      </span>

                      <span className="mt-1 block text-4xl font-semibold tracking-tight text-white">
                        {activity.price} ₽
                      </span>

                    </div>

                  )}

                </div>


                <div className="mt-8 flex flex-col gap-3">

                  {activity.paylink && (

                    <LoadingLink
                      href={activity.paylink}
                      className="
                        group
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-white
                        px-5
                        py-4
                        text-base
                        font-semibold
                        text-blue
                        transition
                        hover:bg-white/90
                        active:scale-[0.99]
                      "
                    >
                      <CreditCard size={19} />

                      Оплатить участие

                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />

                    </LoadingLink>

                  )}


                  <LoadingLink
                    href={`/activity-form?title=${encodeURIComponent(activity.name)}`}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-white/20
                      bg-white/10
                      px-5
                      py-4
                      text-base
                      font-medium
                      !text-white
                      backdrop-blur-sm
                      transition
                      hover:bg-white/15
                    "
                  >
                    <FileText size={18} />

                    Подать заявку

                  </LoadingLink>

                </div>

              </div>

            </div>

          </section>


        </div>

      </div>
    </section>
  )
}