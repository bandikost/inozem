import { notFound } from "next/navigation"
import LoadingLink from "@/components/Load/LoadingLink"
import ImageWithSkeleton from "@/components/ui/LazyLoad/ImageWithSkeleton"
import { getTeacherById } from "@/lib/users"
import { ChevronRight } from "lucide-react"

interface TeacherPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: TeacherPageProps) {
  const { id } = await params

  const teacher = await getTeacherById(Number(id))

  if (!teacher) {
    return {
      title: "Преподаватель не найден",
    }
  }

  return {
    title: `${teacher.last_name} ${teacher.name} ${teacher.patronymic} | ЧОУ ДПО «Академия медицинского образования им. Ф.И. Иноземцева»`,
  }
}

export default async function TeacherPage({
  params,
}: TeacherPageProps) {
  const { id } = await params

  const teacherId = Number(id)

  if (Number.isNaN(teacherId)) {
    notFound()
  }

  const teacher = await getTeacherById(teacherId)

  if (!teacher) {
    notFound()
  }

  const fullName = [
    teacher.last_name,
    teacher.name,
    teacher.patronymic,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section className="min-h-screen">
      <div className="container mx-auto px-4 my-27">
        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
          <LoadingLink
            href="/"
            className="shrink-0 hover:text-blue transition hover:underline"
          >
            Главная
          </LoadingLink>

          <ChevronRight size={14} className="shrink-0" />

          <LoadingLink
            href="/management"
            className="shrink-0 hover:text-blue transition hover:underline"
          >
            Руководство
          </LoadingLink>

          <ChevronRight size={14} className="shrink-0" />

          <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
            {fullName}
          </span>
        </nav>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">

          <div className="flex flex-col md:flex-row">

            <div className="w-full shrink-0 md:w-[320px]">
              {teacher.photo_url ? (
                <ImageWithSkeleton
                  src={teacher.photo_url}
                  alt={fullName}
                  wrapperClassName="w-full h-full object-cover"
                  aspect="1/1"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-400">
                  Нет фото
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10">

              <h1 className="text-2xl font-medium text-gray-800 md:text-4xl">
                {fullName}
              </h1>

              {teacher.position && (
                <p className="mt-5 text-lg text-prpl">
                  {teacher.position}
                </p>
              )}

              {teacher.specialization && (
                <p className="mt-3 text-gray-600">
                  {teacher.specialization}
                </p>
              )}

              {teacher.teacher_text && (
                <p className="mt-5 whitespace-pre-wrap leading-7 text-gray-600">
                  {teacher.teacher_text}
                </p>
              )}

            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl">

          <h2 className="mb-6 text-center text-prpl">
            Сведения о педагогическом работнике
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <TeacherInfo
              title="Занимаемая должность"
              value={teacher.position}
            />

            <TeacherInfo
              title="Преподаваемые учебные предметы, курсы, дисциплины (модули)"
              value={teacher.subjects}
            />

            <TeacherInfo
              title="Уровень профессионального образования, направление подготовки, специальность и квалификация"
              value={teacher.education}
            />

            <TeacherInfo
              title="Ученая степень"
              value={teacher.academic_degree}
            />

            <TeacherInfo
              title="Ученое звание"
              value={teacher.academic_title}
            />

            <TeacherInfo
              title="Сведения о повышении квалификации за последние 3 года"
              value={teacher.advanced_training}
            />

            <TeacherInfo
              title="Сведения о профессиональной переподготовке"
              value={teacher.professional_retraining}
            />

            <TeacherInfo
              title="Продолжительность опыта работы в профессиональной сфере"
              value={
                teacher.professional_experience !== null &&
                teacher.professional_experience !== undefined
                  ? `${teacher.professional_experience} лет`
                  : null
              }
            />

            <TeacherInfo
              title="Наименование образовательной программы, код и наименование профессии или специальности"
              value={teacher.educational_programs}
              last
            />

          </div>
        </div>

      </div>
    </section>
  )
}

interface TeacherInfoProps {
  title: string
  value?: string | number | null
  last?: boolean
}

function TeacherInfo({
  title,
  value,
  last = false,
}: TeacherInfoProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-3 p-5 md:grid-cols-[320px_1fr] md:gap-8 ${
        !last ? "border-b border-gray-200" : ""
      }`}
    >
      <h3 className="font-medium text-gray-700">
        {title}
      </h3>

      <p className="whitespace-pre-wrap leading-7 text-gray-600">
        {value || "Не указано"}
      </p>
    </div>
  )
}