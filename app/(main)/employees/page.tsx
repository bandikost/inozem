import LoadingLink from "@/components/Load/LoadingLink"
import ImageWithSkeleton from "@/components/ui/LazyLoad/ImageWithSkeleton"
import { getAcademyStructure, getAllTeachers } from "@/lib/users"
import { ChevronRight } from "lucide-react"

export const metadata = {
  title: 'Руководство | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}

export default async function Page() {
  const [structure, teachers] = await Promise.all([
    getAcademyStructure(),
    getAllTeachers(),
  ])

  const filtredTeachers = teachers
    .filter(t => t.isTeacher)
    .sort((a, b) => a.last_name.localeCompare(b.last_name, "ru"))

  const groupedStructure = structure.reduce((groups, employee) => {
    const existing = groups.find(
      group => group.id === employee.employer_id
    )

    if (existing) {
      existing.employees.push(employee)
    } else {
      groups.push({
        id: employee.employer_id,
        name: employee.employer_name,
        employees: [employee],
      })
    }

    return groups
  }, [] as {
    id: number
    name: string
    employees: typeof structure
  }[])

  const directorate = groupedStructure.find(
    group => group.name === "Административная дирекция"
  )

  const departments = groupedStructure.filter(
    group => group.name !== "Административная дирекция"
  )

  const renderEmployee = (employee: (typeof structure)[number]) => (
    <div
      key={employee.id}
      className="flex flex-col md:flex-row overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md"
    >
      <div className="w-full md:w-[240px] h-auto shrink-0">
        {employee.photo_url ? (
          <ImageWithSkeleton
            src={employee.photo_url}
            alt={employee.last_name || "Сотрудник"}
            wrapperClassName="w-full h-full object-cover"
            aspect="1/1"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            Нет фото
          </div>
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col justify-between gap-2 min-w-0">
        <h3 className="text-lg md:text-xl font-medium text-gray-700 leading-snug !font-normal">
          {employee.last_name} {employee.name}
          <br className="hidden sm:visible" />
          {employee.patronymic}
        </h3>

        <p className="text-gray-500 line-clamp-4 !font-normal mt-2">
          {employee.position}
        </p>

        <p className="!text-sm text-gray-500 !font-normal mt-2 whitespace-pre-wrap leading-4">
          {employee.Teacher_text}
        </p>
      </div>
    </div>
  )

  return (
    <section className="min-h-screen">
      <div className="container mx-auto px-2 my-27">

        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-2">
          <LoadingLink
            href="/"
            className="shrink-0 hover:text-blue transition hover:underline"
          >
            Главная
          </LoadingLink>

          <ChevronRight size={14} className="shrink-0" />

          <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
            Структура академии
          </span>
        </nav>

        <h2 className="text-prpl text-center">
          Структура ЧОУ ДПО «Академия медицинского образования им. Ф. И. Иноземцева»
        </h2>

        {directorate && (
          <section className="mt-8">
            <h3 className="text-prpl text-center text-xl font-semibold mb-6">
              Руководство академии
            </h3>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {directorate.employees.map(renderEmployee)}
            </div>
          </section>
        )}

        <div className="mt-12 space-y-12">
          {departments.map(department => (
            <section key={department.id}>
              <h3 className="text-prpl text-center text-xl font-semibold mb-6">
                {department.name}
              </h3>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {department.employees.map(renderEmployee)}
              </div>
            </section>
          ))}
        </div>

        <h2 className="text-prpl font-semibold text-center mt-15">
          Педагогический состав ЧОУ ДПО «Академия медицинского образования им. Ф. И. Иноземцева»
        </h2>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-8">
          {filtredTeachers.map(teacher => (
            <div
              key={teacher.id}
              className="flex flex-col w-fit mx-auto sm:w-full sm:flex-row overflow-hidden border border-gray-200 rounded-xl shadow-md bg-white mt-8"
            >
              <div className="w-full md:w-[240px] h-auto shrink-0">
                {teacher.photo_url ? (
                  <ImageWithSkeleton
                    src={teacher.photo_url}
                    alt={teacher.last_name}
                    wrapperClassName="w-full h-full object-cover"
                    aspect="1/1"
                  />
                ) : (
                  <div className="h-[280px] w-[240px] bg-gray-100 flex items-center justify-center text-gray-400">
                    Нет фото
                  </div>
                )}
              </div>

              <div className="p-5 md:p-6 flex flex-col justify-between gap-2 min-w-0">
                <h3 className="text-lg md:text-xl font-medium text-gray-700 leading-snug !font-normal">
                  {teacher.last_name} {teacher.name}
                  <br className="hidden sm:visible" />
                  {teacher.patronymic}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-4 !font-normal mt-2">
                  {teacher.Teacher_text}
                </p>

                <LoadingLink
                  href={`/employees/${teacher.id}`}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-prpl px-5 py-3 text-sm !text-white transition hover:opacity-90"
                >
                  Подробная информация
                  <ChevronRight size={17} />
                </LoadingLink>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}