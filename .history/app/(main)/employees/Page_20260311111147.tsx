import { getAllTeachers } from "@/lib/users"

export default async function Page() {
    const teachers = await getAllTeachers()

    const filtredTeachers = teachers.filter(t => t.isTeacher)

    return (
        <section className="flex flex-col px-4 mt-27">
        <h1 className="text-prpl font-semibold text-center">Руководство ЧОУ ДПО «Академия медицинского образования им.Ф.И.Иноземцева»</h1>

        <div className="border border-gray-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
            {filtredTeachers.map(teacher => (
                    <li key={teacher.id} className="list-none">
                    {teacher.last_name} {teacher.name} {teacher.patronymic}
                    </li>

                ))}
        </div>
        
        </section>
    )
}