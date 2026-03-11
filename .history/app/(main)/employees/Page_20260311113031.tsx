import { getAllTeachers } from "@/lib/users"

export default async function Page() {
    const teachers = await getAllTeachers()

    const filtredTeachers = teachers.filter(t => t.isTeacher)

    return (
        <section className="flex flex-col px-4 mt-27">
        <h1 className="text-prpl font-semibold text-center">Руководство ЧОУ ДПО «Академия медицинского образования им.Ф.И.Иноземцева»</h1>

        <div className="grid gap-3 grid-cols-2 mb-15 mt-5">
            {filtredTeachers.map(teacher => (
                    <div key={teacher.id} className="grid grid-cols-2 list-none border border-gray-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
                        <img className="border mr-3 h-[200px] w-[200px] rounded-md" alt="Преподаватель" />
                        <ul>
                            <li className="!text-lg !font-semibold">{teacher.last_name} {teacher.name} {teacher.patronymic}</li>
                            <li className="mt-2">{teacher.Teacher_text}</li>
                        </ul> 
                    </div>
                ))}
        </div>
        
        </section>
    )
}