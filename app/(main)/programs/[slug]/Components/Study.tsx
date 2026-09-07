import { notFound } from "next/navigation"
import parse, { domToReact, Element, DOMNode } from "html-react-parser"

import ImageWithSkeleton from "@/components/ui/LazyLoad/ImageWithSkeleton"
import LoadingLink from "@/components/Load/LoadingLink"

import {
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

import { getStudyByProgramId } from "@/lib/programs/study"

interface StudyProps {
  programId: number
}

export default async function Study({ programId }: StudyProps) {
  const study = await getStudyByProgramId(programId)

  if (!study) {
    return notFound()
  }

  const price = study.price ?? study.program_price

  const infoBlocks = [
    {
      title: "Цель программы",
      content: study.purpose,
      icon: Target,
    },
    {
      title: "Для кого",
      content: study.audience,
      icon: Users,
    },
    {
      title: "Контроль присутствия",
      content: study.attendance_control,
      icon: ClipboardCheck,
    },
    {
      title: "Место проведения",
      content: study.location,
      icon: MapPin,
    },
    {
      title: "Планируемые результаты",
      content: study.planned_results,
      icon: GraduationCap,
    },
  ].filter((item) => item.content)

  return (
    <main className="min-h-screen bg-[#f7f7f8] pb-20">


      <section className="px-3 pt-3 md:px-5 md:pt-5">

        {study.title_bg ? (
          <div
            className="
              relative
              mx-auto
              min-h-[470px]
              max-w-[1380px]
              overflow-hidden
              rounded-3xl
              bg-zinc-900
            "
            style={{
              backgroundImage: `url(${study.title_bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center 55%",
            
            }}
          >

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

            <div className="relative z-10 flex min-h-[470px] items-end">

              <div className="w-full max-w-5xl px-6 pb-9 md:px-12 md:pb-12">

                <span className="text-lg font-medium text-white/65">
                  Образовательная программа
                </span>

                <h3
                  className="
                    mt-4
                    !text-3xl
                    font-semibold
                    leading-[1.08]
                    tracking-tight
                    text-white
                    sm:!text-4xl
                    md:!text-5xl
                    lg:!text-6xl
                  "
                >
                  {study.name}
                </h3>

                {study.title && (
                  <div
                    className="
                      mt-5
                      max-w-3xl
                      text-base
                      leading-7
                      text-white/75
                      md:text-lg
                    "
                    dangerouslySetInnerHTML={{
                      __html: study.title,
                    }}
                  />
                )}

                <div className="mt-7 flex flex-wrap gap-2">

                  {study.dates && (
                    <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-prpl">

                      <CalendarDays size={17} />

                      <span
                        dangerouslySetInnerHTML={{
                          __html: study.dates,
                        }}
                      />

                    </div>
                  )}

                  {price > 0 && (
                    <div className="flex items-center gap-2 rounded-xl bg-prpl px-4 py-2.5 text-sm font-semibold text-white">

                      <CreditCard size={17} />

                      {price.toLocaleString("ru-RU")} ₽

                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-[1380px] rounded-3xl bg-white px-6 py-16 md:px-12 md:py-20">

            <div className="max-w-5xl">

              <span className="text-sm font-medium text-prpl/55">
                Образовательная программа
              </span>

              <h1 className="
                  mt-4
                  !text-4xl
                  font-semibold
                  leading-[1.08]
                  tracking-tight
                  text-prpl
                  md:!text-6xl
                "
              >
                {study.name}
              </h1>

              {study.title && (
                <div
                  className="
                    mt-5
                    max-w-3xl
                    text-lg
                    leading-8
                    text-default/55
                  "
                  dangerouslySetInnerHTML={{
                    __html: study.title,
                  }}
                />
              )}

              <div className="mt-7 flex flex-wrap gap-2">

                {study.dates && (
                  <div className="flex items-center gap-2 rounded-xl bg-prpl/8 px-4 py-2.5 text-sm font-medium text-prpl">
                    <CalendarDays size={17} />
                    {study.dates}
                  </div>
                )}

                {price > 0 && (
                  <div className="flex items-center gap-2 rounded-xl bg-blue px-4 py-2.5 text-sm font-semibold text-white">
                    <CreditCard size={17} />
                    {price.toLocaleString("ru-RU")} ₽
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </section>

      <div className="mx-auto mt-10 max-w-6xl px-4 md:mt-14 md:px-6">


        {study.description &&
          typeof study.description === "string" && (
            <section className="rounded-3xl bg-white px-6 py-8 md:px-10 md:py-10">

              <div className="max-w-4xl">

                <div
                  className="
                    text-[16px]
                    leading-[1.8]
                    text-default/75

                    [&_h2]:mb-5
                    [&_h2]:mt-10
                    [&_h2]:!text-2xl
                    [&_h2]:font-semibold
                    [&_h2]:leading-tight
                    [&_h2]:text-prpl

                    [&_h3]:mb-4
                    [&_h3]:mt-8
                    [&_h3]:!text-xl
                    [&_h3]:font-semibold
                    [&_h3]:text-prpl

                    [&_p]:mb-5
                    [&_p:last-child]:mb-0

                    [&_strong]:font-semibold
                    [&_strong]:text-default

                    [&_ul]:my-6
                    [&_ul]:space-y-3

                    [&_ol]:my-6
                    [&_ol]:space-y-3

                    [&_li]:relative
                    [&_li]:pl-6

                    [&_li]:before:absolute
                    [&_li]:before:left-0
                    [&_li]:before:top-[0.8em]
                    [&_li]:before:h-1.5
                    [&_li]:before:w-1.5
                    [&_li]:before:rounded-full
                    [&_li]:before:bg-prpl
                  "
                >
                  {parse(study.description, {
                    replace: (domNode) => {

                      if (domNode instanceof Element) {

                        if (domNode.name === "h2") {
                          return (
                            <h2>
                              {domToReact(
                                domNode.children as unknown as DOMNode[]
                              )}
                            </h2>
                          )
                        }

                        if (domNode.name === "ul") {
                          return (
                            <ul>
                              {domToReact(
                                domNode.children as unknown as DOMNode[]
                              )}
                            </ul>
                          )
                        }

                      }

                    },
                  })}
                </div>

              </div>

            </section>
          )}

        {infoBlocks.length > 0 && (
          <section className="mt-8">

            <div className="mb-6">

              <p className="text-sm font-medium text-blue">
                О программе
              </p>

              <h2 className="mt-1 !text-3xl font-semibold tracking-tight text-prpl">
                Основная информация
              </h2>

            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {infoBlocks.map((block, index) => {
                const Icon = block.icon

                const isLast =
                  infoBlocks.length % 2 !== 0 &&
                  index === infoBlocks.length - 1

                return (
                  <div
                    key={block.title}
                    className={`
                      rounded-2xl
                      border
                      border-zinc-200
                      bg-white
                      p-6
                      ${isLast ? "sm:col-span-2" : ""}
                    `}
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-prpl/8 text-prpl">

                        <Icon
                          size={19}
                          strokeWidth={1.8}
                        />

                      </div>

                      <h3 className="!text-lg font-semibold text-prpl">
                        {block.title}
                      </h3>

                    </div>

                    <div
                      className="
                        mt-4
                       text-[16px]
    leading-[1.8]
    text-default/75

    [&_br]:block

    [&_h2]:mb-5
    [&_h2]:mt-10
    [&_h2]:!text-2xl
    [&_h2]:font-semibold
    [&_h2]:leading-tight
    [&_h2]:text-prpl

    [&_h3]:mb-4
    [&_h3]:mt-8
    [&_h3]:!text-xl
    [&_h3]:font-semibold
    [&_h3]:text-prpl

    [&_p]:mb-5
    [&_p:last-child]:mb-0

    [&_strong]:font-semibold
    [&_strong]:text-default

    [&_ul]:my-6
    [&_ul]:space-y-3

    [&_ol]:my-6
    [&_ol]:space-y-3

    [&_li]:relative
    [&_li]:pl-6

    [&_li]:before:absolute
    [&_li]:before:left-0
    [&_li]:before:top-[0.8em]
    [&_li]:before:h-1.5
    [&_li]:before:w-1.5
    [&_li]:before:rounded-full
    [&_li]:before:bg-prpl
                      "
                      dangerouslySetInnerHTML={{
                        __html: block.content!,
                      }}
                    />

                  </div>
                )
              })}

            </div>

          </section>
        )}

        {study.teacher && (
          <section className="mt-12">

            <div className="mb-6">

              <p className="text-sm font-medium text-blue">
                Преподаватель
              </p>

              <h2 className="mt-1 !text-3xl font-semibold tracking-tight text-prpl">
                Эксперт программы
              </h2>

            </div>

            <div className="overflow-hidden rounded-3xl bg-white">

              <div
                className={
                  study.teacher_img
                    ? "grid md:grid-cols-[300px_1fr]"
                    : "block"
                }
              >

                {study.teacher_img && (
                  <div className="min-h-[300px] bg-zinc-100">

                    <ImageWithSkeleton
                      src={study.teacher_img}
                      alt="Преподаватель программы"
                      wrapperClassName="h-full w-full"
                      aspect="1/1"
                    />

                  </div>
                )}

                <div className="p-7 md:p-9">

                  <div
                    className="
                      text-[16px]
                      leading-7
                      text-default/70

                      [&_h2]:mb-4
                      [&_h2]:!text-2xl
                      [&_h2]:font-semibold
                      [&_h2]:text-prpl

                      [&_h3]:mb-3
                      [&_h3]:!text-xl
                      [&_h3]:font-semibold
                      [&_h3]:text-prpl

                      [&_p]:mb-5
                      [&_p:last-child]:mb-0

                      [&_strong]:font-semibold
                      [&_strong]:text-default
                    "
                    dangerouslySetInnerHTML={{
                      __html: study.teacher,
                    }}
                  />

                  {study.teacher_description && (
                    <div
                      className="
                        mt-6
                        border-t
                        border-zinc-100
                        pt-6

                        text-[15px]
                        leading-7
                        text-default/60

                        [&_p]:mb-4
                        [&_p:last-child]:mb-0
                      "
                      dangerouslySetInnerHTML={{
                        __html: study.teacher_description,
                      }}
                    />
                  )}

                </div>

              </div>

            </div>

          </section>
        )}


        {study.content && (
          <section className="mt-12 rounded-3xl bg-white px-6 py-8 md:px-10 md:py-10">

            <div className="mb-8">

              <p className="text-sm font-medium text-blue">
                Обучение
              </p>

              <h2 className="mt-1 !text-3xl font-semibold tracking-tight text-prpl">
                Программа обучения
              </h2>

            </div>

            <article
              className="
                max-w-4xl

                text-[16px]
                leading-8
                text-default/70

                [&_h2]:mb-5
                [&_h2]:mt-10
                [&_h2]:!text-2xl
                [&_h2]:font-semibold
                [&_h2]:leading-tight
                [&_h2]:text-prpl

                [&_h3]:mb-4
                [&_h3]:mt-8
                [&_h3]:!text-xl
                [&_h3]:font-semibold
                [&_h3]:text-prpl

                [&_p]:mb-5

                [&_ul]:my-6
                [&_ul]:space-y-3

                [&_ol]:my-6
                [&_ol]:space-y-3

                [&_li]:pl-1
                [&_li]:marker:text-prpl

                [&_strong]:font-semibold
                [&_strong]:text-default
              "
              dangerouslySetInnerHTML={{
                __html: study.content,
              }}
            />

          </section>
        )}


        {study.conditions && (
          <section className="mt-8 rounded-3xl border border-zinc-200 bg-white px-6 py-8 md:px-10">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 text-blue">

                <FileText size={19} />

              </div>

              <div>

                <p className="text-xs font-medium uppercase tracking-wider text-blue/60">
                  Перед началом
                </p>

                <h2 className="mt-1 !text-2xl font-semibold text-prpl">
                  Условия обучения
                </h2>

              </div>

            </div>

            <div
              className="
                mt-6
                max-w-4xl
                text-[15px]
                leading-7
                text-default/65

                [&_p]:mb-4
                [&_p:last-child]:mb-0

                [&_strong]:font-semibold
                [&_strong]:text-default

                [&_ul]:my-5
                [&_ul]:space-y-2
              "
              dangerouslySetInnerHTML={{
                __html: study.conditions,
              }}
            />

          </section>
        )}

        <section className="mt-8 overflow-hidden rounded-3xl bg-prpl">

          <div className="px-6 py-8 md:px-10 md:py-10">

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-sm font-medium text-white/55">
                  Готовы присоединиться?
                </p>

                <h2 className="mt-2 !text-3xl font-semibold text-white md:!text-4xl">
                  Запишитесь на обучение
                </h2>

                {price > 0 && (
                  <p className="mt-3 text-lg text-white/65">
                    Стоимость - {" "}
                    <span className="font-semibold text-white">
                      {price.toLocaleString("ru-RU")} ₽
                    </span>
                  </p>
                )}

              </div>

              <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:min-w-[250px]">

                {study.paylink && (
                  <LoadingLink
                    href={study.paylink}
                    className="
                      group
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-prpl
                      transition
                      hover:bg-white/90
                    "
                  >

                    <CreditCard size={18} />

                    Оплатить обучение

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />

                  </LoadingLink>
                )}

                <LoadingLink
                  href="/bid"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/20
                    px-6
                    py-4
                    text-sm
                    font-semibold
                    !text-white
                    transition
                    hover:bg-white/10
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

    </main>
  )
}