export const revalidate = 3600

import { getTeachers } from "@/lib/users"
import ImageWithSkeleton from "../ui/LazyLoad/ImageWithSkeleton"
import LoadingLink from "../Load/LoadingLink"
import { Award, GraduationCap } from "lucide-react"

export default async function ThirdBlock() {
  const teachers = await getTeachers()
  const teacher = teachers[0]

  return (
    <section className="w-full mt-24 px-4 relative overflow-hidden">

      <div className="absolute inset-0 -z-10" />

      <div className="max-w-6xl mx-auto px-2">

        <div className="mb-10">
          <div className="flex items-center gap-2 text-yellow-400 font-medium mb-3">
            <Award size={20} />
            Лучший преподаватель
          </div>

          <h4 className="text-3xl md:text-4xl font-bold text-prpl">
            Преподаватель месяца
          </h4>

          <p className="mt-3 text-slate-600 max-w-xl">
            Основано на активности, качестве обучения и взаимодействии со студентами
          </p>
        </div>


        {!teacher ? (
          <div className="
            p-8 rounded-3xl 
            border border-slate-200 
            bg-white 
            text-slate-500 
            text-center
            shadow-sm
          ">
            Преподаватели временно недоступны
          </div>

        ) : (

          <div className="
            relative
            grid md:grid-cols-2
            gap-8
            items-center
            rounded-[2rem]
            overflow-hidden
            bg-white
            border border-slate-200
            shadow-lg
            hover:shadow-2xl
            transition-all duration-500
          ">


            <div className="
              absolute 
              -top-32 
              -left-32 
              w-80 
              h-80 
              rounded-full 
              bg-violet-200/40 
              blur-3xl
            "/>

            <div className="
              absolute 
              -bottom-32 
              -right-32 
              w-80 
              h-80 
              rounded-full 
              bg-indigo-200/40 
              blur-3xl
            "/>


            <div className="relative flex justify-center p-8">

              <div className="
                relative
                w-[260px]
                h-[260px]
                md:w-[330px]
                md:h-[330px]
              ">

                <div className="
                  absolute inset-0
                  rounded-full
                  
                  rotate-6
                  opacity-20
                "/>


                <ImageWithSkeleton
                  src={teacher.photo_url}
                  alt="Преподаватель месяца"
                  wrapperClassName="
                    rounded-full
                    border-4
                    border-white
                    shadow-xl
                  "
                  aspect="1/1"
                />


                <div className="
                  absolute
                  -bottom-3
                  left-1/2
                  -translate-x-1/2
                  whitespace-nowrap
                  bg-prpl
                  text-white
                  text-sm
                  font-medium
                  px-5
                  py-2
                  rounded-full
                  shadow-lg
                ">
                  ⭐ Лучший преподаватель
                </div>

              </div>

            </div>



            <div className="relative p-8 md:p-12">

              <h3 className="
                text-3xl
                font-bold
                text-slate-900
                leading-tight
              ">
                {teacher.last_name}
                <br />
                <span className="text-prpl">
                  {teacher.name} {teacher.patronymic}
                </span>
              </h3>


              <div className="
                flex items-center gap-2
                mt-5
                text-sm
                text-slate-500
              ">
                <GraduationCap size={18} className="text-prpl"/>
                Активен в обучении студентов
              </div>


              <p className="
                mt-6
                text-slate-600
                leading-relaxed
                text-lg
              ">
                {teacher.Teacher_text}
              </p>


              <div className="mt-8">

                <LoadingLink
                  href={`/employees/${teacher.id}`}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-6
                    py-3
                    rounded-xl
                    bg-prpl
                    !text-white
                    font-medium
                    shadow-md
                    hover:shadow-xl
                    hover:-translate-y-0.5
                    transition-all
                  "
                >
                  Подробнее о преподавателе →
                </LoadingLink>

              </div>

            </div>


          </div>

        )}

      </div>

    </section>
  )
}