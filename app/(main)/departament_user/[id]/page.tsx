  import { notFound } from "next/navigation"
  import LoadingLink from "@/components/Load/LoadingLink"
  import ImageWithSkeleton from "@/components/ui/LazyLoad/ImageWithSkeleton"
  import { ChevronRight } from "lucide-react"
  import { getTeacherById } from "@/lib/departaments"

  interface TeacherPageProps {
    params: Promise<{ id: string }>
  }

  export default async function TeacherPage({
    params,
  }: TeacherPageProps) {
    const { id } = await params

    const teacherId = Number(id)

    if (!Number.isInteger(teacherId)) {
      notFound()
    }

    const teacher = await getTeacherById(teacherId)

    if (!teacher) {
      notFound()
    }

    return (
      <section className="min-h-screen">
        <div className="container mx-auto mt-27 px-2">

          <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
            <LoadingLink
              href="/"
              className="shrink-0 transition hover:text-blue hover:underline"
            >
              Главная
            </LoadingLink>

            <ChevronRight size={14} className="shrink-0" />

            <LoadingLink
              href="/departaments"
              className="shrink-0 transition hover:text-blue hover:underline"
            >
              Кафедры
            </LoadingLink>

            <ChevronRight size={14} className="shrink-0" />

            <span className="min-w-0 truncate text-zinc-800 opacity-70">
              {teacher.last_name} {teacher.name}
            </span>
          </nav>

          <div className="mx-auto max-w-5xl">
            <article className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

              <div className="bg-gradient-to-br from-[#533785] via-[#8D4C98] to-[#A75BB3] px-6 py-10 text-white sm:px-10 sm:py-14">
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">

                  <div className="h-48 w-48 shrink-0 overflow-hidden rounded-3xl bg-white/10 sm:h-56 sm:w-56">
                    <ImageWithSkeleton
                      src={teacher.photo_url || "/images/default-user.jpg"}
                      alt={`${teacher.last_name} ${teacher.name}`}
                      wrapperClassName="h-full w-full object-cover"
                      aspect="1/1"
                    />
                  </div>

                  <div>
                    <h1 className="text-center text-3xl font-bold leading-tight sm:text-left sm:text-4xl">
                      {teacher.last_name} {teacher.name}

                      {teacher.patronymic && (
                        <>
                          <br />
                          {teacher.patronymic}
                        </>
                      )}
                    </h1>

                    <p className="mt-4 text-center text-white/75 sm:text-left">
                      Преподаватель Академии медицинского образования
                    </p>
                  </div>

                </div>
              </div>

              {teacher.description && (
                <div className="px-6 py-8 sm:px-10 sm:py-10">
                  <h2 className="mb-5 text-2xl font-bold text-zinc-900">
                    О преподавателе
                  </h2>

                  <div
  className="
    max-w-4xl
    text-[16px]
    leading-8
    text-zinc-600

    [&_p]:mb-4

    [&_h3]:mt-8
    [&_h3]:mb-4
    [&_h3]:text-xl
    [&_h3]:font-bold
    [&_h3]:text-zinc-900
    [&_h3:first-child]:mt-0

    [&_ul]:my-4
    [&_ul]:list-disc
    [&_ul]:pl-6

    [&_ol]:my-4
    [&_ol]:list-decimal
    [&_ol]:pl-6

    [&_li]:mb-2

    [&_a]:text-[#8D4C98]
    [&_a]:font-medium
    [&_a]:hover:underline

    [&_strong]:font-semibold
  "
  dangerouslySetInnerHTML={{
    __html: teacher.description,
  }}
/>
                </div>
              )}

            </article>
          </div>

        </div>
      </section>
    )
  }