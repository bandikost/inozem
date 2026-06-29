export const revalidate = 3600

import { getTeachers } from "@/lib/users"
import ImageWithSkeleton from "../ui/LazyLoad/ImageWithSkeleton"
import LoadingLink from "../Load/LoadingLink"

export default async function ThirdBlock() {
  const teachers = await getTeachers()
  const teacher = teachers[0]

  return (
    <section className="w-full mt-24 px-4">

      <div className="max-w-6xl mx-auto flex flex-col gap-2 px-2">
        <h2 className="text-2xl font-semibold text-prpl ">
          Преподаватель месяца
        </h2>
        <p className="text-slate-600">
          Основано на активности и взаимодействии со студентами
        </p>
      </div>


      {!teacher ? (
        <div className="max-w-6xl mx-auto mt-10 p-6 rounded-2xl border border-slate-200 bg-white text-slate-500 text-center">
          Преподаватели временно недоступны
        </div>
      ) : (
        <div className="max-w-6xl mx-auto mt-10">
          <div
            className="relative grid md:grid-cols-2 gap-8 items-center
                       rounded-3xl border border-slate-200 bg-white
                       shadow-sm hover:shadow-xl transition-all duration-300
                       overflow-hidden"
          >
      
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50" />

      
            <div className="relative p-6 flex justify-center">
              <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px]">
                <ImageWithSkeleton
                  src={teacher.photo_url}
                  alt="Преподаватель месяца"
                  wrapperClassName="rounded-2xl border-2 border-prpl shadow-lg"
                  aspect="1/1"
                />

          
                <div className="absolute -top-3 -right-5 bg-prpl text-white text-sm px-3 py-1 rounded-full shadow">
                  ⭐ Лучший преподаватель
                </div>
              </div>
            </div>

   
            <div className="relative p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-slate-900">
                {teacher.last_name} {teacher.name} {teacher.patronymic}
              </h3>

              <p className="mt-4 text-slate-600 leading-relaxed">
                {teacher.Teacher_text}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Активен в обучении студентов
              </div>

       
              <div className="mt-8">
                <LoadingLink href="/programs" className="button-more">Перейти к программам →</LoadingLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}