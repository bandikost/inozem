import LoadingLink from "@/components/Load/LoadingLink"
import ImageWithSkeleton from "@/components/ui/LazyLoad/ImageWithSkeleton"
import { getAllEmlployeer, getAllTeachers } from "@/lib/users"
import { ChevronRight } from "lucide-react"

export const revalidate = 3600

export const metadata = {
  title: 'Руководство | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}

export default async function Page() {
    const teachers = await getAllTeachers()
    const emloyeer = await getAllEmlployeer()

    const filtredTeachers = teachers.filter(t => t.isTeacher)
    const filtredEmployeer = emloyeer.filter(e => e.isEmployer)

return (
    
<section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
  <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Руководство
        </span>
      
      </nav>
    <h2 className="text-prpl text-center">Руководство ЧОУ ДПО «Академия медицинского образования им.Ф.И.Иноземцева»</h2>

    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-8">
  {filtredEmployeer
  .sort((a, b) => a.last_name.localeCompare(b.last_name))
  .map((teacher) => (
    <div
      key={teacher.id}
      className="flex flex-col md:flex-row overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md"
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
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            Нет фото
          </div>
        )}
      </div>

   
                    <div className="p-5 md:p-6 flex flex-col gap-2 min-w-0">
                        <h3 className="text-lg md:text-xl font-medium text-gray-700 leading-snug !font-normal">
                        {teacher.last_name} {teacher.name} <br className="hidden sm:visible" />
                        {teacher.patronymic}
                        </h3>

                        <p className="text-gray-500 line-clamp-4 !font-normal mt-2">
                        {teacher.Teacher_text}
                        </p>

                        <p className="!text-sm text-gray-500 line-clamp-4 !font-normal mt-2 whitespace-pre-wrap leading-8">
                        {teacher.Teacher_text}
                        </p>
                    </div> 
    </div>
  ))}
</div>

        <h2 className="text-prpl font-semibold text-center mt-15">Преподаватели ЧОУ ДПО «Академия медицинского образования им.Ф.И.Иноземцева»</h2>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-8">
            {filtredTeachers
            .sort((a, b) => a.last_name.localeCompare(b.last_name))
            .map(teacher => (
                <div key={teacher.id} className="flex flex-col w-fit mx-auto sm:w-full sm:flex-row overflow-hidden border border-gray-200 rounded-xl shadow-md bg-white mt-8">
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

                    <div className="p-5 md:p-6 flex flex-col gap-2 min-w-0">
                        <h3 className="text-lg md:text-xl font-medium text-gray-700 leading-snug !font-normal">
                        {teacher.last_name} {teacher.name} <br className="hidden sm:visible" />
                        {teacher.patronymic}
                        </h3>

                        <p className="text-sm text-gray-500 line-clamp-4 !font-normal mt-2">
                        {teacher.Teacher_text}
                        </p>
                    </div>   
                </div>
            ))}
        </div>
        </div>
</section>
    )
}