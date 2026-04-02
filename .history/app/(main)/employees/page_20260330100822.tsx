import { getAllTeachers } from "@/lib/users"

export default async function Page() {
    const teachers = await getAllTeachers()

    const filtredTeachers = teachers.filter(t => t.isTeacher)

return (
    
<section className="flex flex-col px-4 mt-30">
    <h1 className="text-prpl font-semibold text-center">Сотрудники ЧОУ ДПО «Академия медицинского образования им.Ф.И.Иноземцева»</h1>

        <div className="grid gap-3 grid-cols-2 mb-15 mt-5">
            {filtredTeachers
            .slice(0, 10)
            .map(teacher => (
                <div key={teacher.id} className="flex list-none border border-gray-300  mt-8 rounded-md shadow-2xl bg-white">
                    <img className=" mr-3 h-[200px] w-[200px] rounded-md object-cover" src={teacher.photo_url} alt={`Сотрудник ${teacher.last_name}`} />
                    <ul className="pt-2">
                        <li className="!text-lg !font-medium text-prpl">{teacher.last_name} {teacher.name} {teacher.patronymic}</li>
                        <li className="my-2 max-w-[300px]">{teacher.Teacher_text}</li>
                    </ul> 
                </div>
            ))}
        </div>

        <h1 className="text-prpl font-semibold text-center">Профессорско-преподавательский состав</h1>
        <div className="grid gap-3 grid-cols-2 mb-15 mt-5">
            {filtredTeachers
            .slice(10, )
            .map(teacher => (
                <div key={teacher.id} className="grid grid-cols-2 list-none border border-gray-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
                    <img className="border-2 border-gray-300 mr-3 h-[200px] w-[200px] rounded-md" alt="Преподаватель" />
                    <ul>
                        <li className="!text-lg !font-semibold">{teacher.last_name} {teacher.name} {teacher.patronymic}</li>
                        <li className="my-2">{teacher.Teacher_text}</li>
                    </ul> 
                </div>
            ))}
        </div>
        
</section>
    )
}